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
import { updateRole } from "../actions";
import { IconPlus } from "@tabler/icons-react";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  entity_id: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function RoleForm({ button }: { button?: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      entity_id: "",
    },
  });

  const {
    reset,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: FormData) => {
    await updateRole(data);
    setOpen(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {button || (
          <Button variant="outline" size="sm">
            <IconPlus />
            <span className="hidden lg:inline">Add Role</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Role</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter role name (e.g., Admin, Editor, Viewer)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="entity_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Entity ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter entity ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Close
              </Button>
              <Button loading={isSubmitting} type="submit">
                Create
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
