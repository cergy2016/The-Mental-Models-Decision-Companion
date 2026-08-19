import React, { useState } from 'react';
import { MentalModel } from '../types';
import { Sparkles, Layers, RefreshCw } from 'lucide-react';
import { playTickSound, playChimeSound } from '../utils/sound';

interface CardDeckProps {
  models: MentalModel[];
  onSelectModel: (model: MentalModel) => void;
  isDrawing: boolean;
  setIsDrawing: (val: boolean) => void;
  soundEnabled: boolean;
  selectedModel: MentalModel | null;
}

export const CardDeck: React.FC<CardDeckProps> = ({
  models,
  onSelectModel,
  isDrawing,
  setIsDrawing,
  soundEnabled,
  selectedModel,
}) => {
  const [shufflingName, setShufflingName] = useState<string>('');

  const triggerDraw = () => {
    if (isDrawing) return;
    setIsDrawing(true);

    let count = 0;
    const maxCycles = 12;
    const intervalTime = 70;

    const interval = setInterval(() => {
      const randomTemp = models[Math.floor(Math.random() * models.length)];
      setShufflingName(randomTemp.name);
      count++;

      if (soundEnabled && count % 2 === 0) {
        playTickSound();
      }

      if (count >= maxCycles) {
        clearInterval(interval);
        const finalModel = models[Math.floor(Math.random() * models.length)];
        setIsDrawing(false);
        setShufflingName('');
        if (soundEnabled) {
          playChimeSound();
        }
        onSelectModel(finalModel);
      }
    }, intervalTime);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-6">
      {/* 3D Stacked Card Deck Representation */}
      <div className="relative w-64 sm:w-72 h-88 sm:h-96 flex items-center justify-center perspective-1000 mb-6">
        
        {/* Layered Deck Cards (Simulating Stack Depth) */}
        <div className="absolute inset-0 bg-[#EAE7E0] rounded-[28px] transform translate-y-3 translate-x-2 rotate-3 border border-[#DCD8CE] shadow-sm pointer-events-none" />
        <div className="absolute inset-0 bg-[#F4F1EA] rounded-[28px] transform -translate-y-1.5 -translate-x-2 -rotate-2 border border-[#E2DDD3] shadow-sm pointer-events-none" />

        {/* Top Active Card */}
        <div
          onClick={triggerDraw}
          className={`relative z-10 w-full h-full rounded-[28px] bg-white p-6 flex flex-col justify-between cursor-pointer border-2 transition-all duration-300 transform select-none ${
            isDrawing
              ? 'scale-105 border-[#C16657] shadow-xl animate-pulse'
              : 'hover:-translate-y-1.5 hover:shadow-xl border-[#EAE7E0]'
          }`}
        >
          {/* Card Back / Front Header */}
          <div className="flex items-center justify-between border-b border-[#EAE7E0] pb-3">
            <span className="sans text-[10px] font-bold uppercase tracking-widest text-[#C16657] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Cognitive Card
            </span>
            <span className="sans text-[10px] text-[#718894] font-semibold uppercase tracking-wider">12 Models</span>
          </div>

          {/* Center Card Emblem / Shuffling Text */}
          <div className="my-auto text-center flex flex-col items-center justify-center py-4">
            {isDrawing ? (
              <div className="space-y-2">
                <RefreshCw className="w-8 h-8 text-[#C16657] animate-spin mx-auto" />
                <p className="font-serif-title text-xl font-normal text-[#2D2C2A] italic">
                  {shufflingName || 'Consulting models...'}
                </p>
                <p className="sans text-[11px] text-[#718894] uppercase tracking-wider">Aligning framework...</p>
              </div>
            ) : selectedModel ? (
              <div className="space-y-2">
                <div
                  className="w-12 h-12 rounded-full mx-auto flex items-center justify-center text-white text-lg font-serif-title font-bold mb-2 shadow-sm"
                  style={{ backgroundColor: selectedModel.tagColor.accent || '#C16657' }}
                >
                  {selectedModel.name.charAt(0)}
                </div>
                <h4 className="font-serif-title text-2xl font-normal text-[#2D2C2A] italic">
                  {selectedModel.name}
                </h4>
                <p className="text-xs text-[#55534E] max-w-[200px] line-clamp-2">
                  {selectedModel.subtitle}
                </p>
              </div>
            ) : (
              <div className="space-y-2 text-center">
                <div className="w-14 h-14 rounded-full bg-[#FAF8F2] border border-[#EAE7E0] flex items-center justify-center mx-auto text-[#C16657]">
                  <Layers className="w-7 h-7" />
                </div>
                <h4 className="font-serif-title text-xl font-normal text-[#2D2C2A]">
                  Deck of Models
                </h4>
                <p className="text-xs text-[#718894] max-w-[190px]">
                  Click the card or button below to draw a framework.
                </p>
              </div>
            )}
          </div>

          {/* Card Footer Badge */}
          <div className="pt-3 border-t border-[#EAE7E0] flex items-center justify-between sans text-[10px] uppercase tracking-wider text-[#718894] font-semibold">
            <span>chungbooks.fr</span>
            <span className="text-[#C16657]">Tap to draw &#8594;</span>
          </div>
        </div>
      </div>

      {/* Primary Action Button */}
      <button
        id="draw-card-btn"
        type="button"
        onClick={triggerDraw}
        disabled={isDrawing}
        className="btn-primary px-8 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] sans shadow-lg flex items-center gap-2.5 cursor-pointer disabled:opacity-60"
      >
        <Sparkles className="w-4 h-4 text-white" />
        <span>{isDrawing ? 'Shuffling Deck...' : 'Draw a Cognitive Model'}</span>
      </button>
    </div>
  );
};
