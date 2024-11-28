import { KulDataDataset, KulTabbarEventPayload, KulTextfieldEventPayload } from '../types/ketchup-lite/components';
import { TabBarChartState } from '../types/widgets/tabBarChart';
export declare const EV_HANDLERS: {
    tabbar: (state: TabBarChartState, e: CustomEvent<KulTabbarEventPayload>) => void;
    textfield: (state: TabBarChartState, e: CustomEvent<KulTextfieldEventPayload>) => void;
};
export declare const apiCall: (state: TabBarChartState) => Promise<void>;
export declare const prepareTabbarDataset: (data: Record<string, KulDataDataset>) => KulDataDataset;
