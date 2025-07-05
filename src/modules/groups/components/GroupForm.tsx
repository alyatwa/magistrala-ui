"use client";
import { useState, useEffect, useTransition } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { json } from "@codemirror/lang-json";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import { createGroup, getParentGroups } from "../actions";
import { IconPlus } from "@tabler/icons-react";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

const extensions = [json()];

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  parent_id: z.string().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function GroupForm({
  button,
  onAdd,
}: {
  button?: React.ReactNode;
  onAdd?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [parentGroups, setParentGroups] = useState<
    Array<{ id: string; name: string; path?: string }>
  >([]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      parent_id: "",
      metadata: {},
    },
  });

  const {
    reset,
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    if (open) {
      // Load parent groups when dialog opens
      getParentGroups().then(setParentGroups);
    }
  }, [open]);

  const onSubmit = async (data: FormData) => {
    const groupData = {
      ...data,
      parent_id: data.parent_id === "none" ? undefined : data.parent_id,
      level: data.parent_id && data.parent_id !== "none" ? 1 : 0,
      status: "enabled" as const, // Default status
    };

    await createGroup(groupData);
    onAdd?.();
    // revalidatePath("/dashboard/groups", "page");
    startTransition(() => {
      router.refresh();
    });
    setOpen(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {button || (
          <Button variant="outline" size="sm">
            <IconPlus />
            <span className="hidden lg:inline">Add Group</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Group</DialogTitle>
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
                    <Input placeholder="North America" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter group description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="parent_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent Group</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value || "none"}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a parent group (optional)" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="none">
                        No parent (root level)
                      </SelectItem>
                      {parentGroups.map((group) => (
                        <SelectItem key={group.id} value={group.id}>
                          {group.name} {group.path && `(${group.path})`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                        try {
                          field.onChange(JSON.parse(value));
                        } catch (e) {
                          // Invalid JSON, don't update
                        }
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
              <Button loading={isSubmitting || isPending} type="submit">
                Create
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
