import { ImageEditorClarityIds, ImageEditorContrastIds, ImageEditorControls, ImageEditorDesaturateIds, ImageEditorSliderIds, ImageEditorTextfieldIds, ImageEditorToggleIds, ImageEditorVignetteIds, } from '../types/widgets/imageEditor.js';
const SETTINGS = {
    //#region Clarity
    clarity: {
        controlIds: ImageEditorClarityIds,
        settings: {
            clarity_strength: 0,
            sharpen_amount: 0,
            blur_kernel_size: 1,
        },
        configs: {
            [ImageEditorControls.Slider]: [
                {
                    ariaLabel: 'Clarity Strength',
                    controlType: ImageEditorControls.Slider,
                    defaultValue: 0,
                    id: ImageEditorSliderIds.ClarityStrength,
                    isMandatory: true,
                    max: '5',
                    min: '0',
                    step: '0.1',
                    title: 'Controls the amount of contrast enhancement in midtones.',
                },
                {
                    ariaLabel: 'Sharpen Amount',
                    controlType: ImageEditorControls.Slider,
                    defaultValue: 0,
                    id: ImageEditorSliderIds.SharpenAmount,
                    max: '5',
                    min: '0',
                    step: '0.1',
                    title: 'Controls how much sharpening is applied to the image.',
                },
                {
                    ariaLabel: 'Blur Kernel Size',
                    controlType: ImageEditorControls.Slider,
                    defaultValue: 1,
                    id: ImageEditorSliderIds.BlurKernelSize,
                    max: '15',
                    min: '1',
                    step: '2',
                    title: 'Controls the size of the Gaussian blur kernel. Higher values mean more smoothing.',
                },
            ],
        },
    },
    //#endregion
    //#region Contrast
    contrast: {
        controlIds: ImageEditorContrastIds,
        settings: {
            contrast_strength: 0,
            localized_contrast: false,
            midpoint: 0,
        },
        configs: {
            [ImageEditorControls.Slider]: [
                {
                    ariaLabel: 'Contrast Strength',
                    controlType: ImageEditorControls.Slider,
                    defaultValue: 0,
                    id: ImageEditorSliderIds.ContrastStrength,
                    isMandatory: true,
                    max: '1',
                    min: '-1',
                    step: '0.05',
                    title: 'Controls the intensity of the contrast adjustment. 1.0 is no change, below 1 reduces contrast, above 1 increases contrast.',
                },
                {
                    ariaLabel: 'Midpoint',
                    controlType: ImageEditorControls.Slider,
                    defaultValue: 0.5,
                    id: ImageEditorSliderIds.Midpoint,
                    max: '1',
                    min: '0',
                    step: '0.05',
                    title: 'Defines the tonal midpoint for contrast scaling.',
                },
            ],
            [ImageEditorControls.Toggle]: [
                {
                    ariaLabel: 'Localized Contrast',
                    controlType: ImageEditorControls.Toggle,
                    defaultValue: false,
                    id: ImageEditorToggleIds.LocalizedContrast,
                    off: 'false',
                    on: 'true',
                    title: 'Apply contrast enhancement locally to edges and textures.',
                },
            ],
        },
    },
    //#endregion
    //#region Desaturate
    desaturate: {
        controlIds: ImageEditorDesaturateIds,
        settings: {
            r_channel: 1,
            g_channel: 1,
            b_channel: 1,
            desaturation_strength: 0,
        },
        configs: {
            slider: [
                {
                    ariaLabel: 'Desaturation strength',
                    controlType: ImageEditorControls.Slider,
                    defaultValue: 0,
                    id: ImageEditorSliderIds.DesaturationStrength,
                    isMandatory: true,
                    max: '1',
                    min: '0',
                    step: '0.05',
                    title: 'Controls the total intensity of the desaturation. 0 is no effect, 1 is fully desaturated.',
                },
                {
                    ariaLabel: 'Red channel level',
                    controlType: ImageEditorControls.Slider,
                    defaultValue: 1,
                    id: ImageEditorSliderIds.RedChannel,
                    max: '1',
                    min: '0',
                    step: '0.05',
                    title: 'Controls the intensity of the red channel desaturation relative to the total strength of the filter.',
                },
                {
                    ariaLabel: 'Green channel level',
                    controlType: ImageEditorControls.Slider,
                    defaultValue: 1,
                    id: ImageEditorSliderIds.GreenChannel,
                    max: '1',
                    min: '0',
                    step: '0.05',
                    title: 'Controls the intensity of the green channel desaturation relative to the total strength of the filter.',
                },
                {
                    ariaLabel: 'Blue channel level',
                    controlType: ImageEditorControls.Slider,
                    defaultValue: 1,
                    id: ImageEditorSliderIds.BlueChannel,
                    max: '1',
                    min: '0',
                    step: '0.05',
                    title: 'Controls the intensity of the blue channel desaturation relative to the total strength of the filter.',
                },
            ],
        },
    },
    //#endregion
    //#region Vignette
    vignette: {
        controlIds: ImageEditorVignetteIds,
        settings: {
            intensity: 0,
            radius: 0,
            shape: false,
            color: '000000',
        },
        configs: {
            [ImageEditorControls.Slider]: [
                {
                    ariaLabel: 'Vignette Intensity',
                    controlType: ImageEditorControls.Slider,
                    defaultValue: 0,
                    id: ImageEditorSliderIds.Intensity,
                    isMandatory: true,
                    max: '1',
                    min: '0',
                    step: '0.05',
                    title: 'Controls the darkness of the vignette effect. Higher values mean darker edges.',
                },
                {
                    ariaLabel: 'Vignette Radius',
                    controlType: ImageEditorControls.Slider,
                    defaultValue: 0,
                    id: ImageEditorSliderIds.Radius,
                    isMandatory: true,
                    max: '1',
                    min: '0',
                    step: '0.05',
                    title: 'Controls the size of the vignette effect. Lower values mean a smaller vignette.',
                },
            ],
            [ImageEditorControls.Textfield]: [
                {
                    ariaLabel: 'Color',
                    controlType: ImageEditorControls.Textfield,
                    defaultValue: '000000',
                    id: ImageEditorTextfieldIds.Color,
                    title: 'Sets the color of the vignette.',
                    type: 'color',
                },
            ],
            [ImageEditorControls.Toggle]: [
                {
                    ariaLabel: 'Circular',
                    controlType: ImageEditorControls.Toggle,
                    defaultValue: false,
                    id: ImageEditorToggleIds.Shape,
                    off: 'elliptical',
                    on: 'circular',
                    title: 'Selects the shape of the vignette effect, defaults to elliptical.',
                },
            ],
        },
    },
    //#endregion
};
export const TREE_DATA = {
    nodes: [
        {
            description: 'Basic adjustments such as sharpening and color tuning.',
            id: 'basic_adjustments',
            value: 'Basic Adjustments',
            icon: 'settings',
            children: [
                //#region Clarity
                {
                    description: 'Simulates the Lightroom clarity effect.',
                    cells: {
                        kulCode: {
                            shape: 'code',
                            value: JSON.stringify(SETTINGS.clarity),
                        },
                    },
                    id: 'clarity',
                    value: 'Clarity',
                },
                //#endregion
                //#region Contrast
                {
                    description: 'Adjusts the contrast.',
                    cells: {
                        kulCode: {
                            shape: 'code',
                            value: JSON.stringify(SETTINGS.contrast),
                        },
                    },
                    id: 'contrast',
                    value: 'Contrast',
                },
                //#endregion
                //#region Desaturate
                {
                    description: 'Reduces the saturation.',
                    cells: {
                        kulCode: {
                            shape: 'code',
                            value: JSON.stringify(SETTINGS.desaturate),
                        },
                    },
                    id: 'desaturate',
                    value: 'Desaturate',
                },
                //#endregion
            ],
        },
        {
            description: 'Artistic filters, such as vignette effect.',
            id: 'creative_effects',
            icon: 'palette',
            value: 'Creative Effects',
            children: [
                //#region Vignette
                {
                    cells: {
                        kulCode: {
                            shape: 'code',
                            value: JSON.stringify(SETTINGS.vignette),
                        },
                    },
                    description: 'Applies a vignetting effect to the image.',
                    id: 'vignette',
                    value: 'Vignette',
                },
                //#endregion
            ],
        },
    ],
};
