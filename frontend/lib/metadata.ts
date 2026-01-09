import type { Metadata } from "next";

export function createMetadata(override: Metadata): Metadata {
	return {
		...override,
		openGraph: {
			title: override.title ?? undefined,
			description: override.description ?? undefined,
			url: "https://alertwise.vercel.app",
			images: "https://alertwise.vercel.app/og.png",
			siteName: "AlertWise",
			...override.openGraph,
		},
		twitter: {
			card: "summary_large_image",
			creator: "@alertwise",
			title: override.title ?? undefined,
			description: override.description ?? undefined,
			images: "https://alertwise.vercel.app/og.png",
			...override.twitter,
		},
	};
}

export const baseUrl =
	process.env.NODE_ENV === "development"
		? new URL("http://localhost:3000")
		: new URL(`https://${process.env.VERCEL_URL || "alertwise.vercel.app"}`);
