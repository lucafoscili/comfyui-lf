import { KulMessengerConfig, KulMessengerDataset } from '../ketchup-lite/components';
import { BaseWidgetCallback, BaseWidgetFactory, BaseWidgetOptions, CustomWidgetName } from './_common';
export interface Messenger extends Widget {
    options: MessengerOptions;
    type: [CustomWidgetName.messenger];
}
export interface MessengerFactory extends BaseWidgetFactory<MessengerOptions> {
    options: MessengerOptionsCallback;
}
export type MessengerOptionsCallback = (messenger: HTMLKulMessengerElement, placeholder: HTMLDivElement) => MessengerOptions;
export interface MessengerOptions extends BaseWidgetOptions<MessengerDeserializedValue> {
    getComp(): HTMLKulMessengerElement;
}
export type MessengerSetter = () => {
    [CustomWidgetName.messenger]: BaseWidgetCallback<CustomWidgetName.messenger>;
};
export type MessengerDeserializedValue = {
    dataset: KulMessengerDataset;
    config: KulMessengerConfig;
};
export declare enum MessengerCSS {
    Content = "lf-messenger",
    Widget = "lf-messenger__widget",
    Placeholder = "lf-messenger__placeholder",
    PlaceholderHidden = "lf-messenger__placeholder--hidden"
}
