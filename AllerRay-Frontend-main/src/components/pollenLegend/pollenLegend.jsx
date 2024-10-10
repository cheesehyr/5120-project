import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const PollenLegend = () => {
  const legendItems = [
    { color: '#41af5b', label: 'Very Low' },
    { color: '#95d75d', label: 'Low' },
    { color: '#fdfc53', label: 'Medium' },
    { color: '#ef9e3f', label: 'High' },
    { color: '#FF0000', label: 'Very High' },
  ];

  return (
    <Paper elevation={3} sx={{ position: 'absolute', bottom: '10px', left: '10px', padding: '10px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
      <Typography variant="subtitle2" gutterBottom>Pollen Concentration</Typography>
      {legendItems.map((item, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box sx={{ width: 20, height: 20, backgroundColor: item.color, mr: 1 }} />
          <Typography variant="body2">{item.label}</Typography>
        </Box>
      ))}
    </Paper>
  );
};

export default PollenLegend;