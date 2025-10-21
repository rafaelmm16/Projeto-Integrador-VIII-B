import { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';

const emojis = ['🎮', '🎯', '🎲', '🎪', '🎨', '🎭', '🎬', '🎸'];

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (cards[first].emoji === cards[second].emoji) {
        setCards(prev => prev.map((card, idx) =>
          idx === first || idx === second ? { ...card, isMatched: true } : card
        ));
        setFlippedCards([]);

        if (cards.filter(c => !c.isMatched).length === 2) {
          setTimeout(() => setIsWon(true), 500);
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
  }, [flippedCards, cards]);

  const initializeGame = () => {
    const shuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, idx) => ({
        id: idx,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setIsWon(false);
  };

  const handleCardClick = (idx: number) => {
    if (flippedCards.length === 2 || cards[idx].isFlipped || cards[idx].isMatched) {
      return;
    }
    setCards(prev => prev.map((card, i) =>
      i === idx ? { ...card, isFlipped: true } : card
    ));
    setFlippedCards(prev => [...prev, idx]);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="text-lg font-semibold">Movimentos: {moves}</div>
        <button
          onClick={initializeGame}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <RotateCcw size={18} />
          Reiniciar
        </button>
      </div>

      {isWon && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg text-center font-semibold">
          Parabéns! Você completou em {moves} movimentos!
        </div>
      )}

      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, idx) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(idx)}
            className={`aspect-square text-4xl rounded-lg transition-all duration-300 transform ${
              card.isFlipped || card.isMatched
                ? 'bg-white shadow-lg'
                : 'bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-md'
            } ${card.isMatched ? 'opacity-50' : ''}`}
          >
            {(card.isFlipped || card.isMatched) && card.emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
