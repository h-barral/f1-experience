import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
// 1. Import du widget
import NextRace from '../components/NextRace';
import LiveStandings from '../components/LiveStandings';
import F1Showroom from '../components/F1Showroom';

const Home = () => {
  return (
    <div className="relative min-h-screen w-full bg-f1-dark overflow-hidden flex flex-col items-center justify-center pt-20">

      {/* BACKGROUND ANIMÉ (Inchangé) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-f1-red/20 rounded-full blur-[128px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 7, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[128px]"
        />
      </div>

      {/* CONTENU HERO */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto w-full">
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-f1-red font-bold tracking-[0.2em] uppercase mb-4 text-sm md:text-base"
        >
          Saison 2025 • Le Hub Officiel
        </motion.p>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter text-white mb-8"
        >
          Beyond <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">
            Speed.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-400 text-lg md:text-2xl max-w-2xl mx-auto mb-12 font-light"
        >
          Plongez dans l'univers de la Formule 1. 
          <span className="text-white font-medium"> Données télémétriques</span>, 
          archives historiques et profils détaillés.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16"
        >
          <Link to="/drivers" className="group relative px-8 py-4 bg-f1-red text-white font-bold uppercase tracking-wider overflow-hidden rounded">
            <span className="relative z-10 group-hover:tracking-widest transition-all duration-300">
              Voir les Pilotes
            </span>
            <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out mix-blend-overlay"></div>
          </Link>

          <Link to="/history" className="px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-wider hover:bg-white/10 transition rounded backdrop-blur-sm">
            L'Histoire
          </Link>
        </motion.div>

        {/* 2. LE WIDGET NEXT RACE */}
        <NextRace />

        <F1Showroom />
        
        {/* 3. LE CLASSEMENT LIVE (Nouveau !) */}
        <LiveStandings />

        {/* Espace pour respirer avant le footer */}
        <div className="pb-24"></div>

      </div>
    </div>
  );
};

export default Home;