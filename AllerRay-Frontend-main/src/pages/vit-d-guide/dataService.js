import fortifiedMilk from '../../assets/vit-d-rich-foods/fortified-milk.png';
import yogurt from '../../assets/vit-d-rich-foods/yogurt.png';
import eggYolks from '../../assets/vit-d-rich-foods/egg-yolks.png';
import fortifiedCereals from '../../assets/vit-d-rich-foods/fortified-cereals.png';
import salmon from '../../assets/vit-d-rich-foods/salmon.png';
import cheese from '../../assets/vit-d-rich-foods/cheese.png';
import orangeJuice from '../../assets/vit-d-rich-foods/orange-juice.png';
import tofu from '../../assets/vit-d-rich-foods/tofu.png';
import mushrooms from '../../assets/vit-d-rich-foods/mushrooms.png';
import codLiverOil from '../../assets/vit-d-rich-foods/cod-liver-oil.png';
import tuna from '../../assets/vit-d-rich-foods/tuna.png';
import chiaSeeds from '../../assets/vit-d-rich-foods/chia-seeds.png';
import oysters from '../../assets/vit-d-rich-foods/oysters.png';
import redMeat from '../../assets/vit-d-rich-foods/red-meat.png';
import citrusFruits from '../../assets/vit-d-rich-foods/citrus-fruits.png';
import shellfish from '../../assets/vit-d-rich-foods/shellfish.png';
import sardines from '../../assets/vit-d-rich-foods/sardines.png';
import fortifiedAlmondMilk from '../../assets/vit-d-rich-foods/fortified-almond-milk.png';
import smoothies from '../../assets/vit-d-rich-foods/smoothies.png';
import fortifiedCerealBiscuits from '../../assets/vit-d-rich-foods/fortified-cereal-biscuit.png';
import fortifiedPlantBasedMilk from '../../assets/vit-d-rich-foods/fortified-plant-based-drinks.png';
import sautedMushrooms from '../../assets/vit-d-rich-foods/sauted-mushroom.png';
import swordfish from '../../assets/vit-d-rich-foods/swordfish.png';
import fortifiedBreakfastOptions from '../../assets/vit-d-rich-foods/bread-tortillas.png';
import tempehWithStirFries from '../../assets/vit-d-rich-foods/tempe-curry.png';
import fattyFish from '../../assets/vit-d-rich-foods/fatty-fish.png';
import puertoRicanSandwich from '../../assets/vit-d-rich-foods/puerto-rican-sandwich.png';
import eggBasedMeals from '../../assets/vit-d-rich-foods/egg-based-meals.png';
import fortifiedFruitsVegetableSmoothies from '../../assets/vit-d-rich-foods/fortified-fruits-vegetable-smoothies.png';
import flaxseeds from '../../assets/vit-d-rich-foods/flaxseeds.png';

import type1Img from '../../assets/skinTypes/type1.png';
import type2Img from '../../assets/skinTypes/type2.png';
import type3Img from '../../assets/skinTypes/type3.png';
import type4Img from '../../assets/skinTypes/type4.png';
import type5Img from '../../assets/skinTypes/type5.png';
import type6Img from '../../assets/skinTypes/type6.png';

import recommendedExposureImg from '@/assets/icons/recommended-exposure.png';
import bodyExposure from '@/assets/icons/body-exposure.png';
import efficiencyImg from '@/assets/icons/efficiency.png';
import weatherImpactImg from '@/assets/icons/weather-impact.png';
import bestTimeImg from '@/assets/icons/best-time.png';

import bodyExposure25_35 from '@/assets/icons/body-exposure-25-35.png';
import bodyExposure20_30 from '@/assets/icons/body-exposure-20-30.png';
import bodyExposure15_20 from '@/assets/icons/body-exposure-15-20.png';
import bodyExposure10_15 from '@/assets/icons/body-exposure-10-15.png';

const ageCategoryOptions = [
    {value: "1-5", label: "1-5 Years"},
    {value: "5-10", label: "5-10 Years"},
    {value: "10-15", label: "10-15 Years"}
];

const skinTypeOptions = [
    {
        value: "I-II",
        label: "Very Fair to Fair skin, Always burns/burns easily, Never tans/tans poorly",
        color1: "#f0da62",
        color2: "#e8b964",
        img1: type1Img,
        img2: type2Img
    },
    {
        value: "III-IV",
        label: "Medium to Olive skin, Burns moderately/minimally, Tans gradually/tans well",
        color1: "#b16738",
        color2: "#8d5029",
        img1: type3Img,
        img2: type4Img
    },
    {
        value: "V-VI",
        label: "Brown to Dark brown or Black skin, Rarely/never burns, Tans profusely",
        color1: "#793104",
        color2: "#34181c",
        img1: type5Img,
        img2: type6Img
    }
];

const estimatedVitDProduction = {
    "1-2": {
        "I-II": [
            {amount: "200-400 IU", duration: "20 minutes"},
            {amount: "300-500 IU", duration: "30 minutes"}
        ],
        "III-IV": [
            {amount: "200-400 IU", duration: "30 minutes"},
            {amount: "300-600 IU", duration: "45 minutes"}
        ],
        "V-VI": [
            {amount: "150-300 IU", duration: "45 minutes"},
            {amount: "200-400 IU", duration: "60 minutes"}
        ]
    },
    "3-5": {
        "I-II": [
            {amount: "400-600 IU", duration: "10 minutes"},
            {amount: "600-800 IU", duration: "15 minutes"}
        ],
        "III-IV": [
            {amount: "300-500 IU", duration: "15 minutes"},
            {amount: "500-700 IU", duration: "20 minutes"}
        ],
        "V-VI": [
            {amount: "250-450 IU", duration: "20 minutes"},
            {amount: "400-600 IU", duration: "30 minutes"}
        ]
    },
    "6-7": {
        "I-II": [
            {amount: "600-800 IU", duration: "5 minutes"},
            {amount: "800-1,000 IU", duration: "10 minutes"}
        ],
        "III-IV": [
            {amount: "500-700 IU", duration: "10 minutes"},
            {amount: "700-900 IU", duration: "15 minutes"}
        ],
        "V-VI": [
            {amount: "400-600 IU", duration: "15 minutes"},
            {amount: "500-700 IU", duration: "20 minutes"}
        ]
    },
    "8-10": {
        "I-II": [
            {amount: "800-1,000 IU", duration: "3 minutes"},
            {amount: "1,000-1,200 IU", duration: "5 minutes"}
        ],
        "III-IV": [
            {amount: "600-900 IU", duration: "5 minutes"},
            {amount: "800-1,000 IU", duration: "10 minutes"}
        ],
        "V-VI": [
            {amount: "500-700 IU", duration: "10 minutes"},
            {amount: "600-900 IU", duration: "15 minutes"}
        ]
    },
    "11-99": {
        "I-II": [
            {amount: "1,000-1,200 IU", duration: "2 minutes"},
            {amount: "1,200-1,500 IU", duration: "3 minutes"}
        ],
        "III-IV": [
            {amount: "800-1,000 IU", duration: "3 minutes"},
            {amount: "1,000-1,200 IU", duration: "5 minutes"}
        ],
        "V-VI": [
            {amount: "600-900 IU", duration: "5 minutes"},
            {amount: "800-1,000 IU", duration: "10 minutes"}
        ]
    }
};

const uvExposureData = {
    "1-2": {
        recommendedExposure: {
            "I-II": "20-30 minutes",
            "III-IV": "30-45 minutes",
            "V-VI": "45-60 minutes"
        },
        bodyExposure: "25-35% (face, arms, hands, lower legs, or even back/abdomen if possible)",
        efficiency: "Low to moderate; requires more skin exposure.",
        weatherImpact: "Cloudy weather may reduce UV; add 10-15 minutes.",
        bestTime: "Any daylight hours, ideally around midday."
    },
    "3-5": {
        recommendedExposure: {
            "I-II": "10-15 minutes",
            "III-IV": "15-20 minutes",
            "V-VI": "20-30 minutes"
        },
        bodyExposure: "20-30% (face, arms, hands, lower legs)",
        efficiency: "High; ideal for Vitamin D synthesis.",
        weatherImpact: "Partly cloudy may reduce UV, adjust exposure by 5-10 more minutes.",
        bestTime: "9-10 am or after 4 pm."
    },
    "6-7": {
        recommendedExposure: {
            "I-II": "5-10 minutes",
            "III-IV": "10-15 minutes",
            "V-VI": "15-20 minutes"
        },
        bodyExposure: "15-20% (face, arms, hands)",
        efficiency: "Moderate to high; effective but needs caution.",
        weatherImpact: "Light cloud cover may reduce UV; add 5 more minutes.",
        bestTime: "Before 9 am or after 5 pm."
    },
    "8-10": {
        recommendedExposure: {
            "I-II": "3-5 minutes",
            "III-IV": "5-10 minutes",
            "V-VI": "10-15 minutes"
        },
        bodyExposure: "10-15% (face, hands, and arms)",
        efficiency: "Low to moderate; high sunburn risk.",
        weatherImpact: "Minimal, but UV reflection from surfaces increases risk.",
        bestTime: "Before 8 am or after 6 pm."
    },
    "11-99": {
        recommendedExposure: {
            "I-II": "2-3 minutes",
            "III-IV": "3-5 minutes",
            "V-VI": "5 minutes"
        },
        bodyExposure: "5-10% (face and hands)",
        efficiency: "Low; avoid direct exposure due to extreme burn risk.",
        weatherImpact: "Extremely high UV risk; limit exposure.",
        bestTime: "Very early morning (before 7 am) or late evening (after 6:30 pm)."
    }
};

const uvLevelBodyExposure = {
    "1-2": {
        bodyExposure: "25-35% (face, arms, hands, lower legs, or even back/abdomen if possible)",
        img: bodyExposure25_35
    },
    "3-5": {
        bodyExposure: "20-30% (face, arms, hands, lower legs)",
        img: bodyExposure20_30
    },
    "6-7": {
        bodyExposure: "15-20% (face, arms, hands)",
        img: bodyExposure15_20
    },
    "8-10": {
        bodyExposure: "10-15% (face, hands, and arms)",
        img: bodyExposure10_15
    },
    "11-99": {
        bodyExposure: "5-10% (face and hands)",
        img: bodyExposure10_15
    }
};

const recommendationsData = {
    "1-5": {
        "I-II": {
            risk: "high",
            sunExposure: "Allow 10-15 minutes of direct sun exposure on the face and arms, 3-4 times per week.",
            foods: [
                {name: "Fortified Milk - Cow/Plant-based", img: fortifiedMilk},
                {name: "Yogurt", img: yogurt},
                {name: "Egg Yolks", img: eggYolks},
                {name: "Fortified Cereals age-based with added Vitamin D", img: fortifiedCereals},
                {name: "Fishes like sardine", img: sardines}
            ]
        },
        "III-IV": {
            risk: "moderate",
            sunExposure: "15-20 minutes of sun exposure on arms and legs, 3-4 times per week.",
            foods: [
                {name: "Cheese slices or cubes ", img: cheese},
                {name: "Orange juice with added Vitamin D", img: orangeJuice},
                {name: "Oily Fish such as salmon", img: salmon},
                {name: "Tofu cubes in dishes like soup", img: tofu},
            ]
        },
        "V-VI": {
            risk: "high",
            sunExposure: "30-40 minutes with arms and legs exposed, 4-5 times per week.",
            foods: [
                {name: "Fortified Cereal Bowl", img: fortifiedCereals},
                {name: "Mushrooms like maitake", img: mushrooms},
                {name: "Cod Liver Oil age-appropriate dose based on GP advice", img: codLiverOil},
                {name: "Fortified Milk Alternatives like soy or almond milk", img: fortifiedAlmondMilk},
            ]
        },
    },
    "5-10": {
        "I-II": {
            risk: "moderate",
            sunExposure: "15-20 minutes of exposure on face, arms, and legs, 3-4 times per week.",
            foods: [
                {name: "Tuna sandwiches or fish patties ", img: tuna},
                {name: "Fortified Dairy Products such as cheese slices", img: cheese},
                {name: "Milk-based smoothies", img: smoothies},
                {name: "Mix Chia Seeds in yogurt, cereals", img: chiaSeeds},
                {name: "Egg Yolks boiled/scrambled", img: eggYolks}
            ]
        },
        "III-IV": {
            risk: "moderate",
            sunExposure: "20-30 minutes of exposure, 4-5 times per week.",
            foods: [
                {name: "Cooked Oysters occasionally", img: oysters},
                {name: "Fortified Cereals biscuits and bars ", img: fortifiedCerealBiscuits},
                {name: "Fortified Plant-based Drinks like Almond, soy, or oat milk", img: fortifiedPlantBasedMilk},
                {name: "Sautéed/grilled mushrooms as a side dish", img: sautedMushrooms}
            ]
        },
        "V-VI": {
            risk: "high",
            sunExposure: "40-60 minutes, ideally with larger skin areas exposed, 5-6 times per week.",
            foods: [
                {name: "Red Meat - liver, kidneys of these animals is high in Vitamin-D", img: redMeat},
                {name: "Canned/fresh Salmon Patties", img: salmon},
                {name: "Snacks made of Yogurt", img: yogurt},
                {name: "Citrus rich Fruits", img: citrusFruits}
            ]
        },
    },
    "10-15": {
        "I-II": {
            risk: "moderate",
            sunExposure: "20-30 minutes, focusing on face, arms, 3-4 times per week.",
            foods: [
                {name: "Fatty Fish - trout, mackerel ", img: fattyFish},
                {name: "Puerto Rican Sandwich", img: puertoRicanSandwich},
                {name: "Egg Based Meals", img: eggBasedMeals}
            ]
        },
        "III-IV": {
            risk: "low",
            sunExposure: "30-40 minutes, focusing on arms and legs, 4-5 times per week.",
            foods: [
                {name: "Mushrooms Grill/sauté added with various dishes like salads", img: sautedMushrooms},
                {name: "Oily Fish: swordfish, anchovies", img: swordfish},
                {name: "Fortified Breakfast Options like bread, tortillas", img: fortifiedBreakfastOptions},
                {name: "Tempeh with stir-fries/curries", img: tempehWithStirFries}
            ]
        },
        "V-VI": {
            risk: "high",
            sunExposure: "60-90 minutes, ideally with more skin exposed, 5-6 times per week.",
            foods: [
                {name: "Shellfish-like  shrimp, oysters, crab", img: shellfish},
                {name: "Fortified fruits/vegetable Smoothies", img: fortifiedFruitsVegetableSmoothies},
                {name: "Flaxseeds", img: flaxseeds},
            ]
        }
    }
};

const vitDRichFoods = [
    // {name: "Fortified Milk - Cow/Plant-based", img: fortifiedMilk},
    {name: "Yogurt", img: yogurt},
    {name: "Egg Yolks", img: eggYolks},
    //{name: "Fortified Cereals age-based with added Vitamin D", img: fortifiedCereals},
    {name: "Fishes like Sardine, Salmon, Tuna, Mackerel", img: sardines},
    {name: "Cheese", img: cheese},
    //{name: "Orange juice with added Vitamin D", img: orangeJuice},
    // {name: "Oily Fish such as salmon", img: salmon},
    {name: "Tofu", img: tofu},
    // {name: "Fortified Cereal Bowl", img: fortifiedCereals},
    {name: "Mushrooms", img: mushrooms},
    //{name: "Cod Liver Oil age-appropriate dose based on GP advice", img: codLiverOil},
    //{name: "Fortified Milk Alternatives like soy or almond milk", img: fortifiedAlmondMilk},
    // {name: "Tuna sandwiches or fish patties ", img: tuna},
    // {name: "Fortified Dairy Products such as cheese slices", img: cheese},
    {name: "Milk-based smoothies", img: smoothies},
    //{name: "Mix Chia Seeds in yogurt, cereals", img: chiaSeeds},
    {name: "Chia Seeds", img: chiaSeeds},
    // {name: "Egg Yolks boiled/scrambled", img: eggYolks},
    //{name: "Cooked Oysters occasionally", img: oysters},
    //{name: "Fortified Cereals biscuits and bars ", img: fortifiedCerealBiscuits},
    // {name: "Fortified Plant-based Drinks like Almond, soy, or oat milk", img: fortifiedPlantBasedMilk},
    // {name: "Sautéed/grilled mushrooms as a side dish", img: sautedMushrooms},
    {name: "Red Meat", img: redMeat},
    // {name: "Canned/fresh Salmon Patties", img: salmon},
    // {name: "Snacks made of Yogurt", img: yogurt},
    {name: "Citrus Fruits", img: citrusFruits},
    // {name: "Fatty Fish - trout, mackerel ", img: fattyFish},
    // {name: "Puerto Rican Sandwich", img: puertoRicanSandwich},
    // {name: "Egg Based Meals", img: eggBasedMeals},
    // {name: "Mushrooms Grill/sauté added with various dishes like salads", img: sautedMushrooms},
    // {name: "Oily Fish: swordfish, anchovies", img: swordfish},
  //   {name: "Fortified Breakfast Options like bread, tortillas", img: fortifiedBreakfastOptions},
    // {name: "Tempeh with stir-fries/curries", img: tempehWithStirFries},
    {name: "Shellfish-like  shrimp, oysters, crab", img: shellfish},
    //{name: "Fortified fruits/vegetable Smoothies", img: fortifiedFruitsVegetableSmoothies},
    //{name: "Flaxseeds", img: flaxseeds}
];

const dailyVitaminDNeeded = {
    "I-II": "600-800 IU",
    "III-IV": "600-1200 IU",
    "V-VI": "1000-1500 IU"
};

function getUVExposureData(uvIndex, skinType) {
    const uvRange = Object.keys(uvExposureData).find(range => {
        const [min, max] = range.split('-').map(Number);
        return uvIndex >= min && (max ? uvIndex <= max : true);
    });

    if (!uvRange) {
        return ["No data available for this UV index"];
    }

    const uvData = uvExposureData[uvRange];

    return [
        {img: recommendedExposureImg, text: `Recommended Exposure: ${uvData.recommendedExposure[skinType]}`},
        {img: bodyExposure, text: `Body Exposure: ${uvData.bodyExposure}`},
        {img: efficiencyImg, text: `Efficiency: ${uvData.efficiency}`},
        {img: weatherImpactImg, text: `Weather Impact: ${uvData.weatherImpact}`},
        {img: bestTimeImg, text: `Best Time: ${uvData.bestTime}`}
    ];
}

export {ageCategoryOptions, skinTypeOptions, recommendationsData, estimatedVitDProduction, getUVExposureData, dailyVitaminDNeeded, uvLevelBodyExposure, vitDRichFoods};