import { useArgs } from "storybook/preview-api";
import DateInput from "./dateInput.vue";

import type { Meta, StoryObj, ArgTypes } from "storybook-vue3-rsbuild";

interface StoryData {

}

type Component = typeof DateInput;

const meta: Meta<Component> = {
	title: "DateInput",
	component: DateInput,
	tags: ["autodocs"],
	render: args => {
		const [_, updateArgs] = useArgs();
		return {
			components: { DateInput },
			setup() {
				return { args, updateArgs };
			},
			template: `<DateInput v-bind="args"
				:model-value="new Date(args.modelValue)"
				@update:model-value="v => updateArgs({ modelValue: v.getTime() })"
			/>`,
		};
	},
	argTypes: {
		"min": { control: "date" },
		"max": { control: "date" },
		"modelValue": { control: "date" },
	} as ArgTypes,
};

export default meta;

type Story = StoryObj<Component>;

export const defaultStory: Story = {
	name: "Default look",
	args: {
		modelValue: undefined,
	},
};

export const minStory: Story = {
	name: "With Max",
	args: {
		modelValue: undefined,
		max: new Date(2025, 8, 20),
	},
};