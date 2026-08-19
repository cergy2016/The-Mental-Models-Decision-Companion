import React from 'react';
import { Compass, Sparkles, Code, Volume2, VolumeX, BookOpen, Disc3, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  activeTab: 'wheel' | 'cards' | 'library';
  setActiveTab: (tab: 'wheel' | 'cards' | 'library') => void;
  soundEnabled: boolean;
  setSoundEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenEmbed: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  soundEnabled,
  setSoundEnabled,
  onOpenEmbed,
}) => {
  return (
    <header className="w-full pt-8 pb-6 border-b border-[#EAE7E0] mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        {/* Branding & Subtitle */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="sans inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-[#FAF8F2] text-[#718894] border border-[#EAE7E0]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C16657]"></span>
              chungbooks.fr &middot; Cognitive Frameworks
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-[#2D2C2A]">
            The Mental Models Decision Companion
          </h1>
          <p className="sans text-xs uppercase tracking-widest text-[#718894] font-semibold">
            Cognitive frameworks for clarity &amp; direction
          </p>
        </div>

        {/* Top Controls & Navigation */}
        <div className="flex items-center flex-wrap gap-2 self-start md:self-center"><a id="btn-back-to-chungbooks" href="https://chungbooks.fr/interactive-guides.html" className="sans inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-[#2D2C2A] bg-white border border-[#EAE7E0] hover:bg-[#FAF8F2] transition-colors shadow-xs" title="Back to Chung Books"><ArrowLeft className="w-3.5 h-3.5 text-[#C16657]" /><span>Chung Books</span></a>
          {/* Sound Toggle */}
          <button
            id="sound-toggle-btn"
            type="button"
            onClick={() => setSoundEnabled((prev) => !prev)}
            className="p-2.5 rounded-xl text-[#718894] hover:text-[#2D2C2A] hover:bg-[#FAF8F2] transition-colors border border-[#EAE7E0] bg-white shadow-xs"
            title={soundEnabled ? 'Mute sound effects' : 'Enable calm sound effects'}
            aria-label="Toggle Sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#C16657]" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
          </button>

          {/* Embed Code Modal Trigger */}
          <button
            id="open-embed-modal-btn"
            type="button"
            onClick={onOpenEmbed}
            className="sans inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-[#2D2C2A] bg-white border border-[#EAE7E0] hover:bg-[#FAF8F2] transition-colors shadow-xs"
            title="Get embeddable single-file HTML code for your website"
          >
            <Code className="w-3.5 h-3.5 text-[#C16657]" />
            <span>Embed Code</span>
          </button>

          {/* Tab Switcher */}
          <div className="inline-flex p-1 bg-[#FAF8F2] rounded-xl border border-[#EAE7E0]">
            <button
              id="tab-wheel-btn"
              type="button"
              onClick={() => setActiveTab('wheel')}
              className={`sans inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'wheel'
                  ? 'bg-white text-[#2D2C2A] shadow-xs'
                  : 'text-[#718894] hover:text-[#2D2C2A]'
              }`}
            >
              <Disc3 className="w-3.5 h-3.5 text-[#C16657]" />
              <span className="hidden sm:inline">Decision</span> Wheel
            </button>
            <button
              id="tab-cards-btn"
              type="button"
              onClick={() => setActiveTab('cards')}
              className={`sans inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'cards'
                  ? 'bg-white text-[#2D2C2A] shadow-xs'
                  : 'text-[#718894] hover:text-[#2D2C2A]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#718894]" />
              Card Pull
            </button>
            <button
              id="tab-library-btn"
              type="button"
              onClick={() => setActiveTab('library')}
              className={`sans inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'library'
                  ? 'bg-white text-[#2D2C2A] shadow-xs'
                  : 'text-[#718894] hover:text-[#2D2C2A]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#C16657]" />
              All Models
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
