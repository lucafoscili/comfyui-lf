import { APIRoutes } from '../types/api/api.js';
import { EventName } from '../types/events/events.js';
import { KulDataDataset } from '../types/ketchup-lite/components.js';
import { KulArticleNode } from '../types/ketchup-lite/components/kul-article/kul-article-declarations.js';
import { KulManager } from '../types/ketchup-lite/managers/kul-manager/kul-manager.js';
import { LogSeverity } from '../types/manager/manager.js';
import { NodeName } from '../types/widgets/widgets.js';
import { LFTooltip } from './tooltip.js';
import { LFWidgets } from './widgets.js';
export interface LFWindow extends Window {
    comfyAPI: ComfyUI;
    lfManager: LFManager;
}
export declare class LFManager {
    #private;
    constructor();
    initialize(): void;
    getApiRoutes(): APIRoutes;
    getCachedDatasets(): {
        usage: KulDataDataset;
    };
    getDebugDataset(): {
        article: HTMLKulArticleElement;
        dataset: KulArticleNode[];
    };
    getEventName(node: NodeName): EventName;
    getLatestRelease(): GitHubRelease;
    getManagers(): {
        ketchupLite?: KulManager;
        tooltip?: LFTooltip;
        widgets?: LFWidgets;
    };
    isBackupEnabled(): boolean;
    isDebug(): boolean;
    log(message: string, args?: Record<string, unknown>, severity?: LogSeverity): void;
    setDebugDataset(article: HTMLKulArticleElement, dataset: KulArticleNode[]): void;
    toggleBackup(value?: boolean): boolean;
    toggleDebug(value?: boolean): boolean;
}
