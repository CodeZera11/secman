"use client"

import { Project } from "@/constants/types"
import CreateProjectForm from "@/forms/projects/create-project-form"
import EditProjectForm from "@/forms/projects/edit-project-form"
import { Button } from "@repo/ui/components/ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@repo/ui/components/ui/dialog"
import { useState } from "react"
import { BiEdit } from "react-icons/bi"

const EditProjectDialog = ({ project }: { project: Project }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          variant="secondary"
          size="sm"
          className="flex items-center space-x-1"
        >
          <BiEdit className="h-4 w-4" />
          <span>Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Update Project
          </DialogTitle>
        </DialogHeader>
        <EditProjectForm project={project} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

export default EditProjectDialog