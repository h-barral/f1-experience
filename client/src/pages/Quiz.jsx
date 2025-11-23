import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);

  // Chargement des questions depuis l'API
  useEffect(() => {
    fetch('http://localhost:3001/api/quiz')
      .then(res => res.json())
      .then(data => {
        setQuestions(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  // Fonction quand on clique sur une réponse
  // N'oublie pas de récupérer l'user au début du composant !
  // Ajoute ça juste après les autres useState :
  const user = JSON.parse(localStorage.getItem('user'));

  const handleAnswer = (choixIndex) => {
    const currentQuestion = questions[currentIndex];
    
    let newScore = score;
    if (choixIndex === currentQuestion.bonne_reponse) {
      newScore = score + 1;
      setScore(newScore);
    }

    // Passage à la suite ou fin
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResult(true);
      // SAUVEGARDE DU SCORE SI CONNECTÉ
      if (user && newScore > 0) {
        fetch('http://localhost:3001/api/user/score', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: user.id, points: newScore })
        }).catch(err => console.error("Erreur sauvegarde score", err));
      }
    }
  };

  // Fonction pour recommencer
  const restartQuiz = () => {
    setScore(0);
    setCurrentIndex(0);
    setShowResult(false);
    setLoading(true);
    // On recharge de nouvelles questions
    fetch('http://localhost:3001/api/quiz')
      .then(res => res.json())
      .then(data => {
        setQuestions(data);
        setLoading(false);
      });
  };

  if (loading) return <div className="min-h-screen bg-f1-dark flex items-center justify-center text-white animate-pulse">Préparation de la grille de départ...</div>;

  return (
    <div className="min-h-screen pt-20 px-4 bg-f1-dark text-white flex items-center justify-center overflow-hidden">
      
      {/* Décoration Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-f1-red/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="w-full max-w-2xl z-10">
        
        {showResult ? (
          // ==================== ÉCRAN DE RÉSULTAT ====================
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-900/80 p-8 rounded-2xl border border-white/10 text-center backdrop-blur-md"
          >
            <h2 className="text-4xl font-black uppercase italic mb-4">Drapeau à Damier !</h2>
            <p className="text-gray-400 mb-6">Votre performance sur ce Grand Prix :</p>
            
            <div className="text-8xl font-bold text-f1-red mb-6 drop-shadow-[0_0_15px_rgba(225,6,0,0.5)]">
              {score} / {questions.length}
            </div>

            <p className="text-xl mb-8">
              {score === 5 ? "🏆 POLE POSITION ! Tu es un expert." : 
               score >= 3 ? "🥈 Podium ! Belle course." : 
               "🔧 Retourne au stand pour t'entraîner."}
            </p>

            <button onClick={restartQuiz} className="bg-white text-f1-dark font-bold py-3 px-8 rounded uppercase hover:bg-gray-200 transition mr-4">
              Rejouer
            </button>
            <Link to="/" className="text-gray-400 hover:text-white underline">Quitter</Link>
          </motion.div>

        ) : (
          // ==================== ÉCRAN DE JEU ====================
          <div className="relative">
            {/* Barre de progression */}
            <div className="mb-8 flex items-center gap-4">
                <div className="text-f1-red font-bold text-xl">Q{currentIndex + 1}</div>
                <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                    <motion.div 
                        className="h-full bg-f1-red"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                    />
                </div>
                <div className="text-gray-500 font-mono">/ {questions.length}</div>
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
                <h2 className="text-2xl md:text-3xl font-bold mb-8 leading-tight">
                  {questions[currentIndex].question}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleAnswer(num)}
                      className="p-4 text-left bg-white/5 border border-white/10 rounded-xl hover:bg-f1-red hover:border-f1-red transition-all duration-200 group"
                    >
                      <span className="text-gray-500 group-hover:text-white mr-2 font-mono">0{num}.</span>
                      <span className="font-medium text-lg">
                        {/* On récupère dynamiquement choix_1, choix_2, etc. */}
                        {questions[currentIndex][`choix_${num}`]}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;