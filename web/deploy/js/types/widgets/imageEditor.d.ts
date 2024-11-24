import { KulDataDataset } from '../ketchup-lite/components';
import { BaseWidgetCallback, BaseWidgetFactory, BaseWidgetOptions, CustomWidgetName } from './_common';
export interface ImageEditor extends Widget {
    options: ImageEditorOptions;
    type: [CustomWidgetName.imageEditor];
}
export interface ImageEditorFactory extends BaseWidgetFactory<ImageEditorOptions> {
    options: ImageEditorOptionsCallback;
}
export type ImageEditorOptionsCallback = (imageviewer: HTMLKulImageviewerElement, actionButtons: ImageEditorActionButtons, grid: HTMLDivElement) => ImageEditorOptions;
export interface ImageEditorOptions extends BaseWidgetOptions<ImageEditorDeserializedValue> {
    getComp(): {
        imageviewer: HTMLKulImageviewerElement;
    };
    refresh: (directory: string) => Promise<void>;
}
export type ImageEditorSetter = () => {
    [CustomWidgetName.imageEditor]: BaseWidgetCallback<CustomWidgetName.imageEditor>;
};
export type ImageEditorDeserializedValue = KulDataDataset;
export type ImageEditorUpdateCallback = (addSnapshot?: boolean) => Promise<void>;
export declare enum ImageEditorCSS {
    Content = "lf-imageeditor",
    Widget = "lf-imageeditor__widget",
    Actions = "lf-imageeditor__actions",
    Grid = "lf-imageeditor__grid",
    GridHasActions = "lf-imageeditor__grid--has-actions",
    GridIsInactive = "lf-imageeditor__grid--is-inactive",
    Settings = "lf-imageeditor__settings"
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
export declare enum ImageEditorControls {
    Slider = "slider",
    Textfield = "textfield",
    Toggle = "toggle"
}
export declare enum ImageEditorSliderIds {
    BlueChannel = "b_channel",
    BlurKernelSize = "blur_kernel_size",
    BlurSigma = "blur_sigma",
    BrightnessStrength = "brightness_strength",
    ClarityStrength = "clarity_strength",
    ContrastStrength = "contrast_strength",
    DesaturationStrength = "desaturation_strength",
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
    LocalizedBrightness = "localized_brightness",
    LocalizedContrast = "localized_contrast",
    Shape = "shape"
}
export type ImageEditorControlIds = ImageEditorSliderIds | ImageEditorTextfieldIds | ImageEditorToggleIds;
export type ImageEditorControlValue = string | number | boolean;
export interface ImageEditorFilterSettings {
    [key: string]: number | boolean | string;
}
export interface ImageEditorBaseConfig<ID extends ImageEditorControlIds, V extends ImageEditorControlValue> {
    ariaLabel: string;
    defaultValue: V;
    id: ID;
    isMandatory?: boolean;
    title: string;
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
export type ImageEditorControlConfig = ImageEditorSliderConfig | ImageEditorTextfieldConfig | ImageEditorToggleConfig;
export type ImageEditorSettingsFor = Partial<{
    [ImageEditorControls.Slider]: ImageEditorSliderConfig[];
    [ImageEditorControls.Textfield]: ImageEditorTextfieldConfig[];
    [ImageEditorControls.Toggle]: ImageEditorToggleConfig[];
}>;
export interface ImageEditorFilterSettingsMap {
    brightness: ImageEditorBrightnessSettings;
    brush: ImageEditorClaritySettings;
    clarity: ImageEditorClaritySettings;
    contrast: ImageEditorContrastSettings;
    desaturate: ImageEditorDesaturateSettings;
    gaussianBlur: ImageEditorGaussianBlurSettings;
    vignette: ImageEditorVignetteSettings;
}
export interface ImageEditorBrightnessSettings extends ImageEditorFilterSettings {
    brightness_strength: number;
    gamma: number;
    localized_brightness: boolean;
    midpoint: number;
}
export interface ImageEditorClaritySettings extends ImageEditorFilterSettings {
    clarity_strength: number;
    sharpen_amount: number;
    blur_kernel_size: number;
}
export interface ImageEditorContrastSettings extends ImageEditorFilterSettings {
    contrast_strength: number;
    localized_contrast: boolean;
    midpoint: number;
}
export interface ImageEditorDesaturateSettings extends ImageEditorFilterSettings {
    r_channel: number;
    g_channel: number;
    b_channel: number;
    desaturation_strength: number;
}
export interface ImageEditorGaussianBlurSettings extends ImageEditorFilterSettings {
    blur_sigma: number;
    blur_kernel_size: number;
}
export interface ImageEditorVignetteSettings extends ImageEditorFilterSettings {
    intensity: number;
    radius: number;
    shape: boolean;
}
export declare enum ImageEditorBrightnessIds {
    BrightnessStrength = "brightness_strength",
    Gamma = "gamma",
    Midpoint = "midpoint",
    LocalizedBrightness = "localized_brightness"
}
export declare enum ImageEditorClarityIds {
    BlurKernelSize = "blur_kernel_size",
    ClarityStrength = "clarity_strength",
    SharpenAmount = "sharpen_amount"
}
export declare enum ImageEditorContrastIds {
    ContrastStrength = "contrast_strength",
    LocalizedContrast = "localized_contrast",
    Midpoint = "midpoint"
}
export declare enum ImageEditorDesaturateIds {
    RedChannel = "r_channel",
    GreenChannel = "g_channel",
    BlueChannel = "b_channel",
    DesaturationStrength = "desaturation_strength"
}
export declare enum ImageEditorGaussianBlurIds {
    BlurKernelSize = "blur_kernel_size",
    BlurSigma = "blur_sigma"
}
export declare enum ImageEditorVignetteIds {
    Color = "color",
    Intensity = "intensity",
    Radius = "radius",
    Shape = "shape"
}
export type ImageEditorFilterType = keyof ImageEditorFilterSettingsMap;
export interface ImageEditorFilterDefinition<ControlIdsEnum extends {
    [key: string]: string;
}, Settings extends ImageEditorFilterSettings, Configs extends ImageEditorSettingsFor> {
    controlIds: ControlIdsEnum;
    settings: Settings;
    configs: Configs;
}
export type ImageEditorBrightnessFilter = ImageEditorFilterDefinition<typeof ImageEditorBrightnessIds, ImageEditorBrightnessSettings, {
    [ImageEditorControls.Slider]: ImageEditorSliderConfig[];
    [ImageEditorControls.Toggle]: ImageEditorToggleConfig[];
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
export type ImageEditorVignetteFilter = ImageEditorFilterDefinition<typeof ImageEditorVignetteIds, ImageEditorVignetteSettings, {
    [ImageEditorControls.Slider]: ImageEditorSliderConfig[];
    [ImageEditorControls.Textfield]: ImageEditorTextfieldConfig[];
    [ImageEditorControls.Toggle]: ImageEditorToggleConfig[];
}>;
export type ImageEditorFilters = {
    brightness: ImageEditorBrightnessFilter;
    clarity: ImageEditorClarityFilter;
    contrast: ImageEditorContrastFilter;
    desaturate: ImageEditorDesaturateFilter;
    gaussianBlur: ImageEditorGaussianBlurFilter;
    vignette: ImageEditorVignetteFilter;
};
export type ImageEditorFilter = ImageEditorBrightnessFilter | ImageEditorClarityFilter | ImageEditorContrastFilter | ImageEditorDesaturateFilter | ImageEditorVignetteFilter;
