import sveltePreprocess from 'svelte-preprocess';
import https from "https"
import { defineConfig } from 'rollup';

export default {
  preprocess: sveltePreprocess(),
  defineConfig
};
