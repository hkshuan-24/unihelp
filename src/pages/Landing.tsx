import { Link } from 'react-router-dom';
import { GraduationCap, Brain, Target, BarChart3, BookOpen, Calendar, Zap, ChevronRight } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Nav */}
      <nav className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-indigo-600" />
            <span className="font-bold text-xl text-slate-900">GradePath AI</span>
          </div>
          <Link to="/onboarding" className="btn-primary">Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6 text-slate-900">
            Your Academic <span className="text-indigo-600">Navigation System</span>
          </h1>
          <p className="text-lg text-slate-500 mb-8">
            Know exactly where you are, where you want to be, and what to do each week to reach your target grade.
            Built for Monash and University of Melbourne students.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/onboarding" className="btn-primary flex items-center gap-2">
              Start Your Journey <ChevronRight className="h-4 w-4" />
            </Link>
            <Link to="/dashboard" className="btn-secondary">View Demo Dashboard</Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Everything You Need to Succeed</h2>
            <p className="section-subtitle">Not just notes or flashcards. A complete system that understands your degree.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Brain, title: "AI Grade Coach", desc: "Personal AI tutor that knows your subjects, progress, and targets. Context is automatic." },
              { icon: Target, title: "Grade Engine", desc: "Real-time grade forecasting. See predicted results and exactly what's holding you back." },
              { icon: BarChart3, title: "Mastery Maps", desc: "Visual overview of every topic. Instantly see what you know vs what you think you know." },
              { icon: Calendar, title: "Smart Study Planner", desc: "Adaptive schedules that repair themselves when you miss a session." },
              { icon: BookOpen, title: "Deep Notes", desc: "Multiple explanation levels: Quick, Standard, Deep, and Exam-focused." },
              { icon: Zap, title: "Visual Learning", desc: "AI-generated diagrams, mind maps, graphs, and infographics." },
            ].map((f) => (
              <div key={f.title} className="card-hover">
                <f.icon className="h-10 w-10 text-indigo-600 mb-4" />
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="section-title text-center mb-12">How GradePath Works</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { step: "01", title: "Onboard", desc: "Select your university, degree, major, and current subjects." },
              { step: "02", title: "Set Targets", desc: "Tell us your desired grade for each subject." },
              { step: "03", title: "Diagnostic", desc: "Take adaptive tests to map your current mastery." },
              { step: "04", title: "Follow Your Path", desc: "Get personalised weekly plans that adapt as you progress." },
            ].map((item) => (
              <div key={item.step}>
                <div className="text-5xl font-bold text-slate-200 mb-4">{item.step}</div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-indigo-600 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Take Control of Your Grades?</h2>
          <p className="text-indigo-100 mb-8">Join students at Monash and University of Melbourne.</p>
          <Link to="/onboarding" className="inline-block px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
            Get Started Free <ChevronRight className="h-4 w-4 inline" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-white">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-slate-600" />
            <span className="font-semibold text-slate-900">GradePath AI</span>
          </div>
          <p className="text-sm text-slate-500">For Monash & UniMelb students</p>
        </div>
      </footer>
    </div>
  );
}
