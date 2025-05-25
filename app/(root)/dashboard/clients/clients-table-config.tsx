"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/ui/table-header-column";
import { getCheckboxColumn } from "@/components/ui/table-utils";
import { Client } from "@/types/response";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

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
