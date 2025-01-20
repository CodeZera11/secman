"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/ui/dialog";
import { Button } from "@repo/ui/components/ui/button";
import { BsEye } from "react-icons/bs";
import { Project } from "@/constants/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateMultipleSecretsRequest, CreateMultipleSecretsSchema } from "@repo/types";
import { Form } from "@repo/ui/components/ui/form";
import InputElement from "@repo/ui/form-elements/input-element";
import { useEffect, useState, useTransition } from "react";
import { createProject } from "@/actions/projects";
import { createSecret } from "@/actions/secrets";

interface Secret {
  id: string;
  label: string;
  value: string;
}

interface SecretsDialogProps {
  project: Project
}

export function SecretsDialog({
  project: { name, id, secrets: secretsData },
}: SecretsDialogProps) {
  const [secrets, setSecrets] = useState(secretsData.length || 1);
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(CreateMultipleSecretsSchema),
    defaultValues: {
      secrets: secretsData,
    }
  })

  const onSubmit = (values: CreateMultipleSecretsRequest) => {
    startTransition(async () => {
      await createSecret(id, values)
      setOpen(false)
    })
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className="flex items-center space-x-1"
        >
          <BsEye className="h-4 w-4" />
          <span>Secrets</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>{name} Secrets</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
            {Array(secrets).fill(0).map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-2 items-center gap-4 text-nowrap"
              >
                <InputElement name={`secrets[${i}].label`} placeholder="Key" />
                <InputElement name={`secrets[${i}].value`} placeholder="Value" />
                <InputElement
                  name={`secrets[${i}].projectId`}
                  placeholder="Project ID"
                  defaultValue={id}
                  className="hidden"
                />
              </div>
            ))}
            <Button variant='link' size="sm" type="button" onClick={() => setSecrets(prev => prev + 1)} className="w-fit text-neutral-200 h-fit px-0">
              Add Secret
            </Button>
            <Button disabled={isPending} type="submit" className="w-full">
              {isPending ? "Creating..." : "Submit"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
