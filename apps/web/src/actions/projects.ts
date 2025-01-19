"use server";

import { ApiEndpoints } from "@/constants/api";
import { getAuthToken } from "./token";
import { Project, ServerResponse } from "@/constants/types";
import { CreateProjectRequest } from "@repo/types";
import { revalidateTag } from "next/cache";

export const getProjects = async () => {
  try {
    const token = await getToken();

    const response = await fetch(ApiEndpoints.PROJECTS, {
      method: "GET",
      next: {
        tags: ["projects"],
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ServerResponse<Project[]> = await response.json();
    return data;
  } catch (error) {
    console.log({ error });
    return null;
  }
};

export const createProject = async (
  data: CreateProjectRequest
): Promise<ServerResponse<Project> | null> => {
  try {
    const token = await getToken();
    const response = await fetch(ApiEndpoints.PROJECTS, {
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
    const responseData: ServerResponse<Project> = await response.json();

    return responseData;
  } catch (error) {
    console.log({ error });
    return null;
  }
};

export const updateProject = async (
  id: string,
  data: Partial<CreateProjectRequest>
): Promise<ServerResponse<Project> | null> => {
  try {
    const token = await getToken();
    const response = await fetch(`${ApiEndpoints.PROJECTS}/${id}`, {
      method: "PATCH",
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

    const responseData: ServerResponse<Project> = await response.json();
    return responseData;
  } catch (error) {
    console.log({ error });
    return null;
  }
};

export const deleteProject = async (id: string) => {
  try {
    const token = await getToken();
    const response = await fetch(`${ApiEndpoints.PROJECTS}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    revalidateTag("posts");
    const responseData: ServerResponse<Project> = await response.json();

    return responseData;
  } catch (error) {
    console.log({ error });
    return null;
  }
};

const getToken = async () => {
  const token = await getAuthToken();
  if (!token) {
    throw new Error("Please login to continue!");
  }

  return token.data;
};
