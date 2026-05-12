import React from 'react';
import { ExternalLink, Globe, Lock } from 'lucide-react';

interface WebsiteAppProps {
  title: string;
  url: string;
}

export const WebsiteApp: React.FC<WebsiteAppProps> = ({ title, url }) => {
  const openSite = () => {
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col h-full bg-[#c0c0c0] text-black">
      <div className="flex items-center gap-2 p-1 border-b border-[#808080] bg-[#d4d0c8]">
        <Globe className="w-4 h-4 text-blue-700 flex-shrink-0" />
        <span className="text-xs font-bold hidden md:inline">Address</span>
        <div className="flex-1 h-6 border-2 border-[#808080] bg-white px-2 text-sm bevel-in shadow-inner font-sans text-black truncate flex items-center">
          {url}
        </div>
        <button
          onClick={openSite}
          className="px-2 md:px-3 h-6 bevel-out active:bevel-in text-xs font-bold flex items-center gap-1 whitespace-nowrap"
        >
          <ExternalLink className="w-3 h-3" />
          Open site
        </button>
      </div>

      <div className="flex-1 bg-white border-2 border-[#808080] bevel-in m-1 relative overflow-hidden flex flex-col">
        <iframe
          src={url}
          className="flex-1 w-full border-none"
          title={title}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />

        <div className="w-full bg-[#ffffe1] text-black text-xs p-1 border-t border-[#808080] flex justify-between items-center flex-wrap gap-2 px-2">
          <div className="flex items-center gap-2">
            <Lock className="w-3 h-3 text-yellow-600 flex-shrink-0" />
            <span>
              <span className="font-bold">Security Warning:</span> Some sites may not load in this frame.
            </span>
          </div>
          <button
            onClick={openSite}
            className="flex items-center gap-1 px-2 py-0.5 bg-[#c0c0c0] border border-black text-black text-xs bevel-out active:bevel-in"
          >
            <ExternalLink className="w-3 h-3" />
            Open in New Window
          </button>
        </div>
      </div>

      <div className="h-6 bg-[#c0c0c0] border-t border-[#dfdfdf] flex items-center px-2 text-xs bevel-in gap-2">
        <Globe className="w-3 h-3 text-blue-700" />
        <span className="truncate text-black">{url}</span>
        <div className="flex-1" />
        <div className="border-l border-[#808080] pl-2 pr-2 text-black">Internet Zone</div>
      </div>
    </div>
  );
};
