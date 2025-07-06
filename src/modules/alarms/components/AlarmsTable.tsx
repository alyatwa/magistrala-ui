"use client";
import { Button } from "@/components/ui/button";
import { DataTable, DragHandle } from "@/components/ui/tankstack-table";
import {
  IconAlertTriangle,
  IconCircleCheck,
  IconClock,
  IconDotsVertical,
  IconExclamationMark,
  IconPlus,
  IconUser,
} from "@tabler/icons-react";
import { z } from "zod";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AlarmForm from "./AlarmForm";
import { use } from "react";
import { Alarm, AlarmStatus } from "@absmach/magistrala-sdk";
import { CopyButton } from "@/components/copy-button";

const schema = z.object({
  id: z.string(),
  rule_id: z.string(),
  domain_id: z.string(),
  channel_id: z.string(),
  client_id: z.string(),
  subtopic: z.string().optional(),
  status: z.enum(["active", "cleared", "all"]),
  measurement: z.string(),
  value: z.string(),
  unit: z.string().optional(),
  threshold: z.string(),
  cause: z.string(),
  severity: z.number().min(1).max(5),
  assignee_id: z.string().optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

interface AlarmsTableProps {
  alarms: Promise<Alarm[]>;
}

export const AlarmsTable: React.FC<AlarmsTableProps> = ({ alarms }) => {
  const data = use(alarms);
  return <DataTable columns={columns} toolbar={<Toolbar />} data={data} />;
};

const getSeverityColor = (severity: number) => {
  switch (severity) {
    case 1:
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case 2:
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case 3:
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case 4:
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
    case 5:
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
};

const getSeverityLabel = (severity: number) => {
  switch (severity) {
    case 1:
      return "Low";
    case 2:
      return "Info";
    case 3:
      return "Warning";
    case 4:
      return "High";
    case 5:
      return "Critical";
    default:
      return "Unknown";
  }
};

const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "severity",
    header: "Severity",
    cell: ({ row }) => (
      <Badge className={`${getSeverityColor(row.original.severity)} border-0`}>
        {getSeverityLabel(row.original.severity)}
      </Badge>
    ),
  },
  {
    accessorKey: "measurement",
    header: "Measurement",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="font-medium">{row.original.measurement}</span>
        {row.original.unit && (
          <span className="text-muted-foreground text-sm">
            ({row.original.unit})
          </span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="font-mono">{row.original.value}</span>
        <span className="text-muted-foreground">vs</span>
        <span className="font-mono text-muted-foreground">
          {row.original.threshold}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.status === "active" ? (
          <IconAlertTriangle className="text-red-500 dark:text-red-400" />
        ) : row.original.status === "cleared" ? (
          <IconCircleCheck className="text-green-500 dark:text-green-400" />
        ) : (
          <IconClock className="text-gray-500 dark:text-gray-400" />
        )}
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "cause",
    header: "Cause",
    cell: ({ row }) => (
      <div className="max-w-[200px]">
        <span className="text-muted-foreground text-sm truncate block">
          {row.original.cause}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "client_id",
    header: "Client ID",
    cell: ({ row }) => (
      <div className="flex gap-1 items-center">
        <span className="text-muted-foreground font-mono text-sm w-[90px] truncate block">
          {row.original.client_id}
        </span>
        <CopyButton text={row.original.client_id} />
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Created",
    cell: ({ row }) => (
      <span className="text-muted-foreground text-sm">
        {row.original.created_at
          ? row.original.created_at.toLocaleDateString()
          : "-"}
      </span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            size="icon"
          >
            <IconDotsVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>View Details</DropdownMenuItem>
          <DropdownMenuItem>Acknowledge</DropdownMenuItem>
          <DropdownMenuItem>Assign</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Resolve</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

const Toolbar: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <AlarmForm
        button={
          <Button variant="outline" size="sm">
            <IconPlus />
            <span className="hidden lg:inline">Add Alarm</span>
          </Button>
        }
      />
    </div>
  );
};
