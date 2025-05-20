import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { Button } from './button';

export const DownloadSampleClientFiles = () => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto hidden h-8 lg:flex"
          >
            Pobierz przykładowe pliki
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>Formaty plików do importu klientów</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <a href="/sample.xlsx" download>
              Pobierz plik Excel (.xlsx)
            </a>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <a href="/sample.xls" download>
              Pobierz plik Excel 97-2003 (.xls)
            </a>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <a href="/sample.csv" download>
              Pobierz plik CSV (.csv)
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
