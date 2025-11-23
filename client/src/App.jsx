import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
// IMPORT DES PAGES
import Drivers from './pages/Drivers';
import DriverDetail from './pages/DriverDetail';
import History from './pages/History';
import Home from './pages/Home'; // <--- On importe notre nouvelle Home

function App() {
  return (
    <Router>
      <div className="bg-f1-dark min-h-screen">
        <Navbar />
        <Routes>
          {/* ROUTE ACCUEIL */}
          <Route path="/" element={<Home />} />
          
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/drivers/:id" element={<DriverDetail />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;