'use client'

import { deleteProject } from '@/actions/projects'
import CreateProjectDialog from '@/components/dialogs/create-project-dialog'
import EditProjectDialog from '@/components/dialogs/edit-project-dialog'
import { Project } from '@/constants/types'
import { Button } from '@repo/ui/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@repo/ui/components/ui/card'
import { useTransition } from 'react'
import { BsEye, BsTrash2 } from 'react-icons/bs'
import { format } from "date-fns"
import { SecretsDialog } from '@/components/dialogs/secrets-dialog'

interface ProjectsContainerProps {
  projects: Project[]
}

const ProjectsContainer: React.FC<ProjectsContainerProps> = ({ projects }) => {

  const [isPending, startTransition] = useTransition();

  const onDelete = (id: string) => {
    startTransition(() => {
      deleteProject(id)
    })
  }

  return (
    <div className="w-full mx-auto px-10 py-5 space-y-10">
      <div className='flex items-center justify-between gap-5'>
        <h1 className="text-2xl font-bold mb-4">Projects and Secrets</h1>
        <CreateProjectDialog />
      </div>
      {!projects.length && (
        <div className='h-40 border rounded-2xl border-neutral-600 flex items-center justify-center flex-col gap-1'>
          <h1 className='text-2xl'>No projects found!</h1>
          <p className='text-sm text-neutral-400'>Please create a project!</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => {
          const { id, name, secrets, createdAt, updatedAt } = project;
          const secretsCount = secrets.length;
          return (
            <Card key={id} className="w-full relative hover:shadow-lg transition-shadow duration-300 text-white bg-neutral-800/20 border-neutral-600">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <h3 className="text-lg font-semibold">{name}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2  hover:text-red-600"
                  onClick={() => onDelete(id)}
                  disabled={isPending}
                  aria-label="Delete project"
                >
                  <BsTrash2 className="h-5 w-5" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm ">ID: {id}</p>
                  <p className="text-sm">Number of Secrets: {secretsCount}</p>
                  <p className="text-sm ">Created: {format(new Date(createdAt), "dd MMM yyyy, hh:mm a")}</p>
                  <p className="text-sm ">Updated: {format(new Date(updatedAt), "dd MMM yyyy, hh:mm a")}</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <EditProjectDialog project={project} />
                <SecretsDialog project={project} />
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default ProjectsContainer;