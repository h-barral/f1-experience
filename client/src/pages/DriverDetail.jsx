import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const DriverDetail = () => {
  const { id } = useParams();
  const [driver, setDriver] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/pilotes/${id}`)
      .then(res => res.json())
      .then(data => setDriver(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!driver) return <div className="min-h-screen bg-f1-dark flex items-center justify-center text-white animate-pulse">Analyse des données biométriques...</div>;

  return (
    <div className="min-h-screen bg-f1-dark text-white">
      
      {/* HEADER AVEC PHOTO EN FOND FLOU */}
      <div className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-f1-red/20 z-0"></div>
        <img 
            src={`/images/${driver.photo_url}`} 
            alt={driver.nom} 
            className="absolute top-0 w-full h-full object-cover opacity-30 blur-sm scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-f1-dark via-f1-dark/80 to-transparent z-10"></div>

        {/* CONTENU DU HEADER */}
        <div className="absolute bottom-0 left-0 w-full p-8 z-20 max-w-7xl mx-auto flex flex-col md:flex-row items-end gap-8">
            {/* Photo Nette */}
            <motion.img 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                src={`/images/${driver.photo_url}`} 
                className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full border-4 border-f1-red shadow-2xl bg-gray-800"
            />
            
            <div className="mb-4">
                <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-4 mb-2"
                >
                    <span className="text-6xl font-black italic text-white drop-shadow-lg">{driver.numero}</span>
                    <span className="bg-white/10 px-3 py-1 rounded text-sm uppercase tracking-widest border border-white/20">
                        {driver.ecurie}
                    </span>
                </motion.div>
                
                <motion.h1 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none"
                >
                    {driver.prenom} <br/>
                    <span className="text-f1-red">{driver.nom}</span>
                </motion.h1>
            </div>
        </div>
      </div>

      {/* CORPS DE LA PAGE */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* COLONNE GAUCHE : STATS */}
        <div className="space-y-6">
            <Link to="/drivers" className="inline-block text-gray-400 hover:text-white mb-4">← Retour à la grille</Link>
            
            <div className="bg-gray-900/50 p-6 rounded-xl border border-white/10">
                <h3 className="text-gray-500 uppercase text-xs font-bold mb-4 tracking-widest">Statistiques</h3>
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-black/40 rounded border border-white/5">
                        <div className="text-3xl font-bold text-white">{driver.titres_mondiaux || 0}</div>
                        <div className="text-xs text-gray-400 uppercase">Titres Mondiaux</div>
                    </div>
                    <div className="p-4 bg-black/40 rounded border border-white/5">
                        <div className="text-3xl font-bold text-white">{driver.podiums || 0}</div>
                        <div className="text-xs text-gray-400 uppercase">Podiums</div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-xl border border-white/10">
                <h3 className="text-gray-500 uppercase text-xs font-bold mb-4 tracking-widest">Infos Clés</h3>
                <ul className="space-y-4">
                    <li className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-gray-400">Pays</span>
                        <span className="font-bold">{driver.pays}</span>
                    </li>
                    <li className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-gray-400">Catégorie</span>
                        <span className="font-bold text-f1-red">Formula 1</span>
                    </li>
                    <li className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-gray-400">Activité</span>
                        <span className="font-bold">{driver.saisons || "2024"}</span>
                    </li>
                </ul>
            </div>
        </div>

        {/* COLONNE DROITE : BIO & CARRIÈRE */}
        <div className="md:col-span-2 space-y-8">
            
            {/* BIOGRAPHIE */}
            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                <h2 className="text-2xl font-bold uppercase mb-4 flex items-center gap-2">
                    <span className="w-2 h-8 bg-f1-red"></span>
                    Biographie
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed text-justify">
                    {driver.bio || "Biographie en cours de rédaction par nos experts F1..."}
                </p>
            </motion.div>

            {/* HISTORIQUE DES ÉCURIES */}
            {/* HISTORIQUE DES ÉCURIES */}
            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <h2 className="text-2xl font-bold uppercase mb-6 flex items-center gap-2">
                    <span className="w-2 h-8 bg-white"></span>
                    Parcours
                </h2>
                
                {/* Timeline des équipes */}
                <div className="flex flex-wrap gap-4 items-start">
                    {driver.historique_ecuries ? (
                        driver.historique_ecuries.split(',').map((entry, index) => {
                            // C'est ici l'astuce : on sépare le Nom et l'Année grâce au "|"
                            const parts = entry.split('|');
                            const teamName = parts[0].trim();
                            const teamYears = parts[1] ? parts[1].trim() : ""; // Sécurité si pas d'année

                            return (
                                <div key={index} className="flex items-center gap-2">
                                    <div className="flex flex-col items-center">
                                        {/* Le Badge de l'équipe */}
                                        <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-full font-bold uppercase hover:bg-white/10 hover:border-f1-red transition-all cursor-default text-center min-w-[140px]">
                                            {teamName}
                                        </div>
                                        
                                        {/* L'Année juste en dessous */}
                                        {teamYears && (
                                            <div className="mt-2 text-xs font-mono text-f1-red bg-f1-red/10 px-2 py-0.5 rounded border border-f1-red/20">
                                                {teamYears}
                                            </div>
                                        )}
                                    </div>

                                    {/* Petite flèche entre les équipes sauf la dernière */}
                                    {index < driver.historique_ecuries.split(',').length - 1 && (
                                        <span className="text-gray-600 mb-6">➔</span>
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <span className="text-gray-500 italic">Historique non disponible</span>
                    )}
                </div>
            </motion.div>

        </div>

      </div>
    </div>
  );
};

export default DriverDetail;