"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { ResetPasswordRequest, ResetPasswordSchema } from "@repo/types"
import FormSuccess from "@/components/common/form-success"
import { useForm } from "react-hook-form"
import { Form } from "@repo/ui/components/ui/form"
import InputElement from "@repo/ui/form-elements/input-element"
import { Button } from "@repo/ui/components/ui/button"
import FormError from "@/components/common/form-error"
import { useEffect, useState, useTransition } from "react"
import { useSearchParams } from "next/navigation"
import { resetPassword } from "@/actions/reset-password"

const ResetPasswordForm = () => {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<ResetPasswordRequest>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
    }
  })

  useEffect(() => {
    if (token) {
      form.setValue("token", token)
    }
  }, [token])

  const onSubmit = async (values: ResetPasswordRequest) => {
    setError("");
    setSuccess("");

    if (!values.token) {
      setError("Token not found!")
      return
    }
    startTransition(() => {
      resetPassword(values).then(data => {
        setError(data?.error);
        setSuccess(data?.success);
      })
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
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
          Reset Password
        </Button>
      </form>
    </Form>
  )
}

export default ResetPasswordForm