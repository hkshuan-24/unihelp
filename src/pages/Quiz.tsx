import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Timer, ArrowRight, GraduationCap, RotateCcw } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <nav className="border-b bg-white">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard"><GraduationCap className="h-6 w-6 text-indigo-600" /></Link>
            <div>
              <div className="font-semibold">Diagnostic Quiz</div>
              <div className="text-xs text-slate-500">ECC1000 · Microeconomics</div>
            </div>
          </div>
          {started && !isFinished && (
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Timer className="h-4 w-4" /> Question {currentQ + 1} of {questions.length}
            </div>
          )}
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {!started ? (
          /* Start Screen */
          <div className="card text-center py-12">
            <Brain className="h-16 w-16 text-indigo-600 mx-auto mb-6" />
            <h1 className="text-2xl font-bold mb-2">Check My Level</h1>
            <p className="text-slate-500 mb-2 max-w-md mx-auto">Adaptive diagnostic test that establishes your current mastery across all microeconomics topics.</p>
            <div className="text-sm text-slate-500 mb-8">{questions.length} questions · ~5 minutes</div>
            <div className="flex gap-2 justify-center mb-8">
              <span className="px-3 py-1 border rounded-full text-xs">MCQ</span>
              <span className="px-3 py-1 border rounded-full text-xs">Application</span>
              <span className="px-3 py-1 border rounded-full text-xs">Graphs</span>
            </div>
            <button onClick={() => setStarted(true)} className="btn-primary">
              Start Diagnostic <ArrowRight className="h-4 w-4 inline" />
            </button>
          </div>
        ) : isFinished ? (
          /* Results Screen */
          <div>
            <div className="card mb-6 text-center">
              <h2 className="text-xl font-bold mb-2">Diagnostic Results</h2>
              <div className="text-5xl font-bold mb-2">{Math.round((score / questions.length) * 100)}%</div>
              <div className="text-slate-500 mb-6">{score} of {questions.length} correct</div>
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-6">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{results.filter(r => r.correct).length}</div>
                  <div className="text-sm text-green-700">Correct</div>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{results.filter(r => !r.correct).length}</div>
                  <div className="text-sm text-red-700">Incorrect</div>
                </div>
              </div>
            </div>

            {/* Topic Breakdown */}
            <div className="card mb-6">
              <h2 className="text-lg font-bold mb-4">Topic Breakdown</h2>
              <div className="space-y-4">
                {Object.entries(topicStats).map(([topic, stats]) => {
                  const pct = Math.round((stats.correct / stats.total) * 100);
                  return (
                    <div key={topic}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">{topic}</span>
                        <span className="text-sm font-medium">{stats.correct}/{stats.total} ({pct}%)</span>
                      </div>
                      <div className="progress-bar"><div className="progress-fill bg-indigo-600" style={{ width: `${pct}%` }} /></div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recommendations */}
            <div className="card mb-6">
              <h2 className="text-lg font-bold mb-4">Recommendations</h2>
              <div className="space-y-3">
                {Object.entries(topicStats).sort((a, b) => a[1].correct / a[1].total - b[1].correct / b[1].total).slice(0, 2).map(([topic, stats]) => (
                  <div key={topic} className="p-3 bg-amber-50 rounded-lg">
                    <div className="font-medium text-amber-800">Focus: {topic}</div>
                    <div className="text-sm text-amber-700">Your accuracy is {Math.round((stats.correct / stats.total) * 100)}%. Review deep notes and practice more questions on this topic.</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button onClick={() => window.location.reload()} className="btn-secondary flex items-center gap-2"><RotateCcw className="h-4 w-4" /> Retake</button>
              <Link to="/dashboard" className="btn-primary">Back to Dashboard</Link>
            </div>
          </div>
        ) : (
          /* Question */
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-medium">{q.topic}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${q.difficulty === 'basic' ? 'bg-green-100 text-green-800' : q.difficulty === 'application' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'}`}>{q.difficulty}</span>
            </div>
            <h2 className="text-lg font-bold mb-6">{q.text}</h2>
            <div className="space-y-3">
              {q.options.map((opt, idx) => (
                <button key={idx} onClick={() => handleAnswer(idx)} disabled={answered}
                  className={`w-full p-4 rounded-lg border text-left transition-all ${
                    answered
                      ? idx === q.correct ? 'border-green-500 bg-green-50' : idx === selected ? 'border-red-500 bg-red-50' : 'border-slate-200 opacity-50'
                      : 'border-slate-200 hover:border-indigo-600 hover:bg-indigo-50'
                  }`}>
                  {opt}
                </button>
              ))}
            </div>

            {answered && (
              <div className={`mt-6 p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                <div className="font-semibold mb-1">{isCorrect ? 'Correct!' : 'Incorrect'}</div>
                <div className="text-sm text-slate-600">{q.explanation}</div>
              </div>
            )}

            {/* Navigation */}
            <div className="mt-6 flex justify-between items-center">
              <span className="text-sm text-slate-500">Progress</span>
              <div className="flex-1 mx-4"><div className="progress-bar"><div className="progress-fill bg-indigo-600" style={{ width: `${progress}%` }} /></div></div>
              {answered && !isFinished && (
                <button onClick={nextQuestion} className="btn-primary text-sm flex items-center gap-2">Next <ArrowRight className="h-4 w-4" /></button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
