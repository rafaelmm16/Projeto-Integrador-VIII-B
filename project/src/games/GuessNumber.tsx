import { useState, useEffect } from 'react';
import { RotateCcw, TrendingUp, TrendingDown, Trophy } from 'lucide-react';

export default function GuessNumber() {
  const [targetNumber, setTargetNumber] = useState(0);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState<number[]>([]);
  const [message, setMessage] = useState('');
  const [isWon, setIsWon] = useState(false);
  const [hint, setHint] = useState('');

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setAttempts([]);
    setMessage('Adivinhe um número entre 1 e 100');
    setIsWon(false);
    setHint('');
  };

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(guess);

    if (isNaN(num) || num < 1 || num > 100) {
      setMessage('Por favor, digite um número válido entre 1 e 100');
      return;
    }

    if (attempts.includes(num)) {
      setMessage('Você já tentou esse número!');
      return;
    }

    const newAttempts = [...attempts, num];
    setAttempts(newAttempts);

    if (num === targetNumber) {
      setIsWon(true);
      setMessage(`Parabéns! Você acertou em ${newAttempts.length} tentativas!`);
      setHint('');
    } else if (num < targetNumber) {
      setMessage('Tente um número maior!');
      setHint('up');
    } else {
      setMessage('Tente um número menor!');
      setHint('down');
    }

    setGuess('');
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Adivinhe o Número</h3>
          <button
            onClick={resetGame}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RotateCcw size={18} />
            Novo Jogo
          </button>
        </div>

        <div className={`p-4 rounded-lg mb-6 flex items-center gap-3 ${
          isWon ? 'bg-green-100 text-green-800' : 'bg-blue-50 text-blue-800'
        }`}>
          {isWon && <Trophy size={24} />}
          {hint === 'up' && <TrendingUp size={24} />}
          {hint === 'down' && <TrendingDown size={24} />}
          <span className="font-semibold">{message}</span>
        </div>

        {!isWon && (
          <form onSubmit={handleGuess} className="mb-6">
            <div className="flex gap-3">
              <input
                type="number"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                placeholder="Digite seu palpite"
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
                min="1"
                max="100"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Tentar
              </button>
            </div>
          </form>
        )}

        <div>
          <h4 className="font-semibold text-gray-700 mb-3">
            Tentativas: {attempts.length}
          </h4>
          <div className="flex flex-wrap gap-2">
            {attempts.map((attempt, idx) => (
              <div
                key={idx}
                className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  attempt === targetNumber
                    ? 'bg-green-100 text-green-800'
                    : attempt < targetNumber
                    ? 'bg-orange-100 text-orange-800'
                    : 'bg-purple-100 text-purple-800'
                }`}
              >
                {attempt}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
