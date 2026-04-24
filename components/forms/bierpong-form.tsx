"use client";
import GenericForm, { type FormFnRes } from "@/components/forms/generic-form";
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
	course: z.string().min(1, { message: "Dieses Feld ist erforderlich." }),
	dsgvo: z.boolean().refine((value) => value === true, {
		message: "Bitte akzeptiere unsere Datenschutzerklärung.",
	}),
});
export default function BierpongForm({ event }: { event: EventItem }) {
	async function onCreate(values: z.infer<typeof Schema>): Promise<FormFnRes> {
		const res = await addGuestToEvent({
			eventSlug: event.slug,
			guest: values,
		});
		return res;
	}
	const def = {
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
				submitSuccessText: "Du bekommst eine Bestätigung per E-Mail.",
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
						name="course"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Teamname *</FormLabel>
								<FormControl>
									<Input placeholder="Teamname" {...field} />
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
								<FormLabel>Dein Name *</FormLabel>
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
								<FormLabel>Dein Teammate *</FormLabel>
								<FormControl>
									<Input placeholder="Florence" {...field} />
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
