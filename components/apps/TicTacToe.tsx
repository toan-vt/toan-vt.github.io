import React, { useState } from 'react';

type Square = 'X' | 'O' | null;

export const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<Square[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (squares: Square[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i: number) => {
    if (calculateWinner(board) || board[i]) return;
    const nextBoard = board.slice();
    nextBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(nextBoard);
    setXIsNext(!xIsNext);
  };

  const winner = calculateWinner(board);
  const status = winner ? 'Winner: ' + winner : 'Next player: ' + (xIsNext ? 'X' : 'O');
  
  const reset = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="h-full bg-[#c0c0c0] flex flex-col items-center justify-center p-4">
      <div className="mb-4 text-lg font-bold">{status}</div>
      <div className="grid grid-cols-3 gap-1 bg-[#808080] p-1 bevel-in">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className="w-16 h-16 bg-[#c0c0c0] text-3xl font-bold flex items-center justify-center bevel-out active:bevel-in"
          >
            {cell}
          </button>
        ))}
      </div>
      <button onClick={reset} className="mt-4 px-4 py-1 bevel-out active:bevel-in font-bold">
        Restart Game
      </button>
    </div>
  );
};