"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { type CreateCredentialsUserRequest, CreateCredentialsUserSchema } from "@repo/types"
import { useForm } from "react-hook-form"
import { Form } from "@repo/ui/components/ui/form"
import InputElement from "@repo/ui/form-elements/input-element"
import { Button } from "@repo/ui/components/ui/button"
import FormError from "@/components/common/form-error"
import FormSuccess from "@/components/common/form-success"
import { useState, useTransition } from "react"
import { register } from "@/actions/register"

const RegisterForm = () => {

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const form = useForm<CreateCredentialsUserRequest>({
    resolver: zodResolver(CreateCredentialsUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    }
  })

  const onSubmit = async (values: CreateCredentialsUserRequest) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      register(values).then((res) => {
        if (res.success) {
          setSuccess(res.success)
          form.reset()
        } else if (res.error) {
          setError(res.error)
        }
      })
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <InputElement
            label="Name"
            name="name"
            placeholder="John Doe"
            disabled={isPending}
          />
          <InputElement
            label="Email"
            name="email"
            placeholder="johndoe@gmail.com"
            disabled={isPending}
          />
          <InputElement
            label="Password"
            name="password"
            type="password"
            placeholder="********"
            disabled={isPending}
          />
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button type="submit" disabled={isPending} className="w-full" size="lg">
          Register
        </Button>
      </form>
    </Form>
  )
}

export default RegisterForm