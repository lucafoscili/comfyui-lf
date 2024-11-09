import { KulDataDataset } from '../types/ketchup-lite/components';
import { FilterSettingsMap, FilterType, SliderConfig, TREE_DATA_IDS } from '../types/manager';

const SETTINGS: {
  [K in FilterType]: { slider: SliderConfig<Extract<keyof FilterSettingsMap[K], string>>[] };
} = {
  clarity: {
    slider: [
      {
        ariaLabel: 'Clarity strength',
        defaultValue: '0.5',
        id: 'clarity_strength',
        max: '5',
        min: '0',
        step: '0.1',
        title: 'Controls the amount of contrast enhancement in midtones.',
      },
      {
        ariaLabel: 'Sharpen amount',
        max: '5',
        min: '0',
        id: 'sharpen_amount',
        defaultValue: '1.0',
        step: '0.1',
        title: 'Controls how much sharpening is applied to the image.',
      },
      {
        ariaLabel: 'Blur kernel size',
        max: '15',
        min: '1',
        id: 'blur_kernel_size',
        defaultValue: '7',
        step: '2',
        title: 'Controls the size of the Gaussian blur kernel. Higher values mean more smoothing.',
      },
    ],
  },
  vignette: {
    slider: [
      // Define vignette sliders here, following the same pattern
    ],
  },
};

export const TREE_DATA: KulDataDataset = {
  nodes: [
    {
      id: 'basic_adjustments',
      value: 'Basic Adjustments',
      icon: 'settings',
      children: [
        {
          cells: { kulCode: { shape: 'code', value: JSON.stringify(SETTINGS.clarity) } },
          id: TREE_DATA_IDS.Clarity,
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
          cells: { kulCode: { shape: 'code', value: JSON.stringify({}) } },
          id: TREE_DATA_IDS.Vignette,
          value: 'Vignette',
        },
      ],
    },
  ],
};
