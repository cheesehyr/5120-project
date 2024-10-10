import React from 'react';
import { Box, Typography } from '@mui/material';
import './vd-info.css';  // Import the CSS file

const VDChart = () => {
    return (
        <Box sx={{ mt: 4 }}>
            {/* Centered Heading above the chart with margin-bottom */}
            <Typography variant="h4" align="center" gutterBottom className="custom-title" sx={{mt:10, mb:6}}>
                Vitamin D Deficiency Levels Across Australia
            </Typography>

            {/* Layout with chart on the left and text on the right */}
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mt: 2 }}>
                {/* Left Side Chart */}
                <Box sx={{ flex: 2 }}>
                    <iframe
                        title="Datawrapper Chart"
                        aria-label="Map"
                        id="datawrapper-chart-898h6"
                        src="https://datawrapper.dwcdn.net/898h6/1/"
                        scrolling="no"
                        frameBorder="0"
                        style={{ width: '100%', minWidth: '100% !important', border: 'none', height: '700px' }}
                    ></iframe>
                </Box>

                {/* Right Side Text */}
                <Box sx={{ flex: 1, pl: 2 }}>
                    <Typography variant="body1">
                    In Victoria, nearly <strong>half of the population (49%)</strong> may not be getting enough Vitamin D, which is crucial for children’s growth and overall health. Vitamin D helps strengthen bones, boosts the immune system, and supports your child’s well-being. Since Victoria has less sunlight than other parts of Australia due to its cooler climate, it’s important to consider how your family can get enough Vitamin D.
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                    Encouraging safe outdoor activities during the day and considering Vitamin D supplements, especially in the winter months, can help ensure your kids stay healthy and strong. Speak to your healthcare provider to understand the best options for your family.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default VDChart;
