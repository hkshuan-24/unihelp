import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Target, TrendingUp, AlertTriangle, BookOpen, Calendar, Brain, BarChart3, Zap, ArrowUpRight, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { sampleSubject } from '../data';

/* Animated counter */
function AnimatedCounter({ value, suffix = '', prefix = '' }: { value: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    const duration = 1500;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start * 10) / 10);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref}>{prefix}{count.toFixed(1)}{suffix}</span>;
}

/* Glass card component */
function GlassCard({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`glass rounded-2xl p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* Grade card */
function GradeCard({ label, value, sub, icon: Icon, highlight = false, delay = 0 }: any) {
  return (
    <GlassCard delay={delay} className={highlight ? 'border-indigo-500/30' : ''}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-white/40">{label}</span>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${highlight ? 'bg-indigo-500/20' : 'bg-white/5'}`}>
          <Icon className={`h-4 w-4 ${highlight ? 'text-indigo-400' : 'text-white/40'}`} />
        </div>
      </div>
      <div className={`text-3xl font-bold ${highlight ? 'gradient-text' : 'text-white'}`}>{value}</div>
      <div className="text-xs text-white/30 mt-1">{sub}</div>
    </GlassCard>
  );
}

/* Custom tooltip for charts */
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="glass rounded-xl p-3 border border-white/10">
        <p className="text-sm font-medium text-white">{label}</p>
        <p className="text-lg font-bold gradient-text">{payload[0].value}%</p>
      </div>
    );
  }
  return null;
}

export default function Dashboard() {
  const currentWeighted = 37.8;
  const target = 80;
  const requiredFinal = 84.4;
  const predictedExam = '77-81%';

  const masteryData = Object.entries(sampleSubject.mastery).map(([topic, score]) => ({
    topic, score,
    fill: score >= 80 ? '#22c55e' : score >= 60 ? '#f59e0b' : '#ef4444',
  }));

  return (
    <div className="min-h-screen bg-[#06060a]">
      {/* Header */}
      <nav className="nav-glass sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg text-white">GradePath</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/subject/ecc1000" className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all">
              <BookOpen className="h-4 w-4" /> My Subjects
            </Link>
            <Link to="/tutor" className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all">
              <Brain className="h-4 w-4" /> Grade Coach
            </Link>
            <Link to="/planner" className="btn-primary text-sm py-2 px-4 flex items-center gap-2">
              <Calendar className="h-4 w-4" /> Study Planner
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Your Dashboard</h1>
          <p className="text-white/40">Bachelor of Commerce, Year 1, Semester 1</p>
        </motion.div>

        {/* Grade Engine Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <GradeCard label="Current Weighted" value={<AnimatedCounter value={currentWeighted} suffix="/50" />} sub="of 50% so far" icon={Target} delay={0} />
          <GradeCard label="Target" value={<AnimatedCounter value={target} suffix="%" />} sub="Overall goal" icon={TrendingUp} delay={0.1} />
          <GradeCard label="Required Final" value={<AnimatedCounter value={requiredFinal} suffix="%" />} sub="Needed on final exam" icon={Target} highlight delay={0.2} />
          <GradeCard label="Predicted Exam" value={predictedExam} sub="Based on current mastery" icon={BarChart3} delay={0.3} />
        </div>

        {/* Warning Banner */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass rounded-2xl p-5 mb-8 border border-amber-500/20 flex items-center gap-4 glow-warning"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <div className="font-semibold text-amber-300">Below GradePath Trajectory</div>
            <div className="text-sm text-white/50">Your predicted exam range ({predictedExam}) is below what you need ({requiredFinal}%). Focus on elasticity and tax incidence.</div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Mastery Map */}
          <GlassCard className="lg:col-span-2" delay={0.5}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-indigo-400" /> Mastery Map — ECC1000
              </h2>
              <span className="badge-glow">Live</span>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={masteryData} layout="vertical" barSize={20}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis type="number" domain={[0, 100]} stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} />
                  <YAxis dataKey="topic" type="category" width={130} tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                  <Bar dataKey="score" radius={[0, 6, 6, 0]}>{masteryData.map((e, i) => <Cell key={i} fill={e.fill} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-6 mt-4 justify-center text-sm">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500 glow-success" /><span className="text-white/50">Strong (≥80%)</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-amber-500 glow-warning" /><span className="text-white/50">Developing (60-79%)</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500 glow-danger" /><span className="text-white/50">Weak (&lt;60%)</span></div>
            </div>
          </GlassCard>

          {/* Assessments */}
          <GlassCard delay={0.6}>
            <h2 className="text-lg font-bold text-white mb-6">Assessments</h2>
            <div className="space-y-5">
              {sampleSubject.assessments.map((a, i) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <div className="font-medium text-white text-sm">{a.name}</div>
                      <div className="text-xs text-white/30">Weight: {a.weight}%</div>
                    </div>
                    {a.result ? (
                      <span className={`badge ${a.result >= 70 ? 'badge-success' : 'badge-glow'}`}>{a.result}%</span>
                    ) : (
                      <span className="badge-glow text-white/50">Pending</span>
                    )}
                  </div>
                  {a.result && (
                    <div className="progress-bar h-1.5">
                      <motion.div
                        className="progress-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${a.result}%` }}
                        transition={{ duration: 1, delay: 0.8 + i * 0.1 }}
                      />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
            <div className="pt-5 border-t border-white/5 mt-5">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-white text-sm">Overall Progress</span>
                <span className="text-sm text-white/30">50% complete</span>
              </div>
              <div className="progress-bar h-2">
                <motion.div
                  className="progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: '50%' }}
                  transition={{ duration: 1.5, delay: 1 }}
                />
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Subject Quick Access */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8"
        >
          <h2 className="text-xl font-bold text-white mb-4">Your Subjects</h2>
          <Link to="/subject/ecc1000">
            <div className="glass-hover rounded-2xl p-6 max-w-md group">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-semibold text-lg text-white">{sampleSubject.name}</div>
                  <div className="text-sm text-white/30">{sampleSubject.code}</div>
                </div>
                <span className="badge-success">Active</span>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/50">Average Mastery</span>
                  <span className="font-medium text-white">68%</span>
                </div>
                <div className="progress-bar h-2">
                  <div className="progress-fill" style={{ width: '68%' }} />
                </div>
              </div>
              <div className="mt-4 text-sm text-indigo-400 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                View Subject <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-8 grid md:grid-cols-3 gap-4"
        >
          {[
            { icon: Zap, title: 'Quick Quiz', desc: '5-min diagnostic', to: '/quiz', color: 'from-amber-500/20 to-orange-500/20' },
            { icon: Brain, title: 'Ask AI', desc: 'Grade Coach', to: '/tutor', color: 'from-indigo-500/20 to-purple-500/20' },
            { icon: Clock, title: 'Study Plan', desc: 'This week', to: '/planner', color: 'from-green-500/20 to-emerald-500/20' },
          ].map((action) => (
            <Link key={action.title} to={action.to}>
              <div className="glass-hover rounded-2xl p-5 flex items-center gap-4 group">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <action.icon className="h-6 w-6 text-white/80" />
                </div>
                <div>
                  <div className="font-semibold text-white">{action.title}</div>
                  <div className="text-sm text-white/40">{action.desc}</div>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
