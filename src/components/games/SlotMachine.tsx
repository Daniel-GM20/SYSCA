import { useState } from 'react';
import { ArrowLeft, Coins, Cherry, Grape, Star, Gem } from 'lucide-react';

interface SlotMachineProps {
  onBack: () => void;
}

const symbols = [
  { icon: Cherry, name: 'cherry', color: 'text-red-500', multiplier: 2 },
  { icon: Grape, name: 'grape', color: 'text-purple-500', multiplier: 3 },
  { icon: Star, name: 'star', color: 'text-yellow-500', multiplier: 4 },
  { icon: Gem, name: 'gem', color: 'text-blue-400', multiplier: 10 },
];

export default function SlotMachine({ onBack }: SlotMachineProps) {
  const [balance, setBalance] = useState(1000);
  const [bet, setBet] = useState(10);
  const [spinning, setSpinning] = useState(false);
  const [reels, setReels] = useState([0, 1, 2]);
  const [message, setMessage] = useState('');

  const spin = () => {
    if (bet > balance) {
      setMessage('Saldo insuficiente');
      return;
    }

    setSpinning(true);
    setMessage('');
    setBalance(balance - bet);

    let spinCount = 0;
    const spinInterval = setInterval(() => {
      setReels([
        Math.floor(Math.random() * symbols.length),
        Math.floor(Math.random() * symbols.length),
        Math.floor(Math.random() * symbols.length),
      ]);
      spinCount++;

      if (spinCount >= 20) {
        clearInterval(spinInterval);

        const finalReels = [
          Math.floor(Math.random() * symbols.length),
          Math.floor(Math.random() * symbols.length),
          Math.floor(Math.random() * symbols.length),
        ];

        setReels(finalReels);
        setSpinning(false);

        if (finalReels[0] === finalReels[1] && finalReels[1] === finalReels[2]) {
          const winAmount = bet * symbols[finalReels[0]].multiplier;
          setBalance((prev) => prev + winAmount);
          setMessage(`¡JACKPOT! Ganaste $${winAmount}!`);
        } else if (finalReels[0] === finalReels[1] || finalReels[1] === finalReels[2] || finalReels[0] === finalReels[2]) {
          const winAmount = Math.floor(bet * 1.5);
          setBalance((prev) => prev + winAmount);
          setMessage(`¡Par! Ganaste $${winAmount}!`);
        } else {
          setMessage('Intenta de nuevo');
        }
      }
    }, 100);
  };

  return (
    <div className="min-h-screen py-10 bg-gradient-to-b from-black via-red-950/20 to-black">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-yellow-500 hover:text-yellow-400 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Volver a Juegos
        </button>

        <div className="bg-gradient-to-br from-gray-900 to-black border border-red-600/30 rounded-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-yellow-500">Tragamonedas</h2>
            <div className="flex items-center gap-2 text-2xl font-bold text-white">
              <Coins className="h-6 w-6 text-yellow-500" />
              ${balance}
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-900/30 to-yellow-900/30 rounded-xl p-8 mb-8 border-4 border-yellow-600 shadow-2xl">
            <div className="flex justify-center gap-4 mb-6">
              {reels.map((reelIndex, i) => {
                const Symbol = symbols[reelIndex].icon;
                return (
                  <div
                    key={i}
                    className="w-32 h-32 bg-white rounded-lg flex items-center justify-center shadow-xl transform transition-transform"
                    style={{
                      animation: spinning ? 'spin 0.1s linear infinite' : 'none',
                    }}
                  >
                    <Symbol className={`h-20 w-20 ${symbols[reelIndex].color}`} />
                  </div>
                );
              })}
            </div>

            {message && (
              <div className={`text-center text-xl font-bold py-3 rounded-lg ${
                message.includes('Ganaste') || message.includes('JACKPOT')
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-800 text-gray-300'
              }`}>
                {message}
              </div>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Monto de Apuesta</label>
            <input
              type="number"
              value={bet}
              onChange={(e) => setBet(Number(e.target.value))}
              min="1"
              max={balance}
              disabled={spinning}
              className="w-full bg-gray-800 border border-red-600/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-600"
            />
          </div>

          <button
            onClick={spin}
            disabled={spinning}
            className="w-full py-4 bg-gradient-to-r from-yellow-500 to-red-600 text-black rounded-lg text-xl font-bold hover:from-yellow-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
          >
            {spinning ? 'GIRANDO...' : 'GIRAR'}
          </button>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {symbols.map((symbol) => {
              const Icon = symbol.icon;
              return (
                <div key={symbol.name} className="bg-gray-800 rounded-lg p-3 text-center">
                  <Icon className={`h-8 w-8 ${symbol.color} mx-auto mb-2`} />
                  <p className="text-sm text-gray-400">3x = {symbol.multiplier}x</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotateX(0deg); }
          to { transform: rotateX(360deg); }
        }
      `}</style>
    </div>
  );
}
