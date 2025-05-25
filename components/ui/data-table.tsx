"use client";

import { TableDefaultOperations } from "../table-default-operations";
import { DataTableSearchBar } from "./data-table-searchbar";
import { DataTablePagination } from "./table-pagination";
import { DataTableViewOptions } from "./table-view-options";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { useState } from "react";

export interface Pagination {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageProperties: Pagination;
  title: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageProperties,
  title,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    "Data urodzenia": false,
    "Kod pocztowy": false,
    Notatki: false,
    Kraj: false,
  });
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex: pageProperties.pageNumber - 1,
    pageSize: pageProperties.pageSize,
  });

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      pagination,
    },
    manualPagination: true,
    pageCount: pageProperties.totalPages,
  });

  return (
    <div className="rounded-md border flex flex-col h-full">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="flex items-center">
          <span className="text-sm text-muted-foreground">
            {pageProperties.totalCount} wyników
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between p-4">
        <DataTableSearchBar />
        <div className="flex items-center gap-3">
          <TableDefaultOperations />
          <DataTableViewOptions table={table} />
        </div>
      </div>
      <div className="relative flex-grow overflow-hidden">
        <Table className="w-full table-fixed">
          <TableHeader className="sticky top-0 z-20">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={`sticky top-0 z-20 px-4 py-2 whitespace-nowrap overflow-hidden text-ellipsis ${
                      header.id === "select" ? "w-[50px]" : "w-fit text-left"
                    } ${header.id === "Akcje" ? "text-right ml-auto" : ""}`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
        </Table>
        <div className="h-auto max-h-[calc(100vh-18rem)] overflow-y-auto w-full">
          <Table className="w-full table-fixed">
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={`px-4 py-2 whitespace-nowrap overflow-hidden text-ellipsis ${
                          cell.column.id === "select" ? "w-[50px]" : ""
                        } ${cell.column.id === "Akcje" ? "text-right" : ""}`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Brak wyników.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <DataTablePagination table={table} pageProperties={pageProperties} />
    </div>
  );
}
