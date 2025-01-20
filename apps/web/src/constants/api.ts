import { validatedEnv } from "@/lib/env.config";

export const BASE_API_URL = validatedEnv.NEXT_PUBLIC_BASE_API_URL;

export const ApiEndpoints = {
  USERS: BASE_API_URL + "/users",
  PROJECTS: BASE_API_URL + "/projects",
  SECRETS: BASE_API_URL + "/secrets"
};
