import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./form";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Control } from "react-hook-form";

export interface CustomFormField {
  name: string;
  label: string;
  control: Control<any>;
  children?: ReactNode;
  renderField?: (field: any) => ReactNode;
  className?: string;
  placeholder?: string;
  type?: string;
}

export const CustomFormField: React.FC<CustomFormField> = ({
  name,
  label,
  control,
  children,
  renderField,
  className,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {renderField ? renderField(field) : children}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
