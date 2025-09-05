import type { StorybookConfig } from "storybook-vue3-rsbuild";

const config: StorybookConfig = {
	framework: "storybook-vue3-rsbuild",
	stories: ["../src/**/*.stories.ts"],
	addons: ["@storybook/addon-docs"],
};

export default config;
