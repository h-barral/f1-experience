import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

// IMPORT DES PAGES
import Home from './pages/Home';
import Drivers from './pages/Drivers';
import DriverDetail from './pages/DriverDetail';
import History from './pages/History';
import Auth from './pages/Auth';
import Quiz from './pages/Quiz';
import Profile from './pages/Profile'; // <--- C'est souvent lui qui manque !

function App() {
  return (
    <Router>
      <div className="bg-f1-dark min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/drivers/:id" element={<DriverDetail />} />
          <Route path="/history" element={<History />} />
          <Route path="/paddock" element={<Quiz />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );

  
}

export default App;