import React from 'react';
import { Row, Col, Container, Card } from 'react-bootstrap';

import './SkinCancerContent.css';

const SkinCancerContent = () => {
  const cardStyle = {
    backgroundColor: '#fff', // light blue background for the cards
    borderColor: '#b3d7ff', // slightly darker blue for the border to add subtle contrast
    color: '#000' // darker gray for text to ensure it is readable against the light background
  };

  return (
    <>
      

      <Row className="text-center my-3">
        <Col>
          <h2 style ={{ color: '#004085' }}>Skin Cancer Facts</h2>
          <p>Important information every parent should know</p>
        </Col>
      </Row>

      {/* First row of cards */}
      <Row className="justify-content-center">
        <Col md={3} className="my-3" >
          <Card style={cardStyle} className='custom-card'>
            <Card.Body>
              <Card.Title>Daily Treatment</Card.Title>
              <Card.Text>
                Over 2000 people per day are treated for skin cancer in Australia, amounting to around 750,000 per year.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} className="my-3" >
          <Card style={cardStyle} className='custom-card'>
            <Card.Body>
              <Card.Title>Common Cancer</Card.Title>
              <Card.Text>
                Skin cancer is Australia's most common cancer, making up about 80% of all newly diagnosed cancers annually.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} className="my-3" >
          <Card style={cardStyle} className ='custom-card'>
            <Card.Body>
              <Card.Title>Risk of Diagnosis</Card.Title>
              <Card.Text>
                2 in 3 Australians will be diagnosed with skin cancer by the age of 70.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Second row of cards */}
      <Row className="justify-content-center">
        <Col md={3} className="my-3" >
          <Card style={cardStyle} className = 'custom-card'>
            <Card.Body>
              <Card.Title>Melanoma Cases</Card.Title>
              <Card.Text>
                More than 12,500 cases of melanoma are diagnosed in Australia every year.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} className="my-3" >
          <Card style={cardStyle} className = 'custom-card'>
            <Card.Body>
              <Card.Title>Gender Disparity</Card.Title>
              <Card.Text>
                Melanoma is more common in men than women. Men are more than 2.5 times as likely to die from melanoma.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} className="my-3" >
          <Card style={cardStyle} className='custom-card'>
            <Card.Body>
              <Card.Title>Annual Deaths</Card.Title>
              <Card.Text>
                Skin cancer causes around 2,000 deaths per year in Australia.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default SkinCancerContent;
