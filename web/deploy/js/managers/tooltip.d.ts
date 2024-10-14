import type { KulDynamicPositionAnchor } from '../types/ketchup-lite/managers/kul-dynamic-position/kul-dynamic-position-declarations';
import { TooltipCallbacks, TooltipLayouts } from '../types/manager.js';
export declare class LFTooltip {
    #private;
    constructor();
    create<T extends TooltipLayouts>(anchor: KulDynamicPositionAnchor, layout: T, cb?: TooltipCallbacks): void;
    destroy(): void;
}
