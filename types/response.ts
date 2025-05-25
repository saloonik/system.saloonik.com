export interface AuthApiResponse {
  isSuccess: boolean;
  refreshToken: string;
  resultDescription: string;
  resultTitle: string;
  statusCode: number;
  statusMessage: string;
  token: string;
}

export interface ApiResponse<T> {
  isSuccess: boolean;
  resultTitle: string;
  resultDescription: string;
  statusCode: number;
  statusMessage: string;
  token: string | null;
  refreshToken: string | null;
  data: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface Client {
  clientId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  dateOfBirth: string | null;
  notes: string;
  companyId: string;
  reservations: any[] | null;
}
