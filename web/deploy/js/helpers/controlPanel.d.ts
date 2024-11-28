import { KulListEventPayload, KulToggleEventPayload } from '../types/ketchup-lite/components';
import { KulArticleEventPayload, KulArticleNode } from '../types/ketchup-lite/components/kul-article/kul-article-declarations';
import { KulButtonEventPayload } from '../types/ketchup-lite/components/kul-button/kul-button-declarations';
export declare const EV_HANDLERS: {
    article: (e: CustomEvent<KulArticleEventPayload>) => void;
    button: (e: CustomEvent<KulButtonEventPayload>) => void;
    list: (e: CustomEvent<KulListEventPayload>) => void;
    toggle: (e: CustomEvent<KulToggleEventPayload>) => void;
};
export declare const createContent: () => HTMLDivElement;
export declare const prepArticle: (key: string, node: KulArticleNode) => HTMLKulArticleElement;
export declare const handleKulEvent: (e: Event) => void;
