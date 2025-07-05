"use client";
import { Button } from "@/components/ui/button";
import { DataTable, DragHandle } from "@/components/ui/tankstack-table";
import {
  IconCircleCheckFilled,
  IconDotsVertical,
  IconLoader,
  IconPlayerPauseFilled,
  IconPlus,
  IconChevronRight,
  IconChevronDown,
  IconFolder,
  IconFolderOpen,
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
import GroupForm from "./GroupForm";
import { use, useState } from "react";
import { Group, Status } from "@absmach/magistrala-sdk";

interface GroupsTableProps {
  groups: Promise<Group[]>;
}

export const GroupsTable: React.FC<GroupsTableProps> = ({ groups }) => {
  const data = use(groups);
  return <DataTable columns={columns} toolbar={<Toolbar />} data={data} />;
};

const columns: ColumnDef<Group>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original?.id ?? "-"} />,
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
    cell: ({ row }) => {
      const level = row.original.level || 0;
      const indentation = level * 20;

      return (
        <div
          className="flex items-center gap-2"
          style={{ paddingLeft: `${indentation}px` }}
        >
          {level > 0 && (
            <div className="w-4 h-4 flex items-center justify-center">
              <IconFolder className="w-3 h-3 text-muted-foreground" />
            </div>
          )}
          {level === 0 && (
            <div className="w-4 h-4 flex items-center justify-center">
              <IconFolderOpen className="w-4 h-4 text-primary" />
            </div>
          )}
          <span className="font-medium">{row.original.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <span className="text-muted-foreground max-w-[200px] truncate block">
        {row.original.description || "No description"}
      </span>
    ),
  },
  {
    accessorKey: "path",
    header: "Path",
    cell: ({ row }) => (
      <span className="text-muted-foreground text-sm font-mono max-w-[150px] truncate block">
        {row.original.path || "-"}
      </span>
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
          <IconLoader className="animate-spin" />
        )}
        {row.original.status === "enabled" ? "enabled" : "disabled"}
      </Badge>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Created",
    cell: ({ row }) => {
      const date = row.original.created_at;
      return (
        <span className="text-muted-foreground text-sm">
          {date ? date.toLocaleDateString() : "-"}
        </span>
      );
    },
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
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>View Details</DropdownMenuItem>
          <DropdownMenuSeparator />
          {row.original.status === "enabled" ? (
            <DropdownMenuItem>Disable</DropdownMenuItem>
          ) : (
            <DropdownMenuItem>Enable</DropdownMenuItem>
          )}
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
      <GroupForm
        onAdd={() => {
          // refetch groups or perform any other action after adding a group
        }}
        button={
          <Button variant="outline" size="sm">
            <IconPlus />
            <span className="hidden lg:inline">Add Group</span>
          </Button>
        }
      />
    </div>
  );
};
