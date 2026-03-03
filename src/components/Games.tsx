import { useState } from 'react';
import { Dices, Cherry, Grid3x3 } from 'lucide-react';
import Roulette from './games/Roulette';
import SlotMachine from './games/SlotMachine';
import Bingo from './games/Bingo';

export default function Games() {
  const [selectedGame, setSelectedGame] = useState<'roulette' | 'slots' | 'bingo' | null>(null);

  if (selectedGame === 'roulette') {
    return <Roulette onBack={() => setSelectedGame(null)} />;
  }

  if (selectedGame === 'slots') {
    return <SlotMachine onBack={() => setSelectedGame(null)} />;
  }

  if (selectedGame === 'bingo') {
    return <Bingo onBack={() => setSelectedGame(null)} />;
  }

  return (
    <div className="min-h-screen py-20 bg-gradient-to-b from-black via-red-950/20 to-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-500 to-red-500 bg-clip-text text-transparent">
            Nuestros Juegos
          </h1>
          <p className="text-xl text-gray-400">
            Elige tu juego favorito y comienza a ganar
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div
            onClick={() => setSelectedGame('roulette')}
            className="group bg-gradient-to-br from-gray-900 to-black border border-red-600/30 rounded-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all hover:border-red-600"
          >
            <div className="h-48 bg-gradient-to-br from-red-900/30 to-black flex items-center justify-center">
              <Dices className="h-24 w-24 text-yellow-500 group-hover:rotate-12 transition-transform" />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-2">Ruleta</h3>
              <p className="text-gray-400 mb-4">
                Apuesta al rojo, negro o números específicos. ¡La emoción clásica del casino!
              </p>
              <div className="flex items-center justify-between">
                <span className="text-yellow-500 font-semibold">Jugar Ahora</span>
                <span className="text-sm text-gray-500">Categoría: Ruletas</span>
              </div>
            </div>
          </div>

          <div
            onClick={() => setSelectedGame('slots')}
            className="group bg-gradient-to-br from-gray-900 to-black border border-red-600/30 rounded-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all hover:border-red-600"
          >
            <div className="h-48 bg-gradient-to-br from-yellow-900/30 to-black flex items-center justify-center">
              <Cherry className="h-24 w-24 text-red-500 group-hover:scale-110 transition-transform" />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-2">Tragamonedas</h3>
              <p className="text-gray-400 mb-4">
                Gira los rodillos y consigue combinaciones ganadoras. ¡Jackpot te espera!
              </p>
              <div className="flex items-center justify-between">
                <span className="text-yellow-500 font-semibold">Jugar Ahora</span>
                <span className="text-sm text-gray-500">Categoría: Slots</span>
              </div>
            </div>
          </div>

          <div
            onClick={() => setSelectedGame('bingo')}
            className="group bg-gradient-to-br from-gray-900 to-black border border-red-600/30 rounded-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all hover:border-red-600"
          >
            <div className="h-48 bg-gradient-to-br from-red-900/30 to-black flex items-center justify-center">
              <Grid3x3 className="h-24 w-24 text-yellow-500 group-hover:rotate-6 transition-transform" />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-2">Bingo</h3>
              <p className="text-gray-400 mb-4">
                Marca tus números y grita ¡BINGO! Diversión garantizada para todos.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-yellow-500 font-semibold">Jugar Ahora</span>
                <span className="text-sm text-gray-500">Categoría: Bingo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
