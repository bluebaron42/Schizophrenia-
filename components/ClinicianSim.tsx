import React, { useState } from 'react';
import { Users, Activity, ClipboardList, CheckCircle, XCircle } from 'lucide-react';
import { patientFiles } from '../constants';

interface ClinicianSimProps {
    isPresentation: boolean;
}

const ClinicianSim: React.FC<ClinicianSimProps> = ({ isPresentation }) => {
  const [activeTab, setActiveTab] = useState(patientFiles[0].id);
  const [diagnosisState, setDiagnosisState] = useState<Record<string, { revealed: boolean }>>({}); 
  const currentPatient = patientFiles.find(p => p.id === activeTab);

  if (!currentPatient) return null;

  const patientState = diagnosisState[activeTab] || { revealed: false };
  const reveal = () => setDiagnosisState(prev => ({ ...prev, [activeTab]: { ...prev[activeTab], revealed: true } }));

  return (
    <div className={`h-full flex flex-col ${isPresentation ? 'gap-6' : 'gap-4'}`}>
      <div className="flex gap-2 border-b border-gray-700 pb-1">{patientFiles.map(p => (<button key={p.id} onClick={() => setActiveTab(p.id)} className={`rounded-t-lg font-bold transition-all flex items-center gap-2 ${isPresentation ? 'px-8 py-4 text-lg' : 'px-6 py-3 text-sm'} ${activeTab === p.id ? 'bg-gray-800 text-purple-400 border-t border-x border-gray-700' : 'bg-gray-900 text-gray-500 hover:bg-gray-800 hover:text-gray-300'}`}><Users size={isPresentation ? 20 : 16} /> Case: {p.id}</button>))}</div>
      <div className={`grid grid-cols-1 lg:grid-cols-3 flex-grow ${isPresentation ? 'gap-8' : 'gap-6'}`}>
        <div className={`lg:col-span-2 bg-gray-800 rounded-xl border border-gray-700 shadow-xl flex flex-col ${isPresentation ? 'p-10' : 'p-8'}`}><div className="flex justify-between items-start mb-6"><div><h3 className={`font-bold text-white mb-1 ${isPresentation ? 'text-3xl' : 'text-2xl'}`}>Patient: {currentPatient.id}</h3><span className={`text-gray-500 font-mono ${isPresentation ? 'text-lg' : 'text-sm'}`}>Age: {currentPatient.age} | File Ref: #SCHZ-{currentPatient.id.substring(0,3).toUpperCase()}</span></div><Activity className="text-purple-500/50" size={isPresentation ? 56 : 40} /></div><div className={`bg-gray-900/50 rounded-lg border border-gray-700 mb-6 flex-grow ${isPresentation ? 'p-8' : 'p-6'}`}><h4 className={`text-purple-400 font-bold uppercase tracking-widest mb-3 ${isPresentation ? 'text-sm' : 'text-xs'}`}>Clinical Vignette</h4><p className={`text-gray-300 leading-relaxed font-serif ${isPresentation ? 'text-2xl' : 'text-lg'}`}>"{currentPatient.vignette}"</p></div><div className="grid grid-cols-2 gap-4"><div className={`bg-gray-900/30 rounded border border-gray-700 ${isPresentation ? 'p-6' : 'p-4'}`}><h4 className={`text-gray-500 font-bold uppercase mb-2 ${isPresentation ? 'text-sm' : 'text-xs'}`}>Symptom Extraction</h4><ul className="space-y-1">{currentPatient.obs.map((o, i) => (<li key={i} className={`text-gray-400 flex items-start gap-2 ${isPresentation ? 'text-lg' : 'text-sm'}`}><span className="text-purple-500 mt-1">▪</span> {o}</li>))}</ul></div><button onClick={reveal} disabled={patientState.revealed} className={`rounded-lg font-bold shadow-lg transition-all flex flex-col items-center justify-center ${isPresentation ? 'text-2xl' : 'text-lg'} ${patientState.revealed ? 'bg-gray-700 text-gray-500 cursor-default' : 'bg-purple-600 hover:bg-purple-500 text-white'}`}>{patientState.revealed ? "Diagnosis Revealed" : "Make Diagnosis"}</button></div></div>
        <div className={`bg-gray-800 rounded-xl border border-gray-700 flex flex-col gap-4 ${isPresentation ? 'p-8' : 'p-6'}`}><h4 className={`text-gray-400 font-bold uppercase tracking-widest border-b border-gray-700 pb-2 ${isPresentation ? 'text-sm' : 'text-xs'}`}>Diagnostic Output</h4>{patientState.revealed ? (<div className="space-y-4 animate-fadeIn"><div className={`rounded-lg border ${currentPatient.dsm ? 'bg-green-900/20 border-green-500/50' : 'bg-red-900/20 border-red-500/50'} ${isPresentation ? 'p-6' : 'p-4'}`}><div className="flex justify-between items-center mb-1"><span className={`font-bold text-gray-200 ${isPresentation ? 'text-xl' : 'text-base'}`}>DSM-5</span>{currentPatient.dsm ? <CheckCircle size={isPresentation ? 28 : 20} className="text-green-500"/> : <XCircle size={isPresentation ? 28 : 20} className="text-red-500"/>}</div></div><div className={`rounded-lg border ${currentPatient.icd ? 'bg-green-900/20 border-green-500/50' : 'bg-red-900/20 border-red-500/50'} ${isPresentation ? 'p-6' : 'p-4'}`}><div className="flex justify-between items-center mb-1"><span className={`font-bold text-gray-200 ${isPresentation ? 'text-xl' : 'text-base'}`}>ICD-10</span>{currentPatient.icd ? <CheckCircle size={isPresentation ? 28 : 20} className="text-green-500"/> : <XCircle size={isPresentation ? 28 : 20} className="text-red-500"/>}</div></div><div className={`bg-purple-900/20 rounded-lg border border-purple-500/30 ${isPresentation ? 'p-6' : 'p-4'}`}><h5 className={`text-purple-300 font-bold uppercase mb-2 ${isPresentation ? 'text-sm' : 'text-xs'}`}>Supervisor Notes</h5><p className={`text-gray-300 leading-snug ${isPresentation ? 'text-lg' : 'text-sm'}`}>{currentPatient.feedback}</p></div></div>) : (<div className="flex-grow flex flex-col items-center justify-center text-center p-6 opacity-50"><ClipboardList size={isPresentation ? 64 : 48} className="text-gray-600 mb-4" /><p className={`text-gray-500 ${isPresentation ? 'text-lg' : 'text-sm'}`}>Review the vignette and symptoms, then submit your diagnosis.</p></div>)}</div>
      </div>
    </div>
  );
};

export default ClinicianSim;