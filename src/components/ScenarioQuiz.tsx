import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, RotateCcw, ArrowRight, HelpCircle, Sparkles } from 'lucide-react';
import { QUIZ_QUESTIONS, HTTP_CODES } from '../data/httpCodes';

export const ScenarioQuiz: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [highestStreak, setHighestStreak] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const currentQ = QUIZ_QUESTIONS[currentIndex];

  const handleSelect = (code: number) => {
    if (selectedOption !== null) return; // Already picked for this question

    setSelectedOption(code);
    if (code === currentQ.correctCode) {
      setScore((s) => s + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > highestStreak) {
        setHighestStreak(newStreak);
      }
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowHint(false);
    if (currentIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIndex((i) => i + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setStreak(0);
    setShowHint(false);
    setIsCompleted(false);
  };

  const correctCatObj = HTTP_CODES.find((c) => c.code === currentQ.correctCode);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header - Normal and Minimal */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-lg sm:text-xl font-semibold text-slate-100">
            Which Cat Code Will Respond?
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Read the real-world situation and guess the correct HTTP status code.
          </p>
        </div>

        {/* Score & Streak Counter (Clean unboxed text) */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="text-slate-300">
            Score: <span className="text-amber-400 font-bold tabular-nums">{score}</span> / {QUIZ_QUESTIONS.length}
          </div>
          <span className="text-slate-700">·</span>
          <div className="text-slate-300">
            Streak: <span className="text-emerald-400 font-bold tabular-nums">{streak}🔥</span>
          </div>
        </div>
      </div>

      {!isCompleted ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 md:p-8 space-y-6">
          {/* Progress bar */}
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-amber-400 h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Question {currentIndex + 1} of {QUIZ_QUESTIONS.length}</span>
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{showHint ? 'Hide Hint' : 'Need a hint?'}</span>
            </button>
          </div>

          {showHint && (
            <div className="p-3 rounded-lg bg-amber-400/10 border border-amber-400/20 text-xs text-amber-200">
              💡 {currentQ.hint}
            </div>
          )}

          {/* Scenario Text */}
          <div className="space-y-2">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400">Real-World Scenario:</span>
            <div className="text-lg md:text-xl font-medium text-white leading-relaxed bg-slate-950 p-5 rounded-xl border border-slate-800">
              "{currentQ.scenario}"
            </div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {currentQ.options.map((code) => {
              const codeObj = HTTP_CODES.find((c) => c.code === code);
              const isSelected = selectedOption === code;
              const isCorrect = code === currentQ.correctCode;
              const hasAnswered = selectedOption !== null;

              let btnStyle = 'bg-slate-950 border-slate-800 hover:border-slate-700 text-white';
              if (hasAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500/50';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-200 ring-1 ring-rose-500/50';
                } else {
                  btnStyle = 'opacity-40 bg-slate-950 border-slate-800 text-slate-500';
                }
              }

              return (
                <button
                  key={code}
                  onClick={() => handleSelect(code)}
                  disabled={hasAnswered}
                  className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between ${btnStyle}`}
                >
                  <div className="space-y-0.5">
                    <span className="font-mono font-bold text-base">{code}</span>
                    <span className="text-xs text-slate-400 block">{codeObj?.title || 'Unknown'}</span>
                  </div>

                  {hasAnswered && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  )}
                  {hasAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-400" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner with HTTP Cat when answered */}
          {selectedOption !== null && (
            <div className="mt-6 pt-6 border-t border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-4 flex justify-center">
                <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950 shadow-md w-full max-w-[200px]">
                  <img
                    src={`https://http.cat/${currentQ.correctCode}`}
                    alt={`Cat for ${currentQ.correctCode}`}
                    className="w-full h-36 object-cover"
                  />
                  <div className="p-2 text-center text-xs font-mono font-bold bg-slate-900 text-white">
                    HTTP {currentQ.correctCode} {correctCatObj?.title}
                  </div>
                </div>
              </div>

              <div className="md:col-span-8 space-y-3">
                <div className="flex items-center gap-2">
                  {selectedOption === currentQ.correctCode ? (
                    <span className="text-emerald-400 font-bold text-sm flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Correct Answer!
                    </span>
                  ) : (
                    <span className="text-rose-400 font-bold text-sm flex items-center gap-1.5">
                      <XCircle className="w-4 h-4" /> Not quite! The correct code is {currentQ.correctCode}.
                    </span>
                  )}
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {currentQ.explanation}
                </p>

                <div className="pt-2">
                  <button
                    onClick={handleNext}
                    className="px-5 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 transition-colors shadow-sm"
                  >
                    <span>{currentIndex + 1 === QUIZ_QUESTIONS.length ? 'See Final Score' : 'Next Scenario'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Complete Screen */
        <div className="text-center rounded-2xl border border-slate-800 bg-slate-900/60 p-12 space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
            <Sparkles className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-white">Quiz Completed!</h2>
            <p className="text-slate-400 text-sm">
              You scored <strong className="text-amber-400 font-mono text-base">{score}</strong> out of {QUIZ_QUESTIONS.length}
              {highestStreak > 1 && ` with a max streak of ${highestStreak}🔥`}!
            </p>
          </div>

          <div className="max-w-md mx-auto p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
            {score === QUIZ_QUESTIONS.length
              ? "🏆 Cat Master status achieved! You know exactly how HTTP status codes speak."
              : score >= QUIZ_QUESTIONS.length / 2
              ? "🎉 Great job! You have a solid grasp of API client and server interactions."
              : "🐱 Keep learning! Review the API Basics guide and try again."}
          </div>

          <button
            onClick={restartQuiz}
            className="px-6 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs inline-flex items-center gap-2 transition-colors shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Scenario Quiz</span>
          </button>
        </div>
      )}
    </div>
  );
};
