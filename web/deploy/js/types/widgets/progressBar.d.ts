import { BaseWidgetState, CustomWidgetName, NormalizeValueCallback, WidgetFactory } from './widgets';
export declare enum ProgressbarCSS {
    Content = "lf-progressbar"
}
export type Progressbar = Widget<CustomWidgetName.progressbar>;
export type ProgressbarFactory = WidgetFactory<ProgressbarDeserializedValue, ProgressbarState>;
export type ProgressbarNormalizeCallback = NormalizeValueCallback<ProgressbarDeserializedValue | string>;
export type ProgressbarDeserializedValue = {
    bool: boolean;
    roll: number;
};
export interface ProgressbarState extends BaseWidgetState {
    progressbar: HTMLKulProgressbarElement;
}
export declare enum ProgressbarIcons {
    Landscape = "landscape",
    Portrait = "portrait"
}
export declare enum ProgressbarLabels {
    Fallback = "N/A",
    False = "false",
    True = "true"
}
