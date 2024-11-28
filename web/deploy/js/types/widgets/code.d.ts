import { BaseWidgetState, CustomWidgetName, NormalizeValueCallback, WidgetFactory } from './widgets';
export declare enum CodeCSS {
    Content = "lf-code",
    Widget = "lf-code__widget"
}
export type Code = Widget<CustomWidgetName.code>;
export type CodeFactory = WidgetFactory<CodeDeserializedValue, CodeState>;
export type CodeNormalizeCallback = NormalizeValueCallback<CodeDeserializedValue | string>;
export type CodeDeserializedValue = string;
export interface CodeState extends BaseWidgetState {
    code: HTMLKulCodeElement;
}
