import React from 'react';
import { X, ArrowRight, Lightbulb, Sparkles } from 'lucide-react';
import { CATEGORIZED_PRESET_DILEMMAS } from '../data/models';

interface DilemmaInputProps {
  dilemma: string;
  setDilemma: (val: string) => void;
  onDraw: () => void;
  isDrawing: boolean;
  activeTab: 'wheel' | 'cards' | 'library';
}

export const DilemmaInput: React.FC<DilemmaInputProps> = ({
  dilemma,
  setDilemma,
  onDraw,
  isDrawing,
  activeTab,
}) => {
  return (
    <section className="w-full paper-card rounded-[28px] p-6 sm:p-8 mb-8 transition-shadow duration-200">
      <div className="flex items-center justify-between gap-2 mb-3">
        <label htmlFor="dilemma-textarea" className="sans text-xs uppercase font-bold text-[#2D2C2A] opacity-75 tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C16657]"></span>
          <span>Your Current Dilemma or Crossroad</span>
        </label>
        <span className="sans text-[11px] text-[#718894] uppercase tracking-wider font-semibold">Optional</span>
      </div>

      <div className="relative mb-3">
        <textarea
          id="dilemma-textarea"
          rows={3}
          value={dilemma}
          onChange={(e) => setDilemma(e.target.value)}
          placeholder="e.g., Should I launch my new initiative now or wait for more certainty? How should I handle a difficult personal friction?"
          className="w-full p-4 sm:p-5 bg-white border border-[#EAE7E0] rounded-2xl text-base sm:text-lg resize-y focus:outline-none focus:border-[#C16657] transition-colors shadow-inner italic text-[#2D2C2A] placeholder:text-[#718894]/60 placeholder:not-italic"
          maxLength={300}
        />
        {dilemma.length > 0 && (
          <button
            type="button"
            onClick={() => setDilemma('')}
            className="absolute top-3.5 right-3.5 text-[#718894] hover:text-[#2D2C2A] p-1.5 rounded-lg bg-[#FAF8F2] hover:bg-[#EAE7E0] transition-colors cursor-pointer"
            title="Clear text"
            aria-label="Clear input"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Categorized Preset Inspiration Chips */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-6">
        <span className="sans text-[11px] uppercase tracking-wider font-bold text-[#718894] mr-1 flex items-center gap-1">
          <Lightbulb className="w-3.5 h-3.5 text-[#C16657]" />
          Quick Prompts:
        </span>
        {CATEGORIZED_PRESET_DILEMMAS.map((item, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setDilemma(item.prompt)}
            className={`sans text-[11px] px-3 py-1.5 rounded-full transition-all text-left border cursor-pointer ${
              dilemma === item.prompt
                ? 'bg-[#C16657] text-white border-[#C16657]'
                : 'text-[#55534E] bg-[#FAF8F2] hover:bg-[#EAE7E0] hover:text-[#2D2C2A] border-[#EAE7E0]'
            }`}
            title={item.prompt}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Primary Action Button */}
      {activeTab !== 'library' && (
        <div className="pt-2">
          <button
            id="draw-model-action-btn"
            type="button"
            onClick={onDraw}
            disabled={isDrawing}
            className="btn-primary w-full py-4 sm:py-5 rounded-full text-white sans font-bold text-xs sm:text-sm uppercase tracking-[0.2em] shadow-lg flex items-center justify-center gap-3 disabled:opacity-60 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>{isDrawing ? 'Consulting Mental Frameworks...' : activeTab === 'wheel' ? 'Spin the Decision Wheel' : 'Draw a Cognitive Model'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {dilemma.trim().length > 0 ? (
            <p className="sans text-[11px] text-[#718894] uppercase tracking-wider text-center mt-3 font-semibold">
              ✓ Dilemma active &middot; Application will be contextualized
            </p>
          ) : (
            <p className="sans text-[11px] text-[#718894] uppercase tracking-wider text-center mt-3">
              Draw to reveal a cognitive lens
            </p>
          )}
        </div>
      )}
    </section>
  );
};
