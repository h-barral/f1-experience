import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [expandedTeamId, setExpandedTeamId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/teams')
      .then(res => res.json())
      .then(data => setTeams(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-f1-dark text-white">
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-4">
          Constructeurs <span className="text-f1-red">Légendaires</span>
        </h2>
        <p className="text-gray-400">Les ingénieurs derrière la vitesse.</p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teams.map((team) => (
            <motion.div 
                layout
                key={team.id}
                onClick={() => setExpandedTeamId(expandedTeamId === team.id ? null : team.id)}
                className={`bg-gray-900 border border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:border-f1-red ${expandedTeamId === team.id ? 'col-span-1 md:col-span-2 lg:col-span-3 bg-gray-800' : ''}`}
            >
                <div className="flex flex-col md:flex-row">
                    {/* Header Carte */}
                    <div className="p-8 flex-1">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-3xl font-black uppercase italic text-white">{team.nom}</h3>
                            <img src={`https://flagcdn.com/w40/${team.pays === 'Royaume-Uni' ? 'gb' : team.pays === 'Italie' ? 'it' : team.pays === 'Allemagne' ? 'de' : team.pays === 'Autriche' ? 'at' : 'fr'}.png`} alt={team.pays} className="w-8 rounded" />
                        </div>
                        
                        <div className="flex gap-4 text-sm text-gray-400 mb-6 font-mono">
                            <span>Base: {team.base}</span>
                            <span>Début: {team.annee_debut}</span>
                        </div>

                        {/* STATS RAPIDES */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-black/30 p-3 rounded border border-white/5">
                                <div className="text-2xl font-bold text-f1-red">{team.championnats_gagnes}</div>
                                <div className="text-[10px] uppercase text-gray-500">Titres</div>
                            </div>
                            <div className="bg-black/30 p-3 rounded border border-white/5">
                                <div className="text-lg font-bold text-white">{team.directeur}</div>
                                <div className="text-[10px] uppercase text-gray-500">Team Principal</div>
                            </div>
                        </div>
                    </div>

                    {/* DÉTAILS EXPANDED (Visible seulement au clic) */}
                    {expandedTeamId === team.id && (
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            className="p-8 bg-black/20 md:w-1/2 border-l border-white/5 flex flex-col justify-center"
                        >
                            <h4 className="text-f1-red font-bold uppercase mb-2">Histoire & Palmarès</h4>
                            <p className="text-gray-300 text-sm leading-relaxed mb-6">{team.bio}</p>
                            
                            <h4 className="text-white font-bold uppercase mb-2 text-xs tracking-widest">Légendes de l'écurie</h4>
                            <div className="flex flex-wrap gap-2">
                                {team.top_pilotes.split(',').map((p, i) => (
                                    <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-xs border border-white/10">{p.trim()}</span>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Teams;