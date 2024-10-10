import React from 'react';
import PlantChooseGuide from "@/components/features/plant-choose/plant-choose";
import LowPollenPlant from "@/components/features/lowPollenPlant/LowPollenPlant";
import HighPollenPlant from "@/components/features/highPollenPlant/HighPollenPlant";
import PlantChatbot from '@/components/features/chatbot/PlantChatBot';

import PlantBgImage from '@/assets/plant-background.jpg'; 


const PollenPlantsPlanner = () => {
  return (
    <div className='background-section'>
      <div className="wide-container">
        {/* Title section with background image */}
        <div className="title-section" style={{ backgroundImage: `url(${PlantBgImage})` }}>
          <div className="title-overlay"></div>
          <div className="title-content">
            <h1 className="text-center">Your Guide to Pollen and Allergen Plants</h1>
            <p className="text-center">Identify allergenic plants and find allergy-friendly alternatives for your space.</p>
          </div>
        </div>

        <div className="pollen-plants-planner">
          {/* First display High Pollen Plants */}
          <div className="high-pollen-plants">
            <HighPollenPlant />
          </div>
          
          {/* Plant Choose Guide */}
          <PlantChooseGuide />
          
          {/* Followed by Low Pollen Plants */}
          <div className="low-pollen-plants" style={{ marginBottom: '50px' }}>
            <LowPollenPlant />
          </div>
        </div>
      </div>
      <div style={{ position: 'fixed', zIndex: 9999, bottom: 0, right: 0 }}>
        <PlantChatbot />
      </div>
  </div>
  );
};

export default PollenPlantsPlanner;