import { clientColumns } from "./clients-table-config";
import { DataTable } from "@/components/ui/data-table";
import { getClients } from "@/lib/data";

export default async function Clients() {
  const clients = await getClients();

  return <DataTable columns={clientColumns} data={clients.data.flat()} />;
}
