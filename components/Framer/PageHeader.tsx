"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { H1 } from "./H1";
import { P } from "./P";
import { Skeleton } from "../ui/skeleton";

interface BaseProps { 
  className?: string;
  title?: string;
  subtitle?: string;
  loading?: boolean
}

export const PageHeader = ({ className, title, subtitle, loading }: BaseProps) => {
    const [isFirstRender, setIsFirstRender] = useState(true);
  
    useEffect(() => setIsFirstRender(false), []);

    if (loading) return (
      <header className="p-5 flex flex-col gap-4 justify-center items-center py-8 lg:pt-20 ">
        <Skeleton className="w-1/3 h-12"/>
        <Skeleton className="w-3/4 h-8"/>
      </header>
    )
    return (
      <header className="p-5 text-center py-8 lg:pt-20 ">
        <H1>{title}</H1>
        <P className="lg:text-xl max-w-2xl">{subtitle}</P>
      </header>
    );
  };