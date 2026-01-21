"use client";
import GenericForm, { FormFnRes } from "@/components/forms/generic-form";
import { z } from "zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
import { sendEvaluation } from "@/app/_actions/sendEvaluation";

const Schema = z.object({
  bewertung: z
    .string()
    .min(5, { message: "Die Bewertung muss mindestens 5 Zeichen lang sein." })
    .max(10000, { message: "Die Bewertung darf maximal 1000 Zeichen lang sein." }),
});

interface BewertungFormProps {
  slug: string;
}

export default function BewertungForm({ slug }: BewertungFormProps) {
  async function onCreate(values: z.infer<typeof Schema>): Promise<FormFnRes> {
    return await sendEvaluation({...values, slug: slug}); 
  }

  const def = {
    bewertung: "",
  };

  return (
    <GenericForm
      schema={Schema}
      defaultValues={def}
      disableStyling
      disableCaptcha
      mode="create"
      onCreate={onCreate}
      onSuccess={() => {
        /* optional */
      }}
      onError={() => {
        /* optional */
      }}
      config={{
        submitText: "Bewertung absenden",
        submitLoadingText: "Sende...",
        submitSuccessText: "Vielen Dank für deine Bewertung!",
        submitErrorText: "Fehler beim Senden. Versuche es erneut.",
        showRequiredHint: true,
      }}
    >
      {(form) => (
        <FormField
          control={form.control}
          name="bewertung"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nachricht *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Teile deine Erfahrungen..."
                  className="resize-none min-h-[200px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </GenericForm>
  );
}
