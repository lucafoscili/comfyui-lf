import { KulDataDataset } from './ketchup-lite/components';
import { NodeName } from './nodes';
import { CustomWidgetName } from './widgets';

// #region Common declarations
export interface BaseEventPayload {
  id: string;
}
export type EventCallback<T extends EventPayload<CustomWidgetName>> = (e: CustomEvent<T>) => void;
type ToKebabCase<S extends string> = S extends `${infer First}${infer Rest}`
  ? `${Lowercase<First>}${Rest extends Capitalize<Rest> ? '-' : ''}${ToKebabCase<Rest>}`
  : S;
export type KebabCaseNodeName<N extends NodeName> = N extends `LF_${infer Name}`
  ? `lf-${ToKebabCase<Name>}`
  : never;
export type EventName = {
  [N in NodeName]: KebabCaseNodeName<N>;
}[NodeName];
export type EventPayload<W extends CustomWidgetName> = WidgetPayloadMap[W];
export type WidgetPayloadFor<T extends CustomWidgetName> = WidgetPayloadMap[T];
export type WidgetPayloadMap = {
  [W in CustomWidgetName]: W extends CustomWidgetName.card
    ? CardPayload
    : W extends CustomWidgetName.cardsWithChip
    ? CardPayload
    : W extends CustomWidgetName.code
    ? StringPayload
    : W extends CustomWidgetName.compare
    ? SingleDatasetPayload
    : W extends CustomWidgetName.countBarChart
    ? MultiDatasetPayload
    : W extends CustomWidgetName.history
    ? SingleDatasetPayload
    : W extends CustomWidgetName.masonry
    ? MasonryPayload
    : W extends CustomWidgetName.progressbar
    ? ProgressbarPayload
    : W extends CustomWidgetName.tabBarChart
    ? MultiDatasetPayload
    : W extends CustomWidgetName.tree
    ? SingleDatasetPayload
    : W extends CustomWidgetName.upload
    ? StringPayload
    : BaseEventPayload;
};
// #endregion
// #region Card payload
export interface CardPayload extends BaseEventPayload {
  datasets: KulDataDataset[];
  apiFlags: boolean[];
  hashes: string[];
  paths: string[];
  chip?: KulDataDataset;
}
// #endregion
// #region Masonry payload
export interface MasonryPayload extends SingleDatasetPayload {
  index: number;
  name: string;
}
// #endregion
// #region Multi dataset payload
export interface MultiDatasetPayload extends BaseEventPayload {
  datasets: { [index: string]: KulDataDataset };
}
// #endregion
// #region Notify payload
export interface NotifyPayload extends BaseEventPayload {
  action: 'none' | 'focus tab' | 'interrupt' | 'interrupt and queue' | 'queue prompt';
  image: string;
  message: string;
  silent: boolean;
  tag: string;
  title: string;
}
// #endregion
// #region Progressbar payload
export interface ProgressbarPayload extends BaseEventPayload {
  bool: boolean;
  roll?: number;
}
// #endregion
// #region Dataset payload
export interface SingleDatasetPayload extends BaseEventPayload {
  dataset: KulDataDataset;
}
// #endregion
// #region String payload
export interface StringPayload extends BaseEventPayload {
  value: string;
}
// #endregion
