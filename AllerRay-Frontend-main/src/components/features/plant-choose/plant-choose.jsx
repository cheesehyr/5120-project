import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Typography } from '@mui/material'; // Import Typography from Material-UI


import './plant-choose.css';

const PlantChooseGuide = () => {
  const cardStyle = {
    backgroundColor: '#fff', 
    borderColor: '#b3d7ff',
    color: '#000',
  };

  return (
    <>
      <Row className="text-center my-3">
        <Col>
            <Typography variant="h4" align="center" gutterBottom className="custom-title" sx={{mt: 12}}>
            Guide on How to Maintain a Low Pollen Garden
            </Typography>
          <Typography variant="h6" component="h2" gutterBottom align="center">Effective plant selection and placement tips for minimizing pollen exposure</Typography>
        </Col>
      </Row>

      {/* First row of cards */}
      <Row className="d-flex justify-content-center">
        <Col xs={12} md={6} lg={5} className="my-3 d-flex justify-content-center">
          <Card style={cardStyle} className="plant-guide-card">
            <Card.Body>
              <Card.Title>Choose Insect- or Bird-Pollinated Plants</Card.Title>
              <Card.Text>
                Pick plants pollinated by insects or birds, as wind-pollinated plants release more airborne pollen, increasing allergy risks.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={6} lg={5} className="my-3 d-flex justify-content-center">
          <Card style={cardStyle} className="plant-guide-card">
            <Card.Body>
              <Card.Title>Go for Smaller, Less Showy Flowers</Card.Title>
              <Card.Text>
                Smaller, modest blooms produce less pollen, making them better for minimizing allergy exposure compared to large, vibrant flowers.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Second row of cards */}
      <Row className="d-flex justify-content-center">
        <Col xs={12} md={6} lg={5} className="my-3 d-flex justify-content-center">
          <Card style={cardStyle} className="plant-guide-card">
            <Card.Body>
              <Card.Title>Choose Non-Flowering Plants</Card.Title>
              <Card.Text>
                Non-flowering plants like ferns and succulents are low-pollen options, as they don't rely on pollen for reproduction, making them allergy-friendly.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={6} lg={5} className="my-3 d-flex justify-content-center">
          <Card style={cardStyle} className="plant-guide-card">
            <Card.Body>
              <Card.Title>Plant in Strategic Locations</Card.Title>
              <Card.Text>
                Place plants with higher pollen counts away from windows, patios, and entrances to prevent pollen from entering your living spaces.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="text-center my-4">
         <Col>
            <Typography variant="body1" align="center">
            Visit your local Bunnings Warehouse to explore a wider range of plants and receive expert advice on creating your low-pollen garden, or check out their <a href="https://www.bunnings.com.au/diy-advice/garden/planting-and-growing/how-to-create-a-low-allergy-garden" target="_blank" rel="noopener noreferrer">low allergy garden guide</a> for more tips.
            </Typography>
         </Col>
      </Row>
    </>
  );
};

export default PlantChooseGuide;
