"use client";
import { useState } from "react";
import {
	type FieldValues,
	type Path,
	type UseFormReturn,
	useFieldArray,
} from "react-hook-form";
import { z } from "zod";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Plus, Trash2, User, Users } from "lucide-react";
import Link from "next/link";

import GenericForm, { type FormFnRes } from "@/components/forms/generic-form";
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
		<AnimatePresence mode="wait">
			{mode === "select" && (
				<motion.div
					key="select"
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.25 }}
					className="mx-auto w-full max-w-md sm:rounded-xl sm:border sm:p-8 sm:shadow-xl"
				>
					<h3 className="text-lg font-semibold">Anmeldung Unilympics</h3>
					<p className="text-muted-foreground mb-6 border-b pb-3 text-sm">
						Wie möchtest du teilnehmen?
					</p>
					<div className="grid gap-3 ">
						<Button
							type="button"
							variant="secondary"
							className="h-auto flex-col gap-1 py-4"
							onClick={() => setMode("single")}
						>
							<User className="size-6" />
							<span className="font-semibold">Einzelanmeldung</span>
							<span className="text-muted-foreground text-xs font-normal">
								Du wirst einem Team zugeteilt.
							</span>
						</Button>
						<Button
							type="button"
							variant="secondary"
							className="h-auto flex-col gap-1 py-4"
							onClick={() => setMode("team")}
						>
							<Users className="size-6" />
							<span className="font-semibold">Teamanmeldung</span>
							<span className="text-muted-foreground text-xs font-normal">
								Melde dich mit deinem Team an.
							</span>
						</Button>
					</div>
				</motion.div>
			)}

			{mode === "single" && (
				<motion.div
					key="single"
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.25 }}
					className="space-y-2"
				>
					<BackButton onClick={() => setMode("select")} />
					<SingleForm event={event} />
				</motion.div>
			)}

			{mode === "team" && (
				<motion.div
					key="team"
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.25 }}
					className="space-y-2"
				>
					<BackButton onClick={() => setMode("select")} />
					<TeamForm event={event} />
				</motion.div>
			)}
		</AnimatePresence>
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
				className="text-muted-foreground -ml-2"
			>
				<ArrowLeft className="mr-1 size-4" />
				Zurück
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
			config={{
				title: "Einzelanmeldung",
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
			config={{
				title: "Teamanmeldung",
				description: "Bitte trage deine Teamdaten ein.",
				submitText: "Team anmelden",
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
					<FormField
						key={memberItem.id}
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
