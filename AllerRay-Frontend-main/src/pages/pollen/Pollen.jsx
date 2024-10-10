import React from 'react';
import { Container, Row, Col, Card  } from 'react-bootstrap';
import { Button, Divider, Typography, Box, Grid,styled } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AllergicAwareness from '../../components/features/allergicAwarness/allergy';
import TriggerFeature from '../../components/features/hayfever-triggers/trigger.jsx';
import PictogramChart from '@/components/features/pictogram/pictogram';
import './Pollen.css';
import { useEffect } from 'react';
import pollenImage from '@/assets/pollen-background.jpg';
import PlantChatbot from '@/components/features/chatbot/PlantChatBot';

const ChatbotContainer = styled(Box)({
  position: 'fixed',
  bottom: 16,
  right: 16,
  zIndex: 9999, // ensure it's above other content
});
const Pollen = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div className='background-section'>
      <div className="wide-container">
      <div className="title-section" style={{ backgroundImage: `url(${pollenImage})` }}>
        <div className="title-overlay"></div>
        <div className="title-content">
          <h1 className="text-center">Understanding Pollen and Hay Fever</h1>
          <p className="text-center">Learn about symptoms, risks, and prevention strategies.</p>
        </div>
      </div>

      <PictogramChart />

      <Container className="my-5">
        <Row className="text-center">
          <Col>
            <h2 style={{ color: '#004085' }}>Common Symptoms</h2>
            <p> Identify signs of pollen allergies and hay fever in children.</p>
          </Col>
        </Row> 
      </Container>

      <AllergicAwareness />

      <Container className="my-5">
        <Row className="text-center">
          <Col>
            <h2 style={{ color: '#004085' }}>Common Hay fever Triggers & Prevention</h2>
            <p>Find the common triggers around your children.</p>
          </Col>
        </Row>
      </Container>

      <TriggerFeature />

     <Container>
        <Box sx={{  mb: 4 }}>
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
                  Learn More About pollen of different plants
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Explore the diverse world of plant pollen and understand its impact on allergies and the environment.
                </Typography>
                <Button
                  component={RouterLink}
                  to="/pollenplantsplanner"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 'auto' }}
                >
                  Explore Plant Pollen Information
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
      </Container>
    </div>
    </div>
  
  );
};

export default Pollen;