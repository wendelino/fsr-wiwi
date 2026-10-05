"use client";
import Altcha from "@/components/altcha";
import { ResultState } from "@/components/result-state";
import { Button } from "@/components/ui/button";
import { Form, FormDescription } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, RotateCcw } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  DefaultValues,
  UseFormReturn,
  useForm,
  type FieldValues,
} from "react-hook-form";
import { z } from "zod";

type FormPhase = "idle" | "loading" | "success" | "error";

export type FormFnRes = {
  sx: boolean;
  msg: string;
};

type ChildrenRenderProp<TValues extends FieldValues> =
  | ReactNode
  | ((form: UseFormReturn<TValues>) => ReactNode);

/** Eigene Erfolgs-/Fehleransicht; retry führt mit den alten Eingaben zurück zum Formular. */
type ResultView = (result: FormFnRes, retry: () => void) => ReactNode;

interface GenericFormConfig {
  title?: string;
  description?: string;
  submitText?: string;
  submitLoadingText?: string;
  successTitle?: string;
  submitSuccessText?: string;
  submitErrorText?: string;
  showRequiredHint?: boolean;
}

interface BaseHandlers<TValues> {
  onCreate?: (values: TValues) => Promise<FormFnRes>;
  onEdit?: (values: TValues) => Promise<FormFnRes>;
  onSuccess?: () => void;
  onError?: () => void;
}

interface GenericFormProps<TFieldValues extends FieldValues>
  extends BaseHandlers<TFieldValues> {
  schema: z.ZodType<TFieldValues>;
  defaultValues: DefaultValues<TFieldValues>;
  mode?: "create" | "edit";
  disableCaptcha?: boolean;
  /** Ohne eigene Karte, z. B. wenn die Seite schon eine Karte drumherum hat */
  disableStyling?: boolean;
  className?: string;
  formClassName?: string;
  children: ChildrenRenderProp<TFieldValues>;
  successView?: ResultView;
  errorView?: ResultView;
  config?: GenericFormConfig;
}

// Standardtexte, wenn der Server nichts Eigenes meldet
const GENERIC_MESSAGES = ["Erfolgreich gesendet!", ""];

export default function GenericForm<TValues extends FieldValues>(
  props: GenericFormProps<TValues>
) {
  const {
    schema,
    defaultValues,
    mode = "create",
    onCreate,
    onEdit,
    onSuccess,
    onError,
    disableCaptcha = false,
    disableStyling = false,
    className,
    formClassName,
    children,
    successView,
    errorView,
    config,
  } = props;

  const [phase, setPhase] = useState<FormPhase>("idle");
  const [result, setResult] = useState<FormFnRes>({ sx: true, msg: "" });
  const rootRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const form = useForm<TValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const texts = useMemo(
    () => ({
      submitText: config?.submitText ?? "Absenden",
      submitLoadingText: config?.submitLoadingText ?? "Wird gesendet …",
      successTitle: config?.successTitle ?? "Gesendet!",
      submitSuccessText: config?.submitSuccessText,
      submitErrorText:
        config?.submitErrorText ?? "Senden fehlgeschlagen. Versuche es erneut.",
      title: config?.title,
      description: config?.description,
      showRequiredHint: config?.showRequiredHint ?? true,
    }),
    [config]
  );

  // Ergebnis ist kürzer als das Formular: oben ins Bild holen, falls man darunter steht
  useEffect(() => {
    if (phase !== "success" && phase !== "error") return;
    const el = rootRef.current;
    if (el && el.getBoundingClientRect().top < 80) {
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
  }, [phase, reduce]);

  async function handleSubmit(values: TValues) {
    setPhase("loading");
    try {
      const handler = mode === "edit" ? onEdit : onCreate;
      if (!handler) throw new Error("No handler found");
      const res = await handler(values);
      setResult(res);
      setPhase(res.sx ? "success" : "error");
      (res.sx ? onSuccess : onError)?.();
    } catch {
      setResult({ sx: false, msg: "" });
      setPhase("error");
      onError?.();
    }
  }

  const retry = () => setPhase("idle");
  const showResult = phase === "success" || phase === "error";
  const serverMsg = GENERIC_MESSAGES.includes(result.msg) ? undefined : result.msg;

  const renderChildren = () =>
    typeof children === "function"
      ? (children as (f: UseFormReturn<TValues>) => ReactNode)(form)
      : children;

  const fade = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -12 },
        transition: { duration: 0.25, ease: "easeOut" as const },
      };

  return (
    <div
      ref={rootRef}
      className={cn(
        "mx-auto w-full max-w-md scroll-mt-24",
        !disableStyling && "rounded-3xl border bg-card p-6 sm:p-8",
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {showResult ? (
          <motion.div key="result" {...fade} className="py-4">
            {phase === "success"
              ? successView?.(result, retry) ?? (
                  <ResultState status="success" title={texts.successTitle} detail={serverMsg}>
                    {texts.submitSuccessText}
                  </ResultState>
                )
              : errorView?.(result, retry) ?? (
                  <FormError message={serverMsg} fallback={texts.submitErrorText} retry={retry} />
                )}
          </motion.div>
        ) : (
          <motion.div key="form" {...fade}>
            {texts.title && <h3 className="text-2xl font-black tracking-tight">{texts.title}</h3>}
            {texts.description && (
              <p className="mb-5 mt-1 border-b pb-4 text-sm text-muted-foreground">{texts.description}</p>
            )}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className={formClassName ?? "flex w-full flex-col"}
                aria-busy={phase === "loading"}
              >
                {/* Während des Sendens nichts mehr ändern */}
                <fieldset disabled={phase === "loading"} className="flex flex-col gap-4 disabled:opacity-70">
                  {renderChildren()}
                  {!disableCaptcha && <Altcha />}
                  {texts.showRequiredHint && (
                    <FormDescription>
                      Felder mit einem <strong>*</strong> sind Pflichtfelder.
                    </FormDescription>
                  )}
                </fieldset>
                <Button
                  type="submit"
                  size="lg"
                  disabled={phase === "loading"}
                  className="mt-6 bg-fsr-deep text-white hover:bg-fsr-deep/90"
                >
                  {phase === "loading" ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin motion-reduce:animate-none" />
                      {texts.submitLoadingText}
                    </>
                  ) : (
                    texts.submitText
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Standard-Fehleransicht: Meldung, erneut versuchen (Eingaben bleiben), Kontakt. */
export function FormError({
  message,
  fallback = "Senden fehlgeschlagen. Versuche es erneut.",
  retry,
}: {
  message?: string;
  fallback?: string;
  retry: () => void;
}) {
  return (
    <ResultState
      status="error"
      title="Das hat nicht geklappt"
      detail={message}
      actions={
        <>
          <Button size="lg" onClick={retry} className="bg-fsr-deep text-white hover:bg-fsr-deep/90">
            <RotateCcw className="mr-2 size-4" /> Erneut versuchen
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/kontakt">Kontakt</Link>
          </Button>
        </>
      }
    >
      {fallback} Deine Eingaben sind noch da.
    </ResultState>
  );
}
