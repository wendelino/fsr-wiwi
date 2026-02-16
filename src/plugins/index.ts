import { s3Storage } from "@payloadcms/storage-s3";

import { formBuilderPlugin } from "@payloadcms/plugin-form-builder";
import { nestedDocsPlugin } from "@payloadcms/plugin-nested-docs";
import { redirectsPlugin } from "@payloadcms/plugin-redirects";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { searchPlugin } from "@payloadcms/plugin-search";

import { importExportPlugin } from "@payloadcms/plugin-import-export";
import { Plugin } from "payload";
import { revalidateRedirects } from "@/hooks/revalidateRedirects";
import {
	GenerateDescription,
	GenerateTitle,
	GenerateURL,
} from "@payloadcms/plugin-seo/types";
import {
	FixedToolbarFeature,
	HeadingFeature,
	lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { searchFields } from "@/search/fieldOverrides";
import { beforeSyncWithSearch } from "@/search/beforeSync";

import { Page, Post, Event } from "@/payload-types";
import { getServerSideURL } from "@/utilities/getURL";

const generateTitle: GenerateTitle<Post | Page | Event> = ({ doc }) => {
	return doc?.title
		? `${doc.title} | Fachschaftsrat Wirtschaftswissenschaften Halle`
		: "Fachschaftsrat Wirtschaftswissenschaften Halle";
};

const generateURL: GenerateURL<Post | Page | Event> = ({ doc }) => {
	const url = getServerSideURL();

	return doc?.slug ? `${url}/${doc.slug}` : url;
};

const generateDescription: GenerateDescription<Post | Page | Event> = ({
	doc,
}) => {
	// Type guard: Check for Page type (has meta)
	if ("meta" in doc && typeof doc.meta === "object" && doc.meta !== null) {
		return doc.meta.description
			? doc.meta.description
			: "Fachschaftsrat Wirtschaftswissenschaften Halle";
	}
	if ("description" in doc && typeof doc.description === "string") {
		return doc.description
			? doc.description
			: "Fachschaftsrat Wirtschaftswissenschaften Halle";
	}
	// Otherwise, fallback to .description field (for Post/Event)
	return "Fachschaftsrat Wirtschaftswissenschaften Halle";
};

export const plugins: Plugin[] = [
	redirectsPlugin({
		collections: ["pages", "posts"],
		overrides: {
			// @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
			fields: ({ defaultFields }) => {
				return defaultFields.map((field) => {
					if ("name" in field && field.name === "from") {
						return {
							...field,
							admin: {
								description:
									"You will need to rebuild the website when changing this field.",
							},
						};
					}
					return field;
				});
			},
			hooks: {
				afterChange: [revalidateRedirects],
			},
		},
	}),
	importExportPlugin({
		collections: ["users", "pages"],
		// see below for a list of available options
	}),
	nestedDocsPlugin({
		collections: ["categories"],
		generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ""),
	}),
	s3Storage({
		collections: {
			media: {
				prefix: "website-data",
			},
		},

		bucket: process.env.S3_BUCKET!,
		disableLocalStorage: true,

		config: {
			forcePathStyle: true,
			credentials: {
				accessKeyId: process.env.S3_ACCESS_KEY_ID!,
				secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
			},
			endpoint: process.env.S3_ENDPOINT,
			region: "eu-central-1",
		},
	}),
	seoPlugin({
		generateTitle,
		generateURL,
		generateDescription,
	}),
	formBuilderPlugin({
		fields: {
			payment: false,
		},
		formOverrides: {
			fields: ({ defaultFields }) => {
				return defaultFields.map((field) => {
					if ("name" in field && field.name === "confirmationMessage") {
						return {
							...field,
							editor: lexicalEditor({
								features: ({ rootFeatures }) => {
									return [
										...rootFeatures,
										FixedToolbarFeature(),
										HeadingFeature({
											enabledHeadingSizes: ["h1", "h2", "h3", "h4"],
										}),
									];
								},
							}),
						};
					}
					return field;
				});
			},
		},
	}),
	searchPlugin({
		collections: ["posts", "pages", "events"],
		beforeSync: beforeSyncWithSearch,
		searchOverrides: {
			fields: ({ defaultFields }) => {
				return [...defaultFields, ...searchFields];
			},
		},
	}),
];
