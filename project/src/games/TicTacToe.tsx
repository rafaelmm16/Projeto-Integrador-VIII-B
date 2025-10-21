import { useState } from 'react';
import { RotateCcw } from 'lucide-react';

type Player = 'X' | 'O' | null;

export default function TicTacToe() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<Player | 'Draw' | null>(null);

  const checkWinner = (squares: Player[]): Player | 'Draw' | null => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    if (squares.every(square => square !== null)) {
      return 'Draw';
    }

    return null;
  };

  const handleClick = (idx: number) => {
    if (board[idx] || winner) return;

    const newBoard = [...board];
    newBoard[idx] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="text-lg font-semibold">
          {winner
            ? winner === 'Draw'
              ? 'Empate!'
              : `Vencedor: ${winner}`
            : `Próximo jogador: ${isXNext ? 'X' : 'O'}`}
        </div>
        <button
          onClick={resetGame}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <RotateCcw size={18} />
          Reiniciar
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
        {board.map((cell, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(idx)}
            className="aspect-square bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-4xl font-bold flex items-center justify-center"
            disabled={!!cell || !!winner}
          >
            {cell && (
              <span className={cell === 'X' ? 'text-blue-600' : 'text-red-600'}>
                {cell}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
