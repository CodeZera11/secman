"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { ForgotPasswordSchema, ForgotPasswordRequest } from "@repo/types"
import FormSuccess from "@/components/common/form-success"
import { useForm } from "react-hook-form"
import { Form } from "@repo/ui/components/ui/form"
import InputElement from "@repo/ui/form-elements/input-element"
import { Button } from "@repo/ui/components/ui/button"
import FormError from "@/components/common/form-error"
import { useState, useTransition } from "react"
import { forgotPassword } from "@/actions/forgot-password"

const ForgotPasswordForm = () => {

  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<ForgotPasswordRequest>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    }
  })

  const onSubmit = async (values: ForgotPasswordRequest) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      forgotPassword(values).then((data) => {
        setSuccess(data?.error)
        setSuccess(data?.success)
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
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button type="submit" disabled={isPending} className="w-full" size="lg">
          Send Reset Link
        </Button>
      </form>
    </Form>
  )
}

export default ForgotPasswordForm