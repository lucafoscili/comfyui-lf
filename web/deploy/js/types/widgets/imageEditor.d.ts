import { KulDataDataset } from '../../types/ketchup-lite/components';
import { BaseWidgetState, CustomWidgetName, NormalizeValueCallback, WidgetFactory } from './widgets';
export declare enum ImageEditorCSS {
    Content = "lf-imageeditor",
    Widget = "lf-imageeditor__widget",
    Actions = "lf-imageeditor__actions",
    Grid = "lf-imageeditor__grid",
    GridHasActions = "lf-imageeditor__grid--has-actions",
    GridIsInactive = "lf-imageeditor__grid--is-inactive",
    Settings = "lf-imageeditor__settings",
    SettingsControls = "lf-imageeditor__settings__controls"
}
export type ImageEditor = Widget<CustomWidgetName.imageEditor>;
export type ImageEditorFactory = WidgetFactory<ImageEditorDeserializedValue, ImageEditorState>;
export type ImageEditorNormalizeCallback = NormalizeValueCallback<ImageEditorDeserializedValue | string>;
export type ImageEditorDeserializedValue = KulDataDataset;
export interface ImageEditorState extends BaseWidgetState {
    elements: {
        actionButtons: ImageEditorActionButtons;
        controls: Partial<{
            [K in ImageEditorControlIds]: ImageEditorControlMap<K>;
        }>;
        grid: HTMLDivElement;
        imageviewer: HTMLKulImageviewerElement;
        settings: HTMLDivElement;
    };
    filter: ImageEditorFilter;
    filterType: ImageEditorFilterType;
    update: {
        preview: () => Promise<void>;
        snapshot: () => Promise<void>;
    };
}
export declare enum ImageEditorStatus {
    Completed = "completed",
    Pending = "pending"
}
export declare enum ImageEditorColumnId {
    Path = "path",
    Status = "status"
}
export interface ImageEditorActionButtons {
    interrupt?: HTMLKulButtonElement;
    resume?: HTMLKulButtonElement;
}
export declare enum ImageEditorIcons {
    Interrupt = "stop",
    Reset = "refresh",
    Resume = "play"
}
export type ImageEditorUpdateCallback = (addSnapshot?: boolean) => Promise<void>;
export declare enum ImageEditorControls {
    Canvas = "canvas",
    Slider = "slider",
    Textfield = "textfield",
    Toggle = "toggle"
}
export declare enum ImageEditorCanvasIds {
    B64Canvas = "b64_canvas",
    Points = "points"
}
export declare enum ImageEditorSliderIds {
    BlueChannel = "b_channel",
    BlurKernelSize = "blur_kernel_size",
    BlurSigma = "blur_sigma",
    Strength = "strength",
    Gamma = "gamma",
    GreenChannel = "g_channel",
    Intensity = "intensity",
    Midpoint = "midpoint",
    Opacity = "opacity",
    Radius = "radius",
    RedChannel = "r_channel",
    SharpenAmount = "sharpen_amount",
    Size = "size"
}
export declare enum ImageEditorTextfieldIds {
    Color = "color"
}
export declare enum ImageEditorToggleIds {
    Localized = "localized",
    Shape = "shape",
    Smooth = "smoooth"
}
export type ImageEditorControlIds = ImageEditorCanvasIds | ImageEditorSliderIds | ImageEditorTextfieldIds | ImageEditorToggleIds;
export type ImageEditorControlMap<ID extends ImageEditorControlIds> = ID extends ImageEditorCanvasIds ? HTMLKulCanvasElement : ID extends ImageEditorSliderIds ? HTMLKulSliderElement : ID extends ImageEditorTextfieldIds ? HTMLKulTextfieldElement : ID extends ImageEditorToggleIds ? HTMLKulToggleElement : never;
export type ImageEditorControlValue = string | number | boolean;
export type ImageEditorFilterSettings = Partial<{
    [K in ImageEditorControlIds]: number | boolean | string | Array<{
        x: number;
        y: number;
    }>;
}>;
export interface ImageEditorBaseConfig<ID extends ImageEditorControlIds, V extends ImageEditorControlValue> {
    ariaLabel: string;
    defaultValue: V;
    id: ID;
    isMandatory?: boolean;
    title: string;
}
export interface ImageEditorCanvasConfig extends ImageEditorBaseConfig<ImageEditorSliderIds, number> {
    points: Array<{
        x: number;
        y: number;
    }>;
}
export interface ImageEditorSliderConfig extends ImageEditorBaseConfig<ImageEditorSliderIds, number> {
    controlType: ImageEditorControls.Slider;
    max: string;
    min: string;
    step: string;
}
export interface ImageEditorTextfieldConfig extends ImageEditorBaseConfig<ImageEditorTextfieldIds, string> {
    controlType: ImageEditorControls.Textfield;
    type: 'color' | 'number' | 'text';
}
export interface ImageEditorToggleConfig extends ImageEditorBaseConfig<ImageEditorToggleIds, boolean> {
    controlType: ImageEditorControls.Toggle;
    off: string;
    on: string;
}
export type ImageEditorControlConfig = ImageEditorCanvasConfig | ImageEditorSliderConfig | ImageEditorTextfieldConfig | ImageEditorToggleConfig;
export type ImageEditorSettingsFor = Partial<{
    [ImageEditorControls.Slider]: ImageEditorSliderConfig[];
    [ImageEditorControls.Textfield]: ImageEditorTextfieldConfig[];
    [ImageEditorControls.Toggle]: ImageEditorToggleConfig[];
}>;
export interface ImageEditorFilterSettingsMap {
    blend: ImageEditorBlendSettings;
    brightness: ImageEditorBrightnessSettings;
    brush: ImageEditorBrushSettings;
    clarity: ImageEditorClaritySettings;
    contrast: ImageEditorContrastSettings;
    desaturate: ImageEditorDesaturateSettings;
    gaussianBlur: ImageEditorGaussianBlurSettings;
    line: ImageEditorLineSettings;
    vignette: ImageEditorVignetteSettings;
}
export interface ImageEditorBlendSettings extends ImageEditorFilterSettings {
    opacity: number;
}
export interface ImageEditorBrightnessSettings extends ImageEditorFilterSettings {
    strength: number;
    gamma: number;
    localized: boolean;
    midpoint: number;
}
export interface ImageEditorBrushSettings extends ImageEditorFilterSettings {
    b64_canvas: string;
    color: string;
    opacity: number;
    size: number;
}
export interface ImageEditorClaritySettings extends ImageEditorFilterSettings {
    strength: number;
    sharpen_amount: number;
    blur_kernel_size: number;
}
export interface ImageEditorContrastSettings extends ImageEditorFilterSettings {
    strength: number;
    localized: boolean;
    midpoint: number;
}
export interface ImageEditorDesaturateSettings extends ImageEditorFilterSettings {
    r_channel: number;
    g_channel: number;
    b_channel: number;
    strength: number;
}
export interface ImageEditorGaussianBlurSettings extends ImageEditorFilterSettings {
    blur_kernel_size: number;
    blur_sigma: number;
}
export interface ImageEditorLineSettings extends ImageEditorFilterSettings {
    color: string;
    opacity: number;
    points: Array<{
        x: number;
        y: number;
    }>;
    size: number;
    smooth: boolean;
}
export interface ImageEditorVignetteSettings extends ImageEditorFilterSettings {
    intensity: number;
    radius: number;
    shape: boolean;
}
export declare enum ImageEditorBlendIds {
    Opacity = "opacity"
}
export declare enum ImageEditorBrightnessIds {
    Strength = "strength",
    Gamma = "gamma",
    Midpoint = "midpoint",
    Localized = "localized"
}
export declare enum ImageEditorBrushIds {
    B64Canvas = "b64_canvas",
    Color = "color",
    Opacity = "opacity",
    Size = "size"
}
export declare enum ImageEditorClarityIds {
    BlurKernelSize = "blur_kernel_size",
    Strength = "strength",
    SharpenAmount = "sharpen_amount"
}
export declare enum ImageEditorContrastIds {
    Strength = "strength",
    Localized = "contrast",
    Midpoint = "midpoint"
}
export declare enum ImageEditorDesaturateIds {
    RedChannel = "r_channel",
    GreenChannel = "g_channel",
    BlueChannel = "b_channel",
    Strength = "strength"
}
export declare enum ImageEditorGaussianBlurIds {
    BlurKernelSize = "blur_kernel_size",
    BlurSigma = "blur_sigma"
}
export declare enum ImageEditorLineIds {
    Color = "color",
    Opacity = "opacity",
    Points = "points",
    Size = "size",
    Smooth = "smooth"
}
export declare enum ImageEditorVignetteIds {
    Color = "color",
    Intensity = "intensity",
    Radius = "radius",
    Shape = "shape"
}
export type ImageEditorFilterType = keyof ImageEditorFilterSettingsMap;
export interface ImageEditorFilterDefinition<ImageEditorControlIdsEnum extends {
    [key: string]: string;
}, ImageEditorSettings extends ImageEditorFilterSettings, ImageEditorConfigs extends ImageEditorSettingsFor> {
    controlIds: ImageEditorControlIdsEnum;
    configs: ImageEditorConfigs;
    hasCanvasAction?: boolean;
    settings: ImageEditorSettings;
}
export type ImageEditorBrightnessFilter = ImageEditorFilterDefinition<typeof ImageEditorBrightnessIds, ImageEditorBrightnessSettings, {
    [ImageEditorControls.Slider]: ImageEditorSliderConfig[];
    [ImageEditorControls.Toggle]: ImageEditorToggleConfig[];
}>;
export type ImageEditorBrushFilter = ImageEditorFilterDefinition<typeof ImageEditorBrushIds, ImageEditorBrushSettings, {
    [ImageEditorControls.Slider]: ImageEditorSliderConfig[];
    [ImageEditorControls.Textfield]: ImageEditorTextfieldConfig[];
}>;
export type ImageEditorClarityFilter = ImageEditorFilterDefinition<typeof ImageEditorClarityIds, ImageEditorClaritySettings, {
    [ImageEditorControls.Slider]: ImageEditorSliderConfig[];
}>;
export type ImageEditorContrastFilter = ImageEditorFilterDefinition<typeof ImageEditorContrastIds, ImageEditorContrastSettings, {
    [ImageEditorControls.Slider]: ImageEditorSliderConfig[];
    [ImageEditorControls.Toggle]: ImageEditorToggleConfig[];
}>;
export type ImageEditorDesaturateFilter = ImageEditorFilterDefinition<typeof ImageEditorDesaturateIds, ImageEditorDesaturateSettings, {
    [ImageEditorControls.Slider]: ImageEditorSliderConfig[];
}>;
export type ImageEditorGaussianBlurFilter = ImageEditorFilterDefinition<typeof ImageEditorGaussianBlurIds, ImageEditorGaussianBlurSettings, {
    [ImageEditorControls.Slider]: ImageEditorSliderConfig[];
}>;
export type ImageEditorLineFilter = ImageEditorFilterDefinition<typeof ImageEditorLineIds, ImageEditorLineSettings, {
    [ImageEditorControls.Canvas]: ImageEditorCanvasConfig[];
    [ImageEditorControls.Slider]: ImageEditorSliderConfig[];
    [ImageEditorControls.Textfield]: ImageEditorTextfieldConfig[];
    [ImageEditorControls.Toggle]: ImageEditorToggleConfig[];
}>;
export type ImageEditorVignetteFilter = ImageEditorFilterDefinition<typeof ImageEditorVignetteIds, ImageEditorVignetteSettings, {
    [ImageEditorControls.Slider]: ImageEditorSliderConfig[];
    [ImageEditorControls.Textfield]: ImageEditorTextfieldConfig[];
    [ImageEditorControls.Toggle]: ImageEditorToggleConfig[];
}>;
export type ImageEditorFilters = {
    brightness: ImageEditorBrightnessFilter;
    brush: ImageEditorBrushFilter;
    clarity: ImageEditorClarityFilter;
    contrast: ImageEditorContrastFilter;
    desaturate: ImageEditorDesaturateFilter;
    gaussianBlur: ImageEditorGaussianBlurFilter;
    line: ImageEditorLineFilter;
    vignette: ImageEditorVignetteFilter;
};
export type ImageEditorFilter = ImageEditorBrightnessFilter | ImageEditorBrushFilter | ImageEditorClarityFilter | ImageEditorContrastFilter | ImageEditorDesaturateFilter | ImageEditorGaussianBlurFilter | ImageEditorLineFilter | ImageEditorVignetteFilter;
