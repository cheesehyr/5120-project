import React, {useEffect, useRef, useState} from 'react';
import {Box, Button, FormControl, InputLabel, MenuItem, Select, Typography} from '@mui/material';
import './VitDRiskTest.css';
import {ageCategoryOptions, recommendationsData, vitDRichFoods} from "./dataService.js";
import SkinTypeSelect from "./SkinTypeSelect.jsx";

function VitDRiskTest() {
    const [ageCategory, setAgeCategory] = useState('');
    const [skinType, setSkinType] = useState('');
    const [recommendations, setRecommendations] = useState(null);
    const foodRefs = useRef([]);

    const handleAgeCategoryChange = (event) => {
        setAgeCategory(event.target.value);
    };

    const handleSkinTypeChange = (event) => {
        setSkinType(event.target.value);
    };

    const handleGoClick = () => {
        const data = recommendationsData[ageCategory][skinType];
        if (data && recommendations !== data) {
            setRecommendations(data);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {threshold: 0.5});

        foodRefs.current.forEach(ref => {
            if (ref) {
                observer.observe(ref);
            }
        });

        return () => {
            foodRefs.current.forEach(ref => {
                if (ref) {
                    observer.unobserve(ref);
                }
            });
        };
    }, []);

    return (
        <div>
            {/* Main container for the test */}
            <Box className="vit-d-risk-test" sx={{ p: 5 }}>
                <Typography variant="h4" gutterBottom className="custom-title">
                    Vitamin D Risk Test
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Select the age category and skin type your child belongs to know about the Vitamin D deficiency risk and get recommendations about sun
                    exposure and vitamin D-rich food to stay healthy and safe in the sun.
                </Typography>
                <div className="risk-test-container">
                    <FormControl className="dropdown">
                        <InputLabel id="age-category-label">Age Category</InputLabel>
                        <Select
                            labelId="age-category-label"
                            value={ageCategory}
                            onChange={handleAgeCategoryChange}
                            label="Age Category"
                        >
                            {ageCategoryOptions.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <SkinTypeSelect value={skinType} onChange={handleSkinTypeChange}/>
                    <Button variant="contained"
                            size="small"
                            sx={{
                                fontWeight: 'bold',
                                boxShadow: 3,
                                '&:hover': {
                                    backgroundColor: 'secondary.main',
                                    transform: 'scale(1.05)',
                                    transition: 'all 0.2s',
                                },
                            }}
                            onClick={handleGoClick}>Go</Button>
                </div>

                {/* Recommendations Section */}
                {recommendations && (
                    <Box sx={{
                        mt: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        flexWrap: 'wrap',
                        gap: '1rem',
                        borderRadius: '2rem',
                        padding: '2rem',
                        backgroundColor: '#EEEEEE'
                    }}>
                        <Typography variant="h6" style={{textTransform: "capitalize", fontWeight: "bold"}}>
                            Vitamin D Deficiency Risk Level: {recommendations.risk}
                        </Typography>
                        <Typography variant="body1" style={{fontWeight: "bold"}}>
                            Recommendations for Sun Exposure: {recommendations.sunExposure}
                        </Typography>
                    </Box>
                )}

                <Typography variant="body2" fontStyle="italic" fontWeight="200" margin="1rem" sx={{mb:5, mt:5}}>
                    For your knowledge: The skin type identification is done based on the Fitzpatrick Skin Phototype which identifies your skin type based on how it reacts to sun exposure. This system makes use of Physical traits + reaction to sun exposure + tanning habits to identify the skin type of your child.
                </Typography>
            </Box>
            
            {/* Vitamin D-Rich Food section */}
            <Typography variant="h4" align="center" gutterBottom className="custom-title" sx={{mt:8}}>
                Vitamin D-Rich Food
            </Typography>
            <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: "center"}}>
                {vitDRichFoods.map((food, index) => (
                    <Box key={index} className="rich-food"
                         sx={{textAlign: 'center'}}
                         ref={el => foodRefs.current[index] = el}>
                        <img src={food.img} alt={food.name}
                             style={{
                                 height: 150,
                                 margin: '0.5rem',
                                 borderRadius: '50%'
                             }}/>
                        <Typography variant="body" maxWidth="200px" >{food.name}</Typography>
                    </Box>
                ))}
            </Box>
        </div>
    );
}

export default VitDRiskTest;
