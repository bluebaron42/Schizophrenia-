import React from 'react';
import { SlideProps } from '../types';

const Slide: React.FC<SlideProps> = ({ children, isPresentation }) => (
  <div className={`flex flex-col h-full animate-fadeIn text-gray-100 mx-auto w-full transition-all duration-300 ${isPresentation ? 'p-6 max-w-[98vw] text-2xl' : 'p-8 max-w-7xl text-base'}`}>
    <div className={`flex-grow overflow-y-auto pr-2 custom-scrollbar flex flex-col ${isPresentation ? 'gap-6' : 'gap-6'}`}>
      {children}
    </div>
  </div>
);

export default Slide;