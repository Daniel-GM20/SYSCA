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
  const [betType, setBetType] = useState<'red' | 'black' | 'number' | null>(null);
  const [betNumber, setBetNumber] = useState<number | null>(null);
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
    const spins = 5 + Math.random() * 3;
    const finalRotation = rotation + 360 * spins + (randomIndex * (360 / rouletteNumbers.length));

    setRotation(finalRotation);

    setTimeout(() => {
      setResult(winningNumber);
      setSpinning(false);

      let won = false;
      let winAmount = 0;

      if (betType === 'number' && betNumber === winningNumber.number) {
        won = true;
        winAmount = bet * 35;
      } else if (betType === winningNumber.color) {
        won = true;
        winAmount = bet * 2;
      }

      if (won) {
        setBalance((prev) => prev + winAmount);
        setMessage(`¡Ganaste $${winAmount}! Número: ${winningNumber.number} ${winningNumber.color}`);
      } else {
        setMessage(`Perdiste. Número: ${winningNumber.number} ${winningNumber.color}`);
      }
    }, 4000);
  };

  return (
    <div className="min-h-screen py-10 bg-gradient-to-b from-black via-red-950/20 to-black">
      <div className="max-w-6xl mx-auto px-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-yellow-500 hover:text-yellow-400 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Volver a Juegos
        </button>

        <div className="bg-gradient-to-br from-gray-900 to-black border border-red-600/30 rounded-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-yellow-500">Ruleta Europea</h2>
            <div className="flex items-center gap-2 text-2xl font-bold text-white">
              <Coins className="h-6 w-6 text-yellow-500" />
              ${balance}
            </div>
          </div>

          <div className="flex flex-col items-center mb-8">
            <div className="relative w-80 h-80 mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/20 to-red-900/20 rounded-full"></div>
              <div className="absolute inset-4 bg-gradient-to-br from-gray-900 to-black rounded-full border-4 border-yellow-600"></div>

              <div
                className="absolute inset-8 rounded-full transition-transform duration-4000 ease-out"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  background: 'conic-gradient(from 0deg, red 0deg, black 9.73deg, red 19.46deg, black 29.19deg, red 38.92deg, black 48.65deg, red 58.38deg, black 68.11deg, red 77.84deg, black 87.57deg, red 97.30deg, black 107.03deg, red 116.76deg, black 126.49deg, red 136.22deg, black 145.95deg, red 155.68deg, black 165.41deg, red 175.14deg, black 184.87deg, red 194.60deg, black 204.33deg, red 214.06deg, black 223.79deg, red 233.52deg, black 243.25deg, red 252.98deg, black 262.71deg, red 272.44deg, black 282.17deg, red 291.90deg, black 301.63deg, red 311.36deg, black 321.09deg, red 330.82deg, black 340.55deg, red 350.28deg, green 360deg)',
                }}
              ></div>

              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-black rounded-full"></div>
              </div>

              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-12 border-l-transparent border-r-transparent border-t-white"></div>
            </div>

            {result && !spinning && (
              <div className={`text-2xl font-bold mb-4 px-6 py-3 rounded-lg ${
                result.color === 'red' ? 'bg-red-600' :
                result.color === 'black' ? 'bg-gray-900 border-2 border-white' :
                'bg-green-600'
              }`}>
                {result.number}
              </div>
            )}

            {message && (
              <div className={`text-lg font-semibold mb-4 px-6 py-3 rounded-lg ${
                message.includes('Ganaste') ? 'bg-green-600' : 'bg-red-600'
              }`}>
                {message}
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
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

            <div>
              <label className="block text-gray-400 mb-2">Tipo de Apuesta</label>
              <div className="flex gap-2">
                <button
                  onClick={() => { setBetType('red'); setBetNumber(null); }}
                  disabled={spinning}
                  className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                    betType === 'red'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-red-600/20'
                  }`}
                >
                  Rojo (2x)
                </button>
                <button
                  onClick={() => { setBetType('black'); setBetNumber(null); }}
                  disabled={spinning}
                  className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                    betType === 'black'
                      ? 'bg-gray-900 text-white border-2 border-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  Negro (2x)
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={spin}
            disabled={spinning || !betType}
            className="w-full py-4 bg-gradient-to-r from-yellow-500 to-red-600 text-black rounded-lg text-xl font-bold hover:from-yellow-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
          >
            {spinning ? 'Girando...' : 'GIRAR RULETA'}
          </button>
        </div>
      </div>
    </div>
  );
}
