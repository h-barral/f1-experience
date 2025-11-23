import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // ÉTATS POUR LES FILTRES
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("Toutes");
  const [showChampionsOnly, setShowChampionsOnly] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/api/pilotes')
      .then(response => response.json())
      .then(data => {
        setDrivers(data);
        setLoading(false);
      })
      .catch(error => console.error("Erreur chargement pilotes:", error));
  }, []);

  // LOGIQUE DE FILTRAGE
  const filteredDrivers = drivers.filter(driver => {
    const matchName = (driver.nom + " " + driver.prenom).toLowerCase().includes(searchTerm.toLowerCase());
    const matchTeam = selectedTeam === "Toutes" || driver.ecurie === selectedTeam;
    const matchChampion = showChampionsOnly ? driver.titres_mondiaux > 0 : true;
    
    return matchName && matchTeam && matchChampion;
  });

  // Récupération unique des écuries pour le menu déroulant
  const ecuries = ["Toutes", ...new Set(drivers.map(d => d.ecurie))];

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto min-h-screen">
      
      <div className="mb-12 border-l-4 border-f1-red pl-6">
        <h2 className="text-4xl font-bold text-white uppercase tracking-tighter">
          Grille <span className="text-f1-red">2024</span>
        </h2>
        <p className="text-gray-400 mt-2">Trouvez votre pilote favori.</p>
      </div>

      {/* BARRE DE RECHERCHE ET FILTRES */}
      <div className="bg-gray-900/80 p-6 rounded-xl border border-white/10 mb-12 flex flex-col md:flex-row gap-4 items-center backdrop-blur-sm">
        
        {/* Recherche Nom */}
        <div className="flex-1 w-full">
            <input 
                type="text" 
                placeholder="Rechercher un pilote..." 
                className="w-full bg-black/40 border border-white/20 rounded p-3 text-white focus:border-f1-red outline-none"
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>

        {/* Filtre Écurie */}
        <select 
            className="bg-black/40 border border-white/20 rounded p-3 text-white focus:border-f1-red outline-none"
            onChange={(e) => setSelectedTeam(e.target.value)}
        >
            {ecuries.map(e => <option key={e} value={e}>{e}</option>)}
        </select>

        {/* Toggle Champions */}
        <button 
            onClick={() => setShowChampionsOnly(!showChampionsOnly)}
            className={`px-6 py-3 rounded font-bold uppercase text-sm border transition-all ${showChampionsOnly ? 'bg-f1-red border-f1-red text-white' : 'bg-transparent border-white/20 text-gray-400 hover:border-white'}`}
        >
            {showChampionsOnly ? "Champions ★" : "Tous les pilotes"}
        </button>
      </div>

      {/* GRILLE DES RÉSULTATS */}
      {loading ? (
        <div className="text-white text-center animate-pulse">Chargement...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDrivers.map((driver) => (
            <Link to={`/drivers/${driver.id}`} key={driver.id} className="group block">
                <div className="relative bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-f1-red transition-all duration-300 hover:-translate-y-2">
                
                {/* IMAGE */}
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
                    <p className="text-gray-400 font-medium flex items-center gap-2">
                        {driver.ecurie}
                    </p>
                </div>
                </div>
            </Link>
          ))}
        </div>
      )}
      
      {filteredDrivers.length === 0 && !loading && (
        <div className="text-center text-gray-500 mt-8">Aucun pilote ne correspond à votre recherche.</div>
      )}

    </div>
  );
};

export default Drivers;