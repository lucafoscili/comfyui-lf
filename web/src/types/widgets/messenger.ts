import { KulMessengerConfig, KulMessengerDataset } from '../ketchup-lite/components';
import {
  BaseWidgetState,
  CustomWidgetName,
  NormalizeValueCallback,
  WidgetFactory,
} from './_common';

//#region CSS
const BASE_CSS_CLASS = 'lf-messenger';
export enum MessengerCSS {
  Content = BASE_CSS_CLASS,
  Widget = `${BASE_CSS_CLASS}__widget`,
  Placeholder = `${BASE_CSS_CLASS}__placeholder`,
  PlaceholderHidden = `${BASE_CSS_CLASS}__placeholder--hidden`,
}
//#endregion
//#region Widget
export type Messenger = Widget<CustomWidgetName.messenger>;
export type MessengerFactory = WidgetFactory<MessengerDeserializedValue, MessengerState>;
export type MessengerNormalizeCallback = NormalizeValueCallback<
  MessengerDeserializedValue | string
>;
//#endregion
//#region Value
export type MessengerDeserializedValue = {
  dataset: KulMessengerDataset;
  config: KulMessengerConfig;
};
//#endregion
//#region State
export interface MessengerState extends BaseWidgetState {
  config: KulMessengerConfig;
  elements: {
    messenger: HTMLKulMessengerElement;
    placeholder: HTMLDivElement;
  };
}
//#endregion
