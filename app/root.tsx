import {
	json,
	type LoaderFunctionArgs,
	type MetaFunction,
} from '@remix-run/node';
import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react';

export const meta: MetaFunction = () => {
	return [
		{ title: 'Remind-me' },
		{ name: 'description', content: 'Welcome to Remind-me!' },
	];
};

export async function loader({ request }: LoaderFunctionArgs) {
	// todo: here is User validation magic should happen
	return json({});
}

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}
