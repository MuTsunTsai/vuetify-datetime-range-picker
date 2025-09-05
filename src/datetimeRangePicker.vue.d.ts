import { Density } from 'vuetify/lib/composables/density.js';
import { Variant } from 'vuetify/lib/composables/variant.js';
type __VLS_Props = {
    density?: Density;
    variant?: Variant;
    modelValue: [Date | undefined, Date | undefined];
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
