import {
  KulButtonEventPayload,
  KulListEventPayload,
  KulSwitchEventPayload,
} from '../types/ketchup-lite/components';
import { KulArticleNode } from '../types/ketchup-lite/components/kul-article/kul-article-declarations';
import { KulButton } from '../types/ketchup-lite/components/kul-button/kul-button';
import { KulButtonEvent } from '../types/ketchup-lite/components/kul-button/kul-button-declarations';
import { KulList } from '../types/ketchup-lite/components/kul-list/kul-list';
import { KulSwitch } from '../types/ketchup-lite/components/kul-switch/kul-switch';
import { KulSwitchEvent } from '../types/ketchup-lite/components/kul-switch/kul-switch-declarations';
import {
  getApiRoutes,
  getKulManager,
  getKulThemes,
  getLFManager,
  isButton,
  isSwitch,
} from '../utils/common';

enum Labels {
  CLEAR_LOGS = 'Clear logs',
  DELETE_USAGE = 'Delete usage analytics info',
  DELETE_METADATA = 'Delete models info',
  DONE = 'Done!',
  OPEN_ISSUE = 'Open an issue',
  THEME = 'Random theme',
}

const STYLES = {
  logsArea: () => {
    return {
      backgroundColor: 'rgba(var(--kul-text-color-rgb), 0.075)',
      borderRadius: '8px',
      display: 'block',
      height: '250px',
      marginBottom: '16px',
      overflow: 'auto',
    };
  },
  separator: () => {
    return {
      border: '1px solid var(--kul-border-color)',
      display: 'block',
      margin: '12px auto 24px',
      opacity: '0.25',
      width: '50%',
    };
  },
};

let TIMEOUT: NodeJS.Timeout;

export const handleKulEvent = (e: Event) => {
  const { comp } = (
    e as CustomEvent<KulButtonEventPayload | KulListEventPayload | KulSwitchEventPayload>
  ).detail;

  if (isButton(comp)) {
    handleButtonEvent(e as CustomEvent<KulButtonEventPayload>);
  }

  if (isSwitch(comp)) {
    handleSwitchEvent(e as CustomEvent<KulSwitchEventPayload>);
  }
};

const handleButtonEvent = (e: CustomEvent<KulButtonEventPayload>) => {
  const { comp, eventType, originalEvent } = e.detail;
  const c = (comp as KulButton).rootElement;

  const onResponse = () => {
    c.kulDisabled = true;
    c.kulIcon = 'check';
    c.kulLabel = Labels.DONE;
    c.kulShowSpinner = false;
  };
  const restore = (label: Labels) => {
    c.kulDisabled = false;
    c.kulLabel = label;
    c.kulIcon = 'delete';
    TIMEOUT = null;
  };

  switch (eventType as KulButtonEvent) {
    case 'click':
      switch (c.kulLabel) {
        case Labels.CLEAR_LOGS:
          const { article, dataset } = getLFManager().getDebugDataset();
          if (dataset?.length > 0) {
            dataset.splice(0, dataset.length);
            article.refresh();
          }
          break;
        case Labels.DELETE_METADATA:
          requestAnimationFrame(() => (c.kulShowSpinner = true));
          getApiRoutes()
            .clearModelMetadata()
            .then(() => {
              requestAnimationFrame(onResponse);

              if (TIMEOUT) {
                clearTimeout(TIMEOUT);
              }

              TIMEOUT = setTimeout(
                () => requestAnimationFrame(() => restore(Labels.DELETE_METADATA)),
                1000,
              );
            });
          break;
        case Labels.DELETE_USAGE:
          requestAnimationFrame(() => (c.kulShowSpinner = true));
          getApiRoutes()
            .analytics.clear('usage')
            .then(() => {
              requestAnimationFrame(onResponse);

              if (TIMEOUT) {
                clearTimeout(TIMEOUT);
              }

              TIMEOUT = setTimeout(
                () => requestAnimationFrame(() => restore(Labels.DELETE_USAGE)),
                1000,
              );
            });
          break;
        case Labels.OPEN_ISSUE:
          window.open('https://github.com/lucafoscili/comfyui-lf/issues/new', '_blank');
          break;
        case Labels.THEME:
          getKulManager().theme.randomTheme();
          break;
        default:
          break;
      }
      break;

    case 'kul-event':
      handleListEvent(originalEvent as CustomEvent<KulListEventPayload>);
      break;

    case 'ready':
      if (c.kulLabel === Labels.DELETE_METADATA || c.kulLabel === Labels.DELETE_USAGE) {
        c.classList.add('kul-danger');

        const spinner = document.createElement('kul-spinner');
        spinner.kulActive = true;
        spinner.kulDimensions = '0.6em';
        spinner.kulLayout = 2;
        spinner.slot = 'spinner';
        c.appendChild(spinner);
        break;
      }
  }
};

const handleListEvent = (e: CustomEvent<KulListEventPayload>) => {
  const { comp, eventType, node } = e.detail;
  const c = (comp as KulList).rootElement;
  const value = node.id;

  switch (eventType) {
    case 'click':
      getKulManager().theme.set(value);
      break;
    case 'ready':
      c.title = 'Change the LF Nodes suite theme';
      getKulManager().theme.set(value);
      break;
  }
};

const handleSwitchEvent = (e: CustomEvent<KulSwitchEventPayload>) => {
  const { comp, eventType, value } = e.detail;
  const c = (comp as KulSwitch).rootElement;

  switch (eventType as KulSwitchEvent) {
    case 'change':
      getLFManager().toggleDebug(value === 'on' ? true : false);
      break;
    case 'ready':
      c.title = 'Activate verbose console logging';
  }
};

export const sectionsFactory = {
  analytics: (): KulArticleNode => {
    return {
      id: 'section',
      value: 'Analytics',
      children: [
        {
          id: 'paragraph',
          value: 'Usage',
          children: [
            {
              id: 'content',
              value:
                'Usage analytics can be enabled by saving datasets through the UpdateUsageStatistics node and displayed with the UsageStatistics node.',
            },
            {
              id: 'content',
              tagName: 'br',
              value: '',
            },
            {
              id: 'content',
              value:
                'Once datasets are created (input folder of ComfyUI), the count for each resource used will increase everytime that particular resource is updated.',
            },
            {
              id: 'content',
              tagName: 'br',
              value: '',
            },
            {
              id: 'content',
              value: 'This button will clear all usage analytics data from your input folder.',
            },
            {
              id: 'content',
              tagName: 'br',
              value: '',
            },
            {
              id: 'content',
              value: 'This action is IRREVERSIBLE so use it with caution.',
            },
            {
              id: 'content',
              value: '',
              cells: {
                kulButton: {
                  kulIcon: 'delete',
                  kulLabel: Labels.DELETE_USAGE,
                  kulStyle: ':host { margin: auto; padding:16px 0 }',
                  kulStyling: 'outlined',
                  shape: 'button',
                  value: '',
                },
              },
            },
            {
              cssStyle: STYLES.separator(),
              id: 'content_separator',
              value: '',
            },
          ],
        },
      ],
    };
  },
  bug: (): KulArticleNode => {
    return {
      id: 'section',
      value: 'Bug report',
      children: [
        {
          id: 'paragraph',
          value: 'Did you run into a bug?',
          children: [
            {
              id: 'content',
              value:
                'If you find bugs or odd behaviors feel free to open an issue on GitHub, just follow the link below!',
            },
            {
              id: 'content',
              tagName: 'br',
              value: '',
            },
            {
              id: 'content',
              value:
                "Be sure to include as much information as you can, without sufficient data it's difficult to troubleshoot problems.",
            },
            {
              id: 'content',
              value: '',
              cells: {
                kulButton: {
                  kulIcon: 'github',
                  kulLabel: Labels.OPEN_ISSUE,
                  kulStyle: ':host { margin: auto; padding:16px 0 }',
                  kulStyling: 'raised',
                  shape: 'button',
                  value: '',
                },
              },
            },
            {
              cssStyle: STYLES.separator(),
              id: 'content_separator',
              value: '',
            },
          ],
        },
      ],
    };
  },
  debug: (logsData: KulArticleNode[]): KulArticleNode => {
    return {
      id: 'section',
      value: 'Debug',
      children: [
        {
          id: 'paragraph',
          value: 'Toggle on/off',
          children: [
            {
              id: 'content',
              value: 'Activating the debug will enable the display of verbose logging.',
            },
            {
              id: 'content',
              value: '',
              cells: {
                kulSwitch: {
                  kulLabel: 'Debug',
                  kulLeadingLabel: true,
                  kulStyle: ':host { text-align: center; padding: 16px 0; }',
                  shape: 'switch',
                  value: !!getLFManager().isDebug(),
                } as any,
              },
            },
          ],
        },
        {
          id: 'paragraph',
          value: 'Logs',
          children: [
            {
              id: 'content',
              value: 'Every time the node manager receives a messages, it will be printed below.',
            },
            {
              id: 'content',
              tagName: 'br',
              value: '',
            },
            {
              id: 'content',
              value: 'In the browser console there should be more informations.',
            },
            {
              id: 'content',
              value: '',
              cells: {
                kulButton: {
                  shape: 'button',
                  kulIcon: 'refresh',
                  kulLabel: Labels.CLEAR_LOGS,
                  kulStyle:
                    ':host { margin: auto; padding-bottom: 4px; padding-top: 16px; text-align: center }',
                  kulStyling: 'flat',
                  value: '',
                },
              },
            },
          ],
        },
        {
          id: 'paragraph',
          value: '',
          cssStyle: STYLES.logsArea(),
          children: logsData,
        },
        {
          cssStyle: STYLES.separator(),
          id: 'content_separator',
          value: '',
        },
      ],
    };
  },
  metadata: (): KulArticleNode => {
    return {
      id: 'section',
      value: 'Metadata',
      children: [
        {
          id: 'paragraph',
          value: 'Purge metadata files',
          children: [
            {
              id: 'content',
              value:
                'Metadata pulled from CivitAI are stored in .info files saved in the same folders of the models to avoid unnecessary fetches from the API.',
            },
            {
              id: 'content',
              tagName: 'br',
              value: '',
            },
            {
              id: 'content',
              value:
                "By pressing this button it's possible to delete every .info file created by fetching the metadata.",
            },
            {
              id: 'content',
              tagName: 'br',
              value: '',
            },
            {
              id: 'content',
              value: 'This action is IRREVERSIBLE so use it with caution.',
            },
            {
              id: 'content',
              value: '',
              cells: {
                kulButton: {
                  kulIcon: 'delete',
                  kulLabel: Labels.DELETE_METADATA,
                  kulStyle: ':host { margin: auto; padding:16px 0 }',
                  kulStyling: 'outlined',
                  shape: 'button',
                  value: '',
                },
              },
            },
          ],
        },
        {
          cssStyle: STYLES.separator(),
          id: 'content_separator',
          value: '',
        },
      ],
    };
  },
  theme: (): KulArticleNode => {
    return {
      id: 'section',
      value: 'Customization',
      children: [
        {
          id: 'paragraph',
          value: 'Theme selector',
          children: [
            {
              id: 'content',
              value:
                "Through the button below it's possible to set a random theme for the Ketchup Lite components, or select one from the dropdown menu.",
            },
            {
              id: 'content',
              value: '',
              cells: {
                kulButton: {
                  kulData: getKulThemes(),
                  kulStyle: ':host { margin: auto; padding: 16px 0 }',
                  shape: 'button',
                  value: '',
                },
              },
            },
          ],
        },
        {
          cssStyle: STYLES.separator(),
          id: 'content_separator',
          value: '',
        },
      ],
    };
  },
};
