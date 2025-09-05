import { defineConfig } from "@rsbuild/core";
import { pluginVue } from "@rsbuild/plugin-vue";
import { pluginSass } from "@rsbuild/plugin-sass";
import { VuetifyPlugin } from "webpack-plugin-vuetify";

export default defineConfig({
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
