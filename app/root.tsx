import {
	json,
	type LinksFunction,
	type LoaderFunctionArgs,
	type MetaFunction,
} from '@remix-run/node';
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
	useMatches,
} from '@remix-run/react';
import { withSentry } from '@sentry/remix';
import { HoneypotProvider } from 'remix-utils/honeypot/react';

import {
	ThemeSwitch,
	useTheme,
} from '#/app/routes/resources+/theme-switch.tsx';
import { getHints } from '#/shared/lib/client-hints.tsx';
import { honeypot } from '#/shared/lib/honeypot.server.ts';
import { getTheme, type Theme } from '#/shared/lib/theme.server.ts';
import tailwindStyleSheetUrl from '#/shared/styles/tailwind.css?url';

export const links: LinksFunction = () => {
	return [
		// todo: (pavelN)
		// // Preload svg sprite as a resource to avoid render blocking
		// { rel: 'preload', href: iconsHref, as: 'image' },
		// // Preload CSS as a resource to avoid render blocking
		// { rel: 'mask-icon', href: '/favicons/mask-icon.svg' },
		// {
		// 	rel: 'alternate icon',
		// 	type: 'image/png',
		// 	href: '/favicons/favicon-32x32.png',
		// },
		// { rel: 'apple-touch-icon', href: '/favicons/apple-touch-icon.png' },
		// {
		// 	rel: 'manifest',
		// 	href: '/site.webmanifest',
		// 	crossOrigin: 'use-credentials',
		// } as const, // necessary to make typescript happy
		// //These should match the css preloads above to avoid css as render blocking resource
		// { rel: 'icon', type: 'image/svg+xml', href: '/favicons/favicon.svg' },
		{ rel: 'stylesheet', href: tailwindStyleSheetUrl },
	].filter(Boolean);
};

export const meta: MetaFunction = () => {
	return [
		{ title: 'Remind-me' },
		{ name: 'description', content: 'Welcome to Remind-me!' },
	];
};

export async function loader({ request }: LoaderFunctionArgs) {
	const honeyProps = honeypot.getInputProps();
	// todo: here is User validation magic should happen
	return json({
		honeyProps,
		requestInfo: {
			hints: getHints(request),
			// todo @pavelN
			// origin: getDomainUrl(request),
			path: new URL(request.url).pathname,
			userPrefs: {
				theme: getTheme(request),
			},
		},
	});
}

function Document({
	children,
	// nonce,
	theme = 'light',
	env = {},
	allowIndexing = true,
}: {
	children: React.ReactNode;
	// nonce: string;
	theme?: Theme;
	env?: Record<string, string>;
	allowIndexing?: boolean;
}) {
	return (
		<html lang="en" className={`${theme} h-full overflow-x-hidden`}>
			<head>
				{/*// todo (pavel):*/}
				{/*<ClientHintCheck nonce={nonce} />*/}
				<Meta />
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				{allowIndexing ? null : (
					<meta name="robots" content="noindex, nofollow" />
				)}
				<Links />
			</head>
			<body className="bg-background text-foreground">
				{children}
				<script
					// todo (pavelN):
					// nonce={nonce}
					dangerouslySetInnerHTML={{
						__html: `window.ENV = ${JSON.stringify(env)}`,
					}}
				/>
				{/*<ScrollRestoration nonce={nonce} />*/}
				{/*<Scripts nonce={nonce} />*/}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

function App() {
	const data = useLoaderData<typeof loader>();
	// todo: (pavelN)
	// const nonce = useNonce();
	// const user = useOptionalUser();
	const theme = useTheme();
	const matches = useMatches();
	const isOnSearchPage = matches.find(m => m.id === 'routes/users+/index');
	// todo: (pavelN)
	// const searchBar = isOnSearchPage ? null : <SearchBar status="idle" />;
	// const allowIndexing = data.ENV.ALLOW_INDEXING !== 'false';
	// useToast(data.toast);

	return (
		<Document
			// todo pavelN
			// nonce={nonce}
			theme={theme}
			// todo pavelN
			// allowIndexing={allowIndexing}
			// env={data.ENV}
		>
			<div className="flex h-screen flex-col justify-between">
				<header className="container py-6">
					<nav className="flex flex-wrap items-center justify-between gap-4 sm:flex-nowrap md:gap-8">
						{/*// todo pavelN*/}
						{/*<Logo />*/}
						<div className="ml-auto hidden max-w-sm flex-1 sm:block">
							{/*// todo pavelN*/}
							{/*{searchBar}*/}
						</div>
						{/*// todo pavelN*/}
						{/*<div className="flex items-center gap-10">*/}
						{/*	{user ? (*/}
						{/*		<UserDropdown />*/}
						{/*	) : (*/}
						{/*		<Button asChild variant="default" size="lg">*/}
						{/*			<Link to="/login">Log In</Link>*/}
						{/*		</Button>*/}
						{/*	)}*/}
						{/*</div>*/}

						{/*// todo pavelN*/}
						{/*<div className="block w-full sm:hidden">{searchBar}</div>*/}
					</nav>
				</header>

				<div className="flex-1">
					<Outlet />
				</div>

				{/*// todo pavelN*/}
				{/*<div className="container flex justify-between pb-5">*/}
				{/*	<Logo />*/}
				<ThemeSwitch userPreference={data.requestInfo.userPrefs.theme} />
				{/*</div>*/}
			</div>
			{/*// todo pavelN*/}
			{/*<EpicToaster closeButton position="top-center" theme={theme} />*/}
			{/*<EpicProgress />*/}
		</Document>
	);
}

function AppWithProviders() {
	const data = useLoaderData<typeof loader>();
	return (
		<HoneypotProvider {...data.honeyProps}>
			<App />
		</HoneypotProvider>
	);
}

export default withSentry(AppWithProviders);

export function ErrorBoundary() {
	// the nonce doesn't rely on the loader so we can access that
	// todo: pavelN nonce
	// const nonce = useNonce()

	// NOTE: you cannot use useLoaderData in an ErrorBoundary because the loader
	// likely failed to run so we have to do the best we can.
	// We could probably do better than this (it's possible the loader did run).
	// This would require a change in Remix.

	// Just make sure your root route never errors out and you'll always be able
	// to give the user a better UX.

	return (
		// todo: pavelN nonce
		// <Document nonce={nonce}>
		<Document>
			{/*// todo: pavelN*/}
			GeneralErrorBoundary
			{/*<GeneralErrorBoundary />*/}
		</Document>
	);
}
