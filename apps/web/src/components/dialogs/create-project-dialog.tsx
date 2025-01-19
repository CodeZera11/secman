"use client"

import CreateProjectForm from "@/forms/projects/create-project-form"
import { Button } from "@repo/ui/components/ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@repo/ui/components/ui/dialog"

const CreateProjectDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant='secondary' size="lg">
          Create Project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create Project
          </DialogTitle>
        </DialogHeader>
        <CreateProjectForm />
      </DialogContent>
    </Dialog>
  )
}

export default CreateProjectDialog