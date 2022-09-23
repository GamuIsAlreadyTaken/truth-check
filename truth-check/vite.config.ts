import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
  server: {
    fs: {
      allow: ['../../../node_modules',
    '../../node_modules']
      // TODO When moving up the folder change the path
      // taking out ../ should be enough
    }
  }
};

export default config;
