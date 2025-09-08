import { Density } from 'vuetify/lib/composables/density.js';
import { Variant } from 'vuetify/lib/composables/variant.js';
import type { RuleSetting, ValidateSetting } from "./dateInput.vue";
type DateU = Date | undefined;
type ValueType = [DateU, DateU];
type __VLS_Props = {
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
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
