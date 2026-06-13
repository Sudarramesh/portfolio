export interface Scheme {
  id: string;
  name: string;
  sponsor: string;
  category: 'Agriculture' | 'Health' | 'Education' | 'Housing' | 'Women' | 'Finance';
  description: string;
  image: string;
  benefits: string;
  benefitsLabel: string;
  timelineLabel: string;
  deadline?: string;
  eligibilityCriteria: {
    minAge?: number;
    maxAge?: number;
    maxIncome?: number; // annual income in Rupees
    allowedStates?: string[]; // empty means all states
    allowedOccupations?: string[]; // empty means all occupations (Farmer, Student, Self-employed, Salaried, Unemployed, etc.)
    gender?: 'All' | 'Female' | 'Male';
  };
  keyPoints: string[];
  documentsRequired: string[];
  tags: string[];
  
  // Hindi translations
  hiName?: string;
  hiSponsor?: string;
  hiDescription?: string;
  hiBenefits?: string;
  hiBenefitsLabel?: string;
  hiTimelineLabel?: string;
  hiDeadline?: string;
  hiKeyPoints?: string[];
  hiDocumentsRequired?: string[];

  // Tamil translations
  taName?: string;
  taSponsor?: string;
  taDescription?: string;
  taBenefits?: string;
  taBenefitsLabel?: string;
  taTimelineLabel?: string;
  taDeadline?: string;
  taKeyPoints?: string[];
  taDocumentsRequired?: string[];
}

export interface Application {
  referenceNumber: string;
  schemeId: string;
  schemeName: string;
  category: string;
  applicantName: string;
  applicantAge: number;
  applicantIncome: number;
  applicantState: string;
  applicantOccupation: string;
  applicantPhone: string;
  submissionDate: string;
  status: 'Submitted' | 'Verified' | 'Approved' | 'Disbursed';
  timeline: {
    status: string;
    date: string;
    description: string;
    completed: boolean;
  }[];
}

export interface EligibilityInput {
  age: string;
  annualIncome: string; // value or range index
  state: string;
  occupation: string;
  gender: string;
}
