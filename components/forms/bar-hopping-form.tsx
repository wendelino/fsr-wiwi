"use client";
import { addGuestToEvent } from "@/app/_actions/sign-up";
import GenericForm, { FormFnRes } from "@/components/forms/generic-form";
import { Button } from "@/components/ui/button";
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
import { Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { z } from "zod";

const Schema = z.object({
  name: z.string().min(1, { message: "Dieses Feld ist erforderlich." }),
  surname: z.string().min(1, { message: "Dieses Feld ist erforderlich." }),
  email: z
    .string({ message: "Dieses Feld ist erforderlich." })
    .email({ message: "Ungültige E-Mail-Adresse" }),
  dsgvo: z.boolean().refine((value) => value === true, {
    message: "Bitte akzeptiere unsere Datenschutzerklärung.",
  }),
  friends: z.array(
    z.object({
      name: z.string().min(1, { message: "Dieses Feld ist erforderlich." }),
    })
  ).optional(),
});
const MAX_NUMBER_OF_FRIENDS = 2;
export default function BarHoppingForm({ event }: { event: EventItem }) {
  async function onCreate(values: z.infer<typeof Schema>): Promise<FormFnRes> {
    const res = await addGuestToEvent({
      eventSlug: event.slug,
      eventType: "bar-hopping",
      guest: values,
    });
    return res;
  }
  const def = {
    dsgvo: false,
    name: "",
    surname: "",
    email: "",
    teammates: [],
  };
  return (
    <GenericForm
      schema={Schema}
      defaultValues={def}
      mode="create"
      onCreate={onCreate}
      config={{
        title: "Anmeldeformular",
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deine E-Mail *</FormLabel>
                <FormControl>
                  <Input placeholder="max-mustermann@beispiel.de" {...field} />
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
            name="friends"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mein +1 (optional)</FormLabel>
                <div className="space-y-2">
                  {field.value?.map((_, index) => (
                    <FormField
                      key={index}
                      control={form.control}
                      name={`friends.${index}.name`}
                      render={({ field: teammateField }) => (
                        <FormItem>
                          <div className="flex gap-2">
                            <FormControl>
                              <Input
                                placeholder="Max Mustermann"
                                {...teammateField}
                              />
                            </FormControl>
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              onClick={() => {
                                const newValue =
                                  field.value?.filter((_, i) => i !== index) ||
                                  [];
                                field.onChange(newValue);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const newValue = [...(field.value || []), { name: "" }];
                      field.onChange(newValue);
                    }}
                    className="w-full"
                    disabled={(field.value?.length ?? 0) >= MAX_NUMBER_OF_FRIENDS}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Person hinzufügen
                  </Button>
                </div>
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
