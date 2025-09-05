import DatetimeRangePicker from "./datetimeRangePicker.vue";

import type { Meta, StoryObj } from "storybook-vue3-rsbuild";

interface StoryData {
	
}

type Component = typeof DatetimeRangePicker;

const meta: Meta<Component> = {
	title: "DatetimeRangePicker",
	component: DatetimeRangePicker,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<Component>;

export const defaultStory: Story = {
	name: "Default look",
};

export const densityCompactStory: Story = {
	name: "Density compact",
	args: {
		density: "compact"
	}
};

export const variantOutlinedStory: Story = {
	name: "Variant outlined",
	args: {
		density: "comfortable",
		variant: "outlined",
	}
};
