import { api } from "./axios";
import { ApiResponse, Client } from "@/types/response";
import { cookies } from "next/headers";

interface QueryParams {
  pageNumber?: string;
  pageSize?: string;
  searchTerm?: string;
}

const getToken = async () => {
  return (await cookies()).get("token")?.value;
};

export const getClients = async (
  query?: QueryParams,
): Promise<ApiResponse<Client[]> | null> => {
  try {
    const pageNumber = query?.pageNumber ?? "1";
    const pageSize = query?.pageSize ?? "10";
    const searchTerm = query?.searchTerm ?? "";

    const { data } = await api.get<ApiResponse<Client[]>>(
      `/api/Clients/Get?PageNumber=${pageNumber}&PageSize=${pageSize}&SearchTerm=${searchTerm}`,
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      },
    );
    return data;
  } catch (error) {
    console.error("Error fetching clients:", error);
    return null;
  }
};
