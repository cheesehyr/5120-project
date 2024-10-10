import os
from flask import Flask, jsonify, request
import requests
import logging
from flask_cors import CORS
from geopy.distance import geodesic
from datetime import datetime, timedelta
import mysql.connector
from mysql.connector import Error
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)  # Enabling CORS for all domains and routes, customize as needed

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Database configuration
config = {
    'user': 'admin',
    'password': 'K3pXyVNCYkOZSnSOK5KH',
    'host': 'allerray.c9icswuycgqh.ap-southeast-2.rds.amazonaws.com',
    'database': 'my_database',
    'raise_on_warnings': True
}

# Google Map API set up
POLLEN_API_KEY = 'AIzaSyBtF8rsCbFuAyQiP9hbzGTDVDAv4LgccXk'
POLLEN_BASE_URL = 'https://pollen.googleapis.com/v1/forecast:lookup'
MEL_LATITUDE = '-37.8142176'
MEL_LONGITUDE = '144.9631608'

# Open Weather API set up
UV_API_KEY = '402dff3ecf831d612ec4e3a932047de2'
UV_BASE_URL = 'https://api.openweathermap.org/data/3.0/onecall'

# High Pollen Plants
high_pollen_plants = [
    "Ragweed", "Oak tree", "Birch tree", "Pine tree", "Elm tree", "Mulberry",
    "Maple tree", "Sycamore tree", "Grass", "Juniper tree", "Cedar tree",
    "Willow tree", "Privet", "Ash tree", "Cottonwood tree", "Annual blue grass",
    "Bahia grass", "Bermuda grass", "Couch grass", "Canary grass", "Cocksfoot grass",
    "June grass", "Kentucky blue grass", "Orchard grass", "Ryegrass", "Timothy grass",
    "Velvet grass", "Wild oat", "Winter grass", "Yorkshire fog", "Asthma weed",
    "Patterson curse", "Pellitory", "Plantain", "Ragweed", "Salvation weed",
    "Australian pine", "Bottle brush", "Cedar tree", "English oak", "London plane tree",
    "Mango tree", "Murray pine", "Olive tree", "Paper bark tree", "She oak",
    "Silver birch", "White cypress", "White cypress pine"
]

# Low Pollen Plants
low_pollen_plants = [
    "Rose", "Begonia", "Geranium", "Orchid", "Azalea", "Cactus", "Petunia",
    "Impatiens", "Lily", "Camellia", "Zinnia", "Snapdragon", "Fern", "Clematis",
    "Hibiscus", "Spider plant", "Areca palm", "Snake plant", "Peace lily",
    "Boston fern", "Boxwood", "Magnolia", "Hydrangea"
]
@app.route('/api/cityuvdata', methods=['GET'])
def get_city_uv_data():
    city = request.args.get('city', type=str)
    if not city:
        return jsonify({"error": "City parameter is required"}), 400

    try:
        conn = mysql.connector.connect(**config)
        cursor = conn.cursor()

        # The query orders the data by season and order explicitly
        query = """
        SELECT Max_UV 
        FROM UV 
        WHERE City = %s 
        ORDER BY FIELD(Season, 'Spring', 'Summer', 'Autumn', 'Winter'), `Order`
        """
        cursor.execute(query, (city,))
        data = cursor.fetchall()  # Fetches data as a list of tuples

        # Flatten the list of tuples to a list of values
        uv_values = [item[0] for item in data]  # Assuming each tuple contains one integer/float UV value

        return jsonify(uv_values)
    except Error as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()


@app.route('/api/cities', methods=['GET'])
def get_cities_and_seasons():
    try:
        conn = mysql.connector.connect(**config)
        cursor = conn.cursor()
        query = "SELECT DISTINCT City, Season FROM test_uv ORDER BY City, Season"
        cursor.execute(query)
        results = cursor.fetchall()
        # Prepare a structured response
        data = {"cities": sorted(set([row[0] for row in results]))}
        return jsonify(data)
    except Error as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        conn.close()


# Route to fetch UV data
@app.route('/api/uvdata', methods=['GET'])
def get_uv_data():
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor(dictionary=True)  # Using dictionary cursor for easier JSON serialization
    query = "SELECT * FROM UV ORDER BY City, Season, Month"
    cursor.execute(query)
    results = cursor.fetchall()  # Fetches the results as a list of dictionaries
    cursor.close()
    conn.close()
    return jsonify(results)


# Route to test with FOI table (location recommendation)
@app.route('/api/places', methods=['GET'])
def get_activity():
    logging.debug(f"Received request: {request.args}")
    try:
        lat = request.args.get('lat')
        lng = request.args.get('lng')
        radius = request.args.get('radius')
        filters = request.args.getlist('filters[]')
        indoor = request.args.get('indoor') == 'true'
        outdoor = request.args.get('outdoor') == 'true'

        logging.info(f"Parsed request parameters: lat={lat}, lng={lng}, radius={radius}, filters={filters}")

        if not all([lat, lng, radius]):
            return jsonify({'error': 'Missing required parameters'}), 400

        try:
            lat = float(lat)
            lng = float(lng)
            radius = float(radius)
        except ValueError:
            return jsonify({'error': 'Invalid lat, lng, or radius value'}), 400

        if not filters:
            return jsonify({'error': 'No filters provided'}), 400

        logging.info(f"Received request with params: lat={lat}, lng={lng}, radius={radius}, filters={filters}")

        if not filters:
            return jsonify({'error': 'No filters provided'}), 400

        conn = mysql.connector.connect(**config)
        cursor = conn.cursor(dictionary=True)

        placeholders = ', '.join(['%s'] * len(filters))
        query = f"""
                SELECT *
                FROM FOI
                WHERE FTYPE IN ({placeholders})
                """

        if indoor and not outdoor:
            query += " AND if_indoor = 'Indoor'"
        elif outdoor and not indoor:
            query += " AND if_indoor = 'Outdoor'"
        elif not indoor and not outdoor:
            # If neither is selected, return no results
            return jsonify([])


        cursor.execute(query, filters)
        all_places = cursor.fetchall()

        filtered_places = []
        for place in all_places:
            place_location = (place['latitude'], place['longitude'])
            user_location = (lat, lng)
            distance = geodesic(user_location, place_location).kilometers
            if distance <= radius:
                filtered_places.append({
                    'id': place['UFI'],
                    'name': place['NAME_LABEL'] or place['FEATSUBTYP'],
                    'type': place['FTYPE'],
                    'subtype': place['FEATSUBTYP'],
                    'indoor': place['if_indoor'] == 'Indoor',
                    'lat': place['latitude'],
                    'lng': place['longitude'],
                    'distance': round(distance, 2)
                })

        logging.info(f"Returning {len(filtered_places)} places")
        return jsonify(filtered_places)

    except Error as e:
        logging.error(f"Database error: {str(e)}")
        return jsonify({'error': f"Database error: {str(e)}"}), 500
    except Exception as e:
        logging.error(f"Unexpected error: {str(e)}")
        return jsonify({'error': f'An unexpected error occurred: {str(e)}'}), 500
    finally:
        if 'cursor' in locals() and cursor is not None:
            cursor.close()
        if 'conn' in locals() and conn is not None:
            conn.close()

# It is designed to get the current UV index of the Melbourne and send to the frontend for the dashboard.
@app.route('/api/melUV', methods=['GET'])
def getRealUV():
    url = f"{UV_BASE_URL}?lat={MEL_LATITUDE}&lon={MEL_LONGITUDE}&exclude=minutely,hourly,alerts&appid={UV_API_KEY}"

    try:
        # Make a GET request to the OpenWeatherMap API
        response = requests.get(url)
        data = response.json()

        # Extract current UV index
        current_uvi = (data['current']['uvi'])

        # Extract and format the UVI for the next 5 days
        daily_info = []
        for day in data['daily'][1:5]:  # Get data for the next 5 days, excluding today
            date = datetime.fromtimestamp(day['dt'])
            daily_info.append({
                "date": {
                    "year": date.year,
                    "month": date.month,
                    "day": date.day
                },
                "uvIndex": day['uvi']
            })

        # Prepare the response
        response_data = {
            "current": current_uvi,
            "forecast": {
                "dailyInfo": daily_info
            }
        }

        # Return the formatted data as JSON
        return jsonify(response_data)

    except requests.RequestException as e:
        # Handle any errors that occur during the request
        return jsonify({"error": str(e)}), 500
    except KeyError as e:
        # Handle cases where the expected data is not in the response
        return jsonify({"error": f"Could not find {str(e)} in the API response"}), 500


@app.route('/api/melPollen', methods = ['GET'])
def getRealPollen():

    params = {
        'key': POLLEN_API_KEY,
        'location.latitude': MEL_LATITUDE,
        'location.longitude': MEL_LONGITUDE,
        'days': 5,
        'plantsDescription': False
    }

    try:
        response = requests.get(POLLEN_BASE_URL, params=params)
        response.raise_for_status()

        data = response.json()

        if data and data['dailyInfo']:
            current_pollen = data['dailyInfo'][0]['pollenTypeInfo'][0]['indexInfo']['value']
            forecast = []
            for daily_info in data['dailyInfo'][1:]:  # Skip today for forecast
                if daily_info['pollenTypeInfo']:
                    pollen_type = daily_info['pollenTypeInfo'][0]
                    forecast.append({
                        'date': daily_info['date'],
                        'pollenValue': pollen_type['indexInfo']['value']
                    })

            response_data = {
                "current": current_pollen,
                "forecast": {
                    "dailyInfo": forecast
                }
            }
            return jsonify(response_data)
        else:
            return jsonify({'error': 'No pollen information available'}), 404

    except requests.exceptions.RequestException as e:
        return jsonify({'error': f'Failed to fetch pollen data: {str(e)}'}), 500

def determine_pollen_level(common_names):
    for name in common_names:
        if any(high_plant.lower() in name.lower() for high_plant in high_pollen_plants):
            return "High"
        if any(low_plant.lower() in name.lower() for low_plant in low_pollen_plants):
            return "Low"
    return "Moderate"


@app.route('/api/identify-plant', methods=['POST'])
def identify_plant():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        try:
            with open(filepath, 'rb') as image_file:
                files = {'images': (filename, image_file)}
                data = {'organs': 'auto'}
                params = {
                    'api-key': '2b101dW5R3vNvdXetc3QkGCSu'
                }

                response = requests.post(
                    'https://my-api.plantnet.org/v2/identify/all',
                    files=files,
                    data=data,
                    params=params
                )

                plant_data = response.json()

                # Extract common names and determine pollen level
                if 'results' in plant_data and len(plant_data['results']) > 0:
                    common_names = plant_data['results'][0]['species'].get('commonNames', [])
                    pollen_level = determine_pollen_level(common_names)

                    # Add pollen level to the response
                    plant_data['pollen_level'] = pollen_level

                return jsonify(plant_data)
        except Exception as e:
            return jsonify({'error': str(e)}), 500
        finally:
            os.remove(filepath)  # Clean up the uploaded file

    return jsonify({'error': 'Failed to process the image'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)

"""
Melbourne:
"lat": -37.8142176,
"lon": 144.9631608,
https://api.openweathermap.org/data/3.0/onecall?lat=-37.8142176&lon=144.9631608&exclude=minutely,hourly,daily,alerts&appid=402dff3ecf831d612ec4e3a932047de2
https://pollen.googleapis.com/v1/forecast:lookup?key=AIzaSyBtF8rsCbFuAyQiP9hbzGTDVDAv4LgccXk
https://pollen.googleapis.com/v1/forecast:lookup?key=AIzaSyBtF8rsCbFuAyQiP9hbzGTDVDAv4LgccXk&location.longitude=144.96&location.latitude=-37.81&days=1
"""
