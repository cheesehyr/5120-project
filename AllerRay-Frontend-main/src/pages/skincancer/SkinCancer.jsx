import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Grid, Divider, Typography, Box, Button } from '@mui/material';
import UVFeatures from '../../components/features/UVFeatures';
import SkinCancerContent from './SkinCancerContent';
import uvImage from '../../assets/uv-background.jpg';
import './SkinCancer.css';

const SkinCancer = () => {
  return (
    <div className='background-section'>
      <div className="wide-container">
        <div className="title-section" style={{ backgroundImage: `url(${uvImage})` }}>
          <div className="title-overlay"></div>
          <div className="title-content">
            <h1>Understanding Skin Cancer</h1>
            <p>Learn about symptoms, risks, and prevention strategies.</p>
          </div>
        </div>
        <div className="content-container">
          <SkinCancerContent />
          <UVFeatures />
          <Box sx={{ mt: 4, mb: 4 }}>
            <Divider 
              sx={{ 
                mb: 4, 
                borderBottomWidth: 3,
                borderColor: '#000',
                opacity: 0.7
              }} 
            />
          <Grid container spacing={4} justifyContent="center" alignItems="stretch">
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                alignItems: 'center',
                textAlign: 'center',
                p: 2
              }}>
                <Typography variant="h6" gutterBottom>
                  Learn More About Vitamin D
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Discover the importance of Vitamin D for your health and ways to ensure you're getting enough.
                </Typography>
                <Button
                  component={RouterLink}
                  to="/vit-d-guide"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 'auto' }}
                >
                  Explore Vitamin D
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                alignItems: 'center',
                textAlign: 'center',
                p: 2
              }}>
                <Typography variant="h6" gutterBottom>
                  Check Real-Time UV and Pollen Data
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Stay informed with up-to-date UV index and pollen levels in your area.
                </Typography>
                <Button
                  component={RouterLink}
                  to="/realinfo"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 'auto' }}
                >
                  View Real-Time Data
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
    </div>
  </div>
</div>
  );
};

export default SkinCancer;
