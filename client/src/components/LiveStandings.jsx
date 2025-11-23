import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const LiveStandings = () => {
  const [drivers, setDrivers] = useState([]);
  const [constructors, setConstructors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. On récupère le classement Pilotes
        const driversRes = await fetch('https://api.jolpi.ca/ergast/f1/current/driverStandings.json');
        const driversData = await driversRes.json();
        setDrivers(driversData.MRData.StandingsTable.StandingsLists[0].DriverStandings.slice(0, 10)); // Top 10 seulement

        // 2. On récupère le classement Constructeurs
        const constructorsRes = await fetch('https://api.jolpi.ca/ergast/f1/current/constructorStandings.json');
        const constructorsData = await constructorsRes.json();
        setConstructors(constructorsData.MRData.StandingsTable.StandingsLists[0].ConstructorStandings.slice(0, 5)); // Top 5 seulement
        
        setLoading(false);
      } catch (err) {
        console.error("Erreur API Classement:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center text-gray-500 py-12 animate-pulse">Synchronisation des données du championnat...</div>;

  return (
    <div className="w-full max-w-6xl mx-auto mt-16 px-4">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* TABLEAU PILOTES */}
        <motion.div 
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="bg-gray-900/80 border border-white/10 rounded-2xl p-6 backdrop-blur-md"
        >
            <h3 className="text-2xl font-black italic uppercase text-white mb-6 border-l-4 border-f1-red pl-3">
                Top 10 <span className="text-f1-red">Pilotes</span>
            </h3>
            
            <div className="space-y-3">
                {drivers.map((d) => (
                    <div key={d.Driver.driverId} className="flex items-center justify-between bg-white/5 p-3 rounded-lg border border-white/5 hover:border-f1-red/50 transition-colors group">
                        <div className="flex items-center gap-4">
                            <span className="text-xl font-black text-gray-600 w-6 text-center group-hover:text-white transition-colors">{d.position}</span>
                            <div>
                                <p className="font-bold text-white text-sm leading-none">{d.Driver.givenName} <span className="uppercase">{d.Driver.familyName}</span></p>
                                <p className="text-[10px] text-gray-400 uppercase mt-1">{d.Constructors[0].name}</p>
                            </div>
                        </div>
                        <div className="text-f1-red font-black text-lg">{d.points} <span className="text-[10px] text-gray-500 font-medium">PTS</span></div>
                    </div>
                ))}
            </div>
        </motion.div>

        {/* TABLEAU CONSTRUCTEURS */}
        <motion.div 
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="bg-gray-900/80 border border-white/10 rounded-2xl p-6 backdrop-blur-md h-fit"
        >
            <h3 className="text-2xl font-black italic uppercase text-white mb-6 border-l-4 border-blue-500 pl-3">
                Top 5 <span className="text-blue-500">Constructeurs</span>
            </h3>
            
            <div className="space-y-4">
                {constructors.map((c) => (
                    <div key={c.Constructor.constructorId} className="flex items-center justify-between bg-white/5 p-4 rounded-lg border border-white/5 hover:border-blue-500/50 transition-colors">
                        <div className="flex items-center gap-4">
                            <span className="text-xl font-black text-gray-600 w-6 text-center">{c.position}</span>
                            <span className="font-bold text-white uppercase tracking-wider">{c.Constructor.name}</span>
                        </div>
                        <div className="text-blue-400 font-black text-xl">{c.points} <span className="text-[10px] text-gray-500 font-medium">PTS</span></div>
                    </div>
                ))}
            </div>

            {/* PETITE PUB POUR LES CIRCUITS */}
            <div className="mt-8 p-4 bg-gradient-to-r from-f1-red to-red-900 rounded-xl text-center">
                <p className="text-white font-bold text-sm mb-2 uppercase">La saison continue</p>
                <p className="text-xs text-white/80 mb-4">Ne ratez aucune course du calendrier.</p>
                <a href="/circuits" className="inline-block bg-white text-f1-red text-xs font-black px-4 py-2 rounded uppercase hover:bg-gray-200 transition">
                    Voir le Calendrier
                </a>
            </div>
        </motion.div>

      </div>
    </div>
  );
};

export default LiveStandings;