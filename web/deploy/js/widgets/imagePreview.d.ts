import { CustomWidgetName, ImagePreviewWidgetOptions } from '../types/widgets';
export declare const imagePreviewFactory: {
    cssClasses: {
        content: string;
        doge: string;
        grid: string;
        gridCell: string;
        gridCellSelectable: string;
        gridCellSelected: string;
        image: string;
    };
    options: (domWidget: HTMLDivElement, isSelectable: boolean) => ImagePreviewWidgetOptions;
    render: (node: NodeType, name: CustomWidgetName) => {
        widget: Widget;
    };
};
