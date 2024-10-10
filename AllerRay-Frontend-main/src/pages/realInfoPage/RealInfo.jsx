import Dashboard from '@/components/dashboard/dashboard';
import { Container, Grid, Divider, Typography, Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ExploreIcon from '@mui/icons-material/Explore';
import './RealInfo.css';


const RealInfo = () => {
    return (
        <div className='background-section'>
            <Dashboard />
            {/* New Activity Planner Section */}
            <Container maxWidth="lg">
                {/* Prominent Divider */}
                <Grid container>
                    <Grid item xs={12}>
                        <Box sx={{ my: 6, position: 'relative' }}>
                            <Divider sx={{ 
                                borderBottomWidth: 3, 
                                borderColor: '#000',
                                '&::before, &::after': {
                                    borderColor: '#000',
                                },
                            }}/>
                        </Box>
                    </Grid>
                </Grid>

                {/* Activity Planner Section */}
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Box sx={{ 
                            mt: 4, 
                            mb: 4,
                            p: 4, 
                            backgroundColor: 'transparent', 
                            borderRadius: 2,
                            boxShadow: 3,
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                                boxShadow: 6,
                                transform: 'translateY(-5px)',
                            }
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <ExploreIcon sx={{ fontSize: 48, mr: 2, color: 'primary.main' }} />
                                <Typography variant="h4" fontWeight="bold" color="primary.main">
                                    Planning to go out?
                                </Typography>
                            </Box>
                            <Typography variant="h5" sx={{ mb: 2, color: 'text.primary' }}>
                                Try our Activity Planner!
                            </Typography>
                            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', color: 'text.secondary' }}>
                                Our Activity Planner helps you find the perfect activities' places based on your search. Stay safe and have fun!
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                                <Button 
                                    component={RouterLink} 
                                    to="/activity"
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    startIcon={<ExploreIcon />}
                                    sx={{
                                        fontWeight: 'bold',
                                        boxShadow: 3,
                                        px: 4,
                                        py: 1.5,
                                        fontSize: '1.1rem',
                                        '&:hover': {
                                            backgroundColor: 'secondary.main',
                                            transform: 'scale(1.05)',
                                            transition: 'all 0.2s',
                                        },
                                    }}
                                >
                                    Find Activities Around You
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>);
}

export default RealInfo;