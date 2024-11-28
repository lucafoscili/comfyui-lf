import { KulDataDataset } from '../ketchup-lite/components';
import { BaseWidgetState, CustomWidgetName, NormalizeValueCallback, WidgetFactory } from './widgets';
export declare enum TreeCSS {
    Content = "lf-tree",
    Widget = "lf-tree__widget"
}
export type Tree = Widget<CustomWidgetName.tree>;
export type TreeFactory = WidgetFactory<TreeDeserializedValue, TreeState>;
export type TreeNormalizeCallback = NormalizeValueCallback<TreeDeserializedValue | string>;
export type TreeDeserializedValue = KulDataDataset;
export interface TreeState extends BaseWidgetState {
    tree: HTMLKulTreeElement;
}
