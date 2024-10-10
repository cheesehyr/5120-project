import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import { Typography } from '@mui/material'; // Import Typography from Material-UI
import './vd-diseases.css'; // Import the CSS file

import ImageRicket from '../../../assets/vd-disease/rickets.jpg'; 
import ImageMuscleWeakness from '../../../assets/vd-disease/muscle_weakness.jpeg'; 
import ImageAsthma from '../../../assets/vd-disease/asthma.jpg'; 
import ImageImmune from '../../../assets/vd-disease/immune.jpg'; 
import ImageBonePain from '../../../assets/vd-disease/bone-pain.jpg'; 

function VitaminDCarousel() {
  const diseases = [
    {
      imgSrc: ImageRicket,
      title: "Rickets",
      text: "Rickets is a condition that affects children's bones, making them soft and weak. It happens when the body doesn’t get enough Vitamin D, which is needed to help bones grow strong. This can cause bone pain, delayed growth, and bent or curved bones, like bowed legs."
    },
    {
      imgSrc: ImageMuscleWeakness,
      title: "Muscle Weakness",
      text: "Muscle Weakness is a common symptom of Vitamin D deficiency in children. It can cause children to feel tired, have difficulty with physical activities like walking or playing, and experience general weakness in their arms and legs. This condition affects their overall strength and coordination, making everyday tasks more challenging."
    },
    {
      imgSrc: ImageAsthma,
      title: "Asthma",
      text: "Asthma is a respiratory condition that can be worsened by Vitamin D deficiency in children. It causes the airways to become inflamed and narrow, leading to difficulty breathing, wheezing, and frequent coughing. Children with Vitamin D deficiency may experience more severe asthma symptoms and frequent flare-ups, making it harder to control the condition. "
    },
    {
      imgSrc: ImageImmune,
      title: "Weakened Immune System",
      text: "A Weakened Immune System is another potential effect of Vitamin D deficiency in children. Vitamin D plays a crucial role in supporting the immune system, helping the body fight off infections and illnesses. When a child’s immune system is weakened, they may become more susceptible to frequent colds, flu, and other infections."
    },
    {
      imgSrc: ImageBonePain,
      title: "Bone Pain",
      text: "Bone Pain is a common symptom of Vitamin D deficiency in children. Without enough Vitamin D, bones become weak and brittle, causing discomfort and aching, especially in the legs, arms, and spine. This pain can affect a child’s ability to move and play normally."
    }
  ];

  return (
    <div className="carousel-container">
      {/* Use Typography component for the title */}
      <Typography variant="h4" align="center" gutterBottom className="custom-title">
        Understanding the Impact of Vitamin D Deficiency
      </Typography>
      
      <p className="carousel-description">
        Vitamin D deficiency can lead to several health issues. Below are some common diseases associated with a lack of Vitamin D.
      </p>
      <Carousel>
        {diseases.map((disease, index) => (
          <Carousel.Item key={index}>
            <Card className="text-center" style={{ width: '100%', margin: 'auto' }}>
              <Card.Img 
                variant="top" 
                src={disease.imgSrc} 
                alt={disease.title} 
                className={`carousel-image ${disease.title === "Rickets" ? 'rickets' : ''}`} 
              />
              <Card.Body className="card-text-section">
                <Card.Title>{disease.title}</Card.Title>
                <Card.Text>{disease.text}</Card.Text>
              </Card.Body>
            </Card>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default VitaminDCarousel;
