"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { H1 } from "./H1";
import { P } from "./P";

interface BaseProps { 
  className?: string;
  title: string;
  subtitle?: string;
}

export const PageHeader = ({ className, title, subtitle }: BaseProps) => {
    const [isFirstRender, setIsFirstRender] = useState(true);
  
    useEffect(() => setIsFirstRender(false), []);
  
    return (
      <header className="p-5 text-center py-8 lg:pt-20 ">
        <H1>{title}</H1>
        <P className="lg:text-xl max-w-2xl">{subtitle}</P>
      </header>
    );
  };