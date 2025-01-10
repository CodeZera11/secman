"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { type CreateCredentialsUserRequest, CreateCredentialsUserSchema } from "@repo/types"
import { useForm } from "react-hook-form"
import { Form } from "@repo/ui/components/ui/form"
import InputElement from "@repo/ui/form-elements/input-element"
import { Button } from "@repo/ui/components/ui/button"
import FormError from "@/components/common/form-error"
import FormSuccess from "@/components/common/form-success"

const RegisterForm = () => {

  const form = useForm<CreateCredentialsUserRequest>({
    resolver: zodResolver(CreateCredentialsUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    }
  })

  const onSubmit = async (values: CreateCredentialsUserRequest) => {
    console.log({ values })
    return {}
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <InputElement
            label="Name"
            name="name"
            placeholder="John Doe"
          />
          <InputElement
            label="Email"
            name="email"
            placeholder="johndoe@gmail.com"
          />
          <InputElement
            label="Password"
            name="password"
            type="password"
            placeholder="********"
          />
        </div>
        <FormError message={"Something went wrong!"} />
        <FormSuccess message={"Something went wrong!"} />
        <Button type="submit" className="w-full" size="lg">
          Register
        </Button>
      </form>
    </Form>
  )
}

export default RegisterForm