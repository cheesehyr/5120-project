import React, { useState, useRef, useEffect } from 'react';
import { GoogleMap, MarkerF, Autocomplete} from '@react-google-maps/api';
import { Box, Container, Typography, Paper, Grid, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Checkbox, Button, Card, CardContent, CircularProgress, Alert, Divider, Switch } from '@mui/material';
import axios from 'axios';
import { Stepper, Step, StepLabel } from '@mui/material';
import LoadingComponent from '@/components/loading/Loading';
import './Activity.css';
import activityBackgroundImage from '../../assets/activity-background.jpg';
import ActivityAdvisor from '@/components/features/activityAdvisor/activityAdvisor';
import PollenLegend from '@/components/pollenLegend/pollenLegend';

const containerStyle = {
  width: '100%',
  height: '600px',
};

const initialCenter = {
  lat: -37.8136,
  lng: 144.9631
};

const filterOptions = [
  "Sport Facility",
  "Community Space",
  "Recreational Resource",
  "Commercial Facility",
  "Cultural Centre",
  'Landmark'
];

class PollenMapType {
  tileSize;
  alt = null;
  maxZoom = 16;
  minZoom = 3;
  name = null;
  projection = null;
  radius = 6378137;
  visible = false;
  mapRef;

  constructor(tileSize, mapRef) {
    this.tileSize = tileSize;
    this.mapRef = mapRef;
  }

  getTile(coord, zoom, ownerDocument) {
    const normalizedCoord = this.getNormalizedCoord(coord, zoom);
    if (!normalizedCoord) {
      return ownerDocument.createElement('div');
    }

    const img = ownerDocument.createElement("img");
    const mapType = "TREE_UPI"; 
    const x = normalizedCoord.x;
    const y = normalizedCoord.y;
    const key = "AIzaSyAZMfIP7tO1KU-ejwIQ55D4FVnsm1KFQjo"; 
    img.style.opacity = this.visible ? 0.8 : 0;
    img.style.transition = 'opacity 0.3s';
    const src = `https://pollen.googleapis.com/v1/mapTypes/${mapType}/heatmapTiles/${zoom}/${x}/${y}?key=${key}`;
    img.src = src;
    return img;
  }

  getNormalizedCoord(coord, zoom) {
    const y = coord.y;
    let x = coord.x;
    const tileRange = 1 << zoom;

    if (y < 0 || y >= tileRange) {
      return null;
    }

    if (x < 0 || x >= tileRange) {
      x = ((x % tileRange) + tileRange) % tileRange;
    }
    return { x: x, y: y };
  }

  

  setVisible(isVisible) {
    this.visible = isVisible;
    // Trigger a redraw of all tiles
    if (this.mapRef.current) {
      const bounds = this.mapRef.current.getBounds();
      if (bounds) {
        this.mapRef.current.fitBounds(bounds);
      }
    }
  }
}

function Activity() {
  const [mapError, setMapError] = useState(null);
  const [filters, setFilters] = useState(filterOptions.reduce((acc, option) => ({...acc, [option]: true}), {}));
  const [center, setCenter] = useState(initialCenter);
  const [autocomplete, setAutocomplete] = useState(null);
  const [radius, setRadius] = useState('5'); // Default to 5km
  const [isMapReady, setIsMapReady] = useState(false);
  const inputRef = useRef(null);
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const mapRef = useRef(null);
  const [showPollenHeatmap, setShowPollenHeatmap] = useState(false);
  const pollenOverlayRef = useRef(null);
  const [selectedPlaceAddress, setSelectedPlaceAddress] = useState(null);
  const [indoorOutdoorFilter, setIndoorOutdoorFilter] = useState({indoor: true,outdoor: true});


  // get the google api to draw the map on the screen
  useEffect(() => {
    if (window.google && window.google.maps) {
      setIsMapReady(true);
      return;
    }

  const googleMapScript = document.querySelector('script[src^="https://maps.googleapis.com/maps/api/js"]');
  if (googleMapScript) {
    googleMapScript.addEventListener('load', () => setIsMapReady(true));
    return;
  }

  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAZMfIP7tO1KU-ejwIQ55D4FVnsm1KFQjo&libraries=places`;
  script.async = true;
  script.defer = true;
  script.addEventListener('load', () => setIsMapReady(true));
  script.addEventListener('error', () => setMapError("Failed to load Google Maps. Please check your API key and network connection."));
  document.head.appendChild(script);

  return () => {
    script.removeEventListener('load', () => setIsMapReady(true));
    script.removeEventListener('error', () => setMapError("Failed to load Google Maps. Please check your API key and network connection."));
  };
}, []);
  const handleMapError = () => {
    setMapError("An error occurred while rendering the map.");
  };

  // handle the change of the filter
  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.checked
    });
  };
  // handle the change of the radius
  const handleRadiusChange = (event) => {
    setRadius(event.target.value);
  };

  // when the autocomplete is loaded, set the autocomplete
  const onLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  // handle the change of the indoor and outdoor filter
  const handleIndoorOutdoorFilterChange = (event) => {
    setIndoorOutdoorFilter({
      ...indoorOutdoorFilter,
      [event.target.name]: event.target.checked
    });
  };

  // connect to the backend to get the places
  const fetchPlaces = async (lat, lng) => {
    setIsLoading(true);
    setMapError(null);
    try {
      const activeFilters = Object.entries(filters)
        .filter(([_, value]) => value)
        .map(([key, _]) => key);

      if (activeFilters.length === 0) {
        throw new Error("No filters selected");
      }
      // set the parameters for the backend to recive the data user wanted
      const params = new URLSearchParams();
      params.append('lat', lat);
      params.append('lng', lng);
      params.append('radius', radius);
      activeFilters.forEach(filter => params.append('filters[]', filter));
      params.append('indoor', indoorOutdoorFilter.indoor);
      params.append('outdoor', indoorOutdoorFilter.outdoor);

      const response = await axios.get(`/api/places?${params.toString()}`);
      setPlaces(response.data);// set the places to the data from the backend
      setCenter({ lat, lng });// set the center of the map to the location user searched
    } catch (error) {
      if (error.message === "No filters selected") {
        setMapError("Please select at least one filter option.");
      } else if (error.response) {
        setMapError("Failed to fetch places. Please try again.");
      } else if (error.request) {
        setMapError("No response received from the server. Please check your network connection.");
      } else {
        setMapError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // check if the address is in Victoria
  const isAddressInVictoria = async (address) => {
    const geocoder = new window.google.maps.Geocoder();
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK" && results[0]) {
          const addressComponents = results[0].address_components;
          const isInVictoria = addressComponents.some(component => 
            component.long_name.toLowerCase() === "victoria" && 
            component.types.includes("administrative_area_level_1")
          );
          resolve(isInVictoria);
        } else {
          reject(new Error("Geocoding failed"));
        }
      });
    });
  };

  const handleSearch = async () => {
    setMapError(null);

    // Check if either indoor or outdoor is selected
    if (!indoorOutdoorFilter.indoor && !indoorOutdoorFilter.outdoor) {
      setMapError("Please select either indoor or outdoor places.");
      return;
    }

    // Check if a location is entered
    if (!inputRef.current || !inputRef.current.value.trim()) {
      setMapError("Please enter a location.");
      return;
    }

    // Check if the entered location is within Victoria
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        try {
          const isInVictoria = await isAddressInVictoria(place.formatted_address);
          if (!isInVictoria) {
            setMapError("The entered address is not within Victoria.");
            return;
          }
          fetchPlaces(place.geometry.location.lat(), place.geometry.location.lng());
        } catch (error) {
          setMapError("Error verifying location. Please try again.");
        }
      }
    } else if (inputRef.current) {
      const address = inputRef.current.value;
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: address }, async (results, status) => {
        if (status === "OK" && results[0]) {
          try {
            const isInVictoria = await isAddressInVictoria(results[0].formatted_address);
            if (!isInVictoria) {
              setMapError("The entered address is not within Victoria.");
              return;
            }
            const { lat, lng } = results[0].geometry.location;
            setCenter({ lat: lat(), lng: lng() });
            fetchPlaces(lat(), lng());
          } catch (error) {
            setMapError("Error verifying location. Please try again.");
          }
        } else {
          setMapError("Couldn't find the location. Please try again.");
        }
      });
    }
  };
  // get the address from the latitude and longitude (data from the backend)
  const getAddressFromLatLng = (lat, lng) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          // set the address to the address card
          setSelectedPlaceAddress(results[0].formatted_address);
        } else {
          setSelectedPlaceAddress("No address found");
        }
      } else {
        setSelectedPlaceAddress("Geocoder failed due to: " + status);
      }
    });
  };

  // when click on the marker, get the place and the address on the address card
  const handleMarkerClick = (place) => {
    setSelectedPlace(place);
    getAddressFromLatLng(place.lat, place.lng);
  };

  // when the map is loaded, show the pollen heatmap
  const onMapLoad = (map) => {
    mapRef.current = map;
    const pollenMapType = new PollenMapType(new window.google.maps.Size(256, 256), mapRef);
    map.overlayMapTypes.insertAt(0, pollenMapType);
    pollenOverlayRef.current = pollenMapType;
  };

  // toggle the pollen heatmap
  const togglePollenHeatmap = () => {
    const newState = !showPollenHeatmap;
    setShowPollenHeatmap(newState);
    // Store current center and zoom
    const currentCenter = mapRef.current.getCenter();
    const currentZoom = mapRef.current.getZoom();

    if (pollenOverlayRef.current && mapRef.current) {
      pollenOverlayRef.current.setVisible(newState);


      mapRef.current.overlayMapTypes.forEach(overlay => {
        if (overlay instanceof PollenMapType) {
          overlay.setVisible(newState);
        }
      });

      // Trigger resize
      window.google.maps.event.trigger(mapRef.current, 'resize');
    } 
    mapRef.current.setCenter(currentCenter);
    mapRef.current.setZoom(currentZoom);
  };
  
  // the steps to show on the screen
  const steps = ['Enter a Location', 'Filter By Your Need', 'Click to Check details', 'Have Fun'];
  
  
    return (
      <div className='background-section'>
         <div className="title-section" style={{ backgroundImage: `url(${activityBackgroundImage})` }}>
            <div className="title-overlay"></div>
            <div className="title-content">
              <h1>Welcome to your Weather-Smart Activity Planner!</h1>
              <p>Find safe and enjoyable activity places tailored to current weather condition around you</p>
            </div>
          </div>

        
      <Box sx={{ width: '100%', padding: '20px 0', backgroundColor: '#e0f0ff', marginTop:'20px'}}>
        <Container maxWidth="xl">
          <Stepper activeStep={4}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel 
                sx={{
                  '& .MuiStepLabel-label': {
                    fontFamily: 'Arial, sans-serif', 
                    fontSize: '1.5rem',                
                    fontWeight: 'bold',             
                  },
                }}
                StepIconProps={{
                  icon: (
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      backgroundColor: '#ff7700c3',
                      color: '#fff',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: '24px'
                    }}>
                      {index + 1}
                    </div>
                  )
                }}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ pt: 6, pb: 4 }}>
        {mapError && <Alert severity="error" sx={{ mb: 2 }}>{mapError}</Alert>}
        <Grid container spacing={2}>
        
        {/* Filter Section */}
        <Grid item xs={12} md={3}>
            <Paper elevation={3} sx={{ p: 2, height: '700px', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h5" gutterBottom>Search and Filter</Typography>
              <Box sx={{ mb: 2 }}>
                {isMapReady && (
                  <Autocomplete onLoad={onLoad}>
                    <TextField
                      inputRef={inputRef}
                      fullWidth
                      label="Enter a location"
                      variant="outlined"
                      margin="normal"
                    />
                  </Autocomplete>
                )}
              </Box>
              <FormControl component="fieldset" sx={{ mb: 2 }}>
                <FormLabel component="legend">Distance</FormLabel>
                <RadioGroup
                  row
                  aria-label="distance"
                  name="distance"
                  value={radius}
                  onChange={handleRadiusChange}
                >
                  <FormControlLabel value="1" control={<Radio />} label="1km" />
                  <FormControlLabel value="3" control={<Radio />} label="3km" />
                  <FormControlLabel value="5" control={<Radio />} label="5km" />
                </RadioGroup>
              </FormControl>
              <Typography variant="subtitle1" gutterBottom>Indoor/Outdoor:</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 2 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={indoorOutdoorFilter.indoor}
                        onChange={handleIndoorOutdoorFilterChange}
                        name="indoor"
                      />
                    }
                    label="Indoor"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={indoorOutdoorFilter.outdoor}
                        onChange={handleIndoorOutdoorFilterChange}
                        name="outdoor"
                      />
                    }
                    label="Outdoor"
                  />
                </Box>
              <Typography variant="subtitle1" gutterBottom>Filter Options:</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 2 }}>
                {filterOptions.map(option => (
                  <FormControlLabel
                    key={option}
                    control={
                      <Checkbox
                        checked={filters[option]}
                        onChange={handleFilterChange}
                        name={option}
                      />
                    }
                    label={option}
                    sx={{ width: '50%', marginRight: 0 }}
                  />
                ))}
              </Box>
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle1" gutterBottom>Environmental Data:</Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={showPollenHeatmap}
                    onChange={togglePollenHeatmap}
                    name="pollenHeatmap"
                    color="primary"
                  />
                }
                label={
                  <Box>
                    <Typography variant="body1">Pollen Heat Map</Typography>
                    <Typography variant="body2" color="text.secondary">
                      View tree pollen concentration levels
                    </Typography>
                  </Box>
                }
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSearch}
                disabled={isLoading}
                sx={{ mt: 'auto' }}
              >
                {isLoading ? <CircularProgress size={24} /> : 'Search'}
              </Button>
            </Paper>
          </Grid>

        {/* Map Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ height: '700px' }}>
            {isMapReady && (
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={center}
                zoom={12}
                onLoad={onMapLoad}
                onError={handleMapError}
              >
                {places.map(place => (
                  <MarkerF
                    key={place.id}
                    position={{lat: place.lat, lng: place.lng}}
                    onClick={() => handleMarkerClick(place)}
                  />
                ))}
                {showPollenHeatmap && <PollenLegend />}
              </GoogleMap>
            )}
          </Paper>
        </Grid>
        
          {/* Place Information Section */}
          <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 2, height: '700px', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h5" gutterBottom>Place Information</Typography>
            <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
              {selectedPlace ? (
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {selectedPlace.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Type: {selectedPlace.type}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Subtype: {selectedPlace.subtype}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedPlace.indoor ? 'Indoor' : 'Outdoor'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Distance: {selectedPlace.distance.toFixed(2)} km
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Address: {selectedPlaceAddress || LoadingComponent}
                    </Typography>
                  </CardContent>
                </Card>
              ) : (
                <Typography variant="body1" color="text.secondary" align="center">
                  Select a place on the map to view details
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>
        </Grid>
      </Container>
      <Box sx={{ my: 6 }}>
        <Container maxWidth="xl">
            <Grid item xs={12} md={7} lg={8}>
              <ActivityAdvisor />
            </Grid>
        </Container>
      </Box>

      </div>
    );
  }
export default Activity;