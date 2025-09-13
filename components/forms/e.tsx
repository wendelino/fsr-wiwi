import GenericForm from "@/components/forms/generic-form";
import { z } from "zod";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const Schema = z.object({
  name: z.string().min(1, { message: "Dieses Feld ist erforderlich." }),
  email: z.string().email({ message: "Ungültige E-Mail-Adresse" }),
  dsgvo: z.boolean().refine(v => v === true, { message: "Bitte akzeptiere unsere Datenschutzerklärung." }),
});

export default function Example() {
  return (
    <GenericForm
      schema={Schema}
      defaultValues={{ name: "", email: "", dsgvo: false }}
      mode="create"
      onCreate={async (values) => {
        // submit/create handler
      }}
      onSuccess={() => {/* optional */}}
      onError={() => {/* optional */}}
      className="w-full max-w-md"
      config={{
        title: "Anmeldung",
        description: "Trage deine Daten ein.",
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
                  <Input placeholder="Ferdinand" {...field} autoComplete="given-name" />
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
                  <Input placeholder="max-mustermann@beispiel.de" {...field} autoComplete="email" />
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
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Datenschutzerklärung *</FormLabel>
                  <p className="text-sm text-muted-foreground">
                    Ich habe die <a className="underline" href="/datenschutz">Datenschutzerklärung</a> gelesen und akzeptiere diese
                  </p>
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