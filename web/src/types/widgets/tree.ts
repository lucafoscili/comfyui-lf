import { KulDataDataset } from '../ketchup-lite/components';
import {
  BaseWidgetCallback,
  BaseWidgetFactory,
  BaseWidgetOptions,
  CustomWidgetName,
} from './_common';

const BASE_CSS_CLASS = 'lf-tree';

//#region Tree
export interface Tree extends Widget {
  options: TreeOptions;
  type: [CustomWidgetName.tree];
}
export interface TreeFactory extends BaseWidgetFactory<TreeOptions> {
  options: TreeOptionsCallback;
}
export type TreeOptionsCallback = (tree: HTMLKulTreeElement) => TreeOptions;
export interface TreeOptions extends BaseWidgetOptions<TreeValueDeserializedValue> {
  getComp(): HTMLKulTreeElement;
}
export type TreeSetter = () => {
  [CustomWidgetName.tree]: BaseWidgetCallback<CustomWidgetName.tree>;
};
export type TreeValueDeserializedValue = KulDataDataset;
export enum TreeCSS {
  Content = BASE_CSS_CLASS,
  Widget = `${BASE_CSS_CLASS}__widget`,
}
//#endregion
