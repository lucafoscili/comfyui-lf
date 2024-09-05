import { CustomWidgetName, type ImagePreviewWidgetValue } from '../types/widgets';
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
    options: (domWidget: HTMLDivElement, isSelectable: boolean) => {
        hideOnZoom: boolean;
        getValue(): {
            selectedIndex: number;
            selectedName: string;
        };
        selectable: boolean;
        setValue(value: ImagePreviewWidgetValue): void;
    };
    render: (node: NodeType, name: CustomWidgetName) => {
        widget: Widget;
    };
};
