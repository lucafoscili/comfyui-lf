import { KulMessengerConfig, KulMessengerDataset } from '../../types/ketchup-lite/components';
import { BaseWidgetState, CustomWidgetName, NormalizeValueCallback, WidgetFactory } from './widgets';
export declare enum MessengerCSS {
    Content = "lf-messenger",
    Widget = "lf-messenger__widget",
    Placeholder = "lf-messenger__placeholder",
    PlaceholderHidden = "lf-messenger__placeholder--hidden"
}
export type Messenger = Widget<CustomWidgetName.messenger>;
export type MessengerFactory = WidgetFactory<MessengerDeserializedValue, MessengerState>;
export type MessengerNormalizeCallback = NormalizeValueCallback<MessengerDeserializedValue | string>;
export type MessengerDeserializedValue = {
    dataset: KulMessengerDataset;
    config: KulMessengerConfig;
};
export interface MessengerState extends BaseWidgetState {
    config: KulMessengerConfig;
    elements: {
        messenger: HTMLKulMessengerElement;
        placeholder: HTMLDivElement;
    };
}
