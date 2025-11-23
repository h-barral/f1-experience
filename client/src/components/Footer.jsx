import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black/90 border-t border-white/10 pt-16 pb-8 text-white relative z-50">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            
            {/* COLONNE 1 : MARQUE */}
            <div className="col-span-1 md:col-span-1">
                <Link to="/" className="flex items-center gap-2 mb-4 group">
                    <span className="text-3xl font-bold italic tracking-tighter text-white group-hover:text-f1-red transition-colors">
                    F1<span className="text-f1-red group-hover:text-white">.EXP</span>
                    </span>
                </Link>
                <p className="text-gray-500 text-sm leading-relaxed">
                    L'expérience immersive ultime pour les fans de Formule 1. Données, histoire et compétition en temps réel.
                </p>
            </div>

            {/* COLONNE 2 : EXPLORER */}
            <div>
                <h4 className="font-bold uppercase tracking-wider mb-6 text-f1-red text-sm">Paddock</h4>
                <ul className="space-y-3 text-sm text-gray-400">
                    <li><Link to="/drivers" className="hover:text-white transition">Pilotes 2024</Link></li>
                    <li><Link to="/circuits" className="hover:text-white transition">Circuits</Link></li>
                    <li><Link to="/history" className="hover:text-white transition">Chronologie</Link></li>
                    <li><Link to="/leaderboard" className="hover:text-white transition">Classement</Link></li>
                </ul>
            </div>

            {/* COLONNE 3 : LÉGAL */}
            <div>
                <h4 className="font-bold uppercase tracking-wider mb-6 text-f1-red text-sm">Légal</h4>
                <ul className="space-y-3 text-sm text-gray-400">
                    <li><a href="#" className="hover:text-white transition">Mentions Légales</a></li>
                    <li><a href="#" className="hover:text-white transition">Politique de Confidentialité</a></li>
                    <li><a href="#" className="hover:text-white transition">Cookies</a></li>
                </ul>
            </div>

            {/* COLONNE 4 : NEWSLETTER */}
            <div>
                <h4 className="font-bold uppercase tracking-wider mb-6 text-f1-red text-sm">Restez informé</h4>
                <p className="text-xs text-gray-500 mb-4">Rejoignez la pole position pour ne rien rater.</p>
                <div className="flex">
                    <input type="email" placeholder="Email..." className="bg-white/5 border border-white/10 text-white text-sm p-2 rounded-l w-full focus:outline-none focus:border-f1-red" />
                    <button className="bg-f1-red hover:bg-red-700 text-white px-4 rounded-r font-bold text-sm transition">GO</button>
                </div>
            </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-xs">
                © 2025 F1 EXPERIENCE. Projet Étudiant - Non officiel.
            </p>
            <div className="flex gap-4">
                {/* Icônes réseaux sociaux (Fausses pour l'exemple) */}
                <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center hover:bg-f1-red transition cursor-pointer">X</div>
                <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center hover:bg-f1-red transition cursor-pointer">In</div>
                <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center hover:bg-f1-red transition cursor-pointer">Fb</div>
            </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;