"use client";
import { useState } from "react";
import {
	type FieldValues,
	type Path,
	type UseFormReturn,
	useFieldArray,
} from "react-hook-form";
import { z } from "zod";
import { ArrowLeft, ArrowRight, Plus, Trash2, User, Users } from "lucide-react";
import Link from "next/link";

import GenericForm, { type FormFnRes } from "@/components/forms/generic-form";
import { Collapse, Swap } from "@/components/motion";
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
import { SignupSuccess } from "@/components/events/signup-result";
import { addGuestToEvent } from "@/app/_actions/sign-up";

type Mode = "select" | "single" | "team";

const MAX_EXTRA_TEAMMATES = 3;

const SingleSchema = z.object({
	name: z.string().min(1, { message: "Dieses Feld ist erforderlich." }),
	surname: z.string().min(1, { message: "Dieses Feld ist erforderlich." }),
	email: z
		.string({ message: "Dieses Feld ist erforderlich." })
		.email({ message: "Ungültige E-Mail-Adresse" }),
	dsgvo: z.boolean().refine((value) => value === true, {
		message: "Bitte akzeptiere unsere Datenschutzerklärung.",
	}),
});

const TeamSchema = z.object({
	course: z.string().min(1, { message: "Dieses Feld ist erforderlich." }),
	name: z.string().min(1, { message: "Dieses Feld ist erforderlich." }),
	surname: z.string().min(1, { message: "Dieses Feld ist erforderlich." }),
	email: z
		.string({ message: "Dieses Feld ist erforderlich." })
		.email({ message: "Ungültige E-Mail-Adresse" }),
	friends: z
		.array(
			z.object({
				name: z.string().min(1, { message: "Dieses Feld ist erforderlich." }),
			}),
		)
		.min(1, { message: "Bitte mindestens ein weiteres Teammitglied angeben." })
		.max(MAX_EXTRA_TEAMMATES),
	dsgvo: z.boolean().refine((value) => value === true, {
		message: "Bitte akzeptiere unsere Datenschutzerklärung.",
	}),
});

export default function UnilympicsForm({ event }: { event: EventItem }) {
	const [mode, setMode] = useState<Mode>("select");

	return (
		// Vor: weiter zum Formular, zurück: zur Auswahl
		<Swap swapKey={mode} direction={mode === "select" ? -1 : 1}>
			{mode === "select" ? (
				<div className="mx-auto w-full max-w-md rounded-3xl border bg-card p-6 sm:p-8">
					<h3 className="text-2xl font-black tracking-tight">
						Anmeldung Unilympics
					</h3>
					<p className="mb-5 mt-1 border-b pb-4 text-sm text-muted-foreground">
						Wie möchtest du teilnehmen?
					</p>
					<div className="grid gap-3">
						<ModeChoice
							icon={User}
							title="Einzelanmeldung"
							text="Du wirst einem Team zugeteilt."
							onClick={() => setMode("single")}
						/>
						<ModeChoice
							icon={Users}
							title="Teamanmeldung"
							text="Melde dich mit deinem Team an."
							onClick={() => setMode("team")}
						/>
					</div>
				</div>
			) : (
				<div className="space-y-2">
					<BackButton onClick={() => setMode("select")} />
					{mode === "single" ? (
						<SingleForm event={event} />
					) : (
						<TeamForm event={event} />
					)}
				</div>
			)}
		</Swap>
	);
}

function ModeChoice({
	icon: Icon,
	title,
	text,
	onClick,
}: {
	icon: typeof User;
	title: string;
	text: string;
	onClick: () => void;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="group flex items-center gap-4 rounded-2xl border p-4 text-left transition hover:border-fsr/40 hover:bg-fsr/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fsr"
		>
			<span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-fsr/10 text-fsr">
				<Icon className="size-5" />
			</span>
			<span className="min-w-0">
				<span className="block font-bold">{title}</span>
				<span className="block text-sm text-muted-foreground">{text}</span>
			</span>
			<ArrowRight className="ml-auto size-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-fsr" />
		</button>
	);
}

function BackButton({ onClick }: { onClick: () => void }) {
	return (
		<div className="mx-auto w-full max-w-md">
			<Button
				type="button"
				variant="ghost"
				size="sm"
				onClick={onClick}
				className="-ml-2 text-muted-foreground"
			>
				<ArrowLeft className="mr-1 size-4" />
				Andere Teilnahmeart
			</Button>
		</div>
	);
}

function SingleForm({ event }: { event: EventItem }) {
	async function onCreate(
		values: z.infer<typeof SingleSchema>,
	): Promise<FormFnRes> {
		const res = await addGuestToEvent({
			eventSlug: event.slug,
			guest: { ...values },
		});
		return res;
	}

	const def = {
		dsgvo: false,
		name: "",
		surname: "",
		email: "",
	};

	return (
		<GenericForm
			schema={SingleSchema}
			defaultValues={def}
			mode="create"
			onCreate={onCreate}
			successView={(res) => <SignupSuccess event={event} message={res.msg} />}
			config={{
				title: "Einzelanmeldung",
				description: "Bitte trage deine Daten ein.",
				submitText: "Anmelden",
				submitLoadingText: "Wird gesendet …",
				submitErrorText: "Die Anmeldung konnte nicht gesendet werden.",
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
									<Input
										placeholder="ferdinand-mustermann@beispiel.de"
										{...field}
										autoComplete="email"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<p className="text-muted-foreground text-sm">
						Du musst deine E-Mail nach der Anmeldung bestätigen, um
						teilzunehmen. Andernfalls wird deine Anmeldung nach 24 Stunden
						automatisch storniert.
					</p>
					<DsgvoField form={form} />
				</>
			)}
		</GenericForm>
	);
}

function TeamForm({ event }: { event: EventItem }) {
	async function onCreate(
		values: z.infer<typeof TeamSchema>,
	): Promise<FormFnRes> {
		const res = await addGuestToEvent({
			eventSlug: event.slug,
			guest: {
				name: values.name,
				surname: values.surname,
				email: values.email,
				course: JSON.stringify({
					teamname: values.course,
					members: values.friends.map((friend) => friend.name),
				}),
			},
		});
		return res;
	}

	const def = {
		dsgvo: false,
		course: "",
		name: "",
		surname: "",
		email: "",
		friends: [{ name: "" }],
	};

	return (
		<GenericForm
			schema={TeamSchema}
			defaultValues={def}
			mode="create"
			onCreate={onCreate}
			successView={(res) => <SignupSuccess event={event} message={res.msg} />}
			config={{
				title: "Teamanmeldung",
				description: "Bitte trage deine Teamdaten ein.",
				submitText: "Team anmelden",
				submitLoadingText: "Wird gesendet …",
				submitErrorText: "Die Anmeldung konnte nicht gesendet werden.",
				showRequiredHint: true,
			}}
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
									<Input placeholder="Die Champions" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="border-t pt-4">
						<p className="mb-3 text-sm font-medium">Teamkapitän:in</p>
						<div className="space-y-4">
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
											<Input
												placeholder="ferdinand-mustermann@beispiel.de"
												{...field}
												autoComplete="email"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
					<FriendsField form={form} />
					<p className="text-muted-foreground text-sm">
						Du musst deine E-Mail nach der Anmeldung bestätigen, um
						teilzunehmen. Andernfalls wird deine Anmeldung nach 24 Stunden
						automatisch storniert.
					</p>
					<DsgvoField form={form} />
				</>
			)}
		</GenericForm>
	);
}

function DsgvoField<TValues extends FieldValues>({
	form,
}: {
	form: UseFormReturn<TValues>;
}) {
	return (
		<FormField
			control={form.control}
			name={"dsgvo" as Path<TValues>}
			render={({ field }) => (
				<FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
					<FormControl>
						<Checkbox
							checked={field.value as boolean}
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
	);
}

function FriendsField({
	form,
}: {
	form: UseFormReturn<z.infer<typeof TeamSchema>>;
}) {
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "friends",
	});

	return (
		<FormItem className="border-t pt-4">
			<FormLabel>Weitere Teammitglieder *</FormLabel>
			<FormDescription>
				Bis zu {MAX_EXTRA_TEAMMATES} weitere Personen.
			</FormDescription>
			<div className="mt-2 space-y-2">
				{fields.map((memberItem, index) => (
					// Neue Zeilen klappen auf
					<Collapse key={memberItem.id}>
						<FormField
							control={form.control}
							name={`friends.${index}.name`}
							render={({ field: memberField }) => (
								<FormItem>
									<div className="flex gap-2">
										<FormControl>
											<Input
												placeholder={`Mitglied ${index + 2}`}
												{...memberField}
											/>
										</FormControl>
										<Button
											type="button"
											variant="destructive"
											size="icon"
											disabled={fields.length <= 1}
											onClick={() => remove(index)}
										>
											<Trash2 className="size-4" />
										</Button>
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>
					</Collapse>
				))}
				<Button
					type="button"
					variant="outline"
					onClick={() => append({ name: "" })}
					className="w-full"
					disabled={fields.length >= MAX_EXTRA_TEAMMATES}
				>
					<Plus className="mr-2 size-4" />
					Mitglied hinzufügen
				</Button>
			</div>
			<FormField
				control={form.control}
				name="friends"
				render={() => <FormMessage />}
			/>
		</FormItem>
	);
}
