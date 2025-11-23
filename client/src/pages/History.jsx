import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const History = () => {
  const [events, setEvents] = useState([]);

  // Récupération des données
  useEffect(() => {
    fetch('http://localhost:3001/api/history')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error(err));
  }, []);

  // Hook pour la barre de progression verticale (La ligne rouge qui se remplit)
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-f1-dark text-white overflow-hidden">
      
      {/* HEADER AVEC APPARITION DOUCE */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="pt-32 pb-16 text-center relative z-10"
      >
        <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-4">
          L'Héritage <span className="text-transparent bg-clip-text bg-gradient-to-r from-f1-red to-orange-500">Immortel</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto px-4">
          Chaque virage a une histoire. Chaque époque a ses héros.
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto relative px-4 pb-32">
        
        {/* LA LIGNE VERTICALE (L'ARRIÈRE PLAN GRIS) */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-white/10 md:-ml-0.5 rounded-full"></div>

        {/* LA LIGNE ROUGE QUI DESCEND AVEC LE SCROLL (L'INDICATEUR) */}
        <motion.div 
            style={{ scaleY }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-f1-red via-red-500 to-f1-dark md:-ml-0.5 origin-top rounded-full z-0 shadow-[0_0_15px_rgba(225,6,0,0.8)]"
        />

        {/* LISTE DES ÉVÉNEMENTS */}
        {events.map((event, index) => (
          <EventCard key={event.id} event={event} index={index} />
        ))}

      </div>
    </div>
  );
};

// COMPOSANT CARTE (Pour alléger le code principal)
const EventCard = ({ event, index }) => {
    const isLeft = index % 2 === 0; // Une fois à gauche, une fois à droite (sur PC)

    return (
        <motion.div 
            // C'est ici que l'animation au scroll se joue (viewport)
            initial={{ opacity: 0, x: isLeft ? -100 : 100, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }} // L'anim se lance un peu avant que l'élément soit totalement visible
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`mb-24 flex flex-col md:flex-row items-center justify-between w-full relative z-10 ${isLeft ? 'md:flex-row-reverse' : ''}`}
        >
            
            {/* ESPACE VIDE */}
            <div className="hidden md:block w-5/12"></div>

            {/* LE POINT CENTRAL (Pulsation) */}
            <div className="absolute left-4 md:left-1/2 -ml-[5px] md:-ml-4 mt-1.5 md:mt-0">
                <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    className="w-3 h-3 md:w-8 md:h-8 bg-f1-dark border-2 md:border-4 border-f1-red rounded-full shadow-[0_0_20px_rgba(225,6,0,1)] relative z-20 flex items-center justify-center"
                >
                     <div className="w-1 h-1 md:w-2 md:h-2 bg-white rounded-full"></div>
                </motion.div>
            </div>

            {/* LA CARTE DE CONTENU */}
            <div className="w-full md:w-5/12 pl-12 md:pl-0">
                <div className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-f1-red/50 transition-colors backdrop-blur-md group hover:bg-white/10">
                    <span className="text-6xl font-black text-white/20 absolute -top-8 right-4 select-none z-0 group-hover:text-f1-red/20 transition-colors">
                        {event.annee}
                    </span>
                    <h3 className="text-2xl font-bold mb-3 text-white relative z-10">{event.titre}</h3>
                    <p className="text-gray-300 leading-relaxed relative z-10 font-light">
                        {event.description}
                    </p>
                </div>
            </div>

        </motion.div>
    );
}

export default History;