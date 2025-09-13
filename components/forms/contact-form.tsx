"use client";
import GenericForm, { FormFnRes } from "@/components/forms/generic-form";
import { z } from "zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { addGuestToEvent } from "@/app/_actions/sign-up";
import { handleMessage } from "@/app/_actions/sendTelegramMessage";
import { Textarea } from "../ui/textarea";

const Schema = z.object({
  email: z
    .string({ message: "Dieses Feld ist erforderlich." })
    .email({ message: "Ungültige E-Mail-Adresse" }),
  message: z.string().min(1, { message: "Dieses Feld ist erforderlich." }),
  name: z.string().min(1, { message: "Dieses Feld ist erforderlich." }),
  dsgvo: z.boolean().refine((value) => value === true, {
    message: "Bitte akzeptiere unsere Datenschutzerklärung.",
  }),
});

export default function ContactForm() {
  async function onCreate(values: z.infer<typeof Schema>): Promise<FormFnRes> {
    const res = await handleMessage({
      message: values.message,
      first_name: values.name,
      last_name: "",
      email: values.email,
      phone: "",
    });

    return { sx: res.success, msg: res.message };
  }
  const def = {
    dsgvo: false,
    name: "",
    message: "",
    email: "",
  };
  return (
    <GenericForm
      schema={Schema}
      defaultValues={def}
      disableStyling
      mode="create"
      onCreate={onCreate}
      onSuccess={() => {
        /* optional */
      }}
      onError={() => {
        /* optional */
      }}
      config={{
        submitText: "Absenden",
        submitLoadingText: "Laden...",
        submitSuccessText: "Wir werden uns schnellstmöglich bei dir melden :)",
        submitErrorText: "Senden fehlgeschlagen. Versuche es erneut.",
        showRequiredHint: true,
      }}
      // optional eigene Erfolg-/Fehlersichten:
      // successView={<div>Danke!</div>}
      // errorView={<div>Ups, Fehler.</div>}
    >
      {(form) => (
        <>
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
        </>
      )}
    </GenericForm>
  );
}
