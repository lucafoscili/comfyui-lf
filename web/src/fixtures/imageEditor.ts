import { KulDataDataset } from '../types/ketchup-lite/components';
import {
  ImageEditorBlendIds,
  ImageEditorBrightnessIds,
  ImageEditorBrushIds,
  ImageEditorClarityIds,
  ImageEditorContrastIds,
  ImageEditorControls,
  ImageEditorDesaturateIds,
  ImageEditorFilmGrainIds,
  ImageEditorFilters,
  ImageEditorGaussianBlurIds,
  ImageEditorLineIds,
  ImageEditorSepiaIds,
  ImageEditorSliderIds,
  ImageEditorTextfieldIds,
  ImageEditorToggleIds,
  ImageEditorVignetteIds,
} from '../types/widgets/imageEditor';

export const SETTINGS: ImageEditorFilters = {
  //#region Blend
  blend: {
    controlIds: ImageEditorBlendIds,
    settings: {
      color: '#FF0000',
      opacity: 0.5,
    },
    configs: {
      [ImageEditorControls.Slider]: [
        {
          ariaLabel: 'Opacity',
          controlType: ImageEditorControls.Slider,
          defaultValue: 0,
          id: ImageEditorSliderIds.Opacity,
          isMandatory: true,
          max: '1',
          min: '0',
          step: '0.01',
          title: 'Adjust the opacity of the blended layer.',
        },
      ],
      [ImageEditorControls.Textfield]: [
        {
          ariaLabel: 'Color',
          controlType: ImageEditorControls.Textfield,
          defaultValue: '#FF0000',
          id: ImageEditorTextfieldIds.Color,
          isMandatory: true,
          title: 'Sets the solid color that will be blended onto the image.',
          type: 'color',
        },
      ],
    },
  },
  //#endregion

  //#region Brightness
  brightness: {
    controlIds: ImageEditorBrightnessIds,
    settings: {
      strength: 0,
      gamma: 0,
      localized: false,
      midpoint: 0.5,
    },
    configs: {
      [ImageEditorControls.Slider]: [
        {
          ariaLabel: 'Brightness Strength',
          controlType: ImageEditorControls.Slider,
          defaultValue: 0,
          id: ImageEditorSliderIds.Strength,
          isMandatory: true,
          max: '1',
          min: '-1',
          step: '0.05',
          title:
            'Adjust the brightness of the image. Negative values darken, positive values brighten.',
        },
        {
          ariaLabel: 'Gamma',
          controlType: ImageEditorControls.Slider,
          defaultValue: 1,
          id: ImageEditorSliderIds.Gamma,
          max: '3',
          min: '0.1',
          step: '0.1',
          title: 'Adjust the gamma correction. Values < 1 brighten shadows, > 1 darken highlights.',
        },
        {
          ariaLabel: 'Midpoint',
          controlType: ImageEditorControls.Slider,
          defaultValue: 0.5,
          id: ImageEditorSliderIds.Midpoint,
          max: '1',
          min: '0',
          step: '0.05',
          title: 'Defines the tonal midpoint for brightness scaling.',
        },
      ],
      [ImageEditorControls.Toggle]: [
        {
          ariaLabel: 'Localized Brightness',
          controlType: ImageEditorControls.Toggle,
          defaultValue: false,
          id: ImageEditorToggleIds.Localized,
          off: 'false',
          on: 'true',
          title: 'Enhance brightness locally in darker regions.',
        },
      ],
    },
  },
  //#endregion

  //#region Brush
  brush: {
    controlIds: ImageEditorBrushIds,
    hasCanvasAction: true,
    settings: { b64_canvas: '', color: '#FF0000', opacity: 1, size: 10 },
    configs: {
      [ImageEditorControls.Slider]: [
        {
          ariaLabel: 'Size',
          controlType: ImageEditorControls.Slider,
          defaultValue: 10,
          id: ImageEditorSliderIds.Size,
          isMandatory: true,
          max: '500',
          min: '1',
          step: '1',
          title: 'Sets the size of the brush.',
        },
        {
          ariaLabel: 'Opacity',
          controlType: ImageEditorControls.Slider,
          defaultValue: 1,
          id: ImageEditorSliderIds.Opacity,
          isMandatory: true,
          max: '1',
          min: '0.05',
          step: '0.05',
          title: 'Sets the opacity of the brush.',
        },
      ],
      [ImageEditorControls.Textfield]: [
        {
          ariaLabel: 'Color',
          controlType: ImageEditorControls.Textfield,
          defaultValue: '#FF0000',
          id: ImageEditorTextfieldIds.Color,
          isMandatory: true,
          title: 'Sets the color of the brush stroke.',
          type: 'color',
        },
      ],
    },
  },
  //#endregion

  //#region Clarity
  clarity: {
    controlIds: ImageEditorClarityIds,
    settings: {
      strength: 0,
      sharpen_amount: 0,
      blur_kernel_size: 1,
    },
    configs: {
      [ImageEditorControls.Slider]: [
        {
          ariaLabel: 'Clarity Strength',
          controlType: ImageEditorControls.Slider,
          defaultValue: 0,
          id: ImageEditorSliderIds.Strength,
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
          defaultValue: 7,
          id: ImageEditorSliderIds.BlurKernelSize,
          max: '15',
          min: '1',
          step: '2',
          title:
            'Controls the size of the Gaussian blur kernel. Higher values mean more smoothing.',
        },
      ],
    },
  },
  //#endregion

  //#region Contrast
  contrast: {
    controlIds: ImageEditorContrastIds,
    settings: {
      strength: 0,
      localized: false,
      midpoint: 0,
    },
    configs: {
      [ImageEditorControls.Slider]: [
        {
          ariaLabel: 'Contrast Strength',
          controlType: ImageEditorControls.Slider,
          defaultValue: 0,
          id: ImageEditorSliderIds.Strength,
          isMandatory: true,
          max: '1',
          min: '-1',
          step: '0.05',
          title:
            'Controls the intensity of the contrast adjustment. 1.0 is no change, below 1 reduces contrast, above 1 increases contrast.',
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
          id: ImageEditorToggleIds.Localized,
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
      strength: 0,
    },
    configs: {
      slider: [
        {
          ariaLabel: 'Desaturation strength',
          controlType: ImageEditorControls.Slider,
          defaultValue: 0,
          id: ImageEditorSliderIds.Strength,
          isMandatory: true,
          max: '1',
          min: '0',
          step: '0.05',
          title:
            'Controls the total intensity of the desaturation. 0 is no effect, 1 is fully desaturated.',
        },
        {
          ariaLabel: 'Red channel level',
          controlType: ImageEditorControls.Slider,
          defaultValue: 1,
          id: ImageEditorSliderIds.RedChannel,
          max: '1',
          min: '0',
          step: '0.05',
          title:
            'Controls the intensity of the red channel desaturation relative to the total strength of the filter.',
        },
        {
          ariaLabel: 'Green channel level',
          controlType: ImageEditorControls.Slider,
          defaultValue: 1,
          id: ImageEditorSliderIds.GreenChannel,
          max: '1',
          min: '0',
          step: '0.05',
          title:
            'Controls the intensity of the green channel desaturation relative to the total strength of the filter.',
        },
        {
          ariaLabel: 'Blue channel level',
          controlType: ImageEditorControls.Slider,
          defaultValue: 1,
          id: ImageEditorSliderIds.BlueChannel,
          max: '1',
          min: '0',
          step: '0.05',
          title:
            'Controls the intensity of the blue channel desaturation relative to the total strength of the filter.',
        },
      ],
    },
  },
  //#endregion

  //#region Film grain
  filmGrain: {
    controlIds: ImageEditorFilmGrainIds,
    settings: { intensity: 0, size: 1, soft_blend: false, tint: '#FFFFFF' },
    configs: {
      [ImageEditorControls.Slider]: [
        {
          ariaLabel: 'Intensity',
          controlType: ImageEditorControls.Slider,
          defaultValue: 0,
          id: ImageEditorSliderIds.Intensity,
          isMandatory: true,
          max: '1',
          min: '0',
          step: '0.05',
          title: 'Sets the strength of the filter.',
        },
        {
          ariaLabel: 'Size',
          controlType: ImageEditorControls.Slider,
          defaultValue: 1,
          id: ImageEditorSliderIds.Size,
          isMandatory: true,
          max: '5',
          min: '0.5',
          step: '0.1',
          title: "Sets the size of the noise's granularity.",
        },
      ],
      [ImageEditorControls.Textfield]: [
        {
          ariaLabel: 'Tint',
          controlType: ImageEditorControls.Textfield,
          defaultValue: '#FFFFFF',
          id: ImageEditorTextfieldIds.Tint,
          isMandatory: true,
          title: 'Hexadecimal color (default is FFFFFF for no tint).',
          type: 'color',
        },
      ],
      [ImageEditorControls.Toggle]: [
        {
          ariaLabel: 'Soft blend',
          controlType: ImageEditorControls.Toggle,
          defaultValue: false,
          id: ImageEditorToggleIds.SoftBlend,
          title: 'If True, uses a soft blending mode for the grain.',
          off: 'false',
          on: 'true',
        },
      ],
    },
  },
  //#endregion

  //#region Gaussian blur
  gaussianBlur: {
    controlIds: ImageEditorGaussianBlurIds,
    settings: {
      blur_kernel_size: 1,
      blur_sigma: 0,
    },
    configs: {
      [ImageEditorControls.Slider]: [
        {
          ariaLabel: 'Blur Sigma',
          controlType: ImageEditorControls.Slider,
          defaultValue: 0,
          id: ImageEditorSliderIds.BlurSigma,
          max: '10',
          min: '0.1',
          step: '0.1',
          title: 'Standard deviation for the Gaussian kernel. Controls blur intensity.',
        },
        {
          ariaLabel: 'Blur Kernel Size',
          controlType: ImageEditorControls.Slider,
          defaultValue: 7,
          id: ImageEditorSliderIds.BlurKernelSize,
          max: '51',
          min: '1',
          step: '2',
          title:
            'Controls the size of the Gaussian blur kernel. Higher values mean more smoothing.',
        },
      ],
    },
  },
  //#endregion

  //#region Line
  line: {
    controlIds: ImageEditorLineIds,
    hasCanvasAction: true,
    settings: { color: '#FF0000', opacity: 1, points: [], size: 10, smooth: false },
    configs: {
      [ImageEditorControls.Canvas]: [],
      [ImageEditorControls.Slider]: [
        {
          ariaLabel: 'Size',
          controlType: ImageEditorControls.Slider,
          defaultValue: 10,
          id: ImageEditorSliderIds.Size,
          isMandatory: true,
          max: '500',
          min: '1',
          step: '1',
          title: 'Sets the size of the brush.',
        },
        {
          ariaLabel: 'Opacity',
          controlType: ImageEditorControls.Slider,
          defaultValue: 1,
          id: ImageEditorSliderIds.Opacity,
          isMandatory: true,
          max: '1',
          min: '0.05',
          step: '0.05',
          title: 'Sets the opacity of the brush.',
        },
      ],
      [ImageEditorControls.Textfield]: [
        {
          ariaLabel: 'Color',
          controlType: ImageEditorControls.Textfield,
          defaultValue: '#FF0000',
          id: ImageEditorTextfieldIds.Color,
          isMandatory: true,
          title: 'Sets the color of the brush stroke.',
          type: 'color',
        },
      ],
      [ImageEditorControls.Toggle]: [
        {
          ariaLabel: 'Smooth',
          controlType: ImageEditorControls.Toggle,
          defaultValue: false,
          id: ImageEditorToggleIds.Smooth,
          title: 'Draws a smooth line.',
          off: 'false',
          on: 'true',
        },
      ],
    },
  },
  //#endregion

  //#region Sepia
  sepia: {
    controlIds: ImageEditorSepiaIds,
    settings: {
      intensity: 0,
    },
    configs: {
      [ImageEditorControls.Slider]: [
        {
          ariaLabel: 'Sepia Intensity',
          controlType: ImageEditorControls.Slider,
          defaultValue: 0,
          id: ImageEditorSliderIds.Intensity,
          isMandatory: true,
          max: '1',
          min: '0',
          step: '0.01',
          title: 'Controls the intensity of the sepia effect.',
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

export const TREE_DATA: KulDataDataset = {
  nodes: [
    {
      description: 'Tool configuration.',
      id: 'settings',
      icon: 'wrench',
      value: 'Settings',
      children: [
        //#region Brush
        {
          description: 'Brush configuration.',
          cells: {
            kulCode: {
              shape: 'code',
              value: JSON.stringify(SETTINGS.brush),
            },
          },
          id: 'brush',
          value: 'Brush',
        },
        //#endregion
      ],
    },
    {
      description: 'Basic adjustments such as sharpening and color tuning.',
      id: 'basic_adjustments',
      value: 'Basic Adjustments',
      icon: 'settings',
      children: [
        //#region Brightness
        {
          description: 'Adjusts the brightness.',
          cells: {
            kulCode: {
              shape: 'code',
              value: JSON.stringify(SETTINGS.brightness),
            },
          },
          id: 'brightness',
          value: 'Brightness',
        },
        //#endregion

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
      description: 'Artistic filters, such as vignette effect and gaussian blur.',
      id: 'creative_effects',
      icon: 'palette',
      value: 'Creative Effects',
      children: [
        //#region Blend
        {
          cells: {
            kulCode: {
              shape: 'code',
              value: JSON.stringify(SETTINGS.blend),
            },
          },
          description: 'Blends a color layer onto the image.',
          id: 'blend',
          value: 'Blend',
        },
        //#endregion

        //#region Film grain
        {
          description: 'Applies a film grain effect.',
          cells: {
            kulCode: {
              shape: 'code',
              value: JSON.stringify(SETTINGS.filmGrain),
            },
          },
          id: 'film_grain',
          value: 'Film grain',
        },
        //#endregion

        //#region Gaussian blur
        {
          description: 'Blurs the image.',
          cells: {
            kulCode: {
              shape: 'code',
              value: JSON.stringify(SETTINGS.gaussianBlur),
            },
          },
          id: 'gaussian_blur',
          value: 'Gaussian blur',
        },
        //#endregion

        //#region Line
        {
          description: 'Draws a line.',
          cells: {
            kulCode: {
              shape: 'code',
              value: JSON.stringify(SETTINGS.line),
            },
          },
          id: 'line',
          value: 'Line',
        },
        //#endregion

        //#region Sepia
        {
          cells: {
            kulCode: {
              shape: 'code',
              value: JSON.stringify(SETTINGS.sepia),
            },
          },
          description: 'Applies a sepia effect to the image.',
          id: 'sepia',
          value: 'Sepia',
        },
        //#endregion

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
