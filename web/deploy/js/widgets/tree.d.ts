import { KulDataDataset } from '../types/ketchup-lite/components';
import { CustomWidgetName } from '../types/widgets';
export declare const treeFactory: {
    cssClasses: {
        content: string;
        tree: string;
    };
    options: (tree: HTMLKulTreeElement) => {
        hideOnZoom: boolean;
        getComp(): HTMLKulTreeElement;
        getValue(): string;
        setProps(props: Partial<HTMLKulTreeElement>): void;
        setValue(value: KulDataDataset | string): void;
    };
    render: (node: NodeType, name: CustomWidgetName) => {
        widget: Widget;
    };
};
