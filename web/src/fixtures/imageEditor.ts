import { KulDataDataset } from '../types/ketchup-lite/components';
import { ImageEditorWidgetSettings } from '../types/widgets';

//#region Settings
const SETTINGS: ImageEditorWidgetSettings = {
  clarity: {
    slider: [
      {
        ariaLabel: 'Clarity Strength',
        defaultValue: '0',
        id: 'clarity_strength',
        max: '5',
        min: '0',
        step: '0.1',
        title: 'Controls the amount of contrast enhancement in midtones.',
      },
      {
        ariaLabel: 'Sharpen Amount',
        defaultValue: '0',
        id: 'sharpen_amount',
        max: '5',
        min: '0',
        step: '0.1',
        title: 'Controls how much sharpening is applied to the image.',
      },
      {
        ariaLabel: 'Blur Kernel Size',
        defaultValue: '0',
        id: 'blur_kernel_size',
        max: '15',
        min: '1',
        step: '2',
        title: 'Controls the size of the Gaussian blur kernel. Higher values mean more smoothing.',
      },
    ],
  },
  vignette: {
    slider: [
      {
        ariaLabel: 'Vignette Intensity',
        defaultValue: '0',
        id: 'vignette_intensity',
        max: '100',
        min: '0',
        step: '1',
        title: 'Controls the intensity of the vignette effect.',
      },
    ],
  },
};
//#endregion
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
