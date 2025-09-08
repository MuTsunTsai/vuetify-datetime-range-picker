<template>
	<v-defaults-provider :defaults="{
		global: {
			density: defaults.density,
			variant: defaults.variant,
		},
	}">
		<v-row align="baseline">
			<v-col>
				<date-input :rules="dateRules" :validate-on="validateOn" :label="hideLabel ? undefined : '起日'" v-model="startDate"
							:max="endDate" :disabled="disabled" />
			</v-col>
			<v-col cols="auto" class="mr-n5 mr-sm-0" v-if="!timeRequired">
				<v-checkbox v-model="useStartTimeRaw" hide-details="auto" :disabled="disabled">
					<template #label>
						<span class="d-none d-sm-inline">自訂時間</span>
					</template>
				</v-checkbox>
			</v-col>
			<v-col>
				<time-input :rules="useStartTime ? timeRules : undefined" :validate-on="validateOn"
							:label="hideLabel ? undefined : '起時'" v-model="startTime" :max="maxTime()"
							:disabled="disabled || !useStartTime" suffix=":00" :offset="offset" />
			</v-col>
		</v-row>
		<v-row>
			<v-col>
				<date-input :rules="dateRules" :validate-on="validateOn" :label="hideLabel ? undefined : '迄日'" v-model="endDate"
							:min="startDate" :disabled="disabled" />
			</v-col>
			<v-col cols="auto" class="mr-n5 mr-sm-0" v-if="!timeRequired">
				<v-checkbox label="" v-model="useEndTimeRaw" hide-details="auto" :disabled="disabled">
					<template #label>
						<span class="d-none d-sm-inline">自訂時間</span>
					</template>
				</v-checkbox>
			</v-col>
			<v-col>
				<time-input :rules="useEndTime ? timeRules : undefined" :validate-on="validateOn"
							:label="hideLabel ? undefined : '迄時'" v-model="endTime" :min="minTime()"
							:disabled="disabled || !useEndTime" suffix=":59" :offset="offset" />
			</v-col>
		</v-row>
	</v-defaults-provider>
</template>

<script setup lang="ts">
	import DateInput, { toISO } from './dateInput.vue';
	import timeInput from './timeInput.vue';

	import { computed, shallowRef, watch } from 'vue';
	import { useDefaults } from "vuetify";
	import { Density } from 'vuetify/lib/composables/density.mjs';
	import { Variant } from 'vuetify/lib/composables/variant.mjs';

	import type { RuleSetting, ValidateSetting } from "./dateInput.vue";
	import type { ShallowRef } from 'vue';

	type DateU = Date | undefined;
	type ValueType = [DateU, DateU];

	const props = defineProps<{
		density?: Density;
		variant?: Variant;
		offset?: string;
		hideLabel?: boolean;
		timeRequired?: boolean;
		dateRules?: RuleSetting;
		timeRules?: RuleSetting;
		validateOn?: ValidateSetting;
		disabled?: boolean;
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
	const useStartTimeRaw = shallowRef(false);
	const useEndTimeRaw = shallowRef(false);
	const startTime = shallowRef<Date>();
	const endTime = shallowRef<Date>();

	const useStartTime = computed(() => useStartTimeRaw.value || props.timeRequired);
	const useEndTime = computed(() => useEndTimeRaw.value || props.timeRequired);

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