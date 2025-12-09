import React, { useState, useEffect } from 'react';

interface StroopSimProps {
  isPresentation: boolean;
}

const StroopSim: React.FC<StroopSimProps> = ({ isPresentation }) => {
  const words = [ { text: "RED", color: "text-green-500" }, { text: "BLUE", color: "text-red-500" }, { text: "GREEN", color: "text-blue-500" }, { text: "YELLOW", color: "text-purple-500" }, { text: "PURPLE", color: "text-orange-500" }, { text: "ORANGE", color: "text-pink-500" }, { text: "BLACK", color: "text-gray-300" }, { text: "PINK", color: "text-yellow-500" }, { text: "BROWN", color: "text-cyan-500" }, { text: "GRAY", color: "text-red-500" }, { text: "WHITE", color: "text-black" }, { text: "CYAN", color: "text-green-500" } ];
  const [currentWord, setCurrentWord] = useState(0); 
  const [started, setStarted] = useState(false); 
  const [dysfunction, setDysfunction] = useState(false); 
  const [distractors, setDistractors] = useState<any[]>([]);

  useEffect(() => { 
    if (dysfunction) { 
      const newDistractors = Array.from({ length: 40 }).map((_, i) => ({ 
        id: i, 
        text: words[Math.floor(Math.random() * words.length)].text, 
        top: `${Math.random() * 100}%`, 
        left: `${Math.random() * 100}%`, 
        size: `${Math.random() * 5 + 1}rem`, 
        color: words[Math.floor(Math.random() * words.length)].color, 
        opacity: Math.random() * 0.6 + 0.1, 
        animDuration: `${Math.random() * 5 + 3}s`, 
        animType: Math.random() > 0.5 ? 'float' : 'jitter', 
        rotation: `${Math.random() * 360}deg`, 
        zIndex: Math.random() > 0.7 ? 50 : 1 // High chance to obscure
      })); 
      setDistractors(newDistractors); 
    } else { 
      setDistractors([]); 
    } 
  }, [dysfunction, currentWord]);

  const handleNext = () => setCurrentWord((prev) => (prev + 1) % words.length);

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 h-full ${isPresentation ? 'gap-8' : 'gap-8'}`}>
      <style>{` @keyframes jitter { 0% { transform: translate(0,0) scale(1); opacity: 0.8; } 25% { transform: translate(5px, -5px) scale(1.1); opacity: 1; } 50% { transform: translate(-5px, 5px) scale(0.9); opacity: 0.5; } 75% { transform: translate(5px, 5px) scale(1.05); opacity: 0.9; } 100% { transform: translate(0,0) scale(1); opacity: 0.8; } } @keyframes float { 0% { transform: translate(0, 0) rotate(0deg); } 25% { transform: translate(20px, 20px) rotate(90deg); } 50% { transform: translate(0, 40px) rotate(180deg); } 75% { transform: translate(-20px, 20px) rotate(270deg); } 100% { transform: translate(0, 0) rotate(360deg); } } `}</style>
      <div className={`bg-gray-800 rounded-xl border border-gray-700 shadow-xl flex flex-col justify-center ${isPresentation ? 'p-10' : 'p-6'}`}><h3 className={`font-bold text-white mb-4 ${isPresentation ? 'text-4xl' : 'text-2xl'}`}>The Central Control Lab</h3><p className={`text-gray-300 mb-6 ${isPresentation ? 'text-xl' : 'text-sm'}`}><strong>Task:</strong> Name the INK COLOR, not the word.<br/><br/>Frith identified <strong>Central Control</strong> as the ability to suppress automatic responses (reading the word) to perform deliberate actions (saying the color).</p><div className="bg-gray-900 p-4 rounded-lg border border-gray-700 mb-6"><div className="flex items-center justify-between mb-2"><span className={`text-gray-400 font-bold uppercase ${isPresentation ? 'text-lg' : 'text-sm'}`}>Simulation Mode</span><span className={`px-2 py-1 rounded font-bold ${dysfunction ? "bg-red-900 text-red-300" : "bg-green-900 text-green-300"} ${isPresentation ? 'text-sm' : 'text-[10px]'}`}>{dysfunction ? "SCHIZOPHRENIA (HIGH DYSFUNCTION)" : "NEUROTYPICAL (INTACT)"}</span></div><button onClick={() => setDysfunction(!dysfunction)} className={`w-full rounded font-bold transition-all ${dysfunction ? "bg-red-600 text-white" : "bg-green-600 text-white"} ${isPresentation ? 'py-4 text-xl' : 'py-3'}`}>{dysfunction ? "Deactivate Dysfunction" : "Activate Central Control Failure"}</button></div><button onClick={() => setStarted(true)} className={`bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold ${isPresentation ? 'py-4 text-xl' : 'py-3'}`}>Start Test</button></div>
      <div className="bg-black/50 rounded-xl border border-gray-700 flex flex-col items-center justify-center relative overflow-hidden">{!started ? (<div className={`text-gray-500 ${isPresentation ? 'text-2xl' : 'text-sm'}`}>Press Start to Begin</div>) : (<div className="text-center relative z-10 w-full h-full flex flex-col items-center justify-center">{dysfunction && distractors.map(d => (<div key={d.id} className={`absolute font-bold pointer-events-none select-none ${d.color}`} style={{ top: d.top, left: d.left, fontSize: d.size, opacity: d.opacity, animation: `${d.animType} ${d.animDuration} infinite linear`, transform: `rotate(${d.rotation})`, zIndex: d.zIndex, filter: 'blur(2px)' }}>{d.text}</div>))}<h1 className={`font-black mb-8 ${words[currentWord].color} transition-all duration-300 relative z-40 drop-shadow-2xl bg-black/80 px-8 py-4 rounded-2xl border border-gray-600 ${isPresentation ? 'text-9xl' : 'text-8xl'}`}>{words[currentWord].text}</h1><div className="flex gap-4 justify-center relative z-50"><button onClick={handleNext} className={`bg-gray-700 hover:bg-gray-600 text-white rounded shadow-lg border border-gray-500 ${isPresentation ? 'px-8 py-4 text-xl' : 'px-6 py-2'}`}>Next Stimulus</button></div></div>)}{started && (<div className="absolute bottom-0 w-full bg-gray-900/90 p-4 border-t border-gray-700 backdrop-blur-sm z-30">{dysfunction ? (<div className={`text-red-300 animate-fadeIn ${isPresentation ? 'text-xl' : 'text-sm'}`}><strong className={`block uppercase tracking-widest text-red-500 mb-1 ${isPresentation ? 'text-sm' : 'text-xs'}`}>Analysis: Stirling et al. (2006)</strong>With Central Control Dysfunction, patients take <strong>twice as long</strong> to name the color. The cognitive noise (distractors) makes suppressing the automatic reading response nearly impossible.</div>) : (<div className={`text-green-300 animate-fadeIn ${isPresentation ? 'text-xl' : 'text-sm'}`}><strong className={`block uppercase tracking-widest text-green-500 mb-1 ${isPresentation ? 'text-sm' : 'text-xs'}`}>Analysis: Normal Function</strong>Central Control is intact. You can suppress the automatic urge to read text and focus on the ink color.</div>)}</div>)}</div>
    </div>
  );
};

export default StroopSim;