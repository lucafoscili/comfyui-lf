import { CustomWidgetName, type ImagePreviewWidgetValue } from '../types/widgets';
export declare const imagePreviewFactory: {
    cssClasses: {
        content: string;
        doge: string;
        grid: string;
        image: string;
    };
    options: (content: HTMLDivElement) => {
        hideOnZoom: boolean;
        getValue(): {
            fileNames: any[];
            images: any[];
        };
        setValue(value: ImagePreviewWidgetValue): void;
    };
    render: (node: NodeType, name: CustomWidgetName) => {
        widget: Widget;
    };
};
