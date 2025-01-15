import Link from 'next/link';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { PageRoutes } from '@/constants/page-routes';
import UserButton from '@/components/common/user-button';
import { getAuthToken } from '@/actions/token';

const DashboardPage = async () => {

  const session = await auth();

  const token = await getAuthToken()

  if (!session?.user) {
    redirect(PageRoutes.AUTH.LOGIN);
  }



  return (
    <div className='flex flex-col h-full'>
      <nav className='w-full flex items-center justify-between gap-10 px-10 py-5'>
        <Link href={PageRoutes.PUBLIC.HOME} className='text-2xl font-bold'>
          Secman
        </Link>
        <UserButton user={session?.user} />
        {token.data}
      </nav>
    </div>
  )
}

export default DashboardPage