<template>
	<v-mask-input v-click-outside="{ handler, include }" :disabled="disabled" :label="label" v-model="text"
				  :focused="menu || isFocused" @update:focused="onFocus" mask="time" placeholder="hh:mm" @change="onChange"
				  return-masked-value hide-details="auto" :suffix="suffix">
		<v-menu v-model="menu" activator="parent" :close-on-content-click="false" :open-on-click="false">
			<v-time-picker :max="toISO(max)" :min="toISO(min)" ref="picker" format="24hr" color="primary" hide-header
						   :model-value="pickerTime()" @update:model-value="onPick" />
		</v-menu>
	</v-mask-input>
</template>

<script setup lang="ts">
	import { shallowRef, useTemplateRef, watch } from 'vue';
	import { VMaskInput } from 'vuetify/labs/VMaskInput';

	const props = defineProps<{
		label?: string;
		disabled?: boolean;
		min?: Date;
		max?: Date;
		suffix?: string;
		modelValue?: Date;
	}>();
	const emit = defineEmits(["update:modelValue"]);

	const text = shallowRef<string>();
	const menu = shallowRef(false);
	const isFocused = shallowRef(false);
	const picker = useTemplateRef("picker");

	const PREFIX = "2000-01-01 ";

	watch(() => props.modelValue, v => read(v));
	function read(v: Date | undefined) {
		const date = toISO(v);
		text.value = date;
	}

	function onFocus(focused: boolean) {
		if(focused) menu.value = true;
		isFocused.value = focused;
	}

	function onChange(): void {
		if(!text.value) return read(props.modelValue);
		const time = Date.parse(text.value ? PREFIX + text.value : "");
		if(
			!isNaN(time) &&
			(props.max === undefined || toISO(props.max) > text.value) &&
			(props.min === undefined || toISO(props.min) < text.value)
		) {
			emit("update:modelValue", new Date(time));
		} else {
			read(props.modelValue);
		}
	}

	function toISO(d: Date): string;
	function toISO(d: undefined): undefined;
	function toISO(d: Date | undefined): string | undefined;
	function toISO(d: Date | undefined): string | undefined {
		if(!d) return undefined;
		const offset = d.getTimezoneOffset() * 60000;
		return (new Date(d.getTime() - offset)).toISOString().substring(11, 16);
	}

	function pickerTime(): Date | undefined {
		if(!text.value) return undefined;
		const time = Date.parse(PREFIX + text.value);
		if(isNaN(time)) return undefined;
		return new Date(time);
	}

	function onPick(e: unknown) {
		emit("update:modelValue", new Date(Date.parse(PREFIX + e)));
	}

	function handler(): void {
		menu.value = false;
	}
	function include() {
		return [picker.value?.$el];
	}

</script>

<style scoped>
	:deep(.v-field__input) {
		max-width: 4.5em;
	}
</style>