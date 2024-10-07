import { ComfyAPIs, LogSeverity } from '../types/manager.js';
import { KulArticleNode } from '../types/ketchup-lite/components/kul-article/kul-article-declarations';
import { KulDataDataset } from '../types/ketchup-lite/components';
export interface LFWindow extends Window {
    lfManager: LFManager;
}
export declare class LFManager {
    #private;
    constructor();
    getApiRoutes(): ComfyAPIs;
    getCachedDatasets(): {
        usage: KulDataDataset;
    };
    getDebugDataset(): {
        article: HTMLKulArticleElement;
        dataset: KulArticleNode[];
    };
    initialize(): void;
    isDebug(): boolean;
    log(message: string, args?: Record<string, unknown>, severity?: LogSeverity): void;
    setDebugDataset(article: HTMLKulArticleElement, dataset: KulArticleNode[]): void;
    toggleDebug(value?: boolean): boolean;
}
