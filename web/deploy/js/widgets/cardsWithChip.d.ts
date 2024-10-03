import { CardsWithChipWidgetOptions, CustomWidgetName } from '../types/widgets';
export declare const cardsWithChipFactory: {
    cssClasses: {
        content: string;
        cards: string;
        chip: string;
        grid: string;
    };
    options: (grid: HTMLDivElement) => CardsWithChipWidgetOptions;
    render: (node: NodeType, name: CustomWidgetName) => {
        widget: Widget;
    };
};
