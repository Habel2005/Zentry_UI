import type { Call, Caller, AdmissionBaseline, CallStatus, CallHandler, CallLanguage, STTConfidence } from './types';

const callStatuses: CallStatus[] = ['Completed', 'Ongoing', 'Dropped'];
const callHandlers: CallHandler[] = ['AI', 'Human'];
const callLanguages: CallLanguage[] = ['EN', 'ES', 'FR', 'DE'];
const sttConfidences: STTConfidence[] = ['High', 'Medium', 'Low', 'Failed'];
const intents = ['Check Status', 'New Application', 'Technical Support', 'Update Information', 'General Inquiry'];

const getRandomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const generateRandomDate = (start: Date, end: Date): Date => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const generateTranscript = (durationMinutes: number) => {
  const transcript = [];
  let currentTime = 0;
  for (let i = 0; i < durationMinutes * 2; i++) {
    const speaker = i % 2 === 0 ? 'Caller' : 'Agent';
    const text = `This is a sample sentence for the ${speaker}. The conversation continues.`;
    const timestamp = `${Math.floor(currentTime / 60).toString().padStart(2, '0')}:${(currentTime % 60).toString().padStart(2, '0')}`;
    transcript.push({
      speaker,
      text,
      timestamp,
      confidence: Math.random() * (1 - 0.7) + 0.7,
    });
    currentTime += Math.random() * 30 + 15;
  }
  return transcript;
};

const generateTimeline = () => {
  return [
    { id: '1', timestamp: '00:01', event: 'Call Initialized', details: 'Inbound call received.', status: 'completed' as const },
    { id: '2', timestamp: '00:02', event: 'STT Processing', details: 'Real-time speech-to-text initiated.', status: 'completed' as const },
    { id: '3', timestamp: '00:05', event: 'Intent Recognition', details: 'Primary intent identified as "Check Status".', status: 'completed' as const },
    { id: '4', timestamp: '00:08', event: 'Guardrail Check', details: 'No PII detected.', status: 'completed' as const },
    { id: '5', timestamp: '01:15', event: 'Guardrail Triggered', details: 'Sentiment detected as "Frustrated". Suggested de-escalation path.', status: 'processing' as const },
    { id: '6', timestamp: '02:30', event: 'Call Ended', details: 'Caller hung up.', status: 'completed' as const },
  ];
};

export const MOCK_CALLS: Call[] = Array.from({ length: 50 }, (_, i) => {
  const durationMinutes = Math.floor(Math.random() * 10) + 1;
  const status = getRandomItem(callStatuses);
  return {
    id: `C20240723-${(i + 1).toString().padStart(4, '0')}`,
    callerId: `+1-XXX-XXX-${Math.floor(Math.random() * 9000) + 1000}`,
    timestamp: generateRandomDate(new Date(2023, 0, 1), new Date()).toISOString(),
    duration: `${durationMinutes.toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    status: status,
    handler: status === 'Ongoing' ? 'AI' : getRandomItem(callHandlers),
    language: getRandomItem(callLanguages),
    sttQuality: getRandomItem(sttConfidences),
    transcript: generateTranscript(durationMinutes),
    timeline: generateTimeline(),
    guardrailTriggers: Math.random() > 0.7 ? ['PII Redaction', 'Sentiment Alert'] : [],
  };
});

export const MOCK_CALLERS: Caller[] = Array.from({ length: 20 }, (_, i) => ({
  id: `USR-${(i + 1).toString().padStart(4, '0')}`,
  firstSeen: generateRandomDate(new Date(2023, 0, 1), new Date(2023, 6, 1)).toISOString(),
  lastSeen: generateRandomDate(new Date(2024, 6, 1), new Date()).toISOString(),
  totalCalls: Math.floor(Math.random() * 20) + 1,
  commonIntent: getRandomItem(intents),
}));

const programs = ['Undergraduate Admissions', 'Graduate Admissions', 'International Program', 'Financial Aid Office'];
const quotaTypes = ['Early Decision', 'Regular Decision', 'Transfer', 'Scholarship'];

export const MOCK_ADMISSION_BASELINES: AdmissionBaseline[] = Array.from({ length: 10 }, (_, i) => ({
  id: `AB-${(i + 1).toString().padStart(3, '0')}`,
  program: getRandomItem(programs),
  quotaType: getRandomItem(quotaTypes),
  estimatedAvailability: Math.floor(Math.random() * 100),
  confidence: Math.round((Math.random() * (0.99 - 0.75) + 0.75) * 100),
  lastUpdated: generateRandomDate(new Date(2024, 6, 1), new Date()).toISOString(),
}));

export const getCallById = (id: string) => MOCK_CALLS.find(call => call.id === id);
