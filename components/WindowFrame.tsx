
import React, { useRef, useEffect } from 'react';
import { WindowState } from '../types';
import { X, Minus, Square, Maximize2 } from 'lucide-react';

interface WindowFrameProps {
  window: WindowState;
  isActive: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onMove: (pos: { x: number; y: number }) => void;
  onResize: (size: { width: number; height: number }) => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
  isMobile?: boolean;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({
  window,
  isActive,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove,
  onResize,
  children,
  style,
  isMobile = false
}) => {
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.isMaximized || isMobile) return;
    onFocus();
    isDragging.current = true;
    dragOffset.current = {
      x: e.clientX - window.position.x,
      y: e.clientY - window.position.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging.current && !window.isMaximized && !isMobile) {
        onMove({
          x: e.clientX - dragOffset.current.x,
          y: e.clientY - dragOffset.current.y,
        });
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    if (isActive) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isActive, window.isMaximized, onMove, isMobile]);

  if (window.isMinimized) return null;

  const combinedStyle = {
    ...style,
    left: window.isMaximized ? 0 : window.position.x,
    top: window.isMaximized ? 0 : window.position.y,
    width: window.isMaximized ? '100%' : window.size.width,
    height: window.isMaximized ? 'calc(100% - 35px)' : window.size.height, // Taskbar height adjustment
    maxWidth: '100vw',
    maxHeight: 'calc(100dvh - 35px)',
    zIndex: isActive ? 100 : window.zIndex,
  };

  return (
    <div
      className="absolute flex flex-col bg-[#c0c0c0] p-[3px] bevel-window shadow-2xl"
      style={combinedStyle}
      onMouseDown={onFocus}
    >
      {/* Title Bar */}
      <div
        className={`h-6 px-1 flex items-center justify-between select-none mb-[2px] ${
          isActive ? 'bg-gradient-to-r from-[#000080] to-[#1084d0]' : 'bg-[#808080]'
        }`}
        onMouseDown={handleMouseDown}
        onDoubleClick={!isMobile ? onMaximize : undefined}
      >
        <div className="flex items-center gap-2 text-white font-bold text-xs tracking-wide truncate pr-2">
          <img src={window.icon} alt="icon" className="w-4 h-4" />
          <span>{window.title}</span>
        </div>
        <div className="flex items-center gap-[2px]">
          <button onClick={(e) => { e.stopPropagation(); onMinimize(); }} className="w-4 h-4 bg-[#c0c0c0] bevel-out flex items-center justify-center active:bevel-in">
            <Minus className="w-3 h-3 text-black" />
          </button>
          {!isMobile && (
             <button onClick={(e) => { e.stopPropagation(); onMaximize(); }} className="w-4 h-4 bg-[#c0c0c0] bevel-out flex items-center justify-center active:bevel-in">
               {window.isMaximized ? <Square className="w-3 h-3 text-black" /> : <Maximize2 className="w-3 h-3 text-black" />}
             </button>
          )}
          <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="w-4 h-4 bg-[#c0c0c0] bevel-out flex items-center justify-center active:bevel-in ml-1">
            <X className="w-3 h-3 text-black" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden bg-white border-t border-l border-[#808080] border-b border-r border-[#fff] relative">
        {children}
      </div>
    </div>
  );
};
