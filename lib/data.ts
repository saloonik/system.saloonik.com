import { api } from "./axios";
import { ApiResponse, Client } from "@/types/response";
import { cookies } from "next/headers";

interface QueryParams {
  pageNumber?: number;
  pageSize?: number;
  searchTerm?: string;
}

const getToken = async () => {
  return (await cookies()).get("token")?.value;
};

export const getClients = async (
  query?: QueryParams,
): Promise<ApiResponse<Client[]>> => {
  try {
    const { data } = await api.get<ApiResponse<Client[]>>(
      query
        ? `/api/Clients/Get?PageNumber=${query?.pageNumber}&PageSize=${query?.pageSize}&SearchTerm=${query?.searchTerm}`
        : "/api/Clients/Get",
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      },
    );
    return data;
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw error;
  }
};
