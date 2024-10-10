import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import './pictogram.css'; 

const PictogramChart = () => {
  const data = [
    { year: 2001, percentage: 17.5 },
    { year: 2005, percentage: 18.2 },
    { year: 2009, percentage: 17.7 },
    { year: 2012, percentage: 18.9 },
    { year: 2015, percentage: 21.2 },
    { year: 2018, percentage: 23.1 },
    { year: 2022, percentage: 29.8 },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [highlighted, setHighlighted] = useState(0);
  const [displayedPercentage, setDisplayedPercentage] = useState(data[0].percentage);
  const [displayedYear, setDisplayedYear] = useState(data[0].year);
  const [showCard, setShowCard] = useState(false); // Control the visibility of the card

  useEffect(() => {
    const duration = 1500; // Total duration for each transition in milliseconds (faster)
    const stepTime = 20; // Time per step in milliseconds
    const steps = duration / stepTime; // Number of steps in the animation

    const startPercentage = displayedPercentage;
    const targetPercentage = data[currentIndex].percentage;
    const stepValue = (targetPercentage - startPercentage) / steps;
    const targetHighlighted = Math.round((data[currentIndex].percentage / 100) * 10);

    setDisplayedYear(data[currentIndex].year);
    setShowCard(false); // Hide the card at the start of the animation

    const percentageInterval = setInterval(() => {
      setDisplayedPercentage(prev => {
        const newValue = prev + stepValue;
        if ((stepValue > 0 && newValue >= targetPercentage) ||
            (stepValue < 0 && newValue <= targetPercentage)) {
          return targetPercentage;
        }
        return newValue;
      });
    }, stepTime);

    const highlightInterval = setInterval(() => {
      setHighlighted(prev => {
        if (prev < targetHighlighted) {
          return prev + 1;
        }
        return targetHighlighted;
      });
    }, duration / 10); // Speed of the icon highlighting

    const transitionTimeout = setTimeout(() => {
      clearInterval(percentageInterval);
      clearInterval(highlightInterval);
      setShowCard(true); // Show the card once the animation is complete
      if (currentIndex < data.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }, duration);

    return () => {
      clearInterval(percentageInterval);
      clearInterval(highlightInterval);
      clearTimeout(transitionTimeout);
    };
  }, [currentIndex]);

  const iconsArray = Array.from({ length: 10 }, (_, index) => (
    <span
      key={index}
      className={`icon ${index < highlighted ? 'highlighted' : ''}`}
    >
      <FaUser />
    </span>
  ));

  return (
    <Container className="my-5">
      <Row className="text-center">
        <Col>
          <h2 style={{ color: '#004085' }}>Pollen Allergy Affected Population</h2>
          <div className="pictogram-chart">{iconsArray}</div>
          <p style={{ marginBottom: '1px' }}>
            In National Health Survey <strong style={{ fontSize: '36px', fontWeight: 'bold' }}>{displayedYear}</strong>,
          </p>
          <h1 style={{ fontSize: '72px', fontWeight: 'bold', color: '#ff7700c3' }}>
            {displayedPercentage.toFixed(1)}%
          </h1>
          <p style={{ marginTop: '-8px' }}>of the population in Victoria are suffering Hay Fever.</p>
        </Col>
      </Row>

      <Row className="justify-content-center mt-4">
        <Col md={8}>
          <Card className={`${showCard ? 'card-visible' : 'card-hidden'} custom-card-bg`}>
            <Card.Body>
              <Card.Title><strong>Why is Hay Fever more common now?</strong></Card.Title>
              <Card.Text>
                <ul>
                  <li><strong>Extended Pollen Seasons:</strong> Warmer weather results in longer growing seasons, leading to extended periods of pollen release and exposure.</li>
                  <li><strong>Urban Air Pollution:</strong> Pollutants like diesel exhaust particles can bond with pollen, making it more potent and increasing the severity of allergic reactions.</li>
                  <li><strong>Hygiene Hypothesis:</strong> Modern lifestyles with less exposure to germs and bacteria may weaken immune systems, making people more susceptible to allergies.</li>
                  <li><strong>Indoor Lifestyle and Air Quality:</strong> Spending more time indoors with exposure to indoor allergens (such as dust mites, pet dander, and mold) can worsen symptoms when combined with outdoor allergens.</li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PictogramChart;
