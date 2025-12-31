export type CallStatus = 'Ongoing' | 'Completed' | 'Dropped';
export type CallHandler = 'AI' | 'Human';
export type CallLanguage = 'EN' | 'ES' | 'FR' | 'DE';
export type STTConfidence = 'High' | 'Medium' | 'Low' | 'Failed';

export type TranscriptSegment = {
  speaker: 'Caller' | 'Agent';
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
  sttQuality: STTConfidence;
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
