"use server";

import { getToken } from "./projects";
import { revalidateTag } from "next/cache";
import { ApiEndpoints } from "@/constants/api";
import { CreateMultipleSecretsRequest } from "@repo/types";

export const createSecret = async (
  projectId: string,
  data: CreateMultipleSecretsRequest
) => {
  try {
    const token = await getToken();
    const response = await fetch(`${ApiEndpoints.SECRETS}/${projectId}/bulk`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    revalidateTag("posts");
    return { success: "Secrets added successfully!" };
  } catch (error) {
    console.log({ error });
    return null;
  }
};
