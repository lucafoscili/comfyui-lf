import { KulMessengerConfig, KulMessengerDataset } from '../ketchup-lite/components';
import { BaseWidgetCallback, BaseWidgetFactory, BaseWidgetOptions, CustomWidgetName } from '../widgets';
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
