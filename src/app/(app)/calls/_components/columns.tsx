
"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { format } from 'date-fns';

// This type is a subset of the `Call` type in `types.ts`
// but includes the `isRepeatCaller` field from the view.
export type CallListEntry = {
    id: string;
    timestamp: string;
    status: string;
    language: string;
    duration: string;
    isRepeatCaller: boolean;
    sttQuality: string;
  };

export const columns: ColumnDef<CallListEntry>[] = [
  {
    accessorKey: "id",
    header: "Call ID",
    cell: ({ row }) => {
        const id: string = row.getValue("id")
        return <Link href={`/calls/${id}`} className="hover:underline font-medium text-primary">{id.slice(0,8)}...</Link>
    }
  },
  {
    accessorKey: "timestamp",
    header: "Date & Time",
    cell: ({ row }) => {
        const date = new Date(row.getValue("timestamp"))
        return <div>{format(date, "MMM d, yyyy, h:mm a")}</div>
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
        const status = row.getValue("status") as string;
        let variant: "default" | "destructive" | "secondary" | "outline" = "outline";
        if (status === 'Completed') variant = 'secondary';
        if (status === 'Dropped' || status === 'Failed') variant = 'destructive';

        return <Badge variant={variant}>{status}</Badge>
    }
  },
  {
    accessorKey: "language",
    header: "Language",
  },
  {
      accessorKey: "sttQuality",
      header: "STT Quality",
      cell: ({ row }) => {
          const quality = row.getValue("sttQuality") as string;
          let variant: "default" | "destructive" | "secondary" | "outline" = "secondary";
          if (quality === 'Low') variant = 'outline';
          if (quality === 'Failed') variant = 'destructive';
  
          return <Badge variant={variant}>{quality}</Badge>
      }
  },
  {
    accessorKey: 'isRepeatCaller',
    header: 'Caller Type',
    cell: ({ row }) => {
      const isRepeat = row.getValue('isRepeatCaller');
      return isRepeat ? <Badge variant="outline">Repeat</Badge> : <Badge variant="secondary">New</Badge>;
    },
  },
  {
    accessorKey: "duration",
    header: () => <div className="text-right">Duration</div>,
    cell: ({ row }) => {
        return <div className="text-right font-medium">{row.getValue("duration")}</div>
      },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const call = row.original

      return (
        <div className="text-center">
            <Button variant="ghost" size="sm" asChild>
                <Link href={`/calls/${call.id}`}>View</Link>
            </Button>
        </div>
      )
    },
  },
]
