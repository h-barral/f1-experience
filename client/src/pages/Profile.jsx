import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Profile = () => {
  // On récupère l'user connecté
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  
  // États pour les champs modifiables
  const [formData, setFormData] = useState({
    ecurie_favorite: user?.ecurie_favorite || '',
    pilote_favori: user?.pilote_favori || '',
    circuit_favori: user?.circuit_favori || '',
    est_public: user?.est_public ?? true // Par défaut true
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:3001/api/user/update', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...formData, id: user.id })
        });
        
        if (response.ok) {
            setMessage("✅ Profil mis à jour !");
            // On met à jour le localStorage pour garder les infos
            const updatedUser = { ...user, ...formData };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);
        }
    } catch (err) {
        console.error(err);
        setMessage("❌ Erreur lors de la sauvegarde");
    }
  };

  if (!user) return <div className="text-white text-center pt-32">Connecte-toi pour voir ton profil.</div>;

  return (
    <div className="min-h-screen pt-24 px-4 bg-f1-dark text-white flex justify-center">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* COLONNE GAUCHE : LA CARTE DE MEMBRE */}
        <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="md:col-span-1"
        >
            <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6 shadow-[0_0_30px_rgba(225,6,0,0.15)] relative overflow-hidden">
                {/* Effet de brillance */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
                
                <div className="text-center mb-6">
                    <div className="w-24 h-24 mx-auto bg-f1-red rounded-full flex items-center justify-center text-3xl font-bold mb-4 border-4 border-gray-800">
                        {user.pseudo.charAt(0).toUpperCase()}
                    </div>
                    <h2 className="text-2xl font-bold uppercase">{user.pseudo}</h2>
                    <p className="text-gray-400 text-sm">{user.email}</p>
                    <div className="mt-2 inline-block px-3 py-1 bg-white/10 rounded-full text-xs uppercase tracking-widest">
                        Pilote Officiel
                    </div>
                </div>

                <div className="space-y-3 border-t border-white/10 pt-4">
                    <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">Écurie</span>
                        <span className="font-bold text-f1-red">{formData.ecurie_favorite || "-"}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">Pilote</span>
                        <span className="font-bold">{formData.pilote_favori || "-"}</span>
                    </div>
                </div>
            </div>
        </motion.div>

        {/* COLONNE DROITE : FORMULAIRE DE PRÉFÉRENCES */}
        <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 bg-gray-900/50 border border-white/5 p-8 rounded-2xl"
        >
            <h3 className="text-2xl font-bold mb-6 uppercase flex items-center gap-2">
                <span className="w-1 h-8 bg-f1-red rounded-full"></span>
                Télémétrie Personnelle
            </h3>

            {message && <div className="mb-4 p-3 bg-f1-red/20 border border-f1-red/50 rounded text-sm">{message}</div>}

            <form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Écurie Favorite</label>
                        <select name="ecurie_favorite" value={formData.ecurie_favorite} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded p-3 focus:border-f1-red outline-none">
                            <option value="">Choisir...</option>
                            <option value="Ferrari">Ferrari</option>
                            <option value="Red Bull">Red Bull Racing</option>
                            <option value="Mercedes">Mercedes</option>
                            <option value="McLaren">McLaren</option>
                            <option value="Alpine">Alpine</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Pilote Favori</label>
                        <input type="text" name="pilote_favori" value={formData.pilote_favori} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded p-3 focus:border-f1-red outline-none" placeholder="Ex: Lewis Hamilton" />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Circuit Préféré</label>
                        <input type="text" name="circuit_favori" value={formData.circuit_favori} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded p-3 focus:border-f1-red outline-none" placeholder="Ex: Spa Francorchamps" />
                    </div>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                    <input 
                        type="checkbox" 
                        name="est_public" 
                        checked={formData.est_public} 
                        onChange={handleChange}
                        className="w-5 h-5 accent-f1-red"
                    />
                    <label className="text-sm text-gray-300">Rendre mon profil visible par les autres pilotes</label>
                </div>

                <button type="submit" className="bg-white text-f1-dark font-bold px-8 py-3 rounded uppercase hover:bg-gray-200 transition">
                    Sauvegarder les réglages
                </button>
            </form>
        </motion.div>

      </div>
    </div>
  );
};

export default Profile;