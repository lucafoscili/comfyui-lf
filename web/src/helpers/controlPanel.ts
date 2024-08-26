import type { KulButtonEventPayload, KulListEventPayload } from '../types/ketchup-lite/components';
import { getKulManager, getKulThemes } from '../utils/utils';

const buttonCb = (e: CustomEvent<KulButtonEventPayload>) => {
  if (e.detail.eventType === 'click') {
    getKulManager().theme.randomTheme();
  } else if (e.detail.eventType === 'kul-event') {
    const listEvent = e.detail.originalEvent as CustomEvent<KulListEventPayload>;
    const value = listEvent.detail.node.id;
    getKulManager().theme.set(value);
  }
};

const cssClasses = {
  wrapper: 'lf-controlpanel',
  spinner: 'lf-controlpanel__spinner',
  themes: 'lf-controlpanel__themes',
};

export function createContent(skipSpinner: boolean) {
  const wrapper = document.createElement('div');

  const createSpinnerWidget = () => {
    const spinnerWidget = document.createElement('kul-spinner');
    spinnerWidget.classList.add(cssClasses.spinner);
    spinnerWidget.kulActive = true;
    spinnerWidget.kulLayout = 11;

    return spinnerWidget;
  };

  const createThemeWidget = () => {
    const themesWidget = document.createElement('kul-button');
    themesWidget.classList.add(cssClasses.themes);
    themesWidget.kulData = getKulThemes();
    themesWidget.addEventListener('kul-button-event', buttonCb);

    return themesWidget;
  };

  if (skipSpinner) {
    const themes = createThemeWidget();
    wrapper.appendChild(themes);
  } else {
    const spinner = createSpinnerWidget();
    wrapper.appendChild(spinner);
  }

  wrapper.classList.add(cssClasses.wrapper);

  return wrapper;
}
