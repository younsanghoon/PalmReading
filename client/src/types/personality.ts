export interface PersonalityTestResult {
  testType: 'animal' | 'mbti' | 'enneagram' | 'palm';
  result: string;
  confidence?: number;
  description: string;
  traits: string[];
  timestamp: string;
}

export interface AnimalFaceResult {
  animalType: string;
  confidence: number;
  predictions: Array<{
    className: string;
    probability: number;
  }>;
  traits: string[];
  description: string;
}

export interface MBTIResult {
  type: string;
  dimensions: {
    E_I: number;
    S_N: number;
    T_F: number;
    J_P: number;
  };
  description: string;
  traits: string[];
}

export interface EnneagramResult {
  type: 'egen' | 'teto';
  score: number;
  description: string;
  traits: string[];
}

export interface PalmReadingResult {
  lifeLine: string;
  heartLine: string;
  headLine: string;
  fateLine: string;
  abilityLine: string;
  overall: string;
  description: string;
  traits: string[];
}

export interface Question {
  id: string;
  question: string;
  options: Array<{
    text: string;
    value: string;
  }>;
}

export interface TestProgress {
  currentQuestion: number;
  totalQuestions: number;
  answers: string[];
}
