import './trigger.css';
import {useEffect, useRef, useState} from "react";
import {Tooltip} from "@mui/material";

// import trigger image
import dust from '../../../assets/hay-fever-trigger/house-dust.png';
import mould from '../../../assets/hay-fever-trigger/mould.png';
import petDander from '../../../assets/hay-fever-trigger/pet-dander.png';
import pollen from '../../../assets/hay-fever-trigger/pollen.png';
// pollen minimisation images
import windowWithBlinds from '../../../assets/hay-fever-trigger/pollen-minimisation/window-with-blinds.avif';
import womenPractisingSelfCare from '../../../assets/hay-fever-trigger/pollen-minimisation/woman-practicing-selfcare.jpg';
import womenWithMask from '../../../assets/hay-fever-trigger/pollen-minimisation/woman-with-mask.jpg';
import medicinePills from '../../../assets/hay-fever-trigger/pollen-minimisation/medicine-pills.jpg';
import modernAirPurifier from '../../../assets/hay-fever-trigger/pollen-minimisation/modern-air-purifier.jpg';

// mould minimisation images
import manDisinfecting from '../../../assets/hay-fever-trigger/mould-minimisation/man-disinfecting.avif';
import largeIndustrialFan from '../../../assets/hay-fever-trigger/mould-minimisation/large-industrial-fan.avif';
import plumbingProfessional from '../../../assets/hay-fever-trigger/mould-minimisation/plumbing-professional.avif';
import womanLayingBed from '../../../assets/hay-fever-trigger/mould-minimisation/woman-laying-bed.jpg';

// dust minimisation images
import foldingClothes from '../../../assets/hay-fever-trigger/dust-minimisation/female-holding-folded-clothes.jpg';
import ladyInsideApartment from '../../../assets/hay-fever-trigger/dust-minimisation/lady-inside-modern-apartment.jpg';
import girlPlaying from '../../../assets/hay-fever-trigger/dust-minimisation/little-girl-playing-with-toys.avif';
import manCleaning from '../../../assets/hay-fever-trigger/dust-minimisation/man-cleaning-his-home.jpg';
import windowCurtains from '../../../assets/hay-fever-trigger/dust-minimisation/window-curtains.jpg';

// pet dander minimisation images
import dogPlayingWithKid from '../../../assets/hay-fever-trigger/pet-dander-minimisation/dog-playing-with-kid.jpg';
import washingPetDog from '../../../assets/hay-fever-trigger/pet-dander-minimisation/washing-pet-dog-home.jpg';

function HayfeverTriggers() {
    const triggerData = [
        {
            label: 'Pollen',
            image: pollen,
            minimisation: [
                {
                    image: windowWithBlinds,
                    description: [
                        'During peak allergy season, keep your doors and windows shut.',
                        /*'This will help limit the number of allergens that enter your house.'*/
                    ]
                },
                {
                    image: womenPractisingSelfCare,
                    description: [
                        /*'Youre exposed to lots of irritants as you move through the day.',*/
                        'Shower before bed to remove irritants accumulated during the day.',
                        /*'This will remove pollen, mold spores, or other allergens from your skin, nasal passages, and hair.'*/
                    ]
                },
                {
                    image: womenWithMask,
                    description: [
                        'Spend less time outdoors during the peak season.',
                        'Wear a mask and sunglasses outside.'
                    ]
                },
                {
                    image: medicinePills,
                    description: [
                        'Prevent seasonal allergies early with doctor-recommended medications.'
                    ]
                },
                {
                    image: modernAirPurifier,
                    description: [
                        'Use an air purifier.',
                        'These devices draw indoor air into the device and pass it through a filter.'
                        /*'The filter gathers substances like mold, dust, pet dander, and pushes clean air back into the room.'*/
                    ]
                }]
        },
        {
            label: 'Mould',
            image: mould,
            minimisation: [
                {
                    image: manDisinfecting,
                    description: [
                        'Regularly clean areas prone to mold growth, such as bathrooms, kitchens, and basements.',
                        /*'Clean with bleach or other mould reduction cleaners.'*/
                    ]
                },
                {
                    image: largeIndustrialFan,
                    description: [
                        'Use ceiling fans and portable fans to ensure there is adequate ventilation.',
                        /*'This reduces moisture buildup.'*/
                    ]
                },
                {
                    image: plumbingProfessional,
                    description: [
                        'Regularly check for and fix leaks to prevent water accumulation and mold growth.'
                    ]
                },
                {
                    image: womanLayingBed,
                    description: [
                        'Use a dehumidifier or air conditioner to maintain indoor humidity levels below 50%.',
                        /*'Indoor plants can increase humidity levels, so avoid over-watering them.',
                        'Use plants that naturally reduce indoor humidity.'*/
                    ]
                }]
        },
        {
            label: 'Dust',
            image: dust,
            minimisation: [
                {
                    image: foldingClothes,
                    description: [
                        /*'Beds are just as warm and cozy for dust mites as they are for us.',*/
                        'All washable bedding should be changed and cleaned at least weekly in hot water.',
                        /*'Add protective coverings to your mattress, box spring, and pillows to create a barrier between you and the mattress.'*/
                    ]
                },
                {
                    image: manCleaning,
                    description: [
                        /*'Vacuum as often as you can—ideally daily but at least weekly—to minimize the dust in your home.',
                        'Carpet especially should be vacuumed often if you\'re not able to wash it.',*/
                        'Vacuum frequently—ideally daily or at least weekly—to minimize dust, especially on carpets.'
                    ]
                },
                {
                    image: windowCurtains,
                    description: [
                        'Consider removing heavy curtains as they will likely become dust traps—and consequently dust mite traps.',
                        /*'Instead, opt for curtains that can be machine washed or wooden blinds that can be dusted regularly.'*/
                    ]
                },
                {
                    image: ladyInsideApartment,
                    description: [
                        /*'Clutter has a tendency to get dusty.',
                        'Things that are piling up accumulate dust if you\'re not moving and cleaning each item often.',
                        'Dust mites will move in to cluttered areas.',*/
                        'To avoid attracting dust mites, keep a clutter-free home.'
                    ]
                },
                {
                    image: girlPlaying,
                    description: [
                        'Freeze stuffed toys for at least 24 hours to kill dust mites and their eggs.',
                        /*'After freezing, shake or lightly vacuum the toys to remove any dead mites and allergenic particles.',
                        'Limit the number of stuffed toys on beds or in bedrooms to reduce the places where dust mites can thrive.'*/
                    ]
                }
            ]
        },
        {
            label: 'Pet Dander',
            image: petDander,
            minimisation: [
                {
                    image: dogPlayingWithKid,
                    description: [
                        /*'Create pet-free zones in your home by keeping pets out of bedrooms and other sleeping areas.',
                        'This reduces exposure to dander while you sleep.',
                        'Train your pets to stay off furniture, particularly upholstered pieces that can trap dander.',
                        'Designate specific areas where your pet is allowed, limiting the spread of dander throughout your living space.'*/
                        'Create pet-free zones, like bedrooms, to reduce exposure to dander while sleeping.'
                    ]
                },
                {
                    image: washingPetDog,
                    description: [
                        'Bathe your pet regularly, ideally once a week, using pet-friendly hypoallergenic shampoos to reduce dander and shedding.',
                        /*'Brush your pet daily to remove loose fur and dander.',
                        'Consider professional grooming services, especially for pets with longer coats, to further minimize dander and maintain a healthier environment.'*/
                    ]
                }
            ]
        },
    ];
    const [selectedTrigger, setSelectedTrigger] = useState(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    if (selectedTrigger && descriptionRef.current) {
      descriptionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedTrigger]);

  return (
    <div className="hayfever-dashboard">
      <div className="triggers-container">
        {triggerData.map((trigger, index) => (
          <Tooltip
            key={index}
            title={selectedTrigger && selectedTrigger.label === trigger.label 
              ? 'Click to Close Tips' 
              : `Click to know ${trigger.label} minimisation tips`}
            arrow
            placement="bottom"
          >
            <div 
              className={`trigger-card ${selectedTrigger && selectedTrigger.label !== trigger.label ? 'reduced-opacity' : ''}`}
              onClick={() => setSelectedTrigger(selectedTrigger?.label === trigger.label ? null : trigger)}
            >
              <img src={trigger.image} alt={trigger.label} className="trigger-icon" />
              <div className="trigger-label">{trigger.label}</div>
            </div>
          </Tooltip>
        ))}
      </div>
      
      <div className="description-container" ref={descriptionRef}>
        {selectedTrigger && (
          <>
            <h2 className="minimisation-tips-title">{selectedTrigger.label} Minimisation Tips</h2>
            <div className="minimisation-tips">
              {selectedTrigger.minimisation.map((minimisation, index) => (
                <div key={index} className="minimisation-card">
                  <img src={minimisation.image} alt={selectedTrigger.label} className="minimisation-icon" />
                  <div className="minimisation-description">
                    <ul>
                      {minimisation.description.map((point, pointIndex) => (
                        <li key={pointIndex}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default HayfeverTriggers;