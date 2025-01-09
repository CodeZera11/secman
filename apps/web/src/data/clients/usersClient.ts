import { ApiEndpoints } from "@/constants/api";
import { crudFactory } from "@/lib/crud-factory";
import { CreateUserRequest, User } from "@repo/types";

export const usersClient = {
  ...crudFactory<User, CreateUserRequest>(ApiEndpoints.USERS),
};
