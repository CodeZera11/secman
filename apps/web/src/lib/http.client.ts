import { getAuthToken } from "@/actions/token";
import { BASE_API_URL } from "@/constants/api";
import axios from "axios";

const axiosClient = axios.create({
  baseURL: BASE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(async (request: any) => {
  const token = (await getAuthToken()).data;
  request.headers.Authorization = `Bearer ${token}`;
  return request;
});

axiosClient.interceptors.response.use((response: any) => {
  if (response && response.data) {
    return response.data;
  }
  return response;
});

export default class HttpClient {
  static async get<T>(url: string, params?: unknown) {
    return await axiosClient.get<T>(url, {
      params,
    });
  }

  static async post<T>(url: string, data: unknown, options?: any) {
    return await axiosClient.post<T>(url, data, options);
  }

  static async patch<T>(url: string, data: unknown) {
    return await axiosClient.patch<T>(url, data);
  }

  static async delete<T>(url: string) {
    return await axiosClient.delete<T>(url);
  }
}
