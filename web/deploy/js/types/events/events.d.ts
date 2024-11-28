import { KulDataDataset } from '../ketchup-lite/components';
import { CustomWidgetName, NodeName } from '../widgets/widgets';
export type GenericPayload = WidgetPayloadFor<CustomWidgetName>;
export type GenericEvent = CustomEvent<GenericPayload>;
export interface BaseEventPayload {
    id: string;
}
export type EventCallback<T extends EventPayload<CustomWidgetName>> = (e: CustomEvent<T>) => void;
type ToKebabCase<S extends string> = S extends `${infer First}${infer Rest}` ? `${Lowercase<First>}${Rest extends Capitalize<Rest> ? '-' : ''}${ToKebabCase<Rest>}` : S;
export type KebabCaseNodeName<N extends NodeName> = N extends `LF_${infer Name}` ? `lf-${ToKebabCase<Name>}` : never;
export type EventName = {
    [N in NodeName]: KebabCaseNodeName<N>;
}[NodeName];
export type EventPayload<W extends CustomWidgetName> = WidgetPayloadMap[W];
export type WidgetPayloadFor<T extends CustomWidgetName> = WidgetPayloadMap[T];
export type WidgetPayloadMap = {
    [W in CustomWidgetName]: W extends CustomWidgetName.card ? CardPayload : W extends CustomWidgetName.cardsWithChip ? CardPayload : W extends CustomWidgetName.code ? StringPayload : W extends CustomWidgetName.compare ? SingleDatasetPayload : W extends CustomWidgetName.countBarChart ? MultiDatasetPayload : W extends CustomWidgetName.history ? SingleDatasetPayload : W extends CustomWidgetName.masonry ? MasonryPayload : W extends CustomWidgetName.progressbar ? ProgressbarPayload : W extends CustomWidgetName.tabBarChart ? MultiDatasetPayload : W extends CustomWidgetName.tree ? SingleDatasetPayload : W extends CustomWidgetName.upload ? StringPayload : BaseEventPayload;
};
export declare enum KulEventName {
    KulAccordion = "kul-accordion-event",
    KulArticle = "kul-article-event",
    KulButton = "kul-button-event",
    KulCanvas = "kul-canvas-event",
    KulCard = "kul-card-event",
    KulCarousel = "kul-carousel-event",
    KulChat = "kul-chat-event",
    KulChart = "kul-chart-event",
    KulChip = "kul-chip-event",
    KulCode = "kul-code-event",
    KulCompare = "kul-compare-event",
    KulImageviewer = "kul-imageviewer-event",
    KulList = "kul-list-event",
    KulManager = "kul-manager-ready",
    KulMasonry = "kul-masonry-event",
    KulMessenger = "kul-messenger-event",
    KulProgressbar = "kul-progressbar-event",
    KulSlider = "kul-slider-event",
    KulSpinner = "kul-spinner-event",
    KulTabbar = "kul-tabbar-event",
    KulTextfield = "kul-textfield-event",
    KulToggle = "kul-toggle-event",
    KulTree = "kul-tree-event",
    KulUpload = "kul-upload-event",
    Textarea = "textarea-event"
}
export interface CardPayload extends BaseEventPayload {
    datasets: KulDataDataset[];
    apiFlags: boolean[];
    hashes: string[];
    paths: string[];
    chip?: KulDataDataset;
}
export interface MasonryPayload extends SingleDatasetPayload {
    index: number;
    name: string;
}
export interface MultiDatasetPayload extends BaseEventPayload {
    datasets: {
        [index: string]: KulDataDataset;
    };
}
export interface NotifyPayload extends BaseEventPayload {
    action: 'none' | 'focus tab' | 'interrupt' | 'interrupt and queue' | 'queue prompt';
    image: string;
    message: string;
    silent: boolean;
    tag: string;
    title: string;
}
export interface ProgressbarPayload extends BaseEventPayload {
    bool: boolean;
    roll?: number;
}
export interface SingleDatasetPayload extends BaseEventPayload {
    dataset: KulDataDataset;
}
export interface StringPayload extends BaseEventPayload {
    value: string;
}
export {};
