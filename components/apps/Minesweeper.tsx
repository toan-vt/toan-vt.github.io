import React, { useState, useEffect } from 'react';
import { Smile, Frown, Meh } from 'lucide-react';

// Simple Minesweeper Logic
const WIDTH = 9;
const MINES = 10;

interface Cell {
  id: number;
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborCount: number;
}

export const Minesweeper: React.FC = () => {
  const [grid, setGrid] = useState<Cell[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [flags, setFlags] = useState(MINES);

  const initGame = () => {
    // Create empty grid
    let newGrid: Cell[] = Array(WIDTH * WIDTH).fill(null).map((_, i) => ({
      id: i,
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      neighborCount: 0
    }));

    // Place mines
    let minesPlaced = 0;
    while (minesPlaced < MINES) {
      const idx = Math.floor(Math.random() * (WIDTH * WIDTH));
      if (!newGrid[idx].isMine) {
        newGrid[idx].isMine = true;
        minesPlaced++;
      }
    }

    // Calculate neighbors
    for (let i = 0; i < newGrid.length; i++) {
      if (!newGrid[i].isMine) {
        let count = 0;
        const x = i % WIDTH;
        const y = Math.floor(i / WIDTH);
        
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            if (dx === 0 && dy === 0) continue;
            const nx = x + dx;
            const ny = y + dy;
            if (nx >= 0 && nx < WIDTH && ny >= 0 && ny < WIDTH) {
              const nIdx = ny * WIDTH + nx;
              if (newGrid[nIdx].isMine) count++;
            }
          }
        }
        newGrid[i].neighborCount = count;
      }
    }
    setGrid(newGrid);
    setGameOver(false);
    setWin(false);
    setFlags(MINES);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCellClick = (index: number) => {
    if (gameOver || win || grid[index].isFlagged || grid[index].isRevealed) return;

    const newGrid = [...grid];
    if (newGrid[index].isMine) {
      // Boom
      newGrid[index].isRevealed = true;
      setGameOver(true);
      // Reveal all mines
      newGrid.forEach(cell => {
          if (cell.isMine) cell.isRevealed = true;
      });
    } else {
      // Reveal
      reveal(newGrid, index);
    }
    setGrid(newGrid);
    checkWin(newGrid);
  };

  const handleRightClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    if (gameOver || win || grid[index].isRevealed) return;
    
    const newGrid = [...grid];
    if (!newGrid[index].isFlagged && flags > 0) {
        newGrid[index].isFlagged = true;
        setFlags(f => f - 1);
    } else if (newGrid[index].isFlagged) {
        newGrid[index].isFlagged = false;
        setFlags(f => f + 1);
    }
    setGrid(newGrid);
  };

  const reveal = (g: Cell[], idx: number) => {
    const cell = g[idx];
    if (cell.isRevealed || cell.isFlagged) return;
    cell.isRevealed = true;
    
    if (cell.neighborCount === 0) {
      const x = idx % WIDTH;
      const y = Math.floor(idx / WIDTH);
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
           const nx = x + dx;
           const ny = y + dy;
           if (nx >= 0 && nx < WIDTH && ny >= 0 && ny < WIDTH) {
             reveal(g, ny * WIDTH + nx);
           }
        }
      }
    }
  };

  const checkWin = (g: Cell[]) => {
      const nonMines = g.filter(c => !c.isMine);
      if (nonMines.every(c => c.isRevealed)) {
          setWin(true);
      }
  };

  const getCellColor = (count: number) => {
      const colors = ['', 'text-blue-600', 'text-green-600', 'text-red-600', 'text-purple-800', 'text-red-800', 'text-teal-600', 'text-black', 'text-gray-600'];
      return colors[count] || 'text-black';
  };

  return (
    <div className="h-full bg-[#c0c0c0] p-2 flex flex-col items-center">
       <div className="w-full bg-[#c0c0c0] border-2 border-[#808080] border-b-white border-r-white p-1 flex justify-between items-center mb-2 bevel-in">
          <div className="bg-black text-red-600 font-mono text-xl px-1 border bevel-in w-12 text-right">
              {String(flags).padStart(3, '0')}
          </div>
          <button onClick={initGame} className="w-8 h-8 bg-[#c0c0c0] bevel-out active:bevel-in flex items-center justify-center">
             {gameOver ? <Frown className="w-5 h-5 text-yellow-600 fill-black" /> : win ? <Smile className="w-5 h-5 text-yellow-400 fill-black" /> : <Meh className="w-5 h-5 text-yellow-400 fill-black" />}
          </button>
          <div className="bg-black text-red-600 font-mono text-xl px-1 border bevel-in w-12 text-right">
              999
          </div>
       </div>
       
       <div className="bg-[#808080] p-1 bevel-window">
           <div className="grid grid-cols-9 gap-[1px]">
               {grid.map((cell) => (
                   <div
                     key={cell.id}
                     className={`
                        w-6 h-6 flex items-center justify-center text-xs font-bold cursor-default select-none
                        ${cell.isRevealed 
                            ? 'bg-[#c0c0c0] border border-[#808080] border-t-0 border-l-0' 
                            : 'bg-[#c0c0c0] bevel-out active:bevel-in'}
                     `}
                     onClick={() => handleCellClick(cell.id)}
                     onContextMenu={(e) => handleRightClick(e, cell.id)}
                   >
                       {cell.isRevealed && cell.isMine && <div className="w-3 h-3 bg-black rounded-full"></div>}
                       {cell.isRevealed && !cell.isMine && cell.neighborCount > 0 && (
                           <span className={getCellColor(cell.neighborCount)}>{cell.neighborCount}</span>
                       )}
                       {cell.isFlagged && !cell.isRevealed && <div className="text-red-600">P</div>}
                   </div>
               ))}
           </div>
       </div>
    </div>
  );
};