import React, { useEffect,useState } from 'react';
import { Paper, Typography, Box, Grid } from '@mui/material';
import LoadingComponent from '@/components/loading/Loading';

const indoorActivities = [
  "Museums",
  "Art galleries",
  "swimming pools",
  "Entertainment centers",
  "Aquariums",
  "Indoor playgrounds",
  "Libraries",
  "Indoor sports facilities",
  "Shopping malls",
  "Cinemas"
];

const outdoorActivities = [
  "Tourist attractions",
  "Playgrounds",
  "Boathouses",
  "Picnic sites",
  "Campgrounds",
  "Day visitor areas",
  "Lookouts",
  "Parks",
  "Beaches",
  "Hiking trails"
];

const ActivityAdvisor = () => {
  const [uvIndex, setUvIndexData] = useState(null);
  const [pollenLevel, setPollenData] = useState(null);
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
        setPollenData(pollenData.current);
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        setIsLoading(false);
    }
  };

  const getSuggestedActivities = () => {
    if (uvIndex >= 8 || pollenLevel >= 4) {
      return {
        recommendation: "Indoor activities are recommended due to high UV index or pollen levels.",
        activities: indoorActivities
      };
    } else if (uvIndex <= 5 && pollenLevel <= 2) {
      return {
        recommendation: "All activities are suitable due to favorable conditions.",
        activities: [...indoorActivities, ...outdoorActivities]
      };
    } else {
      return {
        recommendation: "Moderate outdoor activities are fine, but consider indoor options if you're sensitive to UV or pollen.",
        activities: [...indoorActivities, ...outdoorActivities.slice(0, 5)] // Mix of indoor and some outdoor activities
      };
    }
  };

  const { recommendation, activities } = getSuggestedActivities();

  return (
    <Paper elevation={3} sx={{ p: 3, backgroundColor: '#e0f0ff', height: '100%', overflowY: 'auto' }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
        Real-time Activity Places Advisor
      </Typography>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <LoadingComponent />
        </Box>
      ) : (
      <>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body1">
          Current UV Index: <strong>{uvIndex}</strong>
        </Typography>
        <Typography variant="body1">
          Current Pollen Level: <strong>{pollenLevel}</strong>
        </Typography>
      </Box>
      <Typography variant="body1" sx={{ fontWeight: 'medium', mb: 1 }}>
        Recommendation:
      </Typography>
      <Typography variant="body2" paragraph>
        {recommendation}
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 'medium', mb: 1 }}>
        Suggested Places of Activities:
      </Typography>
      <Grid container spacing={1}>
        {activities.map((activity, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <Paper elevation={1} sx={{ p: 1, textAlign: 'center', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',backgroundColor:'#edbee9' }}>
              <Typography variant="body2">{activity}</Typography>
            </Paper>
          </Grid>
      
        ))}
      </Grid>
    </>)}
    </Paper>
    
  );
};

export default ActivityAdvisor;