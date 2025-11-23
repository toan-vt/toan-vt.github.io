
import React, { useState, useEffect } from 'react';
import { WindowState, AppId } from '../types';

interface TaskbarProps {
  windows: WindowState[];
  activeWindowId: AppId | null;
  onAppClick: (id: AppId) => void;
  onStartClick: () => void;
  onMinimize: (id: AppId) => void;
  startMenuOpen: boolean;
}

export const Taskbar: React.FC<TaskbarProps> = ({
  windows,
  activeWindowId,
  onAppClick,
  onStartClick,
  onMinimize,
  startMenuOpen
}) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute bottom-0 left-0 w-full h-[35px] bg-[#c0c0c0] border-t-2 border-white flex items-center px-1 justify-between z-[9999] select-none shadow-[inset_0_1px_0_#fff]">
      <div className="flex items-center gap-1 h-full py-1 flex-1 overflow-hidden">
        <button
          id="start-button"
          onClick={onStartClick}
          className={`
            flex items-center gap-1 px-2 h-full min-w-[70px]
            bg-[#c0c0c0] 
            ${startMenuOpen ? 'bevel-in' : 'bevel-out'}
            active:bevel-in
          `}
        >
          <img 
             src="https://win98icons.alexmeub.com/icons/png/windows-0.png" 
             alt="win" 
             className="w-5 h-5"
          />
          <span className="font-bold text-sm md:text-base">Start</span>
        </button>

        <div className="w-[2px] h-6 bg-[#808080] border-r border-white mx-1 hidden md:block" />

        {/* Running Apps */}
        <div className="flex items-center gap-1 overflow-x-auto overflow-y-hidden no-scrollbar h-full w-full pr-2">
          {windows.map((window) => {
            const isActive = activeWindowId === window.id && !window.isMinimized;
            return (
              <button
                key={window.id}
                onClick={() => {
                  if (isActive) {
                    onMinimize(window.id);
                  } else {
                    onAppClick(window.id);
                  }
                }}
                className={`
                  flex items-center gap-2 px-2 h-full min-w-[40px] md:min-w-[140px] max-w-[160px]
                  truncate
                  ${isActive 
                    ? 'bg-[#e0e0e0] bevel-in border-dotted border border-black' 
                    : 'bg-[#c0c0c0] bevel-out'}
                `}
              >
                <img src={window.icon} alt="icon" className="w-4 h-4" />
                <span className="text-xs font-bold truncate hidden md:inline">
                  {window.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* System Tray */}
      <div className="h-[26px] px-2 md:px-3 flex items-center gap-2 bg-[#c0c0c0] bevel-in text-xs flex-shrink-0 ml-1">
        <img src="https://win98icons.alexmeub.com/icons/png/loudspeaker_rays-0.png" className="w-4 h-4 hidden md:block" alt="vol" />
        <span>
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};
