import React, { useState } from 'react';
import { Play, Copy, Check, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { HttpCode } from '../data/httpCodes';

interface StatusCodeCardProps {
  item: HttpCode;
  onSelect: (code: number) => void;
  onOpenSimulator: (code: number) => void;
  onViewImage: (item: HttpCode) => void;
}

export const StatusCodeCard: React.FC<StatusCodeCardProps> = ({
  item,
  onSelect,
  onOpenSimulator,
  onViewImage
}) => {
  const [copied, setCopied] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getFamilyColor = (family: string) => {
    switch (family) {
      case '1xx':
        return 'text-sky-400 border-sky-500/30 bg-sky-950/20';
      case '2xx':
        return 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20';
      case '3xx':
        return 'text-amber-400 border-amber-500/30 bg-amber-950/20';
      case '4xx':
        return 'text-rose-400 border-rose-500/30 bg-rose-950/20';
      case '5xx':
        return 'text-purple-400 border-purple-500/30 bg-purple-950/20';
      default:
        return 'text-slate-400 border-slate-700 bg-slate-900/40';
    }
  };

  const copyUrl = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(item.catUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="group flex flex-col rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden hover:border-slate-700 hover:shadow-xl transition-all">
      {/* Cat Media Container */}
      <div 
        onClick={() => onViewImage(item)}
        className="relative h-48 w-full bg-slate-950 overflow-hidden cursor-pointer"
      >
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950 text-slate-600 text-xs font-mono animate-pulse">
            Loading cat meme...
          </div>
        )}

        {imageError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 p-4 text-center">
            <ImageIcon className="w-8 h-8 text-slate-600 mb-2" />
            <span className="text-xs text-slate-400 font-mono">http.cat/{item.code}</span>
            <span className="text-[11px] text-slate-500 mt-1">Click to retry preview</span>
          </div>
        ) : (
          <img
            src={item.catUrl}
            alt={`HTTP Cat ${item.code}: ${item.title}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        )}

        {/* Status Pill on Media */}
        <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950/90 backdrop-blur-md border border-slate-800 text-xs font-mono font-bold text-white shadow-sm">
          <span>{item.code}</span>
          <span className="text-slate-500">·</span>
          <span className="text-slate-300">{item.title}</span>
        </div>

        {/* Enlarge Hint */}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 rounded bg-slate-950/80 backdrop-blur-sm text-[11px] text-slate-300 flex items-center gap-1">
          <ExternalLink className="w-3 h-3" />
          <span>Zoom</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="flex-1 p-5 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Metadata line (Clean, unboxed text per guidelines) */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="font-semibold text-slate-300">{item.familyName}</span>
            <span aria-hidden="true">·</span>
            <span>{item.tagline}</span>
          </div>

          <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
            {item.code} {item.title}
          </h3>

          {/* Plain English explanation: "Need small sentence to understand what it is mentioning" */}
          <p className="text-xs text-slate-300 leading-relaxed">
            {item.oneLiner}
          </p>
        </div>

        {/* Real-World Scenario: "Need small scenario when the code will come like 404 or 200" */}
        <div className="rounded-lg bg-slate-950/70 border border-slate-800/80 p-3 text-xs space-y-1">
          <div className="font-semibold text-amber-400/90 flex items-center gap-1">
            <span>When this code happens:</span>
          </div>
          <p className="text-slate-400 leading-relaxed">
            {item.scenario}
          </p>
        </div>

        {/* Action Bar */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-800/80 text-xs">
          <button
            onClick={() => onOpenSimulator(item.code)}
            className="inline-flex items-center gap-1.5 font-semibold text-amber-400 hover:text-amber-300 transition-colors"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Simulate Request</span>
          </button>

          <button
            onClick={copyUrl}
            className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors"
            title="Copy http.cat direct image link"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 text-[11px]">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="text-[11px]">Copy Cat URL</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
