import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-f1-dark flex flex-col items-center justify-center text-center px-4">
      
      <h1 className="text-9xl font-black text-f1-red mb-4 drop-shadow-[0_0_20px_rgba(225,6,0,0.5)]">
        404
      </h1>
      
      <h2 className="text-4xl font-bold text-white uppercase italic mb-6">
        Drapeau Rouge !
      </h2>
      
      <p className="text-gray-400 text-xl max-w-lg mb-10">
        On dirait que vous avez fait une sortie de piste. Cette page n'existe pas ou a été déplacée.
      </p>

      <Link to="/" className="px-8 py-4 bg-white text-f1-dark font-black text-lg uppercase rounded hover:bg-gray-200 transition">
        Retour au Stand
      </Link>

    </div>
  );
};

export default NotFound;