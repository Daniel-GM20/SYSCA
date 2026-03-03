import { useState } from 'react';
import { ArrowLeft, Coins, Apple, Cherry, Grape, Leaf, Banana, Heart } from 'lucide-react';

interface FruitWheelProps {
  onBack: () => void;
}

const fruits = [
  { icon: Apple, name: 'apple', label: 'Manzana', color: 'text-red-500', bgColor: 'from-red-600 to-red-700', multiplier: 2 },
  { icon: Banana, name: 'banana', label: 'Plátano', color: 'text-yellow-500', bgColor: 'from-yellow-500 to-yellow-600', multiplier: 3 },
  { icon: Cherry, name: 'cherry', label: 'Cereza', color: 'text-red-500', bgColor: 'from-red-500 to-red-600', multiplier: 2.5 },
  { icon: Grape, name: 'grape', label: 'Uva', color: 'text-purple-500', bgColor: 'from-purple-500 to-purple-600', multiplier: 3 },
  { icon: Heart, name: 'heart', label: 'Corazón', color: 'text-pink-600', bgColor: 'from-pink-600 to-red-600', multiplier: 2.5 },
  { icon: Leaf, name: 'leaf', label: 'Menta', color: 'text-green-500', bgColor: 'from-green-500 to-green-600', multiplier: 3 },
];

export default function FruitWheel({ onBack }: FruitWheelProps) {
  const [balance, setBalance] = useState(1000);
  const [selectedFruits, setSelectedFruits] = useState<Set<number>>(new Set());
  const [totalBet, setTotalBet] = useState(0);
  const [bets, setBets] = useState<Record<number, number>>({});
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [gameState, setGameState] = useState<'betting' | 'spinning' | 'result'>('betting');

  const toggleFruitSelection = (fruitIndex: number) => {
    const newSelected = new Set(selectedFruits);
    if (newSelected.has(fruitIndex)) {
      newSelected.delete(fruitIndex);
      const newBets = { ...bets };
      const fruitBet = bets[fruitIndex] || 0;
      setTotalBet(totalBet - fruitBet);
      delete newBets[fruitIndex];
      setBets(newBets);
    } else {
      newSelected.add(fruitIndex);
    }
    setSelectedFruits(newSelected);
  };

  const setBetForFruit = (fruitIndex: number, amount: number) => {
    const oldAmount = bets[fruitIndex] || 0;
    setBets({ ...bets, [fruitIndex]: amount });
    setTotalBet(totalBet - oldAmount + amount);
  };

  const spin = () => {
    if (selectedFruits.size === 0) {
      setMessage('Selecciona al menos una fruta');
      return;
    }

    if (totalBet > balance) {
      setMessage('Saldo insuficiente');
      return;
    }

    if (totalBet === 0) {
      setMessage('Debes apostar en cada fruta seleccionada');
      return;
    }

    setSpinning(true);
    setGameState('spinning');
    setMessage('');
    setBalance(balance - totalBet);

    const randomFruitIndex = Math.floor(Math.random() * fruits.length);
    const spins = 6 + Math.random() * 3;
    const degreesPerFruit = 360 / fruits.length;
    const finalRotation = rotation + 360 * spins + randomFruitIndex * degreesPerFruit;

    setRotation(finalRotation);

    setTimeout(() => {
      setResult(randomFruitIndex);
      setSpinning(false);
      setGameState('result');

      const fruitName = fruits[randomFruitIndex].label;

      if (selectedFruits.has(randomFruitIndex)) {
        const winBet = bets[randomFruitIndex] || 0;
        const winAmount = Math.floor(winBet * fruits[randomFruitIndex].multiplier);
        setBalance((prev) => prev + winAmount);
        setMessage(`¡GANASTE! ${fruitName} - Ganancias: $${winAmount}`);
      } else {
        setMessage(`Perdiste. Salió ${fruitName}. Intenta de nuevo.`);
      }
    }, 5000);
  };

  const resetGame = () => {
    setSelectedFruits(new Set());
    setBets({});
    setTotalBet(0);
    setResult(null);
    setMessage('');
    setGameState('betting');
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
              <h2 className="text-4xl font-bold text-yellow-500 mb-2 text-center">RULETA DE FRUTAS</h2>
              <p className="text-center text-gray-400 mb-8">Apuesta por tus frutas favoritas</p>

              <div className="flex justify-center mb-12">
                <div className="relative w-80 h-80">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                    <defs>
                      <filter id="fruitGlow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
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
                      transitionDuration: spinning ? '5s' : '0s',
                      transitionTimingFunction: spinning ? 'cubic-bezier(0.25, 0.01, 0.25, 1)' : 'linear',
                    }}
                  >
                    <svg className="w-full h-full" viewBox="0 0 400 400">
                      {fruits.map((fruit, idx) => {
                        const angle = (idx * 360) / fruits.length;
                        const startAngle = angle;
                        const endAngle = angle + 360 / fruits.length;

                        const x1 = 200 + 170 * Math.cos((startAngle * Math.PI) / 180);
                        const y1 = 200 + 170 * Math.sin((startAngle * Math.PI) / 180);
                        const x2 = 200 + 170 * Math.cos((endAngle * Math.PI) / 180);
                        const y2 = 200 + 170 * Math.sin((endAngle * Math.PI) / 180);

                        const largeArc = 360 / fruits.length > 180 ? 1 : 0;

                        const colors = fruit.bgColor.split(' to-');
                        const color1 = colors[0].replace('from-', '');
                        const color2 = colors[1];

                        const colorMap: Record<string, string> = {
                          'red-600': '#dc2626',
                          'yellow-500': '#eab308',
                          'yellow-400': '#facc15',
                          'pink-500': '#ec4899',
                          'red-500': '#ef4444',
                          'green-500': '#22c55e',
                          'red-700': '#b91c1c',
                          'yellow-600': '#ca8a04',
                          'pink-600': '#db2777',
                          'green-600': '#16a34a',
                        };

                        const c1 = colorMap[color1] || '#dc2626';
                        const c2 = colorMap[color2] || '#b91c1c';

                        const midAngle = (startAngle + endAngle) / 2;
                        const textRadius = 135;
                        const textX = 200 + textRadius * Math.cos((midAngle * Math.PI) / 180);
                        const textY = 200 + textRadius * Math.sin((midAngle * Math.PI) / 180);

                        return (
                          <g key={idx}>
                            <defs>
                              <linearGradient id={`grad${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor={c1}/>
                                <stop offset="100%" stopColor={c2}/>
                              </linearGradient>
                            </defs>
                            <path
                              d={`M 200 200 L ${x1} ${y1} A 170 170 0 ${largeArc} 1 ${x2} ${y2} Z`}
                              fill={`url(#grad${idx})`}
                              stroke="#d4af37"
                              strokeWidth="1.5"
                              filter="url(#fruitGlow)"
                            />
                            <text
                              x={textX}
                              y={textY}
                              textAnchor="middle"
                              dy="0.3em"
                              fill="#ffffff"
                              fontSize="14"
                              fontWeight="bold"
                              fontFamily="Arial, sans-serif"
                              pointerEvents="none"
                            >
                              {fruit.label}
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

              {result !== null && gameState === 'result' && (
                <div className="text-center mb-6">
                  <div className={`inline-block text-3xl font-bold px-8 py-4 rounded-xl bg-gradient-to-r ${fruits[result].bgColor} text-white`}>
                    {fruits[result].label}
                  </div>
                </div>
              )}

              {message && (
                <div className={`text-center text-lg font-bold px-6 py-4 rounded-lg ${
                  message.includes('GANASTE') ? 'bg-green-600/90 text-white' : 'bg-red-600/90 text-white'
                }`}>
                  {message}
                </div>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-b from-slate-900 to-black rounded-2xl p-8 border border-yellow-600/30 h-fit shadow-2xl">
            <h3 className="text-2xl font-bold text-yellow-500 mb-6">Apuestas</h3>

            <div className="max-h-96 overflow-y-auto mb-6 space-y-3">
              {fruits.map((fruit, idx) => {
                const Icon = fruit.icon;
                const isSelected = selectedFruits.has(idx);
                const fruitBet = bets[idx] || 0;

                return (
                  <div
                    key={idx}
                    onClick={() => !spinning && toggleFruitSelection(idx)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all transform ${
                      isSelected
                        ? `bg-gradient-to-r ${fruit.bgColor} border-white shadow-lg scale-105`
                        : 'bg-gray-900 border-gray-700 hover:border-gray-600'
                    } ${spinning ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Icon className={`h-6 w-6 ${isSelected ? 'text-white' : fruit.color}`} />
                      <span className={`font-bold ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                        {fruit.label}
                      </span>
                      <span className={`ml-auto ${isSelected ? 'text-white' : 'text-yellow-500'}`}>
                        x{fruit.multiplier}
                      </span>
                    </div>

                    {isSelected && (
                      <input
                        type="number"
                        value={fruitBet}
                        onChange={(e) => setBetForFruit(idx, Number(e.target.value))}
                        min="0"
                        max={balance}
                        disabled={spinning}
                        className="w-full bg-black/50 border border-white rounded px-3 py-2 text-white font-bold focus:outline-none"
                        placeholder="Monto"
                        onClick={(e) => e.stopPropagation()}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mb-8 p-4 bg-yellow-600/10 border border-yellow-600/30 rounded-lg">
              <p className="text-gray-400 text-sm mb-2"><strong>Saldo:</strong></p>
              <p className="text-2xl font-bold text-yellow-500 mb-3">${balance}</p>
              <p className="text-gray-400 text-sm mb-1"><strong>Total Apostado:</strong></p>
              <p className="text-xl font-bold text-red-400">${totalBet}</p>
            </div>

            {gameState === 'result' ? (
              <button
                onClick={resetGame}
                disabled={spinning}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl text-xl font-bold hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 transition-all shadow-xl"
              >
                JUGAR DE NUEVO
              </button>
            ) : (
              <button
                onClick={spin}
                disabled={spinning || selectedFruits.size === 0}
                className="w-full py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-xl text-xl font-bold hover:from-yellow-600 hover:to-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl transform hover:scale-105 active:scale-95"
              >
                {spinning ? 'GIRANDO...' : 'GIRAR RUEDA'}
              </button>
            )}

            <div className="mt-4 p-3 bg-gray-900/50 rounded-lg border border-gray-600/30">
              <p className="text-xs text-gray-500 text-center">
                Selecciona frutas, apuesta en cada una y gira. ¡Ganas si la ruleta cae en tu apuesta!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
