import { KulDynamicPositionAnchor } from '../types/ketchup-lite/managers/kul-dynamic-position/kul-dynamic-position-declarations';
import { TooltipCallbacks, TooltipLayouts } from '../types/manager/manager';
export declare class LFTooltip {
    #private;
    create<T extends TooltipLayouts>(anchor: KulDynamicPositionAnchor, layout: T, cb?: TooltipCallbacks): void;
    destroy(): void;
}
