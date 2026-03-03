import { Coins } from 'lucide-react';

interface NavbarProps {
  currentSection: string;
  onNavigate: (section: 'landing' | 'pricing' | 'games') => void;
}

export default function Navbar({ currentSection, onNavigate }: NavbarProps) {
  return (
    <nav className="bg-black border-b border-red-600 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('landing')}>
            <Coins className="h-8 w-8 text-yellow-500" />
            <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-yellow-500 to-red-600 bg-clip-text text-transparent">
              Royal Casino
            </span>
          </div>

          <div className="flex space-x-8">
            <button
              onClick={() => onNavigate('landing')}
              className={`px-4 py-2 rounded transition-all ${
                currentSection === 'landing'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-red-600/20'
              }`}
            >
              Inicio
            </button>
            <button
              onClick={() => onNavigate('pricing')}
              className={`px-4 py-2 rounded transition-all ${
                currentSection === 'pricing'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-red-600/20'
              }`}
            >
              Precios
            </button>
            <button
              onClick={() => onNavigate('games')}
              className={`px-4 py-2 rounded transition-all ${
                currentSection === 'games'
                  ? 'bg-red-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-red-600/20'
              }`}
            >
              Juegos
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
