import React, { useState, useMemo } from 'react';
import { Search, Filter, Sparkles, BookOpen } from 'lucide-react';
import { HTTP_CODES, HTTP_FAMILIES, HttpCode } from '../data/httpCodes';
import { StatusCodeCard } from './StatusCodeCard';

interface StatusCodeCatalogProps {
  onSelectCode: (code: number) => void;
  onOpenSimulator: (code: number) => void;
  onViewImage: (item: HttpCode) => void;
}

export const StatusCodeCatalog: React.FC<StatusCodeCatalogProps> = ({
  onSelectCode,
  onOpenSimulator,
  onViewImage
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFamily, setSelectedFamily] = useState('all');

  const filteredCodes = useMemo(() => {
    return HTTP_CODES.filter((item) => {
      const matchesFamily = selectedFamily === 'all' || item.family === selectedFamily;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesFamily;

      const matchesSearch = 
        item.code.toString().includes(query) ||
        item.title.toLowerCase().includes(query) ||
        item.oneLiner.toLowerCase().includes(query) ||
        item.scenario.toLowerCase().includes(query) ||
        item.tagline.toLowerCase().includes(query);

      return matchesFamily && matchesSearch;
    });
  }, [searchQuery, selectedFamily]);

  return (
    <div className="space-y-8">
      {/* Header and Controls - Normal and Minimal */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-lg sm:text-xl font-semibold text-slate-100">
            HTTP Status Codes &amp; Real Scenarios
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            Browse status codes, plain English meanings, scenarios, and images from <code>http.cat</code>.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search code (e.g. 404, auth, timeout)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
          />
        </div>
      </div>

      {/* Segmented Filter Control (Functional tabs with click handlers per frontend constitution) */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900/80 border border-slate-800 rounded-xl">
        {HTTP_FAMILIES.map((family) => {
          const isSelected = selectedFamily === family.family;
          const count = family.family === 'all' 
            ? HTTP_CODES.length 
            : HTTP_CODES.filter((c) => c.family === family.family).length;

          return (
            <button
              key={family.family}
              onClick={() => setSelectedFamily(family.family)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-slate-800 text-white shadow-sm ring-1 ring-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <span>{family.name}</span>
              <span className="text-[11px] font-mono text-slate-500">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Selected Family Info Banner */}
      {selectedFamily !== 'all' && (
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 flex items-center justify-between">
          <div className="text-xs text-slate-300">
            <strong className="text-white">
              {HTTP_FAMILIES.find((f) => f.family === selectedFamily)?.name}:
            </strong>{' '}
            {HTTP_FAMILIES.find((f) => f.family === selectedFamily)?.description}
          </div>
          <button
            onClick={() => setSelectedFamily('all')}
            className="text-xs text-slate-400 hover:text-white underline whitespace-nowrap ml-4"
          >
            Show all
          </button>
        </div>
      )}

      {/* Status Code Cards Grid */}
      {filteredCodes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCodes.map((item) => (
            <StatusCodeCard
              key={item.code}
              item={item}
              onSelect={onSelectCode}
              onOpenSimulator={onOpenSimulator}
              onViewImage={onViewImage}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 rounded-xl border border-slate-800 bg-slate-900/40">
          <p className="text-slate-400 text-sm">
            No status codes found matching "{searchQuery}".
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedFamily('all');
            }}
            className="mt-3 text-xs text-amber-400 hover:underline"
          >
            Clear filters and show all codes
          </button>
        </div>
      )}
    </div>
  );
};
