import { CustomWidgetName, ChipWidgetOptions } from '../types/widgets';
export declare const chipFactory: {
    cssClasses: {
        content: string;
        chip: string;
    };
    options: (chip: HTMLKulChipElement) => ChipWidgetOptions;
    render: (node: NodeType, name: CustomWidgetName) => {
        widget: Widget;
    };
};
