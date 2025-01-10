"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { type CreateCredentialsUserRequest, CreateCredentialsUserSchema } from "@repo/types"
import { useForm } from "react-hook-form"
import { Form } from "@repo/ui/components/ui/form"
import InputElement from "@repo/ui/form-elements/input-element"

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <InputElement
          label="Name"
          name="name"
        />
        <InputElement
          label="Email"
          name="email"
        />
        <InputElement
          label="Password"
          name="password"
          type="password"
        />
      </form>
    </Form>
  )
}

export default RegisterForm