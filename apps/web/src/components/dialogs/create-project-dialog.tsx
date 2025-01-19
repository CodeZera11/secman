"use client"

import CreateProjectForm from "@/forms/projects/create-project-form"
import { Button } from "@repo/ui/components/ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@repo/ui/components/ui/dialog"
import { useState } from "react"

const CreateProjectDialog = () => {

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        <CreateProjectForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

export default CreateProjectDialog