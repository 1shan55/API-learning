import React, { useState } from 'react';
import { X, Copy, Check, ExternalLink, Play, Sparkles } from 'lucide-react';
import { HttpCode } from '../data/httpCodes';

interface CatModalProps {
  item: HttpCode | null;
  onClose: () => void;
  onOpenSimulator: (code: number) => void;
}

export const CatModal: React.FC<CatModalProps> = ({ item, onClose, onOpenSimulator }) => {
  const [copied, setCopied] = useState(false);

  if (!item) return null;

  const copyUrl = () => {
    navigator.clipboard.writeText(item.catUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative max-w-2xl w-full rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-lg text-white">
              {item.code} {item.title}
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-xs text-slate-400 font-medium">{item.familyName}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Main Cat Image */}
          <div className="rounded-xl overflow-hidden bg-slate-950 border border-slate-800 max-h-[380px] flex items-center justify-center">
            <img
              src={item.catUrl}
              alt={`HTTP Cat ${item.code}: ${item.title}`}
              className="w-full h-full object-contain max-h-[380px]"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Explanation */}
          <div className="space-y-4">
            <div>
              <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                What this code means:
              </div>
              <p className="text-sm text-slate-200 mt-1 leading-relaxed">
                {item.oneLiner}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
              <div className="text-xs font-semibold text-slate-300">
                When does this scenario happen?
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {item.scenario}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
              <div className="text-xs font-semibold text-purple-400">
                How developers handle this:
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {item.resolution}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs">
          <button
            onClick={copyUrl}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied Image URL' : 'Copy Direct Cat Link'}</span>
          </button>

          <div className="flex items-center gap-2">
            <a
              href={item.catUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1"
            >
              <span>Open on http.cat</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => {
                onClose();
                onOpenSimulator(item.code);
              }}
              className="px-4 py-1.5 rounded-lg bg-amber-400 text-slate-950 font-bold hover:bg-amber-300 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Simulate Code {item.code}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
