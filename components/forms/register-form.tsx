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

const Schema = z.object({
  name: z.string().min(1, { message: "Dieses Feld ist erforderlich." }),
  surname: z.string().min(1, { message: "Dieses Feld ist erforderlich." }),
  email: z
    .string({ message: "Dieses Feld ist erforderlich." })
    .email({ message: "Ungültige E-Mail-Adresse" }),
  course: z.string().optional(),
  dsgvo: z.boolean().refine((value) => value === true, {
    message: "Bitte akzeptiere unsere Datenschutzerklärung.",
  }),
});
export default function RegisterForm({ event }: { event: EventItem }) {
  async function onCreate(values: z.infer<typeof Schema>): Promise<FormFnRes> {
    const res = await addGuestToEvent({
      eventSlug: event.slug,
      guest: { ...values, course: values.course || "k.A." },
    });
    return res;
  }

  // const def = {
  //   dsgvo: true,
  //   course: "ww",
  //   name: "ww",
  //   surname: "ww",
  //   email: "t@t.de",
  // };
  const def  = {
    dsgvo: false,
    course: "",
    name: "",
    surname: "",
    email: "",
  };
  return (
    <GenericForm
      schema={Schema}
      defaultValues={def}
      mode="create"
      onCreate={onCreate}
      onSuccess={() => {
        /* optional */
      }}
      onError={() => {
        /* optional */
      }}
      config={{
        title: "Anmeldeformular",
        description: "Bitte trage deine Daten ein.",
        submitText: "Anmelden",
        submitLoadingText: "Laden...",
        submitSuccessText: "Erfolgreich gesendet!",
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
                <FormLabel>Vorname *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ferdinand"
                    {...field}
                    autoComplete="given-name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nachname *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Mustermann"
                    {...field}
                    autoComplete="family-name"
                  />
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
                  <Input placeholder="max-mustermann@beispiel.de" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="course"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Studiengang</FormLabel>
                <FormControl>
                  <Input placeholder="Wirtschaftsinformatik B.Sc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dsgvo"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
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
