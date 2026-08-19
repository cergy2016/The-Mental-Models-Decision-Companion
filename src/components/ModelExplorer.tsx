import React, { useState, useMemo } from 'react';
import { MentalModel } from '../types';
import { Search, ArrowRight, Zap, BookOpen, BookMarked, ShieldAlert } from 'lucide-react';
import { CATEGORY_DESCRIPTIONS } from '../data/models';

interface ModelExplorerProps {
  models: MentalModel[];
  onSelectModel: (model: MentalModel) => void;
  selectedModelId?: string;
}

const CATEGORIES = [
  'All',
  'Strategic Thinking',
  'Decision Making',
  'Problem Solving',
  'Risk & Uncertainty',
  'Productivity & Focus',
  'Human Behavior & Systems',
] as const;

export const ModelExplorer: React.FC<ModelExplorerProps> = ({
  models,
  onSelectModel,
  selectedModelId,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredModels = useMemo(() => {
    return models.filter((m) => {
      const matchesCategory =
        selectedCategory === 'All' || m.category === selectedCategory;
      const matchesSearch =
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.thinker.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (m.historicalCaseStudy && m.historicalCaseStudy.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (m.recommendedBook && m.recommendedBook.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [models, selectedCategory, searchTerm]);

  return (
    <div className="w-full space-y-6">
      {/* Controls Bar: Search & Filter Chips */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#718894]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search 22+ models, authors, or books..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-[#EAE7E0] rounded-xl focus:border-[#C16657] outline-none transition-all placeholder:text-[#718894]/70 text-[#2D2C2A]"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 sm:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const count = cat === 'All' ? models.length : models.filter((m) => m.category === cat).length;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`sans text-[11px] uppercase tracking-wider px-3.5 py-1.5 rounded-full font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#C16657] text-white shadow-xs'
                    : 'bg-white text-[#718894] hover:text-[#2D2C2A] hover:bg-[#FAF8F2] border border-[#EAE7E0]'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Description Banner */}
      {CATEGORY_DESCRIPTIONS[selectedCategory] && (
        <div className="bg-[#FAF8F2] px-4 py-2.5 rounded-xl border border-[#EAE7E0] text-xs text-[#718894] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C16657]" />
          <span className="sans font-semibold text-[#2D2C2A] uppercase tracking-wider text-[10px]">
            {selectedCategory}:
          </span>
          <span>{CATEGORY_DESCRIPTIONS[selectedCategory]}</span>
        </div>
      )}

      {/* Grid of Models */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredModels.map((model) => {
          const isSelected = model.id === selectedModelId;
          return (
            <div
              key={model.id}
              onClick={() => onSelectModel(model)}
              className={`p-6 rounded-[24px] bg-white cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between border ${
                isSelected
                  ? 'border-[#C16657] ring-2 ring-[#C16657]/15 shadow-sm'
                  : 'border-[#EAE7E0] hover:border-[#C16657]/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="sans text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#FAF8F2] text-[#C16657] border border-[#EAE7E0]">
                    {model.category}
                  </span>
                  <span className="sans text-[11px] text-[#718894] font-semibold truncate max-w-[150px]">
                    {model.thinker}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl text-[#2D2C2A] italic mb-1">
                  {model.name}
                </h3>
                <p className="sans text-xs uppercase tracking-widest text-[#718894] mb-3 font-semibold">
                  {model.subtitle}
                </p>

                <p className="text-sm text-[#55534E] line-clamp-2 leading-relaxed mb-3">
                  {model.definition}
                </p>

                {model.blindSpotAvoided && (
                  <div className="flex items-center gap-1.5 text-[11px] text-[#8A3F2C] bg-[#FAF1E6] px-2.5 py-1 rounded-lg border border-[#EAD3B8] mb-2">
                    <ShieldAlert className="w-3 h-3 text-[#C16657] shrink-0" />
                    <span className="truncate">Shields: {model.blindSpotAvoided}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-[#EAE7E0] flex items-center justify-between text-xs">
                {model.recommendedBook ? (
                  <span className="sans text-[10px] text-[#718894] italic truncate max-w-[180px] flex items-center gap-1">
                    <BookMarked className="w-3 h-3 text-[#718894]" />
                    {model.recommendedBook.split(' by ')[0]}
                  </span>
                ) : (
                  <span className="sans text-[10px] uppercase tracking-wider text-[#C16657] font-bold flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    2-Sentence Application
                  </span>
                )}
                <span className="sans text-xs uppercase font-bold tracking-wider text-[#2D2C2A] flex items-center gap-1 hover:text-[#C16657]">
                  Consult <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {filteredModels.length === 0 && (
        <div className="text-center py-12 bg-white rounded-[24px] border border-dashed border-[#EAE7E0]">
          <BookOpen className="w-8 h-8 text-[#C16657] mx-auto mb-2 opacity-70" />
          <p className="sans text-sm font-bold text-[#2D2C2A] uppercase tracking-wider">No models found</p>
          <p className="sans text-xs text-[#718894] mt-1">Try searching for thinkers (like "Munger", "Taleb", "Bezos") or cognitive concepts.</p>
        </div>
      )}
    </div>
  );
};
