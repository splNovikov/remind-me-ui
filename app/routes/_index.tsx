import { Link } from '@remix-run/react';

import { Button } from '#/shared/ui/button';

export default function Index() {
	return (
		<div>
			<h1>Welcome to Remind-me</h1>
			<Button variant="default" size="lg">
				<Link to="/login">Log In</Link>
			</Button>
			<ul>
				<li>
					<a
						target="_blank"
						href="https://remix.run/tutorials/blog"
						rel="noreferrer"
					>
						15m Quickstart Blog Tutorial!
					</a>
				</li>
				<li>
					<a
						target="_blank"
						href="https://remix.run/tutorials/jokes"
						rel="noreferrer"
					>
						Deep Dive Jokes App Tutorial
					</a>
				</li>
				<li>
					<a target="_blank" href="https://remix.run/docs" rel="noreferrer">
						Remix Docs
					</a>
				</li>
			</ul>
		</div>
	);
}
