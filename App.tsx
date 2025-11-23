
import React, { useState, useEffect, useRef } from 'react';
import { apps, initialWindows } from './constants';
import { AppId, WindowState } from './types';
import { Taskbar } from './components/Taskbar';
import { WindowFrame } from './components/WindowFrame';
import { DesktopIcon } from './components/DesktopIcon';
import { StartMenu } from './components/StartMenu';

// Import App Components
import { Portfolio } from './components/apps/Portfolio';
import { Notepad } from './components/apps/Notepad';
import { Calculator } from './components/apps/Calculator';
import { Terminal } from './components/apps/Terminal';
import { AiAssistant } from './components/apps/AiAssistant';
import { Sketch } from './components/apps/Sketch';
import { Browser } from './components/apps/Browser';
import { TicTacToe } from './components/apps/TicTacToe';
import { Minesweeper } from './components/apps/Minesweeper';

const App: React.FC = () => {
  // Simple mobile detection
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Initialize windows with mobile check
  const [windows, setWindows] = useState<WindowState[]>(() => {
    if (isMobile) {
      return initialWindows.map(w => ({
        ...w,
        isMaximized: true,
        position: { x: 0, y: 0 }
      }));
    }
    // Calculate responsive size for initial Portfolio window
    const updatedWindows = initialWindows.map(w => {
      if (w.id === 'portfolio' && typeof window !== 'undefined') {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const taskbarHeight = 35;
        return {
          ...w,
          size: {
            width: Math.floor(viewportWidth * 0.8),
            height: Math.floor((viewportHeight - taskbarHeight) * 0.8)
          },
          position: {
            x: Math.floor((viewportWidth - Math.floor(viewportWidth * 0.8)) / 2),
            y: Math.floor((viewportHeight - taskbarHeight - Math.floor((viewportHeight - taskbarHeight) * 0.8)) / 2)
          }
        };
      }
      return w;
    });
    return updatedWindows;
  });

  const [activeWindowId, setActiveWindowId] = useState<AppId | null>(null);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const desktopRef = useRef<HTMLDivElement>(null);
  
  // Open or focus an app
  const openApp = (appId: AppId) => {
    setStartMenuOpen(false);
    const existingWindow = windows.find((w) => w.id === appId);

    if (existingWindow) {
      // Restore if minimized, bring to front
      setWindows((prev) =>
        prev.map((w) =>
          w.id === appId ? { ...w, isMinimized: false } : w
        )
      );
      setActiveWindowId(appId);
    } else {
      // Create new window
      const appConfig = apps[appId];
      
      // Calculate responsive size for Portfolio window (covers most of screen)
      let windowSize = appConfig.defaultSize || { width: 800, height: 600 };
      let viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
      let viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;
      const taskbarHeight = 35; // Taskbar height
      
      if (appId === 'portfolio' && typeof window !== 'undefined') {
        viewportWidth = window.innerWidth;
        viewportHeight = window.innerHeight;
        // Use 90% of viewport, leaving some margin
        windowSize = {
          width: Math.floor(viewportWidth * 0.9),
          height: Math.floor((viewportHeight - taskbarHeight) * 0.9)
        };
      }
      
      const newWindow: WindowState = {
        id: appId,
        title: appConfig.title,
        icon: appConfig.icon,
        isOpen: true,
        isMinimized: false,
        // Auto maximize on mobile
        isMaximized: isMobile,
        position: { 
            // Start at x: 140 to avoid covering left-side desktop icons on desktop
            // For portfolio, center it on screen
            x: isMobile ? 0 : appId === 'portfolio' 
              ? Math.floor((viewportWidth - windowSize.width) / 2)
              : 140 + (windows.length * 30) % 200, 
            y: isMobile ? 0 : appId === 'portfolio'
              ? Math.floor((viewportHeight - taskbarHeight - windowSize.height) / 2)
              : 40 + (windows.length * 30) % 200 
        },
        size: windowSize,
        zIndex: windows.length + 1,
      };
      setWindows((prev) => [...prev, newWindow]);
      setActiveWindowId(appId);
    }
  };

  const closeWindow = (id: AppId) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const minimizeWindow = (id: AppId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
    setActiveWindowId(null);
  };

  const toggleMaximizeWindow = (id: AppId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w))
    );
    setActiveWindowId(id);
  };

  const focusWindow = (id: AppId) => {
    setActiveWindowId(id);
    setWindows((prev) => {
      const w = prev.find((x) => x.id === id);
      if (!w) return prev;
      const others = prev.filter((x) => x.id !== id);
      return [...others, w];
    });
  };

  const updateWindowPosition = (id: AppId, position: { x: number; y: number }) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, position } : w))
    );
  };

  const updateWindowSize = (id: AppId, size: { width: number; height: number }) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, size } : w))
    );
  };

  const renderAppContent = (id: AppId) => {
    switch (id) {
      case 'portfolio': return <Portfolio />;
      case 'notepad': return <Notepad />;
      case 'calculator': return <Calculator />;
      case 'terminal': return <Terminal />;
      case 'ai-assistant': return <AiAssistant />;
      case 'sketch': return <Sketch />;
      case 'browser': return <Browser />;
      case 'tictactoe': return <TicTacToe />;
      case 'minesweeper': return <Minesweeper />;
      default: return <div className="p-4">App not found</div>;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('#start-menu') && !target.closest('#start-button')) {
        setStartMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div 
      className="h-[100dvh] w-screen overflow-hidden relative font-sans select-none bg-[#008080]"
      ref={desktopRef}
    >
      {/* Desktop Grid - Responsive */}
      <div className="absolute top-0 left-0 h-full w-full p-2 md:p-4 grid grid-flow-col grid-rows-[repeat(auto-fill,90px)] gap-4 content-start justify-start z-0">
        {Object.entries(apps).map(([key, app]) => (
          <DesktopIcon
            key={key}
            app={app}
            onClick={() => openApp(key as AppId)}
          />
        ))}
      </div>

      {/* Windows */}
      {windows.map((window, index) => (
        <WindowFrame
          key={window.id}
          window={window}
          isActive={activeWindowId === window.id}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => minimizeWindow(window.id)}
          onMaximize={() => toggleMaximizeWindow(window.id)}
          onFocus={() => focusWindow(window.id)}
          onMove={(pos) => updateWindowPosition(window.id, pos)}
          onResize={(size) => updateWindowSize(window.id, size)}
          style={{ zIndex: 10 + index }}
          isMobile={isMobile}
        >
          {renderAppContent(window.id)}
        </WindowFrame>
      ))}

      {/* Start Menu */}
      {startMenuOpen && (
        <StartMenu 
          apps={apps} 
          onAppClick={openApp} 
        />
      )}

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        activeWindowId={activeWindowId}
        onAppClick={openApp}
        onStartClick={() => setStartMenuOpen(!startMenuOpen)}
        onMinimize={minimizeWindow}
        startMenuOpen={startMenuOpen}
      />
    </div>
  );
};

export default App;
