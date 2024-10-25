import { KulButtonEventPayload } from '../types/ketchup-lite/components';
import { KulButton } from '../types/ketchup-lite/components/kul-button/kul-button';
import {
  CountBarChartWidgetDeserializedValue,
  CountBarChartWidgetFactory,
  CustomWidgetDeserializedValuesMap,
  CustomWidgetName,
  NormalizeValueCallback,
} from '../types/widgets';
import { createDOMWidget, normalizeValue } from '../utils/common';

const BASE_CSS_CLASS = 'lf-countbarchart';
const TYPE = CustomWidgetName.countBarChart;
const DEF_ICON = 'content_copy';
const DEF_LABEL = 'Copy selected';
let TIMEOUT: NodeJS.Timeout;

export const countBarChartFactory: CountBarChartWidgetFactory = {
  cssClasses: {
    content: BASE_CSS_CLASS,
    grid: `${BASE_CSS_CLASS}__grid`,
    chart: `${BASE_CSS_CLASS}__chart`,
    chip: `${BASE_CSS_CLASS}__chip`,
    button: `${BASE_CSS_CLASS}__button`,
    buttonHidden: `${BASE_CSS_CLASS}__button--hidden`,
  },
  options: (chart, chip, button) => {
    return {
      hideOnZoom: true,
      getComp() {
        return { chart, chip, button };
      },
      getValue() {
        return {
          chartDataset: chart.kulData || {},
          chipDataset: chip.kulData || {},
        };
      },
      setValue(value) {
        const callback: NormalizeValueCallback<
          CustomWidgetDeserializedValuesMap<typeof TYPE> | string
        > = (_, u) => {
          const { chartDataset, chipDataset } =
            u.parsedJson as CountBarChartWidgetDeserializedValue;
          chart.kulData = chartDataset || {};
          chip.kulData = chipDataset || {};
          button.classList.remove(countBarChartFactory.cssClasses.buttonHidden);
        };
        const onException = () => {
          button.classList.add(countBarChartFactory.cssClasses.buttonHidden);
        };

        normalizeValue(value, callback, TYPE, onException);
      },
    };
  },
  render: (node, name) => {
    const wrapper = document.createElement('div');
    const content = document.createElement('div');
    const grid = document.createElement('div');
    const chart = document.createElement('kul-chart');
    const chip = document.createElement('kul-chip');
    const button = document.createElement('kul-button');
    const options = countBarChartFactory.options(chart, chip, button);

    content.classList.add(countBarChartFactory.cssClasses.content);
    grid.classList.add(countBarChartFactory.cssClasses.grid);
    chart.classList.add(countBarChartFactory.cssClasses.chart);
    chip.classList.add(countBarChartFactory.cssClasses.chip);
    button.classList.add(countBarChartFactory.cssClasses.button);
    button.classList.add(countBarChartFactory.cssClasses.buttonHidden);
    button.classList.add('kul-full-width');

    chart.kulAxis = 'Axis_0';
    chart.kulLegend = 'hidden';
    chart.kulSeries = ['Series_0'];
    chart.kulTypes = ['bar'];

    chip.kulStyle = '#kul-component .chip-set { height: auto; }';
    chip.kulStyling = 'filter';

    button.kulIcon = DEF_ICON;
    button.kulLabel = DEF_LABEL;
    button.kulStyling = 'flat';
    button.addEventListener('kul-button-event', (e) => {
      copy(e, chip);
    });

    grid.appendChild(chart);
    grid.appendChild(chip);
    grid.appendChild(button);

    content.appendChild(grid);
    wrapper.appendChild(content);

    return { widget: createDOMWidget(name, TYPE, wrapper, node, options) };
  },
};

const copy = async (e: CustomEvent<KulButtonEventPayload>, chip: HTMLKulChipElement) => {
  const { comp, eventType } = e.detail;

  if (eventType === 'pointerdown') {
    const button = comp as KulButton;
    const selectedChips: string[] = [];
    (await chip.getSelectedNodes()).forEach((n) => {
      selectedChips.push(n.id);
    });
    navigator.clipboard.writeText(selectedChips.join(', '));

    button.kulLabel = 'Copied!';
    button.kulIcon = 'check';

    if (TIMEOUT) {
      clearTimeout(TIMEOUT);
    }

    TIMEOUT = setTimeout(() => {
      button.kulLabel = DEF_LABEL;
      button.kulIcon = DEF_ICON;
      TIMEOUT = null;
    }, 1000);
  }
};
