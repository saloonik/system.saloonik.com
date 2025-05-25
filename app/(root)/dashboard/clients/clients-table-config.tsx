"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/ui/table/table-header-column";
import {
  exportOptions,
  getCheckboxColumn,
  TableDropdownOperation,
  TableOperation,
} from "@/components/ui/table/table-utils";
import { Client } from "@/types/response";
import { ColumnDef } from "@tanstack/react-table";
import { FileDown, MoreHorizontal, Trash2 } from "lucide-react";

export const clientColumns: ColumnDef<Client>[] = [
  getCheckboxColumn(),
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Imię" />
    ),
    enableSorting: true,
    id: "Imię",
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nazwisko" />
    ),
    enableSorting: true,
    id: "Nazwisko",
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    enableSorting: true,
    id: "Email",
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Telefon" />
    ),
    enableSorting: true,
    id: "Telefon",
  },
  {
    accessorKey: "city",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Miasto" />
    ),
    enableSorting: true,
    id: "Miasto",
  },
  {
    accessorKey: "street",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ulica" />
    ),
    enableSorting: true,
    id: "Ulica",
  },
  {
    accessorKey: "postalCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kod pocztowy" />
    ),
    enableSorting: true,
    id: "Kod pocztowy",
  },
  {
    accessorKey: "country",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kraj" />
    ),
    enableSorting: true,
    id: "Kraj",
  },
  {
    accessorKey: "dateOfBirth",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data urodzenia" />
    ),
    enableSorting: true,
    id: "Data urodzenia",
  },
  {
    accessorKey: "notes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Notatki" />
    ),
    enableSorting: true,
    id: "Notatki",
  },
  {
    accessorKey: "actions",
    header: "Akcje",
    enableSorting: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Otwórz menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edytuj</DropdownMenuItem>
            <DropdownMenuItem>Usuń</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    id: "Akcje",
  },
];

export const clientsSingleSelectOperations: TableOperation[] = [
  {
    icon: <Trash2 size={20} color="#EF4444" />,
    operation: "Usuń zaznaczone",
  },
];

export const clientsDropdownSelectOperations: TableDropdownOperation[] = [
  {
    title: "Eksportuj zaznaczone",
    icon: <FileDown size={20} />,
    operations: exportOptions,
  },
];
