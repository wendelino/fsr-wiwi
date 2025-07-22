"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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

import { useState } from "react";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import { sendMail } from "@/app/_actions/sendMail";
import { Textarea } from "./ui/textarea";
import { message_user } from "@/email_templates/message_user";
import { message_admin } from "@/email_templates/message_admin";
import { handleMessage } from "@/app/_actions/sendTelegramMessage";

interface FormState {
  loading: boolean;
  submitted: boolean;
  error: boolean;
}
const initialFormState: FormState = {
  loading: false,
  submitted: false,
  error: false,
};

export function ContactForm() {
  const FormSchema = z.object({
    email: z
      .string({ message: "Dieses Feld ist erforderlich." })
      .email({ message: "Ungültige E-Mail-Adresse" }),
    message: z.string({ message: "Dieses Feld ist erforderlich." }),
    name: z.string({ message: "Dieses Feld ist erforderlich." }),
    dsgvo: z.boolean().refine((value) => value === true, {
      message: "Bitte akzeptiere unsere Datenschutzerklärung.",
    }),
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      dsgvo: false,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);

    //Webseite Email
    const admin_mail = await handleMessage({
      message: data.message,
      first_name: data.name,
      last_name: "",
      email: data.email,
      phone: "",
    });

    if (admin_mail.success) {
      setFormSubmitted(true);
    } else setError(true);
  }

  if (formSubmitted) return <SuccessForm />;
  if (error) return <ErrorForm />;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-Mail *</FormLabel>
              <FormControl>
                <Input placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nachricht *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Nachricht eingeben..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dsgvo"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Datenschutzerklärung *</FormLabel>
                <FormDescription>
                  Ich habe die{" "}
                  <Link className="underline" href="/datenschutz">
                    Datenschutzerklärung
                  </Link>{" "}
                  gelesen und akzeptiere diese
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Laden..." : "Absenden"}
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
