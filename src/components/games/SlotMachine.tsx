import { useState } from 'react';
import { ArrowLeft, Coins, Cherry, Grape, Star, Gem, Diamond, Zap, Heart, Crown } from 'lucide-react';

interface SlotMachineProps {
  onBack: () => void;
}

const symbols = [
  { icon: Cherry, name: 'cherry', color: 'text-red-500', label: 'Cereza', multiplier: 2 },
  { icon: Grape, name: 'grape', color: 'text-purple-500', label: 'Uva', multiplier: 3 },
  { icon: Star, name: 'star', color: 'text-yellow-500', label: 'Estrella', multiplier: 4 },
  { icon: Heart, name: 'heart', color: 'text-pink-500', label: 'Corazón', multiplier: 3 },
  { icon: Diamond, name: 'diamond', color: 'text-cyan-400', label: 'Diamante', multiplier: 5 },
  { icon: Zap, name: 'zap', color: 'text-yellow-400', label: 'Rayo', multiplier: 6 },
  { icon: Crown, name: 'crown', color: 'text-yellow-600', label: 'Corona', multiplier: 8 },
  { icon: Gem, name: 'gem', color: 'text-blue-400', label: 'Gema', multiplier: 10 },
];

export default function SlotMachine({ onBack }: SlotMachineProps) {
  const [balance, setBalance] = useState(1000);
  const [bet, setBet] = useState(10);
  const [spinning, setSpinning] = useState(false);
  const [reels, setReels] = useState([0, 1, 2, 3, 4]);
  const [message, setMessage] = useState('');
  const [winType, setWinType] = useState<'none' | '3match' | '4match' | '5match'>('none');

  const spin = () => {
    if (bet > balance) {
      setMessage('Saldo insuficiente');
      setWinType('none');
      return;
    }

    setSpinning(true);
    setMessage('');
    setWinType('none');
    setBalance(balance - bet);

    let spinCount = 0;
    const spinInterval = setInterval(() => {
      setReels([
        Math.floor(Math.random() * symbols.length),
        Math.floor(Math.random() * symbols.length),
        Math.floor(Math.random() * symbols.length),
        Math.floor(Math.random() * symbols.length),
        Math.floor(Math.random() * symbols.length),
      ]);
      spinCount++;

      if (spinCount >= 30) {
        clearInterval(spinInterval);

        const finalReels = [
          Math.floor(Math.random() * symbols.length),
          Math.floor(Math.random() * symbols.length),
          Math.floor(Math.random() * symbols.length),
          Math.floor(Math.random() * symbols.length),
          Math.floor(Math.random() * symbols.length),
        ];

        setReels(finalReels);
        setSpinning(false);

        const allSame = finalReels.every(r => r === finalReels[0]);
        const fourSame = finalReels.filter(r => r === finalReels[0]).length >= 4 ||
                         finalReels.filter(r => r === finalReels[1]).length >= 4;
        const threeSame = finalReels.some((num, idx) =>
          finalReels.filter(r => r === num).length >= 3
        );

        if (allSame) {
          const winAmount = bet * symbols[finalReels[0]].multiplier * 5;
          setBalance((prev) => prev + winAmount);
          setMessage(`¡¡¡JACKPOT MÁXIMO!!! Ganaste $${winAmount}!`);
          setWinType('5match');
        } else if (fourSame) {
          const symbolId = finalReels.find((num, idx) =>
            finalReels.filter(r => r === num).length >= 4
          ) || 0;
          const winAmount = bet * symbols[symbolId].multiplier * 3;
          setBalance((prev) => prev + winAmount);
          setMessage(`¡4 Iguales! Ganaste $${winAmount}!`);
          setWinType('4match');
        } else if (threeSame) {
          const symbolId = finalReels.find((num, idx) =>
            finalReels.filter(r => r === num).length >= 3
          ) || 0;
          const winAmount = bet * symbols[symbolId].multiplier;
          setBalance((prev) => prev + winAmount);
          setMessage(`¡3 Iguales! Ganaste $${winAmount}!`);
          setWinType('3match');
        } else {
          setMessage('Intenta de nuevo');
          setWinType('none');
        }
      }
    }, 50);
  };

  return (
    <div className="min-h-screen py-10 bg-gradient-to-b from-black to-black">
      <div className="max-w-7xl mx-auto px-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-yellow-500 hover:text-yellow-400 mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Volver a Juegos
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-b from-slate-900 to-black rounded-2xl p-8 border border-yellow-600/30 shadow-2xl">
              <h2 className="text-4xl font-bold text-yellow-500 mb-2 text-center">TRAGAMONEDAS CLÁSICO</h2>
              <p className="text-center text-gray-400 mb-8">5 Rodillos - Múltiples oportunidades de ganar</p>

              <div className={`bg-gradient-to-br from-red-900/40 to-yellow-900/40 rounded-2xl p-8 mb-8 border-4 shadow-2xl transition-all ${
                winType === '5match' ? 'border-yellow-300 animate-pulse' :
                winType === '4match' ? 'border-yellow-400' :
                winType === '3match' ? 'border-green-500' :
                'border-yellow-600'
              }`}>
                <div className="flex justify-center gap-3 mb-6">
                  {reels.map((reelIndex, i) => {
                    const Symbol = symbols[reelIndex].icon;
                    return (
                      <div
                        key={i}
                        className="w-28 h-28 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl flex items-center justify-center shadow-xl border-2 border-yellow-600/50 transition-all"
                        style={{
                          animation: spinning ? 'spin-reel 0.08s linear infinite' : 'none',
                        }}
                      >
                        <Symbol className={`h-16 w-16 ${symbols[reelIndex].color}`} />
                      </div>
                    );
                  })}
                </div>

                {message && (
                  <div className={`text-center font-bold py-4 rounded-lg text-lg ${
                    winType === 'none'
                      ? 'bg-gray-800 text-gray-300'
                      : winType === '5match'
                      ? 'bg-yellow-500 text-black animate-bounce'
                      : winType === '4match'
                      ? 'bg-orange-500 text-white'
                      : 'bg-green-600 text-white'
                  }`}>
                    {message}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-4 gap-3">
                {symbols.map((symbol) => {
                  const Icon = symbol.icon;
                  return (
                    <div key={symbol.name} className="bg-gray-900 rounded-lg p-4 text-center border border-gray-700">
                      <Icon className={`h-10 w-10 ${symbol.color} mx-auto mb-2`} />
                      <p className="text-xs text-gray-400 mb-1">{symbol.label}</p>
                      <p className="text-sm text-yellow-500 font-bold">x{symbol.multiplier}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-b from-slate-900 to-black rounded-2xl p-8 border border-yellow-600/30 h-fit shadow-2xl">
            <h3 className="text-2xl font-bold text-yellow-500 mb-6">Control de Juego</h3>

            <div className="mb-6">
              <label className="block text-gray-400 mb-3 font-semibold">Monto de Apuesta</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={bet}
                  onChange={(e) => setBet(Number(e.target.value))}
                  min="1"
                  max={balance}
                  disabled={spinning}
                  className="flex-1 bg-gray-900 border-2 border-yellow-600/50 rounded-lg px-4 py-2 text-white font-bold text-lg focus:outline-none focus:border-yellow-500"
                />
                <span className="text-yellow-500 font-bold">$</span>
              </div>
            </div>

            <div className="mb-8 p-4 bg-yellow-600/10 border border-yellow-600/30 rounded-lg">
              <p className="text-gray-400 text-sm mb-2"><strong>Saldo:</strong></p>
              <p className="text-3xl font-bold text-yellow-500">${balance}</p>
            </div>

            <button
              onClick={spin}
              disabled={spinning}
              className="w-full py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-xl text-2xl font-bold hover:from-yellow-600 hover:to-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl transform hover:scale-105 active:scale-95 mb-4"
            >
              {spinning ? 'GIRANDO...' : 'GIRAR'}
            </button>

            <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-600/30">
              <p className="text-xs text-gray-500 text-center mb-3"><strong>Combinaciones Ganadoras:</strong></p>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>✓ 3 iguales = x multiplicador</li>
                <li>✓ 4 iguales = x3 multiplicador</li>
                <li>✓ 5 iguales = x5 multiplicador</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin-reel {
          from { transform: translateY(0); }
          to { transform: translateY(-100px); }
        }
      `}</style>
    </div>
  );
}
