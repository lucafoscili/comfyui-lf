import { KulDataDataset } from '../types/ketchup-lite/components';
import {
  ImageEditorWidgetClarityIds,
  ImageEditorWidgetControls,
  ImageEditorWidgetSettings,
  ImageEditorWidgetVignetteIds,
} from '../types/widgets';

const SETTINGS: ImageEditorWidgetSettings = {
  //#region Clarity
  clarity: {
    slider: [
      {
        ariaLabel: 'Clarity Strength',
        controlType: ImageEditorWidgetControls.Slider,
        defaultValue: '0',
        id: ImageEditorWidgetClarityIds.ClarityStrength,
        isMandatory: true,
        max: '5',
        min: '0',
        step: '0.1',
        title: 'Controls the amount of contrast enhancement in midtones.',
      },
      {
        ariaLabel: 'Sharpen Amount',
        controlType: ImageEditorWidgetControls.Slider,
        defaultValue: '0',
        id: ImageEditorWidgetClarityIds.SharpenAmount,
        max: '5',
        min: '0',
        step: '0.1',
        title: 'Controls how much sharpening is applied to the image.',
      },
      {
        ariaLabel: 'Blur Kernel Size',
        controlType: ImageEditorWidgetControls.Slider,
        defaultValue: '1',
        id: ImageEditorWidgetClarityIds.BlurKernelSize,
        max: '15',
        min: '1',
        step: '2',
        title: 'Controls the size of the Gaussian blur kernel. Higher values mean more smoothing.',
      },
    ],
  },
  //#endregion
  //#region Vignette
  vignette: {
    slider: [
      {
        ariaLabel: 'Vignette Intensity',
        controlType: ImageEditorWidgetControls.Slider,
        defaultValue: '0',
        id: ImageEditorWidgetVignetteIds.Intensity,
        isMandatory: true,
        max: '1',
        min: '0',
        step: '0.05',
        title: 'Controls the darkness of the vignette effect. Higher values mean darker edges.',
      },
      {
        ariaLabel: 'Vignette Radius',
        controlType: ImageEditorWidgetControls.Slider,
        defaultValue: '0',
        id: ImageEditorWidgetVignetteIds.Radius,
        isMandatory: true,
        max: '1',
        min: '0',
        step: '0.05',
        title: 'Controls the size of the vignette effect. Lower values mean a smaller vignette.',
      },
    ],
    textfield: [
      {
        ariaLabel: 'Color',
        controlType: ImageEditorWidgetControls.Textfield,
        defaultValue: '000000',
        id: ImageEditorWidgetVignetteIds.Color,
        title: 'Sets the color of the vignette.',
        type: 'color',
      },
    ],
    toggle: [
      {
        ariaLabel: 'Circular',
        controlType: ImageEditorWidgetControls.Toggle,
        defaultValue: false,
        id: ImageEditorWidgetVignetteIds.Shape,
        off: 'elliptical',
        on: 'circular',
        title: 'Selects the shape of the vignette effect, defaults to elliptical.',
      },
    ],
  },
  //#endregion
};

//#region Tree dataset
export const TREE_DATA: KulDataDataset = {
  nodes: [
    {
      id: 'basic_adjustments',
      value: 'Basic Adjustments',
      icon: 'settings',
      children: [
        {
          cells: {
            kulCode: {
              shape: 'code',
              value: JSON.stringify(SETTINGS.clarity),
            },
          },
          id: 'clarity',
          value: 'Clarity',
        },
      ],
    },
    {
      id: 'creative_effects',
      value: 'Creative Effects',
      icon: 'palette',
      children: [
        {
          cells: {
            kulCode: {
              shape: 'code',
              value: JSON.stringify(SETTINGS.vignette),
            },
          },
          id: 'vignette',
          value: 'Vignette',
        },
      ],
    },
  ],
};
//#endregion
