import React, { useState } from 'react';
import { X, Copy, Check, Code, FileCode, Sparkles } from 'lucide-react';
import { STANDALONE_HTML_EMBED } from '../data/embedTemplate';

interface EmbedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmbedModal: React.FC<EmbedModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'code' | 'instructions'>('code');

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(STANDALONE_HTML_EMBED).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D2C2A]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#FDFCF0] border border-[#EAE7E0] rounded-[28px] card-shadow overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[#EAE7E0] flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FAF8F2] text-[#C16657] border border-[#EAE7E0] flex items-center justify-center">
              <Code className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xl text-[#2D2C2A] italic">
                Embed on chungbooks.fr
              </h3>
              <p className="sans text-[11px] uppercase tracking-wider text-[#718894] font-semibold">
                Self-contained, responsive single-file code
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-[#718894] hover:text-[#2D2C2A] hover:bg-[#FAF8F2] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-[#EAE7E0] bg-[#FAF8F2] px-6">
          <button
            type="button"
            onClick={() => setActiveTab('code')}
            className={`sans px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'code'
                ? 'border-[#C16657] text-[#2D2C2A] bg-white'
                : 'border-transparent text-[#718894] hover:text-[#2D2C2A]'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            Single-File Code
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('instructions')}
            className={`sans px-4 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'instructions'
                ? 'border-[#C16657] text-[#2D2C2A] bg-white'
                : 'border-transparent text-[#718894] hover:text-[#2D2C2A]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C16657]" />
            Embedding Guide
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-1 text-xs sm:text-sm">
          {activeTab === 'code' ? (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="sans text-[11px] uppercase tracking-wider font-bold text-[#718894]">
                  Ready to copy &amp; paste:
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="btn-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider sans flex items-center gap-1.5"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-white" />
                      <span>Copy Embed Code</span>
                    </>
                  )}
                </button>
              </div>

              <div className="relative">
                <pre className="p-4 rounded-2xl bg-[#2D2C2A] text-[#FDFCF0] font-mono-code text-xs overflow-x-auto max-h-[340px] border border-[#3E3C39] leading-relaxed select-all">
                  {STANDALONE_HTML_EMBED}
                </pre>
              </div>
            </div>
          ) : (
            <div className="space-y-4 text-[#2D2C2A]">
              <div className="p-5 rounded-2xl bg-white border border-[#EAE7E0]">
                <h4 className="sans text-xs uppercase font-bold text-[#C16657] tracking-wider mb-2">
                  How to embed on chungbooks.fr:
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-[#55534E] leading-relaxed">
                  <li>
                    <strong>Copy the Embed Code</strong> from the "Single-File Code" tab.
                  </li>
                  <li>
                    In your website editor (WordPress, Webflow, Squarespace, or custom CMS), add an <strong>"HTML Block"</strong> or <strong>"Custom Embed"</strong> widget.
                  </li>
                  <li>
                    Paste the entire single-file snippet into the block and publish.
                  </li>
                  <li>
                    The widget is 100% self-contained with no external runtime dependencies.
                  </li>
                </ol>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#EAE7E0]">
                <h4 className="sans text-xs uppercase font-bold text-[#2D2C2A] tracking-wider mb-1">
                  Customization:
                </h4>
                <p className="text-xs sm:text-sm text-[#718894] leading-relaxed">
                  You can add or tweak models by editing the <code className="bg-[#FAF8F2] px-1.5 py-0.5 rounded text-[#C16657] font-semibold">MENTAL_MODELS</code> array in the embed script anytime.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-[#EAE7E0] bg-[#FAF8F2] flex items-center justify-between">
          <span className="sans text-[10px] uppercase tracking-wider text-[#718894] font-semibold">
            HTML5 &bull; CSS3 &bull; ES6 JS &bull; Zero External Dependencies
          </span>
          <button
            type="button"
            onClick={onClose}
            className="sans px-5 py-2 text-xs font-bold uppercase tracking-wider text-[#2D2C2A] bg-white hover:bg-[#FAF8F2] border border-[#EAE7E0] rounded-full transition-colors shadow-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
