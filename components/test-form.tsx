"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";

import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import { useState } from "react";
import Altcha from "./altcha";

type FormState =
  | "idle"
  | "captchaConfirmed"
  | "loading"
  | "submitted"
  | "error"
  | "success";
export function TestForm() {
  const FormSchema = z.object({
    name: z.string({ message: "Dieses Feld ist erforderlich." }).min(1),
  });

  const [formState, setFormState] = useState<FormState>("idle"); 
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "test",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setFormState("loading");
    await new Promise((resolve) => setTimeout(resolve, 500));
    const res = await fetch("/api/test", {
      method: "POST",
      body: JSON.stringify(data),
    });
    setFormState("submitted");
  }

  if (formState === "submitted") return <SuccessForm />;
  if (formState === "error") return <ErrorForm />;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name *</FormLabel>
              <FormControl>
                <Input placeholder="Ferdinand" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />{" "}
        <Altcha />
        <Button type="submit" disabled={formState === "loading"}>
          {formState === "loading" ? "Laden..." : "Absenden"}
        </Button>
        <FormDescription>
          Felder mit einem <strong>*</strong> sind Pflichtfelder.
        </FormDescription>
      </form>
    </Form>
  );
}

function SuccessForm() {
  return (
    <div className="flex flex-col items-center w-full gap-4 p-4">
      <div className="text-green-800 w-full h-32 flex justify-center my-8">
        <CheckCircleIcon className="h-full w-full animate-bounce" />
      </div>
      <span className="text-2xl font-bold">Erfolgreich abgeschickt!</span>
    </div>
  );
}

function ErrorForm() {
  return (
    <div className="flex flex-col items-center w-full gap-4 max-w-md p-4">
      <div className="text-red-800 w-full h-32 flex justify-center my-8">
        <XCircleIcon className="h-full w-full animate-bounce" />
      </div>
      <span className="text-2xl font-bold">
        Leider ist ein Fehler passiert {":/"}
      </span>
      Bitte kontaktiere uns per E-Mail!
    </div>
  );
}
