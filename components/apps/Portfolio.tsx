
import React, { useState } from 'react';
import { userProfile } from '../../constants';
import { Github, Mail, BookOpen, Briefcase, Home, FileText, Newspaper, MapPin, GraduationCap } from 'lucide-react';

type PageId = 'home' | 'publications' | 'services' | 'blogs';

export const Portfolio: React.FC = () => {
  const [activePage, setActivePage] = useState<PageId>('home');

  const pages: { id: PageId; label: string; icon: any }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'publications', label: 'Publications', icon: BookOpen },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'blogs', label: 'Blogs', icon: FileText },
  ];

  const renderContent = () => {
    switch (activePage) {
      case 'home':
        return (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* About Section */}
            <section>
                <div className="flex items-center gap-2 border-b-2 border-[#000080] mb-3 pb-1">
                    <Home className="w-5 h-5 text-[#000080]" />
                    <h3 className="text-lg font-bold font-sans uppercase text-[#000080]">About</h3>
                </div>
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 text-lg leading-relaxed text-gray-800 font-serif">
                        <p>
                            {userProfile.about.split('Dr. Li Xiong').map((part, index, array) => {
                                if (index === array.length - 1) {
                                    return <span key={index}>{part}</span>;
                                }
                                return (
                                    <span key={index}>
                                        {part}
                                        {userProfile.contact.advisorUrl ? (
                                            <a 
                                                href={userProfile.contact.advisorUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-800 hover:underline font-serif"
                                            >
                                                Dr. Li Xiong
                                            </a>
                                        ) : (
                                            'Dr. Li Xiong'
                                        )}
                                    </span>
                                );
                            })}
                        </p>
                    </div>
                    <div className="bg-[#ffffcc] border border-black p-3 shadow-md min-w-[200px] text-sm font-sans">
                        <div className="font-bold border-b border-gray-400 mb-2 pb-1">Quick Info</div>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-blue-800"/>
                                <span>{userProfile.contact.location}</span>
                            </div>
                            <a href={`https://${userProfile.contact.github}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:underline text-blue-800">
                                <Github className="w-4 h-4" /> Github
                            </a>
                            <a href={`mailto:${userProfile.contact.email}`} className="flex items-center gap-2 hover:underline text-blue-800">
                                <Mail className="w-4 h-4" /> Email
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recent Updates */}
            <section>
                <div className="flex items-center gap-2 border-b-2 border-[#000080] mb-4 pb-1">
                    <Newspaper className="w-5 h-5 text-[#000080]" />
                    <h3 className="text-lg font-bold font-sans uppercase text-[#000080]">Recent Updates</h3>
                </div>
                <div className="bg-white border border-gray-400 p-4">
                    <ul className="space-y-4">
                        {userProfile.updates.map((update, idx) => (
                            <li key={idx} className="flex flex-col md:flex-row md:gap-4 items-start group">
                                <span className="font-bold font-mono text-xs text-white bg-[#000080] px-2 py-0.5 rounded-none shrink-0 mt-1 group-hover:bg-blue-600">
                                    {update.date}
                                </span>
                                <span className="text-gray-900 font-serif leading-relaxed border-b border-dotted border-gray-300 w-full pb-1">{update.text}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
          </div>
        );

      case 'publications':
        return (
          <div className="animate-in fade-in duration-300">
            <div className="flex items-center gap-2 border-b-2 border-[#000080] mb-6 pb-1">
                <BookOpen className="w-5 h-5 text-[#000080]" />
                <h3 className="text-lg font-bold font-sans uppercase text-[#000080]">Selected Publications</h3>
            </div>
            {userProfile.contact.googleScholar && (
                <div className="mt-8 flex justify-center pb-4">
                    <a 
                        href={userProfile.contact.googleScholar}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-[#c0c0c0] border-2 border-[#fff] border-b-[#000] border-r-[#000] hover:bg-[#d4d0c8] active:border-[#000] active:border-b-[#fff] active:border-r-[#fff] transition-none text-[#000080] font-bold font-sans shadow-md active:shadow-sm active:translate-y-[1px]"
                    >
                        <GraduationCap className="w-5 h-5" />
                        View Google Scholar Profile
                    </a>
                </div>
            )}
            <div className="space-y-4">
                {userProfile.papers.map((paper, idx) => (
                    <div key={idx} className="bg-white border-2 border-transparent hover:border-[#000080] hover:bg-blue-50 p-4 transition-all shadow-sm">
                        <h4 className="font-bold text-xl leading-tight mb-2 text-[#000080] font-serif">
                            "{paper.title}"
                        </h4>
                        <p className="text-gray-700 italic mb-2 border-l-2 border-gray-300 pl-3">
                            {paper.authors}
                        </p>
                        <div className="flex items-center justify-between bg-gray-100 p-2 rounded-sm border border-gray-200">
                            <span className="font-bold text-gray-700 text-xs uppercase tracking-wider">{paper.venue}</span>
                            {paper.link && (
                                <a 
                                  href={paper.link} 
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-white bg-[#000080] px-3 py-0.5 text-xs font-bold hover:bg-blue-600 bevel-out active:bevel-in"
                                >
                                    VIEW {paper.linkText || 'PAPER'}
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>            
          </div>
        );

      case 'services':
        return (
          <div className="animate-in fade-in duration-300">
            <div className="flex items-center gap-2 border-b-2 border-[#000080] mb-6 pb-1">
                <Briefcase className="w-5 h-5 text-[#000080]" />
                <h3 className="text-lg font-bold font-sans uppercase text-[#000080]">Academic Services</h3>
            </div>
            <div className="bg-[#f0f0f0] border border-gray-400 p-6 inset-shadow">
                <ul className="space-y-3">
                    {userProfile.services.map((service, idx) => (
                        <li key={idx} className="flex gap-3 items-start">
                            <div className="w-2 h-2 bg-[#000080] mt-2 shrink-0"></div>
                            <span className="text-gray-800 font-serif text-lg">{service}</span>
                        </li>
                    ))}
                </ul>
            </div>
          </div>
        );

      case 'blogs':
        return (
            <div className="animate-in fade-in duration-300">
                 <div className="flex items-center gap-2 border-b-2 border-[#000080] mb-6 pb-1">
                    <FileText className="w-5 h-5 text-[#000080]" />
                    <h3 className="text-lg font-bold font-sans uppercase text-[#000080]">Research Blogs</h3>
                </div>
                {userProfile.blogs && userProfile.blogs.length > 0 ? (
                    <div className="grid gap-4">
                         {userProfile.blogs.map((blog, idx) => (
                             <div key={idx} className="border border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer">
                                 <h4 className="font-bold text-lg text-[#000080] mb-1">{blog.title}</h4>
                                 <div className="text-xs text-gray-500 font-mono mb-2">{blog.date}</div>
                                 <p className="text-gray-700 font-serif">{blog.excerpt}</p>
                             </div>
                         ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-500 bg-gray-100 border-2 border-dashed border-gray-300">
                        <FileText className="w-12 h-12 mb-2 opacity-20" />
                        <p>No blog posts available yet.</p>
                    </div>
                )}
            </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#c0c0c0] text-black font-serif select-text">
      {/* Top Banner / Branding */}
      <div className="bg-[#000080] text-white p-4 flex items-center gap-4 shrink-0">
         <img 
            src="/images/profile.png" 
            alt="Toan Tran" 
            className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white border-2 border-white shadow-lg object-cover hidden md:block"
         />
         <div>
            <h1 className="text-2xl md:text-3xl font-bold font-sans tracking-wider">{userProfile.name}</h1>
            <h2 className="text-sm md:text-base text-gray-300 font-sans">{userProfile.role}</h2>
         </div>
      </div>

      {/* Navigation Toolbar */}
      <div className="bg-[#d4d0c8] border-b border-[#808080] p-1 flex gap-1 shrink-0 overflow-x-auto">
        {pages.map((page) => {
            const Icon = page.icon;
            const isActive = activePage === page.id;
            return (
                <button
                    key={page.id}
                    onClick={() => setActivePage(page.id)}
                    className={`
                        flex items-center gap-2 px-4 py-2 min-w-[100px]
                        text-sm font-bold font-sans
                        transition-none
                        ${isActive 
                            ? 'bg-white border-2 border-l-black border-t-black border-r-white border-b-white shadow-[inset_1px_1px_0px_rgba(0,0,0,0.5)]' 
                            : 'bg-[#c0c0c0] border-2 border-white border-b-black border-r-black hover:bg-[#d4d0c8] active:border-l-black active:border-t-black active:border-r-white active:border-b-white'}
                    `}
                >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-blue-800' : 'text-gray-600'}`} />
                    {page.label}
                </button>
            );
        })}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-6 bg-[#fff] border-2 border-[#808080] m-2 bevel-in shadow-inner">
        <div className="max-w-4xl mx-auto">
            {renderContent()}
        </div>
        
        {/* Footer */}
        <div className="mt-12 text-center text-xs font-sans text-gray-400 border-t border-gray-200 pt-4">
           Vibe Coded with Gemini 3, 2025
        </div>
      </div>
    </div>
  );
};