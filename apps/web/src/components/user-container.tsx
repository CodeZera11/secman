'use client'

import { useCreateUserMutation, useGetUsers } from "@/data/hooks/useUsersClient";
import { Button } from "@repo/ui/components/ui/button";

const UserContainer = () => {

  const { data, isLoading } = useGetUsers();
  const { mutate: createUser, isPending } = useCreateUserMutation();

  const createMockUser = () => {
    const randomName = Math.random().toString(36).substring(7);
    createUser({
      name: randomName,
      email: `${randomName}@gmail.com`
    });
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-red-500 text-2xl p-10">
      <Button
        onClick={createMockUser}
        disabled={isPending}

      >
        Create Mock User
      </Button>
      {data?.data?.map((user) => (
        <div key={user.id}>
          {user.name} - {user.email}
        </div>
      ))}
    </div>
  );
}

export default UserContainer;
