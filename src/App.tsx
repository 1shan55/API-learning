/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar, AppTab } from './components/Navbar';
import { InstantCodeSearch } from './components/InstantCodeSearch';
import { ApiBasicsGuide } from './components/ApiBasicsGuide';
import { StatusCodeCatalog } from './components/StatusCodeCatalog';
import { InteractivePlayground } from './components/InteractivePlayground';
import { ScenarioQuiz } from './components/ScenarioQuiz';
import { CatModal } from './components/CatModal';
import { HTTP_CODES, resolveHttpCode, HttpCode } from './data/httpCodes';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('finder');
  const [simulatorTargetCode, setSimulatorTargetCode] = useState<number>(200);
  const [modalItem, setModalItem] = useState<HttpCode | null>(null);

  const handleSelectCode = (code: number) => {
    const item = resolveHttpCode(code);
    setModalItem(item);
  };

  const handleOpenSimulator = (code: number) => {
    setSimulatorTargetCode(code);
    setActiveTab('simulator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRandomCat = () => {
    const randomIndex = Math.floor(Math.random() * HTTP_CODES.length);
    const item = HTTP_CODES[randomIndex];
    setModalItem(item);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-400 selection:text-slate-950">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onRandomCat={handleRandomCat}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {activeTab === 'finder' && (
          <InstantCodeSearch
            onViewImage={(item) => setModalItem(item)}
            onOpenSimulator={handleOpenSimulator}
          />
        )}

        {activeTab === 'catalog' && (
          <StatusCodeCatalog
            onSelectCode={handleSelectCode}
            onOpenSimulator={handleOpenSimulator}
            onViewImage={(item) => setModalItem(item)}
          />
        )}

        {activeTab === 'basics' && (
          <ApiBasicsGuide
            onSelectCode={handleSelectCode}
            onOpenSimulatorWithCode={handleOpenSimulator}
          />
        )}

        {activeTab === 'simulator' && (
          <InteractivePlayground
            initialCode={simulatorTargetCode}
            onViewImage={(item) => setModalItem(item)}
          />
        )}

        {activeTab === 'quiz' && (
          <ScenarioQuiz />
        )}
      </main>

      {/* Lightbox / Detail Modal */}
      <CatModal
        item={modalItem}
        onClose={() => setModalItem(null)}
        onOpenSimulator={handleOpenSimulator}
      />

      {/* Clean Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span>HTTP Cat Academy</span>
            <span aria-hidden="true">·</span>
            <span>Images from <a href="https://http.cat/" target="_blank" rel="noreferrer" className="text-amber-400/90 hover:underline">http.cat</a></span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('finder')}
              className="hover:text-slate-300 transition-colors"
            >
              Type &amp; Search
            </button>
            <button
              onClick={() => setActiveTab('basics')}
              className="hover:text-slate-300 transition-colors"
            >
              API Basics
            </button>
            <button
              onClick={() => setActiveTab('catalog')}
              className="hover:text-slate-300 transition-colors"
            >
              All Cats
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className="hover:text-slate-300 transition-colors"
            >
              Live Simulator
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className="hover:text-slate-300 transition-colors"
            >
              Scenario Quiz
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
