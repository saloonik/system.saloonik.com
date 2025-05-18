import { Pagination } from "./data-table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  pageProperties: Pagination;
}

export function DataTablePagination<TData>({
  table,
  pageProperties,
}: DataTablePaginationProps<TData>) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageSizeChange = (value: string) => {
    table.setPageSize(Number(value));
    const params = new URLSearchParams(searchParams.toString());
    params.set("pageSize", value);
    router.replace(`?${params.toString()}`);
  };

  const handlePageNumberChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("pageNumber", value);
    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between p-3">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} z{" "}
        {table.getFilteredRowModel().rows.length} wierszy zaznaczonych.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Wierszy na stronę</p>
          <Select
            value={pageProperties.pageSize.toString()}
            onValueChange={handlePageSizeChange}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Strona {pageProperties.pageNumber} z {pageProperties.totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => handlePageNumberChange("1")}
                disabled={pageProperties.pageNumber === 1}
              >
                <span className="sr-only">Przejdź do pierwszej strony</span>
                <ChevronsLeft />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Pierwsza strona</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() =>
                  handlePageNumberChange(
                    `${Math.max(1, pageProperties.pageNumber - 1)}`,
                  )
                }
                disabled={pageProperties.pageNumber === 1}
              >
                <span className="sr-only">Przejdź do poprzedniej strony</span>
                <ChevronLeft />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Poprzednia strona</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() =>
                  handlePageNumberChange(
                    `${Math.min(pageProperties.totalPages, pageProperties.pageNumber + 1)}`,
                  )
                }
                disabled={
                  pageProperties.pageNumber === pageProperties.totalPages
                }
              >
                <span className="sr-only">Przejdź do następnej strony</span>
                <ChevronRight />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Następna strona</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() =>
                  handlePageNumberChange(`${pageProperties.totalPages}`)
                }
                disabled={
                  pageProperties.pageNumber === pageProperties.totalPages
                }
              >
                <span className="sr-only">Przejdź do ostatniej strony</span>
                <ChevronsRight />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Ostatnia strona</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
