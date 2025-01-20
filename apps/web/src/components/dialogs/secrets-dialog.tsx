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
import { useState, useTransition } from "react";
import { createSecret } from "@/actions/secrets";
import { IoClose } from "react-icons/io5";


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
  const [secrets, setSecrets] = useState(secretsData);
  const [newSecrets, setNewSecrets] = useState(1);
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

  const handleRemove = (index: number) => {

    if (index >= secrets.length) {
      setNewSecrets((prev) => prev - 1);
      return;
    }

    const newSecrets = secrets.filter((_, i) => i !== index);
    setSecrets(newSecrets);
    form.setValue("secrets", newSecrets);
  }


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
            {secrets.map((_, i) => (
              <SecretPair index={i} projectId={id} handleRemove={handleRemove} />
            ))}
            {Array(newSecrets).fill(0).map((_, i) => {
              const index = secrets.length + i;
              return (
                <SecretPair index={index} projectId={id} handleRemove={handleRemove} />
              )
            })}
            <Button
              variant='link'
              size="sm"
              type="button"
              className="w-fit text-neutral-200 h-fit px-0"
              onClick={() => setNewSecrets(newSecrets + 1)}
            >
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

const SecretPair = ({ index, projectId, handleRemove }: { index: number, projectId: string, handleRemove: (index: number) => void }) => {
  return (
    <div
      className="grid grid-cols-2 items-center gap-4 text-nowrap"
    >
      <InputElement name={`secrets[${index}].label`} placeholder="Key" />
      <div className="flex items-center gap-2">
        <InputElement name={`secrets[${index}].value`} placeholder="Value" className="w-full" />
        <Button
          variant="ghost"
          type="button"
          className="hover:bg-neutral-500/20 hover:text-white" size="icon"
          onClick={() => handleRemove(index)}
        >
          <IoClose />
        </Button>
      </div>
      <InputElement
        name={`secrets[${index}].projectId`}
        placeholder="Project ID"
        defaultValue={projectId}
        className="hidden"
      />
    </div>
  )
}