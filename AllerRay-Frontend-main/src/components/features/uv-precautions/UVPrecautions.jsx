import UVTile from './UVTile';
import './UVPrecautions.css';

const UVPrecautions = () => {
    const uvData = [
        { index: '0-2', type: 'low', precautions: ['Generally safe with minimal sun protection needed.', 'Wear sunglasses if the sun is bright.', 'Apply SPF 15+ sunscreen if you will be outside for an extended period.', 'Encourage children to wear a hat if they are outdoors for more than an hour.'] },
        { index: '3-5', type: 'moderate', precautions: ['Stay in the shade during midday hours (10 AM - 4 PM) when the sun is strongest.', 'Wear sunglasses that block UV rays.', 'Apply SPF 30+ sunscreen to exposed skin 15 minutes before going outside.', 'Wear protective clothing like long-sleeved shirts, pants, and a wide-brimmed hat.', 'Encourage children to take breaks in shaded areas during outdoor play.'] },
        { index: '6-7', type: 'high', precautions: ['Limit time outdoors between 10 AM and 4 PM.', 'Apply SPF 30+ or higher sunscreen, and reapply every 2 hours or after swimming or sweating.', 'Wear sunglasses and a broad-brimmed hat.', 'Seek shade whenever possible, especially during midday.', 'Wear protective clothing such as a long-sleeved shirt and pants.'] },
        { index: '8-10', type: 'very-high', precautions: ['Minimize outdoor activities between 10 AM and 4 PM.', 'Apply SPF 50+ sunscreen generously, and reapply every 2 hours or after water exposure.', 'Wear sunglasses that offer 100% UV protection and a wide-brimmed hat.', 'Wear long-sleeved, tightly woven clothing to protect as much skin as possible.', 'Stay in the shade as much as possible.'] },
        // { index: '11+', type: 'Extreme', precautions: ['Avoid outdoor activities during midday hours (10 AM - 4 PM).', 'Apply a high SPF 50+ broad-spectrum sunscreen, and reapply frequently.', 'Wear a wide-brimmed hat, sunglasses with UV protection, and protective clothing.', 'Stay in the shade or indoors if possible.', 'Ensure children are fully covered, and make sure they drink plenty of water to stay hydrated.'] }
    ];

    return (
        <div className='uv-precautions'>
            {uvData.map((data, index) => (
                <UVTile key={index}
                        index={data.index}
                        type={data.type}
                        precautions={data.precautions} />
            ))}
        </div>
    );
};

export default UVPrecautions;