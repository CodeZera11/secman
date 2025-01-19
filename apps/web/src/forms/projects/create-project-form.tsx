"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { AuthenticateUserRequest, AuthenticateUserSchema, CreateProjectRequest, CreateProjectSchema } from "@repo/types"
import { useForm } from "react-hook-form"
import { Form } from "@repo/ui/components/ui/form"
import InputElement from "@repo/ui/form-elements/input-element"
import { Button } from "@repo/ui/components/ui/button"
import FormError from "@/components/common/form-error"
import FormSuccess from "@/components/common/form-success"
import { useState, useTransition } from "react"
import { login } from "@/actions/login"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { PageRoutes } from "@/constants/page-routes"
import { createProject } from "@/actions/projects"

const CreateProjectForm = () => {

  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<CreateProjectRequest>({
    resolver: zodResolver(CreateProjectSchema),
    defaultValues: {
      name: ''
    }
  })

  const onSubmit = async (values: CreateProjectRequest) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      createProject(values)
      // login(values).then((data) => {
      //   setError(data?.error);
      //   setSuccess(data?.success);
      // })
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <InputElement
            label="Name"
            name="name"
            disabled={isPending}
            placeholder="Project Alpha"
          />
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button type="submit" disabled={isPending} className="w-full" size="lg" variant="secondary">
          Create Project
        </Button>
      </form>
    </Form>
  )
}

export default CreateProjectForm