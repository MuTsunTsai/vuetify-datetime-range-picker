import { setup } from "@storybook/vue3";
import { h } from "vue";

import StoryWrapper from "./storyWrapper.vue";

import type { Decorator, Preview } from "@storybook/vue3";
import { createVuetify } from "vuetify";

import "vuetify/styles";
import { zhHant } from "vuetify/locale";

import '@mdi/font/css/materialdesignicons.css';

const vuetify = createVuetify({
	locale: {
		locale: "zhHant",
		messages: { zhHant },
	},
});

setup(app => {
	app.use(vuetify);
});

const withVuetifyTheme: Decorator = (storyFn, context) => {
	const story = storyFn();
	return () => h(StoryWrapper, {}, () => h(story, { ...context.args }));
};

const preview: Preview = {
	decorators: [withVuetifyTheme],
	tags: ["autodocs"],
};

export default preview;
