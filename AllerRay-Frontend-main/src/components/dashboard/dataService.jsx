import outdoor from "../../assets/emojis/outdoor.png";
import sunscreen from "../../assets/emojis/sunscreen.png";
import sunglasses from "../../assets/emojis/sunglasses.png";
import hats from "../../assets/emojis/hats.png";
import umbrella from "../../assets/emojis/umbrella.png";
import thermometer from "../../assets/emojis/thermometer.png";
import clothes from "../../assets/emojis/clothes.png";
import tree from "../../assets/emojis/tree.png";
import house from "../../assets/emojis/house.png";
import drink from "../../assets/emojis/drink.png";
import mask from "../../assets/emojis/mask.png";
import tissues from "../../assets/emojis/tissues.png";
import meds from "../../assets/emojis/meds.png";
import changeClothes from "../../assets/emojis/change-clothes.png";
import shower from "../../assets/emojis/shower.png";
import windows from "../../assets/emojis/windows.png";
import wiping from "../../assets/emojis/wiping.png";
import airPurifier from "../../assets/emojis/air-purifier.png";
import vacuum from "../../assets/emojis/vacuum.png";
import laundry from "../../assets/emojis/laundry.png";
import { CustomSegmentLabelPosition } from "react-d3-speedometer";

class DataService {

    // Line colors for forecast charts
    static pollenForecastLineColor = "#4cca79";
    static uvForecastLineColor = "#ff7300";

    // Colors for range gauges
    static uvRangeColors = ["#1C9D31", "#68BE4C", "#FCBD24", "#F56B33", "#eb184a"];
    static pollenRangeColors = ["#DADADA", "#1C9D31", "#43B447", "#FAFF00", "#FC9200", "#F33600"];


    // Mapping of UV data to emojis
    static uvDataEmojiMap = {
        'outdoor': { image: outdoor, label: 'Good time for outdoor activities.' },
        'sunscreen-30': { image: sunscreen, label: 'Use SPF 30 sunscreen.' },
        'sunscreen-50': { image: sunscreen, label: 'Use SPF 50 sunscreen.' },
        'sunglasses': { image: sunglasses, label: 'Wear sunglasses.' },
        'hats': { image: hats, label: 'Wear a hat.' },
        'umbrella': { image: umbrella, label: 'Carry an umbrella.' },
        'thermometer': { image: thermometer, label: 'Stay hydrated during excessive heat.' },
        'clothes': { image: clothes, label: 'Wear light clothes.' },
        'tree': { image: tree, label: 'Stay in the shade.' },
        'house': { image: house, label: 'Stay indoors.' }
    };

    // Mapping of pollen data to emojis
    static pollenDataEmojiMap = {
        'drink': { image: drink, label: 'Stay hydrated.' },
        'mask': { image: mask, label: 'Wear a mask.' },
        'tissues': { image: tissues, label: 'Carry tissues.' },
        'meds': { image: meds, label: 'Take your medication.' },
        'change-clothes': { image: changeClothes, label: 'Change clothes after coming indoors.' },
        'shower': { image: shower, label: 'Take a shower.' },
        'windows': { image: windows, label: 'Keep windows closed.' },
        'wiping': { image: wiping, label: 'Wipe surfaces.' },
        'indoor': { image: house, label: 'Stay indoors.' },
        'air-purifier': { image: airPurifier, label: 'Use an air purifier.' },
        'vacuum': { image: vacuum, label: 'Vacuum regularly.' },
        'laundry': { image: laundry, label: 'Do laundry.' },
        'sunscreen': { image: sunscreen, label: 'Use sunscreen.' },
        'outdoor': { image: outdoor, label: 'Good time for outdoor activities.' }
    };

    // Segment labels for range gauges
    static uvSegmentLabels = [
        { text: "Low", color: "black", position: CustomSegmentLabelPosition.Outside },
        { text: "Moderate", color: "black", position: CustomSegmentLabelPosition.Outside },
        { text: "High", color: "black", position: CustomSegmentLabelPosition.Outside },
        { text: "Very High", color: "black", position: CustomSegmentLabelPosition.Outside },
        { text: "Extreme", color: "black", position: CustomSegmentLabelPosition.Outside }
    ];

    static pollenSegmentLabels = [
        { text: "None", color: "black", position: CustomSegmentLabelPosition.Outside },
        { text: "Very Low", color: "black", position: CustomSegmentLabelPosition.Outside },
        { text: "Low", color: "black", position: CustomSegmentLabelPosition.Outside },
        { text: "Moderate", color: "black", position: CustomSegmentLabelPosition.Outside },
        { text: "High", color: "black", position: CustomSegmentLabelPosition.Outside },
        { text: "Very High", color: "black", position: CustomSegmentLabelPosition.Outside }
    ];

    
    // Get emojis based on UV index value
    static getCombinedPrecautions(uvValue, pollenValue) {
        const precautions = new Set();
        
        // Determine if it's safe for outdoor activities
        if (uvValue <= 5 && pollenValue <= 2) {
            precautions.add(this.pollenDataEmojiMap.outdoor);
        }

        // UV precautions
        if (uvValue >= 3) {
            precautions.add(this.uvDataEmojiMap['sunscreen-30']);
            precautions.add(this.uvDataEmojiMap.hats);
            precautions.add(this.uvDataEmojiMap.umbrella);
        }
        if (uvValue >= 6) {
            precautions.add(this.uvDataEmojiMap.sunglasses);
            //precautions.add(this.uvDataEmojiMap.thermometer);
            precautions.add(this.uvDataEmojiMap.tree);
        }
        if (uvValue >= 8) {
            precautions.add(this.uvDataEmojiMap['sunscreen-50']);
        }
        if (uvValue >= 11) {
            precautions.add(this.uvDataEmojiMap.house);
        }

        // Pollen precautions
        if (pollenValue >= 1) {
            //precautions.add(this.pollenDataEmojiMap.windows);
        }
        if (pollenValue >= 2) {
            //precautions.add(this.pollenDataEmojiMap.wiping);
        }
        if (pollenValue >= 3) {
            precautions.add(this.pollenDataEmojiMap.tissues);
            precautions.add(this.pollenDataEmojiMap.mask);
        }
        if (pollenValue >= 4) {
            precautions.add(this.pollenDataEmojiMap['change-clothes']);
            //precautions.add(this.pollenDataEmojiMap.shower);
            precautions.add(this.pollenDataEmojiMap.meds);
        }
        {/*if (pollenValue >= 5) {
            precautions.add(this.pollenDataEmojiMap["air-purifier"]);
            precautions.add(this.pollenDataEmojiMap.laundry);
            precautions.add(this.pollenDataEmojiMap.vacuum);
        }*/}

        // Common precautions
        precautions.add(this.pollenDataEmojiMap.drink);

        // Determine if it's safe for outdoor activities
        if (uvValue <= 5 && pollenValue <= 2) {
            precautions.add(this.pollenDataEmojiMap.outdoor);
        }

        return Array.from(precautions);
    }


    static getUVForecastData() {
        return DataService.uvApiResponse;
    }

    static getPollenForecastData() {
        return DataService.pollenApiResponse;
    }
}

export default DataService;