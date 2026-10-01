import React from 'react';
import { Sparkles, Terminal, Award } from 'lucide-react';

export type AppTab = 'finder' | 'catalog' | 'basics' | 'simulator' | 'quiz';

interface NavbarProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  onRandomCat: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onRandomCat }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setActiveTab('finder')}
          className="text-left font-semibold text-sm sm:text-base text-slate-100 hover:text-amber-400 transition-colors whitespace-nowrap"
        >
          HTTP Cat Academy
        </button>

        {/* Zone 2: 4-5 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <button
            onClick={() => setActiveTab('finder')}
            className={`transition-colors whitespace-nowrap hover:text-white ${
              activeTab === 'finder' ? 'text-amber-400 font-semibold border-b-2 border-amber-400 pb-1' : 'text-slate-400'
            }`}
          >
            Type &amp; Learn
          </button>
          <button
            onClick={() => setActiveTab('catalog')}
            className={`transition-colors whitespace-nowrap hover:text-white ${
              activeTab === 'catalog' ? 'text-amber-400 font-semibold border-b-2 border-amber-400 pb-1' : 'text-slate-400'
            }`}
          >
            All Cats
          </button>
          <button
            onClick={() => setActiveTab('basics')}
            className={`transition-colors whitespace-nowrap hover:text-white ${
              activeTab === 'basics' ? 'text-amber-400 font-semibold border-b-2 border-amber-400 pb-1' : 'text-slate-400'
            }`}
          >
            API 101
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`transition-colors whitespace-nowrap hover:text-white ${
              activeTab === 'simulator' ? 'text-amber-400 font-semibold border-b-2 border-amber-400 pb-1' : 'text-slate-400'
            }`}
          >
            Live Simulator
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`transition-colors whitespace-nowrap hover:text-white ${
              activeTab === 'quiz' ? 'text-amber-400 font-semibold border-b-2 border-amber-400 pb-1' : 'text-slate-400'
            }`}
          >
            Scenario Quiz
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onRandomCat}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-700/80 rounded-md hover:bg-slate-800 hover:text-white transition-colors whitespace-nowrap"
            title="Inspect a random HTTP Cat"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Random Cat</span>
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 rounded-md hover:bg-amber-300 transition-colors whitespace-nowrap shadow-sm"
          >
            <Terminal className="w-3.5 h-3.5 text-slate-950" />
            <span>Test API</span>
          </button>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="flex md:hidden overflow-x-auto px-4 py-2 border-t border-slate-800/80 bg-slate-900/60 text-xs gap-4 no-scrollbar">
        <button
          onClick={() => setActiveTab('finder')}
          className={`whitespace-nowrap py-1 ${activeTab === 'finder' ? 'text-amber-400 font-bold border-b border-amber-400' : 'text-slate-400'}`}
        >
          Type &amp; Learn
        </button>
        <button
          onClick={() => setActiveTab('catalog')}
          className={`whitespace-nowrap py-1 ${activeTab === 'catalog' ? 'text-amber-400 font-bold border-b border-amber-400' : 'text-slate-400'}`}
        >
          All Cats
        </button>
        <button
          onClick={() => setActiveTab('basics')}
          className={`whitespace-nowrap py-1 ${activeTab === 'basics' ? 'text-amber-400 font-bold border-b border-amber-400' : 'text-slate-400'}`}
        >
          API 101
        </button>
        <button
          onClick={() => setActiveTab('simulator')}
          className={`whitespace-nowrap py-1 ${activeTab === 'simulator' ? 'text-amber-400 font-bold border-b border-amber-400' : 'text-slate-400'}`}
        >
          Simulator
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`whitespace-nowrap py-1 ${activeTab === 'quiz' ? 'text-amber-400 font-bold border-b border-amber-400' : 'text-slate-400'}`}
        >
          Quiz
        </button>
      </div>
    </header>
  );
};
