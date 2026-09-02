import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Timer, ArrowRight, GraduationCap, RotateCcw, CheckCircle2, XCircle, Trophy, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Question {
  id: number;
  text: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: string;
  topic: string;
}

const questions: Question[] = [
  {
    id: 1,
    text: 'What happens to equilibrium price when demand increases and supply remains constant?',
    options: ['Price decreases', 'Price increases', 'Price stays the same', 'Quantity decreases'],
    correct: 1,
    explanation: 'When demand increases (shifts right) with constant supply, the new equilibrium occurs at a higher price and higher quantity.',
    difficulty: 'basic',
    topic: 'Demand & Supply',
  },
  {
    id: 2,
    text: 'If the price elasticity of demand for a good is 0.5, what does this indicate?',
    options: ['Demand is elastic', 'Demand is unit elastic', 'Demand is inelastic', 'Supply is elastic'],
    correct: 2,
    explanation: 'PED < 1 indicates inelastic demand. A 10% price change leads to only a 5% quantity change.',
    difficulty: 'basic',
    topic: 'Elasticity',
  },
  {
    id: 3,
    text: 'A $5 per-unit tax is imposed on sellers. If supply is perfectly elastic and demand is downward sloping, who bears the burden of the tax?',
    options: ['Sellers bear all of it', 'Buyers bear all of it', 'It is split equally', 'Neither bears it'],
    correct: 1,
    explanation: 'With perfectly elastic supply, sellers cannot absorb any tax. The entire tax is passed to buyers through higher prices.',
    difficulty: 'application',
    topic: 'Tax Incidence',
  },
  {
    id: 4,
    text: 'In a monopoly, why is marginal revenue less than price?',
    options: ['Because costs are higher', 'Because the monopolist must lower price on all units to sell more', 'Because demand is perfectly elastic', 'Because of government regulation'],
    correct: 1,
    explanation: 'Unlike perfect competition, a monopolist faces the market demand curve. To sell an additional unit, they must lower the price for ALL units, making MR < P.',
    difficulty: 'difficult',
    topic: 'Market Structures',
  },
  {
    id: 5,
    text: 'A negative externality in production leads to what market outcome?',
    options: ['Overproduction relative to the social optimum', 'Underproduction relative to the social optimum', 'Perfect efficiency', 'No change in quantity'],
    correct: 0,
    explanation: 'Negative externalities mean social cost > private cost. The market produces more than the socially optimal quantity because producers do not bear the full cost.',
    difficulty: 'application',
    topic: 'Externalities',
  },
];

const difficultyColors: Record<string, string> = {
  basic: 'badge-success',
  application: 'badge-warning',
  difficult: 'badge-danger',
};

export default function Quiz() {
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState<{ question: number; correct: boolean; topic: string }[]>([]);

  const handleAnswer = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    const q = questions[currentQ];
    const correct = idx === q.correct;
    if (correct) setScore(s => s + 1);
    setResults(prev => [...prev, { question: q.id, correct, topic: q.topic }]);
  };

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(q => q + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const q = questions[currentQ];
  const isCorrect = selected === q.correct;
  const progress = ((currentQ + (answered ? 1 : 0)) / questions.length) * 100;
  const isFinished = answered && currentQ === questions.length - 1;

  const topicStats: Record<string, { total: number; correct: number }> = {};
  results.forEach(r => {
    if (!topicStats[r.topic]) topicStats[r.topic] = { total: 0, correct: 0 };
    topicStats[r.topic].total++;
    if (r.correct) topicStats[r.topic].correct++;
  });

  const percentage = Math.round((score / questions.length) * 100);

  return (
    <div className="min-h-screen bg-[#06060a]">
      {/* Header */}
      <nav className="nav-glass sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center hover:rotate-12 transition-transform">
              <GraduationCap className="h-4 w-4 text-white" />
            </Link>
            <div>
              <div className="font-semibold text-white">Diagnostic Quiz</div>
              <div className="text-xs text-white/30">ECC1000 · Microeconomics</div>
            </div>
          </div>
          {started && !isFinished && (
            <div className="flex items-center gap-2 text-sm text-white/40">
              <Timer className="h-4 w-4" /> Question {currentQ + 1} of {questions.length}
            </div>
          )}
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {!started ? (
            /* Start Screen */
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass rounded-2xl text-center py-16 px-8"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-8">
                <Brain className="h-10 w-10 text-indigo-400" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-3">Check My Level</h1>
              <p className="text-white/40 mb-2 max-w-md mx-auto">Adaptive diagnostic test that establishes your current mastery across all microeconomics topics.</p>
              <div className="text-sm text-white/30 mb-10">{questions.length} questions · ~5 minutes</div>
              <div className="flex gap-2 justify-center mb-10">
                <span className="badge-glow">MCQ</span>
                <span className="badge-glow">Application</span>
                <span className="badge-glow">Graphs</span>
              </div>
              <button onClick={() => setStarted(true)} className="btn-primary">
                Start Diagnostic <ArrowRight className="h-4 w-4 inline ml-2" />
              </button>
            </motion.div>
          ) : isFinished ? (
            /* Results Screen */
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="glass rounded-2xl mb-6 text-center p-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center mx-auto mb-6">
                  <Trophy className="h-8 w-8 text-amber-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Diagnostic Results</h2>
                <div className="text-6xl font-bold gradient-text mb-2">{percentage}%</div>
                <div className="text-white/40 mb-8">{score} of {questions.length} correct</div>
                <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                  <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                    <div className="text-3xl font-bold text-green-400">{results.filter(r => r.correct).length}</div>
                    <div className="text-sm text-green-300/60">Correct</div>
                  </div>
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                    <div className="text-3xl font-bold text-red-400">{results.filter(r => !r.correct).length}</div>
                    <div className="text-sm text-red-300/60">Incorrect</div>
                  </div>
                </div>
              </div>

              {/* Topic Breakdown */}
              <div className="glass rounded-2xl p-8 mb-6">
                <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-indigo-400" /> Topic Breakdown
                </h2>
                <div className="space-y-5">
                  {Object.entries(topicStats).map(([topic, stats]) => {
                    const pct = Math.round((stats.correct / stats.total) * 100);
                    return (
                      <div key={topic}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-white/60">{topic}</span>
                          <span className="text-sm font-bold text-white">{stats.correct}/{stats.total} ({pct}%)</span>
                        </div>
                        <div className="progress-bar h-2">
                          <div className="progress-fill" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recommendations */}
              <div className="glass rounded-2xl p-8 mb-6">
                <h2 className="text-lg font-bold text-white mb-4">Recommendations</h2>
                <div className="space-y-3">
                  {Object.entries(topicStats)
                    .sort((a, b) => a[1].correct / a[1].total - b[1].correct / b[1].total)
                    .slice(0, 2)
                    .map(([topic, stats]) => (
                      <div key={topic} className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                        <div className="font-medium text-amber-300">Focus: {topic}</div>
                        <div className="text-sm text-white/50">Your accuracy is {Math.round((stats.correct / stats.total) * 100)}%. Review deep notes and practice more questions on this topic.</div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <button onClick={() => window.location.reload()} className="btn-secondary flex items-center gap-2">
                  <RotateCcw className="h-4 w-4" /> Retake
                </button>
                <Link to="/dashboard" className="btn-primary">Back to Dashboard</Link>
              </div>
            </motion.div>
          ) : (
            /* Question */
            <motion.div
              key={`q-${currentQ}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="glass rounded-2xl p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <span className="badge-glow">{q.topic}</span>
                <span className={difficultyColors[q.difficulty]}>{q.difficulty}</span>
              </div>
              <h2 className="text-xl font-bold text-white mb-8">{q.text}</h2>
              <div className="space-y-3">
                {q.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={answered}
                    className={`w-full p-5 rounded-xl border text-left transition-all ${
                      answered
                        ? idx === q.correct
                          ? 'border-green-500/50 bg-green-500/10'
                          : idx === selected
                          ? 'border-red-500/50 bg-red-500/10'
                          : 'border-white/5 bg-white/[0.02] opacity-40'
                        : 'border-white/10 bg-white/[0.02] hover:border-indigo-500/50 hover:bg-indigo-500/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                        answered
                          ? idx === q.correct
                            ? 'border-green-500 text-green-500'
                            : idx === selected
                            ? 'border-red-500 text-red-500'
                            : 'border-white/20 text-white/20'
                          : 'border-white/20 text-white/40'
                      }`}>
                        {answered && idx === q.correct ? <CheckCircle2 className="h-4 w-4" /> : answered && idx === selected ? <XCircle className="h-4 w-4" /> : String.fromCharCode(65 + idx)}
                      </div>
                      <span className="text-white/80">{opt}</span>
                    </div>
                  </button>
                ))}
              </div>

              {answered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-6 p-5 rounded-xl ${isCorrect ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}
                >
                  <div className="font-semibold mb-1 text-white">{isCorrect ? 'Correct!' : 'Incorrect'}</div>
                  <div className="text-sm text-white/50">{q.explanation}</div>
                </motion.div>
              )}

              {/* Progress & Navigation */}
              <div className="mt-8 flex items-center gap-4">
                <span className="text-sm text-white/30 w-16">{currentQ + 1}/{questions.length}</span>
                <div className="flex-1 progress-bar h-2">
                  <motion.div
                    className="progress-fill"
                    initial={{ width: `${(currentQ / questions.length) * 100}%` }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                {answered && !isFinished && (
                  <button onClick={nextQuestion} className="btn-primary text-sm py-2 px-4 flex items-center gap-2">
                    Next <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
