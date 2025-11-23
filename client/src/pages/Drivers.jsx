import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // <--- Ajoute ça

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  // C'est ici que la magie opère : on appelle ton backend
  useEffect(() => {
    fetch("http://localhost:3001/api/pilotes")
      .then((response) => response.json())
      .then((data) => {
        setDrivers(data);
        setLoading(false);
      })
      .catch((error) => console.error("Erreur chargement pilotes:", error));
  }, []);

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
      {/* Titre de la section */}
      <div className="mb-12 border-l-4 border-f1-red pl-6">
        <h2 className="text-4xl font-bold text-white uppercase tracking-tighter">
          Grille <span className="text-f1-red">2024</span>
        </h2>
        <p className="text-gray-400 mt-2">Les héros du championnat.</p>
      </div>

      {/* État de chargement */}
      {loading ? (
        <div className="text-white text-center text-xl animate-pulse">
          Chargement des données télémétriques...
        </div>
      ) : (
        /* La Grille des Cartes */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {drivers.map((driver) => (
            <div
              key={driver.id}
              className="group relative bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-f1-red transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(225,6,0,0.3)]"
            >
              {/* IMAGE DU PILOTE (Nouveau !) */}
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
                {/* On pointe vers le dossier /images/ du dossier public */}
                <img
                  src={`/images/${driver.photo_url}`}
                  alt={driver.nom}
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="p-6 relative z-10 -mt-12">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-5xl font-bold text-white italic drop-shadow-lg">
                    {driver.numero}
                  </span>
                  <span className="bg-white/10 px-3 py-1 rounded text-xs text-white font-mono uppercase border border-white/20 backdrop-blur-sm">
                    {driver.pays}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-1">
                  {driver.prenom}{" "}
                  <span className="text-f1-red uppercase">{driver.nom}</span>
                </h3>
                <p className="text-gray-400 font-medium mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-f1-red"></span>
                  {driver.ecurie}
                </p>

                <Link
                  to={`/drivers/${driver.id}`}
                  className="block w-full text-center py-3 bg-white/5 hover:bg-f1-red text-white text-sm font-bold uppercase tracking-wider rounded transition-colors border border-white/10 hover:border-f1-red"
                >
                  Voir Profil
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Drivers;
