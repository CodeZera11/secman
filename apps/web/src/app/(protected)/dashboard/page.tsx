import Link from 'next/link';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { PageRoutes } from '@/constants/page-routes';
import UserButton from '@/components/common/user-button';
import ProjectsContainer from './_components/projects-container';
import { getProjects } from '@/actions/projects';

const DashboardPage = async () => {

  const session = await auth();
  const data = await getProjects();

  if (!session?.user) {
    redirect(PageRoutes.AUTH.LOGIN);
  }


  if (!data?.data) {
    return <div>{data?.message}</div>
  }

  return (
    <div className='flex flex-col h-full'>
      <nav className='w-full flex items-center justify-between gap-10 px-10 py-5'>
        <Link href={PageRoutes.PUBLIC.HOME} className='text-2xl font-bold'>
          Secman
        </Link>
        <UserButton user={session?.user} />
      </nav>
      <ProjectsContainer projects={data?.data} />
    </div>
  )
}

export default DashboardPage