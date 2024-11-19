import { KulEventName } from '../types/events/events';
import { KulButtonEventPayload } from '../types/ketchup-lite/components';
import { KulButton } from '../types/ketchup-lite/components/kul-button/kul-button';
import {
  CustomWidgetDeserializedValuesMap,
  CustomWidgetName,
  NormalizeValueCallback,
  TagName,
} from '../types/widgets/_common';
import {
  CountBarChartDeserializedValue,
  CountBarChartFactory,
} from '../types/widgets/countBarChart';
import { createDOMWidget, normalizeValue } from '../utils/common';

const BASE_CSS_CLASS = 'lf-countbarchart';
const TYPE = CustomWidgetName.countBarChart;
const DEF_ICON = 'content_copy';
const DEF_LABEL = 'Copy selected';

let TIMEOUT: NodeJS.Timeout;

//#region Count bar chart
export const countBarChartFactory: CountBarChartFactory = {
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
          chart: chart.kulData || {},
          chip: chip.kulData || {},
        };
      },
      setValue(value) {
        const callback: NormalizeValueCallback<
          CustomWidgetDeserializedValuesMap<typeof TYPE> | string
        > = (_, u) => {
          const json = u.parsedJson as CountBarChartDeserializedValue;
          chart.kulData = json.chart || {};
          chip.kulData = json.chip || {};
          button.classList.remove(countBarChartFactory.cssClasses.buttonHidden);
        };
        const onException = () => {
          button.classList.add(countBarChartFactory.cssClasses.buttonHidden);
        };

        normalizeValue(value, callback, TYPE, onException);
      },
    };
  },
  render: (node) => {
    const wrapper = document.createElement(TagName.Div);
    const content = document.createElement(TagName.Div);
    const grid = document.createElement(TagName.Div);
    const chart = document.createElement(TagName.KulChart);
    const chip = document.createElement(TagName.KulChip);
    const button = document.createElement(TagName.KulButton);
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
    button.addEventListener(KulEventName.KulButton, (e) => {
      copy(e, chip);
    });

    grid.appendChild(chart);
    grid.appendChild(chip);
    grid.appendChild(button);

    content.appendChild(grid);
    wrapper.appendChild(content);

    return { widget: createDOMWidget(TYPE, wrapper, node, options) };
  },
};

const copy = async (e: CustomEvent<KulButtonEventPayload>, chip: HTMLKulChipElement) => {
  const { comp, eventType } = e.detail;

  if (eventType === 'pointerdown') {
    const button = comp;
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
//#endregion
