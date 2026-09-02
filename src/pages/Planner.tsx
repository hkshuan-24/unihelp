import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Clock, AlertCircle, CheckCircle2, RotateCcw, CalendarDays, Flame, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface StudySession {
  id: string;
  day: string;
  time: string;
  duration: number;
  topic: string;
  type: string;
  completed: boolean;
}

const initialPlan: StudySession[] = [
  { id: '1', day: 'Monday', time: '18:00', duration: 45, topic: 'Elasticity concepts', type: 'read', completed: false },
  { id: '2', day: 'Tuesday', time: '19:00', duration: 30, topic: 'Spaced-repetition review', type: 'review', completed: true },
  { id: '3', day: 'Wednesday', time: '18:00', duration: 60, topic: 'Taxation & deadweight loss', type: 'read', completed: false },
  { id: '4', day: 'Thursday', time: '19:30', duration: 30, topic: 'Graph practice', type: 'practice', completed: false },
  { id: '5', day: 'Friday', time: '18:00', duration: 40, topic: 'Consumer theory review', type: 'review', completed: false },
  { id: '6', day: 'Saturday', time: '10:00', duration: 90, topic: 'Mixed-topic test', type: 'test', completed: false },
];

const typeColors: Record<string, string> = {
  read: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  practice: 'bg-green-500/10 text-green-400 border-green-500/20',
  review: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  test: 'bg-red-500/10 text-red-400 border-red-500/20',
};

const typeIcons: Record<string, string> = {
  read: '📖',
  practice: '✏️',
  review: '🔄',
  test: '📝',
};

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function Planner() {
  const [sessions, setSessions] = useState<StudySession[]>(initialPlan);
  const [missedSession, setMissedSession] = useState<string | null>(null);

  const toggleComplete = (id: string) => {
    setSessions(prev => prev.map(s => s.id === id ? { ...s, completed: !s.completed } : s));
  };

  const simulateMissed = (id: string) => {
    setMissedSession(id);
    setSessions(prev => prev.map(s => {
      if (s.id === id) return { ...s, day: 'Wednesday', time: '20:00', duration: 30 };
      if (s.day === 'Friday') return { ...s, duration: Math.max(15, s.duration - 20) };
      return s;
    }));
  };

  const totalMinutes = sessions.reduce((sum, s) => sum + s.duration, 0);
  const completedMinutes = sessions.filter(s => s.completed).reduce((sum, s) => sum + s.duration, 0);
  const progress = Math.round((completedMinutes / totalMinutes) * 100);
  const streak = 3;

  return (
    <div className="min-h-screen bg-[#06060a]">
      {/* Header */}
      <nav className="nav-glass sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center hover:rotate-12 transition-transform">
              <GraduationCap className="h-4 w-4 text-white" />
            </Link>
            <div>
              <div className="font-semibold text-white">Study Planner</div>
              <div className="text-xs text-white/30">ECC1000 · Exam in 6 weeks</div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-amber-400">
              <Flame className="h-4 w-4" /> {streak} day streak
            </div>
            <div className="flex items-center gap-2 text-white/40">
              <Clock className="h-4 w-4" /> {completedMinutes}/{totalMinutes} min
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Progress Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6 mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <Target className="h-5 w-5 text-indigo-400" />
              <span className="font-semibold text-white">Weekly Progress</span>
            </div>
            <span className="text-sm text-white/40">{progress}% complete</span>
          </div>
          <div className="progress-bar h-3">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
          <div className="flex justify-between mt-3 text-xs text-white/30">
            <span>{Math.round(completedMinutes / 60 * 10) / 10} hrs studied</span>
            <span>{Math.round((totalMinutes - completedMinutes) / 60 * 10) / 10} hrs remaining</span>
          </div>
        </motion.div>

        {/* Smart Reschedule Notice */}
        <AnimatePresence>
          {missedSession && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="glass rounded-2xl p-5 mb-6 border border-blue-500/20 glow-primary overflow-hidden"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <RotateCcw className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <div className="font-semibold text-blue-300">Plan Adjusted</div>
                  <div className="text-sm text-white/50">You missed Monday's elasticity session. Moved essential concepts to Wednesday and shortened Friday's review. Exam-readiness target remains achievable.</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Study Schedule */}
        <div className="space-y-6">
          {days.map((day, dayIndex) => {
            const daySessions = sessions.filter(s => s.day === day);
            if (daySessions.length === 0) return null;
            return (
              <motion.div
                key={day}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: dayIndex * 0.05 }}
              >
                <h3 className="font-semibold mb-3 text-sm text-white/30 uppercase tracking-wider flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" /> {day}
                </h3>
                <div className="space-y-3">
                  {daySessions.map((session, i) => (
                    <motion.div
                      key={session.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: dayIndex * 0.05 + i * 0.05 }}
                      className={`p-5 rounded-xl border transition-all ${
                        session.completed
                          ? 'bg-white/[0.02] border-white/5 opacity-50'
                          : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => toggleComplete(session.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            session.completed
                              ? 'border-green-500 bg-green-500/20'
                              : 'border-white/20 hover:border-indigo-500/50'
                          }`}
                        >
                          {session.completed && <CheckCircle2 className="h-4 w-4 text-green-400" />}
                        </button>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-white">{session.topic}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${typeColors[session.type]}`}>
                              {typeIcons[session.type]} {session.type}
                            </span>
                          </div>
                          <div className="text-sm text-white/30">{session.time} · {session.duration} min · ECC1000</div>
                        </div>
                        {!session.completed && (
                          <button
                            onClick={() => simulateMissed(session.id)}
                            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                            title="Mark as missed"
                          >
                            <AlertCircle className="h-4 w-4 text-white/20 hover:text-amber-400" />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-2xl p-8 mt-8"
        >
          <h2 className="text-xl font-bold text-white mb-6">This Week's Focus</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: 'Priority Topics', value: 'Elasticity, Tax Incidence' },
              { label: 'Study Hours', value: `${(totalMinutes / 60).toFixed(1)} hrs` },
              { label: 'Practice Questions', value: '43' },
              { label: 'Mock Exam', value: 'Saturday (target ≥75%)' },
            ].map(item => (
              <div key={item.label} className="flex justify-between items-center p-4 rounded-xl bg-white/[0.03]">
                <span className="text-sm text-white/40">{item.label}</span>
                <span className="font-medium text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
