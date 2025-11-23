import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Circuits = () => {
  const [circuits, setCircuits] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/circuits')
      .then(res => res.json())
      .then(data => setCircuits(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-f1-dark text-white">
      
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-4">
          Calendrier <span className="text-f1-red">Légendaire</span>
        </h2>
        <p className="text-gray-400">Les théâtres de la vitesse.</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-8">
        {circuits.map((track, index) => (
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            key={track.id} 
            className="group relative bg-gray-900 border border-white/10 rounded-2xl overflow-hidden hover:border-f1-red transition-all duration-300"
          >
            {/* Background avec effet de grille subtil */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] pointer-events-none"></div>

            <div className="flex flex-col md:flex-row items-stretch">
                
                {/* PARTIE GAUCHE : PHOTO DU CIRCUIT */}
                <div className="w-full md:w-2/5 min-h-[250px] relative overflow-hidden">
                    {/* Filtre rouge au survol */}
                    <div className="absolute inset-0 bg-f1-red/0 group-hover:bg-f1-red/20 z-10 transition-colors duration-300"></div>
                    
                    {/* L'IMAGE */}
                    <img 
                        src={`/images/${track.image_url}`} 
                        alt={track.nom} 
                        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                    />

                    {/* Badge Round */}
                    <div className="absolute top-0 left-0 bg-f1-red text-white text-xs font-bold px-3 py-1 rounded-br-lg uppercase tracking-wider z-20 shadow-lg">
                        Round {index + 1}
                    </div>

                    {/* Nom du Pays en bas de l'image */}
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-4 z-20">
                        <span className="text-white font-bold text-lg uppercase tracking-widest flex items-center gap-2">
                             <img src={`https://flagcdn.com/w40/${track.pays === 'Royaume-Uni' ? 'gb' : track.pays === 'Japon' ? 'jp' : track.pays.substring(0,2).toLowerCase()}.png`} className="w-6 rounded-sm" alt="flag" />
                             {track.pays}
                        </span>
                    </div>
                </div>

                {/* PARTIE DROITE : DONNÉES TECHNIQUES */}
                <div className="w-full md:w-3/5 p-8 flex flex-col justify-center">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold uppercase italic text-white mb-2 group-hover:text-f1-red transition-colors">
                                {track.nom}
                            </h3>
                            <p className="text-gray-400 flex items-center gap-2 text-sm font-mono">
                                <span className="w-1.5 h-1.5 bg-f1-red rounded-full"></span>
                                {track.lieu.toUpperCase()}
                            </p>
                        </div>
                    </div>

                    {/* GRILLE DE STATS */}
                    <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                        <div className="bg-black/20 p-3 rounded border border-white/5">
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">Longueur</p>
                            <p className="text-lg font-bold text-white">{track.longueur_km} <span className="text-xs text-gray-400">km</span></p>
                        </div>
                        <div className="bg-black/20 p-3 rounded border border-white/5">
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">Tours</p>
                            <p className="text-lg font-bold text-white">{track.tours}</p>
                        </div>
                        <div className="bg-black/20 p-3 rounded border border-white/5">
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">Distance</p>
                            <p className="text-lg font-bold text-white">{(track.longueur_km * track.tours).toFixed(1)} <span className="text-xs text-gray-400">km</span></p>
                        </div>
                    </div>

                    <button className="mt-6 w-full py-3 border border-white/10 hover:bg-white/10 hover:border-f1-red text-sm font-bold uppercase rounded transition-all">
                        Voir le tracé
                    </button>

                </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Circuits;