import React, {useEffect, useState} from 'react';
import {Route, Routes, useLocation} from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import Footer from './components/footer/Footer';
import SkinCancer from './pages/skincancer/SkinCancer';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import PollenAndHayFever from './pages/pollen/Pollen';
import Activity from './pages/activity/Activity';
import RealInfo from './pages/realInfoPage/RealInfo';
import PollenPlantsPlanner from './pages/pollenplantsplanner/pollenplantsplanner';
import VitDGuide from "@/pages/vit-d-guide/VitDGuide.jsx";
import PasswordPage from '@/pages/password/Password';

function ScrollToTop() {
    const {pathname} = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const handleAuthenticate = () => setIsAuthenticated(true);
    
    return (

      <div className='app-container'>
        {isAuthenticated ? (
          <>
            <ScrollToTop />
            <Header />
            <main className='main-content'>
              <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path='/skincancer' element={<SkinCancer/>}/>
                    <Route path='/pollenandhayfever' element={<PollenAndHayFever/>}/>
                    <Route path='/vit-d-guide' element={<VitDGuide/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path='/activity' element={<Activity/>}/>
                    <Route path='/realinfo' element={<RealInfo/>}/>
                    <Route path="/pollenplantsplanner" element={<PollenPlantsPlanner/>}/>
                </Routes>
            </main>
            <Footer />
          </>
        ) : (
          <PasswordPage onAuthenticate={handleAuthenticate} />
        )}
      </div>
    );
    
    /*
    return (
        <>
            <ScrollToTop/>
            <Header/>
            <main className='main-content'>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path='/skincancer' element={<SkinCancer/>}/>
                    <Route path='/pollenandhayfever' element={<PollenAndHayFever/>}/>
                    <Route path='/vit-d-guide' element={<VitDGuide/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path='/activity' element={<Activity/>}/>
                    <Route path='/realinfo' element={<RealInfo/>}/>
                    <Route path="/pollenplantsplanner" element={<PollenPlantsPlanner/>}/>
                </Routes>
            </main>
            <Footer/>
        </>
    );
    */
}

export default App;