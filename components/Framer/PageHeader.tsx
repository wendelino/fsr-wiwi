"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { H1 } from "./H1";
import { P } from "./P";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

interface BaseProps {
	className?: string;
	title?: string;
	subtitle?: string;
	loading?: boolean;
	disableMuted?: boolean;
}

export const PageHeader = ({
	className,
	title,
	subtitle,
	loading,
	disableMuted,
}: BaseProps) => {
	const [isFirstRender, setIsFirstRender] = useState(true);

	useEffect(() => setIsFirstRender(false), []);

	if (loading)
		return (
			<div className="p-5 flex flex-col gap-4 justify-center items-center py-8 lg:pt-20 ">
				<Skeleton className="w-1/3 h-12" />
				<Skeleton className="w-3/4 h-8" />
			</div>
		);
	return (
		<div className="p-5 text-center py-2 pb-0 md:pb-8 md:pt-20 ">
			<H1 className="mb-0 sm:mb-2">{title}</H1>
			<P
				className={cn(
					"lg:text-xl max-w-2xl",
					!disableMuted && "text-muted-foreground",
				)}
			>
				{subtitle}
			</P>
		</div>
	);
};
