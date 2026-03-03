import { useState, useEffect } from 'react';
import { ArrowLeft, Coins } from 'lucide-react';

interface RouletteProps {
  onBack: () => void;
}

const rouletteNumbers = [
  { number: 0, color: 'green' },
  { number: 32, color: 'red' },
  { number: 15, color: 'black' },
  { number: 19, color: 'red' },
  { number: 4, color: 'black' },
  { number: 21, color: 'red' },
  { number: 2, color: 'black' },
  { number: 25, color: 'red' },
  { number: 17, color: 'black' },
  { number: 34, color: 'red' },
  { number: 6, color: 'black' },
  { number: 27, color: 'red' },
  { number: 13, color: 'black' },
  { number: 36, color: 'red' },
  { number: 11, color: 'black' },
  { number: 30, color: 'red' },
  { number: 8, color: 'black' },
  { number: 23, color: 'red' },
  { number: 10, color: 'black' },
  { number: 5, color: 'red' },
  { number: 24, color: 'black' },
  { number: 16, color: 'red' },
  { number: 33, color: 'black' },
  { number: 1, color: 'red' },
  { number: 20, color: 'black' },
  { number: 14, color: 'red' },
  { number: 31, color: 'black' },
  { number: 9, color: 'red' },
  { number: 22, color: 'black' },
  { number: 18, color: 'red' },
  { number: 29, color: 'black' },
  { number: 7, color: 'red' },
  { number: 28, color: 'black' },
  { number: 12, color: 'red' },
  { number: 35, color: 'black' },
  { number: 3, color: 'red' },
  { number: 26, color: 'black' },
];

export default function Roulette({ onBack }: RouletteProps) {
  const [balance, setBalance] = useState(1000);
  const [bet, setBet] = useState(10);
  const [betType, setBetType] = useState<'red' | 'black' | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<typeof rouletteNumbers[0] | null>(null);
  const [rotation, setRotation] = useState(0);
  const [message, setMessage] = useState('');

  const spin = () => {
    if (bet > balance) {
      setMessage('Saldo insuficiente');
      return;
    }

    if (!betType) {
      setMessage('Selecciona un tipo de apuesta');
      return;
    }

    setSpinning(true);
    setMessage('');
    setBalance(balance - bet);

    const randomIndex = Math.floor(Math.random() * rouletteNumbers.length);
    const winningNumber = rouletteNumbers[randomIndex];
    const spins = 8 + Math.random() * 4;
    const degreesPerSlot = 360 / rouletteNumbers.length;
    const finalRotation = rotation + 360 * spins + (randomIndex * degreesPerSlot);

    setRotation(finalRotation);

    setTimeout(() => {
      setResult(winningNumber);
      setSpinning(false);

      let won = false;
      let winAmount = 0;

      if (betType === winningNumber.color) {
        won = true;
        winAmount = bet * 2;
      }

      if (won) {
        setBalance((prev) => prev + winAmount);
        setMessage(`¡GANASTE! $${winAmount} - Número: ${winningNumber.number}`);
      } else {
        setMessage(`Perdiste. Número: ${winningNumber.number}`);
      }
    }, 5500);
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
            <div className="bg-gradient-to-b from-slate-900 to-black rounded-2xl p-12 border border-yellow-600/30 shadow-2xl">
              <h2 className="text-4xl font-bold text-yellow-500 mb-2 text-center">RULETA EUROPEA</h2>
              <p className="text-center text-gray-400 mb-8">La experiencia de casino más emocionante</p>

              <div className="flex justify-center mb-12">
                <div className="relative w-96 h-96">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                    <defs>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>

                    <circle cx="200" cy="200" r="195" fill="#1a1a2e" stroke="#d4af37" strokeWidth="3"/>
                    <circle cx="200" cy="200" r="185" fill="#0f0f1e"/>
                  </svg>

                  <div
                    className="absolute inset-0 rounded-full transition-transform"
                    style={{
                      transform: `rotate(${rotation}deg)`,
                      transformOrigin: 'center',
                      transitionDuration: spinning ? '5.5s' : '0s',
                      transitionTimingFunction: spinning ? 'cubic-bezier(0.25, 0.01, 0.25, 1)' : 'linear',
                    }}
                  >
                    <svg className="w-full h-full" viewBox="0 0 400 400">
                      {rouletteNumbers.map((num, idx) => {
                        const angle = (idx * 360) / rouletteNumbers.length;
                        const startAngle = angle;
                        const endAngle = angle + 360 / rouletteNumbers.length;

                        const isGreen = num.number === 0;
                        const color = isGreen ? '#2ecc71' : num.color === 'red' ? '#e74c3c' : '#1a1a2e';
                        const textColor = isGreen ? '#fff' : num.color === 'red' ? '#fff' : '#fff';

                        const x1 = 200 + 170 * Math.cos((startAngle * Math.PI) / 180);
                        const y1 = 200 + 170 * Math.sin((startAngle * Math.PI) / 180);
                        const x2 = 200 + 170 * Math.cos((endAngle * Math.PI) / 180);
                        const y2 = 200 + 170 * Math.sin((endAngle * Math.PI) / 180);

                        const largeArc = 360 / rouletteNumbers.length > 180 ? 1 : 0;

                        const midAngle = (startAngle + endAngle) / 2;
                        const textRadius = 135;
                        const textX = 200 + textRadius * Math.cos((midAngle * Math.PI) / 180);
                        const textY = 200 + textRadius * Math.sin((midAngle * Math.PI) / 180);

                        return (
                          <g key={idx}>
                            <path
                              d={`M 200 200 L ${x1} ${y1} A 170 170 0 ${largeArc} 1 ${x2} ${y2} Z`}
                              fill={color}
                              stroke="#d4af37"
                              strokeWidth="1"
                              filter="url(#glow)"
                            />
                            <text
                              x={textX}
                              y={textY}
                              textAnchor="middle"
                              dy="0.3em"
                              fill={textColor}
                              fontSize="16"
                              fontWeight="bold"
                              fontFamily="Arial, sans-serif"
                              pointerEvents="none"
                            >
                              {num.number}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full border-4 border-white shadow-2xl flex items-center justify-center z-20">
                    <div className="w-4 h-4 bg-black rounded-full"></div>
                  </div>

                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-30">
                    <div className="w-0 h-0 border-l-6 border-r-6 border-t-8 border-l-transparent border-r-transparent border-t-white drop-shadow-lg"></div>
                  </div>
                </div>
              </div>

              {result && !spinning && (
                <div className="text-center mb-6">
                  <div className={`inline-block text-3xl font-bold px-8 py-4 rounded-xl ${
                    result.number === 0 ? 'bg-green-600' :
                    result.color === 'red' ? 'bg-red-600' :
                    'bg-gray-900 border-2 border-white'
                  } text-white`}>
                    {result.number}
                  </div>
                </div>
              )}

              {message && (
                <div className={`text-center text-xl font-bold px-6 py-4 rounded-lg ${
                  message.includes('GANASTE') ? 'bg-green-600/90 text-white' : 'bg-red-600/90 text-white'
                }`}>
                  {message}
                </div>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-b from-slate-900 to-black rounded-2xl p-8 border border-yellow-600/30 h-fit shadow-2xl">
            <h3 className="text-2xl font-bold text-yellow-500 mb-6">Control de Apuesta</h3>

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

            <div className="mb-8">
              <label className="block text-gray-400 mb-3 font-semibold">Selecciona Color</label>
              <div className="flex gap-3">
                <button
                  onClick={() => setBetType('red')}
                  disabled={spinning}
                  className={`flex-1 py-3 rounded-lg font-bold transition-all transform hover:scale-105 ${
                    betType === 'red'
                      ? 'bg-red-600 text-white border-2 border-white shadow-lg'
                      : 'bg-red-600/30 text-red-200 border-2 border-red-600/50 hover:bg-red-600/50'
                  } disabled:opacity-50`}
                >
                  ROJO
                </button>
                <button
                  onClick={() => setBetType('black')}
                  disabled={spinning}
                  className={`flex-1 py-3 rounded-lg font-bold transition-all transform hover:scale-105 ${
                    betType === 'black'
                      ? 'bg-gray-900 text-white border-2 border-white shadow-lg'
                      : 'bg-gray-800/50 text-gray-300 border-2 border-gray-600/50 hover:bg-gray-700/50'
                  } disabled:opacity-50`}
                >
                  NEGRO
                </button>
              </div>
            </div>

            <div className="mb-8 p-4 bg-yellow-600/10 border border-yellow-600/30 rounded-lg">
              <p className="text-gray-400 text-sm mb-2"><strong>Saldo Actual:</strong></p>
              <p className="text-3xl font-bold text-yellow-500">${balance}</p>
            </div>

            <button
              onClick={spin}
              disabled={spinning || !betType}
              className="w-full py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-xl text-2xl font-bold hover:from-yellow-600 hover:to-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl transform hover:scale-105 active:scale-95"
            >
              {spinning ? 'GIRANDO...' : 'GIRAR RULETA'}
            </button>

            <div className="mt-6 p-4 bg-gray-900/50 rounded-lg border border-gray-600/30">
              <p className="text-xs text-gray-500 text-center">
                Apuesta 2x tu monto en rojo o negro. Se requiere seleccionar un color antes de girar.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-glow {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.5)); }
          50% { filter: drop-shadow(0 0 16px rgba(212, 175, 55, 0.8)); }
        }
      `}</style>
    </div>
  );
}
