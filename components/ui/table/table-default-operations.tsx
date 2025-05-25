import { TooltipProvider } from "../tooltip";
import {
  exportOptions,
  TableDropdownOperation,
  TableSingleOperation,
} from "./table-utils";
import { FileDown, Trash2, UserPlus2 } from "lucide-react";

export const TableDefaultOperations = () => {
  return (
    <div className="flex items-center justify-center gap-3">
      <TooltipProvider>
        <TableDropdownOperation
          title="Eksportuj"
          icon={<FileDown size={20} />}
          operations={exportOptions}
        />
        <TableSingleOperation
          icon={<UserPlus2 size={20} />}
          operation="Dodaj"
        />
        <TableSingleOperation
          icon={<Trash2 size={20} color="#EF4444" />}
          operation="Usuń wszystko"
        />
      </TooltipProvider>
    </div>
  );
};
