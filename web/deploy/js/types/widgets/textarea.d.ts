import { BaseWidgetCallback, BaseWidgetFactory, BaseWidgetOptions, CustomWidgetName } from './_common';
export interface Textarea extends Widget {
    options: TextareaOptions;
    type: [CustomWidgetName.textarea];
}
export interface TextareaFactory extends BaseWidgetFactory<TextareaOptions> {
    options: TextareaOptionsCallback;
}
export type TextareaOptionsCallback = (textarea: HTMLTextAreaElement) => TextareaOptions;
export interface TextareaOptions extends BaseWidgetOptions<TextareaDeserializedValue> {
}
export type TextareaSetter = () => {
    [CustomWidgetName.textarea]: BaseWidgetCallback<CustomWidgetName.textarea>;
};
export type TextareaDeserializedValue = Record<string, unknown>;
export declare enum TextareaCSS {
    Content = "lf-textarea",
    Widget = "lf-textarea__widget",
    WidgetError = "lf-textarea__widget--error"
}
