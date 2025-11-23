import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
// 1. On importe la nouvelle page
import Drivers from './pages/Drivers';
import DriverDetail from './pages/DriverDetail';
import History from './pages/History';

// Page d'accueil temporaire (on la garde pour l'instant)
const Home = () => (
  <div className="min-h-screen bg-f1-dark text-white flex flex-col items-center justify-center pt-16">
    <div className="text-center px-4">
      <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-6">
        Au cœur de la <span className="text-transparent bg-clip-text bg-gradient-to-r from-f1-red to-orange-600">Performance</span>
      </h1>
      <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
        L'histoire, les données et la passion de la Formule 1 réunies en un seul endroit.
      </p>
      <button className="px-8 py-4 bg-white text-f1-dark font-black text-lg uppercase rounded hover:bg-gray-200 transition">
        Découvrir
      </button>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="bg-f1-dark min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* 2. On ajoute la route pour les pilotes */}
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/drivers/:id" element={<DriverDetail />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;