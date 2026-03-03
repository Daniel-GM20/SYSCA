import { useState, useEffect } from 'react';
import { ArrowLeft, Coins } from 'lucide-react';

interface BingoProps {
  onBack: () => void;
}

export default function Bingo({ onBack }: BingoProps) {
  const [balance, setBalance] = useState(1000);
  const [betAmount] = useState(20);
  const [playing, setPlaying] = useState(false);
  const [calledNumbers, setCalledNumbers] = useState<number[]>([]);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [card, setCard] = useState<number[][]>([]);
  const [markedCells, setMarkedCells] = useState<boolean[][]>([]);
  const [message, setMessage] = useState('');
  const [gameInterval, setGameInterval] = useState<NodeJS.Timeout | null>(null);

  const generateCard = () => {
    const newCard: number[][] = [];
    const ranges = [
      [1, 15],
      [16, 30],
      [31, 45],
      [46, 60],
      [61, 75],
    ];

    for (let col = 0; col < 5; col++) {
      const column: number[] = [];
      const [min, max] = ranges[col];
      const available = Array.from({ length: max - min + 1 }, (_, i) => min + i);

      for (let row = 0; row < 5; row++) {
        if (row === 2 && col === 2) {
          column.push(0);
        } else {
          const randomIndex = Math.floor(Math.random() * available.length);
          column.push(available[randomIndex]);
          available.splice(randomIndex, 1);
        }
      }
      newCard.push(column);
    }

    setCard(newCard);
    const marks = Array(5).fill(null).map(() => Array(5).fill(false));
    marks[2][2] = true;
    setMarkedCells(marks);
  };

  const startGame = () => {
    if (balance < betAmount) {
      setMessage('Saldo insuficiente');
      return;
    }

    setBalance(balance - betAmount);
    setPlaying(true);
    setCalledNumbers([]);
    setCurrentNumber(null);
    setMessage('');
    generateCard();

    const allNumbers = Array.from({ length: 75 }, (_, i) => i + 1);
    let availableNumbers = [...allNumbers];
    let callCount = 0;

    const interval = setInterval(() => {
      if (availableNumbers.length === 0 || callCount >= 30) {
        clearInterval(interval);
        setPlaying(false);
        setMessage('Juego terminado. ¡Intenta de nuevo!');
        return;
      }

      const randomIndex = Math.floor(Math.random() * availableNumbers.length);
      const number = availableNumbers[randomIndex];
      availableNumbers.splice(randomIndex, 1);

      setCurrentNumber(number);
      setCalledNumbers((prev) => [...prev, number]);
      callCount++;
    }, 2000);

    setGameInterval(interval);
  };

  const markCell = (row: number, col: number) => {
    if (!playing || markedCells[row][col]) return;

    const cellNumber = card[col][row];
    if (calledNumbers.includes(cellNumber)) {
      const newMarked = markedCells.map(r => [...r]);
      newMarked[row][col] = true;
      setMarkedCells(newMarked);

      if (checkWin(newMarked)) {
        if (gameInterval) clearInterval(gameInterval);
        setPlaying(false);
        const winAmount = betAmount * 5;
        setBalance((prev) => prev + winAmount);
        setMessage(`¡BINGO! Ganaste $${winAmount}!`);
      }
    }
  };

  const checkWin = (marks: boolean[][]) => {
    for (let i = 0; i < 5; i++) {
      if (marks[i].every(cell => cell)) return true;
      if (marks.every(row => row[i])) return true;
    }

    if (marks.every((row, i) => row[i])) return true;
    if (marks.every((row, i) => row[4 - i])) return true;

    return false;
  };

  useEffect(() => {
    generateCard();
  }, []);

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

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-gradient-to-br from-gray-900 to-black border border-red-600/30 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-yellow-500">Bingo</h2>
                <div className="flex items-center gap-2 text-2xl font-bold text-white">
                  <Coins className="h-6 w-6 text-yellow-500" />
                  ${balance}
                </div>
              </div>

              <div className="mb-6">
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {['B', 'I', 'N', 'G', 'O'].map((letter) => (
                    <div
                      key={letter}
                      className="bg-red-600 text-white text-2xl font-bold py-3 text-center rounded-lg"
                    >
                      {letter}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {Array(5).fill(null).map((_, row) => (
                    Array(5).fill(null).map((_, col) => {
                      const number = card[col]?.[row];
                      const isMarked = markedCells[row]?.[col];
                      const isFree = row === 2 && col === 2;

                      return (
                        <button
                          key={`${row}-${col}`}
                          onClick={() => markCell(row, col)}
                          disabled={!playing || isMarked}
                          className={`aspect-square text-xl font-bold rounded-lg transition-all ${
                            isMarked
                              ? 'bg-yellow-500 text-black'
                              : 'bg-gray-800 text-white hover:bg-gray-700'
                          } ${isFree ? 'bg-red-600' : ''}`}
                        >
                          {isFree ? 'FREE' : number}
                        </button>
                      );
                    })
                  ))}
                </div>
              </div>

              {message && (
                <div className={`text-center text-xl font-bold py-3 rounded-lg mb-4 ${
                  message.includes('Ganaste') || message.includes('BINGO')
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-800 text-gray-300'
                }`}>
                  {message}
                </div>
              )}

              <button
                onClick={startGame}
                disabled={playing}
                className="w-full py-4 bg-gradient-to-r from-yellow-500 to-red-600 text-black rounded-lg text-xl font-bold hover:from-yellow-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
              >
                {playing ? 'JUGANDO...' : `JUGAR ($${betAmount})`}
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-black border border-red-600/30 rounded-xl p-6">
            <h3 className="text-xl font-bold text-yellow-500 mb-4">Números Cantados</h3>

            {currentNumber && (
              <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-6 mb-6 text-center">
                <p className="text-sm text-red-100 mb-2">Número Actual</p>
                <p className="text-5xl font-bold text-white">{currentNumber}</p>
              </div>
            )}

            <div className="grid grid-cols-5 gap-2 max-h-96 overflow-y-auto">
              {calledNumbers.map((num) => (
                <div
                  key={num}
                  className={`aspect-square flex items-center justify-center rounded-lg font-bold ${
                    num === currentNumber
                      ? 'bg-yellow-500 text-black text-lg'
                      : 'bg-gray-800 text-gray-400 text-sm'
                  }`}
                >
                  {num}
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <h4 className="font-bold text-white mb-2">Cómo Ganar:</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Completa una línea horizontal</li>
                <li>• Completa una línea vertical</li>
                <li>• Completa una diagonal</li>
                <li>• Premio: 5x tu apuesta</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
