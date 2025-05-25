import { TooltipProvider } from "../tooltip";
import {
  TableDropdownOperation,
  TableOperation,
  TableSingleOperation,
} from "./table-utils";

interface TableSelectOperationsProps {
  singleOperations: TableOperation[];
  dropdownOperations: TableDropdownOperation[];
}

export const TableSelectOperations = ({
  singleOperations,
  dropdownOperations,
}: TableSelectOperationsProps) => {
  return (
    <div className="flex items-center justify-center gap-3">
      <TooltipProvider>
        {dropdownOperations.length > 0 && (
          <TableDropdownOperation
            title={dropdownOperations[0].title}
            icon={dropdownOperations[0].icon}
            operations={dropdownOperations[0].operations}
          />
        )}
        {singleOperations.map((operation) => (
          <TableSingleOperation key={operation.operation} {...operation} />
        ))}
      </TooltipProvider>
    </div>
  );
};
