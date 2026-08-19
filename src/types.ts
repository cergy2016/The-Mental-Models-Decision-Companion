export interface MentalModel {
  id: string;
  name: string;
  subtitle: string;
  category: 'Decision Making' | 'Strategic Thinking' | 'Problem Solving' | 'Productivity & Focus' | 'Risk & Uncertainty' | 'Human Behavior & Systems';
  thinker: string;
  definition: string;
  twoSentenceApplication: string;
  keyQuestion: string;
  microAction: string;
  quote?: string;
  quoteAuthor?: string;
  historicalCaseStudy?: string;
  blindSpotAvoided?: string;
  recommendedBook?: string;
  relatedModelIds?: string[];
  tagColor: {
    bg: string;
    text: string;
    border: string;
    accent: string;
  };
}

export interface DrawHistoryItem {
  id: string;
  model: MentalModel;
  dilemma: string;
  timestamp: number;
  notes?: string;
}
