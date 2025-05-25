import { TooltipProvider } from "../tooltip";
import {
  TableDropdownOperation,
  TableOperation,
  TableSingleOperation,
} from "./table-utils";

interface TableSelectOperationsProps {
  singleSelectOperations: TableOperation[];
  dropdownSelectOperations: TableDropdownOperation[];
}

export const TableSelectOperations = ({
  singleSelectOperations,
  dropdownSelectOperations,
}: TableSelectOperationsProps) => {
  return (
    <div className="flex items-center justify-center gap-3">
      <TooltipProvider>
        {dropdownSelectOperations.length > 0 && (
          <TableDropdownOperation
            title={dropdownSelectOperations[0].title}
            icon={dropdownSelectOperations[0].icon}
            operations={dropdownSelectOperations[0].operations}
          />
        )}
        {singleSelectOperations.map((operation) => (
          <TableSingleOperation key={operation.operation} {...operation} />
        ))}
      </TooltipProvider>
    </div>
  );
};
