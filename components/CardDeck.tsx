import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { CardData } from '../types';

interface CardDeckProps {
    cards: CardData[];
    isPresentation: boolean;
}

const CardDeck: React.FC<CardDeckProps> = ({ cards, isPresentation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextCard = () => setCurrentIndex((prev) => (prev + 1) % cards.length);
  const prevCard = () => setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  const CurrentIcon = cards[currentIndex].icon;

  return (
    <div className={`flex flex-col items-center justify-center h-full mx-auto ${isPresentation ? 'max-w-full' : 'max-w-4xl'}`}>
      <div className="w-full flex justify-between items-center mb-6">
        <button onClick={prevCard} className="p-4 bg-gray-800 hover:bg-gray-700 rounded-full border border-gray-600 hover:border-white group"><ChevronLeft size={isPresentation ? 40 : 24} className="text-gray-400 group-hover:text-white"/></button>
        <div className="flex flex-col items-center"><span className={`text-gray-500 font-bold uppercase tracking-widest mb-1 ${isPresentation ? 'text-lg' : 'text-xs'}`}>Card {currentIndex + 1} of {cards.length}</span><div className="flex gap-1">{cards.map((_, idx) => (<div key={idx} className={`rounded-full transition-all ${isPresentation ? 'h-3 w-16' : 'h-1.5 w-8'} ${idx === currentIndex ? cards[currentIndex].color.replace('text-', 'bg-') : 'bg-gray-800'}`}></div>))}</div></div>
        <button onClick={nextCard} className="p-4 bg-gray-800 hover:bg-gray-700 rounded-full border border-gray-600 hover:border-white group"><ChevronRight size={isPresentation ? 40 : 24} className="text-gray-400 group-hover:text-white"/></button>
      </div>
      <div className={`w-full bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden flex flex-col md:flex-row ${isPresentation ? 'h-[700px]' : 'h-[420px]'}`}>
        <div className={`md:w-1/3 p-8 flex flex-col justify-center items-center text-center border-r border-gray-700 ${cards[currentIndex].bgColor}`}><div className={`rounded-full bg-gray-900 border-2 ${cards[currentIndex].borderColor} mb-6 shadow-lg ${isPresentation ? 'p-14' : 'p-6'}`}><CurrentIcon size={isPresentation ? 140 : 64} className={cards[currentIndex].color} /></div><h3 className={`font-black uppercase tracking-tight ${cards[currentIndex].color} ${isPresentation ? 'text-6xl' : 'text-2xl'}`}>{cards[currentIndex].title}</h3></div>
        <div className={`md:w-2/3 flex flex-col justify-center overflow-y-auto custom-scrollbar ${isPresentation ? 'p-16 text-4xl leading-relaxed [&_.text-sm]:text-3xl [&_.text-sm]:leading-relaxed' : 'p-8 text-base'}`}>{cards[currentIndex].content}</div>
      </div>
    </div>
  );
};

export default CardDeck;