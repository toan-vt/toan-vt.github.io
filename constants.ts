
import { AppConfig, AppId, MockData, WindowState } from './types';

// Using classic Windows 98 icons from a CDN for authentic look
const ICONS = {
  computer: 'https://win98icons.alexmeub.com/icons/png/computer_explorer-5.png',
  notepad: 'https://win98icons.alexmeub.com/icons/png/notepad-0.png',
  calculator: 'https://win98icons.alexmeub.com/icons/png/calculator-0.png',
  terminal: 'https://win98icons.alexmeub.com/icons/png/console_prompt-0.png',
  paint: 'https://win98icons.alexmeub.com/icons/png/paint_file-2.png',
  ie: 'https://win98icons.alexmeub.com/icons/png/msie1-0.png',
  mine: 'https://win98icons.alexmeub.com/icons/png/game_mine_1-0.png',
  game: 'https://win98icons.alexmeub.com/icons/png/game_solitaire-0.png',
  ai: 'https://win98icons.alexmeub.com/icons/png/help_book_cool-0.png',
  user: 'https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png'
};

export const apps: Record<AppId, AppConfig> = {
  portfolio: {
    id: 'portfolio',
    title: 'My Computer',
    icon: ICONS.computer,
    description: 'My interactive portfolio',
    defaultSize: { width: 900, height: 700 }
  },
  terminal: {
    id: 'terminal',
    title: 'MS-DOS',
    icon: ICONS.terminal,
    description: 'Command line interface',
    defaultSize: { width: 700, height: 500 }
  },
  notepad: {
    id: 'notepad',
    title: 'Notepad',
    icon: ICONS.notepad,
    description: 'Text editor',
    defaultSize: { width: 600, height: 450 }
  },
  calculator: {
    id: 'calculator',
    title: 'Calculator',
    icon: ICONS.calculator,
    description: 'Standard calculator',
    defaultSize: { width: 320, height: 440 }
  },
  'ai-assistant': {
    id: 'ai-assistant',
    title: 'Gemini AI',
    icon: ICONS.ai,
    description: 'AI Assistant',
    defaultSize: { width: 500, height: 600 }
  },
  sketch: {
    id: 'sketch',
    title: 'Paint',
    icon: ICONS.paint,
    description: 'Create drawings',
    defaultSize: { width: 800, height: 600 }
  },
  browser: {
    id: 'browser',
    title: 'Internet',
    icon: ICONS.ie,
    description: 'Web Browser',
    defaultSize: { width: 900, height: 700 }
  },
  tictactoe: {
    id: 'tictactoe',
    title: 'TicTacToe',
    icon: ICONS.game,
    description: 'Classic Game',
    defaultSize: { width: 350, height: 400 }
  },
  minesweeper: {
    id: 'minesweeper',
    title: 'Minesweeper',
    icon: ICONS.mine,
    description: 'Find the mines',
    defaultSize: { width: 300, height: 380 }
  }
};

export const initialWindows: WindowState[] = [
  {
    id: 'portfolio',
    title: 'My Computer',
    icon: ICONS.computer,
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    position: { x: 140, y: 30 },
    size: { width: 900, height: 650 },
    zIndex: 1
  }
];

export const userProfile: MockData = {
  name: "Toan Tran",
  role: "PhD Student at Emory University",
  about: "I am a PhD student in Computer Science at Emory University, advised by Dr. Li Xiong. I build scalable, privacy-preserving ML/LLM systems by developing new LLM training methods, differentially private synthetic data generation algorithms, and emerging agentic frameworks that advance secure and trustworthy AI.",
  updates: [
    { date: "Oct 2025", text: "E​xpShi‍eld got accepted to NDSS'26." },
    { date: "Aug 2025", text: "This is to test our proposed E​xpShi‍eld!" },
    { date: "Jun 2025", text: "Our paper on leveraging LLMs for synthetic mobility data receives the best student paper award at IEEE MDM'25" },
    { date: "May 2025", text: "I will be interning at Oak Ridge National Laboratory this summer"},
    { date: "May 2025", text: "Our work DuoLearn on mitigating membership inference attacks for LLMs is accepted at ACL'25 (Findings)" },
    { date: "Aug 2024", text: "Presented our work on DP synthetic tabular generation using LLMs at TPDP'24" }
  ],
  papers: [
    {
      title: "Differentially private tabular data synthesis using large language models",
      authors: "Toan Tran and Li Xiong",
      venue: "presented at TPDP'24",
      link: "https://arxiv.org/abs/2406.01457",
      linkText: "arXiv"
    },
    {
      title: "Tokens for Learning, Tokens for Unlearning: Mitigating Membership Inference Attacks in Large Language Models via Dual-Purpose Training",
      authors: "Toan Tran, Ruixuan Liu, and Li Xiong",
      venue: "ACL'25 (Findings)",
      link: "https://arxiv.org/abs/2502.19726",
      linkText: "arXiv"
    }
  ],
  services: [
    "Reviewer for AAAI'26, Reliable ML @ NeurIPS'25, SIGSPATIAL 2025",
    "Reviewer for Workshop on Machine Learning for Autonomous Driving @ NeurIPS'22, '23; @ AAAI'25",
    "Reviewer for IEEE Transactions on Dependable and Secure Computing [2024]",
    "Reviewer for ACM Computing Surveys [2024]"
  ],
  blogs: [
    {
      title: "Privacy Agents: A New Privacy Assessment Framework",
      date: "2025-11-22",
      excerpt: "A new privacy assessment framework that uses LLMs to assess the privacy of a system. I also explore the use of LLMs to generate privacy policies and data use agreements."
    },
    // {
    //   title: "The Future of Privacy Preserving AI",
    //   date: "2024-12-10",
    //   excerpt: "Exploring how differential privacy can be applied to Large Language Models..."
    // }
  ],
  contact: {
    email: "vtran29@emory.edu", 
    github: "https://github.com/toan-vt",
    linkedin: "https://www.linkedin.com/in/toan-tranviet",
    location: "Atlanta, GA",
    googleScholar: "https://scholar.google.com/citations?hl=en&user=yyvEgnIAAAAJ&view_op=list_works&authuser=2&sortby=pubdate",
    advisorUrl: "https://www.cs.emory.edu/~lxiong/"
  }
};
