import { KulDataDataset } from '../../types/ketchup-lite/components';
import {
  BaseWidgetState,
  CustomWidgetName,
  NormalizeValueCallback,
  WidgetFactory,
} from './widgets';

//#region CSS
const BASE_CSS_CLASS = 'lf-imageeditor';
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
//#endregion

//#region Widget
export type ImageEditor = Widget<CustomWidgetName.imageEditor>;
export type ImageEditorFactory = WidgetFactory<ImageEditorDeserializedValue, ImageEditorState>;
export type ImageEditorNormalizeCallback = NormalizeValueCallback<
  ImageEditorDeserializedValue | string
>;
//#endregion

//#region Value
export type ImageEditorDeserializedValue = KulDataDataset;
//#endregion

//#region State
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
export type ImageEditorUpdateCallback = (addSnapshot?: boolean) => Promise<void>;
export enum ImageEditorControls {
  Canvas = 'canvas',
  Slider = 'slider',
  Textfield = 'textfield',
  Toggle = 'toggle',
}
export enum ImageEditorCanvasIds {
  B64Canvas = 'b64_canvas',
  Points = 'points',
}
export enum ImageEditorSliderIds {
  BlueChannel = 'b_channel',
  BlurKernelSize = 'blur_kernel_size',
  BlurSigma = 'blur_sigma',
  Strength = 'strength',
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
  Tint = 'tint',
}
export enum ImageEditorToggleIds {
  Localized = 'localized',
  Shape = 'shape',
  Smooth = 'smoooth',
  SoftBlend = 'soft_blend',
}
export type ImageEditorControlIds =
  | ImageEditorCanvasIds
  | ImageEditorSliderIds
  | ImageEditorTextfieldIds
  | ImageEditorToggleIds;
export type ImageEditorControlMap<ID extends ImageEditorControlIds> =
  ID extends ImageEditorCanvasIds
    ? HTMLKulCanvasElement
    : ID extends ImageEditorSliderIds
    ? HTMLKulSliderElement
    : ID extends ImageEditorTextfieldIds
    ? HTMLKulTextfieldElement
    : ID extends ImageEditorToggleIds
    ? HTMLKulToggleElement
    : never;
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
  blend: ImageEditorBlendSettings;
  brightness: ImageEditorBrightnessSettings;
  brush: ImageEditorBrushSettings;
  clarity: ImageEditorClaritySettings;
  contrast: ImageEditorContrastSettings;
  desaturate: ImageEditorDesaturateSettings;
  filmGrain: ImageEditorFilmGrainSettings;
  gaussianBlur: ImageEditorGaussianBlurSettings;
  line: ImageEditorLineSettings;
  sepia: ImageEditorSepiaSettings;
  vignette: ImageEditorVignetteSettings;
}
export interface ImageEditorBlendSettings extends ImageEditorFilterSettings {
  color: string;
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
export interface ImageEditorFilmGrainSettings extends ImageEditorFilterSettings {
  intensity: number;
  size: number;
  tint: string;
  soft_blend: boolean;
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
export interface ImageEditorSepiaSettings extends ImageEditorFilterSettings {
  intensity: number;
}
export interface ImageEditorVignetteSettings extends ImageEditorFilterSettings {
  intensity: number;
  radius: number;
  shape: boolean;
}
export enum ImageEditorBlendIds {
  Opacity = 'opacity',
}
export enum ImageEditorBrightnessIds {
  Strength = 'strength',
  Gamma = 'gamma',
  Midpoint = 'midpoint',
  Localized = 'localized',
}
export enum ImageEditorBrushIds {
  B64Canvas = 'b64_canvas',
  Color = 'color',
  Opacity = 'opacity',
  Size = 'size',
}
export enum ImageEditorClarityIds {
  BlurKernelSize = 'blur_kernel_size',
  Strength = 'strength',
  SharpenAmount = 'sharpen_amount',
}
export enum ImageEditorContrastIds {
  Strength = 'strength',
  Localized = 'contrast',
  Midpoint = 'midpoint',
}
export enum ImageEditorDesaturateIds {
  RedChannel = 'r_channel',
  GreenChannel = 'g_channel',
  BlueChannel = 'b_channel',
  Strength = 'strength',
}
export enum ImageEditorFilmGrainIds {
  Intensity = 'intensity',
  Size = 'size',
  Tint = 'tint',
  SoftBlend = 'soft_blend',
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
export enum ImageEditorSepiaIds {
  Intensity = 'intensity',
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
export type ImageEditorBlendFilter = ImageEditorFilterDefinition<
  typeof ImageEditorBlendIds,
  ImageEditorBlendSettings,
  {
    [ImageEditorControls.Slider]: ImageEditorSliderConfig[];
    [ImageEditorControls.Textfield]: ImageEditorTextfieldConfig[];
  }
>;
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
export type ImageEditorFilmGrainFilter = ImageEditorFilterDefinition<
  typeof ImageEditorFilmGrainIds,
  ImageEditorFilmGrainSettings,
  {
    [ImageEditorControls.Slider]: ImageEditorSliderConfig[];
    [ImageEditorControls.Textfield]: ImageEditorTextfieldConfig[];
    [ImageEditorControls.Toggle]: ImageEditorToggleConfig[];
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
export type ImageEditorSepiaFilter = ImageEditorFilterDefinition<
  typeof ImageEditorSepiaIds,
  ImageEditorSepiaSettings,
  {
    [ImageEditorControls.Slider]: ImageEditorSliderConfig[];
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
  blend: ImageEditorBlendFilter;
  brightness: ImageEditorBrightnessFilter;
  brush: ImageEditorBrushFilter;
  clarity: ImageEditorClarityFilter;
  contrast: ImageEditorContrastFilter;
  desaturate: ImageEditorDesaturateFilter;
  filmGrain: ImageEditorFilmGrainFilter;
  gaussianBlur: ImageEditorGaussianBlurFilter;
  line: ImageEditorLineFilter;
  sepia: ImageEditorSepiaFilter;
  vignette: ImageEditorVignetteFilter;
};
export type ImageEditorFilter =
  | ImageEditorBrightnessFilter
  | ImageEditorBrushFilter
  | ImageEditorClarityFilter
  | ImageEditorContrastFilter
  | ImageEditorDesaturateFilter
  | ImageEditorFilmGrainFilter
  | ImageEditorGaussianBlurFilter
  | ImageEditorLineFilter
  | ImageEditorSepiaFilter
  | ImageEditorVignetteFilter;
//#endregion
