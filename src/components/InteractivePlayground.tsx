import React, { useState, useEffect } from 'react';
import { 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  ExternalLink, 
  Terminal, 
  Sparkles, 
  Layers, 
  Clock, 
  Shield, 
  FileText,
  AlertTriangle
} from 'lucide-react';
import { HTTP_CODES, HttpCode } from '../data/httpCodes';

interface InteractivePlaygroundProps {
  initialCode?: number;
  onViewImage: (item: HttpCode) => void;
}

export const InteractivePlayground: React.FC<InteractivePlaygroundProps> = ({
  initialCode = 200,
  onViewImage
}) => {
  const [selectedCode, setSelectedCode] = useState<number>(initialCode);
  const [customMethod, setCustomMethod] = useState<'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'>('GET');
  const [customUrl, setCustomUrl] = useState<string>('');
  const [includeAuth, setIncludeAuth] = useState<boolean>(true);
  const [requestBodyText, setRequestBodyText] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'body' | 'headers' | 'scenario'>('body');
  
  const [isSending, setIsSending] = useState<boolean>(false);
  const [hasSent, setHasSent] = useState<boolean>(true);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  // Current HTTP code object
  const currentCodeObj = HTTP_CODES.find((c) => c.code === selectedCode) || HTTP_CODES[2]; // Default to 200

  // Sync when initialCode changes
  useEffect(() => {
    if (initialCode) {
      const found = HTTP_CODES.find((c) => c.code === initialCode);
      if (found) {
        setSelectedCode(found.code);
        setCustomMethod(found.simulatedRequest.method);
        setCustomUrl(found.simulatedRequest.url);
        setRequestBodyText(found.simulatedRequest.body || '');
      }
    }
  }, [initialCode]);

  // When selected code changes from dropdown or preset
  const handleSelectPreset = (code: number) => {
    const found = HTTP_CODES.find((c) => c.code === code);
    if (found) {
      setSelectedCode(code);
      setCustomMethod(found.simulatedRequest.method);
      setCustomUrl(found.simulatedRequest.url);
      setRequestBodyText(found.simulatedRequest.body || '');
      triggerSendAnimation();
    }
  };

  const triggerSendAnimation = () => {
    setIsSending(true);
    setHasSent(false);
    setTimeout(() => {
      setIsSending(false);
      setHasSent(true);
    }, 350);
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const getCurlSnippet = () => {
    let curl = `curl -X ${customMethod} "${customUrl}"`;
    if (includeAuth) {
      curl += ` \\\n  -H "Authorization: Bearer mock_cat_token_123"`;
    }
    if (['POST', 'PUT', 'PATCH'].includes(customMethod) && requestBodyText) {
      curl += ` \\\n  -H "Content-Type: application/json" \\\n  -d '${requestBodyText.replace(/\n/g, '')}'`;
    }
    return curl;
  };

  const getFetchSnippet = () => {
    return `// JavaScript Fetch Example
fetch("${customUrl}", {
  method: "${customMethod}",
  headers: {
    "Accept": "application/json",${includeAuth ? '\n    "Authorization": "Bearer mock_cat_token_123",' : ''}${
      ['POST', 'PUT', 'PATCH'].includes(customMethod) ? '\n    "Content-Type": "application/json",' : ''
    }
  },${
    ['POST', 'PUT', 'PATCH'].includes(customMethod) && requestBodyText
      ? `\n  body: JSON.stringify(${requestBodyText})`
      : ''
  }
})
  .then(response => {
    console.log("Status:", response.status); // ${currentCodeObj.code}
    return response.json();
  })
  .then(data => console.log(data))
  .catch(err => console.error(err));`;
  };

  const getStatusColor = (code: number) => {
    if (code >= 200 && code < 300) return 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30';
    if (code >= 300 && code < 400) return 'text-amber-400 bg-amber-950/40 border-amber-500/30';
    if (code >= 400 && code < 500) return 'text-rose-400 bg-rose-950/40 border-rose-500/30';
    if (code >= 500) return 'text-purple-400 bg-purple-950/40 border-purple-500/30';
    return 'text-sky-400 bg-sky-950/40 border-sky-500/30';
  };

  return (
    <div className="space-y-8">
      {/* Header - Normal and Minimal */}
      <div className="space-y-1">
        <h1 className="text-lg sm:text-xl font-semibold text-slate-100">
          Simulate API Requests &amp; Responses
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
          Choose an endpoint or code, tweak headers, and observe how the client and server negotiate the response code and matching cat.
        </p>
      </div>

      {/* Preset Quick Buttons */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300">
          Quick Preset Scenarios:
        </label>
        <div className="flex flex-wrap gap-2">
          {[
            { code: 200, label: '200 OK (Profile)' },
            { code: 201, label: '201 Created (Post)' },
            { code: 204, label: '204 Deleted (Task)' },
            { code: 301, label: '301 Redirect (HTTPS)' },
            { code: 400, label: '400 Bad Request' },
            { code: 401, label: '401 Unauthorized' },
            { code: 403, label: '403 Forbidden' },
            { code: 404, label: '404 Not Found' },
            { code: 418, label: '418 Teapot' },
            { code: 429, label: '429 Rate Limit' },
            { code: 500, label: '500 Server Crash' },
            { code: 504, label: '504 Gateway Timeout' },
          ].map((preset) => (
            <button
              key={preset.code}
              onClick={() => handleSelectPreset(preset.code)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium font-mono transition-all whitespace-nowrap ${
                selectedCode === preset.code
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* The Request / Response Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Request Builder (5 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>Outgoing HTTP Request</span>
              </span>
              <button
                onClick={() => handleSelectPreset(selectedCode)}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                title="Reset to default preset values"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Method + URL Input */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-400">Endpoint URL</label>
              <div className="flex items-center gap-2">
                <select
                  value={customMethod}
                  onChange={(e) => setCustomMethod(e.target.value as any)}
                  aria-label="HTTP Method"
                  className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-2 text-xs font-mono font-bold text-amber-400 focus:outline-none focus:border-amber-400"
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="PATCH">PATCH</option>
                  <option value="DELETE">DELETE</option>
                </select>

                <input
                  type="text"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  placeholder="https://api.example.com/v1/..."
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Request Headers Toggle */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400">Request Headers</span>
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeAuth}
                    onChange={(e) => setIncludeAuth(e.target.checked)}
                    className="rounded border-slate-700 text-amber-400 focus:ring-0 bg-slate-950"
                  />
                  <span>Attach Auth Token</span>
                </label>
              </div>

              <div className="rounded-lg bg-slate-950 border border-slate-800/80 p-3 text-xs font-mono space-y-1 text-slate-400">
                <div>Accept: application/json</div>
                <div>User-Agent: HTTPCatClient/2026.1</div>
                {includeAuth && (
                  <div className="text-amber-400">Authorization: Bearer mock_cat_token_123</div>
                )}
                {['POST', 'PUT', 'PATCH'].includes(customMethod) && (
                  <div>Content-Type: application/json</div>
                )}
              </div>
            </div>

            {/* Request Body (If applicable) */}
            {['POST', 'PUT', 'PATCH'].includes(customMethod) && (
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-400">JSON Request Body</label>
                <textarea
                  rows={4}
                  value={requestBodyText}
                  onChange={(e) => setRequestBodyText(e.target.value)}
                  placeholder='{ "key": "value" }'
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-400"
                />
              </div>
            )}

            {/* Send Button */}
            <button
              onClick={triggerSendAnimation}
              disabled={isSending}
              className="w-full py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isSending ? 'Transmitting Request...' : 'Send API Request'}</span>
            </button>
          </div>

          {/* Code Snippets to Copy */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">Run in Your Project:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyToClipboard(getCurlSnippet(), 'curl')}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  {copiedType === 'curl' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedType === 'curl' ? 'Copied cURL' : 'Copy cURL'}</span>
                </button>
                <span className="text-slate-600">·</span>
                <button
                  onClick={() => copyToClipboard(getFetchSnippet(), 'fetch')}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  {copiedType === 'fetch' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedType === 'fetch' ? 'Copied Fetch' : 'Copy fetch()'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Server Response & Cat (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 space-y-4">
            {/* Response Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded text-xs font-mono font-bold border ${getStatusColor(currentCodeObj.code)}`}>
                  {currentCodeObj.code} {currentCodeObj.title}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3" />
                  {currentCodeObj.simulatedResponse.timeMs}ms
                </span>
              </div>

              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
                <button
                  onClick={() => setActiveTab('body')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    activeTab === 'body' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Response Body
                </button>
                <button
                  onClick={() => setActiveTab('scenario')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    activeTab === 'scenario' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Why this code?
                </button>
                <button
                  onClick={() => setActiveTab('headers')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    activeTab === 'headers' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Headers
                </button>
              </div>
            </div>

            {/* Network Packet Animation state */}
            {isSending ? (
              <div className="h-64 flex flex-col items-center justify-center space-y-3 bg-slate-950 rounded-xl border border-slate-800/80">
                <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                <span className="text-xs font-mono text-slate-400">DNS Lookup → Network Gateway → Server Processing...</span>
              </div>
            ) : (
              <>
                {/* Cat Visual Card */}
                <div 
                  onClick={() => onViewImage(currentCodeObj)}
                  className="group relative h-56 w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 cursor-pointer shadow-inner"
                >
                  <img
                    src={currentCodeObj.catUrl}
                    alt={`HTTP Cat ${currentCodeObj.code}`}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                    <span className="font-semibold drop-shadow">{currentCodeObj.tagline}</span>
                    <span className="text-[11px] text-slate-300 flex items-center gap-1 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800">
                      <ExternalLink className="w-3 h-3" />
                      Click to Enlarge
                    </span>
                  </div>
                </div>

                {/* Tab content */}
                {activeTab === 'body' && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-slate-400">JSON Payload</span>
                      <button
                        onClick={() => copyToClipboard(JSON.stringify(currentCodeObj.simulatedResponse.body, null, 2), 'body')}
                        className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1"
                      >
                        {copiedType === 'body' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedType === 'body' ? 'Copied' : 'Copy JSON'}</span>
                      </button>
                    </div>
                    <pre className="rounded-lg bg-slate-950 border border-slate-800 p-3 text-xs font-mono text-emerald-300 overflow-x-auto max-h-48">
                      {JSON.stringify(currentCodeObj.simulatedResponse.body, null, 2)}
                    </pre>
                  </div>
                )}

                {activeTab === 'scenario' && (
                  <div className="space-y-3 p-4 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                    <div>
                      <span className="font-bold text-amber-400">What does {currentCodeObj.code} mean?</span>
                      <p className="text-slate-300 mt-1 leading-relaxed">{currentCodeObj.oneLiner}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80">
                      <span className="font-bold text-sky-400">Real-world scenario:</span>
                      <p className="text-slate-300 mt-1 leading-relaxed">{currentCodeObj.scenario}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80">
                      <span className="font-bold text-purple-400">How to handle in code:</span>
                      <p className="text-slate-300 mt-1 leading-relaxed">{currentCodeObj.resolution}</p>
                    </div>
                  </div>
                )}

                {activeTab === 'headers' && (
                  <div className="space-y-2">
                    <div className="text-[11px] font-semibold text-slate-400">Response Headers</div>
                    <div className="rounded-lg bg-slate-950 border border-slate-800 p-3 text-xs font-mono space-y-1 text-slate-300">
                      <div>status: {currentCodeObj.code} {currentCodeObj.title}</div>
                      {Object.entries(currentCodeObj.simulatedResponse.headers).map(([k, v]) => (
                        <div key={k}>
                          <span className="text-slate-500">{k}:</span> {v}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
