import { notFound } from 'next/navigation';
import { getCallById } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Bot, CheckCircle, Clock, FileText, Languages, Milestone, Phone, User, Info } from 'lucide-react';
import { format } from 'date-fns';

type STTConfidenceVariant = 'success' | 'warning' | 'destructive';
const getConfidenceVariant = (confidence: number): STTConfidenceVariant => {
    if (confidence > 0.9) return 'success';
    if (confidence > 0.8) return 'warning';
    return 'destructive';
}

const getConfidenceColor = (confidence: number) => {
    if (confidence > 0.9) return 'text-green-600';
    if (confidence > 0.8) return 'text-yellow-600';
    return 'text-red-600';
}

export default function CallDetailPage({ params }: { params: { id: string } }) {
  const call = getCallById(params.id);

  if (!call) {
    notFound();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Call Transcript</CardTitle>
            <CardDescription>Full transcript of the call with STT confidence scores.</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96 w-full pr-4">
              <div className="space-y-4">
                {call.transcript.map((segment, index) => (
                  <div key={index} className="flex flex-col">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      {segment.speaker === 'Agent' ? <Bot className="h-4 w-4 text-accent" /> : <User className="h-4 w-4 text-primary" />}
                      <span>{segment.speaker}</span>
                      <span className="text-xs text-muted-foreground">{segment.timestamp}</span>
                    </div>
                    <p className="pl-6">{segment.text}</p>
                    <p className={`pl-6 text-xs font-medium ${getConfidenceColor(segment.confidence)}`}>
                        Confidence: {(segment.confidence * 100).toFixed(1)}%
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Admin Notes</CardTitle>
                <CardDescription>Add internal notes for this call.</CardDescription>
            </CardHeader>
            <CardContent>
                <Textarea placeholder="Type your notes here..." defaultValue={call.adminNotes}/>
            </CardContent>
            <CardFooter>
                <Button>Save Notes</Button>
            </CardFooter>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Call Details</CardTitle>
            <CardDescription>ID: {call.id}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-2"><Info className="h-4 w-4"/>Status</span>
              <Badge variant={call.status === 'Dropped' ? 'destructive' : 'outline'}>{call.status}</Badge>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-2"><Clock className="h-4 w-4"/>Timestamp</span>
              <span>{format(new Date(call.timestamp), 'MMM d, yyyy, h:mm a')}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-2"><Phone className="h-4 w-4"/>Duration</span>
              <span>{call.duration}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-2"><Bot className="h-4 w-4"/>Handler</span>
              <span>{call.handler}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-2"><Languages className="h-4 w-4"/>Language</span>
              <span>{call.language}</span>
            </div>
             <Separator />
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-2"><FileText className="h-4 w-4"/>STT Quality</span>
               <Badge variant={call.sttQuality === 'Failed' ? 'destructive' : 'secondary'}>{call.sttQuality}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Processing Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative pl-6">
                <div className="absolute left-[35px] top-0 bottom-0 w-0.5 bg-border -translate-x-1/2"></div>
                {call.timeline.map((event, index) => (
                    <div key={event.id} className="mb-6 flex items-start">
                        <div className="z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background border-2 border-primary">
                            <Milestone className="h-4 w-4 text-primary"/>
                        </div>
                        <div className="pl-4">
                            <p className="font-medium">{event.event} <span className="text-xs text-muted-foreground">({event.timestamp})</span></p>
                            <p className="text-sm text-muted-foreground">{event.details}</p>
                        </div>
                    </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {call.guardrailTriggers.length > 0 && (
          <Alert variant="destructive" className="bg-warning/10 border-warning text-warning-foreground">
            <AlertTriangle className="h-4 w-4 !text-warning" />
            <AlertTitle>Guardrails Triggered</AlertTitle>
            <AlertDescription>
              <ul className="list-disc pl-5">
                {call.guardrailTriggers.map((trigger, i) => (
                  <li key={i}>{trigger}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
