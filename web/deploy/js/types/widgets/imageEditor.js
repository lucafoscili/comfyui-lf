//#region CSS
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
    ImageEditorCSS["SettingsControls"] = "lf-imageeditor__settings__controls";
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
export var ImageEditorControls;
(function (ImageEditorControls) {
    ImageEditorControls["Canvas"] = "canvas";
    ImageEditorControls["Slider"] = "slider";
    ImageEditorControls["Textfield"] = "textfield";
    ImageEditorControls["Toggle"] = "toggle";
})(ImageEditorControls || (ImageEditorControls = {}));
export var ImageEditorCanvasIds;
(function (ImageEditorCanvasIds) {
    ImageEditorCanvasIds["B64Canvas"] = "b64_canvas";
    ImageEditorCanvasIds["Points"] = "points";
})(ImageEditorCanvasIds || (ImageEditorCanvasIds = {}));
export var ImageEditorSliderIds;
(function (ImageEditorSliderIds) {
    ImageEditorSliderIds["BlueChannel"] = "b_channel";
    ImageEditorSliderIds["BlurKernelSize"] = "blur_kernel_size";
    ImageEditorSliderIds["BlurSigma"] = "blur_sigma";
    ImageEditorSliderIds["Strength"] = "strength";
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
    ImageEditorToggleIds["Localized"] = "localized";
    ImageEditorToggleIds["Shape"] = "shape";
    ImageEditorToggleIds["Smooth"] = "smoooth";
})(ImageEditorToggleIds || (ImageEditorToggleIds = {}));
export var ImageEditorBlendIds;
(function (ImageEditorBlendIds) {
    ImageEditorBlendIds["Opacity"] = "opacity";
})(ImageEditorBlendIds || (ImageEditorBlendIds = {}));
export var ImageEditorBrightnessIds;
(function (ImageEditorBrightnessIds) {
    ImageEditorBrightnessIds["Strength"] = "strength";
    ImageEditorBrightnessIds["Gamma"] = "gamma";
    ImageEditorBrightnessIds["Midpoint"] = "midpoint";
    ImageEditorBrightnessIds["Localized"] = "localized";
})(ImageEditorBrightnessIds || (ImageEditorBrightnessIds = {}));
export var ImageEditorBrushIds;
(function (ImageEditorBrushIds) {
    ImageEditorBrushIds["B64Canvas"] = "b64_canvas";
    ImageEditorBrushIds["Color"] = "color";
    ImageEditorBrushIds["Opacity"] = "opacity";
    ImageEditorBrushIds["Size"] = "size";
})(ImageEditorBrushIds || (ImageEditorBrushIds = {}));
export var ImageEditorClarityIds;
(function (ImageEditorClarityIds) {
    ImageEditorClarityIds["BlurKernelSize"] = "blur_kernel_size";
    ImageEditorClarityIds["Strength"] = "strength";
    ImageEditorClarityIds["SharpenAmount"] = "sharpen_amount";
})(ImageEditorClarityIds || (ImageEditorClarityIds = {}));
export var ImageEditorContrastIds;
(function (ImageEditorContrastIds) {
    ImageEditorContrastIds["Strength"] = "strength";
    ImageEditorContrastIds["Localized"] = "contrast";
    ImageEditorContrastIds["Midpoint"] = "midpoint";
})(ImageEditorContrastIds || (ImageEditorContrastIds = {}));
export var ImageEditorDesaturateIds;
(function (ImageEditorDesaturateIds) {
    ImageEditorDesaturateIds["RedChannel"] = "r_channel";
    ImageEditorDesaturateIds["GreenChannel"] = "g_channel";
    ImageEditorDesaturateIds["BlueChannel"] = "b_channel";
    ImageEditorDesaturateIds["Strength"] = "strength";
})(ImageEditorDesaturateIds || (ImageEditorDesaturateIds = {}));
export var ImageEditorGaussianBlurIds;
(function (ImageEditorGaussianBlurIds) {
    ImageEditorGaussianBlurIds["BlurKernelSize"] = "blur_kernel_size";
    ImageEditorGaussianBlurIds["BlurSigma"] = "blur_sigma";
})(ImageEditorGaussianBlurIds || (ImageEditorGaussianBlurIds = {}));
export var ImageEditorLineIds;
(function (ImageEditorLineIds) {
    ImageEditorLineIds["Color"] = "color";
    ImageEditorLineIds["Opacity"] = "opacity";
    ImageEditorLineIds["Points"] = "points";
    ImageEditorLineIds["Size"] = "size";
    ImageEditorLineIds["Smooth"] = "smooth";
})(ImageEditorLineIds || (ImageEditorLineIds = {}));
export var ImageEditorSepiaIds;
(function (ImageEditorSepiaIds) {
    ImageEditorSepiaIds["Intensity"] = "intensity";
})(ImageEditorSepiaIds || (ImageEditorSepiaIds = {}));
export var ImageEditorVignetteIds;
(function (ImageEditorVignetteIds) {
    ImageEditorVignetteIds["Color"] = "color";
    ImageEditorVignetteIds["Intensity"] = "intensity";
    ImageEditorVignetteIds["Radius"] = "radius";
    ImageEditorVignetteIds["Shape"] = "shape";
})(ImageEditorVignetteIds || (ImageEditorVignetteIds = {}));
//#endregion
