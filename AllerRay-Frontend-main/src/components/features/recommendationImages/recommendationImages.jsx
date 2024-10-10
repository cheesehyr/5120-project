import React, { useEffect, useState } from 'react';
import './recommendationImages.css';

function RecommendationImages({ emojis }) {
    const [visibleEmojis, setVisibleEmojis] = useState([]);

    useEffect(() => {
        // Clear visible emojis when new emojis are received
        setVisibleEmojis([]);
        let timeoutIds = [];
        emojis.forEach((emoji, index) => {
            // Set a timeout to add each emoji to the visibleEmojis state with a delay
            const timeoutId = setTimeout(() => {
                setVisibleEmojis((prev) => [...prev, emoji]);
            }, index * 200);
            timeoutIds.push(timeoutId);
        });

        // Clear all timeouts when the component unmounts or emojis change
        return () => {
            timeoutIds.forEach(clearTimeout);
        };
    }, [emojis]);

    return (
        <div className='emoji-container'>
            {visibleEmojis.map((emoji, index) => (
                <div key={index} className='emoji popup'>
                    <img className='emoji-img' src={emoji.image} alt={emoji.label} title={emoji.label}/>
                </div>
            ))}
        </div>
    );
}

export default RecommendationImages;