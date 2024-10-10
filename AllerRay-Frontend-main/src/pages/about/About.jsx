import React from 'react';
import { Card } from 'react-bootstrap';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">About AllerRay</h1>
      <Card className="max-w-3xl mx-auto">
        <Card.Header>
          <h2 className="text-2xl font-semibold">Our Mission</h2>
        </Card.Header>
        <Card.Body>
          <p className="text-lg mb-4">
            At AllerRay, we are dedicated to providing comprehensive information about skin cancer and pollen allergies to help parents and children understand the symptoms, triggers, and prevention strategies.
          </p>
          <p className="text-lg mb-4">
            Our platform serves as a reliable resource where parents can access vital information about:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>Skin cancer awareness in children</li>
            <li>Pollen allergies and their impact</li>
            <li>Common triggers of hay fever</li>
            <li>Effective prevention strategies</li>
          </ul>
          <p className="text-lg">
            We strive to empower parents and children with the knowledge to identify early signs of skin cancer and pollen allergies, enabling them to take necessary precautions and seek appropriate care when needed.
          </p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default About;