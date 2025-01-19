"use server";

import { ApiEndpoints } from "@/constants/api";
import axios, { AxiosResponse } from "axios";
import { getAuthToken } from "./token";
import { Project, ServerResponse } from "@/constants/types";
import { CreateProjectRequest } from "@repo/types";

export const getProjects = async (): Promise<ServerResponse<
  Project[]
> | null> => {
  try {
    const token = await getAuthToken();

    if (!token) {
      throw new Error("Please login to continue!");
    }

    const response: AxiosResponse<ServerResponse<Project[]>> = await axios.get(
      ApiEndpoints.PROJECTS,
      {
        headers: {
          Authorization: `Bearer ${token.data}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log({ error });
    return null;
  }
};

export const createProject = async (
  data: CreateProjectRequest
): Promise<ServerResponse<Project> | null> => {
  try {
    const token = await getAuthToken();

    if (!token) {
      throw new Error("Please login to continue!");
    }

    const response: AxiosResponse<ServerResponse<Project>> = await axios.post(
      ApiEndpoints.PROJECTS,
      data,
      {
        headers: {
          Authorization: `Bearer ${token.data}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log({ error });
    return null;
  }
};
