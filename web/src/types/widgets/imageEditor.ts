import { KulDataDataset } from '../ketchup-lite/components';
import {
  BaseWidgetCallback,
  BaseWidgetFactory,
  BaseWidgetOptions,
  CustomWidgetName,
} from './_common';

const BASE_CSS_CLASS = 'lf-imageeditor';

//#region Image editor
export interface ImageEditor extends Widget {
  options: ImageEditorOptions;
  type: [CustomWidgetName.imageEditor];
}
export interface ImageEditorFactory extends BaseWidgetFactory<ImageEditorOptions> {
  options: ImageEditorOptionsCallback;
}
export type ImageEditorOptionsCallback = (
  imageviewer: HTMLKulImageviewerElement,
  actionButtons: ImageEditorActionButtons,
  grid: HTMLDivElement,
) => ImageEditorOptions;
export interface ImageEditorOptions extends BaseWidgetOptions<ImageEditorDeserializedValue> {
  getComp(): { imageviewer: HTMLKulImageviewerElement };
  refresh: (directory: string) => Promise<void>;
}
export type ImageEditorSetter = () => {
  [CustomWidgetName.imageEditor]: BaseWidgetCallback<CustomWidgetName.imageEditor>;
};
export type ImageEditorDeserializedValue = KulDataDataset;
export type ImageEditorUpdateCallback = (addSnapshot?: boolean) => Promise<void>;
export enum ImageEditorCSS {
  Content = BASE_CSS_CLASS,
  Widget = `${BASE_CSS_CLASS}__widget`,
  Actions = `${BASE_CSS_CLASS}__actions`,
  Grid = `${BASE_CSS_CLASS}__grid`,
  GridHasActions = `${BASE_CSS_CLASS}__grid--has-actions`,
  GridIsInactive = `${BASE_CSS_CLASS}__grid--is-inactive`,
  Settings = `${BASE_CSS_CLASS}__settings`,
  SettingsControls = `${BASE_CSS_CLASS}__settings__controls`,
}
export interface ImageEditorData {
  filter: ImageEditorFilter;
  filterType: ImageEditorFilterType;
  settings: HTMLDivElement;
}
//#endregion
//#region Dataset
export enum ImageEditorStatus {
  Completed = 'completed',
  Pending = 'pending',
}
export enum ImageEditorColumnId {
  Path = 'path',
  Status = 'status',
}
//#endregion
//#region U.I.
export interface ImageEditorActionButtons {
  interrupt?: HTMLKulButtonElement;
  resume?: HTMLKulButtonElement;
}
export enum ImageEditorIcons {
  Interrupt = 'stop',
  Reset = 'refresh',
  Resume = 'play',
}
//#endregion
//#region Controls
export enum ImageEditorControls {
  Canvas = 'canvas',
  Slider = 'slider',
  Textfield = 'textfield',
  Toggle = 'toggle',
}
export enum ImageEditorCanvasIds {
  Points = 'points',
}
export enum ImageEditorSliderIds {
  BlueChannel = 'b_channel',
  BlurKernelSize = 'blur_kernel_size',
  BlurSigma = 'blur_sigma',
  BrightnessStrength = 'brightness_strength',
  ClarityStrength = 'clarity_strength',
  ContrastStrength = 'contrast_strength',
  DesaturationStrength = 'desaturation_strength',
  Gamma = 'gamma',
  GreenChannel = 'g_channel',
  Intensity = 'intensity',
  Midpoint = 'midpoint',
  Opacity = 'opacity',
  Radius = 'radius',
  RedChannel = 'r_channel',
  SharpenAmount = 'sharpen_amount',
  Size = 'size',
}
export enum ImageEditorTextfieldIds {
  Color = 'color',
}
export enum ImageEditorToggleIds {
  LocalizedBrightness = 'localized_brightness',
  LocalizedContrast = 'localized_contrast',
  Shape = 'shape',
  Smooth = 'smoooth',
}
export type ImageEditorControlIds =
  | ImageEditorCanvasIds
  | ImageEditorSliderIds
  | ImageEditorTextfieldIds
  | ImageEditorToggleIds;
export type ImageEditorControlValue = string | number | boolean;
export type ImageEditorFilterSettings = Partial<{
  [K in ImageEditorControlIds]: number | boolean | string | Array<{ x: number; y: number }>;
}>;
export interface ImageEditorBaseConfig<
  ID extends ImageEditorControlIds,
  V extends ImageEditorControlValue,
> {
  ariaLabel: string;
  defaultValue: V;
  id: ID;
  isMandatory?: boolean;
  title: string;
}
export interface ImageEditorCanvasConfig
  extends ImageEditorBaseConfig<ImageEditorSliderIds, number> {
  points: Array<{ x: number; y: number }>;
}
export interface ImageEditorSliderConfig
  extends ImageEditorBaseConfig<ImageEditorSliderIds, number> {
  controlType: ImageEditorControls.Slider;
  max: string;
  min: string;
  step: string;
}
export interface ImageEditorTextfieldConfig
  extends ImageEditorBaseConfig<ImageEditorTextfieldIds, string> {
  controlType: ImageEditorControls.Textfield;
  type: 'color' | 'number' | 'text';
}
export interface ImageEditorToggleConfig
  extends ImageEditorBaseConfig<ImageEditorToggleIds, boolean> {
  controlType: ImageEditorControls.Toggle;
  off: string;
  on: string;
}
export type ImageEditorControlConfig =
  | ImageEditorCanvasConfig
  | ImageEditorSliderConfig
  | ImageEditorTextfieldConfig
  | ImageEditorToggleConfig;
export type ImageEditorSettingsFor = Partial<{
  [ImageEditorControls.Slider]: ImageEditorSliderConfig[];
  [ImageEditorControls.Textfield]: ImageEditorTextfieldConfig[];
  [ImageEditorControls.Toggle]: ImageEditorToggleConfig[];
}>;
//#endregion
//#region Filters
export interface ImageEditorFilterSettingsMap {
  brightness: ImageEditorBrightnessSettings;
  brush: ImageEditorBrushSettings;
  clarity: ImageEditorClaritySettings;
  contrast: ImageEditorContrastSettings;
  desaturate: ImageEditorDesaturateSettings;
  gaussianBlur: ImageEditorGaussianBlurSettings;
  line: ImageEditorLineSettings;
  vignette: ImageEditorVignetteSettings;
}
export interface ImageEditorBrightnessSettings extends ImageEditorFilterSettings {
  brightness_strength: number;
  gamma: number;
  localized_brightness: boolean;
  midpoint: number;
}
export interface ImageEditorBrushSettings extends ImageEditorFilterSettings {
  color: string;
  opacity: number;
  size: number;
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
  blur_kernel_size: number;
  blur_sigma: number;
}
export interface ImageEditorLineSettings extends ImageEditorFilterSettings {
  color: string;
  opacity: number;
  points: Array<{ x: number; y: number }>;
  size: number;
  smooth: boolean;
}
export interface ImageEditorVignetteSettings extends ImageEditorFilterSettings {
  intensity: number;
  radius: number;
  shape: boolean;
}
export enum ImageEditorBrightnessIds {
  BrightnessStrength = 'brightness_strength',
  Gamma = 'gamma',
  Midpoint = 'midpoint',
  LocalizedBrightness = 'localized_brightness',
}
export enum ImageEditorBrushIds {
  Color = 'color',
  Opacity = 'opacity',
  Size = 'size',
}
export enum ImageEditorClarityIds {
  BlurKernelSize = 'blur_kernel_size',
  ClarityStrength = 'clarity_strength',
  SharpenAmount = 'sharpen_amount',
}
export enum ImageEditorContrastIds {
  ContrastStrength = 'contrast_strength',
  LocalizedContrast = 'localized_contrast',
  Midpoint = 'midpoint',
}
export enum ImageEditorDesaturateIds {
  RedChannel = 'r_channel',
  GreenChannel = 'g_channel',
  BlueChannel = 'b_channel',
  DesaturationStrength = 'desaturation_strength',
}
export enum ImageEditorGaussianBlurIds {
  BlurKernelSize = 'blur_kernel_size',
  BlurSigma = 'blur_sigma',
}
export enum ImageEditorLineIds {
  Color = 'color',
  Opacity = 'opacity',
  Points = 'points',
  Size = 'size',
  Smooth = 'smooth',
}
export enum ImageEditorVignetteIds {
  Color = 'color',
  Intensity = 'intensity',
  Radius = 'radius',
  Shape = 'shape',
}
export type ImageEditorFilterType = keyof ImageEditorFilterSettingsMap;
export interface ImageEditorFilterDefinition<
  ImageEditorControlIdsEnum extends { [key: string]: string },
  ImageEditorSettings extends ImageEditorFilterSettings,
  ImageEditorConfigs extends ImageEditorSettingsFor,
> {
  controlIds: ImageEditorControlIdsEnum;
  configs: ImageEditorConfigs;
  hasCanvasAction?: boolean;
  settings: ImageEditorSettings;
}
export type ImageEditorBrightnessFilter = ImageEditorFilterDefinition<
  typeof ImageEditorBrightnessIds,
  ImageEditorBrightnessSettings,
  {
    [ImageEditorControls.Slider]: ImageEditorSliderConfig[];
    [ImageEditorControls.Toggle]: ImageEditorToggleConfig[];
  }
>;
export type ImageEditorBrushFilter = ImageEditorFilterDefinition<
  typeof ImageEditorBrushIds,
  ImageEditorBrushSettings,
  {
    [ImageEditorControls.Slider]: ImageEditorSliderConfig[];
    [ImageEditorControls.Textfield]: ImageEditorTextfieldConfig[];
  }
>;
export type ImageEditorClarityFilter = ImageEditorFilterDefinition<
  typeof ImageEditorClarityIds,
  ImageEditorClaritySettings,
  {
    [ImageEditorControls.Slider]: ImageEditorSliderConfig[];
  }
>;
export type ImageEditorContrastFilter = ImageEditorFilterDefinition<
  typeof ImageEditorContrastIds,
  ImageEditorContrastSettings,
  {
    [ImageEditorControls.Slider]: ImageEditorSliderConfig[];
    [ImageEditorControls.Toggle]: ImageEditorToggleConfig[];
  }
>;
export type ImageEditorDesaturateFilter = ImageEditorFilterDefinition<
  typeof ImageEditorDesaturateIds,
  ImageEditorDesaturateSettings,
  {
    [ImageEditorControls.Slider]: ImageEditorSliderConfig[];
  }
>;
export type ImageEditorGaussianBlurFilter = ImageEditorFilterDefinition<
  typeof ImageEditorGaussianBlurIds,
  ImageEditorGaussianBlurSettings,
  {
    [ImageEditorControls.Slider]: ImageEditorSliderConfig[];
  }
>;
export type ImageEditorLineFilter = ImageEditorFilterDefinition<
  typeof ImageEditorLineIds,
  ImageEditorLineSettings,
  {
    [ImageEditorControls.Canvas]: ImageEditorCanvasConfig[];
    [ImageEditorControls.Slider]: ImageEditorSliderConfig[];
    [ImageEditorControls.Textfield]: ImageEditorTextfieldConfig[];
    [ImageEditorControls.Toggle]: ImageEditorToggleConfig[];
  }
>;
export type ImageEditorVignetteFilter = ImageEditorFilterDefinition<
  typeof ImageEditorVignetteIds,
  ImageEditorVignetteSettings,
  {
    [ImageEditorControls.Slider]: ImageEditorSliderConfig[];
    [ImageEditorControls.Textfield]: ImageEditorTextfieldConfig[];
    [ImageEditorControls.Toggle]: ImageEditorToggleConfig[];
  }
>;
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
export type ImageEditorFilter =
  | ImageEditorBrightnessFilter
  | ImageEditorBrushFilter
  | ImageEditorClarityFilter
  | ImageEditorContrastFilter
  | ImageEditorDesaturateFilter
  | ImageEditorGaussianBlurFilter
  | ImageEditorLineFilter
  | ImageEditorVignetteFilter;
//#endregion
