"use client";
import { Form, FormDescription } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState, type ReactNode } from "react";
import {
  DefaultValues,
  UseFormReturn,
  useForm,
  type FieldValues,
} from "react-hook-form";
import { z } from "zod";
import Altcha from "@/components/altcha";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

type FormPhase = "idle" | "loading" | "success" | "error";

export type FormFnRes = {
  sx: boolean;
  msg: string;
};

type ChildrenRenderProp<TValues extends FieldValues> =
  | ReactNode
  | ((form: UseFormReturn<TValues>) => ReactNode);

type SuccessErrorView = ReactNode | (() => ReactNode);

interface GenericFormConfig {
  title?: string;
  description?: string;
  submitText?: string;
  submitLoadingText?: string;
  submitDisabledText?: string;
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
  disableStyling?: boolean;
  className?: string;
  formClassName?: string;
  children: ChildrenRenderProp<TFieldValues>;
  successView?: SuccessErrorView;
  errorView?: SuccessErrorView;
  config?: GenericFormConfig;
}

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
    config,
  } = props;

  const [phase, setPhase] = useState<FormPhase>("idle");
  const [result, setResult] = useState<FormFnRes | null>({
    sx: true,
    msg: "Erfolgreich gesendet!",
  });

  const form = useForm<TValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const texts = useMemo(() => {
    return {
      submitText: config?.submitText ?? "Absenden",
      submitLoadingText: config?.submitLoadingText ?? "Wird gesendet...",
      submitDisabledText: config?.submitDisabledText ?? "Bitte warten...",
      submitSuccessText: config?.submitSuccessText ?? "Erfolgreich gesendet!",
      submitErrorText:
        config?.submitErrorText ?? "Senden fehlgeschlagen. Versuche es erneut.",
      title: config?.title,
      description: config?.description,
      showRequiredHint: config?.showRequiredHint ?? true,
    } as const;
  }, [config]);

  async function handleSubmit(values: TValues) {
    try {
      setPhase("loading");
      const handler = mode === "edit" ? onEdit : onCreate;
      if (!handler) {
        throw new Error("No handler found");
      }
      const result = await handler(values);
      if (result.sx) {
        setPhase("success");
        onSuccess?.();
      } else {
        setPhase("error");
        onError?.();
      }
      setResult(result);
    } catch (err) {
      setPhase("error");
      onError?.();
    }
  }

  const renderChildren = () =>
    typeof children === "function"
      ? (children as (f: UseFormReturn<TValues>) => ReactNode)(form)
      : children;

  //   if (phase === "success" && successView) {
  //     return typeof successView === "function"
  //       ? (successView as () => React.ReactNode)()
  //       : successView;
  //   }
  //   if (phase === "error" && errorView) {
  //     return typeof errorView === "function"
  //       ? (errorView as () => React.ReactNode)()
  //       : errorView;
  //   }

  if (phase === "success") {
    return <FinalForm result={result} config={config} />;
  }
  if (phase === "error") {
    return <FinalForm result={result} config={config} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        " mx-auto  max-w-md w-full",
        !disableStyling && "sm:border sm:p-8 sm:rounded-xl sm:shadow-xl",
        className
      )}
    >
      {texts.title && <h3 className="text-lg font-semibold">{texts.title}</h3>}
      {texts.description && (
        <p className="text-muted-foreground mb-3 border-b pb-3 text-sm">
          {texts.description}
        </p>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className={formClassName ?? "space-y-4 flex flex-col w-full"}
          aria-busy={phase === "loading"}
        >
          {renderChildren()}
          {!disableCaptcha && <Altcha />}{" "}
          {texts.showRequiredHint && (
            <FormDescription>
              Felder mit einem <strong>*</strong> sind Pflichtfelder.
            </FormDescription>
          )}
          <Button type="submit" disabled={phase === "loading"}>
            {phase === "loading" ? texts.submitLoadingText : texts.submitText}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}

function FinalForm({
  result,
  config,
}: {
  result: FormFnRes | null;
  config?: GenericFormConfig;
}) {
  const { sx, msg } = result ?? {
    sx: false,
    msg: "Ein Fehler ist aufgetreten.",
  };
  const Icon = sx ? CheckCircleIcon : XCircleIcon;
  return (
    <div className="flex flex-col items-center w-full gap-4">
      <div
        className={cn(
          " w-full h-16 flex justify-center my-8",
          sx ? "text-green-800" : "text-red-800"
        )}
      >
        <Icon className="size-16 animate-bounce" />
      </div>
      <span className="text-xl font-bold">{msg}</span>
      {sx ? (
        <span className="text-center">
          {config?.submitSuccessText ? (
            <>{config.submitSuccessText}</>
          ) : (
            <>
              Bei Fragen kannst du uns jederzeit{" "}
              <Link href="/kontakt" className="underline">
                kontaktieren
              </Link>
              {" :)"}
            </>
          )}
        </span>
      ) : (
        <span className="text-center">
          Versuche es erneut oder{" "}
          <Link href="/kontakt" className="underline">
            kontaktiere uns
          </Link>
          .
        </span>
      )}
    </div>
  );
}
