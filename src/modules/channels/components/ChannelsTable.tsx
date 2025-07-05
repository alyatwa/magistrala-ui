"use client";
import { Button } from "@/components/ui/button";
import { DataTable, DragHandle } from "@/components/ui/tankstack-table";
import {
  IconCircleCheckFilled,
  IconDotsVertical,
  IconLoader,
  IconPlayerPauseFilled,
  IconPlus,
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
import ChannelForm from "./ChannelForm";
import { use } from "react";
import { Channel } from "@absmach/magistrala-sdk";

const schema = z.object({
  id: z.string(),
  name: z.string(),
  tags: z.array(z.string()),
  status: z.enum(["enabled", "disabled"]),
  metadata: z.record(z.string(), z.any()).optional(),
});

interface ChannelsTableProps {
  channels: Promise<Channel[]>;
}

export const ChannelsTable: React.FC<ChannelsTableProps> = ({ channels }) => {
  const data = use(channels);
  return <DataTable columns={columns} toolbar={<Toolbar />} data={data} />;
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
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="font-medium">{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => (
      <div className="w-32 flex gap-1">
        {row.original.tags?.map((tag) => (
          <Badge
            key={tag}
            variant="outline"
            className="text-muted-foreground px-1.5 mb-1"
          >
            {tag}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.status === "enabled" ? (
          <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
        ) : row.original.status === "disabled" ? (
          <IconPlayerPauseFilled className="text-yellow-500 dark:text-yellow-400" />
        ) : (
          <IconLoader className="animate-spin " />
        )}
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "metadata",
    header: "Metadata",
    cell: ({ row }) => {
      const metadata = row.original.metadata;
      if (!metadata || Object.keys(metadata).length === 0) {
        return <span className="text-muted-foreground">No metadata</span>;
      }

      const firstKey = Object.keys(metadata)[0];
      const metadataCount = Object.keys(metadata).length;

      return (
        <div className="flex gap-1 items-center">
          <Badge variant="secondary" className="text-xs">
            {firstKey}: {metadata[firstKey]}
          </Badge>
          {metadataCount > 1 && (
            <Badge variant="outline" className="text-xs">
              +{metadataCount - 1} more
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: () => (
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
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Make a copy</DropdownMenuItem>
          <DropdownMenuItem>Favorite</DropdownMenuItem>
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
      <ChannelForm
        button={
          <Button variant="outline" size="sm">
            <IconPlus />
            <span className="hidden lg:inline">Add Channel</span>
          </Button>
        }
      />
    </div>
  );
};
