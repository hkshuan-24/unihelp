import { HashRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Subject from './pages/Subject';
import Tutor from './pages/Tutor';
import Planner from './pages/Planner';
import Quiz from './pages/Quiz';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/subject/:id" element={<Subject />} />
        <Route path="/tutor" element={<Tutor />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
