"use server";

import { cookies } from "next/headers";

export const getAuthToken = async () => {
  const cookiesStore = await cookies();

  const token =
    cookiesStore.get("__Secure-authjs.session-token")?.value ??
    cookiesStore.get("authjs.session-token")?.value;
  return {
    data: token,
  };
};
