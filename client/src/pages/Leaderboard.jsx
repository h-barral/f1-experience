import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/leaderboard')
      .then(res => res.json())
      .then(data => setLeaders(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen pt-24 px-4 bg-f1-dark text-white flex justify-center">
      <div className="w-full max-w-4xl">
        
        <div className="text-center mb-12">
            <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-2">
                Championnat <span className="text-f1-red">Pilotes</span>
            </h2>
            <p className="text-gray-400">Le classement officiel de la communauté F1.EXP</p>
        </div>

        <div className="bg-gray-900/80 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
            {/* EN-TÊTE DU TABLEAU */}
            <div className="grid grid-cols-12 gap-4 p-4 bg-white/5 border-b border-white/10 text-xs font-bold uppercase text-gray-400 tracking-wider">
                <div className="col-span-1 text-center">Pos</div>
                <div className="col-span-5 md:col-span-4">Pilote</div>
                <div className="col-span-3 text-center hidden md:block">Écurie</div>
                <div className="col-span-3 text-center hidden md:block">Favori</div>
                <div className="col-span-6 md:col-span-1 text-right">PTS</div>
            </div>

            {/* LISTE DES JOUEURS */}
            <div className="divide-y divide-white/5">
                {leaders.map((player, index) => (
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        key={index} 
                        className={`grid grid-cols-12 gap-4 p-4 items-center hover:bg-white/5 transition-colors ${
                            index === 0 ? 'bg-yellow-500/10' : 
                            index === 1 ? 'bg-gray-400/10' : 
                            index === 2 ? 'bg-orange-700/10' : ''
                        }`}
                    >
                        {/* POSITION */}
                        <div className="col-span-1 flex justify-center">
                            {index === 0 ? <span className="text-2xl">🥇</span> :
                             index === 1 ? <span className="text-2xl">🥈</span> :
                             index === 2 ? <span className="text-2xl">🥉</span> :
                             <span className="font-mono text-gray-500 font-bold">P{index + 1}</span>
                            }
                        </div>

                        {/* PSEUDO */}
                        <div className="col-span-5 md:col-span-4 font-bold text-lg flex items-center gap-2">
                            {player.pseudo}
                            {index === 0 && <span className="text-xs bg-f1-red px-2 py-0.5 rounded text-white hidden md:inline-block">CHAMPION</span>}
                        </div>

                        {/* ÉCURIE */}
                        <div className="col-span-3 text-center hidden md:block text-gray-400 text-sm">
                            {player.ecurie_favorite || "-"}
                        </div>

                        {/* FAVORI */}
                        <div className="col-span-3 text-center hidden md:block text-gray-400 text-sm">
                            {player.pilote_favori || "-"}
                        </div>

                        {/* POINTS */}
                        <div className="col-span-6 md:col-span-1 text-right font-black text-xl text-f1-red">
                            {player.points}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};

export default Leaderboard;