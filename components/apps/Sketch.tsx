import React, { useRef, useState, useEffect } from 'react';
import { Eraser, Paintbrush, Trash2 } from 'lucide-react';

export const Sketch: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(2);
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.parentElement?.clientWidth || 600;
      canvas.height = canvas.parentElement?.clientHeight || 400;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  const startDrawing = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;

    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="flex flex-col h-full bg-[#c0c0c0]">
      <div className="flex items-center gap-2 p-2 border-b border-[#808080]">
        <button 
          onClick={() => setTool('pen')} 
          className={`p-1 bevel-out active:bevel-in ${tool === 'pen' ? 'bg-[#dfdfdf] bevel-in' : ''}`}
        >
          <Paintbrush className="w-4 h-4" />
        </button>
        <button 
          onClick={() => setTool('eraser')} 
          className={`p-1 bevel-out active:bevel-in ${tool === 'eraser' ? 'bg-[#dfdfdf] bevel-in' : ''}`}
        >
          <Eraser className="w-4 h-4" />
        </button>
        <div className="w-[2px] h-6 bg-[#808080] border-r border-white mx-1"></div>
        <input 
          type="color" 
          value={color} 
          onChange={(e) => setColor(e.target.value)}
          className="w-6 h-6 p-0 border-none"
        />
        <select 
          value={lineWidth} 
          onChange={(e) => setLineWidth(Number(e.target.value))}
          className="h-6 text-xs border border-[#808080]"
        >
          <option value="1">1px</option>
          <option value="2">2px</option>
          <option value="5">5px</option>
          <option value="10">10px</option>
        </select>
        <div className="flex-1"></div>
        <button onClick={clearCanvas} className="p-1 bevel-out active:bevel-in text-red-600">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-1 p-4 bg-[#808080] overflow-hidden relative">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="bg-white cursor-crosshair shadow-md"
        />
      </div>
      <div className="h-6 bg-[#c0c0c0] border-t border-[#dfdfdf] text-xs px-2 flex items-center">
        {tool.toUpperCase()} - {lineWidth}px
      </div>
    </div>
  );
};