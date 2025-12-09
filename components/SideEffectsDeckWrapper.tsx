import React from 'react';
import { AlertTriangle, Activity, ShieldAlert, Pill } from 'lucide-react';
import CardDeck from './CardDeck';
import { CardData } from '../types';

interface SideEffectsDeckWrapperProps {
  isPresentation: boolean;
}

const SideEffectsDeckWrapper: React.FC<SideEffectsDeckWrapperProps> = ({ isPresentation }) => {
  const textSize = isPresentation ? 'text-2xl' : 'text-sm';
  const listSize = isPresentation ? 'text-2xl' : 'text-sm';
  const titleSize = isPresentation ? 'text-3xl' : 'text-base';
  
  const cards: CardData[] = [
    { 
      title: "Acute Side Effects", icon: AlertTriangle, color: "text-orange-400", borderColor: "border-orange-500", bgColor: "bg-orange-900/10", content: (
        <div className="space-y-4">
          <p className={`text-gray-300 ${textSize}`}>Typical antipsychotics (Chlorpromazine) are associated with a range of immediate side effects.</p>
          <div className="bg-black/30 p-4 rounded-lg border-l-4 border-orange-500"><ul className={`list-disc pl-4 text-gray-400 space-y-2 ${listSize}`}><li>Dizziness</li><li>Agitation</li><li>Sleepiness (Sedation)</li><li>Stiff jaw</li><li>Weight gain</li></ul></div>
          <p className={`text-gray-300 font-bold bg-gray-800 p-3 rounded ${textSize}`}>Impact: High rates of non-compliance (patients stop taking them).</p>
        </div>
      ) 
    },
    { 
      title: "Tardive Dyskinesia", icon: Activity, color: "text-red-400", borderColor: "border-red-500", bgColor: "bg-red-900/10", content: (
        <div className="space-y-4">
          <p className={`text-gray-300 ${textSize}`}>A long-term side effect caused by dopamine supersensitivity in the brain.</p>
          <div className="bg-black/30 p-4 rounded-lg border-l-4 border-red-500"><strong className={`text-red-300 block mb-2 ${titleSize}`}>Symptoms</strong><p className={`text-gray-400 ${textSize}`}>Involuntary facial movements such as grimacing, blinking, and lip-smacking.</p><p className={`text-gray-500 mt-2 italic ${isPresentation ? 'text-xl' : 'text-xs'}`}>Affects approx 30% of those taking Typicals.</p></div>
          <p className={`text-gray-300 font-bold bg-gray-800 p-3 rounded ${textSize}`}>Impact: Can be permanent even after stopping the drug.</p>
        </div>
      ) 
    },
    { 
      title: "NMS", icon: ShieldAlert, color: "text-purple-400", borderColor: "border-purple-500", bgColor: "bg-purple-900/10", content: (
        <div className="space-y-4">
          <p className={`text-gray-300 ${textSize}`}><strong>Neuroleptic Malignant Syndrome</strong>. A rare but fatal condition.</p>
          <div className="bg-black/30 p-4 rounded-lg border-l-4 border-purple-500"><strong className={`text-purple-300 block mb-2 ${titleSize}`}>Mechanism</strong><p className={`text-gray-400 ${textSize}`}>Caused by the drug blocking dopamine action in the <strong>hypothalamus</strong> (which regulates body temperature).</p><strong className={`text-purple-300 block mt-2 mb-1 ${titleSize}`}>Symptoms</strong><p className={`text-gray-400 ${textSize}`}>High fever, delirium, coma.</p></div>
          <p className={`text-gray-300 font-bold bg-gray-800 p-3 rounded ${textSize}`}>Impact: Requires immediate discontinuation of the drug.</p>
        </div>
      ) 
    },
    { 
      title: "The Chemical Cosh", icon: Pill, color: "text-blue-400", borderColor: "border-blue-500", bgColor: "bg-blue-900/10", content: (
        <div className="space-y-4">
          <p className={`text-gray-300 ${textSize}`}>An ethical argument regarding the use of sedating drugs in hospitals.</p>
          <div className="bg-black/30 p-4 rounded-lg border-l-4 border-blue-500"><strong className={`text-blue-300 block mb-2 ${titleSize}`}>Moncrieff (2013)</strong><p className={`text-gray-400 ${textSize}`}>Argues that antipsychotics are widely used to calm patients to make them easier for hospital staff to manage, rather than for the patient's own therapeutic benefit.</p></div>
          <p className={`text-gray-300 font-bold bg-gray-800 p-3 rounded ${textSize}`}>Impact: Viewing drug therapy as a potential human rights abuse.</p>
        </div>
      ) 
    }
  ];
  return <CardDeck cards={cards} isPresentation={isPresentation} />;
};

export default SideEffectsDeckWrapper;