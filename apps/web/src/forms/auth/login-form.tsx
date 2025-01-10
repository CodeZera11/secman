"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { AuthenticateUserRequest, AuthenticateUserSchema } from "@repo/types"
import { useForm } from "react-hook-form"
import { Form } from "@repo/ui/components/ui/form"
import InputElement from "@repo/ui/form-elements/input-element"
import { Button } from "@repo/ui/components/ui/button"
import FormError from "@/components/common/form-error"
import FormSuccess from "@/components/common/form-success"
import { useState, useTransition } from "react"
import { login } from "@/actions/login"

const LoginForm = () => {

  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<AuthenticateUserRequest>({
    resolver: zodResolver(AuthenticateUserSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const onSubmit = async (values: AuthenticateUserRequest) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(values).then((res) => {
        if (res.success) {
          setSuccess(res.success)
          form.reset()
        } else if (res.error) {
          setError(res.error)
        }
      })
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <InputElement
            label="Email"
            name="email"
            disabled={isPending}
            placeholder="johndoe@gmail.com"
          />
          <InputElement
            label="Password"
            name="password"
            type="password"
            disabled={isPending}
            placeholder="********"
          />
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button type="submit" disabled={isPending} className="w-full" size="lg">
          Login
        </Button>
      </form>
    </Form>
  )
}

export default LoginForm