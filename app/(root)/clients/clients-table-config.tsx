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
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nazwisko" />
    ),
    enableSorting: true,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    enableSorting: true,
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Telefon" />
    ),
    enableSorting: true,
  },
  {
    accessorKey: "city",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Miasto" />
    ),
    enableSorting: true,
  },
  {
    accessorKey: "street",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ulica" />
    ),
    enableSorting: true,
  },
  {
    accessorKey: "postalCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kod pocztowy" />
    ),
    enableSorting: true,
  },
  {
    accessorKey: "country",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kraj" />
    ),
    enableSorting: true,
  },
  {
    accessorKey: "dateOfBirth",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data urodzenia" />
    ),
    enableSorting: true,
  },
  {
    accessorKey: "notes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Notatki" />
    ),
    enableSorting: true,
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
            <DropdownMenuLabel>Akcje</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edytuj</DropdownMenuItem>
            <DropdownMenuItem>Usuń</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
