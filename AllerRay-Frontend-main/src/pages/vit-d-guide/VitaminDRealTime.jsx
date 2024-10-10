import React, {useState, useEffect} from 'react';
import {Box, Card, Grid, Typography} from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import './VitaminDRealTime.css';
import SkinTypeSelect from "@/pages/vit-d-guide/SkinTypeSelect.jsx";
import uvIcon from '@/assets/icons/uv-index.svg';

import {dailyVitaminDNeeded, estimatedVitDProduction, getUVExposureData, uvLevelBodyExposure} from "@/pages/vit-d-guide/dataService.js";
import LoadingComponent from "@/components/loading/Loading.jsx";

const VitaminDRealTime = () => {
    const [skinType, setSkinType] = useState('');
    const [dailyRequiredVitD, setDailyRequiredVitD] = useState("");
    const [recommendations, setRecommendations] = useState([]);
    const [estimatedVitDLevel, setEstimatedVitDLevel] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [uvLevel, setUVLevel] = useState(null);
    const [hasSelectedSkinType, setHasSelectedSkinType] = useState(false);

    // function to calculate the estimated Vitamin-D level based on the skin type and uv level
    const calculateEstimatedVitDLevel = (uvIndex, skinType) => {
        const roundedUVIndex = Math.round(uvIndex);
        if (roundedUVIndex === 0) return null;
        
        const uvRange = Object.keys(estimatedVitDProduction).find(range => {
            const [min, max] = range.split('-').map(Number);
            return roundedUVIndex >= min && (max ? roundedUVIndex <= max : true);
        });

        if (!uvRange) {
            return "No data available for this UV index";
        }

        return estimatedVitDProduction[uvRange][skinType];
    };

    const handleSkinTypeChange = (event) => {
        const newSkinType = event.target.value;
        setSkinType(newSkinType);
        setHasSelectedSkinType(true);
        if (Math.round(uvLevel) > 0) {
            setDailyRequiredVitD(dailyVitaminDNeeded[newSkinType]);
            setRecommendations(getUVExposureData(Math.round(uvLevel), newSkinType));
            setEstimatedVitDLevel(calculateEstimatedVitDLevel(uvLevel, newSkinType));
        } else {
            // Reset these values when rounded UV is 0
            setDailyRequiredVitD("");
            setRecommendations([]);
            setEstimatedVitDLevel('');
        }
    };

    function getBodyExposureData() {
        const roundedUVLevel = Math.round(uvLevel);
        if (roundedUVLevel === 0) return null;

        const uvRange = Object.keys(uvLevelBodyExposure).find(range => {
            const [min, max] = range.split('-').map(Number);
            return roundedUVLevel >= min && (max ? roundedUVLevel <= max : true);
        });

        if (!uvRange) {
            return null;
        }

        return uvLevelBodyExposure[uvRange];
    }
    
    // Fetch UV data from the API
    useEffect(() => {
        fetchUVData();
    }, []);

    // Fetch UV data from the API
    const fetchUVData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/melUV');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setUVLevel(data.current);
            // Reset other states when UV changes
            setSkinType('');
            setHasSelectedSkinType(false);
            setDailyRequiredVitD("");
            setRecommendations([]);
            setEstimatedVitDLevel('');
        } catch (error) {
            console.error("Error fetching UV data:", error);
            // Handle error state here
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <LoadingComponent />;
    }

    const roundedUVLevel = Math.round(uvLevel);
    return (
        <Box className="container" sx={{padding: '20px', maxWidth: '950px'}}>
            <Typography variant="h4" gutterBottom textAlign="center" className="custom-title">
                Real Time Vitamin D Exposure Planner
            </Typography>
            <Grid container alignItems="center" justifyContent="space-between" sx={{mb: 4, gap: "2rem"}}>
                <Grid item>
                    <Box display="flex" alignItems="center" flexDirection="column">
                        <Box display="flex" alignItems="center">
                            <Typography variant="h5" sx={{ mt: 4 }}>
                                Current UV level
                            </Typography>
                            <Box sx={{
                                width: 12,
                                height: 12,
                                bgcolor: '#fc3c3c',
                                borderRadius: '50%',
                                ml: 1,
                                animation: 'breathing 2s infinite'
                            }}/>
                        </Box>
                        <Box position="relative">
                            <img src={uvIcon} alt="UV Icon" style={{width: '100px', height: '100px'}}/>
                            <Box position="absolute" bottom={16} left={97} borderRadius="50%">
                                <Typography variant="h6" color="black" fontWeight="bold" minWidth="70px">{`- ${uvLevel}`}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item>
                    <Box display="flex" alignItems="center" flexDirection="column">
                        <Typography variant="h5">
                            Select Your Skin Type
                        </Typography>
                        <SkinTypeSelect 
                            value={skinType} 
                            onChange={handleSkinTypeChange}
                        />
                    </Box>
                </Grid>
            </Grid>

            {roundedUVLevel === 0 && hasSelectedSkinType ? (
                <Typography variant="h5" color="error" sx={{mt: 2, mb: 2, fontWeight: 'bold', textAlign: 'center'}}>
                    The UV level is 0 or too low. No vitamin D production is possible at this time.
                </Typography>
            ) : roundedUVLevel > 0 && skinType ? (
                <Grid container spacing={3}>
                    {/* Left Column: Recommendations */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="body1" sx={{mb: 2}}>
                            For the Skin Type <span style={{fontWeight: "bold", fontFamily: "monospace"}}>{skinType}</span>,<br/> The Daily Vitamin D needed
                            is: <span style={{fontWeight: "bold"}}>{dailyRequiredVitD}</span> approximately.
                        </Typography>

                        <Grid container spacing={3} direction="row">
                            {recommendations.map((detail, index) => (
                                <Grid item xs={12} key={index}>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        sx={{
                                            p: 1,
                                            boxShadow: 3,
                                            borderRadius: 2,
                                            bgcolor: 'background.paper',
                                            transition: 'transform 0.3s',
                                            '&:hover': {
                                                transform: 'scale(1.05)',
                                            },
                                        }}>
                                        <img src={detail.img} height="90px" style={{padding: "1rem"}} alt={detail.text}/>
                                        <Typography variant="body2" sx={{ml: 2}} fontWeight="bold">{detail.text}</Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>

                    {/* Right Column: Body Exposure Image and Estimated Vitamin D */}
                    <Grid item xs={12} md={6} container alignItems="flex-end">
                        <Box display="flex" flexDirection="column" alignItems="center">
                            {getBodyExposureData() && (
                                <img src={getBodyExposureData().img} alt="Body Exposure" style={{height: '450px', marginBottom: '1rem'}}/>
                            )}
                            {estimatedVitDLevel && (
                                <Box sx={{mt: 4, width: '100%'}}>
                                    <Typography variant="body2" sx={{fontSize: "16px", mb: 2, maxWidth: "425px"}}>
                                        Estimated Vitamin D production for the UV Index <span style={{fontWeight: "bold"}}>{uvLevel}</span> based on the Skin
                                        Type <span style={{fontWeight: "bold", fontFamily: "monospace"}}>{skinType}</span>
                                    </Typography>
                                    <div style={{display: "flex", gap: "2rem", flexWrap: "wrap"}}>
                                        {estimatedVitDLevel.map((entry, index) => (
                                            <Card key={index} variant="outlined" sx={{p: 2, bgcolor: '#e3f2fd', borderRadius: 2}}>
                                                <Box display="flex" alignItems="center" mb={1}>
                                                    <WbSunnyIcon sx={{color: '#1976d2', mr: 1}}/>
                                                    <Typography variant="h6" component="div" sx={{fontWeight: "bold", color: '#1976d2'}}>
                                                        {entry.amount}
                                                    </Typography>
                                                </Box>
                                                <Typography variant="body2" color="text.secondary">
                                                    for {entry.duration}
                                                </Typography>
                                            </Card>
                                        ))}
                                    </div>
                                </Box>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            ) : null}
        </Box>
    );
};

export default VitaminDRealTime;
