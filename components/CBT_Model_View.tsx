import React from 'react';

interface CBT_Model_ViewProps {
  isPresentation: boolean;
}

const CBT_Model_View: React.FC<CBT_Model_ViewProps> = ({ isPresentation }) => (
    <div className={`h-full grid grid-cols-1 md:grid-cols-2 ${isPresentation ? 'gap-10' : 'gap-6'}`}>
        <div className={`bg-gray-800 rounded-xl border border-gray-700 p-8 flex flex-col justify-center`}>
            <h3 className={`font-bold text-white mb-6 border-b border-gray-600 pb-2 ${isPresentation ? 'text-4xl' : 'text-xl'}`}>The ABCDE Model</h3>
            <div className={`space-y-4 ${isPresentation ? 'text-2xl' : 'text-sm'}`}>
                <div className="flex items-center gap-4"><div className="w-10 h-10 rounded-full bg-blue-900 text-blue-300 flex items-center justify-center font-bold">A</div><div><strong className="text-blue-300 block">Activating Event</strong><span>The trigger (e.g. Hearing a voice).</span></div></div>
                <div className="flex items-center gap-4"><div className="w-10 h-10 rounded-full bg-blue-900 text-blue-300 flex items-center justify-center font-bold">B</div><div><strong className="text-blue-300 block">Beliefs</strong><span>The interpretation (e.g. "It is a demon").</span></div></div>
                <div className="flex items-center gap-4"><div className="w-10 h-10 rounded-full bg-blue-900 text-blue-300 flex items-center justify-center font-bold">C</div><div><strong className="text-blue-300 block">Consequences</strong><span>Emotional response (e.g. Fear, Isolation).</span></div></div>
                <div className="flex items-center gap-4"><div className="w-10 h-10 rounded-full bg-green-900 text-green-300 flex items-center justify-center font-bold">D</div><div><strong className="text-green-300 block">Dispute</strong><span>Challenging the irrational belief.</span></div></div>
                <div className="flex items-center gap-4"><div className="w-10 h-10 rounded-full bg-green-900 text-green-300 flex items-center justify-center font-bold">E</div><div><strong className="text-green-300 block">Effect</strong><span>Restructured belief & reduced anxiety.</span></div></div>
            </div>
        </div>
        <div className={`bg-gray-800 rounded-xl border border-gray-700 p-8 flex flex-col`}>
             <h3 className={`font-bold text-white mb-6 border-b border-gray-600 pb-2 ${isPresentation ? 'text-4xl' : 'text-xl'}`}>The Process</h3>
             <ul className={`space-y-6 list-none ${isPresentation ? 'text-2xl' : 'text-sm'}`}>
                 <li className="bg-gray-900 p-4 rounded border-l-4 border-purple-500">
                     <strong className="text-purple-400 block mb-1">1. Assessment & Engagement</strong>
                     <span className="text-gray-400">Therapist emphasizes empathy to build trust. The patient expresses their thoughts.</span>
                 </li>
                 <li className="bg-gray-900 p-4 rounded border-l-4 border-purple-500">
                     <strong className="text-purple-400 block mb-1">2. Normalisation</strong>
                     <span className="text-gray-400">Helping the patient understand that hearing voices is an extension of "inner speech" and is experienced by many people. This reduces stigma.</span>
                 </li>
                 <li className="bg-gray-900 p-4 rounded border-l-4 border-purple-500">
                     <strong className="text-purple-400 block mb-1">3. Critical Collaborative Analysis</strong>
                     <span className="text-gray-400">Gentle reality testing. "If the FBI are watching, why use a bright red van?"</span>
                 </li>
             </ul>
        </div>
    </div>
);

export default CBT_Model_View;