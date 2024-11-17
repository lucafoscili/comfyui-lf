import { KulButtonEventPayload, KulImageviewerEventPayload, KulSliderEventPayload, KulTextfieldEventPayload, KulToggleEventPayload } from '../types/ketchup-lite/components';
import { KulDataColumn, KulDataDataset, KulDataNode } from '../types/ketchup-lite/managers/kul-data/kul-data-declarations';
import { ImageEditorWidgetActionButtons, ImageEditorWidgetSliderConfig, ImageEditorWidgetStatus, ImageEditorWidgetTextfieldConfig, ImageEditorWidgetToggleConfig, ImageEditorWidgetUpdateCallback } from '../types/widgets';
export declare const buttonEventHandler: (imageviewer: HTMLKulImageviewerElement, actionButtons: ImageEditorWidgetActionButtons, grid: HTMLDivElement, e: CustomEvent<KulButtonEventPayload>) => Promise<void>;
export declare const imageviewerEventHandler: (settings: HTMLDivElement, node: NodeType, e: CustomEvent<KulImageviewerEventPayload>) => Promise<void>;
export declare const sliderEventHandler: (updateCb: ImageEditorWidgetUpdateCallback, e: CustomEvent<KulSliderEventPayload>) => Promise<void>;
export declare const textfieldEventHandler: (updateCb: ImageEditorWidgetUpdateCallback, e: CustomEvent<KulTextfieldEventPayload>) => Promise<void>;
export declare const toggleEventHandler: (updateCb: ImageEditorWidgetUpdateCallback, e: CustomEvent<KulToggleEventPayload>) => Promise<void>;
export declare const prepSettings: (settings: HTMLDivElement, node: KulDataNode, imageviewer: HTMLKulImageviewerElement) => void;
export declare const createSlider: (data: ImageEditorWidgetSliderConfig, updateCb: ImageEditorWidgetUpdateCallback) => HTMLKulSliderElement;
export declare const createTextfield: (data: ImageEditorWidgetTextfieldConfig, updateCb: ImageEditorWidgetUpdateCallback) => HTMLKulTextfieldElement;
export declare const createToggle: (data: ImageEditorWidgetToggleConfig, updateCb: ImageEditorWidgetUpdateCallback) => HTMLKulToggleElement;
export declare const getPathColumn: (dataset: KulDataDataset) => KulDataColumn | null;
export declare const getStatusColumn: (dataset: KulDataDataset) => KulDataColumn | null;
export declare const resetSettings: (settings: HTMLElement) => Promise<void>;
export declare const setGridStatus: (status: ImageEditorWidgetStatus, grid: HTMLDivElement, actionButtons: ImageEditorWidgetActionButtons) => void;
