
import React from 'react';
import { AppConfig, AppId } from '../types';
import { userProfile } from '../constants';

interface StartMenuProps {
  apps: Record<AppId, AppConfig>;
  onAppClick: (id: AppId) => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({ apps, onAppClick }) => {
  return (
    <div 
      id="start-menu"
      className="absolute bottom-[35px] left-0 w-[280px] max-w-[90vw] bg-[#c0c0c0] bevel-out flex z-[10000]"
    >
      {/* Sidebar Strip */}
      <div className="w-8 bg-[#000080] flex items-end justify-center pb-2 bg-gradient-to-b from-[#000080] to-[#1084d0]">
         <div className="text-white font-bold text-xl -rotate-90 whitespace-nowrap tracking-widest mb-4 transform origin-center translate-y-[-20px]">
            TOAN<span className="font-light">OS</span> 98
         </div>
      </div>

      <div className="flex-1 p-1 flex flex-col gap-[2px]">
        {/* User Header */}
        <div className="px-2 py-3 border-b border-gray-400 mb-1 bg-[#c0c0c0]">
            <div className="font-bold text-sm truncate">{userProfile.name}</div>
        </div>

        {Object.values(apps).map((app: AppConfig) => {
          return (
            <button
              key={app.id}
              onClick={() => onAppClick(app.id)}
              className="w-full flex items-center gap-3 px-2 py-2 hover:bg-[#000080] hover:text-white text-black group text-left text-sm"
            >
              <img src={app.icon} alt={app.title} className="w-8 h-8" />
              <div className="flex flex-col">
                <span className="font-bold leading-none">{app.title}</span>
                <span className="text-[10px] opacity-70 group-hover:text-white text-gray-600 leading-none mt-1">{app.description}</span>
              </div>
            </button>
          );
        })}

        <div className="h-[1px] bg-white border-b border-[#808080] my-1"></div>

        <button className="w-full flex items-center gap-3 px-2 py-2 hover:bg-[#000080] hover:text-white text-black group text-left">
           <div className="w-8 flex justify-center">
              <img src="https://win98icons.alexmeub.com/icons/png/shut_down_cool-0.png" className="w-8 h-8" alt="shutdown" />
           </div>
           <span className="text-sm font-bold">Shut Down...</span>
        </button>
      </div>
    </div>
  );
};
