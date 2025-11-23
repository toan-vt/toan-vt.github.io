
import React from 'react';
import { AppConfig } from '../types';

interface DesktopIconProps {
  app: AppConfig;
  onClick: () => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({ app, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center gap-1 p-2 w-[80px] cursor-pointer group border border-transparent hover:bg-[#000080]/20 active:bg-[#000080]/40 active:border-dotted active:border-white/50 transition-none"
    >
      {/* Pixel Art Icon */}
      <img 
        src={app.icon} 
        alt={app.title} 
        className="w-10 h-10 object-contain rendering-pixelated filter drop-shadow-md"
        style={{ imageRendering: 'pixelated' }}
      />
      
      {/* Text with classic Windows text-shadow for contrast */}
      <span className="text-white text-[11px] text-center font-normal leading-tight px-1 line-clamp-2 group-hover:bg-[#000080] group-active:bg-[#000080]"
            style={{ textShadow: '1px 1px 1px black' }}>
        {app.title}
      </span>
    </div>
  );
};
