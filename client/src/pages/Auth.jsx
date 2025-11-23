// ===========================================================================
// SECTION 1 : IMPORTS
// ===========================================================================
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Auth = () => {
  // État pour savoir si on affiche le formulaire "Connexion" ou "Inscription"
  const [isLogin, setIsLogin] = useState(true);

  return (
    // ===========================================================================
    // SECTION 2 : CONTAINER PRINCIPAL (Fond sombre centré)
    // ===========================================================================
    <div className="min-h-screen pt-20 flex items-center justify-center bg-f1-dark px-4">
      
      {/* Carte du formulaire */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-900 p-8 rounded-2xl border border-white/10 w-full max-w-md shadow-[0_0_50px_rgba(225,6,0,0.1)]"
      >
        
        {/* TITRE ET BASCULE */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2 uppercase tracking-tighter">
            {isLogin ? 'Retour au Stand' : 'Rejoindre le Paddock'}
          </h2>
          <p className="text-gray-400 text-sm">
            {isLogin ? 'Prêt à reprendre la course ?' : 'Créez votre profil pilote.'}
          </p>
        </div>

        {/* ===========================================================================
            SECTION 3 : LE FORMULAIRE
            =========================================================================== */}
        <form className="space-y-6">
          
          {/* Champ : Nom d'utilisateur (Seulement si Inscription) */}
          {!isLogin && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}>
              <label className="block text-sm font-medium text-gray-300 mb-1">Pseudo</label>
              <input 
                type="text" 
                className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-f1-red focus:outline-none transition-colors"
                placeholder="MadMax33"
              />
            </motion.div>
          )}

          {/* Champ : Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <input 
              type="email" 
              className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-f1-red focus:outline-none transition-colors"
              placeholder="pilote@f1.com"
            />
          </div>

          {/* Champ : Mot de passe */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Mot de passe</label>
            <input 
              type="password" 
              className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-f1-red focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          {/* BOUTON D'ACTION */}
          <button className="w-full bg-f1-red hover:bg-red-700 text-white font-bold py-3 rounded uppercase tracking-wider transition-colors">
            {isLogin ? 'Se Connecter' : "S'inscrire"}
          </button>
        </form>

        {/* ===========================================================================
            SECTION 4 : PIED DE PAGE (Switch Login/Register)
            =========================================================================== */}
        <div className="mt-6 text-center border-t border-white/5 pt-6">
          <p className="text-gray-400 text-sm">
            {isLogin ? "Pas encore de compte ?" : "Déjà membre ?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-f1-red font-bold ml-2 hover:underline"
            >
              {isLogin ? "Créer un compte" : "Se connecter"}
            </button>
          </p>
        </div>

      </motion.div>
    </div>
  );
};

export default Auth;