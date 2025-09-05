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

	import { onMounted, shallowRef, watch } from 'vue';
	import { useDefaults } from "vuetify";
	import { Density } from 'vuetify/lib/composables/density.mjs';
	import { Variant } from 'vuetify/lib/composables/variant.mjs';

	const props = defineProps<{
		density?: Density;
		variant?: Variant;
		modelValue: [Date | undefined, Date | undefined]
	}>();
	const defaults = useDefaults(props, 'DatetimeRangePicker');
	const emit = defineEmits(["update:modelValue"]);

	onMounted(() => {
		const v = props.modelValue;
		if(v[0]) {
			startDate.value = v[0];
			useStartTime.value = v[0].getHours() != 0 || v[0].getMinutes() != 0;
			if(useStartTime.value) startTime.value = v[0];
		}
		if(v[1]) {
			endDate.value = v[1];
			useEndTime.value = v[1].getHours() != 23 || v[1].getMinutes() != 59;
			if(useEndTime.value) endTime.value = v[1];
		}
	});

	const startDate = shallowRef<Date>();
	const endDate = shallowRef<Date>();
	const useStartTime = shallowRef(false);
	const useEndTime = shallowRef(false);
	const startTime = shallowRef<Date>();
	const endTime = shallowRef<Date>();

	watch(useStartTime, v => {
		if(!v) startTime.value = undefined;
		else if(startTime.value === undefined) startTime.value = new Date(2000, 0, 1, 0, 0);
	});
	watch(useEndTime, v => {
		if(!v) endTime.value = undefined;
		else if(endTime.value === undefined) endTime.value = new Date(2000, 0, 1, 23, 59);
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
		emit("update:modelValue", [
			combine(startDate.value, startTime.value, 0),
			combine(endDate.value, endTime.value, 59),
		]);
	});

	function combine(d: Date | undefined, t: Date | undefined, second: number): Date | undefined {
		if(!d) return undefined;
		if(!t) t = second == 0 ? new Date(2000, 0, 1, 0, 0) : new Date(2000, 0, 1, 23, 59);
		return new Date(d.getFullYear(), d.getMonth(), d.getDate(), t.getHours(), t.getMinutes(), second, second == 0 ? 0 : 999);
	}

</script>