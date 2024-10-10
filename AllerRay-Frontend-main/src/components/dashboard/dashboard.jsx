import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LoadingComponent from '../loading/Loading';
import { RangeGaugeComponent } from "@/components/features/rangeGauge/rangeGauge.jsx";
import ForecastChart from "@/components/features/forecastChart/forecastChart.jsx";
import RecommendationImages from '../features/recoImages/recoImages';
import DataService from './dataService';
import dashboardImage from '@/assets/dashboard-background.jpg';
import './dashboard.css';

function Dashboard() {
    const [uvIndexData, setUvIndexData] = useState(null);
    const [pollenData, setPollenData] = useState(null);
    const [uvForecast, setUvForecast] = useState([]);
    const [pollenForecast, setPollenForecast] = useState([]);
    const [combinedPrecautions, setCombinedPrecautions] = useState([]); // Combined precautions based on UV and pollen levels
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    // Fetch UV and pollen data from the API
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [uvResponse, pollenResponse] = await Promise.all([
                fetch('/api/melUV'),
                fetch('/api/melPollen')
            ]);

            const uvData = await uvResponse.json();
            const pollenData = await pollenResponse.json();

            setUvIndexData(uvData.current);
            setUvForecast({ dailyInfo: uvData.forecast.dailyInfo });
            setPollenData(pollenData.current);
            setPollenForecast({ dailyInfo: pollenData.forecast.dailyInfo });

            setCombinedPrecautions(DataService.getCombinedPrecautions(uvData.current, pollenData.current));
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <LoadingComponent />;
    }

    const LearnMoreButton = ({ to, children }) => (
        <Button
            component={RouterLink}
            to={to}
            variant="contained"
            color="primary"
            size="small"
            sx={{
                fontWeight: 'bold',
                boxShadow: 3,
                '&:hover': {
                    backgroundColor: 'secondary.main',
                    transform: 'scale(1.05)',
                    transition: 'all 0.2s',
                },
            }}
        >
            {children}
        </Button>
    );

    // Paper component with a title and children
    const PaperWithTitle = ({ title, children, buttonTo, buttonText }) => (
        <Paper elevation={3} sx={{ p: 2, height: '100%', backgroundColor: '#fff', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: 2 }}>
                <Typography variant="h6" fontWeight="bold">{title}</Typography>
            </Box>
            <Box sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%',
                background: 'transparent',
                position: 'relative'
            }}>
                {children}
                {buttonTo && (
                    <Box sx={{ position: 'absolute', bottom: 0, right: 0 }}>
                        <LearnMoreButton to={buttonTo}>{buttonText}</LearnMoreButton>
                    </Box>
                )}
            </Box>
        </Paper>
    );

    return (
        <div className='background-section'>
            <div className="wide-container">
                <div className="title-section" style={{ backgroundImage: `url(${dashboardImage})` }}>
                    <div className="title-overlay"></div>
                    <div className="title-content">
                        <h1 className="text-center">Melbourne UV and Pollen Dashboard</h1>
                        <p className="text-center">Monitor current UV index and pollen levels in Melbourne.</p>
                    </div>
                </div>
        <Container maxWidth="lg" sx={{ pt: 4, pb: 4 }}>
            <Grid container spacing={3}>
               

                {/* Current UV Index */}
                <Grid item xs={12} md={6}>
                    <PaperWithTitle
                        title="Current UV Index"
                        buttonTo="/skincancer"
                        buttonText="Learn More About UV"
                    >
                        <RangeGaugeComponent
                            value={uvIndexData}
                            minValue={0}
                            maxValue={11}
                            segments={5}
                            currentValueText={uvIndexData ? "UV Level - " + uvIndexData : "UV Level"}
                            segmentColors={DataService.uvRangeColors}
                            customSegmentLabels={DataService.uvSegmentLabels}
                        />
                    </PaperWithTitle>
                </Grid>

                {/* UV Forecast */}
                <Grid item xs={12} md={6}>
                    <PaperWithTitle title="UV Forecast" >
                        <ForecastChart
                            apiResponse={uvForecast}
                            forecastType="uvIndex"
                            chartTitle="UV Exposure Forecast"
                            lineColor={DataService.uvForecastLineColor}
                        />
                    </PaperWithTitle>
                </Grid>

                {/* Current Pollen Level */}
                <Grid item xs={12} md={6}>
                    <PaperWithTitle
                        title="Current Pollen Level"
                        buttonTo="/pollenandhayfever"
                        buttonText="Learn More About Pollen"
                    >
                        <RangeGaugeComponent
                            value={pollenData}
                            minValue={0}
                            maxValue={6}
                            segments={6}
                            currentValueText={pollenData ? "Pollen Level - " + pollenData : "Pollen Level"}
                            segmentColors={DataService.pollenRangeColors}
                            customSegmentLabels={DataService.pollenSegmentLabels}
                        />
                    </PaperWithTitle>
                </Grid>

                {/* Pollen Forecast */}
                <Grid item xs={12} md={6}>
                    <PaperWithTitle title="Pollen Forecast" >
                        <ForecastChart
                            apiResponse={pollenForecast}
                            forecastType="pollenValue"
                            chartTitle="Pollen Forecast"
                            lineColor={DataService.pollenForecastLineColor}
                        />
                    </PaperWithTitle>
                </Grid>

                {/* Combined Precautions */}
                <Grid item xs={12}>
                    <PaperWithTitle title="Recommendations">
                        {combinedPrecautions.length > 0 ? (
                            <RecommendationImages emojis={combinedPrecautions} />
                        ) : (
                            <Typography>No precautions to display at this time.</Typography>
                        )}
                    </PaperWithTitle>
                </Grid>


            </Grid>
        </Container>
        </div>
    </div>
    );
}

export default Dashboard;