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
import CodeMirror from "@uiw/react-codemirror";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { json } from "@codemirror/lang-json";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import { updateUser } from "../actions";
import { TagsInput } from "@/components/tags-input";
import { IconPlus } from "@tabler/icons-react";

const extensions = [json()];

const formSchema = z.object({
  first_name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  key: z.string().optional(),
  tags: z.array(z.string()).optional(),
  metadata: z.record(z.string(), z.string()).optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function UserForm({ button }: { button?: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      email: "",
      key: "",
      tags: [],
      metadata: {},
    },
  });

  const {
    reset,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: FormData) => {
    // console.log("Form submitted:", data);
    const userData = {
      id: Math.random().toString(36).substring(2, 15),
      first_name: data.first_name,
      email: data.email,
      tags: data.tags,
      status: "enabled" as const,
      credentials: {
        secret: Math.random().toString(36).substring(2, 15),
      },
      metadata: data.metadata,
    };
    await updateUser(userData);
    // Handle form submission here
    setOpen(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {button || (
          <Button variant="outline" size="sm">
            <IconPlus />
            <span className="hidden lg:inline">Add User</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create User</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john.doe@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter user key" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            <FormField
              control={form.control}
              name="metadata"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Metadata</FormLabel>
                  <FormControl>
                    <CodeMirror
                      extensions={extensions}
                      className="border rounded-md p-2"
                      value={
                        (field.value && JSON.stringify(field.value, null, 2)) ||
                        "{}"
                      }
                      onChange={(value, viewUpdate) => {
                        field.onChange(JSON.parse(value));
                      }}
                      color="black"
                      height="150px"
                      theme={tokyoNight}
                      basicSetup={{
                        lineNumbers: true,
                        foldGutter: true,
                        dropCursor: false,
                        allowMultipleSelections: false,
                        indentOnInput: true,
                        bracketMatching: true,
                        closeBrackets: true,
                        autocompletion: true,
                        highlightSelectionMatches: false,
                      }}
                    />
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
