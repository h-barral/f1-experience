import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const NextRace = () => {
  const [race, setRace] = useState(null);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [loading, setLoading] = useState(true);

  // 1. On récupère les infos du prochain GP via l'API Jolpica (Miroir Ergast)
  useEffect(() => {
    fetch('https://api.jolpi.ca/ergast/f1/current/next.json')
      .then(res => res.json())
      .then(data => {
        const nextRaceData = data.MRData.RaceTable.Races[0];
        setRace(nextRaceData);
        setLoading(false);
      })
      .catch(err => console.error("Erreur API F1:", err));
  }, []);

  // 2. Le moteur du compte à rebours
  useEffect(() => {
    if (!race) return;

    const interval = setInterval(() => {
      // On combine la date et l'heure (ex: "2024-03-02" + "T" + "15:00:00Z")
      const raceDate = new Date(`${race.date}T${race.time}`);
      const now = new Date();
      const difference = raceDate - now;

      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        // Si la course est commencée
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [race]);

  if (loading) return <div className="text-gray-500 text-sm animate-pulse">Recherche du prochain GP...</div>;
  if (!race) return null;

  return (
    <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-4xl mx-auto mt-12 bg-gray-900/80 border border-f1-red/30 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-[0_0_30px_rgba(225,6,0,0.15)]"
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* INFO DU GP */}
        <div className="text-center md:text-left">
            <p className="text-f1-red font-bold uppercase tracking-widest text-xs mb-2">Prochain Grand Prix</p>
            <h3 className="text-2xl md:text-4xl font-black italic uppercase text-white mb-1">
                {race.raceName.replace('Grand Prix', '')}
            </h3>
            <p className="text-gray-400 font-mono text-sm flex items-center justify-center md:justify-start gap-2">
                📍 {race.Circuit.Location.locality}, {race.Circuit.Location.country}
            </p>
        </div>

        {/* LE COMPTE À REBOURS */}
        <div className="flex gap-4 text-center">
            <TimeBox value={countdown.days} label="Jours" />
            <div className="text-2xl font-bold text-gray-600 mt-2">:</div>
            <TimeBox value={countdown.hours} label="Heures" />
            <div className="text-2xl font-bold text-gray-600 mt-2">:</div>
            <TimeBox value={countdown.minutes} label="Min" />
            <div className="text-2xl font-bold text-gray-600 mt-2 hidden sm:block">:</div>
            <TimeBox value={countdown.seconds} label="Sec" hiddenOnMobile />
        </div>

      </div>
    </motion.div>
  );
};

// Petit composant pour les cases de temps
const TimeBox = ({ value, label, hiddenOnMobile }) => (
    <div className={`flex flex-col ${hiddenOnMobile ? 'hidden sm:flex' : ''}`}>
        <div className="bg-black/40 border border-white/10 rounded-lg w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
            <span className="text-2xl md:text-3xl font-bold text-white font-mono">
                {String(value).padStart(2, '0')}
            </span>
        </div>
        <span className="text-[10px] uppercase text-gray-500 mt-2 font-bold tracking-wider">{label}</span>
    </div>
);

export default NextRace;