import React, { useState } from 'react';
import { HelpCircle, ArrowDown, Brain, Trees } from 'lucide-react';

interface CausationDebateProps {
  isPresentation: boolean;
}

const CausationDebate: React.FC<CausationDebateProps> = ({ isPresentation }) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
        {/* Provocative Question */}
        <div className="text-center mb-8 max-w-5xl">
            <h3 className={`font-bold text-white mb-6 ${isPresentation ? 'text-6xl' : 'text-3xl'}`}>
                The "48% Problem"
            </h3>
            <p className={`text-gray-300 leading-relaxed ${isPresentation ? 'text-4xl' : 'text-xl'}`}>
                Identical (MZ) twins share <span className="text-purple-400 font-bold">100%</span> of their DNA. 
                <br/><br/>
                If Schizophrenia were purely biological (Nature), if one twin had it, the other would 100% have it.
                <br/>
                However, research (Gottesman) shows the risk is only <span className="text-purple-400 font-bold">48%</span>.
            </p>
        </div>

        {/* The Inquiry */}
        <div className={`bg-gray-800 rounded-xl border-l-8 border-yellow-500 mb-10 w-full max-w-5xl shadow-2xl ${isPresentation ? 'p-12' : 'p-6'}`}>
            <div className="flex items-start gap-6">
                <HelpCircle className="text-yellow-500 shrink-0 mt-1" size={isPresentation ? 64 : 32} />
                <div>
                    <strong className={`block text-yellow-500 uppercase tracking-widest mb-3 ${isPresentation ? 'text-2xl' : 'text-sm'}`}>Discussion Point</strong>
                    <p className={`text-gray-100 font-serif italic ${isPresentation ? 'text-4xl leading-snug' : 'text-lg'}`}>
                        "What does the 'missing 52%' tell us about the cause of the disorder?"
                    </p>
                </div>
            </div>
        </div>

        {/* Reveal Interaction */}
        {!revealed ? (
            <button 
                onClick={() => setRevealed(true)}
                className={`group flex items-center gap-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-full font-bold transition-all shadow-[0_0_30px_rgba(147,51,234,0.3)] hover:shadow-[0_0_50px_rgba(147,51,234,0.5)] animate-pulse ${isPresentation ? 'px-16 py-8 text-4xl' : 'px-8 py-4 text-lg'}`}
            >
                Reveal The Answer <ArrowDown size={isPresentation ? 40 : 20} className="group-hover:translate-y-2 transition-transform"/>
            </button>
        ) : (
            <div className={`bg-gradient-to-br from-gray-900 to-black rounded-xl border-2 border-purple-500/50 w-full max-w-5xl text-center animate-fadeIn relative overflow-hidden ${isPresentation ? 'p-12' : 'p-8'}`}>
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Brain size={200} className="text-purple-500" />
                </div>
                <div className="absolute bottom-0 left-0 p-4 opacity-10">
                    <Trees size={200} className="text-green-500" />
                </div>

                <div className="relative z-10">
                    <h4 className={`text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 font-black uppercase tracking-widest mb-8 ${isPresentation ? 'text-5xl' : 'text-xl'}`}>
                        The Interactionist Conclusion
                    </h4>
                    <p className={`text-gray-200 font-medium leading-relaxed mb-8 ${isPresentation ? 'text-4xl' : 'text-lg'}`}>
                        Biology is not destiny. The missing 52% implies <span className="text-green-400 font-bold border-b-4 border-green-500">Environmental Factors</span> must be involved.
                    </p>
                    <div className={`bg-gray-800/80 rounded-xl inline-block border border-gray-600 shadow-xl ${isPresentation ? 'p-10' : 'p-6'}`}>
                        <p className={`text-white italic font-serif leading-relaxed ${isPresentation ? 'text-4xl' : 'text-xl'}`}>
                            "Genetics loads the gun <span className="text-purple-400">(Diathesis)</span>,<br/>but the Environment pulls the trigger <span className="text-red-400">(Stress)</span>."
                        </p>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default CausationDebate;