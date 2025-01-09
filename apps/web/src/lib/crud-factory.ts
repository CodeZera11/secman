import { BaseQueryParamOptions } from "@/constants/types";
import HttpClient from "./http-client";

export interface PaginatorInfo<T> {
  data: T[];
  totalPages: number;
}

export function crudFactory<
  Type,
  InputData = {},
  QueryParams = BaseQueryParamOptions,
>(endpoint: string) {
  return {
    all(params?: QueryParams) {
      return HttpClient.get<Type>(endpoint, params);
    },
    paginated(params?: QueryParams) {
      return HttpClient.get<PaginatorInfo<Type>>(endpoint, params);
    },
    getBySlug(slug: string, params?: unknown) {
      return HttpClient.get<Type>(`${endpoint}/${slug}`, params);
    },
    getById(id: string, params?: unknown) {
      return HttpClient.get<Type>(`${endpoint}/${id}`, params);
    },
    create(data: InputData) {
      return HttpClient.post<Type>(endpoint, data);
    },
    update(id: string, data: InputData) {
      return HttpClient.patch<Type>(`${endpoint}/${id}`, data);
    },
    delete(id: string) {
      return HttpClient.delete<Type>(`${endpoint}/${id}`);
    },
  };
}
