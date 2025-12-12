import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface ProtocolDesignChallengeProps {
  isPresentation: boolean;
}

const ProtocolDesignChallenge: React.FC<ProtocolDesignChallengeProps> = ({ isPresentation }) => {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className={`bg-gray-800/50 rounded-xl border border-gray-700 shadow-xl flex flex-col justify-center h-full ${isPresentation ? 'p-12' : 'p-8'}`}>
      <h3 className={`text-gray-400 font-bold uppercase tracking-widest mb-6 text-center ${isPresentation ? 'text-3xl' : 'text-base'}`}>The "Protocol Design" Challenge</h3>
      
      {!revealed ? (
        <div className="flex flex-col items-center justify-center flex-grow space-y-6">
          <p className={`text-gray-300 text-center max-w-2xl ${isPresentation ? 'text-2xl' : 'text-sm'}`}>
            <strong>Scenario:</strong> Alfie has severe Avolition. He refuses to dress himself.<br/><br/>
            <strong>Task:</strong> Design a behavior modification programme for Alfie (approx 300 words).<br/>
            1. Define Target Behaviour.<br/>
            2. Identify Tokens (Secondary) & Rewards (Primary).<br/>
            3. Justify using Operant Conditioning terms.<br/>
            4. Defend against ethical criticism.
          </p>
          <button onClick={() => setRevealed(true)} className={`group flex items-center gap-3 bg-purple-600 hover:bg-purple-500 text-white rounded-full font-bold transition-all shadow-lg hover:shadow-purple-500/25 ${isPresentation ? 'px-14 py-8 text-3xl' : 'px-8 py-4'}`}><Eye size={isPresentation ? 40 : 20} /> Reveal Model Protocol</button>
        </div>
      ) : (
        <div className="space-y-6 animate-fadeIn overflow-y-auto custom-scrollbar pr-2">
            <div className="flex justify-end"><button onClick={() => setRevealed(false)} className={`text-gray-500 hover:text-white flex items-center gap-1 uppercase font-bold ${isPresentation ? 'text-xl' : 'text-xs'}`}><EyeOff size={isPresentation ? 24 : 14}/> Hide</button></div>
            
            <div className={`bg-blue-900/20 rounded border-l-4 border-blue-500 ${isPresentation ? 'p-8' : 'p-6'}`}>
                <strong className={`text-blue-300 block mb-2 ${isPresentation ? 'text-2xl' : 'text-sm'}`}>1. Protocol Design (AO1/AO2)</strong>
                <ul className={`list-disc pl-4 text-gray-300 space-y-2 ${isPresentation ? 'text-xl' : 'text-xs'}`}>
                    <li><strong>Target:</strong> Dressing himself every morning before 9am.</li>
                    <li><strong>Token:</strong> A coloured plastic disc given <em>immediately</em> (Temporal Contiguity).</li>
                    <li><strong>Reward:</strong> Exchange 5 discs for a walk in the garden (Primary Reinforcer).</li>
                </ul>
            </div>

            <div className={`bg-purple-900/20 rounded border-l-4 border-purple-500 ${isPresentation ? 'p-8' : 'p-6'}`}>
                <strong className={`text-purple-300 block mb-2 ${isPresentation ? 'text-2xl' : 'text-sm'}`}>2. Theoretical Justification (AO1)</strong>
                <p className={`text-gray-300 leading-relaxed ${isPresentation ? 'text-xl' : 'text-xs'}`}>
                    The token is a <strong>Secondary Reinforcer</strong>. It has no value alone but acquires value through association with the walk (Primary Reinforcer). This is <strong>Operant Conditioning</strong> (Positive Reinforcement).
                </p>
            </div>

            <div className={`bg-red-900/20 rounded border-l-4 border-red-500 ${isPresentation ? 'p-8' : 'p-6'}`}>
                <strong className={`text-red-300 block mb-2 ${isPresentation ? 'text-2xl' : 'text-sm'}`}>3. Ethical Defense (AO3)</strong>
                <p className={`text-gray-300 leading-relaxed ${isPresentation ? 'text-xl' : 'text-xs'}`}>
                    Critics argue this violates rights (withholding freedom). However, <strong>Glowacki et al. (2016)</strong> showed this significantly reduces negative symptoms, potentially allowing Alfie to be discharged. The long-term benefit outweighs the restriction.
                </p>
            </div>
        </div>
      )}
    </div>
  );
};

export default ProtocolDesignChallenge;