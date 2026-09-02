import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, ChevronRight, ChevronLeft } from 'lucide-react';
import { universities } from '../data';

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [uni, setUni] = useState('');
  const [degree, setDegree] = useState('');
  const [major, setMajor] = useState('');
  const navigate = useNavigate();

  const selectedUni = universities.find(u => u.id === uni);
  const selectedDegree = selectedUni?.degrees.find(d => d.id === degree);

  const steps = ['University', 'Degree & Major', 'Year & Semester', 'Subjects', 'Targets'];

  const handleComplete = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="border-b bg-white">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-indigo-600" />
          <span className="font-bold text-xl">GradePath AI</span>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((s, i) => (
              <div key={s} className={`text-xs font-medium ${i <= step ? 'text-indigo-600' : 'text-slate-400'}`}>{s}</div>
            ))}
          </div>
          <div className="progress-bar">
            <div className="progress-fill bg-indigo-600" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
          </div>
        </div>

        {/* Step 0: University */}
        {step === 0 && (
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Select Your University</h2>
            <div className="space-y-3">
              {universities.map(u => (
                <button key={u.id} onClick={() => setUni(u.id)}
                  className={`w-full p-4 rounded-lg border text-left transition-all ${uni === u.id ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200 hover:border-indigo-300'}`}>
                  <div className="font-semibold">{u.name}</div>
                  <div className="text-sm text-slate-500">{u.campus}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Degree & Major */}
        {step === 1 && (
          <div className="card space-y-4">
            <h2 className="text-xl font-bold">Select Degree & Major</h2>
            <div>
              <label className="block text-sm font-medium mb-2">Degree</label>
              <select value={degree} onChange={e => { setDegree(e.target.value); setMajor(''); }}
                className="w-full p-3 border rounded-lg">
                <option value="">Choose degree</option>
                {selectedUni?.degrees.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </div>
            {degree && (
              <div>
                <label className="block text-sm font-medium mb-2">Major</label>
                <select value={major} onChange={e => setMajor(e.target.value)} className="w-full p-3 border rounded-lg">
                  <option value="">Choose major</option>
                  {selectedDegree?.majors.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Year & Semester */}
        {step === 2 && (
          <div className="card space-y-4">
            <h2 className="text-xl font-bold">Year & Semester</h2>
            <div>
              <label className="block text-sm font-medium mb-2">Year</label>
              <select className="w-full p-3 border rounded-lg">
                <option>Year 1</option>
                <option>Year 2</option>
                <option>Year 3</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Semester</label>
              <select className="w-full p-3 border rounded-lg">
                <option>Semester 1</option>
                <option>Semester 2</option>
              </select>
            </div>
          </div>
        )}

        {/* Step 3: Subjects */}
        {step === 3 && (
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Your Subjects</h2>
            <p className="text-sm text-slate-500 mb-4">Pre-selected common subjects for your degree.</p>
            <div className="space-y-2">
              {selectedDegree?.coreSubjects.slice(0, 3).map(s => (
                <div key={s.id} className="p-3 border rounded-lg flex justify-between items-center">
                  <div>
                    <div className="font-medium">{s.name}</div>
                    <div className="text-sm text-slate-500">{s.code}</div>
                  </div>
                  <span className="text-sm text-green-600 font-medium">Selected</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Targets */}
        {step === 4 && (
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Set Your Targets</h2>
            <p className="text-sm text-slate-500 mb-4">What grades are you aiming for?</p>
            <div className="space-y-4">
              {selectedDegree?.coreSubjects.slice(0, 3).map(s => (
                <div key={s.id}>
                  <label className="block text-sm font-medium mb-2">{s.name} ({s.code})</label>
                  <div className="flex gap-2">
                    {['70', '75', '80', '85', '90'].map(t => (
                      <button key={t} className="px-4 py-2 border rounded-lg text-sm hover:border-indigo-600 hover:bg-indigo-50 transition-all">{t}%</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}
            className="px-4 py-2 border rounded-lg flex items-center gap-2 disabled:opacity-50">
            <ChevronLeft className="h-4 w-4" /> Back
          </button>
          {step < steps.length - 1 ? (
            <button onClick={() => setStep(step + 1)} disabled={!uni || (step === 1 && (!degree || !major))}
              className="btn-primary flex items-center gap-2 disabled:opacity-50">
              Next <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button onClick={handleComplete} className="btn-primary flex items-center gap-2">
              Launch Dashboard <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
