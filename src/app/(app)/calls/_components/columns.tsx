"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Call } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { format } from 'date-fns';

export const columns: ColumnDef<Call>[] = [
  {
    accessorKey: "id",
    header: "Call ID",
    cell: ({ row }) => {
        const id: string = row.getValue("id")
        return <Link href={`/calls/${id}`} className="hover:underline font-medium text-primary">{id}</Link>
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
        if (status === 'Dropped') variant = 'destructive';

        return <Badge variant={variant}>{status}</Badge>
    }
  },
  {
    accessorKey: "language",
    header: "Language",
  },
  {
    accessorKey: "handler",
    header: "Handled By",
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
        <div className="text-right">
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                    <Link href={`/calls/${call.id}`}>View call details</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>View caller profile</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">Delete call</DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        </div>
      )
    },
  },
]
