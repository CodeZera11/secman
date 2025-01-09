import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usersClient } from "../clients/usersClient";

export function useCreateUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: usersClient.create,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
}

export function useGetUsers() {
  const response = useQuery({
    queryKey: ["users"],
    queryFn: () => usersClient.all(),
  });

  return { ...response };
}
