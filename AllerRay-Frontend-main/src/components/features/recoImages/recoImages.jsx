import React from 'react';
import './recoImages.css';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const RecommendationImages = ({ emojis }) => {
  return (
    <Grid container spacing={2}>
      {emojis.map((emoji, index) => (
        <Grid item xs={6} sm={4} md={3} key={index}>
          <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <img src={emoji.image} alt={emoji.label} style={{ width: '48px', height: '48px', marginBottom: '8px' }} />
              <Typography variant="body2" align="center">
                {emoji.label}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};


export default RecommendationImages;