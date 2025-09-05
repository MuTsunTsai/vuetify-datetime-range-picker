<template>
	<v-defaults-provider :defaults="{
		global: {
			density: defaults.density,
			variant: defaults.variant,
		},
	}">
		<v-row align="baseline">
			<v-col>
				<date-input label="起日" v-model="startDate" :max="endDate" />
			</v-col>
			<v-col cols="auto" class="mr-n5 mr-sm-0">
				<v-checkbox v-model="useStartTime" hide-details="auto">
					<template #label>
						<span class="d-none d-sm-inline">自訂時間</span>
					</template>
				</v-checkbox>
			</v-col>
			<v-col>
				<time-input label="起時" v-model="startTime" :max="maxTime()" :disabled="!useStartTime" suffix=":00" />
			</v-col>
		</v-row>
		<v-row>
			<v-col>
				<date-input label="迄日" v-model="endDate" :min="startDate" />
			</v-col>
			<v-col cols="auto" class="mr-n5 mr-sm-0">
				<v-checkbox label="" v-model="useEndTime" hide-details="auto">
					<template #label>
						<span class="d-none d-sm-inline">自訂時間</span>
					</template>
				</v-checkbox>
			</v-col>
			<v-col>
				<time-input label="迄時" v-model="endTime" :min="minTime()" :disabled="!useEndTime" suffix=":59" />
			</v-col>
		</v-row>
	</v-defaults-provider>
</template>

<script setup lang="ts">
	import DateInput, { toISO } from './dateInput.vue';
	import timeInput from './timeInput.vue';

	import { shallowRef, watch } from 'vue';
	import { useDefaults } from "vuetify";
	import { Density } from 'vuetify/lib/composables/density.mjs';
	import { Variant } from 'vuetify/lib/composables/variant.mjs';

	import type { ShallowRef } from 'vue';

	type DateU = Date | undefined;
	type ValueType = [DateU, DateU];

	const props = defineProps<{
		density?: Density;
		variant?: Variant;
		modelValue: ValueType;
	}>();
	const defaults = useDefaults(props, 'DatetimeRangePicker');
	const emit = defineEmits(["update:modelValue"]);

	let cacheResult: ValueType = [undefined, undefined];

	const DEFAULT_START = new Date(2000, 0, 1, 0, 0);
	const DEFAULT_END = new Date(2000, 0, 1, 23, 59);

	watch(() => props.modelValue, v => {
		if(v[0]?.getTime() != cacheResult[0]?.getTime()) {
			read(v[0], startDate, useStartTime, startTime, DEFAULT_START);
		}
		if(v[1]?.getTime() != cacheResult[1]?.getTime()) {
			read(v[1], endDate, useEndTime, endTime, DEFAULT_END);
		}
	});

	function read(v: DateU, date: ShallowRef<DateU>, use: ShallowRef<boolean>, time: ShallowRef<DateU>, def: Date) {
		date.value = v;
		use.value = v ? v.getHours() != def.getHours() || v.getMinutes() != def.getMinutes() : false;
		time.value = use.value ? v : undefined;
	}

	const startDate = shallowRef<Date>();
	const endDate = shallowRef<Date>();
	const useStartTime = shallowRef(false);
	const useEndTime = shallowRef(false);
	const startTime = shallowRef<Date>();
	const endTime = shallowRef<Date>();

	watch(useStartTime, v => {
		if(!v) startTime.value = undefined;
		else if(startTime.value === undefined) startTime.value = DEFAULT_START
	});
	watch(useEndTime, v => {
		if(!v) endTime.value = undefined;
		else if(endTime.value === undefined) endTime.value = DEFAULT_END
	});

	function maxTime(): Date | undefined {
		if(startDate.value && toISO(startDate.value) === toISO(endDate.value)) return endTime.value;
		return undefined;
	}
	function minTime(): Date | undefined {
		if(startDate.value && toISO(startDate.value) === toISO(endDate.value)) return startTime.value;
		return undefined;
	}

	watch([startDate, endDate, startTime, endTime], () => {
		cacheResult = [
			combine(startDate.value, startTime.value, 0),
			combine(endDate.value, endTime.value, 59),
		];
		emit("update:modelValue", cacheResult);
	});

	function combine(d: Date | undefined, t: Date | undefined, second: number): Date | undefined {
		if(!d) return undefined;
		if(!t) t = second == 0 ? DEFAULT_START : DEFAULT_END;
		return new Date(d.getFullYear(), d.getMonth(), d.getDate(), t.getHours(), t.getMinutes(), second, second == 0 ? 0 : 999);
	}

</script>