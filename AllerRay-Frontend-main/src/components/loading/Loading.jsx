import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

// Loading component to display a loading spinner and message
const LoadingComponent = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <CircularProgress size={60} thickness={4} />
      <Typography variant="h6" style={{ marginTop: 16 }}>
        Loading...
      </Typography>
    </Box>
  );
};

export default LoadingComponent;