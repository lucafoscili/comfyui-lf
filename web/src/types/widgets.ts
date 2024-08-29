/*-------------------------------------------------------------------*/
/*                C o m m o n   D e c l a r a t i o n s              */
/*-------------------------------------------------------------------*/

import { KulDataDataset } from './ketchup-lite/components';

export type BaseWidgetCallback = <T extends CustomWidgetName>(
  node: NodeType,
  name: T,
) => { widget: Widget };
export enum CustomWidgetName {
  chart = 'KUL_CHART',
  code = 'KUL_CODE',
  controlPanel = 'KUL_CONTROL_PANEL',
  jsonInput = 'KUL_JSON_INPUT',
  imagePreview = 'IMAGE_PREVIEW_B64',
  textfield = 'KUL_TEXTFIELD',
}
export interface CustomWidgetSetters {
  [CustomWidgetName.chart](node: NodeType, name: string): { widget: ChartWidget };
  [CustomWidgetName.code](node: NodeType, name: string): { widget: CodeWidget };
  [CustomWidgetName.controlPanel](node: NodeType, name: string): { widget: ControlPanelWidget };
  [CustomWidgetName.jsonInput](node: NodeType, name: string): { widget: JsonInputWidget };
  [CustomWidgetName.imagePreview](node: NodeType, name: string): { widget: ImagePreviewWidget };
  [CustomWidgetName.textfield](node: NodeType, name: string): { widget: TextfieldWidget };
}
export type CustomWidgetMap = {
  [CustomWidgetName.chart]: ChartWidget;
  [CustomWidgetName.code]: CodeWidget;
  [CustomWidgetName.controlPanel]: ControlPanelWidget;
  [CustomWidgetName.jsonInput]: JsonInputWidget;
  [CustomWidgetName.imagePreview]: ImagePreviewWidget;
  [CustomWidgetName.textfield]: TextfieldWidget;
};
export type CustomWidgetOptions =
  | ChartWidgetOptions
  | CodeWidgetOptions
  | ControlPanelWidgetOptions
  | JsonInputWidgetOptions
  | ImagePreviewWidgetOptions
  | TextfieldWidgetOptions;

/*-------------------------------------------------------------------*/
/*                C h a r t   D e c l a r a t i o n s                */
/*-------------------------------------------------------------------*/

export interface ChartWidget extends Widget {
  options: ChartWidgetOptions;
  type: [CustomWidgetName.chart];
}
export interface ChartWidgetOptions {
  hideOnZoom: boolean;
  getComp(): HTMLKulChartElement;
  getValue(): string;
  setProps(props: Partial<HTMLKulChartElement>): void;
  setValue(value: KulDataDataset | string): void;
}
export type ChartWidgetsSetter = () => {
  [CustomWidgetName.chart]: BaseWidgetCallback;
};
export type ChartWidgetValue = string;

/*-------------------------------------------------------------------*/
/*                 C o d e   D e c l a r a t i o n s                 */
/*-------------------------------------------------------------------*/

export interface CodeWidget extends Widget {
  options: CodeWidgetOptions;
  type: [CustomWidgetName.code];
}
export interface CodeWidgetOptions {
  hideOnZoom: boolean;
  getComp(): HTMLKulCodeElement;
  getValue(): string;
  setProps(props: Partial<HTMLKulCodeElement>): void;
  setValue(value: Record<string, unknown> | string): void;
}
export type CodeWidgetsSetter = () => {
  [CustomWidgetName.code]: BaseWidgetCallback;
};
export type CodeWidgetValue = string;

/*-------------------------------------------------------------------*/
/*       C o n t r o l   P a n e l   D e c l a r a t i o n s         */
/*-------------------------------------------------------------------*/

export interface ControlPanelWidget extends Widget {
  options: ControlPanelWidgetOptions;
  type: [CustomWidgetName.controlPanel];
}
export interface ControlPanelWidgetOptions {
  getValue(): ControlPanelWidgetValue;
  setValue(value: ControlPanelWidgetValue): void;
}
export type ControlPanelWidgetsSetter = () => {
  [CustomWidgetName.controlPanel]: BaseWidgetCallback;
};
export interface ControlPanelWidgetValue {
  debug: boolean;
  themes: string;
}

/*-------------------------------------------------------------------*/
/*           J s o n   I n p u t   D e c l a r a t i o n s           */
/*-------------------------------------------------------------------*/

export interface JsonInputWidget extends Widget {
  options: JsonInputWidgetOptions;
  type: [CustomWidgetName.jsonInput];
}
export interface JsonInputWidgetOptions {
  hideOnZoom: boolean;
  getValue(): JsonInputWidgetValue;
  setValue(value: JsonInputWidgetValue): void;
}
export declare type JsonInputWidgetsSetter = () => {
  [CustomWidgetName.jsonInput]: BaseWidgetCallback;
};
export type JsonInputWidgetValue = string | Record<string, unknown>;

/*-------------------------------------------------------------------*/
/*        I m a g e   P r e v i e w   D e c l a r a t i o n s        */
/*-------------------------------------------------------------------*/

export interface ImagePreviewWidget extends Widget {
  options: ImagePreviewWidgetOptions;
  type: [CustomWidgetName.imagePreview];
}
export interface ImagePreviewWidgetOptions {
  hideOnZoom: boolean;
  getValue(): ImagePreviewWidgetValue;
  setValue(value: ImagePreviewWidgetValue): void;
}
export declare type ImagePreviewWidgetsSetter = () => {
  [CustomWidgetName.imagePreview]: BaseWidgetCallback;
};
export interface ImagePreviewWidgetValue {
  fileNames: string[];
  images: string[];
}

/*-------------------------------------------------------------------*/
/*            T e x t f i e l d   D e c l a r a t i o n s            */
/*-------------------------------------------------------------------*/

export interface TextfieldWidget extends Widget {
  options: TextfieldWidgetOptions;
  type: [CustomWidgetName.textfield];
}
export interface TextfieldWidgetOptions {
  hideOnZoom: boolean;
  getComp(): HTMLKulTextfieldElement;
  getValue(): TextfieldWidgetValue;
  setProps(props: Partial<HTMLKulTextfieldElement>): void;
  setValue(value: TextfieldWidgetValue): void;
}
export declare type TextfieldWidgetsSetter = () => {
  [CustomWidgetName.textfield]: BaseWidgetCallback;
};
export type TextfieldWidgetValue = string;
