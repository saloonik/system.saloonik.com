import { clientColumns } from "./clients-table-config";
import { DataTable } from "@/components/ui/data-table";
import { getClients } from "@/lib/data";

export default async function Clients({
  searchParams,
}: {
  searchParams: { pageNumber: string; pageSize: string; searchTerm: string };
}) {
  const { pageNumber, pageSize, searchTerm } = await searchParams;

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
    <div className="flex justify-center m-5">
      <DataTable
        columns={clientColumns}
        data={data.flat()}
        pageProperties={{
          pageNumber: currentPage,
          pageSize: currentSize,
          totalCount,
          totalPages,
        }}
      />
    </div>
  );
}
