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
import ClientForm from "./ClientForm";
import { getClients } from "../actions";
import { use } from "react";
import { Client } from "@absmach/magistrala-sdk";

const schema = z.object({
  id: z.string(),
  name: z.string(),
  tags: z.array(z.string()),
  status: z.enum(["enabled", "disabled"]),
  credentials: z.object({
    identity: z.string(),
    secret: z.string(),
  }),
});

interface ClientsTableProps {
  clients: Promise<Client[]>;
}

export const ClientsTable: React.FC<ClientsTableProps> = ({ clients }) => {
  const data = use(clients);
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
        {row.original.tags.map((tag) => (
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
  //secret
  {
    accessorKey: "credentials.identity",
    header: "Identity",
    cell: ({ row }) => (
      <span className="text-muted-foreground w-[120px] truncate">
        {row.original.credentials.identity}
      </span>
    ),
  },

  // {
  //   accessorKey: "reviewer",
  //   header: "Reviewer",
  //   cell: ({ row }) => {
  //     const isAssigned = row.original.reviewer !== "Assign reviewer";

  //     if (isAssigned) {
  //       return row.original.reviewer;
  //     }

  //     return (
  //       <>
  //         <Label htmlFor={`${row.original.id}-reviewer`} className="sr-only">
  //           Reviewer
  //         </Label>
  //         <Select>
  //           <SelectTrigger
  //             className="w-38 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
  //             size="sm"
  //             id={`${row.original.id}-reviewer`}
  //           >
  //             <SelectValue placeholder="Assign reviewer" />
  //           </SelectTrigger>
  //           <SelectContent align="end">
  //             <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
  //             <SelectItem value="Jamik Tashpulatov">
  //               Jamik Tashpulatov
  //             </SelectItem>
  //           </SelectContent>
  //         </Select>
  //       </>
  //     );
  //   },
  // },
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
      <ClientForm
        button={
          <Button variant="outline" size="sm">
            <IconPlus />
            <span className="hidden lg:inline">Add Client</span>
          </Button>
        }
      />
    </div>
  );
};
