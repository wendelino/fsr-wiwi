"use client";

import type { Header as HeaderType } from "@/payload-types";

import { Menu, Search } from "lucide-react";

import { cn } from "@/utilities/ui";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";

export interface MenuItem {
	title: string;
	url: string;
	description?: string;
	icon?: React.ReactNode;
	newTab?: boolean;
	items?: MenuItem[];
}

const renderMenuItem = (item: MenuItem) => {
	const newTabProps = item.newTab
		? { rel: "noopener noreferrer", target: "_blank" as const }
		: {};

	return (
		<NavigationMenuItem key={item.title}>
			{item.items ? (
				<>
					<NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
					<NavigationMenuContent className="bg-popover text-popover-foreground">
						{item.items.map((subItem) => (
							<NavigationMenuLink asChild key={subItem.title} className="w-80">
								<SubMenuLink item={subItem} />
							</NavigationMenuLink>
						))}
					</NavigationMenuContent>
				</>
			) : (
				<NavigationMenuLink
					asChild
					className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
				>
					<Link href={item.url} {...newTabProps}>
						{item.title}
					</Link>
				</NavigationMenuLink>
			)}
		</NavigationMenuItem>
	);
};

const renderMobileMenuItem = (item: MenuItem) => {
	const newTabProps = item.newTab
		? { rel: "noopener noreferrer", target: "_blank" as const }
		: {};

	if (item.items) {
		return (
			<AccordionItem key={item.title} value={item.title} className="border-b-0">
				<AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
					{item.title}
				</AccordionTrigger>
				<AccordionContent className="mt-2">
					{item.items.map((subItem) => (
						<SubMenuLink key={subItem.title} item={subItem} />
					))}
				</AccordionContent>
			</AccordionItem>
		);
	}

	return (
		<Link
			key={item.title}
			href={item.url}
			className="text-md font-semibold"
			{...newTabProps}
		>
			{item.title}
		</Link>
	);
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
	const newTabProps = item.newTab
		? { rel: "noopener noreferrer", target: "_blank" as const }
		: {};

	return (
		<Link
			className="flex min-w-80 flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
			href={item.url}
			{...newTabProps}
		>
			<div className="text-foreground">{item.icon}</div>
			<div>
				<div className="text-sm font-semibold">{item.title}</div>
				{item.description && (
					<p className="text-sm leading-snug text-muted-foreground">
						{item.description}
					</p>
				)}
			</div>
		</Link>
	);
};

const fallbackLabel = "Link";

const mapLinkToHref = (
	link: NonNullable<HeaderType["navItems"]>[number]["link"],
): string => {
	const referenceValue = link?.reference?.value;

	if (
		link?.type === "reference" &&
		typeof referenceValue === "object" &&
		referenceValue?.slug
	) {
		return `${link.reference?.relationTo !== "pages" ? `/${link.reference?.relationTo}` : ""}/${referenceValue.slug}`;
	}

	return link?.url || "#";
};

const mapNavItem = (
	item: NonNullable<HeaderType["navItems"]>[number],
): MenuItem => {
	const subpages = item?.subpages ?? [];

	return {
		title: item?.link?.label || fallbackLabel,
		url: mapLinkToHref(item.link),
		newTab: item?.link?.newTab || false,
		items: subpages.length
			? subpages
					.filter((subpage) => Boolean(subpage?.link))
					.map((subpage) => ({
						title: subpage?.link?.label || fallbackLabel,
						url: mapLinkToHref(subpage.link),
						newTab: subpage?.link?.newTab || false,
					}))
			: undefined,
	};
};

export const HeaderNav = ({ data }: { data: HeaderType }) => {
	const navItems = data?.navItems || [];
	const menu: MenuItem[] = navItems
		.filter((item) => Boolean(item?.link))
		.map(mapNavItem);

	const logo = {
		url: "/",
		src: "/logo.png",
		alt: "logo",
		title: "FSR Wiwi Halle",
	};

	return (
		<section className={cn("py-4")}>
			<div className="container">
				{/* Desktop Menu */}
				<nav className="hidden items-center justify-between lg:flex">
					<div className="flex items-center justify-between gap-6 w-full">
						{/* Logo */}
						<a href={logo.url} className="flex items-center gap-2">
							<Image
								width={100}
								height={100}
								src={logo.src}
								className="  aspect-square object-contain w-12"
								alt={logo.alt}
							/>
							<span className="text-lg font-semibold tracking-tighter">
								{logo.title}
							</span>
						</a>
						<div className="flex items-center">
							<NavigationMenu>
								<NavigationMenuList>
									{menu.map((item) => renderMenuItem(item))}
									<NavigationMenuItem>
										<NavigationMenuLink
											asChild
											className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
										>
											<Link href="/search">
												<Search className="w-5 text-primary" />
											</Link>
										</NavigationMenuLink>
									</NavigationMenuItem>
								</NavigationMenuList>
							</NavigationMenu>
						</div>
					</div>
				</nav>

				{/* Mobile Menu */}
				<div className="block lg:hidden">
					<div className="flex items-center justify-between">
						{/* Logo */}
						<a href={logo.url} className="flex items-center gap-2">
							<Image
								width={100}
								height={100}
								src={logo.src}
								className="max-h-8 w-auto "
								alt={logo.alt}
							/>
						</a>
						<Sheet>
							<SheetTrigger asChild>
								<Button variant="outline" size="icon">
									<Menu className="size-4" />
								</Button>
							</SheetTrigger>
							<SheetContent className="overflow-y-auto">
								<SheetHeader>
									<SheetTitle>
										<a href={logo.url} className="flex items-center gap-2 p-4">
											<Image
												width={100}
												height={100}
												src={logo.src}
												className="max-h-8 w-auto"
												alt={logo.alt}
											/>
										</a>
									</SheetTitle>
								</SheetHeader>
								<div className="flex flex-col gap-6 p-4">
									<Accordion
										type="single"
										collapsible
										className="flex w-full flex-col gap-4"
									>
										{menu.map((item) => renderMobileMenuItem(item))}
									</Accordion>
								</div>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</section>
	);
};
