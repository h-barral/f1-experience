import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const DriverDetail = () => {
  const { id } = useParams(); // On récupère l'ID dans l'URL (ex: 1)
  const [driver, setDriver] = useState(null);

  useEffect(() => {
    // On appelle notre route API spéciale "Un seul pilote"
    fetch(`http://localhost:3001/api/pilotes/${id}`)
      .then(res => res.json())
      .then(data => setDriver(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!driver) return <div className="text-white text-center pt-32">Chargement du profil...</div>;

  return (
    <div className="min-h-screen pt-24 px-4 bg-f1-dark text-white">
      <div className="max-w-6xl mx-auto">
        
        {/* BOUTON RETOUR */}
        <Link to="/drivers" className="text-gray-400 hover:text-white mb-8 inline-block">
          ← Retour à la grille
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* COLONNE GAUCHE : PHOTO */}
          <div className="relative">
            <div className="absolute inset-0 bg-f1-red blur-[100px] opacity-20 rounded-full"></div>
            <img 
              src={`/images/${driver.photo_url}`} 
              alt={driver.nom} 
              className="relative z-10 w-full drop-shadow-2xl hover:scale-105 transition duration-500"
            />
          </div>

          {/* COLONNE DROITE : INFOS */}
          <div>
            <div className="flex items-end gap-4 mb-2">
              <span className="text-6xl font-black italic text-f1-red">{driver.numero}</span>
              <span className="text-2xl font-bold mb-2">{driver.ecurie}</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter leading-none mb-6">
              {driver.prenom} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                {driver.nom}
              </span>
            </h1>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-white/5 p-6 rounded border border-white/10">
                <p className="text-gray-400 text-sm uppercase">Pays</p>
                <p className="text-2xl font-bold">{driver.pays}</p>
              </div>
              <div className="bg-white/5 p-6 rounded border border-white/10">
                <p className="text-gray-400 text-sm uppercase">Catégorie</p>
                <p className="text-2xl font-bold">Formula 1</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDetail;