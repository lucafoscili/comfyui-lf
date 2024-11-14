import { KulButtonEventPayload, KulImageviewerEventPayload } from '../types/ketchup-lite/components';
import { KulDataColumn, KulDataDataset, KulDataNode } from '../types/ketchup-lite/managers/kul-data/kul-data-declarations';
import { ImageEditorWidgetActionButtons } from '../types/widgets';
export declare enum ColumnId {
    Path = "path",
    Status = "status"
}
export declare enum Status {
    Completed = "completed",
    Pending = "pending"
}
export declare const INTERRUPT_ICON = "stop";
export declare const RESUME_ICON = "play";
export declare const buttonEventHandler: (imageviewer: HTMLKulImageviewerElement, actionButtons: ImageEditorWidgetActionButtons, grid: HTMLDivElement, e: CustomEvent<KulButtonEventPayload>) => Promise<void>;
export declare const imageviewerEventHandler: (settings: HTMLDivElement, node: NodeType, e: CustomEvent<KulImageviewerEventPayload>) => Promise<void>;
export declare const prepSettings: (settings: HTMLDivElement, node: KulDataNode, imageviewer: HTMLKulImageviewerElement) => void;
export declare const createSliderControl: (sliderData: {
    [key: string]: string;
}) => HTMLDivElement;
export declare const getPathColumn: (dataset: KulDataDataset) => KulDataColumn;
export declare const getStatusColumn: (dataset: KulDataDataset) => KulDataColumn;
export declare const setGridStatus: (status: Status, grid: HTMLDivElement, actionButtons: ImageEditorWidgetActionButtons) => void;
