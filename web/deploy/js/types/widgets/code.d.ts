import { BaseWidgetCallback, BaseWidgetFactory, BaseWidgetOptions, CustomWidgetName } from './_common';
export interface Code extends Widget {
    options: CodeOptions;
    type: [CustomWidgetName.code];
}
export interface CodeFactory extends BaseWidgetFactory<CodeOptions> {
    options: CodeOptionsCallback;
}
export type CodeOptionsCallback = (code: HTMLKulCodeElement) => CodeOptions;
export interface CodeOptions extends BaseWidgetOptions<CodeValueDeserializedValue> {
    getComp(): HTMLKulCodeElement;
}
export type CodeSetter = () => {
    [CustomWidgetName.code]: BaseWidgetCallback<CustomWidgetName.code>;
};
export type CodeValueDeserializedValue = string;
