import { Link } from 'react-router-dom';

const Navbar = () => {
  // On récupère l'user stocké
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload(); 
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-f1-dark/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-bold italic tracking-tighter text-white group-hover:text-f1-red transition-colors">
              F1<span className="text-f1-red group-hover:text-white">.EXP</span>
            </span>
          </Link>

          {/* LIENS DU CENTRE */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <NavLink to="/">Accueil</NavLink>
              <NavLink to="/history">Histoire</NavLink>
              <NavLink to="/drivers">Pilotes</NavLink>
              <NavLink to="/circuits">Circuits</NavLink>
              <NavLink to="/leaderboard">Classement</NavLink>
              <NavLink to="/paddock">Le Paddock</NavLink>
            </div>
          </div>

          {/* ZONE UTILISATEUR */}
          <div>
            {user ? (
              <div className="flex items-center gap-4">
                {/* Lien vers le profil */}
                <Link to="/profile" className="text-right hidden md:block hover:opacity-80 transition">
                    <p className="text-xs text-gray-400 uppercase">Pilote</p>
                    <p className="text-sm font-bold text-white">{user.pseudo}</p>
                </Link>
                
                <button 
                    onClick={handleLogout}
                    className="bg-white/10 hover:bg-f1-red text-white px-4 py-2 rounded text-sm font-bold uppercase tracking-wider transition-all border border-white/20"
                >
                    Sortir
                </button>
              </div>
            ) : (
              <Link to="/auth" className="bg-f1-red hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-bold uppercase tracking-wider transition-all transform hover:scale-105">
                Connexion
              </Link>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

// Composant interne pour les liens
const NavLink = ({ to, children }) => (
  <Link 
    to={to} 
    className="text-gray-300 hover:text-white hover:border-b-2 hover:border-f1-red px-3 py-2 text-sm font-medium transition-all"
  >
    {children}
  </Link>
);

export default Navbar;