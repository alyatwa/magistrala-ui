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
import { Button } from "@/components/ui/button";
import { TagsInput } from "@/components/tags-input";
import { Pencil } from "lucide-react";

const formSchema = z.object({
  tags: z.array(z.string()).optional(),
});

type FormData = z.infer<typeof formSchema>;

interface TagsEditDialogProps {
  initialTags: string[];
  onTagsUpdate: (tags: string[]) => void;
  trigger?: React.ReactNode;
}

export default function TagsEditDialog({
  initialTags,
  onTagsUpdate,
  trigger,
}: TagsEditDialogProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tags: initialTags,
    },
  });

  const {
    reset,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: FormData) => {
    onTagsUpdate(data.tags || []);
    setOpen(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            size="sm"
            variant="outline"
            className="size-9 hover:bg-primary/10"
          >
            <Pencil className="size-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Tags</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <TagsInput
                      onTagsChange={field.onChange}
                      initialTags={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button loading={isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
