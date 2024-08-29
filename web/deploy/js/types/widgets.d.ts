export type BaseWidgetCallback = (node: NodeType, name: string) => {
    widget: Widget;
};
export interface CustomWidgets {
    KUL_CHART(node: NodeType, name: string): {
        widget: Widget;
    };
    KUL_CODE(node: NodeType, name: string): {
        widget: Widget;
    };
    KUL_CONTROL_PANEL(node: NodeType, name: string): {
        widget: Widget;
    };
    IMAGE_PREVIEW_B64(node: NodeType, name: string): {
        widget: Widget;
    };
}
export type CustomWidgetNames = 'KUL_CHART' | 'KUL_CODE' | 'KUL_CONTROL_PANEL' | 'IMAGE_PREVIEW_B64';
export type CustomWidgetOptions = ChartWidgetOptions | CodeWidgetOptions | ControlPanelWidgetOptions | ImagePreviewWidgetOptions;
export interface ChartWidgetOptions {
    hideOnZoom: boolean;
    getComp(): HTMLKulChartElement;
    getValue(): string;
    setProps(props: Partial<HTMLKulChartElement>): void;
    setValue(value: Record<string, unknown> | string): void;
}
export type ChartWidgetsSetter = () => {
    KUL_CHART: BaseWidgetCallback;
};
export type ChartWidgetValue = string;
export interface CodeWidgetOptions {
    hideOnZoom: boolean;
    getComp(): HTMLKulCodeElement;
    getValue(): string;
    setProps(props: Partial<HTMLKulCodeElement>): void;
    setValue(value: Record<string, unknown> | string): void;
}
export type CodeWidgetsSetter = () => {
    KUL_CODE: BaseWidgetCallback;
};
export type CodeWidgetValue = string;
export interface ControlPanelWidgetOptions {
    getValue(): ControlPanelWidgetValue;
    setValue(value: ControlPanelWidgetValue): void;
}
export type ControlPanelWidgetsSetter = () => {
    KUL_CONTROL_PANEL: BaseWidgetCallback;
};
export interface ControlPanelWidgetValue {
    debug: boolean;
    themes: string;
}
export interface ImagePreviewWidgetOptions {
    hideOnZoom: boolean;
    getValue(): ImagePreviewWidgetValue;
    setValue(value: ImagePreviewWidgetValue): void;
}
export declare type ImagePreviewWidgetsSetter = () => {
    IMAGE_PREVIEW_B64: BaseWidgetCallback;
};
export interface ImagePreviewWidgetValue {
    fileNames: string[];
    images: string[];
}
