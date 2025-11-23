import React, { useState, useRef } from 'react';

export const Notepad: React.FC = () => {
  const [content, setContent] = useState("Welcome to ToanOS 98!\n\nFeel free to type your notes here...");
  const editorRef = useRef<HTMLDivElement>(null);

  const execCmd = (command: string) => {
    document.execCommand(command, false);
    editorRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-full bg-white text-black font-mono text-sm">
      {/* Menu Bar */}
      <div className="flex gap-1 px-1 py-0.5 bg-[#c0c0c0] border-b border-[#808080]">
        {['File', 'Edit', 'Search', 'Help'].map(menu => (
          <button key={menu} className="px-2 hover:bg-[#000080] hover:text-white focus:outline-none text-sm rounded-none">
            {menu}
          </button>
        ))}
      </div>

      {/* Toolbar (Fake but functional for simple formatting) */}
      <div className="flex gap-1 p-1 bg-[#c0c0c0] border-b border-white">
        <button onClick={() => execCmd('bold')} className="w-6 h-6 font-bold bg-[#c0c0c0] bevel-out active:bevel-in flex items-center justify-center text-xs">B</button>
        <button onClick={() => execCmd('italic')} className="w-6 h-6 italic bg-[#c0c0c0] bevel-out active:bevel-in flex items-center justify-center text-xs font-serif">I</button>
        <button onClick={() => execCmd('underline')} className="w-6 h-6 underline bg-[#c0c0c0] bevel-out active:bevel-in flex items-center justify-center text-xs">U</button>
      </div>

      <div 
        ref={editorRef}
        className="flex-1 p-2 outline-none overflow-auto bg-white whitespace-pre-wrap"
        contentEditable
        suppressContentEditableWarning
        style={{ fontFamily: '"Courier New", Courier, monospace' }}
      >
        {content}
      </div>
      
      {/* Status Bar */}
      <div className="h-6 bg-[#c0c0c0] border-t border-[#dfdfdf] flex items-center px-2 text-xs gap-4 bevel-in">
         <span className="flex-1"></span>
         <span className="border-l border-[#808080] pl-2">Ln 1, Col 1</span>
      </div>
    </div>
  );
};