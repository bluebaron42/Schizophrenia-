import React, { useState } from 'react';
import { User, CheckCircle, XCircle } from 'lucide-react';

interface WardManagerSimProps {
  isPresentation: boolean;
}

const WardManagerSim: React.FC<WardManagerSimProps> = ({ isPresentation }) => {
  const [step, setStep] = useState(0); 
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [config, setConfig] = useState<any>({ behavior: null, schedule: null, reward: null });
  const [result, setResult] = useState<any>(null);

  // EXPANDED PATIENT LIST with SPECIFIC OPTIONS for CHALLENGE
  const patients = [
    { 
      id: 1, name: "Alfie", symptom: "Avolition", 
      desc: "Severe lack of motivation. Has not washed or changed clothes in 2 weeks. Loves gardening, hates reading.", 
      options: {
        behavior: [
          { id: 'correct', label: "Wash face and brush teeth before 10am.", type: "Shaping (Achievable)" },
          { id: 'wrong', label: "Clean entire room and do laundry daily.", type: "Too Complex" }
        ],
        schedule: [
            { id: 'correct', label: "Give token immediately in the bathroom.", type: "Temporal Contiguity" },
            { id: 'wrong', label: "Give token at the 11am Ward Inspection.", type: "Delayed Reinforcement" }
        ],
        reward: [
          { id: 'correct', label: "30 mins Gardening access.", type: "High Value" },
          { id: 'wrong', label: "A classic novel.", type: "Low Value" }
        ]
      }
    },
    { 
      id: 2, name: "Leo", symptom: "Social Withdrawal", 
      desc: "Refuses to leave his room. Obsessed with comic books. Finds eye contact painful.", 
      options: {
        behavior: [
          { id: 'correct', label: "Sit in the communal lounge for 15 mins.", type: "Shaping" },
          { id: 'wrong', label: "Host the weekly quiz night.", type: "Overwhelming" }
        ],
        schedule: [
            { id: 'correct', label: "Discreetly hand token while he sits.", type: "Reinforcement" },
            { id: 'wrong', label: "Announce the token to the group to praise him.", type: "Punishment (Anxiety)" }
        ],
        reward: [
          { id: 'correct', label: "New Comic Book issue.", type: "High Value" },
          { id: 'wrong', label: "Ticket to a group outing.", type: "Aversive" }
        ]
      }
    },
    { 
      id: 3, name: "Sam", symptom: "Disorganised", 
      desc: "Chaotic movement. Often forgets to eat. Loves chocolate.", 
      options: {
        behavior: [
          { id: 'correct', label: "Eat lunch using cutlery.", type: "Routine/Safety" },
          { id: 'wrong', label: "Cook a meal for the ward.", type: "Dangerous/Complex" }
        ],
        schedule: [
            { id: 'correct', label: "Token every time he successfully uses fork.", type: "Frequent/Immediate" },
            { id: 'wrong', label: "Token when the plate is empty.", type: "Too Delayed" }
        ],
        reward: [
          { id: 'correct', label: "A chocolate bar.", type: "High Value" },
          { id: 'wrong', label: "A newspaper.", type: "Low Value" }
        ]
      }
    },
    {
        id: 4, name: "Ben", symptom: "Alogia (Speech Poverty)",
        desc: "Replies with one word answers. Loves logic puzzles. Finds conversation exhausting.",
        options: {
            behavior: [
                { id: 'correct', label: "Answer a question with a full sentence.", type: "Shaping" },
                { id: 'wrong', label: "Give a 5-minute presentation.", type: "Impossible" }
            ],
            schedule: [
                { id: 'correct', label: "Token immediately after the sentence.", type: "Temporal Contiguity" },
                { id: 'wrong', label: "Token at the end of the therapy session.", type: "Delayed" }
            ],
            reward: [
                { id: 'correct', label: "Page from a Sudoku book.", type: "High Value" },
                { id: 'wrong', label: "Extra conversation time with staff.", type: "Aversive" }
            ]
        }
    }
  ];

  const handlePatientSelect = (p: any) => {
      setSelectedPatient(p);
      setStep(1);
      setConfig({ behavior: null, schedule: null, reward: null });
      setResult(null);
  };

  const handleOptionSelect = (category: string, option: any) => {
      setConfig((prev: any) => ({ ...prev, [category]: option }));
  };

  const runSimulation = () => {
      let outcome = 'success';
      let feedbackTitle = "Behaviour Modification Successful";
      let feedbackDesc = `Frequency of target behaviour increased for ${selectedPatient.name}.`;
      let reasons = ["Immediate Reinforcement (Temporal Contiguity).", "Achievable Goal (Shaping).", "Valued Primary Reinforcer."];

      if (config.behavior.id === 'wrong') {
          outcome = 'fail';
          feedbackTitle = "Learned Helplessness";
          feedbackDesc = "The target was too difficult or inappropriate.";
          reasons = ["Patient gave up.", "Goals must be achievable increments (Shaping)."];
      } else if (config.schedule.id === 'wrong') {
          outcome = 'fail';
          feedbackTitle = "Extinction";
          feedbackDesc = "The behaviour did not increase.";
          reasons = ["Reward was delayed.", "Association between behaviour and token was not formed."];
      } else if (config.reward.id === 'wrong') {
           outcome = 'fail';
           feedbackTitle = "No Motivation";
           feedbackDesc = "The token has no value.";
           reasons = ["The Primary Reinforcer was not desired by the patient.", "Tokens only work if they can be exchanged for something valued."];
      }

      setResult({ status: outcome, title: feedbackTitle, desc: feedbackDesc, reasons });
  };

  const reset = () => { setStep(0); setSelectedPatient(null); setResult(null); };

  return (
    <div className={`h-full grid grid-cols-1 ${step > 0 && !result ? 'lg:grid-cols-2' : ''} ${isPresentation ? 'gap-12' : 'gap-8'}`}>
        {/* LEFT: PATIENT FILE / RESULT */}
        <div className={`bg-gray-900 rounded-xl border border-gray-700 flex flex-col items-center justify-center relative overflow-hidden ${isPresentation ? 'p-12' : 'p-8'}`}>
            {step === 0 && (
                <div className="w-full h-full flex flex-col">
                    <h3 className={`font-bold text-white text-center mb-6 ${isPresentation ? 'text-5xl' : 'text-2xl'}`}>Select Patient</h3>
                    <div className={`grid grid-cols-2 w-full h-full ${isPresentation ? 'gap-8' : 'gap-4'}`}>
                        {patients.map(p => (
                            <button key={p.id} onClick={() => handlePatientSelect(p)} className={`bg-gray-800 hover:bg-gray-700 rounded-xl border border-gray-600 text-left transition-all flex flex-col justify-center group hover:border-purple-500 ${isPresentation ? 'p-10' : 'p-6'}`}>
                                <div className="flex items-center gap-4 mb-4">
                                     <div className={`rounded-full bg-gray-700 flex items-center justify-center shrink-0 ${isPresentation ? 'w-24 h-24' : 'w-12 h-12'}`}>
                                        <User size={isPresentation ? 48 : 24} className="text-purple-400" />
                                     </div>
                                     <div>
                                        <strong className={`text-white block ${isPresentation ? 'text-4xl' : 'text-lg'}`}>{p.name}</strong>
                                        <span className={`text-gray-400 uppercase tracking-widest font-bold ${isPresentation ? 'text-xl' : 'text-xs'}`}>{p.symptom}</span>
                                     </div>
                                </div>
                                <p className={`text-gray-400 line-clamp-2 group-hover:text-gray-200 ${isPresentation ? 'text-2xl' : 'text-sm'}`}>{p.desc}</p>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {step > 0 && !result && (
                <div className="text-center animate-fadeIn">
                    <User size={isPresentation ? 100 : 64} className="text-blue-500 mx-auto mb-4"/>
                    <h3 className={`font-bold text-white mb-2 ${isPresentation ? 'text-4xl' : 'text-2xl'}`}>{selectedPatient.name}</h3>
                    <p className={`text-gray-300 ${isPresentation ? 'text-2xl' : 'text-sm'}`}>{selectedPatient.desc}</p>
                </div>
            )}

            {result && (
                <div className={`text-center animate-fadeIn max-w-4xl`}>
                    {result.status === 'success' ? <CheckCircle size={isPresentation ? 150 : 100} className="text-green-500 mx-auto mb-6"/> : <XCircle size={isPresentation ? 150 : 100} className="text-red-500 mx-auto mb-6"/>}
                    <h3 className={`font-bold text-white mb-4 ${isPresentation ? 'text-6xl' : 'text-2xl'}`}>{result.title}</h3>
                    <p className={`text-gray-300 mb-6 ${isPresentation ? 'text-3xl' : 'text-lg'}`}>{result.desc}</p>
                    <ul className={`text-left list-disc pl-8 text-gray-400 mx-auto inline-block ${isPresentation ? 'space-y-4' : 'space-y-1'}`}>
                        {result.reasons.map((r: string, i: number) => <li key={i} className={isPresentation ? 'text-2xl' : 'text-sm'}>{r}</li>)}
                    </ul>
                    <div className="mt-8">
                        <button onClick={reset} className={`bg-gray-700 hover:bg-gray-600 text-white rounded-full font-bold transition-all ${isPresentation ? 'px-12 py-6 text-3xl' : 'px-6 py-2'}`}>Select New Patient</button>
                    </div>
                </div>
            )}
        </div>

        {/* RIGHT: CONTROLS */}
        {step > 0 && !result && (
        <div className={`flex flex-col h-full ${isPresentation ? 'gap-6' : 'gap-4'}`}>
            {/* Step 1: Behavior */}
            <div className={`bg-gray-800 rounded-lg border flex-1 flex flex-col ${config.behavior ? 'border-green-500' : 'border-blue-500'} ${isPresentation ? 'p-6' : 'p-4'}`}>
                <strong className={`block text-blue-400 mb-2 uppercase ${isPresentation ? 'text-xl' : 'text-xs'}`}>1. Target Behaviour</strong>
                <div className="flex flex-col gap-2 flex-grow justify-center">
                    {selectedPatient.options.behavior.map((opt: any, idx: number) => (
                        <button key={idx} onClick={() => handleOptionSelect('behavior', opt)} className={`w-full text-left rounded border transition-all ${config.behavior?.id === opt.id ? 'bg-blue-900 border-blue-500' : 'bg-gray-900 border-gray-600 hover:bg-gray-700'} ${isPresentation ? 'p-5 text-2xl' : 'p-3 text-sm'}`}>
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Step 2: Schedule */}
            <div className={`bg-gray-800 rounded-lg border flex-1 flex flex-col ${config.schedule ? 'border-green-500' : 'border-blue-500'} ${isPresentation ? 'p-6' : 'p-4'}`}>
                <strong className={`block text-blue-400 mb-2 uppercase ${isPresentation ? 'text-xl' : 'text-xs'}`}>2. Reinforcement Schedule</strong>
                <div className="flex flex-col gap-2 flex-grow justify-center">
                    {selectedPatient.options.schedule.map((opt: any, idx: number) => (
                        <button key={idx} onClick={() => handleOptionSelect('schedule', opt)} className={`w-full text-left rounded border transition-all ${config.schedule?.id === opt.id ? 'bg-blue-900 border-blue-500' : 'bg-gray-900 border-gray-600 hover:bg-gray-700'} ${isPresentation ? 'p-5 text-2xl' : 'p-3 text-sm'}`}>
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Step 3: Reward */}
            <div className={`bg-gray-800 rounded-lg border flex-1 flex flex-col ${config.reward ? 'border-green-500' : 'border-blue-500'} ${isPresentation ? 'p-6' : 'p-4'}`}>
                <strong className={`block text-blue-400 mb-2 uppercase ${isPresentation ? 'text-xl' : 'text-xs'}`}>3. Primary Reinforcer</strong>
                <div className="flex flex-col gap-2 flex-grow justify-center">
                    {selectedPatient.options.reward.map((opt: any, idx: number) => (
                        <button key={idx} onClick={() => handleOptionSelect('reward', opt)} className={`w-full text-left rounded border transition-all ${config.reward?.id === opt.id ? 'bg-blue-900 border-blue-500' : 'bg-gray-900 border-gray-600 hover:bg-gray-700'} ${isPresentation ? 'p-5 text-2xl' : 'p-3 text-sm'}`}>
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            <button onClick={runSimulation} disabled={!config.behavior || !config.schedule || !config.reward} className={`bg-green-600 disabled:opacity-50 text-white rounded font-bold transition-all shadow-lg ${isPresentation ? 'py-8 text-4xl mt-2' : 'py-3'}`}>Run Protocol</button>
        </div>
        )}
    </div>
  );
};

export default WardManagerSim;