import { Checkbox } from "../checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "../tooltip";
import { ChevronDown } from "lucide-react";

export interface TableOperation {
  icon: React.ReactNode;
  operation: string;
  onClick?: () => void;
}

export interface TableDropdownOperation {
  title: string;
  icon: React.ReactNode;
  operations: string[];
}

export const exportOptions = ["XLS", "CSV", "XLSX", "PDF"];

export const getCheckboxColumn = () => ({
  id: "select",
  header: ({ table }: any) => (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && "indeterminate")
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
    />
  ),
  cell: ({ row }: any) => (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
    />
  ),
});

export const TableSingleOperation = ({
  icon,
  operation,
  ...props
}: TableOperation & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button className="cursor-pointer border p-2 rounded-md" {...props}>
          {icon}
        </button>
      </TooltipTrigger>
      <TooltipContent>{operation}</TooltipContent>
    </Tooltip>
  );
};

export const TableDropdownOperation = ({
  title,
  icon,
  operations,
}: TableDropdownOperation) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer border p-2 rounded-md flex items-center gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="flex items-center gap-1">
              {icon}
              <ChevronDown className="w-3 h-3 text-muted-foreground" />
            </span>
          </TooltipTrigger>
          <TooltipContent>{title}</TooltipContent>
        </Tooltip>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {operations.map((operation) => (
          <DropdownMenuItem key={operation}>{operation}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
