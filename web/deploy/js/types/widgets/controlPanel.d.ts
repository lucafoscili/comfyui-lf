import { KulArticleNode } from '../../types/ketchup-lite/components/kul-article/kul-article-declarations';
import { BaseWidgetState, CustomWidgetName, NormalizeValueCallback, WidgetFactory } from './widgets';
export declare enum ControlPanelCSS {
    Content = "lf-controlpanel",
    Grid = "lf-controlpanel__grid",
    Spinner = "lf-controlpanel__spinner"
}
export type ControlPanel = Widget<CustomWidgetName.controlPanel>;
export type ControlPanelFactory = WidgetFactory<ControlPanelDeserializedValue, ControlPanelState>;
export type ControlPanelNormalizeCallback = NormalizeValueCallback<ControlPanelDeserializedValue | string>;
export type ControlPanelDeserializedValue = {
    backup: boolean;
    debug: boolean;
    themes: string;
};
export interface ControlPanelState extends BaseWidgetState {
}
export interface ControlPanelFixture {
    [ControlPanelIds.Analytics]: () => KulArticleNode;
    [ControlPanelIds.Backup]: () => KulArticleNode;
    [ControlPanelIds.Debug]: (logsData: KulArticleNode[]) => KulArticleNode;
    [ControlPanelIds.GitHub]: () => KulArticleNode;
    [ControlPanelIds.Metadata]: () => KulArticleNode;
    [ControlPanelIds.Theme]: () => KulArticleNode;
}
export declare enum ControlPanelIcons {
    Analytics = "pie_chart",
    Backup = "save",
    Debug = "bug",
    GitHub = "github",
    Metadata = "information-variant",
    Theme = "style"
}
export declare enum ControlPanelIds {
    Analytics = "analytics",
    Backup = "backup",
    Debug = "debug",
    GitHub = "github",
    Metadata = "metadata",
    Theme = "theme"
}
export declare enum ControlPanelLabels {
    AutoBackup = "Automatic Backup",
    Backup = "Backup now",
    ClearLogs = "Clear logs",
    Debug = "Debug",
    DeleteUsage = "Delete usage analytics info",
    DeleteMetadata = "Delete models info",
    Done = "Done!",
    OpenIssue = "Open an issue",
    Theme = "Random theme"
}
export declare enum ControlPanelSection {
    Content = "content",
    ContentSeparator = "content_spearator",
    Paragraph = "paragraph",
    Root = "root",
    Section = "section"
}
