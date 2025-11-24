import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Import de tes pages
import Home from '../pages/Home';
import Drivers from '../pages/Drivers';
import DriverDetail from '../pages/DriverDetail';
import History from '../pages/History';
import Auth from '../pages/Auth';
import Quiz from '../pages/Quiz';
import Profile from '../pages/Profile';
import Circuits from '../pages/Circuits';
import Teams from '../pages/Teams';
import NotFound from '../pages/NotFound';

// Import du Wrapper
import PageTransition from './PageTransition';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    // AnimatePresence permet de jouer l'animation de SORTIE (exit)
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/auth" element={<PageTransition><Auth /></PageTransition>} />
        <Route path="/drivers" element={<PageTransition><Drivers /></PageTransition>} />
        <Route path="/drivers/:id" element={<PageTransition><DriverDetail /></PageTransition>} />
        <Route path="/history" element={<PageTransition><History /></PageTransition>} />
        <Route path="/paddock" element={<PageTransition><Quiz /></PageTransition>} />
        <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
        <Route path="/circuits" element={<PageTransition><Circuits /></PageTransition>} />
        <Route path="/teams" element={<PageTransition><Teams /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;