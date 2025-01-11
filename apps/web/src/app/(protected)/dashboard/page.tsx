import { Button } from '@repo/ui/components/ui/button';
import { auth, signOut } from '@/auth'

const DashboardPage = async () => {

  const session = await auth();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{JSON.stringify(session)}</p>
      <form action={async () => {
        "use server"

        await signOut();
      }}>
        <Button
          type='submit'
        >
          Sign Out
        </Button>
      </form>
    </div >
  )
}

export default DashboardPage