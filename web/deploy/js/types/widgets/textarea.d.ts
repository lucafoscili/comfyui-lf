import { BaseWidgetState, CustomWidgetName, NormalizeValueCallback, WidgetFactory } from './widgets';
export declare enum TextareaCSS {
    Content = "lf-textarea",
    Widget = "lf-textarea__widget",
    WidgetError = "lf-textarea__widget--error"
}
export type Textarea = Widget<CustomWidgetName.textarea>;
export type TextareaFactory = WidgetFactory<TextareaDeserializedValue, TextareaState>;
export type TextareaNormalizeCallback = NormalizeValueCallback<TextareaDeserializedValue | string>;
export type TextareaDeserializedValue = Record<string, unknown> | Array<Record<string, unknown>>;
export interface TextareaState extends BaseWidgetState {
    textarea: HTMLTextAreaElement;
}
