import React, { useState } from 'react';
import {Container,Typography,Box,Grid,Card,CardContent,CardMedia,Button,Chip,Dialog,DialogTitle,DialogContent,DialogActions} from '@mui/material';
import './LowPollenPlant.css'; 


import spiderplant from '../../../assets/pollenplants/spiderplant.jpg';
import arecaPalm from '../../../assets/pollenplants/Areca-Palm.webp.jpeg';
import snakePlant from '../../../assets/pollenplants/snakeplant.jpeg';
import peaceLily from '../../../assets/pollenplants/PeaceLily.jpeg';
import bostonFern from '../../../assets/pollenplants/bosternfern.jpg.webp';
import boxwood from '../../../assets/pollenplants/boxwood.jpg';
import camellia from '../../../assets/pollenplants/camellia.jpg';
import azalea from '../../../assets/pollenplants/azalia.jpg';
import magnolia from '../../../assets/pollenplants/magnolia.jpg.webp';
import hydrangea from '../../../assets/pollenplants/Hydrangea.jpg.webp';
import orchids from '../../../assets/pollenplants/orchids.jpg';
import rose from '../../../assets/pollenplants/rose.jpg';


const plantInfo = {
  Indoor: [
    { name: 'Spider Plant', description: 'Spider plants are easy to care for and help improve indoor air quality.', image: spiderplant },
    { name: 'Areca Palm', description: 'The Areca Palm is a popular indoor plant that is non-allergenic and helps filter the air.', image: arecaPalm },
    { name: 'Snake Plant', description: 'Snake plants are low-maintenance and do not release pollen.', image: snakePlant },
    { name: 'Peace Lily', description: 'Peace lilies are known for their air-purifying qualities.', image: peaceLily },
    { name: 'Boston Fern', description: 'Boston ferns are non-allergenic and help increase humidity levels.', image: bostonFern },
    { name: 'Orchids', description: "Orchids' unique and vibrant blooms contain little to no pollen.", image: orchids }
  ],
  Outdoor: [
    { name: 'Boxwood', description: 'Boxwood is a dense, evergreen shrub that does not produce allergenic pollen.', image: boxwood },
    { name: 'Camellia', description: 'Camellias are beautiful flowering shrubs that produce minimal pollen.', image: camellia },
    { name: 'Azalea', description: 'Azaleas produce colorful blooms and are generally low in allergenic pollen.', image: azalea },
    { name: 'Magnolia', description: 'Magnolia trees produce large, showy flowers and very little pollen.', image: magnolia },
    { name: 'Hydrangea', description: 'Hydrangeas produce large clusters of flowers without releasing significant pollen.', image: hydrangea },
    { name: 'Rose', description: 'Roses are a great hypoallergenic option for those with allergies looking to grow flowers in the garden.', image: rose }
  ]
};

const LowPollenPlant = () => {
  const [selectedCategory, setSelectedCategory] = useState('Indoor');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handlePlantClick = (plant) => {
    setSelectedPlant(plant);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" align="center" gutterBottom className="custom-title" sx={{mt:10}}>
          Allergy-Friendly Plants
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom align="center">
          Discover beautiful {selectedCategory.toLowerCase()} plants perfect for creating a low-allergy environment
        </Typography>
      </Box>

      <Box mb={4} display="flex" justifyContent="center">
        <Button
          variant={selectedCategory === 'Indoor' ? 'contained' : 'outlined'}
          color="primary"
          onClick={() => handleCategoryChange('Indoor')}
          sx={{ mr: 2 }}
        >
          Indoor Plants
        </Button>
        <Button
          variant={selectedCategory === 'Outdoor' ? 'contained' : 'outlined'}
          color="primary"
          onClick={() => handleCategoryChange('Outdoor')}
        >
          Outdoor Plants
        </Button>
      </Box>

      <Grid container spacing={4}>
        {plantInfo[selectedCategory].map((plant, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className="card" onClick={() => handlePlantClick(plant)}>
              <CardMedia
                component="img"
                height="200"
                image={plant.image}
                alt={plant.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {plant.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {plant.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        {selectedPlant && (
          <>
            <DialogTitle>{selectedPlant.name}</DialogTitle>
            <DialogContent>
            <Box mb={2}>
                <img
                  src={selectedPlant.image}
                  alt={selectedPlant.name}
                  className="dialog-image" 
                />
              </Box>
              <Typography variant="body1">{selectedPlant.description}</Typography>
              <Box mt={2}>
                <Chip label="Low Pollen" color="success" />
                <Chip label="Allergy-Friendly" color="success" style={{ marginLeft: '8px' }} />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default LowPollenPlant;
