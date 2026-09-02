import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Send, User, GraduationCap, Lightbulb, HelpCircle, Sparkles, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const suggestedQuestions = [
  'Why does deadweight loss increase?',
  'Explain elasticity with an analogy',
  'Show me a graph of tax incidence',
  'What is the difference between consumer and producer surplus?',
  'Quiz me on market structures',
];

const aiResponses: Record<string, string> = {
  'Why does deadweight loss increase?':
    'Deadweight loss increases when the gap between equilibrium quantity and the new quantity grows. This happens with larger taxes because they push the market further from its efficient outcome. The more quantity deviates from the competitive equilibrium, the more trades that would have benefited both buyer and seller do not happen.',
  default:
    'Great question. Let me break this down for your current subject context (ECC1000 Microeconomics).\n\nThe key concept is that markets are efficient when marginal benefit equals marginal cost. Any intervention that moves quantity away from this equilibrium creates deadweight loss. The size depends on how sensitive supply and demand are to price changes — in other words, the elasticities.',
};

function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
        <Brain className="h-4 w-4 text-white" />
      </div>
      <div className="msg-assistant p-4 rounded-2xl rounded-bl-sm">
        <div className="flex gap-1.5">
          <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity }} className="w-2 h-2 rounded-full bg-white/40" />
          <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }} className="w-2 h-2 rounded-full bg-white/40" />
          <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }} className="w-2 h-2 rounded-full bg-white/40" />
        </div>
      </div>
    </div>
  );
}

export default function Tutor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "I'm your Grade Coach. I know you're studying ECC1000 Principles of Microeconomics at Monash. What would you like to explore today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [dontGetItCount, setDontGetItCount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponses[text] || aiResponses['default'],
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const handleDontGetIt = () => {
    setDontGetItCount(prev => prev + 1);
    const explanations = [
      'Let me try a different approach. Think of deadweight loss like a missed opportunity — trades that should have happened but did not because of the tax.',
      'Imagine a $10 tax on coffee. If you value a cup at $8 and the seller costs $6, normally you would trade at $7. But with the tax, the minimum price becomes $16. That trade never happens — that is deadweight loss.',
      'Step by step: 1) Start at equilibrium Q*, P*. 2) Add tax t. 3) Quantity falls to Qt. 4) The triangle between Q* and Qt is DWL. The base is (Q* - Qt), height is t.',
      'Analogy: Deadweight loss is like a toll bridge that costs more than the trip is worth. Some people stay home even though they would benefit from crossing — the benefit is lost to everyone.',
    ];
    const msg: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: explanations[Math.min(dontGetItCount, explanations.length - 1)],
    };
    setMessages(prev => [...prev, msg]);
  };

  return (
    <div className="min-h-screen bg-[#06060a] flex flex-col">
      {/* Header */}
      <nav className="nav-glass">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center hover:rotate-12 transition-transform">
              <GraduationCap className="h-4 w-4 text-white" />
            </Link>
            <div>
              <div className="font-semibold text-white">Grade Coach</div>
              <div className="text-xs text-white/30">ECC1000 · Microeconomics</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-white/30">Online</span>
          </div>
        </div>
      </nav>

      {/* Messages */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 py-6 space-y-6 h-[calc(100vh-180px)] overflow-y-auto">
          <AnimatePresence>
            {messages.map(msg => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <Brain className="h-4 w-4 text-white" />
                  </div>
                )}
                <div className={`max-w-[80%] p-4 rounded-2xl ${msg.role === 'user' ? 'msg-user rounded-br-sm' : 'msg-assistant rounded-bl-sm'}`}>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</div>
                  {msg.role === 'assistant' && (
                    <div className="mt-3 flex gap-2 flex-wrap">
                      <button onClick={handleDontGetIt} className="text-xs px-3 py-1.5 rounded-full border border-white/10 hover:bg-white/5 transition-all flex items-center gap-1 text-white/50 hover:text-white">
                        <HelpCircle className="h-3 w-3" /> I still don't get it
                      </button>
                      <button className="text-xs px-3 py-1.5 rounded-full border border-white/10 hover:bg-white/5 transition-all flex items-center gap-1 text-white/50 hover:text-white">
                        <Lightbulb className="h-3 w-3" /> Show visually
                      </button>
                    </div>
                  )}
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-white/60" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && <TypingIndicator />}
          <div ref={scrollRef} />
        </div>
      </div>

      {/* Suggested Questions */}
      {messages.length <= 2 && (
        <div className="max-w-4xl mx-auto px-6 pb-2">
          <div className="text-xs text-white/30 mb-2 flex items-center gap-1">
            <Sparkles className="h-3 w-3" /> Suggested questions
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map(q => (
              <button key={q} onClick={() => sendMessage(q)} className="text-xs px-4 py-2 glass rounded-full hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all text-white/50 hover:text-white">
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-white/5 bg-[#06060a]/80 backdrop-blur-xl p-4">
        <div className="max-w-4xl mx-auto flex gap-2">
          <input
            placeholder="Ask your Grade Coach anything..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
            className="input-glass flex-1"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim()}
            className="px-5 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] transition-all disabled:opacity-30 disabled:hover:shadow-none"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
