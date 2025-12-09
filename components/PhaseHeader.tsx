import React from 'react';
import { Clock } from 'lucide-react';
import { PhaseHeaderProps } from '../types';

const PhaseHeader: React.FC<PhaseHeaderProps> = ({ phase, title, icon: Icon, time, isPresentation }) => (
  <div className={`flex items-center justify-between border-b border-gray-700 transition-all ${isPresentation ? 'mb-4 pb-2' : 'mb-6 pb-4'}`}>
    <div className="flex items-center gap-3">
      <div className={`rounded-xl border border-purple-500/30 transition-all ${isPresentation ? 'p-2 bg-purple-900/50' : 'p-3 bg-purple-900/30'}`}>
        <Icon size={isPresentation ? 36 : 28} className="text-purple-400" />
      </div>
      <div>
        <h4 className={`font-bold text-purple-400 uppercase tracking-widest transition-all ${isPresentation ? 'text-sm mb-0' : 'text-[10px] mb-0.5'}`}>{phase}</h4>
        <h2 className={`font-bold text-gray-100 transition-all ${isPresentation ? 'text-4xl' : 'text-3xl'}`}>{title}</h2>
      </div>
    </div>
    {time && (
      <div className={`flex items-center gap-2 text-gray-500 font-mono bg-gray-900 rounded-full border border-gray-800 transition-all ${isPresentation ? 'text-base px-3 py-1' : 'text-xs px-2 py-1'}`}>
        <Clock size={isPresentation ? 16 : 12} /> {time}
      </div>
    )}
  </div>
);

export default PhaseHeader;