import DatetimeRangePicker from "./datetimeRangePicker.vue";

import type { Meta, StoryObj, ArgTypes } from "storybook-vue3-rsbuild";

interface StoryData {

}

type Component = typeof DatetimeRangePicker;

const meta: Meta<Component> = {
	title: "DatetimeRangePicker",
	component: DatetimeRangePicker,
	tags: ["autodocs"],
	render: args => ({
		components: { DatetimeRangePicker },
		setup() {
			return { args };
		},
		template: `<div><DatetimeRangePicker v-bind="args" v-model="args.modelValue" /><br><br>{{ args.modelValue }}</div>`,
	}),
	argTypes: {
		"density": { control: { type: "select" }, options: ["default", "comfortable", "compact"] },
		"modelValue": { control: "object" },
	} as ArgTypes,
};

export default meta;

type Story = StoryObj<Component>;

export const defaultStory: Story = {
	name: "Default look",
	args: {
		modelValue: [undefined, undefined],
	}
};

export const densityCompactStory: Story = {
	name: "Density compact",
	args: {
		density: "compact",
		modelValue: [undefined, undefined],
	}
};

export const variantOutlinedStory: Story = {
	name: "Variant outlined",
	args: {
		density: "comfortable",
		variant: "outlined",
		modelValue: [undefined, undefined],
	}
};
