'use client'

import { useState, useEffect } from 'react'
import { RotateCcw, Trophy, Timer } from 'lucide-react'
import { saveGameScore, getLeaderboard } from '../lib/supabase'

interface Card {
  id: number;
  material: string;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const materials = [
  { material: 'Alumínio', emoji: '🥫' },
  { material: 'Plástico', emoji: '🍾' },
  { material: 'Pneu', emoji: '🛞' },
  { material: 'Cerâmica', emoji: '🏺' },
  { material: 'Isopor', emoji: '📦' },
  { material: 'Metal', emoji: '🔩' },
  { material: 'Tampinha', emoji: '⭕' },
  { material: 'Sacola', emoji: '🛍️' },
];

export default function RecyclingMemory() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [playerName, setPlayerName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);

  useEffect(() => {
    loadLeaderboard();
    initializeGame();
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
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (cards[first].material === cards[second].material) {
        setCards(prev => prev.map((card, idx) =>
          idx === first || idx === second ? { ...card, isMatched: true } : card
        ));
        setFlippedCards([]);
        setMatches(prev => prev + 1);

        if (matches + 1 === materials.length) {
          endGame();
        }
      } else {
        setTimeout(() => {
          setCards(prev => prev.map((card, idx) =>
            idx === first || idx === second ? { ...card, isFlipped: false } : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
      setMoves(prev => prev + 1);
    }
  }, [flippedCards, cards, matches]);

  const loadLeaderboard = async () => {
    const data = await getLeaderboard('recycling-memory', 5);
    setLeaderboard(data);
  };

  const initializeGame = () => {
    const shuffled = [...materials, ...materials]
      .sort(() => Math.random() - 0.5)
      .map((item, idx) => ({
        id: idx,
        material: item.material,
        emoji: item.emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setTimeElapsed(0);
    setIsPlaying(false);
    setGameOver(false);
    setShowNameInput(false);
    setPlayerName('');
  };

  const startGame = () => {
    setIsPlaying(true);
  };

  const endGame = async () => {
    setGameOver(true);
    setIsPlaying(false);
    const finalScore = Math.max(0, 1000 - (moves * 10) - (timeElapsed * 2));
    setShowNameInput(true);
  };

  const handleSaveScore = async () => {
    if (playerName.trim()) {
      const finalScore = Math.max(0, 1000 - (moves * 10) - (timeElapsed * 2));
      await saveGameScore(playerName, 'recycling-memory', finalScore, timeElapsed, true);
      setShowNameInput(false);
      await loadLeaderboard();
    }
  };

  const handleCardClick = (idx: number) => {
    if (!isPlaying) {
      startGame();
    }

    if (flippedCards.length === 2 || cards[idx].isFlipped || cards[idx].isMatched) {
      return;
    }

    setCards(prev => prev.map((card, i) =>
      i === idx ? { ...card, isFlipped: true } : card
    ));
    setFlippedCards(prev => [...prev, idx]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateScore = () => {
    return Math.max(0, 1000 - (moves * 10) - (timeElapsed * 2));
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Trophy className="text-yellow-600" size={20} />
              <span className="font-semibold">Pontos: {calculateScore()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Timer className="text-blue-600" size={20} />
              <span className="font-semibold">{formatTime(timeElapsed)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Movimentos: {moves}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Pares: {matches}/{materials.length}</span>
            </div>
          </div>
          <button
            onClick={initializeGame}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RotateCcw size={18} />
            Reiniciar
          </button>
        </div>

        {gameOver ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold mb-2">Parabéns!</h3>
            <p className="text-lg text-gray-600 mb-2">
              Você completou o jogo em {moves} movimentos!
            </p>
            <p className="text-lg text-gray-600 mb-4">
              Tempo: {formatTime(timeElapsed)}
            </p>
            <p className="text-2xl font-bold text-blue-600 mb-6">
              Pontuação: {calculateScore()} pontos
            </p>

            {showNameInput && (
              <div className="max-w-md mx-auto">
                <p className="mb-3 font-semibold">Salvar sua pontuação:</p>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
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
        ) : (
          <div>
            {!isPlaying && (
              <div className="text-center mb-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-gray-700">
                  Clique em qualquer carta para começar! Encontre todos os pares de materiais recicláveis.
                </p>
              </div>
            )}

            <div className="grid grid-cols-4 gap-4">
              {cards.map((card, idx) => (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(idx)}
                  className={`aspect-square text-5xl rounded-lg transition-all duration-300 transform ${
                    card.isFlipped || card.isMatched
                      ? 'bg-white shadow-lg'
                      : 'bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-md'
                  } ${card.isMatched ? 'opacity-50 ring-4 ring-yellow-400' : ''} ${
                    !card.isFlipped && !card.isMatched ? 'hover:scale-105' : ''
                  }`}
                  disabled={card.isMatched}
                >
                  {(card.isFlipped || card.isMatched) && (
                    <div className="flex flex-col items-center justify-center h-full">
                      <div>{card.emoji}</div>
                      <div className="text-xs mt-1 font-semibold text-gray-600">
                        {card.material}
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {leaderboard.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Trophy className="text-yellow-600" />
            Melhores Pontuações
          </h3>
          <div className="space-y-2">
            {leaderboard.map((entry, idx) => (
              <div key={entry.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-lg text-gray-600">#{idx + 1}</span>
                  <span className="font-semibold">{entry.players?.name || 'Anônimo'}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-blue-600">{entry.score} pts</div>
                  {entry.time_taken && (
                    <div className="text-sm text-gray-500">{formatTime(entry.time_taken)}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
