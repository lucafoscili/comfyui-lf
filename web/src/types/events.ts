import { KulDataDataset } from './ketchup-lite/components';
import { NodeName } from './nodes';
import { CustomWidgetName } from './widgets';

/*-------------------------------------------------------------------*/
/*               C o m m o n   D e c l a r a t i o n s               */
/*-------------------------------------------------------------------*/

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
    : W extends CustomWidgetName.chip
    ? SingleDatasetPayload
    : W extends CustomWidgetName.code
    ? CodePayload
    : W extends CustomWidgetName.compare
    ? SingleDatasetPayload
    : W extends CustomWidgetName.controlPanel
    ? BaseEventPayload
    : W extends CustomWidgetName.countBarChart
    ? SingleDatasetPayload
    : W extends CustomWidgetName.history
    ? SingleDatasetPayload
    : W extends CustomWidgetName.textarea
    ? SingleDatasetPayload
    : W extends CustomWidgetName.masonry
    ? MasonryPayload
    : W extends CustomWidgetName.messenger
    ? SingleDatasetPayload
    : W extends CustomWidgetName.progressbar
    ? ProgressbarPayload
    : W extends CustomWidgetName.tabBarChart
    ? MultiDatasetPayload
    : W extends CustomWidgetName.tree
    ? SingleDatasetPayload
    : W extends CustomWidgetName.upload
    ? BaseEventPayload
    : never;
};

/*-------------------------------------------------------------------*/
/*            B o o l e a n   V i e w e r   P a y l o a d            */
/*-------------------------------------------------------------------*/

export interface ProgressbarPayload extends BaseEventPayload {
  bool: boolean;
  roll?: number;
}

/*-------------------------------------------------------------------*/
/*                     C a r d   P a y l o a d                       */
/*-------------------------------------------------------------------*/

export interface CardPayload extends BaseEventPayload {
  datasets: KulDataDataset[];
  apiFlags: boolean[];
  hashes: string[];
  paths: string[];
  chip?: KulDataDataset;
}

/*-------------------------------------------------------------------*/
/*                     C o d e   P a y l o a d                       */
/*-------------------------------------------------------------------*/

export interface CodePayload extends BaseEventPayload {
  value: string;
}

/*-------------------------------------------------------------------*/
/*       M a s o n r y   I m a g e s   D e c l a r a t i o n s       */
/*-------------------------------------------------------------------*/

export interface MasonryPayload extends SingleDatasetPayload {
  index: number;
  name: string;
}

/*-------------------------------------------------------------------*/
/*             M u l t i   D a t a s e t   P a y l o a d             */
/*-------------------------------------------------------------------*/

export interface MultiDatasetPayload extends BaseEventPayload {
  datasets: { [index: string]: KulDataDataset };
}

/*-------------------------------------------------------------------*/
/*              N o t i f y   D e c l a r a t i o n s                */
/*-------------------------------------------------------------------*/

export interface NotifyPayload extends BaseEventPayload {
  action: 'none' | 'focus tab' | 'interrupt' | 'interrupt and queue' | 'queue prompt';
  image: string;
  message: string;
  silent: boolean;
  tag: string;
  title: string;
}

/*-------------------------------------------------------------------*/
/*            S i n g l e   D a t a s e t   P a y l o a d            */
/*-------------------------------------------------------------------*/

export interface SingleDatasetPayload extends BaseEventPayload {
  dataset: KulDataDataset;
}
