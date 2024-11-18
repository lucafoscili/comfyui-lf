import { KulDataDataset } from '../ketchup-lite/components';
import {
  BaseWidgetCallback,
  BaseWidgetFactory,
  BaseWidgetOptions,
  CustomWidgetName,
} from '../widgets';

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
  Slider = 'slider',
  Textfield = 'textfield',
  Toggle = 'toggle',
}
export enum ImageEditorSliderIds {
  BlurKernelSize = 'blur_kernel_size',
  ClarityStrength = 'clarity_strength',
  SharpenAmount = 'sharpen_amount',
  Intensity = 'intensity',
  Radius = 'radius',
  DesaturationLevel = 'desaturation_level',
}
export enum ImageEditorTextfieldIds {
  Color = 'color',
}
export enum ImageEditorToggleIds {
  Shape = 'shape',
}
export type ImageEditorControlIds =
  | ImageEditorSliderIds
  | ImageEditorTextfieldIds
  | ImageEditorToggleIds;
export type ImageEditorControlValue = string | number | boolean;
export interface ImageEditorFilterSettings {
  [key: string]: number | boolean | string;
}
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
  clarity: ImageEditorClaritySettings;
  desaturate: ImageEditorDesaturateSettings;
  vignette: ImageEditorVignetteSettings;
}
export interface ImageEditorClaritySettings extends ImageEditorFilterSettings {
  clarity_strength: number;
  sharpen_amount: number;
  blur_kernel_size: number;
}
export interface ImageEditorDesaturateSettings extends ImageEditorFilterSettings {
  desaturation_level: number;
}
export interface ImageEditorVignetteSettings extends ImageEditorFilterSettings {
  intensity: number;
  radius: number;
  shape: boolean;
}
export enum ImageEditorClarityIds {
  BlurKernelSize = 'blur_kernel_size',
  ClarityStrength = 'clarity_strength',
  SharpenAmount = 'sharpen_amount',
}
export enum ImageEditorDesaturateIds {
  DesaturationLevels = 'desaturation_level',
}
export enum ImageEditorVignetteIds {
  Color = 'color',
  Intensity = 'intensity',
  Radius = 'radius',
  Shape = 'shape',
}
export type ImageEditorFilterType = keyof ImageEditorFilterSettingsMap;
export interface ImageEditorFilterDefinition<
  ControlIdsEnum extends { [key: string]: string },
  Settings extends ImageEditorFilterSettings,
  Configs extends ImageEditorSettingsFor,
> {
  controlIds: ControlIdsEnum;
  settings: Settings;
  configs: Configs;
}
export type ImageEditorClarityFilter = ImageEditorFilterDefinition<
  typeof ImageEditorClarityIds,
  ImageEditorClaritySettings,
  {
    [ImageEditorControls.Slider]: ImageEditorSliderConfig[];
  }
>;
export type ImageEditorDesaturateFilter = ImageEditorFilterDefinition<
  typeof ImageEditorDesaturateIds,
  ImageEditorDesaturateSettings,
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
  clarity: ImageEditorClarityFilter;
  desaturate: ImageEditorDesaturateFilter;
  vignette: ImageEditorVignetteFilter;
};
export type ImageEditorFilter =
  | ImageEditorClarityFilter
  | ImageEditorDesaturateFilter
  | ImageEditorVignetteFilter;
//#endregion
