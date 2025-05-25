import { TooltipProvider } from "../tooltip";
import {
  exportOptions,
  TableDropdownOperation,
  TableSingleOperation,
} from "./table-utils";
import { FileDown, Trash2 } from "lucide-react";

interface TableDefaultOperationsProps {
  customOperationsComponents?: React.ReactNode[];
}

export const TableDefaultOperations = ({
  customOperationsComponents,
}: TableDefaultOperationsProps) => {
  return (
    <div className="flex items-center justify-center gap-3">
      <TooltipProvider>
        <TableDropdownOperation
          title="Eksportuj"
          icon={<FileDown size={20} />}
          operations={exportOptions}
        />
        {customOperationsComponents}
        <TableSingleOperation
          icon={<Trash2 size={20} color="#EF4444" />}
          operation="Usuń wszystko"
        />
      </TooltipProvider>
    </div>
  );
};
