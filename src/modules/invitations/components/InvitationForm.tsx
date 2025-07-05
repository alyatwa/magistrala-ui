"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createInvitation } from "../actions";
import { IconPlus } from "@tabler/icons-react";

const formSchema = z.object({
  invitee_user_id: z.string().min(1, "Invitee User ID is required"),
  domain_id: z.string().min(1, "Domain ID is required"),
  domain_name: z.string().optional(),
  role_name: z.enum(["admin", "member", "viewer"], {
    required_error: "Please select a role",
  }),
  actions: z.array(z.string()).optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function InvitationForm({
  button,
}: {
  button?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      invitee_user_id: "",
      domain_id: "",
      domain_name: "",
      role_name: "member",
      actions: [],
    },
  });

  const getActionsForRole = (role: string): string[] => {
    switch (role) {
      case "admin":
        return ["read", "write", "delete", "admin"];
      case "member":
        return ["read", "write"];
      case "viewer":
        return ["read"];
      default:
        return [];
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const invitationData = {
        ...data,
        invited_by: "current-user-id", // TODO: Get from auth context
        actions: getActionsForRole(data.role_name),
      };

      await createInvitation(invitationData);
      setOpen(false);
      form.reset();
      // TODO: Add toast notification or refresh data
    } catch (error) {
      console.error("Failed to create invitation:", error);
      // TODO: Add error toast
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {button ?? (
          <Button variant="outline" size="sm">
            <IconPlus />
            <span className="hidden lg:inline">Send Invitation</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Send Invitation</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="invitee_user_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Invitee User ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter user ID or email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="domain_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Domain ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter domain ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="domain_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Domain Name (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter domain name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="member">Member</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send Invitation"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
