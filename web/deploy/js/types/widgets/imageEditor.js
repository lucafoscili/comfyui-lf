import { CustomWidgetName, } from './_common.js';
const BASE_CSS_CLASS = 'lf-imageeditor';
export var ImageEditorCSS;
(function (ImageEditorCSS) {
    ImageEditorCSS["Content"] = "lf-imageeditor";
    ImageEditorCSS["Widget"] = "lf-imageeditor__widget";
    ImageEditorCSS["Actions"] = "lf-imageeditor__actions";
    ImageEditorCSS["Grid"] = "lf-imageeditor__grid";
    ImageEditorCSS["GridHasActions"] = "lf-imageeditor__grid--has-actions";
    ImageEditorCSS["GridIsInactive"] = "lf-imageeditor__grid--is-inactive";
    ImageEditorCSS["Settings"] = "lf-imageeditor__settings";
})(ImageEditorCSS || (ImageEditorCSS = {}));
//#endregion
//#region Dataset
export var ImageEditorStatus;
(function (ImageEditorStatus) {
    ImageEditorStatus["Completed"] = "completed";
    ImageEditorStatus["Pending"] = "pending";
})(ImageEditorStatus || (ImageEditorStatus = {}));
export var ImageEditorColumnId;
(function (ImageEditorColumnId) {
    ImageEditorColumnId["Path"] = "path";
    ImageEditorColumnId["Status"] = "status";
})(ImageEditorColumnId || (ImageEditorColumnId = {}));
export var ImageEditorIcons;
(function (ImageEditorIcons) {
    ImageEditorIcons["Interrupt"] = "stop";
    ImageEditorIcons["Reset"] = "refresh";
    ImageEditorIcons["Resume"] = "play";
})(ImageEditorIcons || (ImageEditorIcons = {}));
//#endregion
//#region Controls
export var ImageEditorControls;
(function (ImageEditorControls) {
    ImageEditorControls["Slider"] = "slider";
    ImageEditorControls["Textfield"] = "textfield";
    ImageEditorControls["Toggle"] = "toggle";
})(ImageEditorControls || (ImageEditorControls = {}));
export var ImageEditorSliderIds;
(function (ImageEditorSliderIds) {
    ImageEditorSliderIds["BlueChannel"] = "b_channel";
    ImageEditorSliderIds["BlurKernelSize"] = "blur_kernel_size";
    ImageEditorSliderIds["BlurSigma"] = "blur_sigma";
    ImageEditorSliderIds["BrightnessStrength"] = "brightness_strength";
    ImageEditorSliderIds["ClarityStrength"] = "clarity_strength";
    ImageEditorSliderIds["ContrastStrength"] = "contrast_strength";
    ImageEditorSliderIds["DesaturationStrength"] = "desaturation_strength";
    ImageEditorSliderIds["Gamma"] = "gamma";
    ImageEditorSliderIds["GreenChannel"] = "g_channel";
    ImageEditorSliderIds["Intensity"] = "intensity";
    ImageEditorSliderIds["Midpoint"] = "midpoint";
    ImageEditorSliderIds["Opacity"] = "opacity";
    ImageEditorSliderIds["Radius"] = "radius";
    ImageEditorSliderIds["RedChannel"] = "r_channel";
    ImageEditorSliderIds["SharpenAmount"] = "sharpen_amount";
    ImageEditorSliderIds["Size"] = "size";
})(ImageEditorSliderIds || (ImageEditorSliderIds = {}));
export var ImageEditorTextfieldIds;
(function (ImageEditorTextfieldIds) {
    ImageEditorTextfieldIds["Color"] = "color";
})(ImageEditorTextfieldIds || (ImageEditorTextfieldIds = {}));
export var ImageEditorToggleIds;
(function (ImageEditorToggleIds) {
    ImageEditorToggleIds["LocalizedBrightness"] = "localized_brightness";
    ImageEditorToggleIds["LocalizedContrast"] = "localized_contrast";
    ImageEditorToggleIds["Shape"] = "shape";
})(ImageEditorToggleIds || (ImageEditorToggleIds = {}));
export var ImageEditorBrightnessIds;
(function (ImageEditorBrightnessIds) {
    ImageEditorBrightnessIds["BrightnessStrength"] = "brightness_strength";
    ImageEditorBrightnessIds["Gamma"] = "gamma";
    ImageEditorBrightnessIds["Midpoint"] = "midpoint";
    ImageEditorBrightnessIds["LocalizedBrightness"] = "localized_brightness";
})(ImageEditorBrightnessIds || (ImageEditorBrightnessIds = {}));
export var ImageEditorClarityIds;
(function (ImageEditorClarityIds) {
    ImageEditorClarityIds["BlurKernelSize"] = "blur_kernel_size";
    ImageEditorClarityIds["ClarityStrength"] = "clarity_strength";
    ImageEditorClarityIds["SharpenAmount"] = "sharpen_amount";
})(ImageEditorClarityIds || (ImageEditorClarityIds = {}));
export var ImageEditorContrastIds;
(function (ImageEditorContrastIds) {
    ImageEditorContrastIds["ContrastStrength"] = "contrast_strength";
    ImageEditorContrastIds["LocalizedContrast"] = "localized_contrast";
    ImageEditorContrastIds["Midpoint"] = "midpoint";
})(ImageEditorContrastIds || (ImageEditorContrastIds = {}));
export var ImageEditorDesaturateIds;
(function (ImageEditorDesaturateIds) {
    ImageEditorDesaturateIds["RedChannel"] = "r_channel";
    ImageEditorDesaturateIds["GreenChannel"] = "g_channel";
    ImageEditorDesaturateIds["BlueChannel"] = "b_channel";
    ImageEditorDesaturateIds["DesaturationStrength"] = "desaturation_strength";
})(ImageEditorDesaturateIds || (ImageEditorDesaturateIds = {}));
export var ImageEditorGaussianBlurIds;
(function (ImageEditorGaussianBlurIds) {
    ImageEditorGaussianBlurIds["BlurKernelSize"] = "blur_kernel_size";
    ImageEditorGaussianBlurIds["BlurSigma"] = "blur_sigma";
})(ImageEditorGaussianBlurIds || (ImageEditorGaussianBlurIds = {}));
export var ImageEditorVignetteIds;
(function (ImageEditorVignetteIds) {
    ImageEditorVignetteIds["Color"] = "color";
    ImageEditorVignetteIds["Intensity"] = "intensity";
    ImageEditorVignetteIds["Radius"] = "radius";
    ImageEditorVignetteIds["Shape"] = "shape";
})(ImageEditorVignetteIds || (ImageEditorVignetteIds = {}));
//#endregion
