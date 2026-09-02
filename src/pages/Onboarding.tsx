import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, ChevronRight, ChevronLeft, Sparkles, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { universities } from '../data';

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex-1 flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
              i < current
                ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white'
                : i === current
                ? 'bg-white/10 text-white border border-indigo-500/50'
                : 'bg-white/5 text-white/30'
            }`}
          >
            {i < current ? <Check className="h-4 w-4" /> : i + 1}
          </div>
          {i < total - 1 && (
            <div className={`flex-1 h-0.5 rounded-full transition-all duration-500 ${i < current ? 'bg-gradient-to-r from-indigo-500 to-purple-600' : 'bg-white/10'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [uni, setUni] = useState('');
  const [degree, setDegree] = useState('');
  const [major, setMajor] = useState('');
  const [targets, setTargets] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const selectedUni = universities.find(u => u.id === uni);
  const selectedDegree = selectedUni?.degrees.find(d => d.id === degree);
  const steps = ['University', 'Degree & Major', 'Year & Semester', 'Subjects', 'Targets'];

  const handleComplete = () => navigate('/dashboard');

  const pageVariants = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  return (
    <div className="min-h-screen bg-[#06060a] flex flex-col">
      {/* Nav */}
      <nav className="nav-glass">
        <div className="max-w-2xl mx-auto px-6 h-16 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <GraduationCap className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-white">GradePath</span>
        </div>
      </nav>

      <div className="flex-1 max-w-2xl mx-auto px-6 py-12">
        <StepIndicator current={step} total={steps.length} />

        <AnimatePresence mode="wait">
          {/* Step 0: University */}
          {step === 0 && (
            <motion.div key="step0" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }}>
              <div className="glass rounded-2xl p-8">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-5 w-5 text-indigo-400" />
                  <span className="text-sm text-indigo-400 font-semibold">Step 1 of 5</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-6">Select Your University</h2>
                <div className="space-y-3">
                  {universities.map(u => (
                    <button
                      key={u.id}
                      onClick={() => setUni(u.id)}
                      className={`w-full p-5 rounded-xl border text-left transition-all duration-300 ${
                        uni === u.id
                          ? 'border-indigo-500/50 bg-indigo-500/10 shadow-[0_0_30px_rgba(99,102,241,0.2)]'
                          : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="font-semibold text-white text-lg">{u.name}</div>
                      <div className="text-sm text-white/40">{u.campus}</div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 1: Degree & Major */}
          {step === 1 && (
            <motion.div key="step1" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }}>
              <div className="glass rounded-2xl p-8 space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-5 w-5 text-indigo-400" />
                  <span className="text-sm text-indigo-400 font-semibold">Step 2 of 5</span>
                </div>
                <h2 className="text-2xl font-bold text-white">Select Degree & Major</h2>
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-3">Degree</label>
                  <select
                    value={degree}
                    onChange={e => { setDegree(e.target.value); setMajor(''); }}
                    className="input-glass"
                  >
                    <option value="" className="bg-[#0c0c14]">Choose degree</option>
                    {selectedUni?.degrees.map(d => <option key={d.id} value={d.id} className="bg-[#0c0c14]">{d.name}</option>)}
                  </select>
                </div>
                {degree && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <label className="block text-sm font-medium text-white/60 mb-3">Major</label>
                    <select value={major} onChange={e => setMajor(e.target.value)} className="input-glass">
                      <option value="" className="bg-[#0c0c14]">Choose major</option>
                      {selectedDegree?.majors.map(m => <option key={m} value={m} className="bg-[#0c0c14]">{m}</option>)}
                    </select>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 2: Year & Semester */}
          {step === 2 && (
            <motion.div key="step2" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }}>
              <div className="glass rounded-2xl p-8 space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-5 w-5 text-indigo-400" />
                  <span className="text-sm text-indigo-400 font-semibold">Step 3 of 5</span>
                </div>
                <h2 className="text-2xl font-bold text-white">Year & Semester</h2>
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-3">Year</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['Year 1', 'Year 2', 'Year 3'].map(y => (
                      <button key={y} className="p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all text-white font-medium">
                        {y}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/60 mb-3">Semester</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Semester 1', 'Semester 2'].map(s => (
                      <button key={s} className="p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all text-white font-medium">
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Subjects */}
          {step === 3 && (
            <motion.div key="step3" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }}>
              <div className="glass rounded-2xl p-8">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-5 w-5 text-indigo-400" />
                  <span className="text-sm text-indigo-400 font-semibold">Step 4 of 5</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Your Subjects</h2>
                <p className="text-sm text-white/40 mb-6">Pre-selected common subjects for your degree.</p>
                <div className="space-y-3">
                  {selectedDegree?.coreSubjects.slice(0, 3).map(s => (
                    <div key={s.id} className="p-4 rounded-xl border border-white/10 bg-white/[0.02] flex justify-between items-center">
                      <div>
                        <div className="font-medium text-white">{s.name}</div>
                        <div className="text-sm text-white/30">{s.code}</div>
                      </div>
                      <span className="badge-success">Selected</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Targets */}
          {step === 4 && (
            <motion.div key="step4" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.4 }}>
              <div className="glass rounded-2xl p-8">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-5 w-5 text-indigo-400" />
                  <span className="text-sm text-indigo-400 font-semibold">Step 5 of 5</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Set Your Targets</h2>
                <p className="text-sm text-white/40 mb-6">What grades are you aiming for?</p>
                <div className="space-y-6">
                  {selectedDegree?.coreSubjects.slice(0, 3).map(s => (
                    <div key={s.id}>
                      <label className="block text-sm font-medium text-white/60 mb-3">{s.name} ({s.code})</label>
                      <div className="flex gap-2">
                        {['70', '75', '80', '85', '90'].map(t => (
                          <button
                            key={t}
                            onClick={() => setTargets(prev => ({ ...prev, [s.id]: t }))}
                            className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
                              targets[s.id] === t
                                ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)]'
                                : 'border border-white/10 bg-white/[0.02] text-white/60 hover:border-white/20 hover:text-white'
                            }`}
                          >
                            {t}%
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="px-6 py-3 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all disabled:opacity-30 flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" /> Back
          </button>
          {step < steps.length - 1 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!uni || (step === 1 && (!degree || !major))}
              className="btn-primary flex items-center gap-2 disabled:opacity-30"
            >
              <span>Next</span> <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button onClick={handleComplete} className="btn-primary flex items-center gap-2">
              <span>Launch Dashboard</span> <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
