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
import { use } from "react";
import { CopyButton } from "@/components/copy-button";
import { UserForm } from ".";
import { User } from "@absmach/magistrala-sdk";

interface UsersTableProps {
  users: Promise<User[]>;
}

export const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  const data = use(users);
  return <DataTable columns={columns} toolbar={<Toolbar />} data={data} />;
};

const columns: ColumnDef<User>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original?.id ?? ""} />,
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
    accessorKey: "first_name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="font-medium">{row.original.first_name}</span>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {row.original.email || "N/A"}
      </span>
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
      <UserForm
        button={
          <Button variant="outline" size="sm">
            <IconPlus />
            <span className="hidden lg:inline">Add User</span>
          </Button>
        }
      />
    </div>
  );
};

export default UsersTable;
