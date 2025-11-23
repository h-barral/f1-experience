import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Teams = () => {
  const [activeTab, setActiveTab] = useState('legends'); // 'legends' ou 'live'
  const [localTeams, setLocalTeams] = useState([]);
  const [apiTeams, setApiTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedTeamId, setExpandedTeamId] = useState(null);

  // CHARGEMENT DES DONNÉES
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. BDD Locale (Légendes)
        const localRes = await fetch('http://localhost:3001/api/teams');
        const localData = await localRes.json();
        setLocalTeams(localData);

        // 2. API Live (Championnat Constructeurs)
        const apiRes = await fetch('https://api.jolpi.ca/ergast/f1/current/constructorStandings.json');
        const apiData = await apiRes.json();
        setApiTeams(apiData.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);

        setLoading(false);
      } catch (err) {
        console.error("Erreur chargement équipes:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper pour les drapeaux API (Nationalité -> Code Pays)
  const getFlagCode = (nationality) => {
    const map = {
      'British': 'gb', 'Italian': 'it', 'Austrian': 'at', 
      'German': 'de', 'French': 'fr', 'Swiss': 'ch', 'American': 'us'
    };
    return map[nationality] || 'un'; // 'un' pour inconnu (drapeau ONU par défaut sur flagcdn)
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-f1-dark text-white">
      
      {/* HEADER & ONGLETS */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-6 max-w-7xl mx-auto">
        <div>
            <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-2">
              Constructeurs <span className="text-f1-red">F1</span>
            </h2>
            <p className="text-gray-400">L'ingénierie au service de la vitesse.</p>
        </div>

        <div className="flex gap-2 mt-4 md:mt-0 bg-white/5 p-1 rounded-lg">
            <button 
                onClick={() => setActiveTab('legends')}
                className={`px-4 py-2 rounded-md text-sm font-bold uppercase transition-all ${activeTab === 'legends' ? 'bg-f1-red text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
                Nos Légendes
            </button>
            <button 
                onClick={() => setActiveTab('live')}
                className={`px-4 py-2 rounded-md text-sm font-bold uppercase transition-all ${activeTab === 'live' ? 'bg-f1-red text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
                Championnat {new Date().getFullYear()}
            </button>
        </div>
      </div>

      {loading ? (
        <div className="text-white text-center animate-pulse py-20">Synchronisation des usines...</div>
      ) : (
        <div className="max-w-7xl mx-auto min-h-[500px]">
            <AnimatePresence mode='wait'>
                
                {/* === ONGLET 1 : LÉGENDES (BDD) === */}
                {activeTab === 'legends' && (
                    <motion.div 
                        key="legends"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {localTeams.map((team) => (
                            <motion.div 
                                layout
                                key={team.id}
                                onClick={() => setExpandedTeamId(expandedTeamId === team.id ? null : team.id)}
                                className={`bg-gray-900 border border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:border-f1-red ${expandedTeamId === team.id ? 'col-span-1 md:col-span-2 lg:col-span-3 bg-gray-800 shadow-2xl' : ''}`}
                            >
                                <div className="flex flex-col md:flex-row">
                                    <div className="p-8 flex-1">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-2xl font-black uppercase italic text-white">{team.nom}</h3>
                                            {/* Drapeau simple si on connait le pays */}
                                            <img src={`https://flagcdn.com/w40/${team.pays === 'Royaume-Uni' ? 'gb' : team.pays === 'Italie' ? 'it' : team.pays === 'Allemagne' ? 'de' : team.pays === 'Autriche' ? 'at' : 'fr'}.png`} alt={team.pays} className="w-8 rounded shadow-sm" />
                                        </div>
                                        
                                        <div className="flex gap-4 text-xs text-gray-400 mb-6 font-mono uppercase tracking-wider">
                                            <span>📍 {team.base}</span>
                                            <span>🏁 Début: {team.annee_debut}</span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-black/30 p-3 rounded border border-white/5">
                                                <div className="text-2xl font-bold text-f1-red">{team.championnats_gagnes}</div>
                                                <div className="text-[9px] uppercase text-gray-500 font-bold">Titres</div>
                                            </div>
                                            <div className="bg-black/30 p-3 rounded border border-white/5">
                                                <div className="text-sm font-bold text-white truncate">{team.directeur}</div>
                                                <div className="text-[9px] uppercase text-gray-500 font-bold">Team Principal</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Zone d'extension */}
                                    {expandedTeamId === team.id && (
                                        <motion.div 
                                            initial={{ opacity: 0 }} 
                                            animate={{ opacity: 1 }} 
                                            className="p-8 bg-black/20 md:w-1/2 border-l border-white/5 flex flex-col justify-center"
                                        >
                                            <h4 className="text-f1-red font-bold uppercase mb-2 text-sm">Histoire & Palmarès</h4>
                                            <p className="text-gray-300 text-sm leading-relaxed mb-6 text-justify border-l-2 border-white/10 pl-4">{team.bio}</p>
                                            
                                            <h4 className="text-white font-bold uppercase mb-2 text-xs tracking-widest">Pilotes Légendaires</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {team.top_pilotes.split(',').map((p, i) => (
                                                    <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-xs border border-white/10 hover:bg-f1-red hover:border-f1-red transition-colors">{p.trim()}</span>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* === ONGLET 2 : LIVE (API) === */}
                {activeTab === 'live' && (
                    <motion.div 
                        key="live"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="grid grid-cols-1 gap-4"
                    >
                        {apiTeams.map((team) => (
                            <div key={team.Constructor.constructorId} className="bg-gray-900/60 border border-white/10 p-6 rounded-xl flex items-center justify-between hover:border-f1-red/50 transition-all group">
                                
                                <div className="flex items-center gap-6">
                                    {/* Position */}
                                    <div className="text-4xl font-black text-white/20 w-16 text-center group-hover:text-white transition-colors">
                                        {team.position}
                                    </div>
                                    
                                    {/* Info Team */}
                                    <div>
                                        <h3 className="text-xl font-bold text-white uppercase italic flex items-center gap-3">
                                            {team.Constructor.name}
                                            <img 
                                                src={`https://flagcdn.com/w40/${getFlagCode(team.Constructor.nationality)}.png`} 
                                                alt={team.Constructor.nationality}
                                                className="w-5 h-auto rounded opacity-70"
                                            />
                                        </h3>
                                        <p className="text-sm text-gray-400 mt-1">
                                            {team.wins} Victoire(s) cette saison
                                        </p>
                                    </div>
                                </div>

                                {/* Points */}
                                <div className="text-right">
                                    <div className="text-3xl font-black text-f1-red">{team.points}</div>
                                    <div className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Points</div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                )}

            </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Teams;