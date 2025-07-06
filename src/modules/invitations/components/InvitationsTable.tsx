"use client";
import { Button } from "@/components/ui/button";
import { DataTable, DragHandle } from "@/components/ui/tankstack-table";
import {
  IconCircleCheckFilled,
  IconDotsVertical,
  IconPlus,
  IconX,
  IconCheck,
  IconClock,
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
import InvitationForm from "./InvitationForm";
import { use } from "react";
import { type Invitation } from "@absmach/magistrala-sdk";
import { CopyButton } from "@/components/copy-button";
import {
  confirmInvitation,
  rejectInvitation,
  deleteInvitation,
} from "../actions";

const schema = z.object({
  invited_by: z.string(),
  invitee_user_id: z.string(),
  domain_id: z.string(),
  domain_name: z.string().optional(),
  role_id: z.string().optional(),
  role_name: z.string().optional(),
  actions: z.array(z.string()).optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  confirmed_at: z.date().optional(),
  rejected_at: z.date().optional(),
});

interface InvitationsTableProps {
  invitations: Promise<Invitation[]>;
}

const getInvitationStatus = (invitation: Invitation) => {
  if (invitation.confirmed_at) {
    return {
      status: "confirmed",
      icon: IconCircleCheckFilled,
      color: "text-green-500 dark:text-green-400",
    };
  }
  if (invitation.rejected_at) {
    return {
      status: "rejected",
      icon: IconX,
      color: "text-red-500 dark:text-red-400",
    };
  }
  return {
    status: "pending",
    icon: IconClock,
    color: "text-yellow-500 dark:text-yellow-400",
  };
};

const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => (
      <DragHandle id={row.original?.invitee_user_id?.toString() ?? "-"} />
    ),
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
    accessorKey: "invitee_user_id",
    header: "Invitee",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="font-medium truncate w-32">
          {row.original.invitee_user_id}
        </span>
        <CopyButton text={row.original?.invitee_user_id?.toString()??"-"} />
      </div>
    ),
  },
  {
    accessorKey: "invited_by",
    header: "Invited By",
    cell: ({ row }) => (
      <span className="text-muted-foreground truncate w-32 block">
        {row.original.invited_by}
      </span>
    ),
  },
  {
    accessorKey: "domain_name",
    header: "Domain",
    cell: ({ row }) => (
      <span className="font-medium">
        {row.original.domain_name || "Unknown Domain"}
      </span>
    ),
  },
  {
    accessorKey: "role_name",
    header: "Role",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.role_name || "No Role"}
      </Badge>
    ),
  },
  {
    accessorKey: "actions",
    header: "Permissions",
    cell: ({ row }) => (
      <div className="w-32 flex gap-1 flex-wrap">
        {row.original.actions?.map((action) => (
          <Badge
            key={action}
            variant="outline"
            className="text-muted-foreground px-1.5 mb-1 text-xs"
          >
            {action}
          </Badge>
        )) || (
          <span className="text-muted-foreground text-sm">No permissions</span>
        )}
      </div>
    ),
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      const { status, icon: Icon, color } = getInvitationStatus(row.original);
      return (
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          <Icon className={`w-4 h-4 mr-1 ${color}`} />
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Created",
    cell: ({ row }) => (
      <span className="text-muted-foreground text-sm">
        {row.original.created_at
          ? new Date(row.original.created_at).toLocaleDateString()
          : "-"}
      </span>
    ),
  },
  {
    accessorKey: "confirmed_at",
    header: "Confirmed",
    cell: ({ row }) => (
      <span className="text-muted-foreground text-sm">
        {row.original.confirmed_at
          ? new Date(row.original.confirmed_at).toLocaleDateString()
          : "-"}
      </span>
    ),
  },
  {
    id: "tableActions",
    header: "Actions",
    cell: ({ row }) => {
      const invitation = row.original;
      const { status } = getInvitationStatus(invitation);

      const handleConfirm = async () => {
        try {
          await confirmInvitation();
        } catch (error) {
          console.error("Failed to confirm invitation:", error);
        }
      };

      const handleReject = async () => {
        try {
          await rejectInvitation();
        } catch (error) {
          console.error("Failed to reject invitation:", error);
        }
      };

      const handleDelete = async () => {
        try {
          await deleteInvitation(invitation.invitee_user_id.toString());
        } catch (error) {
          console.error("Failed to delete invitation:", error);
        }
      };

      return (
        <div className="flex items-center gap-1">
          {status === "pending" && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleConfirm}
                className="text-green-600 hover:text-green-700 hover:bg-green-50"
              >
                <IconCheck className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReject}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <IconX className="w-4 h-4" />
              </Button>
            </>
          )}
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
              <DropdownMenuItem>Resend</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onClick={handleDelete}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

const Toolbar: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <InvitationForm
        button={
          <Button variant="outline" size="sm">
            <IconPlus />
            <span className="hidden lg:inline">Send Invitation</span>
          </Button>
        }
      />
    </div>
  );
};

export const InvitationsTable: React.FC<InvitationsTableProps> = ({
  invitations,
}) => {
  const data = use(invitations);
  return <DataTable columns={columns} toolbar={<Toolbar />} data={data} />;
};
