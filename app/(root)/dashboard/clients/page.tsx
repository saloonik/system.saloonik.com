import {
  clientColumns,
  clientsDropdownSelectOperations,
  clientsSingleSelectOperations,
} from "./clients-table-config";
import { CreateClientDialog } from "./create-client-dialog";
import { DataTable } from "@/components/ui/table/data-table";
import { getClients } from "@/lib/data";

export default async function Clients({
  searchParams,
}: {
  searchParams?: { pageNumber: number; pageSize: number; searchTerm: string };
}) {
  const { pageNumber, pageSize, searchTerm } = (await searchParams) ?? {
    pageNumber: 1,
    pageSize: 10,
    searchTerm: "",
  };

  const {
    data,
    pageNumber: currentPage,
    pageSize: currentSize,
    totalCount,
    totalPages,
  } = await getClients({
    pageNumber,
    pageSize,
    searchTerm,
  });

  return (
    <div className="flex justify-center w-3/5 m-5">
      <DataTable
        title="Klienci"
        columns={clientColumns}
        data={data.flat()}
        pageProperties={{
          pageNumber: currentPage,
          pageSize: currentSize,
          totalCount,
          totalPages,
        }}
        singleSelectOperations={clientsSingleSelectOperations}
        dropdownSelectOperations={clientsDropdownSelectOperations}
        customOperationsComponents={[<CreateClientDialog />]}
      />
    </div>
  );
}
