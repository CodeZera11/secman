import { Project } from '@/constants/types'
import { Button } from '@repo/ui/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/ui/card'

interface ProjectsContainerProps {
  projects: Project[]
}

const ProjectsContainer: React.FC<ProjectsContainerProps> = ({ projects }) => {
  console.log({ projects })
  return (
    <div className="w-full mx-auto px-10 py-5 space-y-10">
      <div className='flex items-center justify-between gap-5'>
        <h1 className="text-2xl font-bold mb-4">Projects and Secrets</h1>
        <Button variant='secondary' size="lg">
          Create Project
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="w-full bg-neutral-800 hover:bg-neutral-800/70 text-neutral-300 hover:text-neutral-100 duration-300 transition-colors cursor-pointer border-neutral-600">
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300">
                Number of secrets: {project.secrets.length}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ProjectsContainer;