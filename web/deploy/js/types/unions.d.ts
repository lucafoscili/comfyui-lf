declare type EventNames = 'lf-controlpanel' | 'lf-displayjson' | 'lf-imagehistogram' | 'lf-loadimages' | 'lf-switchimage' | 'lf-switchinteger' | 'lf-switchjson' | 'lf-switchstring';
declare type EventPayload = DisplayJSONPayload | ImageHistogramPayload | LoadImagesPayload | SwitchImagePayload | SwitchIntegerPayload | SwitchJSONPayload | SwitchStringPayload;
declare type NodeNames = 'LF_ControlPanel' | 'LF_DisplayJSON' | 'LF_ImageHistogram' | 'LF_LoadImages' | 'LF_SwitchImage' | 'LF_SwitchInteger' | 'LF_SwitchJSON' | 'LF_SwitchString';
declare interface CustomWidgets {
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
declare type CustomWidgetNames = 'KUL_CHART' | 'KUL_CODE' | 'KUL_CONTROL_PANEL' | 'IMAGE_PREVIEW_B64';
declare type CustomWidgetOptions = ChartWidgetOptions | CodeWidgetOptions | ControlPanelWidgetOptions;
