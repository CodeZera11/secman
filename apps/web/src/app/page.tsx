import { PageRoutes } from "@/constants/page-routes"
import { Button } from "@repo/ui/components/ui/button"
import Link from "next/link"

const HomePage = () => {
  return (
    <main className="h-full flex flex-col items-center justify-center gap-5 blue-gradient">
      <h1 className="text-6xl font-bold  text-white">
        EZIFIND
      </h1>
      <Button size="lg" variant="secondary" asChild>
        <Link href={PageRoutes.AUTH.LOGIN}>
          Sign In
        </Link>
      </Button>
    </main>
  )
}

export default HomePage