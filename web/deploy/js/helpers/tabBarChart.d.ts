import { KulDataDataset, KulTabbarEventPayload, KulTextfieldEventPayload } from '../types/ketchup-lite/components';
import { NodeName } from '../types/widgets/_common';
export declare const prepareTabbarDataset: (data: Record<string, KulDataDataset>) => KulDataDataset;
export declare const tabbarEventHandler: (chart: HTMLKulChartElement, nodeName: NodeName, e: CustomEvent<KulTabbarEventPayload>) => void;
export declare const textfieldEventHandler: (chart: HTMLKulChartElement, refreshCb: () => Promise<void>, e: CustomEvent<KulTextfieldEventPayload>) => void;
