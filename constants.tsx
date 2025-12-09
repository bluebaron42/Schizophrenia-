import React from 'react';
import { 
  Scale, 
  CheckCircle, 
  Layers, 
  AlertTriangle, 
  Users 
} from 'lucide-react';
import { Lesson, Question, Patient, CardData } from './types';

export const lessons: Lesson[] = [
  { id: 1, title: "01: Classification & Diagnosis", active: true, complete: true },
  { id: 2, title: "02: Biological Explanations", active: true, complete: true },
  { id: 3, title: "03: Psychological Explanations", active: true, complete: true },
  { id: 4, title: "04: Drug Therapies", active: true, complete: false },
  { id: 5, title: "05: Psychological Therapies", active: false },
  { id: 6, title: "06: Management (Token Economies)", active: false },
  { id: 7, title: "07: Interactionist Approach", active: false },
  { id: 8, title: "08: Review & Synthesis", active: false },
];

export const lesson1DoNow: Question[] = [ 
  { id: 1, question: "Which definition of abnormality focuses on behavior that is statistically rare?", options: ["Deviation from Social Norms", "Statistical Infrequency", "Failure to Function"], correct: 1 }, 
  { id: 2, question: "Rosenhan & Seligman suggested 'Personal Distress' is a feature of:", options: ["Failure to Function Adequately", "Ideal Mental Health", "Deviation from Norms"], correct: 0 }, 
  { id: 3, question: "Jahoda's criteria for Ideal Mental Health included:", options: ["Self-Actualisation", "Hearing Voices", "Avoidance of problems"], correct: 0 }, 
  { id: 4, question: "Reliability in a clinical context refers to:", options: ["The accuracy of the diagnosis", "The consistency of the diagnosis", "The severity of the disorder"], correct: 1 }, 
  { id: 5, question: "Which classification system is produced by the WHO?", options: ["DSM-5", "ICD-10", "The Mental Health Act"], correct: 1 } 
];

export const lesson2DoNow: Question[] = [
  { id: 1, question: "Recap: Which researcher found poor inter-rater reliability (DSM vs ICD)?", options: ["Gottesman", "Cheniaux et al.", "Buckley et al."], correct: 1 },
  { id: 2, question: "Biopsych: What is a genotype?", options: ["The physical expression of genes", "The particular set of genes a person possesses", "The environment's effect on genes"], correct: 1 },
  { id: 3, question: "Biopsych: Which neurotransmitter is generally associated with pleasure/reward?", options: ["Serotonin", "Dopamine", "GABA"], correct: 1 },
  { id: 4, question: "Diagnosis: Avolition is classified as which type of symptom?", options: ["Positive", "Negative", "Cognitive"], correct: 1 },
  { id: 5, question: "Biopsych: Monozygotic (MZ) twins share what % of genes?", options: ["50%", "100%", "25%"], correct: 1 }
];

export const lesson3DoNow: Question[] = [ 
  { id: 1, question: "Year 1 Psychodynamic: According to Freud, which part of the mind operates on the 'Reality Principle'?", options: ["Id", "Ego", "Superego"], correct: 1 }, 
  { id: 2, question: "Year 1 Cognitive: What is a 'Schema'?", options: ["A neurotransmitter", "A mental framework/package of information", "A defense mechanism"], correct: 1 }, 
  { id: 3, question: "Year 1 Approaches: Which approach emphasizes the role of the environment and upbringing?", options: ["Biological", "Behaviourist/Learning", "Cognitive"], correct: 1 }, 
  { id: 4, question: "Bio Recap: Hyperdopaminergia in the subcortex is linked to which symptoms?", options: ["Negative (Avolition)", "Positive (Hallucinations)", "Cognitive Deficits"], correct: 1 }, 
  { id: 5, question: "Bio Recap: Who studied 37,000 patients to find 108 genetic loci?", options: ["Gottesman", "Tienari", "Ripke"], correct: 2 } 
];

export const lesson4DoNow: Question[] = [
  { id: 1, question: "Year 1 Bio: What happens when a neurotransmitter binds to a receptor?", options: ["It creates a new neuron", "It triggers an electrical impulse (excitatory/inhibitory)", "It destroys the synapse"], correct: 1 },
  { id: 2, question: "Lesson 2 Recap: The original dopamine hypothesis suggests schizophrenia is caused by...", options: ["Too little dopamine in the cortex", "Too much dopamine in the subcortex", "Too much serotonin"], correct: 1 },
  { id: 3, question: "Year 1 Bio: What is an 'Antagonist' drug?", options: ["It mimics a neurotransmitter", "It blocks a neurotransmitter receptor", "It increases production"], correct: 1 },
  { id: 4, question: "Lesson 1 Recap: Which is a Positive Symptom?", options: ["Avolition", "Speech Poverty", "Hallucinations"], correct: 2 },
  { id: 5, question: "General: What is a placebo?", options: ["A strong drug", "An inert substance with no physical effect", "A type of therapy"], correct: 1 }
];

export const patientFiles: Patient[] = [
  { id: "David", age: 24, vignette: "David has not left his parents' home in six weeks. His mother reports that he has stopped washing his clothes and rarely showers, appearing unkempt with matted hair (Avolition: Hygiene). He spends most days sitting in his room staring at the wall for hours, showing no motivation to find work or engage in hobbies (Avolition: Lack of Energy). When his mother asks him questions, he responds with one-word answers or silence, often taking a long time to reply (Speech Poverty). He denies hearing voices or having any special powers.", obs: ["Severe Avolition (Hygiene & Energy)", "Speech Poverty (Alogia)", "No Hallucinations", "No Delusions"], dsm: false, icd: true, feedback: "David exhibits two clear Negative Symptoms (Avolition & Speech Poverty) but NO Positive Symptoms. Therefore, he meets the criteria for ICD-10 (2+ Negative) but NOT DSM-5 (Requires 1+ Positive)." },
  { id: "Sarah", age: 31, vignette: "Sarah was brought in by police after attempting to enter Buckingham Palace. She claims she is a 'secret liaison' to the King and has been sent to deliver a coded warning about an alien invasion (Delusions of Grandeur & Persecution). She appears highly agitated and frequently glances at the corner of the room, shouting 'Be quiet!' at empty space (Auditory/Visual Hallucinations). She is articulate and well-dressed.", obs: ["Delusions (Grandeur & Persecution)", "Hallucinations (Auditory/Visual)", "No Negative Symptoms reported"], dsm: true, icd: true, feedback: "Sarah exhibits multiple Positive Symptoms (Delusions & Hallucinations). Both classification systems recognise these as sufficient for a diagnosis of Schizophrenia." },
  { id: "Michael", age: 45, vignette: "Michael reports feeling profoundly sad for the past 6 months. He struggles to sleep and has lost his appetite. He admits to drinking a bottle of wine every night to 'numb the pain'. He mentions that mostly when he is drunk or falling asleep, he sometimes hears his deceased mother calling his name. He knows this isn't real. He has no irrational beliefs about his importance or safety.", obs: ["Low Mood (Potential Depression)", "Substance Abuse", "Transient Hallucinations (Insight present)", "No Delusions"], dsm: false, icd: false, feedback: "Michael's symptoms strongly suggest Depression and Substance Abuse (Co-morbidity issues). His hallucinations are transient and he has insight. He likely does not meet the threshold for Schizophrenia in either system." },
  { id: "Priya", age: 19, vignette: "Priya is a university student who has stopped attending lectures. She reports a constant running commentary in her head by two distinct voices that criticise her actions ('You are stupid', 'Don't eat that'). She finds this terrifying. Despite this, she maintains her personal hygiene and tries to study at home, though she finds it difficult to concentrate. She does not believe she is being persecuted.", obs: ["Auditory Hallucinations (Voices commenting)", "No Delusions", "No Avolition"], dsm: true, icd: true, feedback: "Priya presents with a clear Positive Symptom: Auditory Hallucinations. Under DSM-5, one positive symptom is sufficient. Under ICD-10, persistent hallucinations are also sufficient." }
];

export const diagnosisCards: CardData[] = [
    { title: "Reliability", icon: Scale, color: "text-red-400", borderColor: "border-red-500", bgColor: "bg-red-900/10", content: <div className="space-y-4"><p className="text-gray-300">Inter-rater reliability refers to the extent to which different professionals agree on a diagnosis.</p><div className="bg-black/30 p-4 rounded-lg border-l-4 border-red-500"><strong className="text-red-300 block mb-2">Cheniaux et al. (2009)</strong><p className="text-gray-400 text-sm">Two psychiatrists independently diagnosed 100 patients.<br/><span className="text-white font-bold">Dr A:</span> 26 (DSM), 44 (ICD). <br/><span className="text-white font-bold">Dr B:</span> 13 (DSM), 24 (ICD).</p></div><p className="text-gray-300 font-bold bg-gray-800 p-3 rounded">Conclusion: Poor reliability.</p></div> },
    { title: "Validity", icon: CheckCircle, color: "text-orange-400", borderColor: "border-orange-500", bgColor: "bg-orange-900/10", content: <div className="space-y-4"><p className="text-gray-300">Criterion Validity: Do different systems arrive at the same diagnosis?</p><div className="bg-black/30 p-4 rounded-lg border-l-4 border-orange-500"><strong className="text-orange-300 block mb-2">Issue (Cheniaux)</strong><p className="text-gray-400 text-sm">Schizophrenia is much more likely to be diagnosed using ICD than DSM. Suggests DSM is <span className="text-white font-bold">under-diagnosing</span> or ICD is <span className="text-white font-bold">over-diagnosing</span>.</p></div><p className="text-gray-300 font-bold bg-gray-800 p-3 rounded">Conclusion: Poor criterion validity.</p></div> },
    { title: "Co-morbidity", icon: Layers, color: "text-yellow-400", borderColor: "border-yellow-500", bgColor: "bg-yellow-900/10", content: <div className="space-y-4"><p className="text-gray-300">Two or more conditions occurring together.</p><div className="bg-black/30 p-4 rounded-lg border-l-4 border-yellow-500"><strong className="text-yellow-300 block mb-2">Buckley et al. (2009)</strong><p className="text-gray-400 text-sm">High co-morbidity rates: <br/>• Depression (50%) <br/>• Substance Abuse (47%) <br/>• PTSD (29%)</p></div><p className="text-gray-300 font-bold bg-gray-800 p-3 rounded">Impact: Questionable validity of classification.</p></div> },
    { title: "Symptom Overlap", icon: AlertTriangle, color: "text-green-400", borderColor: "border-green-500", bgColor: "bg-green-900/10", content: <div className="space-y-4"><p className="text-gray-300">Overlap between symptoms of schizophrenia and Bipolar Disorder.</p><div className="bg-black/30 p-4 rounded-lg border-l-4 border-green-500"><strong className="text-green-300 block mb-2">Bipolar vs. Schizophrenia</strong><p className="text-gray-400 text-sm">Both involve Positive-like symptoms (Mania/Delusions) and Negative-like symptoms (Depression/Avolition).</p></div><p className="text-gray-300 font-bold bg-gray-800 p-3 rounded">Consequence: Hard to distinguish conditions.</p></div> },
    { title: "Gender Bias", icon: Users, color: "text-blue-400", borderColor: "border-blue-500", bgColor: "bg-blue-900/10", content: <div className="space-y-4"><p className="text-gray-300">Men are diagnosed more often than women (1.4:1 ratio).</p><div className="bg-black/30 p-4 rounded-lg border-l-4 border-blue-500"><strong className="text-blue-300 block mb-2">Cotton et al. (2009)</strong><p className="text-gray-400 text-sm">Female patients function better (work/family). This <span className="text-white font-bold">masks symptoms</span>, leading to under-diagnosis.</p></div><p className="text-gray-300 font-bold bg-gray-800 p-3 rounded">Impact: Poor validity.</p></div> },
    { title: "Cultural Bias", icon: Users, color: "text-purple-400", borderColor: "border-purple-500", bgColor: "bg-purple-900/10", content: <div className="space-y-4"><p className="text-gray-300">African Americans are more likely to be diagnosed.</p><div className="bg-black/30 p-4 rounded-lg border-l-4 border-purple-500"><strong className="text-purple-300 block mb-2">Escobar (2012)</strong><p className="text-gray-400 text-sm">Hearing voices (ancestors) is culturally acceptable in some groups. White psychiatrists may view this as irrational (Ethnocentrism).</p></div><p className="text-gray-300 font-bold bg-gray-800 p-3 rounded">Impact: Cultural bias in diagnosis.</p></div> }
];