export interface QueryParamOptions {
  page?: number;
  limit?: number;
  search?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}
