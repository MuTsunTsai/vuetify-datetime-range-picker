<template>
	<v-mask-input v-click-outside="{ handler, include }" :label="label" v-model="text" :focused="menu || isFocused"
				  @update:focused="onFocus" mask="iso-date" placeholder="yyyy-mm-dd" @change="onChange" return-masked-value
				  hide-details="auto">
		<v-menu v-model="menu" activator="parent" :close-on-content-click="false" :open-on-click="false">
			<v-card class="w-100 text-center">
				<div class="d-inline-block">
					<v-date-picker ref="picker" color="primary" :min="min" :max="max" :model-value="pickerDate()" hide-header
								   @update:model-value="onPick">
						<template #day="{ props, item }">
							<div :class="dayClass(item)">
								<v-btn v-bind="props" />
							</div>
						</template>
					</v-date-picker>
				</div>
			</v-card>
		</v-menu>
	</v-mask-input>
</template>

<script lang="ts">
	export function toISO(d: Date): string;
	export function toISO(d: undefined): undefined;
	export function toISO(d: Date | undefined): string | undefined;
	export function toISO(d: Date | undefined): string | undefined {
		if(!d) return undefined;
		const offset = d.getTimezoneOffset() * 60000;
		return (new Date(d.getTime() - offset)).toISOString().substring(0, 10);
	}
</script>

<script setup lang="ts">
	import { shallowRef, useTemplateRef, watch } from 'vue';
	import { VMaskInput } from 'vuetify/labs/VMaskInput';

	const props = defineProps<{
		label?: string;
		min?: Date;
		max?: Date;
		modelValue?: Date;
	}>();
	const emit = defineEmits(["update:modelValue"]);

	const text = shallowRef<string>();
	const menu = shallowRef(false);
	const isFocused = shallowRef(false);
	const picker = useTemplateRef("picker");

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
		const time = Date.parse(text.value);
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

	function dayClass(item: any): string {
		if(!text.value) return "";
		const results: string[] = ["v-date-input__range"];
		const iso = item.isoDate;
		const max = toISO(props.max);
		const min = toISO(props.min);
		if(iso == max || min && iso == text.value) results.push("v-date-input__range-end");
		if(iso == min || max && iso == text.value) results.push("v-date-input__range-start");
		if(text.value < iso && max && iso < max) results.push("v-date-input__range-mid");
		if(min && min < iso && iso < text.value) results.push("v-date-input__range-mid");
		return results.join(" ");
	}

	function pickerDate(): Date | undefined {
		if(!text.value) return undefined;
		const time = Date.parse(text.value);
		if(isNaN(time)) return undefined;
		return new Date(time);
	}

	function onPick(e: unknown) {
		if(e instanceof Date) {
			emit("update:modelValue", e);
		}
	}

	function handler(): void {
		menu.value = false;
	}
	function include() {
		return [picker.value?.$el];
	}

</script>

<style lang="scss">
	.v-date-input__range-end {
		background: rgb(var(--v-theme-primary));
		border-top-right-radius: 50%;
		border-bottom-right-radius: 50%;

		&:not(.v-date-input__range-start) {
			box-shadow: -4px 0 0 rgb(var(--v-theme-primary));
		}
	}

	.v-date-input__range-start {
		background: rgb(var(--v-theme-primary));
		border-top-left-radius: 50%;
		border-bottom-left-radius: 50%;

		&:not(.v-date-input__range-end) {
			box-shadow: 4px 0 0 rgb(var(--v-theme-primary));
		}
	}

	.v-date-input__range-mid {
		background: rgb(var(--v-theme-surface-variant));
		color: rgb(var(--v-theme-on-surface-variant));
		box-shadow:
			4px 0 0 rgb(var(--v-theme-surface-variant)),
			-4px 0 0 rgb(var(--v-theme-surface-variant));
	}
</style>