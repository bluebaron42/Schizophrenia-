import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface EssayPlanRevealL7Props {
  isPresentation: boolean;
}

const EssayPlanRevealL7: React.FC<EssayPlanRevealL7Props> = ({ isPresentation }) => {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className={`bg-gray-800/50 rounded-xl border border-gray-700 shadow-xl flex flex-col justify-center h-full ${isPresentation ? 'p-12' : 'p-8'}`}>
      <h3 className={`text-gray-400 font-bold uppercase tracking-widest mb-6 text-center ${isPresentation ? 'text-3xl' : 'text-base'}`}>Structure Planning</h3>
      {!revealed ? (
        <div className="flex flex-col items-center justify-center flex-grow space-y-4">
          <p className={`text-gray-400 text-center ${isPresentation ? 'text-2xl' : 'text-sm'}`}>Review the question on the left, then click to reveal the suggested structure.</p>
          <button onClick={() => setRevealed(true)} className={`group flex items-center gap-3 bg-purple-600 hover:bg-purple-500 text-white rounded-full font-bold transition-all shadow-lg hover:shadow-purple-500/25 ${isPresentation ? 'px-14 py-8 text-3xl' : 'px-8 py-4'}`}><Eye size={isPresentation ? 40 : 20} /> Reveal Paragraph Plan</button>
        </div>
      ) : (
        <div className="space-y-4 animate-fadeIn overflow-y-auto custom-scrollbar pr-2">
          <div className="flex justify-end"><button onClick={() => setRevealed(false)} className={`text-gray-500 hover:text-white flex items-center gap-1 uppercase font-bold ${isPresentation ? 'text-xl' : 'text-xs'}`}><EyeOff size={isPresentation ? 24 : 14}/> Hide</button></div>
          
          <div className={`flex gap-4 items-start bg-gray-900/80 rounded border border-gray-700 ${isPresentation ? 'p-6' : 'p-4'}`}>
              <div className={`rounded-full bg-blue-900 flex items-center justify-center font-bold text-blue-300 shrink-0 border border-blue-500 ${isPresentation ? 'w-16 h-16 text-2xl' : 'w-8 h-8 text-xs'}`}>P1</div>
              <div><strong className={`text-blue-300 block mb-1 ${isPresentation ? 'text-2xl' : 'text-sm'}`}>AO1: The Model</strong><p className={`text-gray-400 leading-relaxed ${isPresentation ? 'text-xl' : 'text-xs'}`}>Define Diathesis (Vulnerability) + Stress (Trigger). Mention Meehl's original model (Schizogene) vs Modern understanding (Polygenic + Trauma/Cannabis).</p></div>
          </div>

          <div className={`flex gap-4 items-start bg-green-900/20 rounded border border-green-500/50 ${isPresentation ? 'p-6' : 'p-4'}`}>
              <div className={`rounded-full bg-green-900 flex items-center justify-center font-bold text-green-300 shrink-0 border border-green-500 ${isPresentation ? 'w-16 h-16 text-2xl' : 'w-8 h-8 text-xs'}`}>P2</div>
              <div><strong className={`text-green-300 block mb-1 ${isPresentation ? 'text-2xl' : 'text-sm'}`}>AO2: Application to Jack</strong><ul className={`list-disc pl-4 text-gray-400 leading-relaxed ${isPresentation ? 'text-xl' : 'text-xs'}`}><li><strong>Diathesis:</strong> Family history suggests genetic vulnerability.</li><li><strong>Stress:</strong> Uni pressure + Cannabis acts as the trigger.</li><li><strong>Result:</strong> Interaction causes onset.</li></ul></div>
          </div>

          <div className={`flex gap-4 items-start bg-gray-900/80 rounded border border-gray-700 ${isPresentation ? 'p-6' : 'p-4'}`}>
              <div className={`rounded-full bg-red-900 flex items-center justify-center font-bold text-red-300 shrink-0 border border-red-500 ${isPresentation ? 'w-16 h-16 text-2xl' : 'w-8 h-8 text-xs'}`}>P3</div>
              <div><strong className={`text-red-300 block mb-1 ${isPresentation ? 'text-2xl' : 'text-sm'}`}>AO3: Evidence</strong><p className={`text-gray-400 leading-relaxed ${isPresentation ? 'text-xl' : 'text-xs'}`}><strong>Tienari et al. (2004):</strong> Adoption study. Found high genetic risk + low empathy parenting = Schizophrenia. Low genetic risk + low empathy = No illness. Proof of interaction.</p></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EssayPlanRevealL7;