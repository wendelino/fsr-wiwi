"use client";
import { addGuestToEvent } from "@/app/_actions/sign-up";
import GenericForm, { FormFnRes } from "@/components/forms/generic-form";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { z } from "zod";

const Schema = z.object({
  name: z.string().min(1, { message: "Dieses Feld ist erforderlich." }),
  surname: z.string().min(1, { message: "Dieses Feld ist erforderlich." }),
  matrikelNr: z.string().min(1, { message: "Dieses Feld ist erforderlich." }),
  email: z
    .string({ message: "Dieses Feld ist erforderlich." })
    .email({ message: "Ungültige E-Mail-Adresse" }),
  zeitpunktAbschluss: z
    .string()
    .min(1, { message: "Dieses Feld ist erforderlich." }),
  dsgvo: z.boolean().refine((value) => value === true, {
    message: "Bitte akzeptiere unsere Datenschutzerklärung.",
  }),
});

export default function AbsolventForm({ event }: { event: EventItem }) {
  async function onCreate(values: z.infer<typeof Schema>): Promise<FormFnRes> {
    const res = await addGuestToEvent({
      eventSlug: event.slug,
      guest: {
        name: values.name,
        surname: values.surname,
        email: values.email,
        course: JSON.stringify({
          matrikelNr: values.matrikelNr,
          zeitpunktAbschluss: values.zeitpunktAbschluss,
        }),
      },
    });
    return res;
  }
  const def = {
    dsgvo: false,
    name: "",
    surname: "",
    matrikelNr: "",
    email: "",
    zeitpunktAbschluss: "",
  };
  return (
    <GenericForm
      schema={Schema}
      defaultValues={def}
      mode="create"
      onCreate={onCreate}
      config={{
        title: "TEST - Anmeldeformular",
        description: "Bitte trage deine Daten ein.",
        submitText: "Anmelden",
        submitLoadingText: "Laden...",
        submitSuccessText: "Du bekommst eine Bestätigung per E-Mail.",
        submitErrorText: "Senden fehlgeschlagen. Versuche es erneut.",
        showRequiredHint: true,
      }}
    >
      {(form) => (
        <>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dein Vorname *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ferdinand"
                    {...field}
                    autoComplete="name"
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
                <FormLabel>Dein Nachname *</FormLabel>
                <FormControl>
                  <Input placeholder="Mustermann" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="matrikelNr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Matrikelnummer *</FormLabel>
                <FormControl>
                  <Input placeholder="1234567" {...field} />
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
                <FormLabel>Deine E-Mail *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ferdinand-mustermann@beispiel.de"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="text-sm text-muted-foreground">
            Du musst deine E-Mail nach der Anmeldung bestätigen, um
            teilzunehmen. Andernfalls wird deine Anmeldung nach 24 Stunden
            automatisch storniert.{" "}
          </p>
          <FormField
            control={form.control}
            name="zeitpunktAbschluss"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zeitpunkt Abschluss *</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
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
