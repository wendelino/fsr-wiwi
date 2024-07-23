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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { AnimatedEvents, Header } from "./TextComponents";
import { sendMail } from "@/app/_actions/sendMail";
import { useState } from "react";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import { Event_DB } from "@prisma/client";
import { useFormStatus } from "react-dom";

const FormSchema = z.object({
  event: z.string({ message: "Dieses Feld ist erforderlich." }),
  name: z.string({ message: "Dieses Feld ist erforderlich." }),
  surname: z.string({ message: "Dieses Feld ist erforderlich." }),
  email: z
    .string({ message: "Dieses Feld ist erforderlich." })
    .email({ message: "Ungültige E-Mail-Adresse" }),
  dsgvo: z.boolean().refine((value) => value === true, {
    message: "Bitte akzeptiere unsere Datenschutzerklärung.",
  }),
});

export function RegisterForm({
  event,
  events,
}: {
  event?: Event_DB;
  events: Event_DB[];
}) {
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
    const html = ` <h2 style="color: #333333;">Hey ${data.name},</h2><h4 style="color: #333333;">Danke für deine Anmeldung!</h4>
        <p style="color: #555555;">
          Hiermit hast du dich erfogrleich für die Veranstaltung <strong>${data.event}</strong> angemeldet!
          <br /><br />
          Solltest du Fragen haben kannst du uns jederzeit unter dieser E-Mail oder unseren anderen Kontaktmöglichkeiten erreichen :)
        </p>
        <p style="color: #555555;">
          Liebe Grüße
          <br />
          Dein FSR Wiwi <3
        </p>`;
    const res = await sendMail(
      data.email,
      html,
      "Anmeldungsbestätigung " + data.event
    );
    if (res.success){ setFormSubmitted(true);}
    else setError(true)
  }

  if (formSubmitted) {
    return (
      <div className="flex flex-col items-center w-full gap-4 max-w-md border p-8 rounded-lg shadow-lg">
        <div className="text-green-800 w-full h-32 flex justify-center my-8">
          <CheckCircleIcon className="h-full w-full animate-bounce" />
        </div>
        <span className="text-2xl font-bold">Erfolgreich angemeldet!</span>
        Schau in deinem Postfach nach {";)"}
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex flex-col items-center w-full gap-4 max-w-md border p-8 rounded-lg shadow-lg">
        <div className="text-red-800 w-full h-32 flex justify-center my-8">
          <XCircleIcon className="h-full w-full animate-bounce" />
        </div>
        <span className="text-2xl font-bold">Leider ist ein Fehler passiert {":/"}</span>
         Bitte kontaktiere uns per E-Mail!
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex flex-col w-full max-w-md border p-8 rounded-lg shadow-lg"
      >
        <FormField
          control={form.control}
          name="event"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Veranstaltung *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={<AnimatedEvents events={events} />}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {events.map((e) => (
                    <SelectItem key={e.title} value={e.title}>
                      {e.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vorname *</FormLabel>
              <FormControl>
                <Input placeholder="Max" {...field} autoComplete="given-name" />
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
          {loading ? "Laden..." : "Anmelden"}
        </Button>
        <FormDescription>
          Felder mit einem <strong>*</strong> sind Pflichtfelder.
        </FormDescription>
      </form>
    </Form>
  );
}
