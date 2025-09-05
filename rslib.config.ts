import { defineConfig } from "@rslib/core";
import { pluginVue } from "@rsbuild/plugin-vue";
// import { pluginUnpluginVue } from 'rsbuild-plugin-unplugin-vue'; 
import { pluginSass } from "@rsbuild/plugin-sass";
import { VuetifyPlugin } from "webpack-plugin-vuetify";

export default defineConfig({
	lib: [
		{
			format: "esm",
			syntax: "es2024",
			dts: {
				bundle: true, // Requires @microsoft/api-extractor
			},
		},
		{
			format: "cjs",
			syntax: "es2024",
		},
	],
	performance: {
		buildCache: true,
	},
	output: {
		target: "web",
	},
	plugins: [
		pluginVue(),
		pluginSass(),
	],
	tools: {
		rspack: (_, { appendPlugins }) => {
			appendPlugins(new VuetifyPlugin({}));
		},
	},
});
