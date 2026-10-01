import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Sparkles, 
  Copy, 
  Check, 
  ExternalLink, 
  Play, 
  Terminal, 
  AlertCircle,
  HelpCircle,
  RotateCcw,
  BookOpen
} from 'lucide-react';
import { HTTP_CODES, resolveHttpCode, HttpCode } from '../data/httpCodes';

interface InstantCodeSearchProps {
  onViewImage: (item: HttpCode) => void;
  onOpenSimulator: (code: number) => void;
}

export const InstantCodeSearch: React.FC<InstantCodeSearchProps> = ({
  onViewImage,
  onOpenSimulator
}) => {
  const [typedInput, setTypedInput] = useState<string>('404');
  const [activeCode, setActiveCode] = useState<number>(404);
  const [copied, setCopied] = useState<boolean>(false);
  const [showApiDetails, setShowApiDetails] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  // Suggested popular codes
  const quickCodes = [
    { code: 200, label: '200 OK' },
    { code: 201, label: '201 Created' },
    { code: 204, label: '204 No Content' },
    { code: 301, label: '301 Moved' },
    { code: 400, label: '400 Bad Request' },
    { code: 401, label: '401 Unauthorized' },
    { code: 403, label: '403 Forbidden' },
    { code: 404, label: '404 Not Found' },
    { code: 418, label: '418 Teapot' },
    { code: 429, label: '429 Rate Limit' },
    { code: 500, label: '500 Server Error' },
    { code: 503, label: '503 Unavailable' },
    { code: 504, label: '504 Timeout' }
  ];

  // When input changes, extract numeric code
  useEffect(() => {
    const numericOnly = typedInput.replace(/\D/g, '');
    if (numericOnly.length >= 2) {
      const codeNum = parseInt(numericOnly, 10);
      if (!isNaN(codeNum) && codeNum >= 100 && codeNum <= 599) {
        setActiveCode(codeNum);
        setImageLoaded(false);
      }
    }
  }, [typedInput]);

  const currentItem = resolveHttpCode(activeCode);

  const handleSelectQuick = (code: number) => {
    setTypedInput(code.toString());
    setActiveCode(code);
    setImageLoaded(false);
  };

  const handleRandom = () => {
    const randomIndex = Math.floor(Math.random() * HTTP_CODES.length);
    const randomCode = HTTP_CODES[randomIndex].code;
    setTypedInput(randomCode.toString());
    setActiveCode(randomCode);
    setImageLoaded(false);
  };

  const copyCatUrl = () => {
    navigator.clipboard.writeText(currentItem.catUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusBadgeColor = (family: string) => {
    switch (family) {
      case '1xx':
        return 'text-sky-400 bg-sky-950/50 border-sky-500/30';
      case '2xx':
        return 'text-emerald-400 bg-emerald-950/50 border-emerald-500/30';
      case '3xx':
        return 'text-amber-400 bg-amber-950/50 border-amber-500/30';
      case '4xx':
        return 'text-rose-400 bg-rose-950/50 border-rose-500/30';
      case '5xx':
        return 'text-purple-400 bg-purple-950/50 border-purple-500/30';
      default:
        return 'text-slate-400 bg-slate-900 border-slate-700';
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Hero Title - Normal and Minimal */}
      <div className="text-center space-y-1.5">
        <h1 className="text-lg sm:text-xl font-semibold tracking-normal text-slate-100">
          HTTP Status Code &amp; Scenario Finder
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Type any 3-digit code (e.g. <span className="text-emerald-400 font-mono font-medium">200</span>, <span className="text-rose-400 font-mono font-medium">404</span>, <span className="text-purple-400 font-mono font-medium">500</span>) to see the cat meme, short meaning, and scenario.
        </p>
      </div>

      {/* Prominent Input Box */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 flex items-center gap-1.5">
              <Search className="w-5 h-5 text-amber-400" />
              <span className="text-xs font-mono font-bold text-slate-500 hidden sm:inline">HTTP</span>
            </div>
            <input
              type="text"
              value={typedInput}
              onChange={(e) => setTypedInput(e.target.value)}
              placeholder="Type code e.g. 404, 200, 418, 500..."
              maxLength={4}
              autoFocus
              className="w-full pl-12 sm:pl-20 pr-12 py-3.5 bg-slate-950 border border-slate-700 rounded-xl text-lg sm:text-xl font-mono font-bold text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all shadow-inner"
            />
            {typedInput && (
              <button
                onClick={() => setTypedInput('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleRandom}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors whitespace-nowrap"
              title="Pick a random status code"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Random Code</span>
            </button>
          </div>
        </div>

        {/* Quick Click Badges */}
        <div className="space-y-1.5 pt-1">
          <div className="text-[11px] font-semibold text-slate-400">Quick Select:</div>
          <div className="flex flex-wrap gap-1.5">
            {quickCodes.map((item) => (
              <button
                key={item.code}
                onClick={() => handleSelectQuick(item.code)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${
                  activeCode === item.code
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-950/80 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Instant Result Showcase Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-2xl">
        {/* Card Header with Status and Family */}
        <div className="px-6 py-4 bg-slate-950/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-lg text-sm font-mono font-black border ${getStatusBadgeColor(currentItem.family)}`}>
              {currentItem.code} {currentItem.title}
            </span>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              {currentItem.familyName} ({currentItem.family})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyCatUrl}
              className="flex items-center gap-1 px-3 py-1 text-xs text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-lg transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Cat URL'}</span>
            </button>
            <button
              onClick={() => onViewImage(currentItem)}
              className="flex items-center gap-1 px-3 py-1 text-xs text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-lg transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Full View</span>
            </button>
          </div>
        </div>

        {/* Main Grid: Image + Explanations */}
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: http.cat Image */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div 
              onClick={() => onViewImage(currentItem)}
              className="group relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 cursor-pointer shadow-lg"
            >
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950 text-slate-500 text-xs font-mono animate-pulse">
                  Loading http.cat/{currentItem.code}...
                </div>
              )}
              <img
                src={currentItem.catUrl}
                alt={`HTTP Cat ${currentItem.code}: ${currentItem.title}`}
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-2 right-2 bg-slate-950/80 px-2 py-0.5 rounded text-[11px] text-slate-300 border border-slate-800 opacity-0 group-hover:opacity-100 transition-opacity">
                Click to Zoom
              </div>
            </div>

            <div className="text-[11px] text-slate-500 font-mono mt-2 text-center">
              Source: <a href={currentItem.catUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:underline">https://http.cat/{currentItem.code}</a>
            </div>
          </div>

          {/* Right Column: Sentence & Scenario */}
          <div className="md:col-span-7 space-y-5">
            {/* Box 1: Small sentence to understand what it means */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wide">
                <span>What it means (in plain English):</span>
              </div>
              <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed">
                "{currentItem.oneLiner}"
              </p>
            </div>

            {/* Box 2: Small scenario when the code will come */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="text-xs font-bold text-sky-400 flex items-center gap-1.5 uppercase tracking-wide">
                <span>When does this code happen (Small Scenario)?</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {currentItem.scenario}
              </p>
            </div>

            {/* How developers handle this */}
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs space-y-1">
              <span className="font-semibold text-purple-400">How to handle in code:</span>
              <p className="text-slate-400 leading-relaxed">
                {currentItem.resolution}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => onOpenSimulator(currentItem.code)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-amber-400 text-slate-950 hover:bg-amber-300 transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Simulate Code {currentItem.code} in API Client</span>
              </button>

              <button
                onClick={() => setShowApiDetails(!showApiDetails)}
                className="px-3.5 py-2 text-xs font-medium rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-900 transition-colors flex items-center gap-1.5"
              >
                <Terminal className="w-3.5 h-3.5 text-amber-400" />
                <span>{showApiDetails ? 'Hide Request Anatomy' : 'Inspect API Request'}</span>
              </button>
            </div>

            {/* Optional API Inspection Box */}
            {showApiDetails && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs text-slate-300 animate-fadeIn">
                <div className="flex items-center justify-between text-slate-500 border-b border-slate-800 pb-2">
                  <span>Simulated Request &rarr; Response</span>
                  <span className="text-emerald-400">{currentItem.simulatedResponse.timeMs}ms</span>
                </div>
                <div>
                  <span className="text-sky-400">{currentItem.simulatedRequest.method}</span>{' '}
                  <span className="text-slate-300">{currentItem.simulatedRequest.url}</span>
                </div>
                <div className="text-slate-400">
                  HTTP/2 <span className="text-amber-400 font-bold">{currentItem.code} {currentItem.title}</span>
                </div>
                <pre className="text-emerald-300 bg-slate-900 p-2.5 rounded overflow-x-auto text-[11px]">
                  {JSON.stringify(currentItem.simulatedResponse.body, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
