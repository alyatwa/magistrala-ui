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
import RoleForm from "./RoleForm";
import { use } from "react";
import { Role } from "@absmach/magistrala-sdk";

const schema = z.object({
  id: z.string(),
  name: z.string(),
  entity_id: z.string().optional(),
  created_by: z.string().optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  updated_by: z.string().optional(),
});

interface RolesTableProps {
  roles: Promise<Role[]>;
}

export const RolesTable: React.FC<RolesTableProps> = ({ roles }) => {
  const data = use(roles);
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
    accessorKey: "entity_id",
    header: "Entity ID",
    cell: ({ row }) => (
      <span className="text-muted-foreground w-[150px] truncate block">
        {row.original.entity_id}
      </span>
    ),
  },
  {
    accessorKey: "created_by",
    header: "Created By",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.original.created_by}</span>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {row.original.created_at?.toLocaleDateString()}
      </span>
    ),
  },
  {
    accessorKey: "updated_at",
    header: "Updated At",
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {row.original.updated_at?.toLocaleDateString()}
      </span>
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
      <RoleForm
        button={
          <Button variant="outline" size="sm">
            <IconPlus />
            <span className="hidden lg:inline">Add Role</span>
          </Button>
        }
      />
    </div>
  );
};
