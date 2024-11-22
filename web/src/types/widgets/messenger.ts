import { KulMessengerConfig, KulMessengerDataset } from '../ketchup-lite/components';
import {
  BaseWidgetCallback,
  BaseWidgetFactory,
  BaseWidgetOptions,
  CustomWidgetName,
} from './_common';

const BASE_CSS_CLASS = 'lf-messenger';

//#region Messenger
export interface Messenger extends Widget {
  options: MessengerOptions;
  type: [CustomWidgetName.messenger];
}
export interface MessengerFactory extends BaseWidgetFactory<MessengerOptions> {
  options: MessengerOptionsCallback;
}
export type MessengerOptionsCallback = (
  messenger: HTMLKulMessengerElement,
  placeholder: HTMLDivElement,
) => MessengerOptions;
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
export enum MessengerCSS {
  Content = BASE_CSS_CLASS,
  Widget = `${BASE_CSS_CLASS}__widget`,
  Placeholder = `${BASE_CSS_CLASS}__placeholder`,
  PlaceholderHidden = `${BASE_CSS_CLASS}__placeholder--hidden`,
}
//#endregion
