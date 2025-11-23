import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
// On va importer le composant Leaderboard pour l'afficher ici
import Leaderboard from './Leaderboard';

const Quiz = () => {
  const [activeTab, setActiveTab] = useState('game'); // 'game' ou 'leaderboard'
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetch('http://localhost:3001/api/quiz')
      .then(res => res.json())
      .then(data => {
        setQuestions(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  const handleAnswer = (choixIndex) => {
    const currentQuestion = questions[currentIndex];
    let newScore = score;
    if (choixIndex === currentQuestion.bonne_reponse) newScore = score + 1;
    setScore(newScore);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResult(true);
      if (user && newScore > 0) {
        fetch('http://localhost:3001/api/user/score', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: user.id, points: newScore })
        }).catch(err => console.error(err));
      }
    }
  };

  const restartQuiz = () => {
    setScore(0);
    setCurrentIndex(0);
    setShowResult(false);
    setLoading(true);
    fetch('http://localhost:3001/api/quiz')
      .then(res => res.json())
      .then(data => { setQuestions(data); setLoading(false); });
  };

  return (
    <div className="min-h-screen pt-24 px-4 bg-f1-dark text-white flex flex-col items-center">
      
      {/* HEADER DE LA PAGE (Onglets) */}
      <div className="mb-8 flex gap-4 p-1 bg-white/5 rounded-full border border-white/10">
        <button 
            onClick={() => setActiveTab('game')}
            className={`px-6 py-2 rounded-full text-sm font-bold uppercase transition-all ${activeTab === 'game' ? 'bg-f1-red text-white' : 'text-gray-400 hover:text-white'}`}
        >
            Le Quiz
        </button>
        <button 
            onClick={() => setActiveTab('leaderboard')}
            className={`px-6 py-2 rounded-full text-sm font-bold uppercase transition-all ${activeTab === 'leaderboard' ? 'bg-f1-red text-white' : 'text-gray-400 hover:text-white'}`}
        >
            Classement
        </button>
      </div>

      <div className="w-full max-w-3xl relative">
        
        {/* MODE CLASSEMENT */}
        {activeTab === 'leaderboard' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Leaderboard /> 
                {/* Note: Leaderboard est maintenant affiché comme un composant interne */}
            </motion.div>
        )}

        {/* MODE JEU */}
        {activeTab === 'game' && (
            <>
                {loading ? (
                    <div className="text-center animate-pulse mt-20">Chargement de la grille...</div>
                ) : showResult ? (
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-gray-900/80 p-8 rounded-2xl border border-white/10 text-center backdrop-blur-md mt-10"
                    >
                        <h2 className="text-4xl font-black uppercase italic mb-4">Drapeau à Damier !</h2>
                        <div className="text-8xl font-bold text-f1-red mb-6 drop-shadow-[0_0_15px_rgba(225,6,0,0.5)]">{score} / {questions.length}</div>
                        <button onClick={restartQuiz} className="bg-white text-f1-dark font-bold py-3 px-8 rounded uppercase hover:bg-gray-200 transition">Rejouer</button>
                    </motion.div>
                ) : (
                    <div className="relative mt-4">
                        <div className="mb-8 flex items-center gap-4">
                            <div className="text-f1-red font-bold text-xl">Q{currentIndex + 1}</div>
                            <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                                <motion.div className="h-full bg-f1-red" initial={{ width: 0 }} animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
                            </div>
                        </div>

                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={currentIndex}
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -50, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="bg-gray-900/60 border border-white/10 p-8 rounded-2xl backdrop-blur-sm"
                            >
                                <h2 className="text-2xl font-bold mb-8 leading-tight">{questions[currentIndex].question}</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[1, 2, 3, 4].map((num) => (
                                        <button
                                            key={num}
                                            onClick={() => handleAnswer(num)}
                                            className="p-4 text-left bg-white/5 border border-white/10 rounded-xl hover:bg-f1-red hover:border-f1-red transition-all duration-200"
                                        >
                                            <span className="text-gray-500 mr-2 font-mono">0{num}.</span>
                                            <span className="font-medium text-lg">{questions[currentIndex][`choix_${num}`]}</span>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                )}
            </>
        )}
      </div>
    </div>
  );
};

export default Quiz;