import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// IMPORT DES PAGES
import Home from "./pages/Home";
import Drivers from "./pages/Drivers";
import DriverDetail from "./pages/DriverDetail";
import History from "./pages/History";
import Auth from "./pages/Auth";
import Quiz from "./pages/Quiz";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard"; // On garde le fichier, mais on l'utilise dans Quiz
import Circuits from "./pages/Circuits";
import Teams from "./pages/Teams"; // <--- NOUVELLE PAGE
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <div className="bg-f1-dark min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/drivers" element={<Drivers />} />
            <Route path="/drivers/:id" element={<DriverDetail />} />
            <Route path="/history" element={<History />} />
            <Route path="/paddock" element={<Quiz />} /> {/* Le classement est dedans maintenant */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/circuits" element={<Circuits />} />
            <Route path="/teams" element={<Teams />} /> {/* Nouvelle Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
export default App;