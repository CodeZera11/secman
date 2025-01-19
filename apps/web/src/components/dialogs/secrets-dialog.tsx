"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/ui/dialog";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import { BsEye } from "react-icons/bs";
import { Project } from "@/constants/types";

interface Secret {
  id: string;
  label: string;
  value: string;
}

interface SecretsDialogProps {
  project: Project
}

export function SecretsDialog({
  project: { name, id, secrets }
}: SecretsDialogProps) {


  const handleAddSecret = () => {

  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className="flex items-center space-x-1"
        >
          <BsEye className="h-4 w-4" />
          <span>See Secrets</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{name} Secrets</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {secrets.map((secret) => (
            <div
              key={secret.id}
              className="grid grid-cols-2 items-center gap-4"
            >
              <Label htmlFor={secret.id} className="text-right">
                {secret.label}
              </Label>
              <Input
                id={secret.id}
                value={secret.value}
                readOnly
                className="col-span-1"
              />
            </div>
          ))}
        </div>
        <Button onClick={handleAddSecret} className="w-full">
          Add Secret
        </Button>
      </DialogContent>
    </Dialog>
  );
}
