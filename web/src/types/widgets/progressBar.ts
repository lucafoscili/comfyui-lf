import {
  BaseWidgetState,
  CustomWidgetName,
  NormalizeValueCallback,
  WidgetFactory,
} from './widgets';

//#region CSS
const BASE_CSS_CLASS = 'lf-progressbar';
export enum ProgressbarCSS {
  Content = BASE_CSS_CLASS,
}
//#endregion

//#region Widget
export type Progressbar = Widget<CustomWidgetName.progressbar>;
export type ProgressbarFactory = WidgetFactory<ProgressbarDeserializedValue, ProgressbarState>;
export type ProgressbarNormalizeCallback = NormalizeValueCallback<
  ProgressbarDeserializedValue | string
>;
//#endregion

//#region Value
export type ProgressbarDeserializedValue = { bool: boolean; roll: number };
//#endregion

//#region State
export interface ProgressbarState extends BaseWidgetState {
  progressbar: HTMLKulProgressbarElement;
}
//#endregion

//#region Dataset
export enum ProgressbarIcons {
  Landscape = 'landscape',
  Portrait = 'portrait',
}
export enum ProgressbarLabels {
  Fallback = 'N/A',
  False = 'false',
  True = 'true',
}
//#endregion
