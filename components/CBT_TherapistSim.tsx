import React, { useState } from 'react';
import { User, FileSearch, CheckCircle } from 'lucide-react';

interface CBT_TherapistSimProps {
  isPresentation: boolean;
}

const CBT_TherapistSim: React.FC<CBT_TherapistSimProps> = ({ isPresentation }) => {
  const [sessionState, setSessionState] = useState('select'); // select, overview, dialogue, summary
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [currentTurn, setCurrentTurn] = useState(1);
  const [feedback, setFeedback] = useState<any>(null);
  const [score, setScore] = useState(0);

  // --- 1. PATIENT DATA ---
  const patients = [
    { 
      id: 0, 
      name: "Ralph", 
      symptom: "Auditory Hallucinations", 
      history: "Ralph (24) has a 3-year history of Schizophrenia. He hears a male voice ('The Controller') that provides a running commentary on his actions and commands him not to eat 'poisoned' food. He is underweight and socially isolated.",
      risk: "Self-neglect (Diet)",
      color: "text-pink-400",
      bg: "bg-pink-900/20",
      border: "border-pink-500"
    },
    { 
      id: 1, 
      name: "Sofia", 
      symptom: "Persecutory Delusions", 
      history: "Sofia (35) believes her postman is an MI5 handler. She interprets neutral events (red vans, wrong numbers) as evidence of surveillance. She has covered her windows with foil and refuses to use phones.",
      risk: "Social Withdrawal / Paranoia",
      color: "text-purple-400",
      bg: "bg-purple-900/20",
      border: "border-purple-500"
    },
    { 
      id: 2, 
      name: "Marcus", 
      symptom: "Delusions of Grandeur", 
      history: "Marcus (29) believes he can control the weather with his emotions. When it rains, he feels guilty for 'being sad'. He stops taking medication because he believes it blocks his 'powers'.",
      risk: "Non-compliance with medication",
      color: "text-yellow-400",
      bg: "bg-yellow-900/20",
      border: "border-yellow-500"
    }
  ];

  // --- 2. DIALOGUE TREES (5 TURNS PER PATIENT) ---
  const dialogues: any = {
    // === RALPH (VOICES) ===
    0: {
      1: {
        stage: "Engagement & Trust",
        patient: "I can't eat that sandwich. The Controller says it's full of cyanide. He'll punish me if I eat it.",
        options: [
          { text: "Ralph, we've tested the food. There is no cyanide. You need to eat.", type: "Confrontation (Weak)", outcome: "bad", fb: "Directly challenging the delusion too early breaks rapport. Ralph feels you don't understand his reality." },
          { text: "It must be terrifying to have someone constantly threatening you like that. I can see why you're scared.", type: "Empathy (Strong)", outcome: "good", fb: "Correct. Establishing a therapeutic alliance requires validating his distress, even if you don't validate the delusion." },
          { text: "Who is The Controller?", type: "Assessment (Neutral)", outcome: "neutral", fb: "Okay, but focuses on the content of the hallucination rather than the patient's distress." }
        ]
      },
      2: {
        stage: "Assessment (ABC Model)",
        patient: "He tells me I'm worthless every time I try to do anything. It makes me just want to sit in the dark.",
        options: [
          { text: "Let's break this down. The voice speaks (A), you believe it means you are bad (B), so you isolate yourself (C).", type: "ABC Model Analysis", outcome: "good", fb: "Excellent. You are helping Ralph understand the link between the 'Activating Event' and the 'Consequence'." },
          { text: "Why do you listen to him?", type: "Judgmental", outcome: "bad", fb: "Implies Ralph has a choice, increasing guilt." },
          { text: "Have you taken your meds today?", type: "Medical Model", outcome: "neutral", fb: "Important, but this is a CBT session, not a psychiatric review." }
        ]
      },
      3: {
        stage: "Normalisation",
        patient: "I'm the only one. Everyone else is normal. I'm just a freak with a voice in my head.",
        options: [
          { text: "Actually, hearing voices is more common than you think. It's often just our own 'inner speech' attributed to the outside.", type: "Normalisation", outcome: "good", fb: "Correct. Normalisation reduces stigma and anxiety, making the symptoms less frightening." },
          { text: "Yes, it is very rare.", type: "Reinforcing Stigma", outcome: "bad", fb: "This increases his isolation and anxiety." },
          { text: "Don't worry about what others think.", type: "Reassurance", outcome: "neutral", fb: "Well-meaning but dismissive of his real fears." }
        ]
      },
      4: {
        stage: "Critical Analysis (Reality Testing)",
        patient: "But he knows everything. He knows I'm weak. He's powerful.",
        options: [
          { text: "If he is so powerful, why does he need you to starve yourself to hurt you? Why can't he just do it?", type: "Logical Dispute", outcome: "good", fb: "Strong. You are gently challenging the internal logic of the delusion to plant a seed of doubt." },
          { text: "He isn't real, Ralph.", type: "Denial", outcome: "bad", fb: "Ralph experiences the voice as real. Denying it just makes him defensive." },
          { text: "Let's ignore him for a bit.", type: "Distraction", outcome: "neutral", fb: "Distraction is a valid coping strategy, but doesn't challenge the underlying belief." }
        ]
      },
      5: {
        stage: "Alternative Explanations",
        patient: "I suppose... maybe he's just a bully. Like my dad was.",
        options: [
          { text: "Exactly. Maybe The Controller is a memory of that bullying, not a real person.", type: "Developing Alternative Explanations", outcome: "good", fb: "Perfect closure. You've moved him from a supernatural explanation to a psychological one." },
          { text: "Your dad was a bad man.", type: "Psychoanalysis", outcome: "neutral", fb: "Focusing too much on the past rather than the current symptom management." },
          { text: "Let's see if we can eat that sandwich now.", type: "Behavioral Test", outcome: "good", fb: "Good practical application, though establishing the new belief first is stronger." }
        ]
      }
    },
    // === SOFIA (PARANOIA) ===
    1: {
      1: {
        stage: "Engagement",
        patient: "Don't write anything down! They'll read your notes. The postman is scanning them.",
        options: [
          { text: "I'm required to take notes, Sofia.", type: "Rigidity", outcome: "bad", fb: "Prioritizing protocol over patient anxiety destroys the alliance immediately." },
          { text: "Okay, I'll put the pen away. Let's just talk. I want you to feel safe here.", type: "Therapeutic Alliance", outcome: "good", fb: "Correct. You prioritized safety and trust over procedure." },
          { text: "The postman doesn't work for MI5.", type: "Confrontation", outcome: "neutral", fb: "Too early to challenge. She isn't ready to hear this yet." }
        ]
      },
      2: {
        stage: "Assessment",
        patient: "I saw a red van parked outside my house this morning. That's the signal. They are coming for me.",
        options: [
          { text: "Red vans are very common. It's a coincidence.", type: "Dismissal", outcome: "neutral", fb: "True, but she will likely reject this as you 'not understanding' the plot." },
          { text: "So, the 'Activating Event' was the van, and the 'Belief' is that it's a signal?", type: "ABC Assessment", outcome: "good", fb: "Good. You are structuring her chaotic thoughts into a manageable framework." },
          { text: "What will they do when they catch you?", type: "Exploration", outcome: "neutral", fb: "Valid information gathering, but risks feeding the delusion." }
        ]
      },
      3: {
        stage: "Reality Testing (Empirical)",
        patient: "It's not a coincidence. It was parked there for 10 minutes. Watching.",
        options: [
          { text: "Let's walk to the window. Is it still there? Can we check the registration plate?", type: "Empirical Testing", outcome: "good", fb: "Excellent. Using physical evidence to test the belief in the here-and-now." },
          { text: "You are imagining it.", type: "Gaslighting", outcome: "bad", fb: "Invalidating her perception." },
          { text: "Maybe it was a delivery driver?", type: "Alternative Explanation", outcome: "neutral", fb: "Good, but stronger if you get her to generate this idea." }
        ]
      },
      4: {
        stage: "Reality Testing (Logical)",
        patient: "They use red vans so they can hide in plain sight. It's a double bluff.",
        options: [
          { text: "If MI5 wanted to be secret, wouldn't a grey car be better? A bright red van draws attention.", type: "Logical Dispute", outcome: "good", fb: "Correct. You are exposing the flaw in the logic of the delusion." },
          { text: "That sounds like a movie plot.", type: "Minimisation", outcome: "bad", fb: "Mocking the patient's reality." },
          { text: "I suppose that is possible.", type: "Collusion", outcome: "bad", fb: "Never validate the delusion as fact." }
        ]
      },
      5: {
        stage: "Alternative Explanation",
        patient: "I guess... maybe it was just a Royal Mail van. I feel silly.",
        options: [
          { text: "Don't feel silly. Your brain is just hyper-alert to danger right now. That's a survival instinct gone into overdrive.", type: "De-stigmatisation", outcome: "good", fb: "Perfect. You reframed her paranoia as a biological mechanism, reducing shame." },
          { text: "At least you know now.", type: " condescension", outcome: "bad", fb: "Lacks empathy." },
          { text: "Let's try to look at the next van differently.", type: "Goal Setting", outcome: "good", fb: "Good behavioural goal." }
        ]
      }
    },
    // === MARCUS (GRANDEUR) ===
    2: {
      1: {
        stage: "Engagement",
        patient: "I don't need therapy. I controlled the storm last night. I am evolving beyond this.",
        options: [
          { text: "You can't control weather, Marcus. That's impossible.", type: "Reality Check", outcome: "bad", fb: "Direct challenge to Grandeur usually results in the patient dismissing YOU as 'unenlightened'." },
          { text: "It must be terrifying to have that kind of connection to the world. Tell me about it.", type: "Validation of Feeling", outcome: "good", fb: "Correct. Validate the emotion (power/connection) to build the alliance." },
          { text: "Did you take your pills?", type: "Directive", outcome: "neutral", fb: "He will likely reject this if he feels powerful." }
        ]
      },
      2: {
        stage: "Assessment",
        patient: "When I feel heavy, it rains. When I smile, the sun comes out. I have to stay happy or people will drown.",
        options: [
          { text: "That sounds like a huge responsibility to carry alone.", type: "Empathy/Reframing", outcome: "good", fb: "Good. You are identifying the 'Consequence' (burden/stress) of the belief." },
          { text: "The weather forecast predicts rain regardless of your mood.", type: "Empirical Dispute", outcome: "neutral", fb: "A bit too early for facts. He is still in the 'magical' phase." },
          { text: "So you are God?", type: "Clarification", outcome: "bad", fb: "Can be seen as mocking." }
        ]
      },
      3: {
        stage: "Reality Testing (Empirical)",
        patient: "It rained yesterday because I was depressed about my job.",
        options: [
          { text: "Let's look at the BBC weather report from 2 days ago. Did they predict rain *before* you felt sad?", type: "Empirical Dispute", outcome: "good", fb: "Correct. Using objective timeline data to break the link between Cause (Mood) and Effect (Weather)." },
          { text: "Your mood doesn't change physics.", type: "Logical Dispute", outcome: "neutral", fb: "True, but less convincing than the timeline evidence." },
          { text: "Maybe you were sad *because* it was raining?", type: "Reverse Causality", outcome: "good", fb: "A strong alternative explanation." }
        ]
      },
      4: {
        stage: "Reality Testing (Logical)",
        patient: "But what if the forecast was wrong? What if I changed it?",
        options: [
          { text: "If you control the weather, why didn't you stop the drought last summer? You wanted it to stop, right?", type: "Logical Dispute", outcome: "good", fb: "Excellent. Using his own history/desires to show inconsistencies in his power." },
          { text: "You are just one person, Marcus.", type: "Minimisation", outcome: "bad", fb: "Doesn't address the specific belief." },
          { text: "Let's try to make it snow right now.", type: "Behavioural Experiment", outcome: "neutral", fb: "Risky. If it happens to snow, you reinforce the delusion!" }
        ]
      },
      5: {
        stage: "Coping Strategy",
        patient: "I guess I couldn't stop the drought. Maybe I'm just very sensitive to the weather.",
        options: [
          { text: "That makes a lot of sense. You are empathetic to the world, but you don't cause it.", type: "Reframing", outcome: "good", fb: "Correct. You keep his self-esteem (empathetic) while removing the delusional responsibility." },
          { text: "Yes, you are just normal.", type: "Labeling", outcome: "neutral", fb: " 'Normal' can feel boring to someone who felt special." },
          { text: "Now will you take your meds?", type: "Compliance", outcome: "good", fb: "Good time to re-introduce medication adherence." }
        ]
      }
    }
  };

  const handleSelect = (patient: any) => {
    setSelectedPatient(patient);
    setSessionState('overview');
    setFeedback(null);
    setCurrentTurn(1);
    setScore(0);
  };

  const handleChoice = (opt: any) => {
    const points = opt.outcome === 'good' ? 1 : 0;
    setScore(prev => prev + points);
    setFeedback(opt);
  };

  const nextTurn = () => {
    setFeedback(null);
    if (currentTurn < 5) {
      setCurrentTurn(prev => prev + 1);
    } else {
      setSessionState('summary');
    }
  };

  const reset = () => {
    setSessionState('select');
    setSelectedPatient(null);
    setFeedback(null);
    setCurrentTurn(1);
    setScore(0);
  };

  // --- RENDER ---
  return (
    <div className={`h-full flex flex-col ${isPresentation ? 'gap-8' : 'gap-6'}`}>
      
      {/* HEADER */}
      <div className="flex justify-between items-center border-b border-gray-700 pb-2">
         <h3 className={`font-bold text-white ${isPresentation ? 'text-3xl' : 'text-xl'}`}>
             {sessionState === 'select' ? "Waiting Room" : `Patient: ${selectedPatient?.name} (Turn ${currentTurn}/5)`}
         </h3>
         {sessionState !== 'select' && <button onClick={reset} className="text-gray-400 hover:text-white text-xs uppercase font-bold">End Session</button>}
      </div>

      {/* 1. SELECT PATIENT */}
      {sessionState === 'select' && (
          <div className="grid grid-cols-3 gap-4 h-full">
              {patients.map(p => (
                  <button key={p.id} onClick={() => handleSelect(p)} className={`bg-gray-800 border border-gray-700 rounded-xl hover:border-blue-500 hover:bg-gray-700 transition-all flex flex-col items-center justify-center text-center ${isPresentation ? 'p-10' : 'p-6'}`}>
                      <User size={isPresentation ? 80 : 48} className={`mb-4 ${p.color}`} />
                      <h4 className={`text-white font-bold mb-1 ${isPresentation ? 'text-3xl' : 'text-lg'}`}>{p.name}</h4>
                      <span className={`text-gray-400 ${isPresentation ? 'text-xl' : 'text-xs'}`}>{p.symptom}</span>
                  </button>
              ))}
          </div>
      )}

      {/* 2. OVERVIEW */}
      {sessionState === 'overview' && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-6 animate-fadeIn">
              <FileSearch size={isPresentation ? 100 : 64} className="text-blue-400 mb-2" />
              <div className={`bg-gray-900 border border-gray-700 rounded-xl max-w-3xl ${isPresentation ? 'p-10' : 'p-6'}`}>
                <h3 className={`font-bold text-white mb-4 ${isPresentation ? 'text-4xl' : 'text-2xl'}`}>Case File: {selectedPatient.name}</h3>
                <div className={`text-left space-y-4 ${isPresentation ? 'text-2xl' : 'text-sm'}`}>
                    <p className="text-gray-300"><strong className="text-blue-400">History:</strong> {selectedPatient.history}</p>
                    <p className="text-gray-300"><strong className="text-red-400">Primary Risk:</strong> {selectedPatient.risk}</p>
                </div>
              </div>
              <button onClick={() => setSessionState('dialogue')} className={`bg-blue-600 text-white rounded-full font-bold shadow-lg hover:bg-blue-500 transition-all ${isPresentation ? 'px-12 py-6 text-2xl' : 'px-8 py-3'}`}>Begin Therapy</button>
          </div>
      )}

      {/* 3. DIALOGUE LOOP */}
      {sessionState === 'dialogue' && (
          <div className={`grid grid-cols-1 lg:grid-cols-2 h-full ${isPresentation ? 'gap-12' : 'gap-8'}`}>
             {/* Patient Side */}
             <div className="bg-gray-900 rounded-xl border border-gray-700 flex flex-col items-center justify-center p-8 relative">
                 <div className={`absolute top-4 left-4 bg-black/50 px-3 py-1 rounded text-gray-400 font-mono text-xs uppercase`}>
                    Stage {currentTurn}: {dialogues[selectedPatient.id][currentTurn].stage}
                 </div>
                 <User size={isPresentation ? 120 : 80} className={`mb-6 ${selectedPatient.color}`} />
                 <div className={`bg-black/60 p-6 rounded-2xl border border-gray-600 text-center ${isPresentation ? 'text-2xl' : 'text-lg'}`}>
                     <p className="text-white italic">"{dialogues[selectedPatient.id][currentTurn].patient}"</p>
                 </div>
             </div>

             {/* Therapist Side */}
             <div className="flex flex-col justify-center gap-4">
                 {!feedback ? (
                    <div className="space-y-3 animate-slideInRight">
                        <strong className={`text-gray-400 uppercase tracking-widest ${isPresentation ? 'text-xl' : 'text-xs'}`}>Choose Intervention</strong>
                        {dialogues[selectedPatient.id][currentTurn].options.map((opt: any, idx: number) => (
                            <button 
                                key={idx} 
                                onClick={() => handleChoice(opt)}
                                className={`w-full text-left rounded-lg border p-4 transition-all bg-gray-800 border-gray-600 hover:border-blue-500 hover:bg-gray-700 ${isPresentation ? 'text-xl' : 'text-sm'}`}
                            >
                                {opt.text}
                            </button>
                        ))}
                    </div>
                 ) : (
                     <div className={`rounded-lg border-l-4 animate-fadeIn ${feedback.outcome === 'good' ? 'bg-green-900/20 border-green-500' : feedback.outcome === 'bad' ? 'bg-red-900/20 border-red-500' : 'bg-gray-800 border-gray-500'} ${isPresentation ? 'p-6' : 'p-4'}`}>
                         <div className="flex justify-between items-center mb-2">
                             <strong className={`${feedback.outcome === 'good' ? 'text-green-400' : feedback.outcome === 'bad' ? 'text-red-400' : 'text-gray-400'} ${isPresentation ? 'text-2xl' : 'text-lg'}`}>
                                 {feedback.outcome === 'good' ? "Effective" : feedback.outcome === 'bad' ? "Ineffective" : "Neutral"}
                             </strong>
                             <span className={`text-white bg-black/40 px-2 py-1 rounded font-bold uppercase ${isPresentation ? 'text-sm' : 'text-[10px]'}`}>{feedback.type}</span>
                         </div>
                         <p className={`text-gray-300 ${isPresentation ? 'text-xl' : 'text-sm'}`}>{feedback.fb}</p>
                         <button onClick={nextTurn} className={`mt-4 bg-blue-600 hover:bg-blue-500 text-white rounded font-bold w-full ${isPresentation ? 'py-3 text-lg' : 'py-2 text-sm'}`}>
                            {currentTurn < 5 ? "Next Turn" : "Finish Session"}
                         </button>
                     </div>
                 )}
             </div>
          </div>
      )}

      {/* 4. SUMMARY */}
      {sessionState === 'summary' && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-6 animate-fadeIn">
              <CheckCircle size={isPresentation ? 100 : 64} className={score >= 4 ? "text-green-500" : "text-yellow-500"} />
              <h3 className={`font-bold text-white ${isPresentation ? 'text-5xl' : 'text-3xl'}`}>Session Complete</h3>
              <p className={`text-gray-300 ${isPresentation ? 'text-3xl' : 'text-xl'}`}>Therapeutic Alliance Score: <span className="text-white font-bold">{score}/5</span></p>
              <div className={`bg-gray-900 p-6 rounded-xl border border-gray-700 max-w-2xl ${isPresentation ? 'text-xl' : 'text-sm'}`}>
                  <p className="text-gray-400">
                      {score >= 4 ? "Excellent work. You successfully navigated the ABCDE model, establishing trust (Engagement) before gently challenging the delusions (Dispute) and helping the patient find Alternative Explanations." 
                      : "You established some rapport, but may have challenged the patient too early or colluded with their delusions. Remember: Assessment -> Engagement -> ABC -> Normalisation -> Dispute."}
                  </p>
              </div>
              <button onClick={reset} className={`bg-gray-700 text-white rounded-full font-bold hover:bg-gray-600 ${isPresentation ? 'px-12 py-6 text-2xl' : 'px-8 py-3'}`}>Next Patient</button>
          </div>
      )}
    </div>
  );
};

export default CBT_TherapistSim;