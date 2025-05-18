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
): Promise<ApiResponse<Client[]>> => {
  try {
    const { data } = await api.get<ApiResponse<Client[]>>(
      `/api/Clients/Get?PageNumber=${query?.pageNumber ?? 1}&PageSize=${query?.pageSize ?? 10}&SearchTerm=${query?.searchTerm ?? ""}`,
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      },
    );
    return data;
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw new Error("Failed to fetch clients");
  }
};
