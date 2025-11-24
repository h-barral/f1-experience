import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AnimatedRoutes from "./components/AnimatedRoutes";

function App() {
  return (
    <Router>
      {/* On a retiré <Cursor /> ici */}
      
      {/* On a retiré la classe "cursor-none" ici 👇 */}
      <div className="bg-f1-dark min-h-screen flex flex-col"> 
        <Navbar />
        <div className="flex-grow">
          <AnimatedRoutes />
        </div>
        <Footer />
      </div>
    </Router>
  );
}
export default App;