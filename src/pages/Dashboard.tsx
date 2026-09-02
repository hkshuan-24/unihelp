import { Link } from 'react-router-dom';
import { GraduationCap, Target, TrendingUp, AlertTriangle, BookOpen, Calendar, Brain, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { sampleSubject } from '../data';

const masteryData = Object.entries(sampleSubject.mastery).map(([topic, score]) => ({
  topic, score,
  fill: score >= 80 ? '#22c55e' : score >= 60 ? '#f59e0b' : '#ef4444',
}));

export default function Dashboard() {
  const currentWeighted = 37.8;
  const target = 80;
  const requiredFinal = 84.4;
  const predictedExam = '77-81%';

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <nav className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-indigo-600" />
            <span className="font-bold text-xl">GradePath AI</span>
          </div>
          <div className="flex gap-3">
            <Link to="/subject/ecc1000" className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-slate-50 flex items-center gap-2"><BookOpen className="h-4 w-4" /> My Subjects</Link>
            <Link to="/tutor" className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-slate-50 flex items-center gap-2"><Brain className="h-4 w-4" /> Grade Coach</Link>
            <Link to="/planner" className="btn-primary text-sm flex items-center gap-2"><Calendar className="h-4 w-4" /> Study Planner</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Dashboard</h1>
          <p className="text-slate-500">Bachelor of Commerce, Year 1, Semester 1</p>
        </div>

        {/* Grade Engine Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Current Weighted', value: `${currentWeighted}/50`, sub: 'of 50% so far', icon: Target },
            { label: 'Target', value: `${target}%`, sub: 'Overall goal', icon: TrendingUp },
            { label: 'Required Final', value: `${requiredFinal}%`, sub: 'Needed on final exam', icon: Target, highlight: true },
            { label: 'Predicted Exam', value: predictedExam, sub: 'Based on current mastery', icon: BarChart3 },
          ].map(card => (
            <div key={card.label} className="card">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-500">{card.label}</span>
                <card.icon className="h-4 w-4 text-slate-400" />
              </div>
              <div className={`text-3xl font-bold ${card.highlight ? 'text-indigo-600' : ''}`}>{card.value}</div>
              <div className="text-xs text-slate-400">{card.sub}</div>
            </div>
          ))}
        </div>

        {/* Warning Banner */}
        <div className="card border-amber-200 bg-amber-50 mb-8 flex items-center gap-4">
          <AlertTriangle className="h-6 w-6 text-amber-600" />
          <div>
            <div className="font-semibold text-amber-800">Below GradePath Trajectory</div>
            <div className="text-sm text-amber-700">Your predicted exam range ({predictedExam}) is below what you need ({requiredFinal}%). Focus on elasticity and tax incidence.</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Mastery Map */}
          <div className="lg:col-span-2 card">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><BarChart3 className="h-5 w-5" /> Mastery Map - ECC1000</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={masteryData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="topic" type="category" width={120} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="score" radius={[0, 4, 4, 0]}>{masteryData.map((e, i) => <Cell key={i} fill={e.fill} />)}</Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-4 mt-4 justify-center text-sm">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500" /><span>Strong (≥80%)</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-amber-500" /><span>Developing (60-79%)</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500" /><span>Weak (&lt;60%)</span></div>
            </div>
          </div>

          {/* Assessments */}
          <div className="card">
            <h2 className="text-lg font-bold mb-4">Assessments</h2>
            <div className="space-y-4">
              {sampleSubject.assessments.map(a => (
                <div key={a.id}>
                  <div className="flex justify-between items-center mb-1">
                    <div>
                      <div className="font-medium">{a.name}</div>
                      <div className="text-sm text-slate-500">Weight: {a.weight}%</div>
                    </div>
                    {a.result ? (
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${a.result >= 70 ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'}`}>{a.result}%</span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium border">Pending</span>
                    )}
                  </div>
                  {a.result && <div className="progress-bar"><div className="progress-fill bg-indigo-600" style={{ width: `${a.result}%` }} /></div>}
                </div>
              ))}
            </div>
            <div className="pt-4 border-t mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Overall Progress</span>
                <span className="text-sm text-slate-500">50% complete</span>
              </div>
              <div className="progress-bar h-3"><div className="progress-fill bg-indigo-600" style={{ width: '50%' }} /></div>
            </div>
          </div>
        </div>

        {/* Subject Quick Access */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Your Subjects</h2>
          <Link to="/subject/ecc1000">
            <div className="card-hover max-w-md">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-semibold text-lg">{sampleSubject.name}</div>
                  <div className="text-sm text-slate-500">{sampleSubject.code}</div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Active</span>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1"><span>Average Mastery</span><span className="font-medium">68%</span></div>
                <div className="progress-bar"><div className="progress-fill bg-indigo-600" style={{ width: '68%' }} /></div>
              </div>
              <div className="mt-4 text-sm text-indigo-600 font-medium">View Subject →</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
