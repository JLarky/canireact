import { Router, useRoutes, A, RouteDefinition, useLocation } from '@solidjs/router';
import { createMemo, createResource, createSignal, lazy } from 'solid-js';
import solidLogo from './assets/solid.svg';

type Question = {
	url: string;
	message: string;
	option1Url: string;
	option1Text: string;
	option2Url: string;
	option2Text: string;
};

const twitterUrl = new URL('https://twitter.com/intent/tweet');
twitterUrl.searchParams.set('text', 'Can I react to this? https://canireact.deno.dev/');

const questions = [
	{
		url: '/',
		message: 'What do you want to react to?',
		option1Url: './copyrighted/',
		option1Text: 'Copyrighted content (movies, tv shows, etc.)',
		option2Url: './public-domain/',
		option2Text: 'Public domain (the bible, tweets, etc.)',
	},
	{
		url: '/copyrighted/',
		message: 'Do you have any amount of that content in your video?',
		option1Url: './fair-use/',
		option1Text: 'Yes (still frame, clip, etc.)',
		option2Url: './nothing/',
		option2Text: 'No',
	},
	{
		url: '/copyrighted/fair-use/',
		message: 'Where is your video going to be posted?',
		option1Url: './youtube/',
		option1Text: 'YouTube',
		option2Url: './twitch/',
		option2Text: 'Twitch',
	},
	{
		url: '/copyrighted/fair-use/youtube/',
		message: 'Congratulations! You got DMCAed!',
		option1Url: twitterUrl,
		option1Text: 'Share this website',
		option2Url: '/',
		option2Text: 'Restart',
	},
	{
		url: '/copyrighted/fair-use/twitch/',
		message: 'Congratulations! You are safe! Worst case scenario, part of your video gets muted.',
		option1Url: twitterUrl,
		option1Text: 'Share this website',
		option2Url: '/',
		option2Text: 'Restart',
	},
	{
		url: '/copyrighted/nothing/',
		message:
			'Congratulations! You are safe! You can give free promotion to the original content without any legal issues.',
		option1Url: twitterUrl,
		option1Text: 'Share this website',
		option2Url: '/',
		option2Text: 'Restart',
	},
	{
		url: '/public-domain/',
		message: "Congratulations! You are safe! You can react if there's no one who owns the content.",
		option1Url: twitterUrl,
		option1Text: 'Share this website',
		option2Url: '/',
		option2Text: 'Restart',
	},
] satisfies Question[];

const routes = [
	{
		path: '/*slug',
		component: () => <Questions />,
	},
] satisfies RouteDefinition[];

function App() {
	const Routes = useRoutes(routes);

	return <Routes />;
}

function Questions() {
	const x = useLocation();
	const q = createMemo(() => {
		const res = questions.find((q) => q.url === x.pathname);
		console.log(res);
		return res;
	});

	return (
		<div class="container mx-auto px-4 py-8">
			<h1 class="text-4xl font-bold text-center mb-8">{q().message}</h1>

			<div class="flex justify-center">
				<div class="w-1/2 rounded-lg overflow-hidden shadow-lg bg-white mr-4">
					<a
						href={q().option1Url}
						class="block w-full py-4 text-center text-xl font-bold text-blue-500 hover:bg-blue-500 hover:text-white focus:outline-none"
					>
						{q().option1Text}
					</a>
				</div>
				<div class="w-1/2 rounded-lg overflow-hidden shadow-lg bg-white ml-4">
					<a
						href={q().option2Url}
						class="block w-full py-4 text-center text-xl font-bold text-red-500 hover:bg-red-500 hover:text-white focus:outline-none"
					>
						{q().option2Text}
					</a>
				</div>
			</div>
		</div>
	);
}

export default App;
