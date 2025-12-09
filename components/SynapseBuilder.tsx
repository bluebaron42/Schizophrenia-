import React, { useState } from 'react';
import { Activity } from 'lucide-react';

interface SynapseBuilderProps {
  isPresentation: boolean;
}

const SynapseBuilder: React.FC<SynapseBuilderProps> = ({ isPresentation }) => {
  const [dopamineLevel, setDopamineLevel] = useState(50); 
  const [region, setRegion] = useState("subcortex"); 
  const getStatus = () => { if (dopamineLevel > 75) return "HIGH"; if (dopamineLevel < 25) return "LOW"; return "NORMAL"; };
  const status = getStatus();

  return (
    <div className={`h-full flex flex-col ${isPresentation ? 'gap-8' : 'gap-6'}`}>
      <div className={`grid grid-cols-1 lg:grid-cols-3 ${isPresentation ? 'gap-8' : 'gap-6'}`}>
        <div className={`lg:col-span-1 bg-gray-800 rounded-xl border border-gray-700 shadow-xl ${isPresentation ? 'p-8' : 'p-6'}`}>
          <h3 className={`font-bold text-white mb-4 flex items-center gap-2 ${isPresentation ? 'text-2xl' : 'text-lg'}`}><Activity size={isPresentation ? 28 : 20} className="text-purple-400"/> Synapse Controls</h3>
          <div className="mb-6"><label className={`text-gray-400 uppercase font-bold mb-2 block ${isPresentation ? 'text-sm' : 'text-xs'}`}>Brain Region</label><div className="flex bg-gray-900 rounded-lg p-1"><button onClick={() => setRegion("subcortex")} className={`flex-1 rounded font-bold transition-all ${isPresentation ? 'py-3 text-base' : 'py-2 text-sm'} ${region === "subcortex" ? 'bg-purple-600 text-white' : 'text-gray-500 hover:text-gray-300'}`}>Subcortex</button><button onClick={() => setRegion("cortex")} className={`flex-1 rounded font-bold transition-all ${isPresentation ? 'py-3 text-base' : 'py-2 text-sm'} ${region === "cortex" ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-gray-300'}`}>Prefrontal Cortex</button></div></div>
          <div className="mb-4"><label className={`text-gray-400 uppercase font-bold mb-4 block flex justify-between ${isPresentation ? 'text-sm' : 'text-xs'}`}><span>Dopamine Level</span><span className="text-purple-400">{dopamineLevel}%</span></label><input type="range" min="0" max="100" value={dopamineLevel} onChange={(e) => setDopamineLevel(parseInt(e.target.value))} className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500" /><div className={`flex justify-between text-gray-500 mt-2 ${isPresentation ? 'text-sm' : 'text-xs'}`}><span>Hypo</span><span>Normal</span><span>Hyper</span></div></div>
        </div>
        <div className="lg:col-span-2 bg-black/50 rounded-xl border border-gray-700 relative overflow-hidden flex flex-col h-full">
           <div className="relative w-full h-64 border-b border-gray-700/50 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black flex items-center justify-center">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-16 bg-gray-800 rounded-b-xl border-b border-x border-gray-600 flex items-center justify-center z-10"><span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Presynaptic</span></div>
              
              <div className="relative w-full h-full flex items-center justify-center gap-1">
                {Array.from({ length: Math.floor(dopamineLevel / 3) }).map((_, i) => (
                  <div key={i} className={`w-1.5 h-1.5 rounded-full animate-pulse transition-all duration-1000 ${
                    region === 'subcortex' 
                      ? 'bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]' 
                      : 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]'
                  }`} style={{
                    animationDelay: `${Math.random() * 2}s`,
                    transform: `translateY(${Math.random() * 40 - 20}px)`
                  }}></div>
                ))}
              </div>

              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-16 bg-gray-800 rounded-t-xl border-t border-x border-gray-600 flex items-center justify-center z-10"><span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Postsynaptic</span></div>
           </div>

           {/* DYNAMIC BIO-FEEDBACK PANEL */}
           <div className={`flex-grow bg-gray-900/80 backdrop-blur-sm overflow-y-auto ${isPresentation ? 'p-8' : 'p-6'}`}>
             <div className="flex items-center gap-3 mb-3">
               <h4 className={`text-gray-300 font-bold uppercase tracking-widest ${isPresentation ? 'text-sm' : 'text-xs'}`}>Biological Mechanism Analysis</h4>
               <span className={`px-2 py-0.5 rounded font-bold ${isPresentation ? 'text-xs' : 'text-[10px]'} ${status === 'HIGH' ? 'bg-red-900 text-red-300' : status === 'LOW' ? 'bg-blue-900 text-blue-300' : 'bg-green-900 text-green-300'}`}>
                 {status === 'HIGH' ? 'HYPERDOPAMINERGIA' : status === 'LOW' ? 'HYPODOPAMINERGIA' : 'HOMEOSTASIS'}
               </span>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* AO1 CONTENT */}
                <div className="space-y-2">
                  <h5 className={`text-blue-400 font-bold ${isPresentation ? 'text-lg' : 'text-sm'}`}>AO1: Description</h5>
                  {status === 'HIGH' && region === 'subcortex' && (
                    <p className={`text-gray-400 leading-relaxed animate-fadeIn ${isPresentation ? 'text-lg' : 'text-sm'}`}>
                      Excessive dopamine activity in the <strong className="text-gray-200">Mesolimbic Pathway</strong> (Subcortex) leads to an overstimulation of D2 receptors. This biological 'noise' is interpreted by the brain as <strong>Positive Symptoms</strong> such as auditory hallucinations (voices) and delusions.
                    </p>
                  )}
                  {status === 'LOW' && region === 'cortex' && (
                    <p className={`text-gray-400 leading-relaxed animate-fadeIn ${isPresentation ? 'text-lg' : 'text-sm'}`}>
                      According to <strong>Goldman-Rakic</strong>, low levels of dopamine in the <strong className="text-gray-200">Mesocortical Pathway</strong> (Prefrontal Cortex) result in a lack of cognitive functioning. This manifests as <strong>Negative Symptoms</strong> such as Avolition (lack of motivation) and Alogia (poverty of speech).
                    </p>
                  )}
                  {status === 'NORMAL' && (
                    <p className={`text-gray-500 leading-relaxed animate-fadeIn ${isPresentation ? 'text-lg' : 'text-sm'}`}>
                      Neurotransmitter levels are within optimal range. Synaptic transmission is regulated, allowing for typical cognitive processing and emotional regulation without psychotic symptoms.
                    </p>
                  )}
                  {(status === 'HIGH' && region === 'cortex') && <p className={`text-gray-500 animate-fadeIn ${isPresentation ? 'text-lg' : 'text-sm'}`}>High cortical dopamine is less commonly associated with primary symptoms but may improve cognitive function.</p>}
                  {(status === 'LOW' && region === 'subcortex') && <p className={`text-gray-500 animate-fadeIn ${isPresentation ? 'text-lg' : 'text-sm'}`}>Low subcortical dopamine might result in Parkinsonian-like side effects (tremors) rather than Schizophrenic symptoms.</p>}
                </div>

                {/* AO3 CONTENT */}
                <div className="space-y-2 border-l border-gray-700 pl-4">
                  <h5 className={`text-red-400 font-bold ${isPresentation ? 'text-lg' : 'text-sm'}`}>AO3: Evaluation</h5>
                   {status === 'HIGH' && region === 'subcortex' && (
                    <div className="animate-fadeIn">
                      <p className={`text-gray-400 leading-relaxed mb-2 ${isPresentation ? 'text-lg' : 'text-sm'}`}>
                        <strong className="text-red-300">Research Support:</strong> Tenn et al. (2003) induced schizophrenia-like symptoms in rats by giving them amphetamines (which increase dopamine), supporting the causal link.
                      </p>
                      <p className={`text-gray-500 italic ${isPresentation ? 'text-base' : 'text-xs'}`}>However, this assumes animal neurochemistry generalizes to complex human psychosis.</p>
                    </div>
                  )}
                  {status === 'LOW' && region === 'cortex' && (
                    <div className="animate-fadeIn">
                      <p className={`text-gray-400 leading-relaxed mb-2 ${isPresentation ? 'text-lg' : 'text-sm'}`}>
                        <strong className="text-red-300">Explanatory Power:</strong> The original dopamine hypothesis (Hyper) could not explain Negative symptoms. This revised (Hypo) theory offers a more complete explanation of the diverse symptom profile.
                      </p>
                    </div>
                  )}
                  {status === 'NORMAL' && (
                     <p className={`text-gray-500 italic animate-fadeIn ${isPresentation ? 'text-lg' : 'text-sm'}`}>
                       Adjust the sliders to simulate pathological states and reveal evaluative content.
                     </p>
                  )}
                   {(status === 'HIGH' && region === 'cortex') || (status === 'LOW' && region === 'subcortex') ? <p className={`text-gray-600 animate-fadeIn ${isPresentation ? 'text-base' : 'text-xs'}`}>No specific AO3 core studies for this specific state in this syllabus.</p> : null}
                </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SynapseBuilder;