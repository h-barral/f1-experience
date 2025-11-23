// ===========================================================================
// SECTION 1 : IMPORTS
// ===========================================================================
import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  // ===========================================================================
  // SECTION 2 : GESTION DES DONNÉES (STATES)
  // ===========================================================================
  // On stocke ce que l'utilisateur tape ici
  const [inputs, setInputs] = useState({
    pseudo: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState(""); // Pour afficher succès ou erreur

  // Fonction qui met à jour les inputs quand on tape
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ===========================================================================
  // SECTION 3 : ENVOI AU SERVEUR (SUBMIT)
  // ===========================================================================
  const navigate = useNavigate(); // Pour rediriger l'utilisateur après connexion

  const handleSubmit = async (e) => {
    e.preventDefault();

    // URL différente selon si on s'inscrit ou si on se connecte
    const url = isLogin
      ? "http://localhost:3001/api/auth/login"
      : "http://localhost:3001/api/auth/register";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(
          "✅ " + (isLogin ? "Connexion réussie !" : "Inscription réussie !")
        );

        if (isLogin) {
          // 1. On sauvegarde l'utilisateur dans la mémoire du navigateur
          localStorage.setItem("user", JSON.stringify(data.user));

          // 2. On attend 1 seconde puis on redirige vers l'accueil
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          // Si c'était une inscription, on bascule juste sur le formulaire de connexion
          setIsLogin(true);
        }
      } else {
        setMessage("❌ " + data.message);
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Erreur de connexion au serveur.");
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-f1-dark px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-900 p-8 rounded-2xl border border-white/10 w-full max-w-md shadow-[0_0_50px_rgba(225,6,0,0.1)]"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2 uppercase tracking-tighter">
            {isLogin ? "Retour au Stand" : "Rejoindre le Paddock"}
          </h2>
          <p className="text-gray-400 text-sm">
            {isLogin
              ? "Prêt à reprendre la course ?"
              : "Créez votre profil pilote."}
          </p>
        </div>

        {/* MESSAGE D'ERREUR OU SUCCÈS */}
        {message && (
          <div className="mb-4 p-3 rounded bg-white/10 text-center text-sm font-bold text-white border border-white/20">
            {message}
          </div>
        )}

        {/* ===========================================================================
            SECTION 4 : FORMULAIRE CONNECTÉ
            =========================================================================== */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
            >
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Pseudo
              </label>
              <input
                type="text"
                name="pseudo"
                onChange={handleChange}
                className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-f1-red focus:outline-none transition-colors"
                placeholder="MadMax33"
              />
            </motion.div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-f1-red focus:outline-none transition-colors"
              placeholder="pilote@f1.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-f1-red focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-f1-red hover:bg-red-700 text-white font-bold py-3 rounded uppercase tracking-wider transition-colors"
          >
            {isLogin ? "Se Connecter" : "S'inscrire"}
          </button>
        </form>

        <div className="mt-6 text-center border-t border-white/5 pt-6">
          <p className="text-gray-400 text-sm">
            {isLogin ? "Pas encore de compte ?" : "Déjà membre ?"}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setMessage("");
              }}
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
