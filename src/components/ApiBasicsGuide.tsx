import React, { useState } from 'react';
import { 
  ArrowRight, 
  Send, 
  Database, 
  Laptop, 
  Server, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle, 
  ExternalLink,
  Zap,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { HTTP_CODES } from '../data/httpCodes';

interface ApiBasicsGuideProps {
  onSelectCode: (code: number) => void;
  onOpenSimulatorWithCode: (code: number) => void;
}

export const ApiBasicsGuide: React.FC<ApiBasicsGuideProps> = ({
  onSelectCode,
  onOpenSimulatorWithCode
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [interactiveMethod, setInteractiveMethod] = useState<'GET' | 'POST' | 'DELETE'>('GET');
  const [interactiveScenario, setInteractiveScenario] = useState<'found' | 'not_found' | 'no_auth' | 'crash'>('found');

  const steps = [
    {
      title: '1. The Client makes a Request',
      actor: 'Client (Your Browser / Phone)',
      detail: 'When you tap "Like" on Instagram or open an app, your device doesn’t have all the photos stored. It sends an HTTP Request asking the remote server for information.',
      icon: Laptop,
      color: 'text-sky-400'
    },
    {
      title: '2. The Internet Transports it',
      actor: 'The Web (DNS & Network Edge)',
      detail: 'Your request is packaged into HTTP packets with a destination URL, method (GET, POST), and headers (like security tokens). Secure edge networks route it swiftly to the destination server.',
      icon: Send,
      color: 'text-amber-400'
    },
    {
      title: '3. The Server Processes the logic',
      actor: 'Backend Server & Database',
      detail: 'The backend server receives the request, verifies who you are, talks to the database (PostgreSQL, Firestore), and decides whether to approve, redirect, or deny.',
      icon: Server,
      color: 'text-purple-400'
    },
    {
      title: '4. The Server sends a Response Code',
      actor: 'HTTP Response & Cat Code',
      detail: 'The server answers with a 3-digit HTTP Status Code (like 200, 404, 500) so the client knows what happened without guessing, along with any JSON data requested.',
      icon: Database,
      color: 'text-emerald-400'
    }
  ];

  // Map interactive simulation in basics
  const getScenarioOutcome = () => {
    switch (interactiveScenario) {
      case 'found':
        return {
          code: 200,
          statusText: 'OK',
          headline: 'Success! Found what you asked for.',
          story: 'You requested profile `/users/whiskers`. The backend queried the database, found the user record, and delivered it smoothly.',
          cat: 'https://http.cat/200'
        };
      case 'not_found':
        return {
          code: 404,
          statusText: 'Not Found',
          headline: 'Resource Missing or Typo in URL.',
          story: 'You requested `/users/unknown-cat-999`. The server looked in the database, found 0 rows, and replied: "I cannot find this anywhere!"',
          cat: 'https://http.cat/404'
        };
      case 'no_auth':
        return {
          code: 401,
          statusText: 'Unauthorized',
          headline: 'Missing or Invalid Login Token.',
          story: 'You requested `/secret-vault/passwords` without passing an `Authorization: Bearer` header. The server said: "Who are you? Please log in first."',
          cat: 'https://http.cat/401'
        };
      case 'crash':
        return {
          code: 500,
          statusText: 'Internal Server Error',
          headline: 'Server Crashed or Bug Triggered.',
          story: 'The server tried to read a property from null or ran out of RAM, throwing an unhandled exception before it could send your data.',
          cat: 'https://http.cat/500'
        };
    }
  };

  const outcome = getScenarioOutcome();

  return (
    <div className="space-y-12">
      {/* Hero Intro */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-slate-950/80 p-8 md:p-12">
        <div className="max-w-3xl space-y-2">
          <h1 className="text-lg sm:text-xl font-semibold tracking-normal text-slate-100">
            How APIs Work &amp; Why HTTP Status Codes Exist
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            An <strong>API (Application Programming Interface)</strong> is the digital messenger between your screen and a remote server. 
            Every time an app sends a question (a <em>Request</em>), the server replies with a 
            standardized 3-digit shorthand (the <em>Status Code</em>) to tell you whether it succeeded, got lost, or crashed.
          </p>
        </div>

        {/* Quick Rule of Thumb Bento */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-6 border-t border-slate-800/80">
          <div 
            onClick={() => onSelectCode(100)}
            className="cursor-pointer group p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-sky-500/40 transition-colors"
          >
            <div className="text-xs font-mono font-bold text-sky-400">1xx Series</div>
            <div className="text-sm font-bold text-white mt-1 group-hover:text-sky-300">"Hold on..."</div>
            <div className="text-xs text-slate-400 mt-1">Informational: server received headers and is waiting.</div>
          </div>

          <div 
            onClick={() => onSelectCode(200)}
            className="cursor-pointer group p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-colors"
          >
            <div className="text-xs font-mono font-bold text-emerald-400">2xx Series</div>
            <div className="text-sm font-bold text-white mt-1 group-hover:text-emerald-300">"Here you go!"</div>
            <div className="text-xs text-slate-400 mt-1">Success: the request was received and fulfilled.</div>
          </div>

          <div 
            onClick={() => onSelectCode(301)}
            className="cursor-pointer group p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-colors"
          >
            <div className="text-xs font-mono font-bold text-amber-400">3xx Series</div>
            <div className="text-sm font-bold text-white mt-1 group-hover:text-amber-300">"Go over there!"</div>
            <div className="text-xs text-slate-400 mt-1">Redirection: the page or data moved to another URL.</div>
          </div>

          <div 
            onClick={() => onSelectCode(404)}
            className="cursor-pointer group p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-rose-500/40 transition-colors"
          >
            <div className="text-xs font-mono font-bold text-rose-400">4xx Series</div>
            <div className="text-sm font-bold text-white mt-1 group-hover:text-rose-300">"You messed up!"</div>
            <div className="text-xs text-slate-400 mt-1">Client Error: wrong password, bad URL, or missing item.</div>
          </div>

          <div 
            onClick={() => onSelectCode(500)}
            className="cursor-pointer group p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/40 transition-colors"
          >
            <div className="text-xs font-mono font-bold text-purple-400">5xx Series</div>
            <div className="text-sm font-bold text-white mt-1 group-hover:text-purple-300">"We messed up!"</div>
            <div className="text-xs text-slate-400 mt-1">Server Error: database crashed, bug in code, or timeout.</div>
          </div>
        </div>
      </section>

      {/* The 4-Step Interactive Visual Flow */}
      <section className="space-y-4">
        <div>
          <h2 className="text-base font-semibold text-slate-100">The Life Cycle of an API Call</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Follow how a single request travels and triggers an HTTP Cat response.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {steps.map((s, index) => {
            const Icon = s.icon;
            const isSelected = activeStep === index;
            return (
              <button
                key={s.title}
                onClick={() => setActiveStep(index)}
                className={`text-left p-5 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-slate-900 border-amber-400/80 shadow-md ring-1 ring-amber-400/50'
                    : 'bg-slate-900/40 border-slate-800 hover:bg-slate-900/70 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-slate-500">Step 0{index + 1}</span>
                  <Icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <h3 className="font-semibold text-sm text-white">{s.title}</h3>
                <div className="text-xs text-slate-400 mt-1">{s.actor}</div>
              </button>
            );
          })}
        </div>

        {/* Deep Dive Box for Active Step */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20">
                Deep Dive: Step {activeStep + 1}
              </span>
              <span className="text-sm font-medium text-slate-300">{steps[activeStep].title}</span>
            </div>
            <p className="text-base text-slate-200 leading-relaxed">
              {steps[activeStep].detail}
            </p>
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
              >
                <span>Next step</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Code Illustration */}
          <div className="w-full md:w-96 rounded-lg border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-300">
            {activeStep === 0 && (
              <div className="space-y-1">
                <div className="text-slate-500">{'// 1. Client creates the request'}</div>
                <div><span className="text-sky-400">const</span> res = <span className="text-sky-400">await</span> fetch(<span className="text-emerald-300">'https://api.cats.com/v1/whiskers'</span>, &#123;</div>
                <div className="pl-4">method: <span className="text-emerald-300">'GET'</span>,</div>
                <div className="pl-4">headers: &#123; <span className="text-amber-300">'Authorization'</span>: <span className="text-emerald-300">'Bearer my_token'</span> &#125;</div>
                <div>&#125;);</div>
              </div>
            )}
            {activeStep === 1 && (
              <div className="space-y-1 text-slate-400">
                <div className="text-slate-500">{'// 2. Transmitted via HTTPS'}</div>
                <div>GET /v1/whiskers HTTP/2</div>
                <div>Host: api.cats.com</div>
                <div>User-Agent: Mozilla/5.0 (iPhone)</div>
                <div>Accept: application/json</div>
                <div className="text-sky-400">{'-> Edge TLS Handshake & Routing'}</div>
              </div>
            )}
            {activeStep === 2 && (
              <div className="space-y-1">
                <div className="text-slate-500">{'// 3. Backend verifies & queries'}</div>
                <div><span className="text-purple-400">const</span> user = <span className="text-sky-400">await</span> db.query(</div>
                <div className="pl-4 text-emerald-300">`SELECT * FROM cats WHERE id = $1`</div>
                <div>);</div>
                <div><span className="text-sky-400">if</span> (!user) return res.status(<span className="text-rose-400 font-bold">404</span>);</div>
              </div>
            )}
            {activeStep === 3 && (
              <div className="space-y-1">
                <div className="text-slate-500">{'// 4. Server returns status code'}</div>
                <div>HTTP/2 <span className="text-emerald-400 font-bold">200 OK</span></div>
                <div>Content-Type: application/json</div>
                <div className="text-slate-400">&#123; <span className="text-amber-300">"status"</span>: <span className="text-emerald-300">"happy"</span>, <span className="text-amber-300">"cat"</span>: <span className="text-emerald-300">"Whiskers"</span> &#125;</div>
                <div className="text-emerald-400 mt-2">{'// Frontend renders cat profile!'}</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Interactive Micro Simulator in Guide */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 md:p-8 space-y-6">
        <div>
          <h2 className="text-base font-semibold text-slate-100">Try Scenarios: Trigger Status Codes &amp; Cats</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Pick a real-world scenario below to see the exact status code and HTTP Cat generated.
          </p>
        </div>

        {/* Scenario Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={() => setInteractiveScenario('found')}
            className={`p-4 rounded-xl border text-left transition-all ${
              interactiveScenario === 'found'
                ? 'bg-slate-900 border-emerald-500 ring-1 ring-emerald-500/40'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-emerald-400">Scenario 1</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-sm font-bold text-white mt-1">Found User Profile</div>
            <div className="text-xs text-slate-400 mt-1">Resource exists in database, user is logged in.</div>
          </button>

          <button
            onClick={() => setInteractiveScenario('not_found')}
            className={`p-4 rounded-xl border text-left transition-all ${
              interactiveScenario === 'not_found'
                ? 'bg-slate-900 border-rose-500 ring-1 ring-rose-500/40'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-rose-400">Scenario 2</span>
              <HelpCircle className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-sm font-bold text-white mt-1">Typo in Address</div>
            <div className="text-xs text-slate-400 mt-1">URL contains misspelled ID `unknown-cat-999`.</div>
          </button>

          <button
            onClick={() => setInteractiveScenario('no_auth')}
            className={`p-4 rounded-xl border text-left transition-all ${
              interactiveScenario === 'no_auth'
                ? 'bg-slate-900 border-amber-500 ring-1 ring-amber-500/40'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-amber-400">Scenario 3</span>
              <ShieldCheck className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-sm font-bold text-white mt-1">Forgot to Log In</div>
            <div className="text-xs text-slate-400 mt-1">Calling private secret vault without credentials.</div>
          </button>

          <button
            onClick={() => setInteractiveScenario('crash')}
            className={`p-4 rounded-xl border text-left transition-all ${
              interactiveScenario === 'crash'
                ? 'bg-slate-900 border-purple-500 ring-1 ring-purple-500/40'
                : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-purple-400">Scenario 4</span>
              <AlertCircle className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-sm font-bold text-white mt-1">Backend Bug / Crash</div>
            <div className="text-xs text-slate-400 mt-1">Unhandled null pointer exception in server code.</div>
          </button>
        </div>

        {/* Result Card with Live Cat Image */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center rounded-xl bg-slate-950 border border-slate-800 p-6">
          <div className="md:col-span-5 flex justify-center">
            <div className="relative group overflow-hidden rounded-xl border border-slate-800 bg-slate-900 max-w-xs w-full shadow-lg">
              <img
                src={outcome.cat}
                alt={`HTTP Cat ${outcome.code}`}
                className="w-full h-56 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 left-2 bg-slate-950/90 backdrop-blur-md px-2.5 py-1 rounded text-xs font-mono font-bold text-white border border-slate-800">
                HTTP {outcome.code}
              </div>
            </div>
          </div>

          <div className="md:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className={`text-2xl font-mono font-black ${
                outcome.code === 200 ? 'text-emerald-400' :
                outcome.code === 404 ? 'text-rose-400' :
                outcome.code === 401 ? 'text-amber-400' : 'text-purple-400'
              }`}>
                {outcome.code} {outcome.statusText}
              </span>
            </div>

            <div className="text-lg font-bold text-white">
              {outcome.headline}
            </div>

            <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 text-sm text-slate-300 leading-relaxed">
              <span className="text-amber-400 font-semibold">What is happening: </span>
              {outcome.story}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenSimulatorWithCode(outcome.code)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-amber-400 text-slate-950 hover:bg-amber-300 transition-colors shadow-sm"
              >
                Inspect in Live Simulator
              </button>
              <button
                onClick={() => onSelectCode(outcome.code)}
                className="px-4 py-2 text-xs font-medium rounded-lg bg-slate-900 border border-slate-700 text-slate-200 hover:text-white hover:bg-slate-800 transition-colors"
              >
                View Full Breakdown
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* HTTP Methods Explained in Plain English */}
      <section className="space-y-3">
        <div>
          <h2 className="text-base font-semibold text-slate-100">The 5 Main API Verbs (HTTP Methods)</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            HTTP methods describe what action you want the server to perform with a resource.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-400">GET</span>
              <span className="text-xs text-slate-500">Read</span>
            </div>
            <div className="text-sm font-semibold text-white">Fetch / Read Data</div>
            <div className="text-xs text-slate-400">
              Never modifies data. Safe to call 100 times. e.g. Loading your news feed or reading a tweet.
            </div>
            <div className="text-[11px] font-mono text-slate-500 pt-1">GET /api/cat/12</div>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-sky-400">POST</span>
              <span className="text-xs text-slate-500">Create</span>
            </div>
            <div className="text-sm font-semibold text-white">Create New Record</div>
            <div className="text-xs text-slate-400">
              Sends data in request body. Usually responds with status <strong className="text-emerald-400">201 Created</strong>.
            </div>
            <div className="text-[11px] font-mono text-slate-500 pt-1">POST /api/cat/new</div>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400">PUT</span>
              <span className="text-xs text-slate-500">Replace</span>
            </div>
            <div className="text-sm font-semibold text-white">Full Replacement</div>
            <div className="text-xs text-slate-400">
              Replaces the entire record with the new payload you sent. Overwrites all fields.
            </div>
            <div className="text-[11px] font-mono text-slate-500 pt-1">PUT /api/cat/12</div>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-indigo-400">PATCH</span>
              <span className="text-xs text-slate-500">Update</span>
            </div>
            <div className="text-sm font-semibold text-white">Partial Update</div>
            <div className="text-xs text-slate-400">
              Changes only 1 or 2 fields (e.g. changing just your profile status without replacing your email).
            </div>
            <div className="text-[11px] font-mono text-slate-500 pt-1">PATCH /api/cat/12</div>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-rose-400">DELETE</span>
              <span className="text-xs text-slate-500">Destroy</span>
            </div>
            <div className="text-sm font-semibold text-white">Remove Resource</div>
            <div className="text-xs text-slate-400">
              Erases the target item from the database. Often returns <strong className="text-emerald-400">204 No Content</strong>.
            </div>
            <div className="text-[11px] font-mono text-slate-500 pt-1">DELETE /api/cat/12</div>
          </div>
        </div>
      </section>
    </div>
  );
};
