import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

export interface Lesson {
  id: number;
  title: string;
  active: boolean;
  complete?: boolean;
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

export interface Patient {
  id: string;
  age: number;
  vignette: string;
  obs: string[];
  dsm: boolean;
  icd: boolean;
  feedback: string;
}

export interface CardData {
  title: string;
  icon: LucideIcon;
  color: string;
  borderColor: string;
  bgColor: string;
  content: ReactNode;
}

export interface SlideProps {
  children: ReactNode;
  isPresentation: boolean;
}

export interface PhaseHeaderProps {
  phase: string;
  title: string;
  icon: LucideIcon;
  time?: string;
  isPresentation: boolean;
}
