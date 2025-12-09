import React, { useState, useEffect } from 'react';
import { EyeOff, Activity, Droplet, Pill, CheckCircle } from 'lucide-react';

interface DrugMoleculeSimProps {
  isPresentation: boolean;
}

const DrugMoleculeSim: React.FC<DrugMoleculeSimProps> = ({ isPresentation }) => {
  const [moleculeType, setMoleculeType] = useState('none'); 
  const [receptorStatus, setReceptorStatus] = useState('active'); 
  const [activeDrug, setActiveDrug] = useState('none');
  const [dopamineFlow, setDopamineFlow] = useState<{id: number, x: number, y: number}[]>([]);
  const [serotoninFlow, setSerotoninFlow] = useState<{id: number, x: number, y: number}[]>([]);
  const [statusText, setStatusText] = useState("No Treatment: Dopamine overload in synaptic cleft.");
  const [firingRate, setFiringRate] = useState(100);

  const drugData: Record<string, any> = {
    none: { name: "No Treatment", type: "N/A", color: "gray", desc: "High Dopamine activity. D2 receptors overstimulated. Positive Symptoms persist.", firing: 100 },
    chlorpromazine: { name: "Chlorpromazine", type: "Typical", color: "blue", desc: "D2 Antagonist. Blocks receptors tightly. Reduces Dopamine action. Side Effect: Sedation.", firing: 30, icon: EyeOff },
    haloperidol: { name: "Haloperidol", type: "Typical (High Potency)", color: "red", desc: "Potent D2 Antagonist. Very strong block. High risk of Tremors/EPS.", firing: 20, icon: Activity },
    clozapine: { name: "Clozapine", type: "Atypical", color: "green", desc: "Binds D2 (loosely) & Serotonin. Reduces +ve & -ve symptoms. Risk: Agranulocytosis.", firing: 40, icon: Droplet },
    risperidone: { name: "Risperidone", type: "Atypical", color: "teal", desc: "Binds D2 strongly & Serotonin. Effective in small doses. Fewer side effects.", firing: 35, icon: Pill }
  };

  const handleDrugSelect = (key: string) => { setActiveDrug(key); setStatusText(drugData[key].desc); setFiringRate(drugData[key].firing); setMoleculeType(key !== 'none' ? 'antagonist' : 'none'); setReceptorStatus(key !== 'none' ? 'blocked' : 'active'); };

  useEffect(() => {
    const interval = setInterval(() => {
      const newDopamine = { id: Date.now(), x: Math.random() * 80 + 10, y: 0 };
      const newSerotonin = { id: Date.now() + 1, x: Math.random() * 80 + 10, y: 0 };
      setDopamineFlow(prev => [...prev.slice(-15), newDopamine]);
      if (activeDrug === 'clozapine' || activeDrug === 'risperidone') setSerotoninFlow(prev => [...prev.slice(-10), newSerotonin]); else setSerotoninFlow([]);
    }, 400);
    return () => clearInterval(interval);
  }, [activeDrug]);

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-3 h-full ${isPresentation ? 'gap-8' : 'gap-6'}`}>
      <div className={`bg-gray-800 rounded-xl border border-gray-700 shadow-xl flex flex-col ${isPresentation ? 'p-8 gap-4' : 'p-4 gap-3'}`}>
        <h3 className={`font-bold text-white mb-2 ${isPresentation ? 'text-2xl' : 'text-lg'}`}>Select Treatment</h3>
        {Object.entries(drugData).map(([key, data]) => (
          <button key={key} onClick={() => handleDrugSelect(key)} className={`text-left rounded-lg transition-all border flex items-center justify-between ${isPresentation ? 'p-4' : 'p-3'} ${activeDrug === key ? `bg-${data.color}-900/40 border-${data.color}-500 ring-1 ring-${data.color}-400` : 'bg-gray-900 border-gray-700 hover:bg-gray-800'}`}><div><strong className={`block text-gray-200 ${isPresentation ? 'text-xl' : 'text-sm'}`}>{data.name}</strong><span className={`text-gray-500 ${isPresentation ? 'text-sm' : 'text-xs'}`}>{data.type}</span></div>{activeDrug === key && <CheckCircle size={20} className={`text-${data.color}-400`} />}</button>
        ))}
      </div>
      <div className="lg:col-span-2 bg-black/50 rounded-xl border border-gray-700 relative overflow-hidden flex flex-col"><div className="h-24 bg-gray-900 border-b border-gray-600 w-full z-10 flex items-end justify-center pb-2"><span className="text-gray-500 font-mono text-xs tracking-widest uppercase">Presynaptic Terminal</span></div><div className="flex-grow relative w-full overflow-hidden">{dopamineFlow.map(p => (<div key={p.id} className="absolute w-3 h-3 bg-blue-500 rounded-full animate-fall" style={{ left: `${p.x}%`, animationDuration: '3s' }}></div>))}{serotoninFlow.map(p => (<div key={p.id} className="absolute w-3 h-3 bg-yellow-500 rounded-full animate-fall" style={{ left: `${p.x}%`, animationDuration: '4s' }}></div>))}<div className="absolute bottom-0 w-full flex justify-around items-end h-24 px-10"><div className="relative group"><div className="w-16 h-12 bg-blue-900 rounded-t-lg border-t-2 border-blue-500 flex justify-center items-center"><span className="text-[10px] text-blue-300">D2</span></div>{activeDrug !== 'none' && (<div className={`absolute -top-4 left-2 w-12 h-8 rounded-full border-2 bg-gray-900 z-20 flex items-center justify-center shadow-lg ${activeDrug === 'chlorpromazine' ? 'border-blue-500 text-blue-500' : activeDrug === 'haloperidol' ? 'border-red-500 text-red-500' : activeDrug === 'clozapine' ? 'border-green-500 text-green-500 animate-pulse' : 'border-teal-500 text-teal-500'}`}><span className="text-[10px] font-bold">BLOCK</span></div>)}</div><div className="relative group"><div className="w-16 h-12 bg-yellow-900 rounded-t-lg border-t-2 border-yellow-500 flex justify-center items-center"><span className="text-[10px] text-yellow-300">5-HT</span></div>{(activeDrug === 'clozapine' || activeDrug === 'risperidone') && (<div className="absolute -top-4 left-2 w-12 h-8 rounded-full border-2 border-yellow-500 bg-gray-900 z-20 flex items-center justify-center shadow-lg text-yellow-500"><span className="text-[10px] font-bold">BLOCK</span></div>)}</div><div className="relative group"><div className="w-16 h-12 bg-blue-900 rounded-t-lg border-t-2 border-blue-500 flex justify-center items-center"><span className="text-[10px] text-blue-300">D2</span></div>{activeDrug !== 'none' && (<div className={`absolute -top-4 left-2 w-12 h-8 rounded-full border-2 bg-gray-900 z-20 flex items-center justify-center shadow-lg ${activeDrug === 'chlorpromazine' ? 'border-blue-500 text-blue-500' : activeDrug === 'haloperidol' ? 'border-red-500 text-red-500' : activeDrug === 'clozapine' ? 'border-green-500 text-green-500 animate-pulse' : 'border-teal-500 text-teal-500'}`}><span className="text-[10px] font-bold">BLOCK</span></div>)}</div></div></div><div className="h-auto bg-gray-900 border-t border-gray-600 w-full z-10 p-4"><div className="flex items-center justify-between mb-2"><span className="text-gray-400 font-bold uppercase text-xs">Neuron Firing Rate</span><div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden"><div className={`h-full transition-all duration-500 ${firingRate > 80 ? 'bg-red-500' : firingRate > 40 ? 'bg-yellow-500' : 'bg-green-500'}`} style={{ width: `${firingRate}%` }}></div></div></div><p className={`text-gray-300 leading-snug ${isPresentation ? 'text-lg' : 'text-sm'}`}>{statusText}</p>{drugData[activeDrug].icon && activeDrug !== 'none' && (<div className="mt-2 flex items-center gap-2 text-red-400 animate-fadeIn">{React.createElement(drugData[activeDrug].icon, { size: 20 })}<span className="text-xs font-bold uppercase">{activeDrug === 'chlorpromazine' ? 'Risk: Sedation' : activeDrug === 'haloperidol' ? 'Risk: Tremors (EPS)' : activeDrug === 'clozapine' ? 'Risk: Blood Monitoring' : 'Balanced Profile'}</span></div>)}</div><style>{` @keyframes fall { from { top: -10px; opacity: 1; } to { top: 100%; opacity: 0; } } .animate-fall { animation: fall 3s linear infinite; } `}</style></div>
    </div>
  );
};

export default DrugMoleculeSim;