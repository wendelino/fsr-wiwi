import clsx from "clsx";
import Image from "next/image";
import React from "react";

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
			width={192}
			height={192}
			loading={loading}
			fetchPriority={priority}
			decoding="async"
			className={clsx("w-full h-[48px]", className)}
			src="/logo.png"
		/>
	);
};
