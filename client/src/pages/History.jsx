import { useEffect, useState, useRef } from "react";
import {
  motion,
  useTransform,
  useScroll,
  useSpring,
  AnimatePresence,
} from "framer-motion";

const History = () => {
  const [allEvents, setAllEvents] = useState([]); // Garde TOUS les événements en mémoire
  const [filteredEvents, setFilteredEvents] = useState([]); // Ceux qu'on affiche
  const [activeFilter, setActiveFilter] = useState("Tous"); // Filtre actif

  const targetRef = useRef(null);

  // Scroll Logic
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-90%"]);
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    fetch("http://localhost:3001/api/history")
      .then((res) => res.json())
      .then((data) => {
        setAllEvents(data);
        setFilteredEvents(data); // Au début, on affiche tout
      })
      .catch((err) => console.error(err));
  }, [])
  
  ;

  // Fonction de filtrage
  const filterBy = (categorie) => {
    setActiveFilter(categorie);
    if (categorie === "Tous") {
      setFilteredEvents(allEvents);
    } else {
      setFilteredEvents(allEvents.filter((e) => e.categorie === categorie));
    }
  };

  const filters = ["Tous", "Championnat", "Légende", "Course", "Tech"];

  return (
    <div ref={targetRef} className="relative h-[400vh] bg-f1-dark">
      {/* CADRE FIXE */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* FOND GRAPHIQUE */}
        <div
          className="absolute inset-0 z-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        ></div>

        {/* HEADER ET FILTRES FIXES */}
        <div className="absolute top-24 left-10 z-30">
          <div className="bg-f1-dark/90 backdrop-blur px-6 py-4 border-l-4 border-f1-red rounded-r-xl shadow-2xl mb-6">
            <h2 className="text-3xl font-black uppercase italic text-white tracking-tighter">
              Chronologie <span className="text-f1-red">F1</span>
            </h2>
            <p className="text-xs text-gray-400 font-mono mt-1 mb-4">
              DATA ARCHIVE • {filteredEvents.length} ÉVÉNEMENTS
            </p>

            {/* BOUTONS DE FILTRE */}
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => filterBy(filter)}
                  className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider transition-all border ${
                    activeFilter === filter
                      ? "bg-f1-red border-f1-red text-white shadow-[0_0_10px_rgba(225,6,0,0.5)]"
                      : "bg-transparent border-white/20 text-gray-400 hover:border-white hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* PROGRESSION */}
        {/* On descend la ligne grise à 55% de la hauteur */}
        <div className="absolute top-[55%] left-0 w-full h-[2px] bg-white/10 z-0"></div>
        {/* On descend la ligne rouge à 55% aussi */}
        <motion.div
          style={{ scaleX }}
          className="absolute top-[55%] left-0 w-full h-[4px] bg-f1-red origin-left z-10 shadow-[0_0_15px_rgba(225,6,0,0.8)]"
        />
        {/* RAIL DES CARTES */}
        {/* RAIL DES CARTES */}
        {/* Ajout de 'pt-32' pour pousser globalement tout le contenu vers le bas */}
        <motion.div style={{ x }} className="flex gap-12 pl-[30vw] items-center pt-32 relative z-20">
          
          <AnimatePresence mode='popLayout'>
            {filteredEvents.map((event, index) => (
                <motion.div 
                    key={event.id} 
                    /* ... (le reste des props animation ne change pas) ... */
                    layout
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="relative group min-w-[250px]"
                >
                    {/* POINT ET TIGE */}
                    {/* Note : On garde top-1/2 ici car c'est relatif à ce conteneur qui est déjà descendu */}
                    <div className="absolute top-1/2 left-1/2 -ml-3 -mt-3 w-6 h-6 bg-f1-dark border-2 border-white/50 rounded-full z-30 group-hover:border-f1-red group-hover:scale-125 transition-all duration-300">
                        <div className="w-2 h-2 bg-white rounded-full absolute top-1.5 left-1.5 group-hover:bg-f1-red"></div>
                    </div>
                    {/* TIGE : On garde la logique */}
                    <div className={`absolute left-1/2 w-[1px] h-16 bg-white/20 -ml-[0.5px] transition-all duration-500 group-hover:h-24 group-hover:bg-f1-red/50 ${index % 2 === 0 ? 'bottom-1/2 origin-bottom' : 'top-1/2 origin-top'}`}></div>

                    {/* CARTE : C'EST ICI LE GROS CHANGEMENT DE MARGE */}
                    <div className={`
                            w-64 p-4 rounded bg-gray-900/90 border border-white/10 backdrop-blur-md 
                            hover:border-f1-red transition-all duration-300 hover:bg-gray-800
                            flex flex-col gap-2 relative
                            ${index % 2 === 0 
                                ? '-mt-[280px]'  /* AVANT: -mt-[380px] -> ON A GAGNÉ 100px D'ESPACE EN HAUT */
                                : 'mt-[150px]'   /* AVANT: mt-[180px] -> ON RESSERRE UN PEU LE BAS AUSSI */
                            }
                        `}
                    >
                        <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-1">
                            <span className="text-3xl font-black text-f1-red italic">{event.annee}</span>
                            <span className="text-[9px] uppercase font-mono text-gray-500 border border-gray-700 px-1 rounded">
                                {event.categorie || 'General'}
                            </span>
                        </div>
                        <h3 className="text-sm font-bold text-white uppercase leading-tight min-h-[40px] flex items-center">{event.titre}</h3>
                        <p className="text-xs text-gray-400 leading-relaxed text-justify">{event.description}</p>
                    </div>
                </motion.div>
            ))}
          </AnimatePresence>

          <div className="w-[50vw]"></div>

        </motion.div>
      </div>
    </div>
  );
};

export default History;
