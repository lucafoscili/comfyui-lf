import { KulDataDataset } from '../types/ketchup-lite/components';
import { CustomWidgetName } from '../types/widgets';
export declare const listFactory: {
    cssClasses: {
        content: string;
        list: string;
    };
    options: (list: HTMLKulListElement) => {
        hideOnZoom: boolean;
        getComp(): HTMLKulListElement;
        getValue(): string;
        setProps(props: Partial<HTMLKulListElement>): void;
        setValue(value: KulDataDataset | string): void;
    };
    render: (node: NodeType, name: CustomWidgetName) => {
        widget: Widget;
    };
};
