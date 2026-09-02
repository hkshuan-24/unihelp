import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Brain, Target, BarChart3, BookOpen, Calendar, Zap, ChevronRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

/* Reusable animation wrapper */
function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Floating orb background component */
function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[120px] animate-blob" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/8 blur-[100px] animate-blob" style={{ animationDelay: '-5s' }} />
      <div className="absolute top-[40%] left-[60%] w-[400px] h-[400px] rounded-full bg-pink-600/5 blur-[80px] animate-blob" style={{ animationDelay: '-10s' }} />
    </div>
  );
}

/* Feature card with 3D tilt */
function FeatureCard({ icon: Icon, title, desc, delay }: { icon: any; title: string; desc: string; delay: number }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => setMousePos({ x: 0, y: 0 });

  return (
    <Reveal delay={delay}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="glass-hover p-8 rounded-2xl perspective-1000 cursor-pointer group"
        style={{
          transform: `perspective(1000px) rotateX(${-mousePos.y}deg) rotateY(${mousePos.x}deg)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <Icon className="h-7 w-7 text-indigo-400" />
        </div>
        <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
        <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
      </div>
    </Reveal>
  );
}

/* Stat counter */
function StatCounter({ value, label }: { value: string; label: string }) {
  return (
    <Reveal>
      <div className="text-center">
        <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">{value}</div>
        <div className="text-white/40 text-sm uppercase tracking-wider">{label}</div>
      </div>
    </Reveal>
  );
}

export default function Landing() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  /* Custom cursor glow */
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#06060a] relative">
      {/* Custom cursor glow - desktop only */}
      <div
        className="fixed w-[400px] h-[400px] rounded-full pointer-events-none z-50 hidden lg:block"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
          transform: `translate(${cursorPos.x - 200}px, ${cursorPos.y - 200}px)`,
          transition: 'transform 0.15s ease-out',
        }}
      />

      <FloatingOrbs />

      {/* Nav */}
      <nav className="nav-glass fixed top-0 left-0 right-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg text-white">GradePath</span>
            <span className="hidden md:block text-xs text-white/30 px-2 py-0.5 border border-white/10 rounded-full">AI</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="hidden md:flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
              Demo <ArrowUpRight className="h-3 w-3" />
            </Link>
            <Link to="/onboarding" className="btn-primary text-sm py-2.5 px-5">
              <span>Get Started</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
      >
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
              <Sparkles className="h-4 w-4 text-indigo-400" />
              <span className="text-sm text-white/70">Built for Monash & UniMelb students</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="section-title text-5xl md:text-7xl lg:text-8xl mb-6 text-balance"
          >
            Your Academic{' '}
            <span className="gradient-text">Navigation</span>
            <br />
            System
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Know exactly where you are, where you want to be, and what to do each week
            to reach your target grade. AI-powered grade forecasting for serious students.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/onboarding" className="btn-primary flex items-center justify-center gap-2 group">
              <span>Start Your Journey</span>
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/dashboard" className="btn-secondary flex items-center justify-center gap-2">
              <span>View Demo Dashboard</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
          >
            <StatCounter value="94%" label="Grade Accuracy" />
            <StatCounter value="12K+" label="Students" />
            <StatCounter value="340+" label="Topics" />
            <StatCounter value="6" label="Weeks to Exam" />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-white/60"
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Features */}
      <section className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center mb-20">
            <span className="text-sm text-indigo-400 uppercase tracking-widest font-semibold mb-4 block">Capabilities</span>
            <h2 className="section-title mb-4">Everything You Need to Succeed</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Not just notes or flashcards. A complete system that understands your degree.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard icon={Brain} title="AI Grade Coach" desc="Personal AI tutor that knows your subjects, progress, and targets. Context is automatic." delay={0} />
            <FeatureCard icon={Target} title="Grade Engine" desc="Real-time grade forecasting. See predicted results and exactly what's holding you back." delay={0.1} />
            <FeatureCard icon={BarChart3} title="Mastery Maps" desc="Visual overview of every topic. Instantly see what you know vs what you think you know." delay={0.2} />
            <FeatureCard icon={Calendar} title="Smart Study Planner" desc="Adaptive schedules that repair themselves when you miss a session." delay={0.3} />
            <FeatureCard icon={BookOpen} title="Deep Notes" desc="Multiple explanation levels: Quick, Standard, Deep, and Exam-focused." delay={0.4} />
            <FeatureCard icon={Zap} title="Visual Learning" desc="AI-generated diagrams, mind maps, graphs, and infographics." delay={0.5} />
          </div>
        </div>
      </section>

      {/* How It Works - Horizontal Steps */}
      <section className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center mb-20">
            <span className="text-sm text-indigo-400 uppercase tracking-widest font-semibold mb-4 block">Process</span>
            <h2 className="section-title mb-4">How GradePath Works</h2>
          </Reveal>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Onboard', desc: 'Select your university, degree, major, and current subjects.' },
              { step: '02', title: 'Set Targets', desc: 'Tell us your desired grade for each subject.' },
              { step: '03', title: 'Diagnostic', desc: 'Take adaptive tests to map your current mastery.' },
              { step: '04', title: 'Follow Your Path', desc: 'Get personalised weekly plans that adapt as you progress.' },
            ].map((item, i) => (
              <Reveal key={item.step} delay={i * 0.15}>
                <div className="relative">
                  <div className="text-7xl font-bold text-white/[0.03] mb-4">{item.step}</div>
                  <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                  {i < 3 && (
                    <div className="hidden md:block absolute top-8 right-0 w-full h-px bg-gradient-to-r from-white/10 to-transparent" />
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl p-12 md:p-16 text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-pink-600/20" />
              <div className="absolute inset-0 glass" />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
                  Ready to Take Control of Your <span className="gradient-text">Grades?</span>
                </h2>
                <p className="text-white/50 mb-10 max-w-lg mx-auto">
                  Join thousands of students at Monash and University of Melbourne who use GradePath to stay ahead.
                </p>
                <Link to="/onboarding" className="btn-primary inline-flex items-center gap-2 group">
                  <span>Get Started Free</span>
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.06] py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <GraduationCap className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-white">GradePath AI</span>
          </div>
          <p className="text-sm text-white/30">For Monash & UniMelb students</p>
        </div>
      </footer>
    </div>
  );
}
