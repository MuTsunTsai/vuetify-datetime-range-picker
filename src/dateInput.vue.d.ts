export declare function toISO(d: Date): string;
export declare function toISO(d: undefined): undefined;
export declare function toISO(d: Date | undefined): string | undefined;
declare const _default: import("vue").DefineComponent<{
    label?: string;
    min?: Date;
    max?: Date;
    modelValue?: Date;
}, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<{
    label?: string;
    min?: Date;
    max?: Date;
    modelValue?: Date;
}> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
