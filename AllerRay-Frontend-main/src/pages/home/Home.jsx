import Dashboard from '@/components/dashboard/dashboard';
import './Home.css';


import { Link } from 'react-router-dom';
import { FaSun, FaCloudSun, FaFutbol } from 'react-icons/fa'; // Import icons from react-icons
import { IoBody } from "react-icons/io5";
import { PiPlantBold } from "react-icons/pi";



function Home() {
    return (
        <>
      {/* Hero Section */}
      <section id='hero' className='hero'>
        <h1>Sunshine, Safety and Smiles</h1>
        <p>
          AllerRay equips immigrant families with smart tools and real-time insights to <br /> 
          navigate allergies and enjoy safe outdoor experiences.
        </p>        <Link to="/realinfo" className='crazy-button'>
          Check Today UV & Pollen Levels of Melbourne
        </Link>
      </section>

      {/* 3-Step Section with Title */}
      <section className="steps-section">
        <h2 className="steps-title">
                    Using AllerRay <span className="underline">IN 4</span> Easy Steps
                </h2>
        <div className="steps-container">
          <Link to ='realinfo' className='step-card'>
            <FaSun className="step-icon" /> {/* Icon for Step 1 */}
            <h3>1</h3>
            <p><strong>Check Current UV & Pollen Level</strong></p>
            <p>Access the Dashboard to see current UV index and pollen levels in Melbourne.</p>
          </Link>
          {/*
          <Link to="/skincancer" className="step-card">
            <FaCloudSun className="step-icon" /> 
            <h3>2</h3>
            <p><strong>Improve awareness of UV and Hay Fever</strong></p>
            <p>Learn about the risks associated with UV exposure and hay fever.</p>
          </Link>
          */}
          <Link to="/activity" className="step-card">
            <FaFutbol className="step-icon" /> {/* Icon for Step 2 */}
            <h3>2</h3>
            <p><strong>Activity & Sports Facility Finder</strong></p>
            <p>Ensure safe sun exposure and allergy management.</p>
          </Link>

          <Link to="/vit-d-guide" className="step-card">
            <IoBody className="step-icon" /> {/* Icon for Step 3 */}
            <h3>3</h3>
            <p><strong>Sun Exposure Planner for Vitamin D</strong></p>
            <p>Plan Your Sun Time Safely to Boost Vitamin D.</p>
          </Link>

          <Link to="/PollenPlantsPlanner" className="step-card">
            <PiPlantBold className="step-icon" /> {/* Icon for Step 2 */}
            <h3>4</h3>
            <p><strong>Pollen & Plant Allergy Guide</strong></p>
            <p>Discover high-risk plants and create a safer environment for outdoor fun.</p>
          </Link>
        </div>
      </section>
        </>
    );
}

export default Home;

