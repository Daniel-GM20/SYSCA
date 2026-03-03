import { useState } from 'react';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Pricing from './components/Pricing';
import Games from './components/Games';

function App() {
  const [currentSection, setCurrentSection] = useState<'landing' | 'pricing' | 'games'>('landing');

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar currentSection={currentSection} onNavigate={setCurrentSection} />

      {currentSection === 'landing' && <Landing onNavigate={setCurrentSection} />}
      {currentSection === 'pricing' && <Pricing />}
      {currentSection === 'games' && <Games />}
    </div>
  );
}

export default App;
