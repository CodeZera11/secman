import UserContainer from "@/components/user-container"
import { usersClient } from "@/data/clients/usersClient";
import queryClient from "@/lib/server-query.client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const HomePage = async () => {
  await queryClient.prefetchQuery({
    queryKey: ["users"],
    queryFn: () => usersClient.all(),
  })

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UserContainer />
      </HydrationBoundary>
    </div>
  )
}

export default HomePage;