import React, { useState, useMemo } from 'react';
import { MentalModel } from '../types';
import {
  X,
  Copy,
  Check,
  Share2,
  Mail,
  MessageCircle,
  ExternalLink,
  Sparkles,
  Twitter,
  Linkedin,
} from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  model: MentalModel | null;
  dilemma: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  model,
  dilemma,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  // Generate shareable direct URL with query parameters
  const shareUrl = useMemo(() => {
    if (typeof window === 'undefined' || !model) return '';
    const base = `${window.location.origin}${window.location.pathname}`;
    const params = new URLSearchParams();
    params.set('model', model.id);
    if (dilemma && dilemma.trim().length > 0) {
      params.set('dilemma', dilemma.trim());
    }
    return `${base}?${params.toString()}`;
  }, [model, dilemma]);

  // Concise text snippet suitable for messengers & social posts
  const shareText = useMemo(() => {
    if (!model) return '';
    const dilemmaSnippet = dilemma.trim() ? `\n🎯 Dilemma: "${dilemma.trim()}"\n` : '\n';
    return `🧠 Mental Model: ${model.name} (${model.subtitle})${dilemmaSnippet}💡 Application: ${model.twoSentenceApplication}\n\nExplore clarity on The Mental Models Decision Wheel:`;
  }, [model, dilemma]);

  // Short snippet for Twitter/X character limits
  const twitterText = useMemo(() => {
    if (!model) return '';
    const dilemmaPart = dilemma.trim()
      ? `Addressing "${dilemma.trim().length > 50 ? dilemma.trim().slice(0, 47) + '...' : dilemma.trim()}" with `
      : 'Applying ';
    return `${dilemmaPart}#MentalModel: ${model.name}.\n\n"${model.twoSentenceApplication.slice(0, 140)}..."`;
  }, [model, dilemma]);

  if (!isOpen || !model) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2400);
    });
  };

  const handleCopyText = () => {
    const fullSnippet = `${shareText}\n${shareUrl}`;
    navigator.clipboard.writeText(fullSnippet).then(() => {
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2400);
    });
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Mental Model: ${model.name}`,
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // User canceled or share failed; fallback handled
      }
    } else {
      handleCopyLink();
    }
  };

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}&url=${encodeURIComponent(shareUrl)}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
  const mailSubject = encodeURIComponent(`Cognitive Insight: ${model.name} for decision making`);
  const mailBody = encodeURIComponent(`${shareText}\n\nView the interactive decision wheel: ${shareUrl}`);
  const mailUrl = `mailto:?subject=${mailSubject}&body=${mailBody}`;

  const hasNativeShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D2C2A]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        id="share-insight-modal"
        className="w-full max-w-lg bg-[#FDFCF0] border border-[#EAE7E0] rounded-[28px] card-shadow overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[#EAE7E0] flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FAF8F2] text-[#C16657] border border-[#EAE7E0] flex items-center justify-center shadow-xs">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="sans text-[10px] uppercase font-bold text-[#C16657] tracking-widest">
                  Share Your Insight
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl text-[#2D2C2A] italic">
                {model.name}
              </h3>
            </div>
          </div>

          <button
            id="close-share-modal-btn"
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-[#718894] hover:text-[#2D2C2A] hover:bg-[#FAF8F2] transition-colors"
            aria-label="Close share dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {/* Formatted Insight Preview Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#EAE7E0] shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="sans text-[10px] uppercase tracking-wider font-bold text-[#718894] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C16657]" />
                Shareable Preview
              </span>
              <span className="sans text-[10px] uppercase text-[#718894] font-semibold">
                chungbooks.fr
              </span>
            </div>

            {dilemma && dilemma.trim().length > 0 && (
              <div className="bg-[#FAF8F2] border-l-2 border-[#C16657] p-2.5 rounded-r-xl text-xs text-[#55534E]">
                <strong className="sans uppercase text-[10px] text-[#718894] block mb-0.5 tracking-wider">
                  Dilemma
                </strong>
                <span className="italic text-[#2D2C2A]">"{dilemma}"</span>
              </div>
            )}

            <div>
              <h4 className="text-lg text-[#2D2C2A] italic font-semibold">
                {model.name}
              </h4>
              <p className="text-xs sm:text-sm text-[#55534E] leading-relaxed mt-1">
                {model.twoSentenceApplication}
              </p>
            </div>
          </div>

          {/* Direct Link Copy Bar */}
          <div className="space-y-2">
            <label className="sans text-[11px] uppercase tracking-wider font-bold text-[#718894] block">
              Direct Decision Link (with your dilemma)
            </label>
            <div className="flex items-center gap-2">
              <input
                id="shareable-direct-link-input"
                type="text"
                readOnly
                value={shareUrl}
                className="w-full text-xs font-mono bg-white border border-[#EAE7E0] rounded-xl px-3.5 py-2.5 text-[#2D2C2A] select-all outline-none truncate"
              />
              <button
                id="copy-direct-share-link-btn"
                type="button"
                onClick={handleCopyLink}
                className="sans shrink-0 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#FAF8F2] hover:bg-[#EAE7E0] text-[#2D2C2A] border border-[#EAE7E0] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#C16657]" />
                    <span className="text-[#C16657]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#718894]" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Share Channels */}
          <div className="space-y-2.5">
            <label className="sans text-[11px] uppercase tracking-wider font-bold text-[#718894] block">
              Share to Channels
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {/* WhatsApp */}
              <a
                id="share-whatsapp-btn"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="sans flex flex-col items-center justify-center p-3 rounded-2xl bg-white hover:bg-[#FAF8F2] border border-[#EAE7E0] transition-all text-[#2D2C2A] group shadow-xs"
              >
                <div className="w-8 h-8 rounded-full bg-[#EAF7EE] text-[#2E7D32] flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#2D2C2A]">
                  WhatsApp
                </span>
              </a>

              {/* X / Twitter */}
              <a
                id="share-twitter-btn"
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="sans flex flex-col items-center justify-center p-3 rounded-2xl bg-white hover:bg-[#FAF8F2] border border-[#EAE7E0] transition-all text-[#2D2C2A] group shadow-xs"
              >
                <div className="w-8 h-8 rounded-full bg-[#F0F4F8] text-[#1E293B] flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
                  <Twitter className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#2D2C2A]">
                  X / Twitter
                </span>
              </a>

              {/* LinkedIn */}
              <a
                id="share-linkedin-btn"
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="sans flex flex-col items-center justify-center p-3 rounded-2xl bg-white hover:bg-[#FAF8F2] border border-[#EAE7E0] transition-all text-[#2D2C2A] group shadow-xs"
              >
                <div className="w-8 h-8 rounded-full bg-[#EBF3FB] text-[#0A66C2] flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
                  <Linkedin className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#2D2C2A]">
                  LinkedIn
                </span>
              </a>

              {/* Email */}
              <a
                id="share-email-btn"
                href={mailUrl}
                className="sans flex flex-col items-center justify-center p-3 rounded-2xl bg-white hover:bg-[#FAF8F2] border border-[#EAE7E0] transition-all text-[#2D2C2A] group shadow-xs"
              >
                <div className="w-8 h-8 rounded-full bg-[#FAF0ED] text-[#C16657] flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#2D2C2A]">
                  Email
                </span>
              </a>
            </div>
          </div>

          {/* Copy Formatted Text or Native Device Share */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2">
            {hasNativeShare && (
              <button
                id="native-device-share-btn"
                type="button"
                onClick={handleNativeShare}
                className="btn-primary flex-1 py-3 px-4 rounded-full text-xs font-bold uppercase tracking-wider sans flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Share2 className="w-4 h-4 text-white" />
                <span>Share via Device Menu</span>
              </button>
            )}

            <button
              id="copy-formatted-snippet-btn"
              type="button"
              onClick={handleCopyText}
              className={`sans flex-1 py-3 px-4 rounded-full text-xs font-bold uppercase tracking-wider border transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                copiedText
                  ? 'bg-[#C16657] text-white border-[#C16657]'
                  : 'bg-white hover:bg-[#FAF8F2] text-[#2D2C2A] border-[#EAE7E0]'
              }`}
            >
              {copiedText ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Snippet Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#718894]" />
                  <span>Copy Full Text Snippet</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-[#EAE7E0] bg-[#FAF8F2] flex items-center justify-between">
          <span className="sans text-[10px] uppercase tracking-wider text-[#718894] font-semibold">
            The Mental Models Decision Companion &bull; chungbooks.fr
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
