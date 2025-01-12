import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
  const session = useSession();

  if (!session.data && session.status !== "loading") {
    return null;
  }

  return {user: session?.data?.user, isLoading: session.status === "loading"};
};
