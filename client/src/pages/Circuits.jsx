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
            {/* Background avec effet de grille */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]"></div>

            <div className="flex flex-col md:flex-row items-center">
                
                {/* PARTIE GAUCHE : INFO VISUELLE */}
                <div className="w-full md:w-1/3 h-48 md:h-64 bg-black/40 flex items-center justify-center p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 bg-f1-red text-white text-xs font-bold px-3 py-1 rounded-br-lg uppercase tracking-wider">
                        Round {index + 1}
                    </div>
                    {/* Placeholder pour le tracé du circuit */}
                    <div className="text-gray-600 text-6xl font-black opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500 select-none">
                        {track.pays.substring(0, 3).toUpperCase()}
                    </div>
                    <div className="absolute bottom-4 left-0 w-full text-center">
                        <span className="text-white font-bold text-lg uppercase tracking-widest">{track.pays}</span>
                    </div>
                </div>

                {/* PARTIE DROITE : DONNÉES TECHNIQUES */}
                <div className="w-full md:w-2/3 p-8">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-3xl font-bold uppercase italic text-white mb-1 group-hover:text-f1-red transition-colors">
                                {track.nom}
                            </h3>
                            <p className="text-gray-400 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-f1-red rounded-full"></span>
                                {track.lieu}
                            </p>
                        </div>
                        <div className="text-right hidden md:block">
                            <div className="text-4xl font-black text-white/10">{track.longueur_km} <span className="text-sm">KM</span></div>
                        </div>
                    </div>

                    {/* GRILLE DE STATS */}
                    <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Longueur</p>
                            <p className="text-xl font-bold text-white">{track.longueur_km} km</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Tours</p>
                            <p className="text-xl font-bold text-white">{track.tours}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Distance Totale</p>
                            <p className="text-xl font-bold text-white">{(track.longueur_km * track.tours).toFixed(1)} km</p>
                        </div>
                    </div>

                </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Circuits;