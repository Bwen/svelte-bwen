import preprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';
import adapter from '@sveltejs/adapter-static';
// import adapter_ipfs from 'sveltejs-adapter-ipfs';
import { searchForWorkspaceRoot } from 'vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		postcss: {
			plugins: [
				autoprefixer(),
			]
		}
	}),
	kit: {
		ssr: false,
		// prerender: {
		// 	crawl: false,
		// 	enabled: false,
		// 	entries: [],
		// },
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		// adapter: adapter_ipfs({removeBuiltInServiceWorkerRegistration: true, injectPagesInServiceWorker: true}),
		adapter: adapter({
			// default options are shown
			pages: 'build',
			assets: 'build',
			fallback: 'index.html'
		})
	},
};

export default config;
