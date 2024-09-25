import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'path';
import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
            $components: path.resolve('./src/components'),
            // ajoutez d'autres alias si nécessaire
        }
	},

	plugins: [sveltekit()],
	server: {
	  proxy: {
		'/api': {
		  target: 'http://makoya.youskil.com', // Remplacez par l'URL de votre API
		  changeOrigin: true,
		  rewrite: (path) => path.replace(/^\/api/, '')
		}
	  }
	}
};

export default config;
