import React, { useState, useEffect, useRef } from 'react';
import { MentalModel, DrawHistoryItem } from './types';
import { MENTAL_MODELS } from './data/models';
import { Header } from './components/Header';
import { DilemmaInput } from './components/DilemmaInput';
import { DecisionWheel } from './components/DecisionWheel';
import { CardDeck } from './components/CardDeck';
import { ResultCard } from './components/ResultCard';
import { ModelExplorer } from './components/ModelExplorer';
import { EmbedModal } from './components/EmbedModal';
import { ShareModal } from './components/ShareModal';
import { Sparkles, BookOpen, Compass, History, Trash2 } from 'lucide-react';
import { playTickSound, playChimeSound } from './utils/sound';

export default function App() {
  const [dilemma, setDilemma] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'wheel' | 'cards' | 'library'>('wheel');
  const [selectedModel, setSelectedModel] = useState<MentalModel | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isEmbedOpen, setIsEmbedOpen] = useState<boolean>(false);
  const [isShareOpen, setIsShareOpen] = useState<boolean>(false);
  const [history, setHistory] = useState<DrawHistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  const resultCardRef = useRef<HTMLDivElement>(null);

  // Parse deep-linked URL search parameters on initial load
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const searchParams = new URLSearchParams(window.location.search);
        const modelParam = searchParams.get('model');
        const dilemmaParam = searchParams.get('dilemma');

        if (dilemmaParam) {
          setDilemma(dilemmaParam);
        }

        if (modelParam) {
          const matched = MENTAL_MODELS.find(
            (m) => m.id.toLowerCase() === modelParam.toLowerCase()
          );
          if (matched) {
            setSelectedModel(matched);
          }
        }
      }
    } catch {
      // Ignore URL parsing errors
    }
  }, []);

  // Load history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('mm_history');
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch {
      // Ignore local storage parse errors
    }
  }, []);

  const saveHistoryItem = (model: MentalModel, notes?: string) => {
    const newItem: DrawHistoryItem = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      model,
      dilemma: dilemma.trim(),
      timestamp: Date.now(),
      notes,
    };
    const updated = [newItem, ...history.slice(0, 19)]; // Keep last 20
    setHistory(updated);
    try {
      localStorage.setItem('mm_history', JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const handleSelectModel = (model: MentalModel) => {
    setSelectedModel(model);
    saveHistoryItem(model);

    // Smooth scroll down to result card
    setTimeout(() => {
      if (resultCardRef.current) {
        resultCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 150);
  };

  const handleDrawRandom = () => {
    if (isDrawing) return;
    setIsDrawing(true);

    let count = 0;
    const interval = setInterval(() => {
      count++;
      if (soundEnabled && count % 2 === 0) {
        playTickSound();
      }
      if (count > 8) {
        clearInterval(interval);
        // Avoid selecting the same model twice in a row if possible
        const available = MENTAL_MODELS.filter((m) => m.id !== selectedModel?.id);
        const finalPick = available[Math.floor(Math.random() * available.length)] || MENTAL_MODELS[0];
        setIsDrawing(false);
        if (soundEnabled) {
          playChimeSound();
        }
        handleSelectModel(finalPick);
      }
    }, 70);
  };

  const handleSaveReflection = (notes: string) => {
    if (!selectedModel) return;
    saveHistoryItem(selectedModel, notes);
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem('mm_history');
    } catch {
      // Ignore
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF0] text-[#2D2C2A] pb-20">
      {/* Top Banner Terracotta Accent Line */}
      <div className="h-1 w-full bg-[#C16657]" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Navigation & Header */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          soundEnabled={soundEnabled}
          setSoundEnabled={setSoundEnabled}
          onOpenEmbed={() => setIsEmbedOpen(true)}
        />

        {/* User Dilemma Input Section */}
        <DilemmaInput
          dilemma={dilemma}
          setDilemma={setDilemma}
          onDraw={handleDrawRandom}
          isDrawing={isDrawing}
          activeTab={activeTab}
        />

        {/* Tab View: Decision Wheel vs Card Pull vs All Models Library */}
        <div className="mb-8">
          {activeTab === 'wheel' && (
            <div className="bg-white rounded-[32px] border border-[#EAE7E0] p-6 sm:p-8 card-shadow mb-6">
              <div className="text-center mb-3">
                <span className="sans text-[10px] uppercase font-bold text-[#C16657] tracking-widest">
                  Rotary Framework Selector
                </span>
                <h2 className="text-2xl text-[#2D2C2A] italic">
                  Spin for Perspective
                </h2>
              </div>
              <DecisionWheel
                models={MENTAL_MODELS}
                onSelectModel={handleSelectModel}
                isSpinning={isDrawing}
                setIsSpinning={setIsDrawing}
                soundEnabled={soundEnabled}
                selectedModel={selectedModel}
              />
            </div>
          )}

          {activeTab === 'cards' && (
            <div className="bg-white rounded-[32px] border border-[#EAE7E0] p-6 sm:p-8 card-shadow mb-6">
              <div className="text-center mb-3">
                <span className="sans text-[10px] uppercase font-bold text-[#718894] tracking-widest">
                  Tactile Cognitive Deck
                </span>
                <h2 className="text-2xl text-[#2D2C2A] italic">
                  Draw a Mental Framework Card
                </h2>
              </div>
              <CardDeck
                models={MENTAL_MODELS}
                onSelectModel={handleSelectModel}
                isDrawing={isDrawing}
                setIsDrawing={setIsDrawing}
                soundEnabled={soundEnabled}
                selectedModel={selectedModel}
              />
            </div>
          )}

          {activeTab === 'library' && (
            <div className="bg-white rounded-[32px] border border-[#EAE7E0] p-6 sm:p-8 card-shadow mb-6">
              <div className="mb-6">
                <span className="sans text-[10px] uppercase font-bold text-[#C16657] tracking-widest">
                  Complete Codex
                </span>
                <h2 className="text-3xl text-[#2D2C2A] italic">
                  Explore Cognitive Frameworks
                </h2>
                <p className="sans text-xs uppercase tracking-widest text-[#718894] font-semibold mt-1">
                  Click any model to inspect its principle and 2-sentence breakdown
                </p>
              </div>
              <ModelExplorer
                models={MENTAL_MODELS}
                onSelectModel={handleSelectModel}
                selectedModelId={selectedModel?.id}
              />
            </div>
          )}
        </div>

        {/* Result Card Section */}
        <div ref={resultCardRef} className="space-y-6">
          {selectedModel ? (
            <ResultCard
              model={selectedModel}
              dilemma={dilemma}
              onDrawAnother={handleDrawRandom}
              onSelectRelatedModel={(relId) => {
                const found = MENTAL_MODELS.find((m) => m.id === relId);
                if (found) handleSelectModel(found);
              }}
              onSaveReflection={handleSaveReflection}
              onOpenShare={() => setIsShareOpen(true)}
            />
          ) : (
            <div className="bg-white rounded-[32px] p-8 sm:p-12 text-center border-2 border-dashed border-[#EAE7E0] card-shadow">
              <Compass className="w-10 h-10 text-[#C16657] mx-auto mb-3 opacity-80" />
              <h3 className="text-2xl text-[#2D2C2A] italic mb-1">
                Awaiting Your Decision Draw
              </h3>
              <p className="sans text-xs text-[#718894] uppercase tracking-wider max-w-md mx-auto mb-5 leading-relaxed font-semibold">
                Input your dilemma above and spin the wheel or draw a card to reveal a contextual 2-sentence perspective.
              </p>
              <button
                type="button"
                onClick={handleDrawRandom}
                className="btn-primary px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] sans shadow-md inline-flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>Draw a Random Model</span>
              </button>
            </div>
          )}

          {/* Past Reflection History Drawer / Toggle */}
          {history.length > 0 && (
            <div className="bg-white rounded-[24px] border border-[#EAE7E0] p-5 sm:p-6 card-shadow">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setShowHistory(!showHistory)}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2D2C2A] hover:text-[#C16657] sans transition-colors"
                >
                  <History className="w-4 h-4 text-[#C16657]" />
                  <span>Recent Draws &amp; Reflections ({history.length})</span>
                </button>
                {showHistory && (
                  <button
                    type="button"
                    onClick={clearHistory}
                    className="sans text-[10px] uppercase font-bold tracking-wider text-[#C16657] hover:underline flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    Clear
                  </button>
                )}
              </div>

              {showHistory && (
                <div className="mt-4 pt-4 border-t border-[#EAE7E0] space-y-2.5 max-h-64 overflow-y-auto pr-1">
                  {history.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setSelectedModel(item.model);
                        if (item.dilemma) setDilemma(item.dilemma);
                      }}
                      className="p-3.5 rounded-xl bg-[#FAF8F2] hover:bg-[#EAE7E0] border border-[#EAE7E0] cursor-pointer transition-colors text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div>
                        <div className="font-bold text-[#2D2C2A]">
                          {item.model.name} <span className="sans font-normal text-[11px] text-[#718894]">&middot; {item.model.subtitle}</span>
                        </div>
                        {item.dilemma && (
                          <div className="text-[#55534E] italic mt-0.5">
                            "{item.dilemma}"
                          </div>
                        )}
                        {item.notes && (
                          <div className="text-[#C16657] mt-1 bg-white p-2 rounded-lg border border-[#EAE7E0]">
                            <strong>Note:</strong> {item.notes}
                          </div>
                        )}
                      </div>
                      <span className="sans text-[10px] uppercase font-semibold text-[#718894] whitespace-nowrap self-start sm:self-center">
                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-14 pt-6 border-t border-[#EAE7E0] text-center text-xs text-[#718894]">
          <p className="sans font-bold uppercase tracking-widest text-[#2D2C2A] text-[11px]">
            The Mental Models Decision Companion &middot; <a href="https://chungbooks.fr" className="underline underline-offset-2 hover:text-[#C16657] transition-colors">chungbooks.fr</a>
          </p>
          <p className="sans mt-1 text-[10px] uppercase tracking-wider text-[#718894]">
            Curated from classic treatises in cognitive science, philosophy, and strategic decision analysis.
          </p>
        </footer>
      </main>

      {/* Embed Single-File HTML Modal */}
      <EmbedModal isOpen={isEmbedOpen} onClose={() => setIsEmbedOpen(false)} />

      {/* Share Your Insight Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        model={selectedModel}
        dilemma={dilemma}
      />
    </div>
  );
}
