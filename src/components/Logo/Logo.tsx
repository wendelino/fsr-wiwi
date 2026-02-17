import clsx from "clsx";
import Image from "next/image";

interface Props {
  className?: string;
  loading?: "lazy" | "eager";
  priority?: "auto" | "high" | "low";
}

export const Logo = (props: Props) => {
  const {
    loading: loadingFromProps,
    priority: priorityFromProps,
    className,
  } = props;

  const loading = loadingFromProps || "lazy";
  const priority = priorityFromProps || "low";

  return (
    /* eslint-disable @next/next/no-img-element */
    <Image
      alt="Payload Logo"
      className={clsx("h-[48px] w-full", className)}
      decoding="async"
      fetchPriority={priority}
      height={192}
      loading={loading}
      src="/logo.png"
      width={192}
    />
  );
};
