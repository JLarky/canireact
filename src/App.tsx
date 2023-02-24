import { useRoutes, A, RouteDefinition, useLocation, AnchorProps } from '@solidjs/router';
import { createMemo, Show } from 'solid-js';

type Question = {
	url: string;
	message: string;
	option1Url: string;
	option1Text: string;
	option2Url: string;
	option2Text: string;
};

const twitter = new URL('https://twitter.com/intent/tweet');
twitter.searchParams.set('text', 'Can I react to this? https://canireact.deno.dev/');
const twitterUrl = twitter.toString();

const questions = [
	{
		url: '/',
		message: 'What do you want to react to?',
		option1Url: 'copyrighted',
		option1Text: 'Copyrighted content (movies, tv shows, etc.)',
		option2Url: 'public-domain',
		option2Text: 'Public domain (the bible, tweets, etc.)',
	},
	{
		url: '/copyrighted/',
		message: 'Do you have any amount of that content in your video?',
		option1Url: 'fair-use',
		option1Text: 'Yes (still frame, clip, etc.)',
		option2Url: 'nothing',
		option2Text: 'No',
	},
	{
		url: '/copyrighted/fair-use/',
		message: 'Where is your video going to be posted?',
		option1Url: 'youtube',
		option1Text: 'YouTube',
		option2Url: 'twitch',
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
		path: '/404',
		component: () => <div>404</div>,
	},
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
		const res = questions.find((q) => q.url === x.pathname || q.url === x.pathname + '/');
		return res;
	});
	return (
		<Show when={q()} keyed fallback={<div>404</div>}>
			{(v) => <Question base={x.pathname} q={v} />}
		</Show>
	);
}

function Question(props: { base: string; q: Question }) {
	const q = () => props.q;
	return (
		<div class="container mx-auto px-4 py-8">
			<h1 class="text-4xl font-bold text-center mb-8 dark:text-gray-100">{q().message}</h1>

			<div class="flex justify-center">
				<div class="w-1/2 rounded-lg shadow-lg bg-white dark:bg-gray-800 mr-2 sm:mr-4 h-min">
					<Link
						base={props.base}
						href={q().option1Url}
						class="block w-full px-2 py-4 text-center text-xl font-bold text-blue-500 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-4 dark:text-blue-200 dark:hover:text-white dark:focus:ring-offset-gray-900 rounded-lg"
					>
						{q().option1Text}
					</Link>
				</div>
				<div class="w-1/2 rounded-lg shadow-lg bg-white dark:bg-gray-800 ml-2 sm:ml-4 h-min">
					<Link
						base={props.base}
						href={q().option2Url}
						class="block w-full px-2 py-4 text-center text-xl font-bold text-purple-500 hover:bg-purple-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-4 dark:text-purple-200 dark:hover:text-white dark:focus:ring-offset-gray-900 rounded-lg"
					>
						{q().option2Text}
					</Link>
				</div>
			</div>
			<div class="fixed bottom-0 right-0 p-2 flex">
				<a
					href="https://github.com/JLarky/canireact"
					target="_blank"
					rel="noopener noreferrer"
					class="flex items-center py-2 px-4 rounded bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-offset-gray-900"
				>
					<span>Star on Github</span>
				</a>
				<a
					href="http://qgp.app/"
					target="_blank"
					rel="noopener noreferrer"
					class="ml-2 flex items-center py-2 px-4 rounded bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-offset-gray-900"
				>
					<span>Built with QGP</span>
				</a>
			</div>
		</div>
	);
}

function Link(props: AnchorProps & { base: string }) {
	return (
		<Show
			when={!props.href.startsWith('http')}
			fallback={
				<a target="_blank" href={props.href} children={props.children} class={props.class} />
			}
		>
			<A
				{...props}
				href={(() => {
					if (props.href.startsWith('/')) return props.href;
					const baseWithTrail = props.base.endsWith('/') ? props.base : props.base + '/';
					return baseWithTrail + props.href;
				})()}
			/>
		</Show>
	);
}

export default App;
