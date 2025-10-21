'use client'

import { useState, useEffect } from 'react'
import { RotateCcw, Trophy, Timer } from 'lucide-react'
import { saveGameScore, getLeaderboard } from '../lib/supabase'

// ... (interfaces e constantes items/bins permanecem as mesmas) ...
interface Item {
  id: number;
  name: string;
  type: 'metal' | 'plastic' | 'ceramic' | 'tire' | 'isopor';
  emoji: string;
}

const items: Item[] = [
  { id: 1, name: 'Latinha de Alumínio', type: 'metal', emoji: '🥫' },
  { id: 2, name: 'Garrafa PET', type: 'plastic', emoji: '🍾' },
  { id: 3, name: 'Sacola Plástica', type: 'plastic', emoji: '🛍️' },
  { id: 4, name: 'Pneu', type: 'tire', emoji: '🛞' },
  { id: 5, name: 'Tampinha Plástica', type: 'plastic', emoji: '⭕' },
  { id: 6, name: 'Cerâmica', type: 'ceramic', emoji: '🏺' },
  { id: 7, name: 'Isopor', type: 'isopor', emoji: '📦' },
  { id: 8, name: 'Sucata de Metal', type: 'metal', emoji: '🔩' },
];

const bins = [
  { type: 'metal', name: 'Metal', color: 'bg-yellow-500', emoji: '🟡' },
  { type: 'plastic', name: 'Plástico', color: 'bg-red-500', emoji: '🔴' },
  { type: 'ceramic', name: 'Cerâmica', color: 'bg-orange-500', emoji: '🟠' },
  { type: 'tire', name: 'Pneus', color: 'bg-gray-700', emoji: '⚫' },
  { type: 'isopor', name: 'Isopor', color: 'bg-blue-500', emoji: '🔵' },
];


export default function RecyclingSorting() {
  const [currentItem, setCurrentItem] = useState<Item | null>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [itemsProcessed, setItemsProcessed] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [message, setMessage] = useState('');
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [playerName, setPlayerName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  useEffect(() => {
    if (isPlaying && !gameOver) {
      const timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isPlaying, gameOver]);

  useEffect(() => {
    if (isPlaying && !currentItem) {
      nextItem();
    }
  }, [isPlaying, currentItem]);

  const loadLeaderboard = async () => {
    const data = await getLeaderboard('recycling-sorting', 5);
    setLeaderboard(data);
  };

  const nextItem = () => {
    const randomItem = items[Math.floor(Math.random() * items.length)];
    setCurrentItem(randomItem);
    setMessage('');
  };

  const handleSort = (binType: string) => {
    if (!currentItem || gameOver) return;

    if (currentItem.type === binType) {
      setScore(prev => prev + 10);
      setMessage('Correto!');
      setItemsProcessed(prev => prev + 1);

      if (itemsProcessed + 1 >= 15) {
        endGame(true);
      } else {
        setTimeout(() => nextItem(), 500);
      }
    } else {
      setLives(prev => prev - 1);
      setMessage('Errado! Tente novamente.');

      if (lives - 1 <= 0) {
        endGame(false);
      }
    }
  };

  const endGame = async (won: boolean) => {
    setGameOver(true);
    setIsPlaying(false);
    setMessage(won ? 'Parabéns! Você completou o jogo!' : 'Game Over!');

    if (score > 0) {
      setShowNameInput(true);
    }
  };

  const handleSaveScore = async () => {
    if (playerName.trim()) {
      await saveGameScore(playerName, 'recycling-sorting', score, timeElapsed, itemsProcessed >= 15);
      setShowNameInput(false);
      await loadLeaderboard();
    }
  };

  const resetGame = () => {
    setScore(0);
    setLives(3);
    setItemsProcessed(0);
    setGameOver(false);
    setTimeElapsed(0);
    setIsPlaying(true);
    setCurrentItem(null);
    setMessage('');
    setShowNameInput(false);
    setPlayerName('');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4 sm:gap-0">
          <div className="flex flex-wrap gap-x-4 gap-y-2 sm:gap-x-6">
            <div className="flex items-center gap-2">
              <Trophy className="text-yellow-600" size={20} />
              <span className="font-semibold">Pontos: {score}</span>
            </div>
            <div className="flex items-center gap-2">
              <Timer className="text-blue-600" size={20} />
              <span className="font-semibold">{formatTime(timeElapsed)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Vidas: {'❤️'.repeat(lives)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Itens: {itemsProcessed}/15</span>
            </div>
          </div>
          <button
            onClick={resetGame}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
          >
            <RotateCcw size={18} />
            Reiniciar
          </button>
        </div>

        {!isPlaying && !gameOver && (
          <div className="text-center py-8">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">Separe os Resíduos Corretamente</h3>
            <p className="text-gray-600 mb-6 text-sm sm:text-base">
              Arraste cada item para a lixeira correta. Você tem 3 vidas!
            </p>
            <button
              onClick={() => setIsPlaying(true)}
              className="px-6 py-3 sm:px-8 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-base sm:text-lg"
            >
              Começar Jogo
            </button>
          </div>
        )}

        {isPlaying && currentItem && !gameOver && (
          <div className="text-center">
            <div className="text-7xl sm:text-8xl mb-4">{currentItem.emoji}</div>
            <h3 className="text-xl sm:text-2xl font-bold mb-6">{currentItem.name}</h3>

            {message && (
              <div className={`p-3 rounded-lg mb-4 text-sm sm:text-base ${
                message.includes('Correto') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {message}
              </div>
            )}

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-4 mt-8">
              {bins.map(bin => (
                <button
                  key={bin.type}
                  onClick={() => handleSort(bin.type)}
                  className={`${bin.color} text-white rounded-lg p-3 sm:p-6 hover:opacity-80 transition-opacity flex flex-col items-center justify-center gap-1 sm:gap-2 aspect-square`}
                >
                  <div className="text-3xl sm:text-4xl">{bin.emoji}</div>
                  <span className="font-semibold text-xs sm:text-sm text-center">{bin.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {gameOver && (
          <div className="text-center py-8">
            <div className={`text-5xl sm:text-6xl mb-4`}>{itemsProcessed >= 15 ? '🎉' : '😢'}</div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2">{message}</h3>
            <p className="text-base sm:text-lg text-gray-600 mb-4">
              Pontuação Final: {score} pontos em {formatTime(timeElapsed)}
            </p>

            {showNameInput && (
              <div className="max-w-md mx-auto mb-6">
                <p className="mb-3 font-semibold">Salvar sua pontuação:</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.targe.value)}
                    placeholder="Digite seu nome"
                    className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                  <button
                    onClick={handleSaveScore}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {leaderboard.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
            <Trophy className="text-yellow-600" />
            Melhores Pontuações
          </h3>
          <div className="space-y-2">
            {leaderboard.map((entry, idx) => (
              <div key={entry.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-base sm:text-lg text-gray-600">#{idx + 1}</span>
                  <span className="font-semibold text-sm sm:text-base">{entry.players?.name || 'Anônimo'}</span>
                </div>
                <span className="font-bold text-blue-600 text-sm sm:text-base">{entry.score} pts</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}