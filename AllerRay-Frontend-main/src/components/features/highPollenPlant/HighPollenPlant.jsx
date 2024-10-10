import React, { useState } from 'react';
import {Container,Typography,Box,Grid,Card,CardContent,CardMedia,Button,Chip,Dialog,DialogTitle,DialogContent,DialogActions} from '@mui/material';
import './HighPollenPlant.css'; // Import the CSS file

// Allergen data
const allergens = [
  {
    id: 1,
    name: 'Bahia Grass',
    category: 'Grass',
    peakMonths: 'January-April, December',
    description: 'Bahia Grass is a perennial tufted grass between 40cm and 1 metre high with flat leaves.',
    effects: 'Can trigger allergic rhinitis, chest congestion, and asthma in sensitized individuals.',
    prevention: 'Regular lawn mowing, avoiding outdoor activities during peak pollen hours. Also using masks and prescribed eye drops & nasal sprays.',
    imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSKJOOxhRenQlAslJzsQk4RlYWG5Bx0bwrxl8buWZhAboSWNBLd'
  },
  {
    id: 2,
    name: 'Annual Blue/Winter Grass',
    category: 'Grass',
    peakMonths: 'April-November',
    description: 'An annual or short-lived perennial growing to 3cm with light-green leaves with blunted ends.',
    effects: 'Can trigger nasal symptoms, asthma, and eye symptoms.',
    prevention: 'Avoid outdoor activities during peak pollen hours, use of masks outdoors, and prescribed eye drops and nasal sprays.',
    imageUrl: 'https://www.epicgardening.com/wp-content/uploads/2023/09/blue-salvia.jpg'
  },
  {
    id: 3,
    name: 'Canary Grass',
    category: 'Grass',
    peakMonths: 'January-February, December',
    description: 'It is a densely tufted, erect 1.5m or taller grass with bulbous swelling at the base of the stems.',
    effects: 'Can cause sneezing, itchy or watery eyes, and itchy throat or cough.',
    prevention: 'Regular lawn mowing, avoiding outdoor activities during peak pollen hours. Also use prescribed eye drops and nasal sprays.',
    imageUrl: 'https://warehouse1.indicia.org.uk/upload/15/02/34/o_1bn5fg8vmrmg1o244ge104r1djse.jpg'
  },
  {
    id: 4,
    name: 'Bermuda/Couch Grass',
    category: 'Grass',
    peakMonths: 'January-April',
    description: 'A perennial spreading mostly horizontal grass, known for triggering respiratory allergies.',
    effects: 'Can trigger allergic rhinitis, chest congestion, and asthma in sensitized individuals.',
    prevention: 'Regular lawn mowing, avoiding outdoor activities during peak pollen hours, and prescribed eye drops and nasal sprays.',
    imageUrl: 'https://telfast.com.au/assets/images/allergen/xbermuda.jpg.pagespeed.ic.eZ9r1Ib6ip.jpg'
  },
  {
    id: 5,
    name: 'Cocksfoot/Orchard Grass',
    category: 'Grass',
    peakMonths: 'September-December',
    description: 'It is a perennial grass with erect stems ranging from 15cm to 1.4m with densely tufted leaves.',
    effects: 'Can trigger allergic rhinitis, chest congestion, and asthma in sensitized individuals.',
    prevention: 'Regular lawn mowing, avoiding outdoor activities during peak pollen hours, and prescribed eye drops and nasal sprays.',
    imageUrl: 'https://www.agricom.co.nz/Files/Images/Agricom/GENERAL-CONTENT/Cocksfoot-main.jpg'
  },
  {
    id: 6,
    name: 'Kentucky Blue/June Grass',
    category: 'Grass',
    peakMonths: 'September-December',
    description: 'It is a perrenial Erect 10-90cm which has a leaf blade folded leaf blade is folded in bud and is approximately 5mm wide and has a blunt end.',
    effects: 'Can trigger allergic rhinitis, chest congestion, and asthma in sensitized individuals.',
    prevention: 'Regular lawn mowing, avoiding outdoor activities during peak pollen hours. Also using prescribed eye drops and nasal sprays',
    imageUrl: 'https://telfast.com.au/assets/images/allergen/kentucky.jpg.pagespeed.ce._jKikN2Fyp.jpg'
  },
  {
    id: 7,
    name: 'Ryegrass',
    category: 'Grass',
    peakMonths: 'January-February, August-December',
    description: 'Erect appearance 1.2m. Stem has alternating spikelets attached around and directly to the stem. Each spikelet is closely applied to the stem but as it matures it becomes right angled to the stem.',
    effects: 'Can trigger allergic rhinitis, chest congestion, and asthma in sensitized individuals.',
    prevention: 'Regular lawn mowing, avoiding outdoor activities during peak pollen hours. Also using prescribed eye drops and nasal sprays',
    imageUrl: 'https://vro.agriculture.vic.gov.au/dpi/vro/vroimages.nsf/Images/sip_perennial_rye_grass_flower/$File/perennial_rye_grass_flower_spike.jpg'
  },
  {
    id: 8,
    name: 'Timothy Grass',
    category: 'Grass',
    peakMonths: 'September-December',
    description: 'It is a Perennial plant up to 1.5m forming large clumps with hairless leaves that are dense and about 6-9mm wide.',
    effects: 'Can trigger allergic rhinitis, chest congestion, and asthma in sensitized individuals.',
    prevention: 'Regular lawn mowing, avoiding outdoor activities during peak pollen hours. Also using prescribed eye drops and nasal sprays',
    imageUrl: 'https://api.naturemapr.org/api/sightings/4565076/images/1?width=400&height=400'
  },
  {
    id: 9,
    name: 'Yorkshire Fog/Velvet Grass',
    category: 'Grass',
    peakMonths: 'September-December',
    description: 'It is a soft tufted perrenial perennial grass growing to about 50cm in height with flat leaves and short hairs.',
    effects: 'Can trigger allergic rhinitis, chest congestion, and asthma in sensitized individuals.',
    prevention: 'Regular lawn mowing, avoiding outdoor activities during peak pollen hours. Also using prescribed eye drops and nasal sprays',
    imageUrl: 'https://keyserver.lucidcentral.org/weeds/data/media/Images/holcus_lanatus/holcuslanatus10.jpg'
  },
  {
    id: 10,
    name: 'Wild Oat',
    category: 'Grass',
    peakMonths: 'August-December',
    description: 'Wild Oat is a tufted annual grass growing upto 1.7m with tough broad leaves and the flower head that has drooping loose open spikelets on long fine pedicles.',
    effects: 'Can trigger allergic rhinitis, chest congestion, and asthma in sensitized individuals.',
    prevention: 'Regular lawn mowing, avoiding outdoor activities during peak pollen hours. Also using prescribed eye drops and nasal sprays',
    imageUrl: 'https://vro.agriculture.vic.gov.au/dpi/vro/vroimages.nsf/Images/sip_wild_oats_spikelets/$File/wild_oats_spikelets.jpg'
  }, 
  {
    id: 11,
    name: 'Asthma Weed',
    category: 'Weeds',
    peakMonths: 'January, October, December',
    description: 'Asthma Weed is a many-branched perennial herb that grows to 60 cm high with its pollen causing asthma, conjunctivitis, rhinitis and hay fever.',
    effects: 'Can cause Asthma, conjunctivitis, rhinitis and hay fever.',
    prevention: 'Recommend the use of long clothing, a face mask and eye protection while doing outdoor activities',
    imageUrl: 'https://weeds.org.au/wp-content/uploads/2024/07/Parietaria-judaica.jpg'
  }, 
  {
  id: 14,
  name: 'Patersons Curse/ Salvation Jane',
  category: 'Weeds',
  peakMonths: 'September-December',
  description: 'Patersons curse is a erect biennial weed 50-80cm with hairy leaves and stems which are large and oval in the basal rosette.',
  effects: '.',
  prevention: 'Regular lawn mowing, avoiding outdoor activities during peak pollen hours. Also using prescribed eye drops and nasal sprays',
  imageUrl: 'https://vro.agriculture.vic.gov.au/DPI/Vro/vroimages.nsf/Images/weeds_patersons_curse_plant/$File/patersons_curse_plant.jpg'
}, 
{
    id: 15,
    name: 'Plantain',
    category: 'Weeds',
    peakMonths: 'January-March, September-December',
    description: 'This weed grows up to 60cm high and has a woody red hairy stem and hairy alternate leaves.',
    effects: 'Can trigger allergic rhinitis, chest congestion, and asthma in sensitized individuals.',
    prevention: 'Regular lawn mowing, avoiding outdoor activities during peak pollen hours. Also using prescribed eye drops and nasal sprays',
    imageUrl: 'https://firstaidcourseexperts.com.au/wp-content/uploads/2023/02/Plantain-1-300x300.jpg.webp'
  }, 
  {
    id: 16,
    name: 'Ragweed',
    category: 'Weeds',
    peakMonths: 'March-May',
    description: 'The ragweeds are coarse annuals or perennials with rough hairy stems and mostly lobed or divided leaves.',
    effects: 'Can trigger allergic rhinitis, chest congestion, and asthma in sensitized individuals.',
    prevention: 'Regular lawn mowing, avoiding outdoor activities during peak pollen hours. Also using prescribed eye drops and nasal sprays',
    imageUrl: 'https://firstaidcourseexperts.com.au/wp-content/uploads/2023/02/Ragweed-1-300x300.jpg.webp'
  }, 
  {
    id: 17,
    name: 'Australian Pine/SheOak',
    category: 'Trees',
    peakMonths: 'March, May, September-October',
    description: 'Australian Pine is prevalent in sports fields and known for allergies.',
    effects: 'Can trigger allergic rhinitis, chest congestion, and asthma in sensitized individuals.',
    prevention: 'Regular lawn mowing, avoiding outdoor activities during peak pollen hours. Also using prescribed eye drops and nasal sprays',
    imageUrl: 'https://static1.squarespace.com/static/544591e6e4b0135285aeb5b6/t/5c2d1dd4032be4591859e2f4/1614441176558/628814411_ed018d2c14_o.jpg?format=1500w'
  },
  {
    id: 18,
    name: 'BottleBrush',
    category: 'Trees',
    peakMonths: 'September-December',
    description: 'Bottlebrush is a dense, evergreen tree with rounded top. The blossom of crimson ‘bottle brush’ flowers are a bright vibrant red and appear from spring to late summer.',
    effects: 'Can trigger allergic rhinitis, chest congestion, and asthma in sensitized individuals.',
    prevention: 'Regular lawn mowing, avoiding outdoor activities during peak pollen hours. Also using prescribed eye drops and nasal sprays',
    imageUrl: 'https://www.thetutuguru.com.au/wp-content/uploads/2013/07/Callistemon-crimson.jpeg'
  },
  {
    id: 19,
    name: 'Cedar Tree',
    category: 'Trees',
    peakMonths: 'September-December',
    description: 'A forest tree from within the mahogany family. Fast growing deciduous tree with large branches that create a spreading crown when given space. Often planted as a shade tree, as a garden feature or structural element',
    effects: 'Can trigger allergic rhinitis, chest congestion, and asthma in sensitized individuals.',
    prevention: 'Regular lawn mowing, avoiding outdoor activities during peak pollen hours. Also using prescribed eye drops and nasal sprays',
    imageUrl: 'https://www.diggers.com.au/cdn/shop/products/australian-red-cedar-wtoo_dc1d8332-da71-4922-b17f-bc17aee91e7a.jpg?v=1637121038&width=800'
  },
  {
    id: 20,
    name: 'English Oak',
    category: 'Trees',
    peakMonths: 'September-October',
    description: 'English Oak is a deciduous tree that is slow growing for 20-30m. It has stout erect trunk with open crown to 30m with shiny dark green lobed leaves.',
    effects: 'Can trigger allergic rhinitis, chest congestion, and asthma in sensitized individuals.',
    prevention: 'Regular lawn mowing, avoiding outdoor activities during peak pollen hours. Also using prescribed eye drops and nasal sprays',
    imageUrl: 'https://trusttrees.s3.amazonaws.com/photos_dev/NominatedPhoto5742.8-Royal_Oak_tree_Castlemaine_Botanical_Gardens_1.jpg'
  },
  {
    id: 21,
    name: 'London Plane Tree',
    category: 'Trees',
    peakMonths: 'August-September',
    description: 'It is a deciduous 30m with spread of 10m. The Trunk of the tree is erect with grey peeling bark and large green lobed leaves.',
    effects: 'Can trigger allergic rhinitis, chest congestion, and asthma in sensitized individuals.',
    prevention: 'Regular lawn mowing, avoiding outdoor activities during peak pollen hours. Also using prescribed eye drops and nasal sprays',
    imageUrl: 'https://firstaidcourseexperts.com.au/wp-content/uploads/2023/02/London-Plane-Tree-1-1-300x300.jpg.webp'
  },
  {
    id: 22,
    name: 'Murray Pine/ White Cypress Pine',
    category: 'Trees',
    peakMonths: 'June-September',
    description: 'Murray Pine also known as the White Cypress Pine is a small to medium-sized trees that may reach 20m in height. The leaves are scale like in whorls.',
    effects: 'Can trigger allergic rhinitis, chest congestion, and asthma in sensitized individuals.',
    prevention: 'Regular lawn mowing, avoiding outdoor activities during peak pollen hours. Also using prescribed eye drops and nasal sprays',
    imageUrl: 'https://firstaidcourseexperts.com.au/wp-content/uploads/2023/02/Murray-Pine-White-Cypress-Pine-1-300x300.jpg.webp'
  },
  {
    id: 23,
    name: 'Olive Tree',
    category: 'Trees',
    peakMonths: 'October-November',
    description: 'Olive Tree is a evergreen tree with 7m with 3m spread. The tree trunk has erect and branching with dark green leaves.',
    effects: 'Can trigger allergic rhinitis, chest congestion, and asthma in sensitized individuals.',
    prevention: 'Regular lawn mowing, avoiding outdoor activities during peak pollen hours. Also using prescribed eye drops and nasal sprays',
    imageUrl: 'https://firstaidcourseexperts.com.au/wp-content/uploads/2023/02/olive-tree-300x300.jpg.webp'
  },
  {
    id: 24,
    name: 'Paper-Bark Tea Tree',
    category: 'Trees',
    peakMonths: 'November',
    description: 'Paper-Bark Tea tree is a evergreen shrub or tree with 10m, which has papery bark leaves. ',
    effects: 'Can trigger allergic rhinitis, chest congestion, and asthma in sensitized individuals.',
    prevention: 'Regular lawn mowing, avoiding outdoor activities during peak pollen hours. Also using prescribed eye drops and nasal sprays',
    imageUrl: 'https://firstaidcourseexperts.com.au/wp-content/uploads/2023/02/Paper-bark-Tea-Tree-2-300x300.jpg.webp'
  },
  {
    id: 25,
    name: 'Silver Birch',
    category: 'Trees',
    peakMonths: 'August, October-November',
    description: 'Silver Birch is a Deciduous tree which is 12-18m long with graceful pendulous form. Leaves are smooth with wedge-shaped base.',
    effects: 'Can trigger allergic rhinitis, chest congestion, and asthma in sensitized individuals.',
    prevention: 'Regular lawn mowing, avoiding outdoor activities during peak pollen hours. Also using prescribed eye drops and nasal sprays',
    imageUrl: 'https://firstaidcourseexperts.com.au/wp-content/uploads/2023/02/silver-birch-1-300x300.jpg.webp'
  },
];

const HighPollenPlant = () => {
  const [selectedCategory, setSelectedCategory] = useState('Grass');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAllergen, setSelectedAllergen] = useState(null);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleAllergenClick = (allergen) => {
    setSelectedAllergen(allergen);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const categories = ['Grass', 'Trees', 'Weeds'];

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" align="center" gutterBottom className="custom-title">
          High Pollen Plants Guide
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom align="center">
          Learn about {selectedCategory.toLowerCase()} that may trigger allergies and how to manage exposure
        </Typography>
      </Box>

      <Box mb={4} display="flex" justifyContent="center">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => handleCategoryChange(category)}
            sx={{ mr: 2 }}
          >
            {category}
          </Button>
        ))}
      </Box>

      <Grid container spacing={4}>
        {allergens
          .filter((allergen) => allergen.category === selectedCategory)
          .map((allergen) => (
            <Grid item xs={12} sm={6} md={4} key={allergen.id}>
              <Card className="card" onClick={() => handleAllergenClick(allergen)}>
                <CardMedia
                  component="img"
                  height="200"
                  image={allergen.imageUrl}
                  alt={allergen.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {allergen.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Peak Months: {allergen.peakMonths}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        {selectedAllergen && (
          <>
            <DialogTitle>{selectedAllergen.name}</DialogTitle>
            <DialogContent>
              <Box mb={2}>
                <img
                  src={selectedAllergen.imageUrl}
                  alt={selectedAllergen.name}
                  className="dialog-image" // Use the CSS class for the image styling
                />
              </Box>
              <Typography variant="body1" paragraph>
                {selectedAllergen.description}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Effects:
              </Typography>
              <Typography variant="body1" paragraph>
                {selectedAllergen.effects}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Prevention Strategies:
              </Typography>
              <Typography variant="body1" paragraph>
                {selectedAllergen.prevention}
              </Typography>
              <Box mt={2}>
                <Chip label={`Peak Months: ${selectedAllergen.peakMonths}`} color="primary" />
                <Chip label="High Pollen" color="error" style={{ marginLeft: '8px' }} />
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

export default HighPollenPlant;
