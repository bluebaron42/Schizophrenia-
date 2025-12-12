import React, { useState, useEffect } from 'react';
import { Droplet, AlertTriangle, Brain, Pill, Activity, RotateCcw, Zap, Timer, X, ArrowUpCircle } from 'lucide-react';

interface StressBucketSimProps {
  isPresentation: boolean;
}

interface ActiveEffect {
  id: number;
  name: string;
  modifier: number; // Positive = Relief (good), Negative = Stress (bad)
  expiresAt: number;
  type: 'CBT' | 'DRUG' | 'LIFE';
}

const StressBucketSim: React.FC<StressBucketSimProps> = ({ isPresentation }) => {
  const [level, setLevel] = useState(30); // 0-100%
  const [diathesis, setDiathesis] = useState<'low' | 'high'>('low');
  const [stressors, setStressors] = useState<string[]>([]);
  const [treatments, setTreatments] = useState<string[]>([]);
  
  // Dynamic Simulation State
  const [activeEffects, setActiveEffects] = useState<ActiveEffect[]>([]);
  const [flashMessage, setFlashMessage] = useState<{title: string, body: string, type: 'warning' | 'success' | 'info'} | null>(null);
  const [psychoticBreak, setPsychoticBreak] = useState(false);
  const [nextEventTime, setNextEventTime] = useState(0);

  // Constants
  const BASE_LOW = 10;
  const BASE_HIGH = 48; // Gottesman MZ Risk
  const STRESS_VAL = 15;
  const DRUG_RELIEF = 30;
  const CBT_RELIEF_BASE = 25;
  
  const POPUP_DURATION = 7000;
  const LINGER_DURATION = 10000; // Persist 10s after popup
  const COOLDOWN_DURATION = 4000; // Wait 4s after popup fades

  const resetSim = () => {
      setPsychoticBreak(false);
      setLevel(30);
      setStressors([]);
      setTreatments([]);
      setActiveEffects([]);
      setFlashMessage(null);
      setNextEventTime(0);
  };

  // Event Generation Loop
  useEffect(() => {
    if (psychoticBreak) return;

    const interval = setInterval(() => {
        const now = Date.now();
        
        // 1. Clean up expired effects
        setActiveEffects(prev => prev.filter(e => e.expiresAt > now));

        // 2. Check if we can trigger a new event
        if (now < nextEventTime) return;

        // 3. Roll for events
        let eventTriggered = false;
        let newEffect: ActiveEffect | null = null;
        let newMessage: {title: string, body: string, type: 'warning' | 'success' | 'info'} | null = null;

        // CBT Logic (Only if CBT active)
        if (treatments.includes('cbt') && !eventTriggered) {
             const rand = Math.random();
             if (rand > 0.8) { // 20% chance per tick
                 // Bad Event
                 newEffect = {
                     id: now,
                     name: "Missed Session",
                     modifier: -40, // Significant stress increase
                     expiresAt: now + POPUP_DURATION + LINGER_DURATION,
                     type: 'CBT'
                 };
                 newMessage = {
                     title: "MISSED SESSION",
                     body: "Patient did not attend therapy.\nStress levels rising.",
                     type: 'warning'
                 };
                 eventTriggered = true;
             } else if (rand < 0.1) { // 10% chance
                 // Good Event
                 newEffect = {
                     id: now,
                     name: "CBT Breakthrough",
                     modifier: 20, // Extra relief
                     expiresAt: now + POPUP_DURATION + LINGER_DURATION,
                     type: 'CBT'
                 };
                 newMessage = {
                     title: "BREAKTHROUGH",
                     body: "Successful reality testing.\nCoping strategies boosted.",
                     type: 'success'
                 };
                 eventTriggered = true;
             }
        }

        // Drug Logic (Only if Drugs active)
        if (treatments.includes('drugs') && !eventTriggered) {
             const rand = Math.random();
             if (rand > 0.85) { // 15% chance
                 const sideEffects = [
                    { name: "Sedation", desc: "Histamine block causing drowsiness." },
                    { name: "Tremors", desc: "Dopamine block causing motor issues." },
                    { name: "Weight Gain", desc: "Metabolic changes." }
                 ];
                 const se = sideEffects[Math.floor(Math.random() * sideEffects.length)];
                 
                 newEffect = {
                     id: now,
                     name: `Side Effect (${se.name})`,
                     modifier: -20, // Reduces drug effectiveness
                     expiresAt: now + POPUP_DURATION + LINGER_DURATION,
                     type: 'DRUG'
                 };
                 newMessage = {
                     title: "SIDE EFFECT",
                     body: `${se.name.toUpperCase()}\n${se.desc}`,
                     type: 'warning'
                 };
                 eventTriggered = true;
             }
        }

        // Random Life Events (Can happen anytime, independent of treatment)
        if (!eventTriggered && Math.random() > 0.85) { // 15% chance of random life event
            const lifeEvents = [
                { name: "Poor Sleep", desc: "Sleep deprivation lowers resilience.", impact: -15 },
                { name: "Family Argument", desc: "High Expressed Emotion (EE) encounter.", impact: -25 },
                { name: "Social Rejection", desc: "Isolation increases paranoia.", impact: -20 },
                { name: "Work Stress", desc: "Deadline pressure spiked anxiety.", impact: -15 }
            ];
            const evt = lifeEvents[Math.floor(Math.random() * lifeEvents.length)];

            newEffect = {
                id: now,
                name: evt.name,
                modifier: evt.impact, // Negative modifier adds to stress level calculation
                expiresAt: now + POPUP_DURATION + LINGER_DURATION,
                type: 'LIFE'
            };
            newMessage = {
                title: "LIFE EVENT",
                body: `${evt.name.toUpperCase()}\n${evt.desc}`,
                type: 'info'
            };
            eventTriggered = true;
        }

        // Apply Event
        if (eventTriggered && newEffect && newMessage) {
            setActiveEffects(prev => [...prev, newEffect!]);
            setFlashMessage(newMessage);
            
            // Set cooldown: Duration of Popup + Cooldown buffer
            setNextEventTime(now + POPUP_DURATION + COOLDOWN_DURATION);

            // Clear popup after duration (if not closed manually)
            setTimeout(() => {
                setFlashMessage(prev => (prev === newMessage ? null : prev)); // Only clear if it's still the same message
            }, POPUP_DURATION);
        }

    }, 1000);

    return () => clearInterval(interval);
  }, [treatments, psychoticBreak, nextEventTime]);
  
  // Water Level Calculation
  useEffect(() => {
    if (psychoticBreak) return;

    const interval = setInterval(() => {
        // Base level
        let base = diathesis === 'low' ? BASE_LOW : BASE_HIGH;
        
        // Stressors
        const stressLoad = stressors.length * STRESS_VAL;
        
        // Treatments
        let treatmentRelief = 0;
        if (treatments.includes('drugs')) treatmentRelief += DRUG_RELIEF;
        if (treatments.includes('cbt')) treatmentRelief += CBT_RELIEF_BASE;

        // Active Effects (Modifiers)
        let dynamicModifiers = 0;
        activeEffects.forEach(e => {
            // Negative modifier means it REDUCES relief (bad) or ADDS stress
            // In our formula: NewLevel = Base + Stress - (Treatment + Modifiers)
            // So a negative modifier reduces the "Help", increasing the level.
            // Wait, if it's a LIFE event, it should act like Stress, not reduced treatment.
            // Mathematically: Level = Base + Stress - (Relief + Modifiers).
            // If Modifier is -20: Relief becomes (Relief - 20). Level goes UP by 20. Correct.
            dynamicModifiers += e.modifier;
        });
        
        let totalRelief = treatmentRelief + dynamicModifiers;
        
        let newLevel = base + stressLoad - totalRelief;
        
        // Check for Psychotic Break
        if (newLevel >= 100) {
            setPsychoticBreak(true);
            setLevel(100);
        } else {
            if (newLevel < 0) newLevel = 0;
            setLevel(newLevel);
        }
    }, 100); 

    return () => clearInterval(interval);
    
  }, [diathesis, stressors, treatments, activeEffects, psychoticBreak]);

  const toggleStressor = (s: string) => {
    if (stressors.includes(s)) setStressors(prev => prev.filter(i => i !== s));
    else setStressors(prev => [...prev, s]);
  };

  const toggleTreatment = (t: string) => {
    if (treatments.includes(t)) setTreatments(prev => prev.filter(i => i !== t));
    else setTreatments(prev => [...prev, t]);
  };

  const getWaterColor = () => {
      if (level >= 100) return 'bg-red-600';
      if (activeEffects.some(e => e.modifier < 0)) return 'bg-yellow-600'; 
      if (activeEffects.some(e => e.modifier > 0)) return 'bg-green-500'; 
      return 'bg-blue-500';
  };

  return (
    <div className={`h-full grid grid-cols-1 lg:grid-cols-2 ${isPresentation ? 'gap-12' : 'gap-8'}`}>
        
        {/* LEFT COLUMN: CONTROLS & POPUPS */}
        <div className={`flex flex-col justify-center relative ${isPresentation ? 'gap-6' : 'gap-4'}`}>
            
            {/* POPUP OVERLAY (Confined to Left Column) */}
            {flashMessage && !psychoticBreak && (
                <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
                    <div className={`relative w-full backdrop-blur-xl border-2 p-8 rounded-2xl shadow-2xl animate-fadeIn ${
                        flashMessage.type === 'warning' ? 'bg-red-900/95 border-red-500' : 
                        flashMessage.type === 'success' ? 'bg-green-900/95 border-green-500' :
                        'bg-blue-900/95 border-blue-500'
                    }`}>
                        <button 
                            onClick={() => setFlashMessage(null)} 
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-all text-white/70 hover:text-white"
                        >
                            <X size={24} />
                        </button>

                        <div className="flex justify-center mb-4">
                             {flashMessage.type === 'warning' ? <AlertTriangle size={64} className="text-red-300" /> : 
                              flashMessage.type === 'success' ? <Zap size={64} className="text-green-300" /> :
                              <ArrowUpCircle size={64} className="text-blue-300" />
                             }
                        </div>
                        <h3 className={`font-black text-center mb-2 uppercase tracking-widest ${
                            flashMessage.type === 'warning' ? 'text-red-300' : 
                            flashMessage.type === 'success' ? 'text-green-300' :
                            'text-blue-300'
                        } ${isPresentation ? 'text-4xl' : 'text-2xl'}`}>{flashMessage.title}</h3>
                        <p className={`text-white text-center whitespace-pre-line leading-relaxed font-bold ${isPresentation ? 'text-2xl' : 'text-lg'}`}>{flashMessage.body}</p>
                        <div className="mt-6 h-1 w-full bg-black/30 rounded-full overflow-hidden">
                            <div className={`h-full animate-[shimmer_7s_linear_forwards] ${
                                flashMessage.type === 'warning' ? 'bg-red-500' : 
                                flashMessage.type === 'success' ? 'bg-green-500' :
                                'bg-blue-500'
                            }`} style={{ width: '100%' }}></div>
                        </div>
                    </div>
                </div>
            )}

            {/* 1. Diathesis */}
            <div className={`bg-gray-800 p-4 rounded-lg border border-purple-500/30`}>
                <strong className={`block text-purple-400 mb-2 uppercase ${isPresentation ? 'text-xl' : 'text-xs'}`}>1. Diathesis (Genetic Risk)</strong>
                <div className="flex gap-2">
                    <button onClick={() => setDiathesis('low')} className={`flex-1 rounded border transition-all ${isPresentation ? 'p-4 text-xl' : 'p-2 text-sm'} ${diathesis === 'low' ? 'bg-purple-600 text-white' : 'bg-gray-900 text-gray-400'}`}>Low Risk (10%)</button>
                    <button onClick={() => setDiathesis('high')} className={`flex-1 rounded border transition-all ${isPresentation ? 'p-4 text-xl' : 'p-2 text-sm'} ${diathesis === 'high' ? 'bg-purple-600 text-white' : 'bg-gray-900 text-gray-400'}`}>High Risk (48%)</button>
                </div>
            </div>

            {/* 2. Stressors */}
            <div className={`bg-gray-800 p-4 rounded-lg border border-red-500/30`}>
                <strong className={`block text-red-400 mb-2 uppercase ${isPresentation ? 'text-xl' : 'text-xs'}`}>2. Add Stress (Triggers)</strong>
                <div className="flex flex-wrap gap-2">
                    {['Cannabis Use', 'Family Conflict (EE)', 'Job Loss', 'Trauma'].map(s => (
                        <button key={s} onClick={() => toggleStressor(s)} className={`rounded border px-3 py-1 transition-all ${stressors.includes(s) ? 'bg-red-600 text-white border-red-500' : 'bg-gray-900 text-gray-400 border-gray-600'} ${isPresentation ? 'text-lg p-3' : 'text-xs'}`}>{s}</button>
                    ))}
                </div>
            </div>

            {/* 3. Treatment */}
            <div className={`bg-gray-800 p-4 rounded-lg border border-blue-500/30`}>
                <strong className={`block text-blue-400 mb-2 uppercase ${isPresentation ? 'text-xl' : 'text-xs'}`}>3. Treatment (Interactionist)</strong>
                <div className="flex flex-col gap-3">
                    <button onClick={() => toggleTreatment('drugs')} className={`flex-1 rounded border transition-all flex items-center justify-between ${isPresentation ? 'p-4 text-xl' : 'p-3 text-sm'} ${treatments.includes('drugs') ? 'bg-blue-600 text-white' : 'bg-gray-900 text-gray-400'}`}>
                        <div className="flex items-center gap-2"><Pill size={16}/> Antipsychotics</div>
                    </button>
                    
                    <button onClick={() => toggleTreatment('cbt')} className={`flex-1 rounded border transition-all flex items-center justify-between ${isPresentation ? 'p-4 text-xl' : 'p-3 text-sm'} ${treatments.includes('cbt') ? 'bg-blue-600 text-white' : 'bg-gray-900 text-gray-400'}`}>
                        <div className="flex items-center gap-2"><Brain size={16}/> CBT (Coping)</div>
                    </button>
                </div>
            </div>

            {/* LINGERING EFFECTS LIST */}
            {activeEffects.length > 0 && (
                <div className="animate-fadeIn mt-2">
                     <strong className={`block text-gray-500 uppercase tracking-widest mb-2 ${isPresentation ? 'text-sm' : 'text-[10px]'}`}>Active Transient Factors</strong>
                     <div className="flex flex-wrap gap-2">
                        {activeEffects.map(e => (
                             <div key={e.id} className={`flex items-center gap-2 px-3 py-1 rounded-full border ${e.modifier < 0 ? 'bg-red-900/40 border-red-500 text-red-300' : 'bg-green-900/40 border-green-500 text-green-300'}`}>
                                 {e.modifier < 0 ? <AlertTriangle size={12}/> : <Zap size={12}/>}
                                 <span className={isPresentation ? 'text-sm' : 'text-xs'}>{e.name}</span>
                                 <Timer size={10} className="ml-1 opacity-50 animate-pulse"/>
                             </div>
                        ))}
                     </div>
                </div>
            )}
        </div>

        {/* RIGHT COLUMN: THE BUCKET VISUAL */}
        <div className={`bg-gray-900 rounded-xl border border-gray-700 flex flex-col items-center justify-center p-8 relative overflow-hidden`}>
            
            {/* PSYCHOTIC BREAK OVERLAY (Global) */}
            {psychoticBreak && (
                <div className="absolute inset-0 z-[60] bg-black/95 flex flex-col items-center justify-center p-8 text-center animate-fadeIn backdrop-blur-md">
                    <Activity size={80} className="text-red-500 mb-6 animate-pulse" />
                    <h2 className={`font-black text-red-500 mb-4 uppercase tracking-widest ${isPresentation ? 'text-5xl' : 'text-3xl'}`}>Psychotic Break</h2>
                    <p className={`text-white mb-8 max-w-lg leading-relaxed ${isPresentation ? 'text-2xl' : 'text-lg'}`}>
                        Threshold exceeded. Reality contact lost.
                    </p>
                    <button 
                        onClick={resetSim} 
                        className={`bg-red-600 hover:bg-red-500 text-white rounded-full font-bold flex items-center gap-2 transition-all shadow-[0_0_30px_rgba(220,38,38,0.5)] ${isPresentation ? 'px-12 py-6 text-2xl' : 'px-8 py-3 text-lg'}`}
                    >
                        <RotateCcw size={20} /> Reset Patient
                    </button>
                </div>
            )}

            <div className="absolute top-4 left-4 text-gray-500 font-bold uppercase text-xs">Vulnerability Model</div>

            {/* Bucket Container */}
            <div className="w-48 h-64 border-4 border-gray-500 rounded-b-3xl relative bg-gray-800/50 backdrop-blur overflow-hidden z-10">
                {/* Water */}
                <div 
                   className={`absolute bottom-0 w-full transition-all duration-1000 ease-in-out opacity-80 ${getWaterColor()}`}
                   style={{ height: `${level}%` }}
                >
                    {/* Bubbles */}
                    <div className="absolute w-full h-full animate-bubble opacity-30 bg-[radial-gradient(white_20%,transparent_20%)] bg-[length:10px_10px]"></div>
                </div>
                
                {/* Threshold Line */}
                <div className="absolute top-[10%] w-full border-b-2 border-red-500 border-dashed opacity-70"></div>
                <span className="absolute top-[6%] right-2 text-red-500 text-xs font-bold">Psychotic Break Threshold</span>
            </div>

            {/* Tap/Inflow Visuals */}
            <div className="absolute top-10 flex gap-4">
                {stressors.map((s, i) => (
                    <div key={i} className="animate-drop text-blue-400"><Droplet size={24} className="fill-current"/></div>
                ))}
            </div>

            <h3 className={`mt-6 font-bold text-center ${level >= 100 ? 'text-red-500 animate-pulse' : 'text-white'} ${isPresentation ? 'text-4xl' : 'text-2xl'}`}>
                {level >= 100 ? "CRITICAL FAILURE" : "Patient Status: Stable"}
            </h3>
            <p className={`text-gray-400 ${isPresentation ? 'text-xl' : 'text-sm'}`}>Current Load: {level}%</p>
        </div>

        <style>{`
          @keyframes drop {
            0% { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(100px); opacity: 0; }
          }
          .animate-drop {
            animation: drop 1.5s infinite linear;
          }
          @keyframes bubble {
            0% { transform: translateY(100%); opacity: 0; }
            50% { opacity: 0.5; }
            100% { transform: translateY(-20%); opacity: 0; }
          }
          .animate-bubble {
            animation: bubble 4s linear infinite;
          }
          @keyframes shimmer {
            0% { width: 100%; }
            100% { width: 0%; }
          }
        `}</style>
    </div>
  );
};

export default StressBucketSim;