"use client"

import { useSession } from "next-auth/react"

const ClientPage = () => {
  const { data, status } = useSession()

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if(status === "unauthenticated") {
    return <div>Unauthenticated</div>
  }

  return (
    <div>ClientPage</div>
  )
}

export default ClientPage