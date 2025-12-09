import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { Question } from '../types';

interface DoNowQuizProps {
    questions: Question[];
    isPresentation: boolean;
}

const DoNowQuiz: React.FC<DoNowQuizProps> = ({ questions, isPresentation }) => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const handleSelect = (qId: number, optionIdx: number) => setAnswers(prev => ({...prev, [qId]: optionIdx}));
  const score = Object.keys(answers).reduce((acc, qId) => acc + (answers[parseInt(qId)] === questions[parseInt(qId)-1].correct ? 1 : 0), 0);

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 h-full content-start transition-all ${isPresentation ? 'gap-12' : 'gap-6'}`}>
      <div className="space-y-4">
        <div className={`bg-purple-900/20 rounded-xl border border-purple-500/30 ${isPresentation ? 'p-10' : 'p-5'}`}>
          <h3 className={`font-bold text-white mb-2 ${isPresentation ? 'text-4xl' : 'text-lg'}`}>Task: Activation & Retrieval</h3>
          <p className={`text-gray-300 ${isPresentation ? 'text-2xl' : 'text-sm'}`}>Answer the following questions based on your prior knowledge to activate relevant schemas for this lesson.</p>
        </div>
        <div className={`flex flex-col ${isPresentation ? 'gap-6' : 'gap-3'}`}>
           {!showResults ? (
             <>
              <button onClick={() => setShowResults(true)} disabled={Object.keys(answers).length < 5} className={`bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white rounded-lg font-bold w-full transition-all shadow-lg ${isPresentation ? 'px-12 py-8 text-3xl' : 'px-8 py-3'}`}>
                Submit Answers
              </button>
              <button onClick={() => setShowResults(true)} className={`bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-600 rounded-lg font-semibold w-full transition-all ${isPresentation ? 'px-12 py-6 text-2xl' : 'px-8 py-2 text-sm'}`}>
                Reveal All Answers
              </button>
             </>
           ) : (
            <div className={`bg-green-900/20 border border-green-500/50 rounded-lg w-full text-center animate-fadeIn ${isPresentation ? 'p-10' : 'p-4'}`}>
              <span className={`font-bold text-green-400 block mb-1 ${isPresentation ? 'text-6xl mb-4' : 'text-2xl'}`}>Score: {score} / 5</span>
              <span className={`text-gray-400 ${isPresentation ? 'text-2xl' : 'text-xs'}`}>Check corrections on the right.</span>
            </div>
           )}
        </div>
      </div>
      <div className="space-y-2 overflow-y-auto pr-2 custom-scrollbar">
        {questions.map((q) => (
          <div key={q.id} className={`bg-gray-800 rounded-lg border border-gray-700 ${isPresentation ? 'p-6 mb-4' : 'p-3'}`}>
            <h4 className={`font-semibold text-gray-200 mb-1.5 ${isPresentation ? 'text-2xl mb-4' : 'text-xs'}`}>{q.id}. {q.question}</h4>
            
            {isPresentation ? (
              <div className="min-h-[40px]">
                {showResults && (
                   <div className="text-green-400 font-bold text-3xl animate-fadeIn mt-2 flex items-center gap-2">
                     <CheckCircle size={32}/> {q.options[q.correct]}
                   </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-1.5">
                {q.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => !showResults && handleSelect(q.id, idx)}
                    className={`rounded text-left transition-all px-3 py-1.5 text-xs ${
                      showResults 
                        ? idx === q.correct ? "bg-green-900/40 border border-green-500 text-green-100" : answers[q.id] === idx ? "bg-red-900/40 border border-red-500 text-red-100" : "bg-gray-900/50 text-gray-600 opacity-50"
                        : answers[q.id] === idx ? "bg-purple-600 text-white" : "bg-gray-900 hover:bg-gray-700 text-gray-400"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoNowQuiz;