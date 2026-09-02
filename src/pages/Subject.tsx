import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Brain, Calendar, BookOpen, Lightbulb, ChevronRight, BarChart3, Play, FileText, Layers } from 'lucide-react';
import { sampleSubject } from '../data';

export default function Subject() {
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [noteLevel, setNoteLevel] = useState<'quick' | 'standard' | 'deep' | 'exam'>('standard');
  const [activeTab, setActiveTab] = useState('content');

  const subject = sampleSubject;
  const week = selectedWeek ? subject.weeks.find(w => w.id === selectedWeek) : null;

  const notes: Record<string, string> = {
    quick: 'Quick 5-minute overview of key concepts. Focus on definitions and main ideas.',
    standard: 'Full university-level explanation with worked examples and diagrams.',
    deep: 'Detailed conceptual treatment with derivations, edge cases, and academic references.',
    exam: 'Only what matters for assessment. Common question types and mark-scoring techniques.',
  };

  const tabs = [
    { id: 'content', label: 'Course Content' },
    { id: 'notes', label: 'Deep Notes' },
    { id: 'practice', label: 'Practice' },
    { id: 'progress', label: 'My Progress' },
    { id: 'assessments', label: 'Assessments' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <nav className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard"><GraduationCap className="h-6 w-6 text-indigo-600" /></Link>
            <div>
              <div className="font-semibold">{subject.name}</div>
              <div className="text-xs text-slate-500">{subject.code}</div>
            </div>
          </div>
          <div className="flex gap-2">
            <Link to="/tutor" className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-slate-50 flex items-center gap-2"><Brain className="h-4 w-4" /> Ask AI</Link>
            <Link to="/planner" className="btn-primary text-sm flex items-center gap-2"><Calendar className="h-4 w-4" /> Study Plan</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-white p-1 rounded-lg border">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${activeTab === t.id ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Course Content */}
        {activeTab === 'content' && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="card p-0 overflow-hidden">
                <div className="p-4 border-b"><h3 className="font-semibold">Weeks</h3></div>
                <div className="max-h-[600px] overflow-y-auto">
                  {subject.weeks.map(w => (
                    <button key={w.id} onClick={() => setSelectedWeek(w.id)}
                      className={`w-full text-left p-4 border-b transition-all ${selectedWeek === w.id ? 'bg-indigo-50 border-l-4 border-l-indigo-600' : 'border-l-4 border-l-transparent hover:bg-slate-50'}`}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-sm">Week {w.id}</span>
                        {w.id <= 3 && <span className="text-xs px-2 py-0.5 rounded-full border">Done</span>}
                      </div>
                      <div className="text-sm text-slate-500">{w.title}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              {week ? (
                <div className="card">
                  <h2 className="text-xl font-bold mb-4">Week {week.id}: {week.title}</h2>
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2"><BookOpen className="h-4 w-4" /> Topics</h3>
                    <div className="flex flex-wrap gap-2">
                      {week.topics.map(t => <span key={t} className="px-3 py-1 bg-slate-100 rounded-full text-sm">{t}</span>)}
                    </div>
                  </div>
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2 flex items-center gap-2"><Lightbulb className="h-4 w-4" /> Learning Objectives</h3>
                    <ul className="space-y-2">
                      {week.learningObjectives.map(obj => (
                        <li key={obj} className="flex items-start gap-2 text-sm"><ChevronRight className="h-4 w-4 mt-0.5 text-indigo-600" />{obj}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <button className="btn-primary flex items-center gap-2"><Play className="h-4 w-4" /> Start Learning</button>
                    <button className="btn-secondary flex items-center gap-2"><BarChart3 className="h-4 w-4" /> Quick Quiz</button>
                  </div>
                </div>
              ) : (
                <div className="card h-full flex items-center justify-center py-20">
                  <div className="text-center">
                    <Layers className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500">Select a week to view content</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Deep Notes */}
        {activeTab === 'notes' && (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Deep Notes</h2>
              <div className="flex gap-1">
                {(['quick', 'standard', 'deep', 'exam'] as const).map(level => (
                  <button key={level} onClick={() => setNoteLevel(level)}
                    className={`px-3 py-1.5 rounded-lg text-sm capitalize transition-colors ${noteLevel === level ? 'bg-indigo-600 text-white' : 'border hover:bg-slate-50'}`}>
                    {level}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-2">Price Elasticity of Demand</h3>
              <div className="text-sm text-slate-500">{notes[noteLevel]}</div>
            </div>
            <div className="space-y-6">
              <div><h4 className="font-semibold mb-2">Definition</h4><p className="text-slate-600">Price elasticity of demand measures the responsiveness of quantity demanded to a change in price.</p></div>
              <div><h4 className="font-semibold mb-2">Formula</h4><div className="p-4 bg-indigo-50 rounded-lg font-mono text-center">PED = % Change in Quantity Demanded / % Change in Price</div></div>
              <div><h4 className="font-semibold mb-2">Worked Example</h4><div className="p-4 border rounded-lg space-y-2 text-sm"><p>Price increases from $10 to $12. Quantity falls from 100 to 80.</p><p className="font-mono">%ΔQ = -20%<br/>%ΔP = 20%<br/>PED = |-20/20| = 1</p><p className="text-slate-500">Unit elastic demand.</p></div></div>
            </div>
          </div>
        )}

        {/* Practice */}
        {activeTab === 'practice' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: '5-Minute Quiz', desc: 'Quick concept check', icon: Play },
              { name: 'Standard Quiz', desc: 'Full topic coverage', icon: FileText },
              { name: 'Difficult Quiz', desc: 'Challenging applications', icon: BarChart3 },
              { name: 'Exam-Level Quiz', desc: 'Past exam difficulty', icon: FileText },
              { name: 'Weak Topics Quiz', desc: 'Focus on your gaps', icon: Lightbulb },
              { name: 'Flashcards', desc: 'Spaced repetition review', icon: Layers },
            ].map(quiz => (
              <div key={quiz.name} className="card-hover">
                <quiz.icon className="h-8 w-8 text-indigo-600 mb-3" />
                <div className="font-semibold">{quiz.name}</div>
                <div className="text-sm text-slate-500">{quiz.desc}</div>
                <button className="mt-4 w-full py-2 border rounded-lg text-sm font-medium hover:bg-slate-50">Start</button>
              </div>
            ))}
          </div>
        )}

        {/* Progress */}
        {activeTab === 'progress' && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <h2 className="text-lg font-bold mb-4">Topic Mastery</h2>
              <div className="space-y-4">
                {Object.entries(subject.mastery).map(([topic, score]) => (
                  <div key={topic}>
                    <div className="flex justify-between mb-1"><span className="text-sm">{topic}</span><span className="text-sm font-medium">{score}%</span></div>
                    <div className="progress-bar"><div className="progress-fill bg-indigo-600" style={{ width: `${score}%` }} /></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card">
              <h2 className="text-lg font-bold mb-4">Recommendations</h2>
              <div className="space-y-3">
                <div className="p-3 bg-amber-50 rounded-lg">
                  <div className="font-medium text-amber-800">Priority: Externalities</div>
                  <div className="text-sm text-amber-700">Your mastery is 46%. This topic carries 15% exam weight.</div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="font-medium text-blue-800">Maintain: Demand & Supply</div>
                  <div className="text-sm text-blue-700">Strong at 91%. Brief review only.</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Assessments */}
        {activeTab === 'assessments' && (
          <div className="card">
            <h2 className="text-lg font-bold mb-4">Assessment Tracker</h2>
            <div className="space-y-4">
              {subject.assessments.map(a => (
                <div key={a.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">{a.name}</div>
                    <div className="text-sm text-slate-500">Weight: {a.weight}% · Type: {a.type}</div>
                  </div>
                  <div className="text-right">
                    {a.result ? (
                      <div><div className="text-2xl font-bold">{a.result}%</div><div className="text-xs text-slate-500">Contribution: {(a.result * a.weight) / 100}%</div></div>
                    ) : (
                      <div><div className="text-sm text-slate-500">Pending</div></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
