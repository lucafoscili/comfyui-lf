import { LFWidgets } from './widgets.js';
import { NodeName } from '../types/nodes.js';
import { EventName } from '../types/events.js';
import { KulArticleNode } from '../types/ketchup-lite/components/kul-article/kul-article-declarations';
import { LFTooltip } from './tooltip';
import { KulDataDataset } from '../types/ketchup-lite/components.js';
import { KulManager } from '../types/ketchup-lite/managers/kul-manager/kul-manager.js';
import { APIRoutes } from '../types/api/api.js';
import { LogSeverity } from '../types/manager/manager.js';
export interface LFWindow extends Window {
    comfyAPI: ComfyUI;
    lfManager: LFManager;
}
export declare class LFManager {
    #private;
    constructor();
    getApiRoutes(): APIRoutes;
    getCachedDatasets(): {
        usage: KulDataDataset;
    };
    getDebugDataset(): {
        article: HTMLKulArticleElement;
        dataset: KulArticleNode[];
    };
    getEventName(node: NodeName): EventName;
    getManagers(): {
        ketchupLite?: KulManager;
        tooltip?: LFTooltip;
        widgets?: LFWidgets;
    };
    initialize(): void;
    isBackupEnabled(): boolean;
    isDebug(): boolean;
    log(message: string, args?: Record<string, unknown>, severity?: LogSeverity): void;
    setDebugDataset(article: HTMLKulArticleElement, dataset: KulArticleNode[]): void;
    toggleBackup(value?: boolean): boolean;
    toggleDebug(value?: boolean): boolean;
}
