import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Brain, Calendar, BookOpen, Lightbulb, ChevronRight, BarChart3, Play, FileText, Layers, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

  const tabContent = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  };

  return (
    <div className="min-h-screen bg-[#06060a]">
      {/* Header */}
      <nav className="nav-glass sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center hover:rotate-12 transition-transform">
              <GraduationCap className="h-5 w-5 text-white" />
            </Link>
            <div>
              <div className="font-semibold text-white">{subject.name}</div>
              <div className="text-xs text-white/30">{subject.code}</div>
            </div>
          </div>
          <div className="flex gap-2">
            <Link to="/tutor" className="px-4 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all flex items-center gap-2">
              <Brain className="h-4 w-4" /> Ask AI
            </Link>
            <Link to="/planner" className="btn-primary text-sm py-2 px-4 flex items-center gap-2">
              <Calendar className="h-4 w-4" /> Study Plan
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Tabs */}
        <div className="flex gap-1 mb-6 p-1 rounded-xl glass">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === t.id
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Course Content */}
          {activeTab === 'content' && (
            <motion.div key="content" {...tabContent} className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <div className="glass rounded-2xl overflow-hidden">
                  <div className="p-4 border-b border-white/5">
                    <h3 className="font-semibold text-white">Weeks</h3>
                  </div>
                  <div className="max-h-[600px] overflow-y-auto">
                    {subject.weeks.map(w => (
                      <button
                        key={w.id}
                        onClick={() => setSelectedWeek(w.id)}
                        className={`w-full text-left p-4 border-b border-white/5 transition-all ${
                          selectedWeek === w.id
                            ? 'bg-indigo-500/10 border-l-4 border-l-indigo-500'
                            : 'border-l-4 border-l-transparent hover:bg-white/[0.02]'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-sm text-white">Week {w.id}</span>
                          {w.id <= 3 && <span className="badge-success text-xs">Done</span>}
                        </div>
                        <div className="text-sm text-white/40">{w.title}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2">
                {week ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass rounded-2xl p-8"
                  >
                    <h2 className="text-2xl font-bold text-white mb-6">Week {week.id}: {week.title}</h2>
                    <div className="mb-6">
                      <h3 className="font-semibold mb-3 flex items-center gap-2 text-white/80">
                        <BookOpen className="h-4 w-4 text-indigo-400" /> Topics
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {week.topics.map(t => (
                          <span key={t} className="px-3 py-1.5 rounded-lg bg-white/5 text-sm text-white/70 border border-white/10">{t}</span>
                        ))}
                      </div>
                    </div>
                    <div className="mb-6">
                      <h3 className="font-semibold mb-3 flex items-center gap-2 text-white/80">
                        <Lightbulb className="h-4 w-4 text-amber-400" /> Learning Objectives
                      </h3>
                      <ul className="space-y-3">
                        {week.learningObjectives.map(obj => (
                          <li key={obj} className="flex items-start gap-3 text-sm text-white/60">
                            <ChevronRight className="h-4 w-4 mt-0.5 text-indigo-400 flex-shrink-0" />{obj}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex gap-3 pt-4">
                      <button className="btn-primary flex items-center gap-2 text-sm py-2.5">
                        <Play className="h-4 w-4" /> Start Learning
                      </button>
                      <button className="btn-secondary flex items-center gap-2 text-sm py-2.5">
                        <BarChart3 className="h-4 w-4" /> Quick Quiz
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <div className="glass rounded-2xl h-full flex items-center justify-center py-20">
                    <div className="text-center">
                      <Layers className="h-16 w-16 text-white/10 mx-auto mb-4" />
                      <p className="text-white/30">Select a week to view content</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Deep Notes */}
          {activeTab === 'notes' && (
            <motion.div key="notes" {...tabContent} className="glass rounded-2xl p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">Deep Notes</h2>
                <div className="flex gap-1 p-1 rounded-xl bg-white/5">
                  {(['quick', 'standard', 'deep', 'exam'] as const).map(level => (
                    <button
                      key={level}
                      onClick={() => setNoteLevel(level)}
                      className={`px-4 py-2 rounded-lg text-sm capitalize font-medium transition-all ${
                        noteLevel === level
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                          : 'text-white/40 hover:text-white'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-6 rounded-xl bg-white/[0.03] border border-white/10 mb-8">
                <h3 className="text-xl font-bold text-white mb-2">Price Elasticity of Demand</h3>
                <div className="text-sm text-white/40">{notes[noteLevel]}</div>
              </div>
              <div className="space-y-8">
                <div>
                  <h4 className="font-semibold text-white mb-3 text-lg">Definition</h4>
                  <p className="text-white/60 leading-relaxed">Price elasticity of demand measures the responsiveness of quantity demanded to a change in price.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-3 text-lg">Formula</h4>
                  <div className="p-6 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 font-mono text-center text-indigo-300">
                    PED = % Change in Quantity Demanded / % Change in Price
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-3 text-lg">Worked Example</h4>
                  <div className="p-6 rounded-xl bg-white/[0.03] border border-white/10 space-y-3 text-sm">
                    <p className="text-white/60">Price increases from $10 to $12. Quantity falls from 100 to 80.</p>
                    <p className="font-mono text-indigo-300">%ΔQ = -20%<br/>%ΔP = 20%<br/>PED = |-20/20| = 1</p>
                    <p className="text-white/40">Unit elastic demand.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Practice */}
          {activeTab === 'practice' && (
            <motion.div key="practice" {...tabContent} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: '5-Minute Quiz', desc: 'Quick concept check', icon: Play },
                { name: 'Standard Quiz', desc: 'Full topic coverage', icon: FileText },
                { name: 'Difficult Quiz', desc: 'Challenging applications', icon: BarChart3 },
                { name: 'Exam-Level Quiz', desc: 'Past exam difficulty', icon: FileText },
                { name: 'Weak Topics Quiz', desc: 'Focus on your gaps', icon: Lightbulb },
                { name: 'Flashcards', desc: 'Spaced repetition review', icon: Layers },
              ].map(quiz => (
                <div key={quiz.name} className="glass-hover rounded-2xl p-6 group cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <quiz.icon className="h-6 w-6 text-indigo-400" />
                  </div>
                  <div className="font-semibold text-white mb-1">{quiz.name}</div>
                  <div className="text-sm text-white/40 mb-4">{quiz.desc}</div>
                  <button className="w-full py-2.5 rounded-xl border border-white/10 text-sm font-medium text-white/60 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all">
                    Start
                  </button>
                </div>
              ))}
            </motion.div>
          )}

          {/* Progress */}
          {activeTab === 'progress' && (
            <motion.div key="progress" {...tabContent} className="grid md:grid-cols-2 gap-6">
              <div className="glass rounded-2xl p-8">
                <h2 className="text-xl font-bold text-white mb-6">Topic Mastery</h2>
                <div className="space-y-5">
                  {Object.entries(subject.mastery).map(([topic, score]) => (
                    <div key={topic}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-white/60">{topic}</span>
                        <span className="text-sm font-bold text-white">{score}%</span>
                      </div>
                      <div className="progress-bar h-2">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${score}%`,
                            background: score >= 80 ? 'linear-gradient(90deg, #22c55e, #4ade80)' : score >= 60 ? 'linear-gradient(90deg, #f59e0b, #fbbf24)' : 'linear-gradient(90deg, #ef4444, #f87171)',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass rounded-2xl p-8">
                <h2 className="text-xl font-bold text-white mb-6">Recommendations</h2>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <div className="font-medium text-amber-300 mb-1">Priority: Externalities</div>
                    <div className="text-sm text-white/50">Your mastery is 46%. This topic carries 15% exam weight.</div>
                  </div>
                  <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <div className="font-medium text-blue-300 mb-1">Maintain: Demand & Supply</div>
                    <div className="text-sm text-white/50">Strong at 91%. Brief review only.</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Assessments */}
          {activeTab === 'assessments' && (
            <motion.div key="assessments" {...tabContent} className="glass rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white mb-6">Assessment Tracker</h2>
              <div className="space-y-4">
                {subject.assessments.map(a => (
                  <div key={a.id} className="flex items-center justify-between p-5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all">
                    <div>
                      <div className="font-medium text-white">{a.name}</div>
                      <div className="text-sm text-white/30">Weight: {a.weight}% · Type: {a.type}</div>
                    </div>
                    <div className="text-right">
                      {a.result ? (
                        <div>
                          <div className="text-2xl font-bold gradient-text">{a.result}%</div>
                          <div className="text-xs text-white/30">Contribution: {(a.result * a.weight) / 100}%</div>
                        </div>
                      ) : (
                        <span className="badge-glow">Pending</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
