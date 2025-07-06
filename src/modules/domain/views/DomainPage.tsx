"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Copy,
  Edit,
  Pencil,
  CircleCheck,
  CircleX,
  ShieldCheck,
  Upload,
} from "lucide-react";

interface DomainBasicInfo {
  id: string;
  name: string;
  route: string;
  status: string;
}
interface Domain extends DomainBasicInfo {
  tags: string[];
  metadata: Record<string, any>;
  role_id: string;
  role_name: string;
  actions: string[];
  created_by: string;
  updated_by: string;
  created_at: Date;
  updated_at: Date;
  member_id: string;
  roles: any[];
}

export const DomainPage = () => {
  const [domains, setDomains] = useState<Domain[]>([
    {
      id: "111f9b27-740b-44ef-b092-d7ea5ccfd9cf",
      name: "CTX",
      route: "ctx",
      tags: [],
      metadata: {},
      status: "enabled",
      role_id: "role_123",
      role_name: "Admin",
      actions: [],
      created_by: "user_123",
      updated_by: "user_123",
      created_at: new Date(),
      updated_at: new Date(),
      member_id: "member_123",
      roles: [],
    },
  ]);

  const [editingField, setEditingField] = useState<{
    domainId: string;
    field: string;
  } | null>(null);
  const [tempValues, setTempValues] = useState<Record<string, string>>({});
  const [viewMetadata, setViewMetadata] = useState<string | null>(null);
  const [viewTags, setViewTags] = useState<string | null>(null);

  const handleFieldEdit = (
    domainId: string,
    field: string,
    currentValue: any
  ) => {
    setEditingField({ domainId, field });
    setTempValues({
      ...tempValues,
      [`${domainId}_${field}`]:
        typeof currentValue === "object"
          ? JSON.stringify(currentValue)
          : currentValue,
    });
  };

  const handleFieldSave = (domainId: string, field: string) => {
    const key = `${domainId}_${field}`;
    const newValue = tempValues[key];

    setDomains(
      domains.map((domain) => {
        if (domain.id === domainId) {
          if (field === "tags") {
            return {
              ...domain,
              [field]: newValue
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean),
            };
          } else if (field === "metadata") {
            try {
              return { ...domain, [field]: JSON.parse(newValue || "{}") };
            } catch {
              return domain;
            }
          }
          return { ...domain, [field]: newValue };
        }
        return domain;
      })
    );

    setEditingField(null);
    setTempValues({ ...tempValues, [key]: "" });
  };

  const handleFieldCancel = () => {
    setEditingField(null);
  };

  const handleStatusToggle = (domainId: string) => {
    setDomains(
      domains.map((domain) =>
        domain.id === domainId
          ? {
              ...domain,
              status: domain.status === "enabled" ? "disabled" : "enabled",
            }
          : domain
      )
    );
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const isEditing = (domainId: string, field: string) => {
    return editingField?.domainId === domainId && editingField?.field === field;
  };

  const getTempValue = (domainId: string, field: string) => {
    return tempValues[`${domainId}_${field}`] || "";
  };

  return (
    <div className="container mx-auto mt-4 pb-4 md:pb-8">
      <div className="border rounded-md p-2 sm:p-4">
        <div className="relative w-full overflow-x-auto">
          {domains.map((domain) => (
            <Table
              key={domain.id}
              className="w-full caption-bottom text-sm mt-5 bg-white dark:bg-card"
            >
              <TableHeader>
                <TableRow className="border-b transition-colors hover:bg-transparent h-20">
                  <TableHead
                    className="text-foreground h-10 px-2 text-left align-middle whitespace-nowrap text-2xl font-bold"
                    colSpan={3}
                  >
                    {domain.name}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Name Row */}
                <TableRow className="hover:bg-muted/50 border-b transition-colors h-20">
                  <TableHead className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                    Name <span className="text-red-600">*</span>
                  </TableHead>
                  <TableCell className="p-2 align-middle whitespace-nowrap">
                    <form
                      className="flex flex-row justify-between"
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleFieldSave(domain.id, "name");
                      }}
                    >
                      <div className="grid gap-2 w-full">
                        <Input
                          className="w-4/5 truncate"
                          value={
                            isEditing(domain.id, "name")
                              ? getTempValue(domain.id, "name")
                              : domain.name
                          }
                          onChange={(e) =>
                            setTempValues({
                              ...tempValues,
                              [`${domain.id}_name`]: e.target.value,
                            })
                          }
                          disabled={!isEditing(domain.id, "name")}
                        />
                      </div>
                      <div className="flex flex-row gap-2">
                        {isEditing(domain.id, "name") ? (
                          <div className="flex flex-row gap-2">
                            <Button type="submit" size="sm" className="size-9">
                              <CircleCheck className="h-5 w-5" />
                            </Button>
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              className="size-9"
                              onClick={handleFieldCancel}
                            >
                              <CircleX className="h-5 w-5" />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className="size-9"
                            onClick={() =>
                              handleFieldEdit(domain.id, "name", domain.name)
                            }
                          >
                            <Pencil className="size-4" />
                          </Button>
                        )}
                      </div>
                    </form>
                  </TableCell>
                </TableRow>

                {/* ID Row */}
                <TableRow className="hover:bg-muted/50 border-b transition-colors h-20">
                  <TableHead className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                    ID
                  </TableHead>
                  <TableCell className="p-2 align-middle whitespace-nowrap">
                    <div className="flex flex-row justify-between">
                      <span className="me-1">{domain.id}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 rounded-md gap-1.5 px-3"
                        onClick={() => copyToClipboard(domain.id)}
                      >
                        <span className="sr-only">Copy</span>
                        <Copy className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>

                {/* Route Row */}
                <TableRow className="hover:bg-muted/50 border-b transition-colors h-20">
                  <TableHead className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                    Route
                  </TableHead>
                  <TableCell className="p-2 align-middle whitespace-nowrap">
                    <form
                      className="flex flex-row justify-between"
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleFieldSave(domain.id, "route");
                      }}
                    >
                      <div className="grid gap-2 w-full">
                        <Input
                          className="w-4/5"
                          placeholder="Enter route"
                          value={
                            isEditing(domain.id, "route")
                              ? getTempValue(domain.id, "route")
                              : domain.route
                          }
                          onChange={(e) =>
                            setTempValues({
                              ...tempValues,
                              [`${domain.id}_route`]: e.target.value,
                            })
                          }
                          disabled={!isEditing(domain.id, "route")}
                        />
                      </div>
                      <div className="flex flex-row gap-2">
                        {isEditing(domain.id, "route") ? (
                          <div className="flex flex-row gap-2">
                            <Button type="submit" size="sm" className="size-9">
                              <CircleCheck className="h-5 w-5" />
                            </Button>
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              className="size-9"
                              onClick={handleFieldCancel}
                            >
                              <CircleX className="h-5 w-5" />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            className="size-9 hover:bg-primary/10"
                            onClick={() =>
                              handleFieldEdit(domain.id, "route", domain.route)
                            }
                          >
                            <Pencil className="size-4" />
                          </Button>
                        )}
                      </div>
                    </form>
                  </TableCell>
                </TableRow>

                {/* Tags Row */}
                <TableRow className="hover:bg-muted/50 border-b transition-colors h-20">
                  <TableHead className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                    Tags
                  </TableHead>
                  <TableCell className="p-2 align-middle whitespace-nowrap">
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-wrap gap-1">
                        {domain.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex flex-row gap-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="size-9 hover:bg-primary/10"
                              onClick={() => setViewTags(domain.id)}
                            >
                              <Pencil className="size-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Tags</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <Input
                                placeholder="Enter tags separated by commas"
                                value={
                                  getTempValue(domain.id, "tags") ||
                                  domain.tags.join(", ")
                                }
                                onChange={(e) =>
                                  setTempValues({
                                    ...tempValues,
                                    [`${domain.id}_tags`]: e.target.value,
                                  })
                                }
                              />
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  onClick={() => setViewTags(null)}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  onClick={() => {
                                    handleFieldSave(domain.id, "tags");
                                    setViewTags(null);
                                  }}
                                >
                                  Save
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>

                {/* Metadata Row */}
                <TableRow className="hover:bg-muted/50 border-b transition-colors h-20">
                  <TableHead className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                    Metadata
                  </TableHead>
                  <TableCell className="p-2 align-middle whitespace-nowrap">
                    <div className="flex flex-row justify-between">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="h-9 px-4 py-2">
                            View Metadata
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>View Metadata</DialogTitle>
                          </DialogHeader>
                          <pre className="bg-muted p-4 rounded-md text-sm">
                            {JSON.stringify(domain.metadata, null, 2)}
                          </pre>
                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="size-9 hover:bg-primary/10"
                            onClick={() => setViewMetadata(domain.id)}
                          >
                            <Pencil className="size-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Metadata</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <Input
                              placeholder='{"key": "value"}'
                              value={
                                getTempValue(domain.id, "metadata") ||
                                JSON.stringify(domain.metadata)
                              }
                              onChange={(e) =>
                                setTempValues({
                                  ...tempValues,
                                  [`${domain.id}_metadata`]: e.target.value,
                                })
                              }
                            />
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                onClick={() => setViewMetadata(null)}
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={() => {
                                  handleFieldSave(domain.id, "metadata");
                                  setViewMetadata(null);
                                }}
                              >
                                Save
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>

                {/* Status Row */}
                <TableRow className="hover:bg-muted/50 border-b transition-colors h-20">
                  <TableHead className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                    Status
                  </TableHead>
                  <TableCell className="p-2 align-middle whitespace-nowrap">
                    <div className="flex flex-row justify-between">
                      <span className="flex items-center">
                        <ShieldCheck className="mr-2 size-4 text-[#2a8c85]" />
                        <span className="text-center">
                          {domain.status === "enabled" ? "Enabled" : "Disabled"}
                        </span>
                      </span>
                      <div className="flex">
                        <Button
                          variant="outline"
                          className="h-9 px-4 py-2 border-red-500 text-red-500 hover:text-red-700 hover:border-red-700"
                          onClick={() => handleStatusToggle(domain.id)}
                        >
                          {domain.status === "enabled" ? "Disable" : "Enable"}
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>

                {/* Logo Row */}
                <TableRow className="hover:bg-muted/50 border-b transition-colors h-20">
                  <TableHead className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
                    Logo
                  </TableHead>
                  <TableCell className="p-2 align-middle whitespace-nowrap">
                    <form className="flex flex-row justify-between">
                      <div className="grid gap-2 w-full">
                        <div className="w-4/5">
                          <div className="w-full border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-not-allowed">
                            <input
                              accept="image/*,.jpeg,.jpg,.png"
                              tabIndex={-1}
                              type="file"
                              className="sr-only"
                            />
                            <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                            <p className="mt-2 text-sm text-muted-foreground">
                              Click to upload or drag and drop
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row gap-2">
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          className="size-9 hover:bg-primary/10"
                        >
                          <Pencil className="size-4" />
                        </Button>
                      </div>
                    </form>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ))}
        </div>
      </div>
    </div>
  );
};
