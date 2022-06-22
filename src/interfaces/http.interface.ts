export interface ResponseHandler {
  success: boolean;
  status: number;
  headers: unknown;
  data: any;
  message: string;
}
