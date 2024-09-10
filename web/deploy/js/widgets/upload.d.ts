import { CustomWidgetName, UploadWidgetOptions } from '../types/widgets';
export declare const uploadFactory: {
    cssClasses: {
        content: string;
        upload: string;
    };
    options: (upload: HTMLKulUploadElement) => UploadWidgetOptions;
    render: (node: NodeType, name: CustomWidgetName) => {
        widget: Widget;
    };
};
