"use client";

import { useId, useState } from "react";
import { Tag, TagInput } from "emblor";

interface TagsInputProps {
  initialTags?: string[];
  placeholder?: string;
  onTagsChange?: (tags: string[]) => void;
}

export const TagsInput: React.FC<TagsInputProps> = ({
  initialTags = [],
  placeholder = "Add a tag",
  onTagsChange,
}) => {
  const id = useId();
  const [exampleTags, setExampleTags] = useState<Tag[]>(
    initialTags.map((tag) => ({
      text: tag,
      id: tag, // Using the tag text as the ID for simplicity
    }))
  );
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  const handleTagsChange = (newTags: Tag[] | ((prevTags: Tag[]) => Tag[])) => {
    const resolvedTags =
      typeof newTags === "function" ? newTags(exampleTags) : newTags;
    setExampleTags(resolvedTags);
    onTagsChange?.(resolvedTags.map((tag) => tag.text));
  };

  return (
    <TagInput
      id={id}
      tags={exampleTags}
      setTags={handleTagsChange}
      placeholder={placeholder}
      styleClasses={{
        inlineTagsContainer:
          "border-input rounded-md bg-background shadow-xs transition-[color,box-shadow] focus-within:border-ring outline-none focus-within:ring-[3px] focus-within:ring-ring/50 p-1 gap-1",
        input: "w-full min-w-[80px] shadow-none px-2 h-7",
        tag: {
          body: "h-7 relative bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7",
          closeButton:
            "absolute -inset-y-px -end-px p-0 rounded-e-md flex size-7 transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-muted-foreground/80 hover:text-foreground",
        },
      }}
      activeTagIndex={activeTagIndex}
      setActiveTagIndex={setActiveTagIndex}
    />
  );
};
