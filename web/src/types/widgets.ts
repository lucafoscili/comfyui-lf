import { KulDataDataset } from './ketchup-lite/components';

/*-------------------------------------------------------------------*/
/*                C o m m o n   D e c l a r a t i o n s              */
/*-------------------------------------------------------------------*/

export type BaseWidgetCallback = <T extends CustomWidgetName>(
  node: NodeType,
  name: T,
) => { widget: Widget };
export type ComfyWidgetCallback = <T extends ComfyWidgetName>(
  node: NodeType,
  name: T,
) => { widget: Widget };
export type ComfyWidgetMap = {
  [ComfyWidgetName.boolean]: Widget;
  [ComfyWidgetName.float]: Widget;
  [ComfyWidgetName.integer]: Widget;
  [ComfyWidgetName.string]: Widget;
};
export enum ComfyWidgetName {
  boolean = 'BOOLEAN',
  float = 'FLOAT',
  integer = 'INTEGER',
  string = 'STRING',
}
export type CustomWidgetMap = {
  [CustomWidgetName.booleanViewer]: BooleanViewerWidget;
  [CustomWidgetName.chat]: ChatWidget;
  [CustomWidgetName.code]: CodeWidget;
  [CustomWidgetName.controlPanel]: ControlPanelWidget;
  [CustomWidgetName.histogram]: HistogramWidget;
  [CustomWidgetName.history]: HistoryWidget;
  [CustomWidgetName.imagePreview]: ImagePreviewWidget;
  [CustomWidgetName.countBarChart]: CountBarChartWidget;
  [CustomWidgetName.jsonInput]: JsonInputWidget;
  [CustomWidgetName.rollViewer]: RollViewerWidget;
  [CustomWidgetName.tree]: TreeWidget;
};
export enum CustomWidgetName {
  booleanViewer = 'KUL_BOOLEAN_VIEWER',
  chat = 'KUL_CHAT',
  code = 'KUL_CODE',
  controlPanel = 'KUL_CONTROL_PANEL',
  histogram = 'KUL_HISTOGRAM',
  imagePreview = 'KUL_IMAGE_PREVIEW_B64',
  jsonInput = 'KUL_JSON_INPUT',
  countBarChart = 'KUL_COUNT_BAR_CHART',
  history = 'KUL_HISTORY',
  rollViewer = 'KUL_ROLL_VIEWER',
  tree = 'KUL_TREE',
}
export type CustomWidgetOptions =
  | BooleanViewerWidgetOptions
  | ChatWidgetOptions
  | CodeWidgetOptions
  | ControlPanelWidgetOptions
  | HistogramWidgetOptions
  | HistoryWidgetOptions
  | ImagePreviewWidgetOptions
  | JsonInputWidgetOptions
  | CountBarChartWidgetOptions
  | RollViewerWidgetOptions
  | TreeWidgetOptions;
export interface CustomWidgetSetters {
  [CustomWidgetName.booleanViewer](
    node: NodeType,
    name: CustomWidgetName.booleanViewer,
  ): { widget: BooleanViewerWidget };
  [CustomWidgetName.chat](node: NodeType, name: CustomWidgetName.chat): { widget: ChatWidget };
  [CustomWidgetName.code](node: NodeType, name: CustomWidgetName.code): { widget: CodeWidget };
  [CustomWidgetName.controlPanel](
    node: NodeType,
    name: CustomWidgetName.controlPanel,
  ): { widget: ControlPanelWidget };
  [CustomWidgetName.histogram](
    node: NodeType,
    name: CustomWidgetName.histogram,
  ): { widget: HistogramWidget };
  [CustomWidgetName.history](
    node: NodeType,
    name: CustomWidgetName.history,
  ): { widget: HistoryWidget };
  [CustomWidgetName.imagePreview](
    node: NodeType,
    name: CustomWidgetName.imagePreview,
  ): { widget: ImagePreviewWidget };
  [CustomWidgetName.jsonInput](
    node: NodeType,
    name: CustomWidgetName.jsonInput,
  ): { widget: JsonInputWidget };
  [CustomWidgetName.countBarChart](
    node: NodeType,
    name: CustomWidgetName.countBarChart,
  ): { widget: CountBarChartWidget };
  [CustomWidgetName.rollViewer](
    node: NodeType,
    name: CustomWidgetName.rollViewer,
  ): { widget: RollViewerWidget };
  [CustomWidgetName.tree](node: NodeType, name: CustomWidgetName.tree): { widget: TreeWidget };
}

/*-------------------------------------------------------------------*/
/*       B o o l e a n  V i e w e r   D e c l a r a t i o n s        */
/*-------------------------------------------------------------------*/

export interface BooleanViewerWidget extends Widget {
  options: BooleanViewerWidgetOptions;
  type: [CustomWidgetName.booleanViewer];
}
export interface BooleanViewerWidgetOptions {
  hideOnZoom: boolean;
  getComp(): HTMLKulTextfieldElement;
  getValue(): BooleanViewerWidgetValue;
  setProps(props: Partial<HTMLKulTextfieldElement>): void;
  setValue(value: BooleanViewerWidgetValue): void;
}
export declare type BooleanViewerWidgetsSetter = () => {
  [CustomWidgetName.booleanViewer]: BaseWidgetCallback;
};
export type BooleanViewerWidgetValue = string;

/*-------------------------------------------------------------------*/
/*                 C h a t   D e c l a r a t i o n s                 */
/*-------------------------------------------------------------------*/

export interface ChatWidget extends Widget {
  options: ChatWidgetOptions;
  type: [CustomWidgetName.chat];
}
export interface ChatWidgetOptions {
  hideOnZoom: boolean;
  getComp(): HTMLKulChatElement;
  getValue(): void;
  setProps(props: Partial<HTMLKulChatElement>): void;
  setValue(history: string): void;
}
export type ChatWidgetsSetter = () => {
  [CustomWidgetName.chat]: BaseWidgetCallback;
};
export type ChatWidgetValue = string;

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
/*            H i s t o g r a m   D e c l a r a t i o n s            */
/*-------------------------------------------------------------------*/

export interface HistogramWidget extends Widget {
  options: HistogramWidgetOptions;
  type: [CustomWidgetName.histogram];
}
export interface HistogramWidgetOptions {
  hideOnZoom: boolean;
  getComp(): HTMLKulChartElement;
  getValue(): string;
  setProps(props: Partial<HTMLKulChartElement>): void;
  setValue(value: KulDataDataset | string): void;
}
export type HistogramWidgetsSetter = () => {
  [CustomWidgetName.histogram]: BaseWidgetCallback;
};
export type HistogramWidgetValue = string;

/*-------------------------------------------------------------------*/
/*              H i s t o r y   D e c l a r a t i o n s              */
/*-------------------------------------------------------------------*/

export interface HistoryWidget extends Widget {
  options: HistoryWidgetOptions;
  type: [CustomWidgetName.history];
}
export interface HistoryWidgetOptions {
  hideOnZoom: boolean;
  getComp(): HTMLKulListElement;
  getValue(): HistoryWidgetValue;
  setProps(props: Partial<HTMLKulListElement>): void;
  setValue(value: HistoryWidgetValue): void;
}
export declare type HistoryWidgetsSetter = () => {
  [CustomWidgetName.history]: BaseWidgetCallback;
};
export type HistoryWidgetValue = string | KulDataDataset;

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
  selectable: boolean;
  setValue(value: ImagePreviewWidgetValue): void;
}
export declare type ImagePreviewWidgetsSetter = () => {
  [CustomWidgetName.imagePreview]: BaseWidgetCallback;
};
export interface ImagePreviewWidgetValue {
  fileNames?: string[];
  images?: string[];
  selectedIndex: number;
  selectedName: string;
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
/*      K e y w o r d s   C o u n t   D e c l a r a t i o n s        */
/*-------------------------------------------------------------------*/

export interface CountBarChartWidget extends Widget {
  options: CountBarChartWidgetOptions;
  type: [CustomWidgetName.countBarChart];
}
export interface CountBarChartWidgetOptions {
  hideOnZoom: boolean;
  getComp(): HTMLKulChartElement;
  getValue(): string;
  setProps(props: Partial<HTMLKulChartElement>): void;
  setValue(value: KulDataDataset | string): void;
}
export type CountBarChartWidgetsSetter = () => {
  [CustomWidgetName.countBarChart]: BaseWidgetCallback;
};
export type CountBarChartWidgetValue = string;

/*-------------------------------------------------------------------*/
/*           R o l l   V i e w e r   D e c l a r a t i o n s         */
/*-------------------------------------------------------------------*/

export interface RollViewerWidget extends Widget {
  options: RollViewerWidgetOptions;
  type: [CustomWidgetName.rollViewer];
}
export interface RollViewerWidgetOptions {
  hideOnZoom: boolean;
  getComp(): HTMLKulProgressbarElement;
  getValue(): RollViewerWidgetValue;
  setProps(props: Partial<HTMLKulProgressbarElement>): void;
  setValue(value: RollViewerWidgetValue): void;
}
export declare type RollViewerWidgetsSetter = () => {
  [CustomWidgetName.rollViewer]: BaseWidgetCallback;
};
export type RollViewerWidgetValue = { bool: boolean; roll: number };

/*-------------------------------------------------------------------*/
/*                  T r e e   D e c l a r a t i o n s                */
/*-------------------------------------------------------------------*/

export interface TreeWidget extends Widget {
  options: TreeWidgetOptions;
  type: [CustomWidgetName.tree];
}
export interface TreeWidgetOptions {
  hideOnZoom: boolean;
  getComp(): HTMLKulTreeElement;
  getValue(): TreeWidgetValue;
  setProps(props: Partial<HTMLKulTreeElement>): void;
  setValue(value: TreeWidgetValue): void;
}
export declare type TreeWidgetsSetter = () => {
  [CustomWidgetName.tree]: BaseWidgetCallback;
};
export type TreeWidgetValue = string | KulDataDataset;
