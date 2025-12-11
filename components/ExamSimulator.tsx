import React, { useState } from 'react';
import { PenTool, CheckCircle, RefreshCw, AlertCircle, BookOpen, Brain, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { questionBank } from '../constants';

interface ExamSimulatorProps {
  isPresentation: boolean;
}

interface AIResponse {
  score: number;
  maxScore: number;
  feedback: string;
  modelAnswer: string | null;
}

const ExamSimulator: React.FC<ExamSimulatorProps> = ({ isPresentation }) => {
  const [selectedMark, setSelectedMark] = useState<6 | 8 | 16 | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [studentAnswer, setStudentAnswer] = useState('');
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
  const [isMarking, setIsMarking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateQuestion = (marks: 6 | 8 | 16) => {
    setSelectedMark(marks);
    const questions = questionBank[marks];
    const randomQ = questions[Math.floor(Math.random() * questions.length)];
    setCurrentQuestion(randomQ);
    setStudentAnswer('');
    setAiResponse(null);
    setError(null);
  };

  const handleMark = async () => {
    if (!currentQuestion || !studentAnswer) return;
    
    setIsMarking(true);
    setError(null);
    setAiResponse(null); 

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        You are a RUTHLESS and STRICT AQA A-Level Psychology Examiner.
        
        Task: Mark the following student answer for a Schizophrenia exam question.
        
        Question: "${currentQuestion}"
        Max Marks: ${selectedMark}
        Student Answer: "${studentAnswer}"
        
        Context:
        1. Classification/Diagnosis (DSM-5 vs ICD-10, Reliability, Validity, Co-morbidity, Symptom Overlap).
        2. Biological Explanations (Genetics/Ripke, Dopamine Hypothesis/Hyper/Hypo, Neural Correlates).
        3. Psychological Explanations (Family Dysfunction/Fromm-Reichmann/Bateson/EE, Cognitive/Frith/Metarepresentation/Central Control).
        4. Drug Therapies (Typical/Chlorpromazine, Atypical/Clozapine/Risperidone).

        Marking Rules:
        - Marking must be EXTREMELY CRITICAL. Treat this as a high-stakes exam.
        - Penalize vague language (e.g. using "chemicals" instead of "neurotransmitters", "brain parts" instead of "Ventral Striatum").
        - For 16 marks: Requires strict AO1 (Knowledge), AO2 (Application to scenario if present), and AO3 (Evaluation).
        - If the answer is less than 50 words, the maximum score is 25% of the total marks.
        - If the student misses the specific scenario (e.g. Ben/Louise) in an application question, cap the score at half marks.
        - If the score is less than 70% of the max marks, you MUST provide a "Model Answer".
        - If the score is 70% or higher, "modelAnswer" should be null.

        Output Format:
        Return ONLY valid JSON with this structure. Do not include markdown formatting like \`\`\`json.
        {
          "score": number,
          "feedback": "string (bullet points for strengths and weaknesses, specifically citing missing terminology)",
          "modelAnswer": "string (or null)"
        }
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      const resultText = response.text;
      
      if (resultText) {
        // Robust JSON extraction: Find the first '{' and the last '}'
        // This prevents crashes if the AI adds conversational text before/after the JSON
        const jsonMatch = resultText.match(/\{[\s\S]*\}/);
        
        if (jsonMatch) {
            const jsonString = jsonMatch[0];
            try {
                const parsed = JSON.parse(jsonString);
                
                // Sanitize feedback: ensure it is a string to prevent React Error #31
                let feedbackString = "";
                if (typeof parsed.feedback === 'string') {
                    feedbackString = parsed.feedback;
                } else if (typeof parsed.feedback === 'object' && parsed.feedback !== null) {
                    // Handle cases where AI ignores prompt and returns an object (e.g., { strengths: ..., weaknesses: ... })
                    if (Array.isArray(parsed.feedback)) {
                         feedbackString = parsed.feedback.map((item: any) => `- ${typeof item === 'string' ? item : JSON.stringify(item)}`).join('\n');
                    } else {
                        // Iterate through keys like 'strengths', 'weaknesses', 'improvements'
                        Object.entries(parsed.feedback).forEach(([key, value]) => {
                             const valStr = typeof value === 'string' ? value : JSON.stringify(value);
                             feedbackString += `**${key.toUpperCase()}**:\n${valStr}\n\n`;
                        });
                    }
                } else {
                    feedbackString = "No text feedback provided.";
                }

                setAiResponse({
                    score: typeof parsed.score === 'number' ? parsed.score : 0,
                    maxScore: selectedMark!,
                    feedback: feedbackString.trim(),
                    modelAnswer: parsed.modelAnswer || null
                });
            } catch (parseError) {
                console.error("JSON Parse Error:", parseError);
                setError("Error parsing examiner response. Please try again.");
            }
        } else {
            console.error("No JSON found in response:", resultText);
            setError("Examiner response format error. Please try again.");
        }
      } else {
          setError("No response from examiner.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to connect to examiner system. Please check internet or API Key.");
    } finally {
      setIsMarking(false);
    }
  };

  return (
    <div className={`h-full flex flex-col ${isPresentation ? 'p-12 gap-8' : 'p-6 gap-6'}`}>
      {/* Header / Selection */}
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className={`text-center space-y-2`}>
            <div className={`bg-purple-900/30 rounded-full inline-flex items-center justify-center mb-2 ${isPresentation ? 'p-6' : 'p-4'}`}>
                <PenTool size={isPresentation ? 48 : 24} className="text-purple-400" />
            </div>
            <h2 className={`font-bold text-white ${isPresentation ? 'text-5xl' : 'text-3xl'}`}>Exam Synthesis</h2>
            <p className={`text-gray-400 ${isPresentation ? 'text-2xl' : 'text-base'}`}>Select a question type to begin practice.</p>
        </div>
        
        <div className="flex gap-4">
            {[6, 8, 16].map((mark) => (
                <button
                    key={mark}
                    onClick={() => generateQuestion(mark as 6|8|16)}
                    className={`rounded-xl border-2 font-bold transition-all ${isPresentation ? 'px-8 py-4 text-2xl' : 'px-6 py-2 text-sm'} 
                    ${selectedMark === mark 
                        ? 'bg-purple-600 border-purple-400 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)]' 
                        : 'bg-gray-800 border-gray-600 text-gray-400 hover:border-purple-500 hover:text-white'}`}
                >
                    {mark} Marks
                </button>
            ))}
        </div>
      </div>

      {/* Workspace */}
      {currentQuestion && (
          <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeIn min-h-0">
              {/* Left: Question & Input */}
              <div className="flex flex-col gap-4 min-h-0">
                  <div className={`bg-gray-800 rounded-xl border-l-4 border-purple-500 shadow-xl ${isPresentation ? 'p-8' : 'p-6'}`}>
                      <h3 className={`font-bold text-gray-400 uppercase tracking-widest mb-2 ${isPresentation ? 'text-lg' : 'text-xs'}`}>Question</h3>
                      <p className={`text-white font-serif leading-relaxed ${isPresentation ? 'text-3xl' : 'text-xl'}`}>"{currentQuestion}"</p>
                      <div className="mt-4 flex justify-end">
                        <button onClick={() => generateQuestion(selectedMark!)} className="text-gray-500 hover:text-white flex items-center gap-1 text-xs uppercase font-bold"><RefreshCw size={12}/> New Question</button>
                      </div>
                  </div>
                  
                  <textarea
                    value={studentAnswer}
                    onChange={(e) => setStudentAnswer(e.target.value)}
                    placeholder="Type your answer here..."
                    className={`flex-grow w-full bg-black/30 border border-gray-700 rounded-xl text-gray-200 resize-none focus:outline-none focus:border-purple-500 p-6 font-mono ${isPresentation ? 'text-2xl' : 'text-base'}`}
                  />
                  
                  <button 
                    onClick={handleMark}
                    disabled={isMarking || !studentAnswer}
                    className={`w-full rounded-xl font-bold transition-all shadow-lg relative overflow-hidden group ${isPresentation ? 'py-6 text-3xl' : 'py-3 text-lg'} 
                    ${isMarking ? 'bg-gray-800 text-gray-400 cursor-not-allowed border border-gray-700' : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white'}`}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        {isMarking ? (
                            <>
                                <Brain className="animate-bounce" size={isPresentation ? 32 : 20}/>
                                Examiner is marking...
                            </>
                        ) : (
                            <>Submit to Examiner <Sparkles size={isPresentation ? 28 : 18}/></>
                        )}
                    </span>
                    {/* Animated Loading Bar Background */}
                    {isMarking && (
                        <div className="absolute inset-0 z-0">
                            <div className="absolute inset-0 bg-gray-800"></div>
                            <div className="h-full bg-purple-900/50 w-full animate-pulse"></div>
                            <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 w-full animate-[shimmer_2s_infinite]"></div>
                        </div>
                    )}
                  </button>
                  {error && <p className="text-red-400 text-center text-sm">{error}</p>}
              </div>

              {/* Right: Feedback Area */}
              <div className={`bg-gray-900/50 rounded-xl border border-gray-700 flex flex-col overflow-hidden relative ${isMarking ? 'border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.1)]' : ''}`}>
                  {isMarking ? (
                      <div className="flex flex-col items-center justify-center h-full space-y-6 animate-fadeIn p-8">
                          <div className="relative">
                              <div className={`rounded-full border-4 border-gray-800 border-t-purple-500 animate-spin ${isPresentation ? 'w-24 h-24' : 'w-16 h-16'}`}></div>
                              <Brain className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-purple-500 ${isPresentation ? 'w-10 h-10' : 'w-6 h-6'}`} />
                          </div>
                          <div className="text-center space-y-2 max-w-md">
                              <h4 className={`font-bold text-white ${isPresentation ? 'text-2xl' : 'text-lg'}`}>Analyzing Response</h4>
                              <p className={`text-gray-500 ${isPresentation ? 'text-xl' : 'text-sm'}`}>Consulting AQA Rubric, checking terminology, and validating evaluation points...</p>
                          </div>
                          {/* Progress Bar Visual */}
                          <div className={`w-2/3 bg-gray-800 rounded-full h-2 overflow-hidden shadow-inner`}>
                              <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 animate-[loading_2s_ease-in-out_infinite] w-1/3 rounded-full"></div>
                          </div>
                      </div>
                  ) : aiResponse ? (
                      <div className="flex-col flex h-full overflow-y-auto custom-scrollbar animate-fadeIn">
                          {/* Score Header */}
                          <div className={`border-b border-gray-700 flex items-center justify-between bg-gray-900 ${isPresentation ? 'p-8' : 'p-6'}`}>
                              <h3 className={`font-bold text-white ${isPresentation ? 'text-3xl' : 'text-xl'}`}>Examiner Feedback</h3>
                              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold ${aiResponse.score >= (aiResponse.maxScore * 0.7) ? 'bg-green-900 text-green-400 border border-green-500' : 'bg-red-900 text-red-400 border border-red-500'}`}>
                                  <CheckCircle size={isPresentation ? 32 : 20} />
                                  <span className={isPresentation ? 'text-3xl' : 'text-lg'}>{aiResponse.score} / {aiResponse.maxScore}</span>
                              </div>
                          </div>
                          
                          {/* Feedback Body */}
                          <div className={`flex-grow ${isPresentation ? 'p-8 space-y-6' : 'p-6 space-y-4'}`}>
                              <div className="prose prose-invert max-w-none">
                                  <h4 className={`text-purple-400 uppercase font-bold tracking-widest mb-2 ${isPresentation ? 'text-xl' : 'text-xs'}`}>Critique</h4>
                                  <div className={`text-gray-300 whitespace-pre-line leading-relaxed ${isPresentation ? 'text-2xl' : 'text-sm'}`}>{aiResponse.feedback}</div>
                              </div>

                              {aiResponse.modelAnswer && (
                                  <div className={`rounded-xl border-l-4 border-green-500 bg-green-900/10 animate-fadeIn ${isPresentation ? 'p-8' : 'p-4'}`}>
                                      <div className="flex items-center gap-2 mb-4 text-green-400">
                                          <BookOpen size={isPresentation ? 32 : 16} />
                                          <h4 className={`uppercase font-bold tracking-widest ${isPresentation ? 'text-xl' : 'text-xs'}`}>Model Answer</h4>
                                      </div>
                                      <p className={`text-gray-300 italic whitespace-pre-line leading-relaxed ${isPresentation ? 'text-2xl' : 'text-sm'}`}>
                                          "{aiResponse.modelAnswer}"
                                      </p>
                                  </div>
                              )}
                          </div>
                      </div>
                  ) : (
                      <div className="flex flex-col items-center justify-center h-full text-gray-600">
                          <AlertCircle size={isPresentation ? 64 : 48} className="mb-4 opacity-50"/>
                          <p className={isPresentation ? 'text-2xl' : 'text-sm'}>Feedback will appear here.</p>
                      </div>
                  )}
              </div>
          </div>
      )}
      <style>{`
        @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        @keyframes loading {
            0% { transform: translateX(-100%); }
            50% { transform: translateX(0%); }
            100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};

export default ExamSimulator;