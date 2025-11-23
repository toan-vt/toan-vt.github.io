import React, { useState, useRef, useEffect } from 'react';

export const Terminal: React.FC = () => {
  const [history, setHistory] = useState<string[]>(['ToanOS [Version 1.0.0]', '(c) 2024 Toan VT. All rights reserved.', '']);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const args = cmd.trim().split(' ');
    const command = args[0].toLowerCase();

    let output: string | string[] = [];

    switch (command) {
      case 'help':
        output = ['Available commands:', '  help     - Show this help message', '  clear    - Clear terminal', '  about    - Display user info', '  echo     - Print text', '  date     - Show current date'];
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'about':
        output = ['Toan VT', 'ML Engineer', 'Specializing in applied ML/LLM and privacy preserving AI.'];
        break;
      case 'echo':
        output = [args.slice(1).join(' ')];
        break;
      case 'date':
        output = [new Date().toString()];
        break;
      case '':
        output = [];
        break;
      default:
        output = [`Command not found: ${command}`];
    }

    setHistory((prev) => [...prev, `C:\\Users\\Guest> ${cmd}`, ...(Array.isArray(output) ? output : [output]), '']);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div className="h-full bg-black p-4 font-mono text-sm text-green-400 overflow-y-auto" onClick={() => document.getElementById('term-input')?.focus()}>
      {history.map((line, i) => (
        <div key={i} className="whitespace-pre-wrap">{line}</div>
      ))}
      <div className="flex">
        <span className="mr-2">C:\Users\Guest&gt;</span>
        <input
          id="term-input"
          className="flex-1 bg-transparent outline-none text-green-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          autoComplete="off"
        />
      </div>
      <div ref={endRef} />
    </div>
  );
};