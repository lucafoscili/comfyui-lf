import { KulArticleNode } from '../ketchup-lite/components/kul-article/kul-article-declarations';
import { BaseWidgetCallback, BaseWidgetFactory, BaseWidgetOptions, CustomWidgetName } from './_common';
export interface ControlPanel extends Widget {
    options: ControlPanelOptions;
    type: [CustomWidgetName.controlPanel];
}
export interface ControlPanelFactory extends BaseWidgetFactory<ControlPanelOptions> {
    options: ControlPanelOptionsCallback;
}
export type ControlPanelOptionsCallback = () => ControlPanelOptions;
export interface ControlPanelOptions extends BaseWidgetOptions<ControlPanelDeserializedValue> {
}
export type ControlPanelSetter = () => {
    [CustomWidgetName.controlPanel]: BaseWidgetCallback<CustomWidgetName.controlPanel>;
};
export type ControlPanelDeserializedValue = {
    backup: boolean;
    debug: boolean;
    themes: string;
};
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
