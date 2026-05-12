export type AppId = 'portfolio' | 'notepad' | 'calculator' | 'terminal' | 'ai-assistant' | 'sketch' | 'browser' | 'tictactoe' | 'minesweeper' | 'badminton' | 'automia';

export interface AppConfig {
  id: AppId;
  title: string;
  type?: 'native' | 'website';
  icon?: string; // URL to the icon image
  description: string;
  url?: string;
  defaultSize?: { width: number; height: number };
}

export interface WindowState {
  id: AppId;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

export interface MockData {
  name: string;
  role: string;
  about: string;
  updates: { date: string; text: string }[];
  papers: { 
    title: string; 
    authors: string; 
    description: string; 
    venue?: string;
    link?: string; 
    linkText?: string;
    demoAppId?: AppId;
  }[];
  services: string[];
  blogs: { title: string; date: string; excerpt: string }[];
  contact: { 
    email: string; 
    github: string; 
    linkedin: string; 
    location: string;
    googleScholar?: string;
    advisorUrl?: string;
  };
}
