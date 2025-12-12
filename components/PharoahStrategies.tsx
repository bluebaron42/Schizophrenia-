import React, { useState } from 'react';

interface PharoahStrategiesProps {
  isPresentation: boolean;
}

const PharoahStrategies: React.FC<PharoahStrategiesProps> = ({ isPresentation }) => {
  const [activeStrat, setActiveStrat] = useState<number | null>(null);
  
  const strategies = [
    { title: "Therapeutic Alliance", desc: "Forming a positive, trusting relationship with all family members, not just the patient." },
    { title: "Reducing Stress", desc: "Reducing the 'burden of care' for family members (carers) to lower the overall household tension." },
    { title: "Problem Solving", desc: "Improving the family's ability to anticipate and solve problems effectively without conflict." },
    { title: "Reducing Anger/Guilt", desc: "Helping family members understand the illness is not their fault (guilt) and not the patient's fault (anger)." },
    { title: "Balance", desc: "Helping carers achieve a balance between caring for the individual and maintaining their own lives." },
    { title: "Improving Beliefs", desc: "Challenging negative beliefs about schizophrenia and improving behaviour towards the patient." }
  ];

  return (
    <div className={`h-full flex flex-col ${isPresentation ? 'gap-8' : 'gap-6'}`}>
      <div className={`grid grid-cols-2 md:grid-cols-3 ${isPresentation ? 'gap-8' : 'gap-4'}`}>
        {strategies.map((strat, idx) => (
          <button 
            key={idx}
            onClick={() => setActiveStrat(idx)}
            className={`rounded-lg border text-left transition-all hover:bg-gray-800 ${
              activeStrat === idx ? 'bg-purple-900/40 border-purple-500 ring-1 ring-purple-400' : 'bg-gray-900 border-gray-700'
            } ${isPresentation ? 'p-6' : 'p-4'}`}
          >
            <div className={`font-bold text-white mb-2 ${isPresentation ? 'text-2xl' : 'text-sm'}`}>{idx+1}. {strat.title}</div>
            {activeStrat === idx && (
              <p className={`text-gray-300 animate-fadeIn ${isPresentation ? 'text-xl' : 'text-xs'}`}>{strat.desc}</p>
            )}
          </button>
        ))}
      </div>
      <div className={`grid grid-cols-1 md:grid-cols-2 ${isPresentation ? 'gap-8' : 'gap-6'}`}>
        <div className={`bg-red-900/10 rounded-xl border-l-4 border-red-500 ${isPresentation ? 'p-8' : 'p-6'}`}>
            <strong className={`text-red-300 block mb-2 uppercase tracking-widest ${isPresentation ? 'text-2xl' : 'text-xs'}`}>AO3: Evidence (Pharoah et al., 2010)</strong>
            <p className={`text-gray-300 leading-relaxed ${isPresentation ? 'text-xl' : 'text-sm'}`}>
            Review concluded there is moderate evidence to show that family therapy significantly reduces <strong>hospital readmission</strong> over the course of a year and improves quality of life for patients and families. It also increases medication compliance.
            </p>
        </div>
        <div className={`bg-orange-900/10 rounded-xl border-l-4 border-orange-500 ${isPresentation ? 'p-8' : 'p-6'}`}>
            <strong className={`text-orange-300 block mb-2 uppercase tracking-widest ${isPresentation ? 'text-2xl' : 'text-xs'}`}>AO3: Methodological Evaluation</strong>
            <p className={`text-gray-300 leading-relaxed ${isPresentation ? 'text-xl' : 'text-sm'}`}>
            Many studies in the Pharoah review were from China, where blinding is not used (researcher knows who is getting therapy). This may introduce <strong>observer bias</strong>, overstating the effectiveness of the therapy.
            </p>
        </div>
      </div>
    </div>
  );
};

export default PharoahStrategies;