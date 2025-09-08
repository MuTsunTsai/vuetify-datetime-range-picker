import { useArgs } from "storybook/preview-api";
import TimeInput from "./timeInput.vue";

import type { Meta, StoryObj, ArgTypes } from "storybook-vue3-rsbuild";

interface StoryData {

}

type Component = typeof TimeInput;

const meta: Meta<Component> = {
	title: "TimeInput",
	component: TimeInput,
	tags: ["autodocs"],
	render: args => {
		const [_, updateArgs] = useArgs();
		return {
			components: { TimeInput },
			setup() {
				return { args, updateArgs };
			},
			template: `<TimeInput v-bind="args"
				:model-value="new Date(args.modelValue)"
				@update:model-value="v => updateArgs({ modelValue: v.getTime() })"
			/>`,
		};
	},
	argTypes: {
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

export const suffixStory: Story = {
	name: "Custom suffix",
	args: {
		modelValue: undefined,
		suffix: ":00",
	},
};
