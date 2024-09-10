import { CustomWidgetName, ImagePreviewWidgetOptions } from '../types/widgets';
export declare const imagePreviewFactory: {
    cssClasses: {
        content: string;
        doge: string;
        grid: string;
        gridWaterfall: string;
        gridCell: string;
        gridCellSelectable: string;
        gridCellSelected: string;
        image: string;
        switchView: string;
    };
    options: (domWidget: HTMLDivElement, isSelectable: boolean) => ImagePreviewWidgetOptions;
    render: (node: NodeType, name: CustomWidgetName) => {
        widget: Widget;
    };
};
