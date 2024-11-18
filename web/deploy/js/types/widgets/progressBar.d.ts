import { BaseWidgetCallback, BaseWidgetFactory, BaseWidgetOptions, CustomWidgetName } from '../widgets';
export interface Progressbar extends Widget {
    options: ProgressbarOptions;
    type: [CustomWidgetName.progressbar];
}
export interface ProgressbarFactory extends BaseWidgetFactory<ProgressbarOptions> {
    options: ProgressbarOptionsCallback;
}
export type ProgressbarOptionsCallback = (progressbar: HTMLKulProgressbarElement, nodeType: NodeType) => ProgressbarOptions;
export interface ProgressbarOptions extends BaseWidgetOptions<ProgressbarDeserializedValue> {
    getComp(): HTMLKulProgressbarElement;
}
export type ProgressbarSetter = () => {
    [CustomWidgetName.progressbar]: BaseWidgetCallback<CustomWidgetName.progressbar>;
};
export type ProgressbarDeserializedValue = {
    bool: boolean;
    roll: number;
};
