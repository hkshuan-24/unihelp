import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap, Brain, Calendar, BookOpen, Lightbulb, ChevronRight,
  BarChart3, Play, FileText, Layers, ArrowUpRight, Clock, CheckCircle2,
  X, GraduationCap as GradIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sampleSubject, weekContents } from '../data';

export default function Subject() {
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [noteLevel, setNoteLevel] = useState<'quick' | 'standard' | 'deep' | 'exam'>('standard');
  const [activeTab, setActiveTab] = useState('content');
  const [learningOpen, setLearningOpen] = useState(false);
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());

  const subject = sampleSubject;
  const week = selectedWeek ? weekContents.find(w => w.id === selectedWeek) : null;

  const toggleSection = (key: string) => {
    setCompletedSections(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
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
              {/* Week List */}
              <div className="lg:col-span-1">
                <div className="glass rounded-2xl overflow-hidden">
                  <div className="p-4 border-b border-white/5">
                    <h3 className="font-semibold text-white">Weeks</h3>
                  </div>
                  <div className="max-h-[600px] overflow-y-auto">
                    {weekContents.map(w => (
                      <button
                        key={w.id}
                        onClick={() => { setSelectedWeek(w.id); setLearningOpen(false); }}
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

              {/* Content Panel */}
              <div className="lg:col-span-2">
                {!week ? (
                  <div className="glass rounded-2xl h-full flex items-center justify-center py-20">
                    <div className="text-center">
                      <Layers className="h-16 w-16 text-white/10 mx-auto mb-4" />
                      <p className="text-white/30">Select a week to view content</p>
                    </div>
                  </div>
                ) : !learningOpen ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass rounded-2xl p-8"
                  >
                    <h2 className="text-2xl font-bold text-white mb-2">Week {week.id}: {week.title}</h2>
                    <p className="text-white/40 text-sm mb-6">{week.content.summary}</p>

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
                        {week.learningObjectives.map((obj, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-white/60">
                            <ChevronRight className="h-4 w-4 mt-0.5 text-indigo-400 flex-shrink-0" />{obj}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6 p-4 rounded-xl bg-white/[0.03] border border-white/10">
                      <div className="flex items-center gap-2 mb-2 text-sm text-white/40">
                        <Clock className="h-4 w-4" /> Estimated study time: {week.content.sections.length * 15} minutes
                      </div>
                      <div className="text-sm text-white/40">{week.content.sections.length} sections · {week.topics.length} topics</div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={() => setLearningOpen(true)}
                        className="btn-primary flex items-center gap-2 text-sm py-2.5"
                      >
                        <Play className="h-4 w-4" /> Start Learning
                      </button>
                      <Link to="/quiz" className="btn-secondary flex items-center gap-2 text-sm py-2.5">
                        <BarChart3 className="h-4 w-4" /> Quick Quiz
                      </Link>
                    </div>
                  </motion.div>
                ) : (
                  /* Learning Mode */
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h2 className="text-xl font-bold text-white">Week {week.id}: {week.title}</h2>
                        <div className="text-sm text-white/40 mt-1">
                          {completedSections.size}/{week.content.sections.length} sections completed
                        </div>
                      </div>
                      <button
                        onClick={() => setLearningOpen(false)}
                        className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                      >
                        <X className="h-5 w-5 text-white/40" />
                      </button>
                    </div>

                    {/* Progress bar */}
                    <div className="progress-bar h-2 mb-6">
                      <motion.div
                        className="progress-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${(completedSections.size / week.content.sections.length) * 100}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>

                    {week.content.sections.map((section, idx) => {
                      const key = `${week.id}-${idx}`;
                      const isDone = completedSections.has(key);
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className={`glass rounded-2xl p-6 transition-all ${isDone ? 'border-green-500/20' : ''}`}
                        >
                          <div className="flex items-start gap-4">
                            <button
                              onClick={() => toggleSection(key)}
                              className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                                isDone ? 'border-green-500 bg-green-500/20' : 'border-white/20 hover:border-indigo-500/50'
                              }`}
                            >
                              {isDone && <CheckCircle2 className="h-4 w-4 text-green-400" />}
                            </button>
                            <div className="flex-1">
                              <h3 className={`font-semibold text-lg mb-3 ${isDone ? 'text-green-300 line-through opacity-60' : 'text-white'}`}>
                                {section.title}
                              </h3>
                              <p className={`leading-relaxed ${isDone ? 'text-white/30' : 'text-white/60'}`}>
                                {section.body}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}

                    {completedSections.size === week.content.sections.length && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass rounded-2xl p-8 text-center border border-green-500/20"
                      >
                        <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                          <GradIcon className="h-8 w-8 text-green-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Week {week.id} Complete!</h3>
                        <p className="text-white/40 mb-4">You've completed all sections for this week.</p>
                        <div className="flex gap-3 justify-center">
                          <button onClick={() => { setLearningOpen(false); setCompletedSections(new Set()); }} className="btn-secondary text-sm">
                            Review Again
                          </button>
                          <Link to="/quiz" className="btn-primary text-sm">Take Quiz</Link>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* Deep Notes */}
          {activeTab === 'notes' && (
            <motion.div key="notes" {...tabContent}>
              {!week ? (
                <div className="glass rounded-2xl p-12 text-center">
                  <BookOpen className="h-16 w-16 text-white/10 mx-auto mb-4" />
                  <p className="text-white/30">Select a week from Course Content to view its notes</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Header */}
                  <div className="glass rounded-2xl p-6">
                    <h2 className="text-2xl font-bold text-white mb-1">Week {week.id}: {week.title}</h2>
                    <p className="text-white/40 text-sm">Comprehensive notes with four depth levels</p>
                  </div>

                  {/* Level Selector */}
                  <div className="flex gap-2 p-1 rounded-xl glass">
                    {([
                      { key: 'quick' as const, label: 'Quick', desc: '5-min overview', color: 'from-blue-500 to-cyan-500' },
                      { key: 'standard' as const, label: 'Standard', desc: 'Full explanation', color: 'from-indigo-500 to-purple-600' },
                      { key: 'deep' as const, label: 'Deep', desc: 'Derivations & theory', color: 'from-purple-500 to-pink-500' },
                      { key: 'exam' as const, label: 'Exam', desc: 'Assessment focus', color: 'from-amber-500 to-orange-500' },
                    ]).map(level => (
                      <button
                        key={level.key}
                        onClick={() => setNoteLevel(level.key)}
                        className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                          noteLevel === level.key
                            ? `bg-gradient-to-r ${level.color} text-white shadow-lg`
                            : 'text-white/40 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <div className="font-semibold">{level.label}</div>
                        <div className="text-xs opacity-70">{level.desc}</div>
                      </button>
                    ))}
                  </div>

                  {/* Note Content */}
                  <motion.div
                    key={noteLevel}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass rounded-2xl p-8"
                  >
                    <div className="flex items-center gap-2 mb-6">
                      <FileText className="h-5 w-5 text-indigo-400" />
                      <h3 className="text-lg font-bold text-white capitalize">{noteLevel} Notes</h3>
                    </div>
                    <div className="prose prose-invert max-w-none">
                      {week.notes[noteLevel].split('\n\n').map((paragraph, i) => (
                        <p key={i} className="text-white/70 leading-relaxed mb-4">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </motion.div>

                  {/* Key Formulas / Exam Tips */}
                  {noteLevel === 'exam' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="glass rounded-2xl p-6 border border-amber-500/20"
                    >
                      <h4 className="font-semibold text-amber-300 mb-3 flex items-center gap-2">
                        <Lightbulb className="h-4 w-4" /> Exam Strategy
                      </h4>
                      <ul className="space-y-2 text-sm text-white/50">
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 mt-0.5 text-amber-400 flex-shrink-0" />
                          Focus on diagram-based questions — they carry the most marks
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 mt-0.5 text-amber-400 flex-shrink-0" />
                          Always label axes, curves, equilibrium points, and shaded areas
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 mt-0.5 text-amber-400 flex-shrink-0" />
                          Show all working for calculation questions
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="h-4 w-4 mt-0.5 text-amber-400 flex-shrink-0" />
                          Use the midpoint formula for elasticity — not simple percentage change
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </div>
              )}
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
                <Link key={quiz.name} to="/quiz">
                  <div className="glass-hover rounded-2xl p-6 group cursor-pointer">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <quiz.icon className="h-6 w-6 text-indigo-400" />
                    </div>
                    <div className="font-semibold text-white mb-1">{quiz.name}</div>
                    <div className="text-sm text-white/40 mb-4">{quiz.desc}</div>
                    <div className="w-full py-2.5 rounded-xl border border-white/10 text-sm font-medium text-white/60 text-center group-hover:text-white group-hover:border-indigo-500/50 group-hover:bg-indigo-500/10 transition-all">
                      Start
                    </div>
                  </div>
                </Link>
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
