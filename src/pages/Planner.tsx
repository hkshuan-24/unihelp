import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Clock, AlertCircle, CheckCircle2, RotateCcw } from 'lucide-react';

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
  read: 'bg-blue-100 text-blue-800',
  practice: 'bg-green-100 text-green-800',
  review: 'bg-amber-100 text-amber-800',
  test: 'bg-red-100 text-red-800',
};

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

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <nav className="border-b bg-white">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard"><GraduationCap className="h-6 w-6 text-indigo-600" /></Link>
            <div>
              <div className="font-semibold">Study Planner</div>
              <div className="text-xs text-slate-500">ECC1000 · Exam in 6 weeks</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Clock className="h-4 w-4" /> {completedMinutes}/{totalMinutes} min this week
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Progress */}
        <div className="card mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Weekly Progress</span>
            <span className="text-sm text-slate-500">{Math.round((completedMinutes / totalMinutes) * 100)}% complete</span>
          </div>
          <div className="progress-bar h-3"><div className="progress-fill bg-indigo-600" style={{ width: `${(completedMinutes / totalMinutes) * 100}%` }} /></div>
        </div>

        {/* Smart Reschedule Notice */}
        {missedSession && (
          <div className="card border-blue-200 bg-blue-50 mb-6 flex items-center gap-4">
            <RotateCcw className="h-6 w-6 text-blue-600" />
            <div>
              <div className="font-semibold text-blue-800">Plan Adjusted</div>
              <div className="text-sm text-blue-700">You missed Monday's elasticity session. I have moved essential concepts to Wednesday and shortened Friday's review. Your exam-readiness target remains achievable.</div>
            </div>
          </div>
        )}

        {/* Study Schedule */}
        <div className="space-y-4">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => {
            const daySessions = sessions.filter(s => s.day === day);
            if (daySessions.length === 0) return null;
            return (
              <div key={day}>
                <h3 className="font-semibold mb-2 text-sm text-slate-500 uppercase">{day}</h3>
                <div className="space-y-2">
                  {daySessions.map(session => (
                    <div key={session.id} className={`p-4 border rounded-lg flex items-center gap-4 ${session.completed ? 'bg-slate-50 opacity-60' : 'bg-white'}`}>
                      <input type="checkbox" checked={session.completed} onChange={() => toggleComplete(session.id)} className="h-5 w-5" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{session.topic}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeColors[session.type]}`}>{session.type}</span>
                        </div>
                        <div className="text-sm text-slate-500">{session.time} · {session.duration} min · ECC1000</div>
                      </div>
                      {!session.completed && (
                        <button onClick={() => simulateMissed(session.id)} className="p-2 hover:bg-slate-100 rounded-lg">
                          <AlertCircle className="h-4 w-4 text-slate-400" />
                        </button>
                      )}
                      {session.completed && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="card mt-8">
          <h2 className="text-lg font-bold mb-4">This Week's Focus</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Priority Topics</span><span className="font-medium">Elasticity, Tax Incidence</span></div>
            <div className="flex justify-between"><span>Study Hours</span><span className="font-medium">{(totalMinutes / 60).toFixed(1)} hrs</span></div>
            <div className="flex justify-between"><span>Practice Questions</span><span className="font-medium">43</span></div>
            <div className="flex justify-between"><span>Mock Exam</span><span className="font-medium">Saturday (target ≥75%)</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
