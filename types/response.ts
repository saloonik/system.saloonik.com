export interface AuthApiResponse {
  isSuccess: boolean;
  refreshToken: string;
  resultDescription: string;
  resultTitle: string;
  statusCode: number;
  statusMessage: string;
  token: string;
}
