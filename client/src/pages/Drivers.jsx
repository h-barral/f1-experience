import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Drivers = () => {
  const [activeTab, setActiveTab] = useState('legends'); // 'legends' (BDD) ou 'live' (API)
  const [localDrivers, setLocalDrivers] = useState([]);
  const [apiDrivers, setApiDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  // CHARGEMENT DES DONNÉES
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // 1. Récupérer tes pilotes BDD (Légendes)
        const localRes = await fetch('http://localhost:3001/api/pilotes');
        const localData = await localRes.json();
        setLocalDrivers(localData);

        // 2. Récupérer la grille complète via API
        const apiRes = await fetch('https://api.jolpi.ca/ergast/f1/current/driverStandings.json');
        const apiData = await apiRes.json();
        setApiDrivers(apiData.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        
        setLoading(false);
      } catch (error) {
        console.error("Erreur chargement:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto min-h-screen">
      
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-6">
        <div>
            <h2 className="text-4xl font-bold text-white uppercase tracking-tighter">
            Pilotes <span className="text-f1-red">Officiels</span>
            </h2>
            <p className="text-gray-400 mt-2">Les héros du cockpit.</p>
        </div>

        {/* ONGLETS DE NAVIGATION */}
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
                Grille Complète (API)
            </button>
        </div>
      </div>

      {loading ? (
        <div className="text-white text-center animate-pulse py-20">Téléchargement des données télémétriques...</div>
      ) : (
        <div className="min-h-[500px]">
            <AnimatePresence mode='wait'>
                
                {/* MODE LÉGENDES (BDD LOCALE) */}
                {activeTab === 'legends' && (
                    <motion.div 
                        key="legends"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {localDrivers.map((driver) => (
                            <Link to={`/drivers/${driver.id}`} key={driver.id} className="group block">
                                <div className="relative bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-f1-red transition-all duration-300 hover:-translate-y-2">
                                    <div className="h-48 overflow-hidden relative">
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
                                        <img 
                                            src={`/images/${driver.photo_url}`} 
                                            alt={driver.nom} 
                                            className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-6 relative z-10 -mt-12">
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="text-5xl font-bold text-white italic drop-shadow-lg">{driver.numero}</span>
                                            {driver.titres_mondiaux > 0 && (
                                                <span className="bg-yellow-500/20 text-yellow-500 border border-yellow-500/50 px-2 py-1 rounded text-xs font-bold uppercase flex items-center gap-1">
                                                    ★ {driver.titres_mondiaux}
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-1">
                                            {driver.prenom} <span className="text-f1-red uppercase">{driver.nom}</span>
                                        </h3>
                                        <p className="text-gray-400 font-medium flex items-center gap-2">{driver.ecurie}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </motion.div>
                )}

                {/* MODE LIVE API (GRILLE COMPLÈTE) */}
                {activeTab === 'live' && (
                    <motion.div 
                        key="live"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                    >
                        {apiDrivers.map((d) => (
                            <div key={d.Driver.driverId} className="bg-gray-900/50 border border-white/5 p-4 rounded-xl hover:border-white/20 transition-all flex items-center gap-4">
                                {/* Numéro */}
                                <div className="text-3xl font-black text-white/10 w-12 text-center">{d.Driver.permanentNumber || "#"}</div>
                                
                                {/* Infos */}
                                <div>
                                    <h3 className="font-bold text-white text-lg leading-none">
                                        {d.Driver.givenName} <span className="uppercase text-f1-red">{d.Driver.familyName}</span>
                                    </h3>
                                    <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">
                                        {d.Constructors[0] ? d.Constructors[0].name : "Sans volant"}
                                    </p>
                                </div>

                                {/* Points */}
                                <div className="ml-auto text-right">
                                    <div className="text-xl font-bold text-white">{d.points}</div>
                                    <div className="text-[9px] text-gray-500 uppercase">PTS</div>
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

export default Drivers;