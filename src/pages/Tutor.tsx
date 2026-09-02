import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Send, User, GraduationCap, Lightbulb, HelpCircle } from 'lucide-react';

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

export default function Tutor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content:
        "I'm your Grade Coach. I know you're studying ECC1000 Principles of Microeconomics at Monash. What would you like to explore today?",
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
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <nav className="border-b bg-white">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard"><GraduationCap className="h-6 w-6 text-indigo-600" /></Link>
            <div>
              <div className="font-semibold">Grade Coach</div>
              <div className="text-xs text-slate-500">ECC1000 · Microeconomics</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xs text-slate-500">Online</span>
          </div>
        </div>
      </nav>

      {/* Messages */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 h-[calc(100vh-180px)] overflow-y-auto">
          {messages.map(msg => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
                  <Brain className="h-4 w-4 text-white" />
                </div>
              )}
              <div className={`max-w-[80%] p-4 rounded-2xl ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-br-sm' : 'bg-white border rounded-bl-sm'}`}>
                <div className="whitespace-pre-wrap text-sm">{msg.content}</div>
                {msg.role === 'assistant' && (
                  <div className="mt-3 flex gap-2">
                    <button onClick={handleDontGetIt} className="text-xs px-3 py-1.5 border rounded-full hover:bg-slate-50 flex items-center gap-1">
                      <HelpCircle className="h-3 w-3" /> I still don't get it
                    </button>
                    <button className="text-xs px-3 py-1.5 border rounded-full hover:bg-slate-50 flex items-center gap-1">
                      <Lightbulb className="h-3 w-3" /> Show visually
                    </button>
                  </div>
                )}
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                <Brain className="h-4 w-4 text-white" />
              </div>
              <div className="bg-white border p-4 rounded-2xl rounded-bl-sm">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce delay-100" />
                  <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </div>

      {/* Suggested Questions */}
      {messages.length <= 2 && (
        <div className="max-w-4xl mx-auto px-4 pb-2">
          <div className="text-xs text-slate-500 mb-2">Suggested questions:</div>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map(q => (
              <button key={q} onClick={() => sendMessage(q)} className="text-xs px-3 py-1.5 bg-white border rounded-full hover:bg-indigo-50 transition-colors">
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t bg-white p-4">
        <div className="max-w-4xl mx-auto flex gap-2">
          <input
            placeholder="Ask your Grade Coach anything..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
            className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button onClick={() => sendMessage(input)} disabled={!input.trim()} className="px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
