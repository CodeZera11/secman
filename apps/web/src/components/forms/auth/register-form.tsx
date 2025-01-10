"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CreateCredentialsUserRequest, CreateCredentialsUserSchema } from "@repo/types"
import { useForm } from "react-hook-form"
import { Form } from "@repo/ui/components/ui/form"
import { Button } from "@repo/ui/components/ui/button"

const RegisterForm = () => {

  const form = useForm<CreateCredentialsUserRequest>({
    resolver: zodResolver(CreateCredentialsUserSchema),
    defaultValues: {

    }
  })

  const onSubmit = async (values: CreateCredentialsUserRequest) => {
    console.log({ values })
    return {}
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>

      </form>
    </Form>
  )
}

export default RegisterForm