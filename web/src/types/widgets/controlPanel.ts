import { KulArticleNode } from '../../types/ketchup-lite/components/kul-article/kul-article-declarations';
import {
  BaseWidgetState,
  CustomWidgetName,
  NormalizeValueCallback,
  WidgetFactory,
} from './widgets';

//#region CSS
const BASE_CSS_CLASS = 'lf-controlpanel';
export enum ControlPanelCSS {
  Content = BASE_CSS_CLASS,
  Grid = `${BASE_CSS_CLASS}__grid`,
  Spinner = `${BASE_CSS_CLASS}__spinner`,
}
//#endregion

//#region Control panel
export type ControlPanel = Widget<CustomWidgetName.controlPanel>;
export type ControlPanelFactory = WidgetFactory<ControlPanelDeserializedValue, ControlPanelState>;
export type ControlPanelNormalizeCallback = NormalizeValueCallback<
  ControlPanelDeserializedValue | string
>;
//#endregion

//#region Value
export type ControlPanelDeserializedValue = {
  backup: boolean;
  debug: boolean;
  themes: string;
};
//#endregion

//#region State
export interface ControlPanelState extends BaseWidgetState {}
//#endregion

//#region Dataset
export interface ControlPanelFixture {
  [ControlPanelIds.Analytics]: () => KulArticleNode;
  [ControlPanelIds.Backup]: () => KulArticleNode;
  [ControlPanelIds.Debug]: (logsData: KulArticleNode[]) => KulArticleNode;
  [ControlPanelIds.GitHub]: () => KulArticleNode;
  [ControlPanelIds.Metadata]: () => KulArticleNode;
  [ControlPanelIds.Theme]: () => KulArticleNode;
}
export enum ControlPanelIcons {
  Analytics = 'pie_chart',
  Backup = 'save',
  Debug = 'bug',
  GitHub = 'github',
  Metadata = 'information-variant',
  Theme = 'style',
}
export enum ControlPanelIds {
  Analytics = 'analytics',
  Backup = 'backup',
  Debug = 'debug',
  GitHub = 'github',
  Metadata = 'metadata',
  Theme = 'theme',
}
export enum ControlPanelLabels {
  AutoBackup = 'Automatic Backup',
  Backup = 'Backup now',
  ClearLogs = 'Clear logs',
  Debug = 'Debug',
  DeleteUsage = 'Delete usage analytics info',
  DeleteMetadata = 'Delete models info',
  Done = 'Done!',
  OpenIssue = 'Open an issue',
  Theme = 'Random theme',
}
export enum ControlPanelSection {
  Content = 'content',
  ContentSeparator = 'content_spearator',
  Paragraph = 'paragraph',
  Root = 'root',
  Section = 'section',
}
//#endregion
