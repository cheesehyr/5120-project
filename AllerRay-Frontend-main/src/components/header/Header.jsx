import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LogoImage from './logo.png';
import '../header/Header.css';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [uvAnchorEl, setUvAnchorEl] = React.useState(null);
  const [pollenAnchorEl, setPollenAnchorEl] = React.useState(null);

  const showBackButton = location.pathname !== '/';

  const handleUvMenu = (event) => {
    setUvAnchorEl(event.currentTarget);
  };

  const handleUvClose = () => {
    setUvAnchorEl(null);
  };

  const handlePollenMenu = (event) => {
    setPollenAnchorEl(event.currentTarget);
  };

  const handlePollenClose = () => {
    setPollenAnchorEl(null);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          {showBackButton && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="back"
              onClick={() => navigate(-1)}
              sx={{ mr: 1 }}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
            <img
              src={LogoImage}
              alt="AllerRay Logo"
              style={{ height: 50, marginRight: 10 }}
            />
            <Typography variant="h6" component="div">
              AllerRay
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/realinfo">Real-Time WeatherDashboard</Button>
          <Button color="inherit" component={Link} to="/activity">Activity Planner</Button>
          <Button
            color="inherit"
            aria-controls="uv-menu"
            aria-haspopup="true"
            onClick={handleUvMenu}
            endIcon={<ExpandMoreIcon />}
          >
            Sun Protection & Nutrition
          </Button>
          <Menu
            id="uv-menu"
            anchorEl={uvAnchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(uvAnchorEl)}
            onClose={handleUvClose}
          >
            <MenuItem onClick={handleUvClose} component={Link} to="/skincancer">UV awarness and Sun Safety</MenuItem>
            <MenuItem onClick={handleUvClose} component={Link} to="/vit-d-guide">Vitamin D Insights in Children</MenuItem>
          </Menu>
          <Button
            color="inherit"
            aria-controls="pollen-menu"
            aria-haspopup="true"
            onClick={handlePollenMenu}
            endIcon={<ExpandMoreIcon />}
          >
            Pollen & Hay Fever
          </Button>
          <Menu
            id="pollen-menu"
            anchorEl={pollenAnchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(pollenAnchorEl)}
            onClose={handlePollenClose}
          >
            <MenuItem onClick={handlePollenClose} component={Link} to="/pollenandhayfever">Awarness of Hay Fever</MenuItem>
            <MenuItem onClick={handlePollenClose} component={Link} to="/pollenplantsplanner">Pollen and Allergen Plants</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;