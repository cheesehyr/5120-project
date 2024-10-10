import {LineChart} from '@mui/x-charts';
import './Features.css';
import {Box, Checkbox, FormControl, ListItemText, MenuItem, Select} from '@mui/material';
import {memo, useEffect, useState} from 'react';
import UVPrecautions from './uv-precautions/UVPrecautions.jsx';

function UVFeatures() {
    const cities = ['Tokyo', 'Auckland', 'London', 'Mumbai', 'New_York', 'Shanghai'];
    const seasonLabels = ['Spring 1', 'Spring 2', 'Spring 3', 'Summer 1', 'Summer 2', 'Summer 3', 'Autumn 1', 'Autumn 2', 'Autumn 3', 'Winter 1', 'Winter 2',
        'Winter 3'];
    const [melbourneCityData, setMelbourneCityData] = useState({
        label: 'Melbourne',
        data: [] // Initialize with an empty array
    });
    const [selectedCities, setSelectedCities] = useState([]);
    const [citiesData, setCitiesData] = useState([melbourneCityData]);

    // Fetch Melbourne data on component mount
    useEffect(() => {
        getCitySeasonData('Melbourne').then(data => {
            if (data) {
                setMelbourneCityData({label: 'Melbourne', data: data.data});  // Update Melbourne's specific state
                setCitiesData([{label: 'Melbourne', data: data.data}]); // Initialize chart with Melbourne data
            }
        });
    }, []);

    async function getCitySeasonData(city) {
        try {
            const response = await fetch(`/api/cityuvdata?city=${city}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const uvValues = await response.json(); // This is expected to be a directly usable array of 12 UV values.

            // Log the data for verification
            console.log(city, uvValues);

            return {
                label: city,
                data: uvValues
            };
        } catch (error) {
            console.error('Error fetching city UV data:', error);
            return null; // Return null or an appropriate error handling structure
        }
    }

    // Function to handle city selection changes
    async function handleCityChange(event) {
        const {target: {value}} = event;
        const newSelectedCities = typeof value === 'string' ? value.split(',') : value;
        setSelectedCities(newSelectedCities);

        // Fetch data for all selected cities
        const cityDataPromises = newSelectedCities.map(city => getCitySeasonData(city));
        const updatedCityData = await Promise.all(cityDataPromises);

        // Filter out any null values
        const validCityData = updatedCityData.filter(data => data !== null);

        // Update the state with Melbourne data and the fetched city data
        setCitiesData([melbourneCityData, ...validCityData]);
    }

    const uvLevels = [
        {riskLevel: 'low', description: 'Low (0-2)'},
        {riskLevel: 'moderate', description: 'Moderate (3-5)'},
        {riskLevel: 'high', description: 'High (6-7)'},
        {riskLevel: 'very-high', description: 'Very High (8-10)'},
    ];

    return (
        <>
            <section className='features'>
                <h2>UV Index Comparison: Melbourne vs. Other Cities</h2>
                <div className='uv-radiation'>
                    <p className='feature-name'>Did you Know? Australia has some of the highest levels of UV radiation in the world!</p>
                    <div className='uv-chart-city'>
                        <div className='uv-left-section'>
                            <LineChart
                                xAxis={[
                                    {
                                        id: 'seasons',
                                        data: seasonLabels,
                                        label: 'Seasons',
                                        scaleType: 'point',
                                    },
                                ]}
                                yAxis={[
                                    {
                                        id: 'uv-exposure',
                                        label: 'UV Index',
                                    },
                                ]}
                                series={citiesData}
                                width={800}
                                height={500}
                                margin={{top: 50}}
                            />
                        </div>
                        <div className='uv-right-section'>
                            <p className='select-city'>*Select cities and compare</p>
                            <Box className='cityInput' sx={{minWidth: 200}}>
                                <FormControl fullWidth>
                                    <Select
                                        labelId='city-select-label'
                                        id='city-select'
                                        value={selectedCities}
                                        onChange={handleCityChange}
                                        multiple
                                        displayEmpty
                                        renderValue={selected =>
                                            selected.length === 0 ? 'Select a city...' : selected.join(', ')
                                        }
                                    >
                                        {cities.map(city => (
                                            <MenuItem key={city} value={city}>
                                                <Checkbox checked={selectedCities.indexOf(city) > -1}/>
                                                <ListItemText primary={city}/>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                    </div>
                    <p className='uv-description'>
                        The UV index is a measure of the strength of the sun's ultraviolet (UV) rays. It is a scale
                        primarily used in daily forecasts aimed at the general public. The UV index is designed as an
                        open-ended linear scale, directly proportional to the intensity of UV radiation that causes
                        sunburn on human skin.
                    </p>
                    <div className='scroll-down'>
                        <p>↓↓ Scroll down to check UV levels and precautions ↓↓</p>
                    </div>
                </div>
            </section>
            <div className="uv-precautions-container pt-8">
                <h2 className="text-center text-4xl mb- pt-16">Preventive measures for different UV Levels</h2>
                <section className='uv-precautions'>
                    <UVPrecautions/>
                </section>
            </div>


        </>
    );

}

export default memo(UVFeatures);