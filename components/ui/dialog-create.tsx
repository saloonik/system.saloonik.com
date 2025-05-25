"use client";

import { Button } from "./button";
import { Calendar } from "./calendar";
import { Checkbox } from "./checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Textarea } from "./textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import * as React from "react";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export enum FieldInputType {
  Text = "text",
  Email = "email",
  Password = "password",
  Number = "number",
  Date = "date",
  Tel = "tel",
  Checkbox = "checkbox",
  Select = "select",
  Textarea = "textarea",
}

export enum FieldWidth {
  Full = "full",
  Half = "half",
  Third = "third",
}

export interface FieldDefinition {
  name: string;
  label: string;
  type?: FieldInputType;
  placeholder?: string;
  required?: boolean;
  width?: FieldWidth;
  section?: string;
  options?: { label: string; value: string }[];
  icon?: ReactNode;
}

interface DialogCreateProps {
  title: string;
  description?: string;
  fields: FieldDefinition[];
  schema: z.ZodType<any>;
  onSubmit: (data: any) => void | Promise<void>;
  trigger?: ReactNode;
}

export function DialogCreate({
  title,
  description,
  fields,
  schema,
  onSubmit,
  trigger,
}: DialogCreateProps) {
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: fields.reduce(
      (acc, field) => {
        if (field.type === "checkbox") {
          acc[field.name] = false;
        } else {
          acc[field.name] = "";
        }
        return acc;
      },
      {} as Record<string, any>,
    ),
  });

  async function handleSubmit(data: any) {
    try {
      await onSubmit(data);
      setOpen(false);
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  const renderFormField = (field: FieldDefinition, fieldProps: any) => {
    if (field.type === "checkbox") {
      return (
        <div className="flex items-center space-x-2 mt-1">
          <Checkbox
            checked={!!fieldProps.value}
            onCheckedChange={fieldProps.onChange}
            id={field.name}
          />
          <label
            htmlFor={field.name}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {field.label}
          </label>
        </div>
      );
    }

    if (field.type === "select" && field.options) {
      return (
        <Select
          onValueChange={fieldProps.onChange}
          defaultValue={fieldProps.value}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={field.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {field.options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    if (field.type === "textarea") {
      return (
        <Textarea
          placeholder={field.placeholder}
          className="w-full min-h-[120px]"
          {...fieldProps}
        />
      );
    }

    return (
      <div className="relative w-full">
        {field.icon && (
          <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500">
            {field.icon}
          </div>
        )}
        <Input
          type={field.type || "text"}
          placeholder={field.placeholder}
          className={cn("w-full", field.icon && "pl-9")}
          {...fieldProps}
        />
      </div>
    );
  };

  // Helper function to render form fields with their proper layout
  const renderFields = (fieldsToRender: FieldDefinition[]) => {
    return fieldsToRender.map((field) => {
      const widthClass =
        field.width === FieldWidth.Half
          ? "col-span-6"
          : field.width === FieldWidth.Third
            ? "col-span-4"
            : "col-span-12";

      return (
        <FormField
          key={field.name}
          control={form.control}
          name={field.name}
          render={({ field: fieldProps }) => (
            <FormItem
              className={cn(
                widthClass,
                field.type === FieldInputType.Checkbox &&
                  "flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4",
              )}
            >
              {field.type !== FieldInputType.Checkbox && (
                <FormLabel>{field.label}</FormLabel>
              )}
              <FormControl>{renderFormField(field, fieldProps)}</FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[650px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="py-4">
            {(() => {
              const hasSections = fields.some((field) => field.section);

              if (hasSections) {
                const sections = [
                  ...new Set(fields.map((field) => field.section || "Inne")),
                ];

                return sections.map((sectionName) => (
                  <div key={sectionName} className="mb-6">
                    <h3 className="text-lg font-medium mb-3 border-b pb-2">
                      {sectionName}
                    </h3>
                    <div className="grid grid-cols-12 gap-4">
                      {renderFields(
                        fields.filter(
                          (field) => (field.section || "Inne") === sectionName,
                        ),
                      )}
                    </div>
                  </div>
                ));
              } else {
                return (
                  <div className="grid grid-cols-12 gap-4">
                    {renderFields(fields)}
                  </div>
                );
              }
            })()}
            <DialogFooter className="pt-6 border-t mt-4 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="min-w-[100px]"
              >
                Anuluj
              </Button>
              <Button type="submit" className="min-w-[100px]">
                Zapisz
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
