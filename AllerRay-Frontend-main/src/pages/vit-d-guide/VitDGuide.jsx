import React from 'react';
import { Box } from '@mui/material';
import './VitDGuide.css';
import VitaminDRealTime from "@/pages/vit-d-guide/VitaminDRealTime.jsx";
import VDChart from '@/components/features/vd-info/vd-info';
import VitaminDCarousel from '@/components/features/vd-diseases/vd-diseases';
import VitDRiskTest from "@/pages/vit-d-guide/VitDRiskTest.jsx";

import vdBgImage from '@/assets/vitamind-background.jpg'; // Ensure this path is correct

function VitDGuide() {
    return (
        <div className='background-section'>
            <div className="wide-container">
                <div className="title-section" style={{ backgroundImage: `url(${vdBgImage})` }}>
                    <div className="title-overlay"></div>
                    <div className="title-content">
                        <h1 className="text-center">Vitamin D Deficiency in Children</h1>
                        <p className="text-center">Boost Your Well-Being with Instant Vitamin D Insights, Anytime, Anywhere</p>
                    </div>
                </div>

                {/* Main Content Section */}
                <Box className="vit-d-guide" sx={{ p: 3 }}>
                    <VitaminDRealTime />
                    <VitaminDCarousel />
                    <VitDRiskTest />
                    {/* UV Exposure Chart */}
                    <VDChart />
                </Box>
            </div>
        </div>
    );
}

export default VitDGuide;
