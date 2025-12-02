
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RefreshCw, Home, ExternalLink, Globe, Lock } from 'lucide-react';

export const Browser: React.FC = () => {
  const DEFAULT_URL = 'https://toan-vt.github.io/';
  const [url, setUrl] = useState(DEFAULT_URL);
  const [currentSrc, setCurrentSrc] = useState(DEFAULT_URL);

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    let target = url;
    if (!target.startsWith('http')) {
      target = 'https://' + target;
    }
    setCurrentSrc(target);
  };

  const openInNewTab = () => {
    window.open(currentSrc, '_blank');
  };

  const favorites = [
    { name: 'My Homepage', url: 'https://toan-vt.github.io/' },
    { name: 'WPEC Badminton Calendar', url: 'https://wpcal.github.io/' },
    { name: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Main_Page' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#c0c0c0] text-black">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-1 border-b border-[#808080] flex-wrap">
        <button className="w-6 h-6 md:w-8 md:h-8 bevel-out active:bevel-in flex items-center justify-center disabled:opacity-50"><ArrowLeft className="w-4 h-4" /></button>
        <button className="w-6 h-6 md:w-8 md:h-8 bevel-out active:bevel-in flex items-center justify-center disabled:opacity-50"><ArrowRight className="w-4 h-4" /></button>
        <button className="w-6 h-6 md:w-8 md:h-8 bevel-out active:bevel-in flex items-center justify-center"><RefreshCw className="w-4 h-4" /></button>
        <button onClick={() => { setCurrentSrc(DEFAULT_URL); setUrl(DEFAULT_URL); }} className="w-6 h-6 md:w-8 md:h-8 bevel-out active:bevel-in flex items-center justify-center"><Home className="w-4 h-4" /></button>
        
        <div className="w-[2px] h-6 bg-[#808080] border-r border-white mx-1 hidden md:block"></div>
        
        <form onSubmit={handleNavigate} className="flex-1 flex items-center gap-2 min-w-[150px]">
           <span className="text-xs font-bold hidden md:inline">Address</span>
           <div className="flex-1 relative">
             <input 
               type="text" 
               value={url}
               onChange={(e) => setUrl(e.target.value)}
               className="w-full h-6 border-2 border-[#808080] bg-white pl-2 pr-8 text-sm bevel-in shadow-inner font-sans text-black outline-none"
             />
             <div className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none">
                <img src="https://win98icons.alexmeub.com/icons/png/msie1-0.png" className="w-4 h-4" alt="ie" />
             </div>
           </div>
           <button type="submit" className="px-2 md:px-3 h-6 bevel-out active:bevel-in text-xs font-bold flex items-center gap-1">Go</button>
        </form>
      </div>

      {/* Favorites Bar (Mobile Friendly) */}
      <div className="flex items-center gap-2 p-1 border-b border-[#808080] bg-[#d4d0c8] overflow-x-auto no-scrollbar">
        <span className="text-xs font-bold px-1 text-gray-600">Links:</span>
        {favorites.map(fav => (
            <button 
                key={fav.name}
                onClick={() => {
                    setUrl(fav.url);
                    setCurrentSrc(fav.url);
                }}
                className="flex items-center gap-1 px-2 py-[1px] text-xs border border-transparent hover:border-[#808080] hover:bevel-out active:bevel-in whitespace-nowrap"
            >
                <Globe className="w-3 h-3 text-blue-600" />
                {fav.name}
            </button>
        ))}
      </div>
      
      {/* Content */}
      <div className="flex-1 bg-white border-2 border-[#808080] bevel-in m-1 relative overflow-hidden flex flex-col">
        <iframe 
          src={currentSrc} 
          className="flex-1 w-full border-none"
          title="Browser"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
        
        {/* Security/Error Fallback */}
        <div className="w-full bg-[#ffffe1] text-black text-xs p-1 border-t border-[#808080] flex justify-between items-center flex-wrap gap-2 px-2">
          <div className="flex items-center gap-2">
             <Lock className="w-3 h-3 text-yellow-600" />
             <span>
                <span className="font-bold">Security Warning:</span> Some sites may not load in this frame.
             </span>
          </div>
          <button 
            onClick={openInNewTab}
            className="flex items-center gap-1 px-2 py-0.5 bg-[#c0c0c0] border border-black text-black text-xs bevel-out active:bevel-in"
          >
            <ExternalLink className="w-3 h-3" /> Open in New Window
          </button>
        </div>
      </div>
      
      {/* Status Bar */}
      <div className="h-6 bg-[#c0c0c0] border-t border-[#dfdfdf] flex items-center px-2 text-xs bevel-in gap-2">
        <img src="https://win98icons.alexmeub.com/icons/png/msie1-0.png" className="w-3 h-3" alt="ie" />
        <span className="truncate text-black">{currentSrc}</span>
        <div className="flex-1"></div>
        <div className="border-l border-[#808080] pl-2 pr-2 text-black">Internet Zone</div>
      </div>
    </div>
  );
};
