import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { ChevronDown, FileDown, Trash2, UserPlus2 } from "lucide-react";

export const TableDefaultOperations = () => {
  return (
    <div className="flex items-center justify-center gap-3">
      <TooltipProvider>
        <TableSingleOperation
          icon={<UserPlus2 size={20} />}
          operation="Dodaj"
        />
        <TableDropdownOperation
          icon={<FileDown size={20} />}
          operations={["Excel", "CSV", "JSON"]}
        />
        <TableSingleOperation
          icon={<Trash2 size={20} color="#EF4444" />}
          operation="Usuń wszystko"
        />
      </TooltipProvider>
    </div>
  );
};

const TableSingleOperation = ({
  icon,
  operation,
}: {
  icon: React.ReactNode;
  operation: string;
}) => {
  return (
    <Tooltip>
      <TooltipTrigger className="cursor-pointer border p-2 rounded-md">
        {icon}
      </TooltipTrigger>
      <TooltipContent>{operation}</TooltipContent>
    </Tooltip>
  );
};

const TableDropdownOperation = ({
  icon,
  operations,
}: {
  icon: React.ReactNode;
  operations: string[];
}) => {
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
          <TooltipContent>Eksportuj</TooltipContent>
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
