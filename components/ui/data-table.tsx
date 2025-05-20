"use client";

import { DataTableSearchBar } from "./data-table-searchbar";
import { DownloadSampleClientFiles } from "./download-sample-files";
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
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

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
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageProperties,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
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
    <div className="rounded-md border">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-lg font-semibold">Tabela Klientów</h2>
        <div className="flex items-center">
          <span className="text-sm text-muted-foreground">
            {pageProperties.totalCount} wyników
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between p-4">
        <DataTableSearchBar />
        <div className="flex">
        <DownloadSampleClientFiles/>
        <DataTableViewOptions table={table} />
        </div>
      </div>

      {/* Add data refresh notification */}
      {data.length === 0 && pageProperties.totalCount > 0 && (
        <div className="p-2 text-sm bg-yellow-100 text-center">
          Ładowanie danych... Jeśli dane nie pojawiają się, spróbuj odświeżyć
          stronę.
        </div>
      )}

      <div className="relative">
        <Table className="w-full table-fixed">
          <TableHeader className="sticky top-0 z-20">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="sticky top-0 z-20 px-4 py-2 whitespace-nowrap overflow-hidden text-ellipsis"
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
        <div className="max-h-96 overflow-y-auto w-full">
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
                        className="px-4 py-2 whitespace-nowrap overflow-hidden text-ellipsis"
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
