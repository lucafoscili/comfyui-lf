import { CustomWidgetName, } from './_common.js';
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
    ImageEditorSliderIds["BlurKernelSize"] = "blur_kernel_size";
    ImageEditorSliderIds["ClarityStrength"] = "clarity_strength";
    ImageEditorSliderIds["SharpenAmount"] = "sharpen_amount";
    ImageEditorSliderIds["Intensity"] = "intensity";
    ImageEditorSliderIds["Radius"] = "radius";
    ImageEditorSliderIds["DesaturationLevel"] = "desaturation_level";
})(ImageEditorSliderIds || (ImageEditorSliderIds = {}));
export var ImageEditorTextfieldIds;
(function (ImageEditorTextfieldIds) {
    ImageEditorTextfieldIds["Color"] = "color";
})(ImageEditorTextfieldIds || (ImageEditorTextfieldIds = {}));
export var ImageEditorToggleIds;
(function (ImageEditorToggleIds) {
    ImageEditorToggleIds["Shape"] = "shape";
})(ImageEditorToggleIds || (ImageEditorToggleIds = {}));
export var ImageEditorClarityIds;
(function (ImageEditorClarityIds) {
    ImageEditorClarityIds["BlurKernelSize"] = "blur_kernel_size";
    ImageEditorClarityIds["ClarityStrength"] = "clarity_strength";
    ImageEditorClarityIds["SharpenAmount"] = "sharpen_amount";
})(ImageEditorClarityIds || (ImageEditorClarityIds = {}));
export var ImageEditorDesaturateIds;
(function (ImageEditorDesaturateIds) {
    ImageEditorDesaturateIds["DesaturationLevels"] = "desaturation_level";
})(ImageEditorDesaturateIds || (ImageEditorDesaturateIds = {}));
export var ImageEditorVignetteIds;
(function (ImageEditorVignetteIds) {
    ImageEditorVignetteIds["Color"] = "color";
    ImageEditorVignetteIds["Intensity"] = "intensity";
    ImageEditorVignetteIds["Radius"] = "radius";
    ImageEditorVignetteIds["Shape"] = "shape";
})(ImageEditorVignetteIds || (ImageEditorVignetteIds = {}));
//#endregion