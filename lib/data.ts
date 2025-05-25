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
    const pageNumber = query?.pageNumber ?? 1;
    const pageSize = query?.pageSize ?? 10;
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
    throw new Error("Failed to fetch clients");
  }
};
