import React, { useState } from 'react';
import { MentalModel } from '../types';
import { Check, Copy, Sparkles, HelpCircle, Bookmark, Quote, Zap, Share2, BookOpen, ShieldAlert, BookMarked } from 'lucide-react';

interface ResultCardProps {
  model: MentalModel;
  dilemma: string;
  onDrawAnother: () => void;
  onSelectRelatedModel?: (modelId: string) => void;
  onSaveReflection?: (notes: string) => void;
  onOpenShare?: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  model,
  dilemma,
  onDrawAnother,
  onSelectRelatedModel,
  onSaveReflection,
  onOpenShare,
}) => {
  const [copied, setCopied] = useState(false);
  const [isJournaling, setIsJournaling] = useState(false);
  const [userNotes, setUserNotes] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleCopySummary = () => {
    const text = `Mental Model: ${model.name} (${model.subtitle})
Thinker: ${model.thinker}
${dilemma ? `Dilemma: "${dilemma}"\n` : ''}
Principle: ${model.definition}

Practical 2-Sentence Application:
${model.twoSentenceApplication}

Core Question:
"${model.keyQuestion}"
${model.historicalCaseStudy ? `\nCase Study: ${model.historicalCaseStudy}\n` : ''}
${model.recommendedBook ? `Recommended Reading: ${model.recommendedBook}\n` : ''}
Via The Mental Models Decision Companion (chungbooks.fr)`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  const handleSaveNote = () => {
    if (onSaveReflection) {
      onSaveReflection(userNotes);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    }
  };

  return (
    <article
      id="drawn-result-card"
      className="w-full bg-white card-shadow rounded-[32px] p-6 sm:p-10 border border-[#EAE7E0] flex flex-col gap-6 transition-all duration-300 animate-in fade-in slide-in-from-bottom-3"
    >
      {/* Category Eyebrow with Terracotta Accent Line */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EAE7E0] pb-5">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="w-10 h-[1px] bg-[#C16657]"></span>
            <span className="sans text-[10px] uppercase font-bold text-[#C16657] tracking-widest">
              {model.category} &middot; {model.thinker}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl text-[#2D2C2A] italic">
            {model.name}
          </h2>
          <p className="sans text-xs uppercase tracking-widest text-[#718894] font-semibold">
            {model.subtitle}
          </p>
        </div>

        {/* Quick Top Controls */}
        <div className="flex items-center gap-2 self-start sm:self-center flex-wrap">
          {onOpenShare && (
            <button
              id="share-insight-top-btn"
              type="button"
              onClick={onOpenShare}
              className="btn-primary px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider sans inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
              title="Share this mental model insight"
            >
              <Share2 className="w-3.5 h-3.5 text-white" />
              <span>Share Insight</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleCopySummary}
            className="sans inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-[#2D2C2A] bg-[#FAF8F2] hover:bg-[#EAE7E0] border border-[#EAE7E0] transition-colors shadow-xs"
            title="Copy framework summary"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#C16657]" />
                <span className="text-[#C16657]">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#718894]" />
                <span>Copy</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsJournaling(!isJournaling)}
            className={`sans inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-colors shadow-xs ${
              isJournaling
                ? 'bg-[#C16657] text-white border-[#C16657]'
                : 'text-[#2D2C2A] bg-[#FAF8F2] hover:bg-[#EAE7E0] border-[#EAE7E0]'
            }`}
            title="Add your personal reflection note"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Reflect</span>
          </button>
        </div>
      </div>

      {/* User Context Dilemma */}
      {dilemma && dilemma.trim().length > 0 && (
        <div className="bg-[#FAF8F2] border-l-2 border-[#C16657] px-4 py-3 rounded-r-2xl flex items-start gap-3">
          <HelpCircle className="w-4 h-4 text-[#C16657] shrink-0 mt-0.5" />
          <div className="text-sm">
            <span className="sans text-[10px] uppercase tracking-wider font-bold text-[#718894] block mb-0.5">
              Applied Context
            </span>
            <span className="italic text-[#2D2C2A] text-base">"{dilemma}"</span>
          </div>
        </div>
      )}

      {/* Core Principle / Definition */}
      <div>
        <h3 className="sans text-[10px] uppercase font-bold text-[#718894] tracking-widest mb-2">
          The Principle
        </h3>
        <p className="text-lg leading-relaxed text-[#55534E]">
          {model.definition}
        </p>
      </div>

      {/* Actionable 2-Sentence Application (Primary Focus) */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF8F2] border border-[#EAE7E0] relative overflow-hidden">
        <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[#C16657]" />
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-4 h-4 text-[#C16657]" />
          <h3 className="sans text-[11px] uppercase font-bold text-[#C16657] tracking-widest">
            2-Sentence Practical Application
          </h3>
        </div>
        <p className="text-base sm:text-lg font-medium text-[#2D2C2A] leading-relaxed">
          {model.twoSentenceApplication}
        </p>
      </div>

      {/* Core Reflection Question */}
      <div className="p-5 rounded-2xl bg-white border border-[#EAE7E0] shadow-inner">
        <h3 className="sans text-[10px] uppercase font-bold text-[#718894] tracking-widest mb-2 flex items-center gap-2">
          <HelpCircle className="w-3.5 h-3.5 text-[#718894]" />
          <span>Core Reflection Question</span>
        </h3>
        <p className="text-xl sm:text-2xl text-[#2D2C2A] italic leading-snug">
          "{model.keyQuestion}"
        </p>
      </div>

      {/* Micro-Action & Quote Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 2-Minute Exercise */}
        <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#EAE7E0]">
          <h4 className="sans text-[10px] uppercase font-bold text-[#718894] tracking-widest mb-1.5 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-[#C16657]" />
            <span>2-Minute Action</span>
          </h4>
          <p className="text-sm text-[#55534E] leading-relaxed">
            {model.microAction}
          </p>
        </div>

        {/* Famous Quote */}
        {model.quote && (
          <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#EAE7E0] flex flex-col justify-between">
            <div className="flex items-start gap-2 text-sm text-[#55534E] italic leading-relaxed">
              <Quote className="w-3.5 h-3.5 text-[#718894] shrink-0 mt-0.5 opacity-70" />
              <span>"{model.quote}"</span>
            </div>
            <span className="sans text-[10px] uppercase tracking-wider font-semibold text-[#718894] text-right mt-3">
              — {model.quoteAuthor || model.thinker}
            </span>
          </div>
        )}
      </div>

      {/* Historical Case Study & Cognitive Blind Spot Deep Dive */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {model.historicalCaseStudy && (
          <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#EAE7E0]">
            <h4 className="sans text-[10px] uppercase font-bold text-[#2D2C2A] tracking-widest mb-1.5 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#718894]" />
              <span>Historical Case Study</span>
            </h4>
            <p className="text-xs text-[#55534E] leading-relaxed">
              {model.historicalCaseStudy}
            </p>
          </div>
        )}

        {model.blindSpotAvoided && (
          <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#EAE7E0]">
            <h4 className="sans text-[10px] uppercase font-bold text-[#C16657] tracking-widest mb-1.5 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-[#C16657]" />
              <span>Cognitive Trap Shielded</span>
            </h4>
            <p className="text-xs text-[#55534E] leading-relaxed">
              {model.blindSpotAvoided}
            </p>
          </div>
        )}
      </div>

      {/* Recommended Reading Banner */}
      {model.recommendedBook && (
        <div className="px-4 py-3 rounded-2xl bg-white border border-[#EAE7E0] flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#718894]">
            <BookMarked className="w-4 h-4 text-[#C16657] shrink-0" />
            <span className="sans uppercase tracking-wider font-bold text-[10px] text-[#2D2C2A]">
              Recommended Treatise:
            </span>
            <span className="italic text-[#55534E]">{model.recommendedBook}</span>
          </div>
          <span className="sans text-[10px] uppercase tracking-wider font-semibold text-[#718894] hidden sm:inline">
            chungbooks.fr curation
          </span>
        </div>
      )}

      {/* Related Companion Models */}
      {model.relatedModelIds && model.relatedModelIds.length > 0 && onSelectRelatedModel && (
        <div className="pt-2">
          <span className="sans text-[10px] uppercase font-bold text-[#718894] tracking-widest block mb-2">
            Related Complementary Frameworks:
          </span>
          <div className="flex flex-wrap gap-2">
            {model.relatedModelIds.map((relId) => (
              <button
                key={relId}
                type="button"
                onClick={() => onSelectRelatedModel(relId)}
                className="sans text-[11px] font-semibold px-3 py-1.5 rounded-full bg-[#FAF8F2] hover:bg-[#EAE7E0] text-[#2D2C2A] border border-[#EAE7E0] transition-colors cursor-pointer capitalize"
              >
                &rarr; {relId.replace(/-/g, ' ')}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Journal Note Drawer */}
      {isJournaling && (
        <div className="p-5 rounded-2xl bg-[#FAF8F2] border border-[#EAE7E0] animate-in fade-in duration-200">
          <div className="flex items-center justify-between mb-2">
            <h4 className="sans text-[10px] uppercase font-bold text-[#2D2C2A] tracking-widest">
              Journal Your Takeaway
            </h4>
            {savedSuccess && <span className="sans text-[10px] uppercase tracking-wider text-[#C16657] font-bold">✓ Saved</span>}
          </div>
          <textarea
            rows={3}
            value={userNotes}
            onChange={(e) => setUserNotes(e.target.value)}
            placeholder="Write down your key takeaway or action step for this dilemma..."
            className="w-full text-base bg-white border border-[#EAE7E0] rounded-xl p-3.5 text-[#2D2C2A] focus:border-[#C16657] outline-none italic"
          />
          <div className="flex justify-end gap-2 mt-3">
            <button
              type="button"
              onClick={handleSaveNote}
              className="btn-primary px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider sans"
            >
              Save Reflection
            </button>
          </div>
        </div>
      )}

      {/* Card Footer: Draw Another Action & Share Insight */}
      <div className="pt-4 border-t border-[#EAE7E0] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 w-full sm:w-auto flex-wrap">
          <button
            id="draw-another-model-btn"
            type="button"
            onClick={onDrawAnother}
            className="sans flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-[#2D2C2A] bg-[#FAF8F2] hover:bg-[#EAE7E0] active:scale-98 transition-all border border-[#EAE7E0] shadow-xs cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#C16657]" />
            <span>Draw Another Model</span>
          </button>

          {onOpenShare && (
            <button
              id="share-insight-bottom-btn"
              type="button"
              onClick={onOpenShare}
              className="btn-primary flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider sans active:scale-98 transition-all shadow-md cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-white" />
              <span>Share Your Insight</span>
            </button>
          )}
        </div>

        <span className="sans text-[10px] uppercase tracking-widest text-[#718894] font-semibold text-center sm:text-right">
          Explore multiple lenses for clarity
        </span>
      </div>
    </article>
  );
};
