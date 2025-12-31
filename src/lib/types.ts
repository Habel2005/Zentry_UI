export type CallStatus = 'ongoing' | 'completed' | 'dropped' | 'failed';
export type CallHandler = 'ai' | 'human' | 'hybrid';
export type CallLanguage = 'EN' | 'ES' | 'FR' | 'DE' | string; // Allow other languages
export type STTQuality = 'good' | 'low' | 'failed';

export type TranscriptSegment = {
  speaker: 'user' | 'ai';
  text: string;
  timestamp: string;
  confidence: number;
};

export type TimelineEvent = {
  id: string;
  timestamp: string;
  event: string;
  details: string;
  status: 'completed' | 'processing' | 'failed';
};

export type Call = {
  id: string;
  callerId: string;
  timestamp: string;
  duration: string;
  status: CallStatus;
  handler: CallHandler;
  language: CallLanguage;
  sttQuality: STTQuality;
  transcript: TranscriptSegment[];
  timeline: TimelineEvent[];
  guardrailTriggers: string[];
  adminNotes?: string;
};

export type Caller = {
  id: string;
  firstSeen: string;
  lastSeen: string;
  totalCalls: number;
  commonIntent: string;
};

export type AdmissionBaseline = {
  id: string;
  program: string;
  quotaType: string;
  estimatedAvailability: number;
  confidence: number;
  lastUpdated: string;
};
