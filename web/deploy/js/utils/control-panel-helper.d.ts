import { KulArticleNode } from '../types/ketchup-lite/components/kul-article/kul-article-declarations';
export declare const handleKulEvent: (e: Event) => void;
export declare const sectionsFactory: {
    bug: () => KulArticleNode;
    debug: (logsData: KulArticleNode[]) => KulArticleNode;
    metadata: () => KulArticleNode;
    theme: () => KulArticleNode;
};
