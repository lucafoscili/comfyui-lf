import { KulArticleNode } from '../types/ketchup-lite/components/kul-article/kul-article-declarations';
import {
  ControlPanelFixture,
  ControlPanelIcons,
  ControlPanelIds,
  ControlPanelLabels,
  ControlPanelSection,
} from '../types/widgets/controlPanel';
import { getKulManager, getKulThemes, getLFManager } from '../utils/common';

//#region Styles
const STYLES = {
  customization: () => {
    return {
      margin: '0',
    };
  },
  debugGrid: () => {
    return {
      display: 'grid',
      gridTemplateRows: 'repeat(5, max-content) 1fr',
      height: '100%',
      margin: '0',
    };
  },
  debugLogs: () => {
    return {
      display: 'grid',
      gridGap: '12px',
      gridTemplateRows: 'repeat(2, minmax(250px, 600px))',
    };
  },
  logsArea: () => {
    return {
      backgroundColor: 'rgba(var(--kul-text-color-rgb), 0.075)',
      borderRadius: '8px',
      display: 'block',
      height: '100%',
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
//#endregion

export const SECTIONS: ControlPanelFixture = {
  //#region Analytics
  [ControlPanelIds.Analytics]: (): KulArticleNode => {
    return {
      icon: ControlPanelIcons.Analytics,
      id: ControlPanelSection.Section,
      value: 'Analytics',
      children: [
        {
          id: ControlPanelSection.Paragraph,
          value: 'Usage',
          children: [
            {
              id: ControlPanelSection.Content,
              value:
                'Usage analytics can be enabled by saving datasets through the UpdateUsageStatistics node and displayed with the UsageStatistics node.',
            },
            {
              id: ControlPanelSection.Content,
              tagName: 'br',
              value: '',
            },
            {
              id: ControlPanelSection.Content,
              value:
                'Once datasets are created (input folder of ComfyUI), the count for each resource used will increase everytime that particular resource is updated.',
            },
            {
              id: ControlPanelSection.Content,
              tagName: 'br',
              value: '',
            },
            {
              id: ControlPanelSection.Content,
              value: 'This button will clear all usage analytics data from your input folder.',
            },
            {
              id: ControlPanelSection.Content,
              tagName: 'br',
              value: '',
            },
            {
              id: ControlPanelSection.Content,
              value: 'This action is IRREVERSIBLE so use it with caution.',
            },
            {
              id: ControlPanelSection.Content,
              value: '',
              cells: {
                kulButton: {
                  kulIcon: 'delete',
                  kulLabel: ControlPanelLabels.DeleteUsage,
                  kulStyle: ':host { margin: auto; padding:16px 0 }',
                  kulStyling: 'outlined',
                  shape: 'button',
                  value: '',
                },
              },
            },
          ],
        },
      ],
    };
  },
  //#endregion
  //#region Backup
  [ControlPanelIds.Backup]: (): KulArticleNode => {
    return {
      icon: ControlPanelIcons.Backup,
      id: ControlPanelSection.Section,
      value: 'Backup',
      children: [
        {
          id: ControlPanelSection.Paragraph,
          value: 'Toggle on/off',
          children: [
            {
              id: ControlPanelSection.Content,
              value:
                'Toggle this toggle to automatically back up the folder <path/to/your/comfyui/user/LF_Nodes> once a day (the first time you open this workflow).',
            },
            {
              id: ControlPanelSection.Content,
              tagName: 'br',
              value: '',
            },
            {
              id: ControlPanelSection.Content,
              value: '',
              cells: {
                kulToggle: {
                  kulLabel: ControlPanelLabels.AutoBackup,
                  kulLeadingLabel: true,
                  kulStyle: ':host { text-align: center; padding: 16px 0; }',
                  shape: 'toggle',
                  value: !!getLFManager().isBackupEnabled(),
                } as any,
              },
            },
          ],
        },
        {
          cssStyle: STYLES.separator(),
          id: ControlPanelSection.ContentSeparator,
          value: '',
        },
        {
          id: ControlPanelSection.Paragraph,
          value: 'Backup files',
          children: [
            {
              id: ControlPanelSection.Content,
              value:
                'This button will create a manual backup of the content in <path/to/your/comfyui/user/LF_Nodes>',
            },
            {
              id: ControlPanelSection.Content,
              value:
                "Be sure to include as much information as you can, without sufficient data it's difficult to troubleshoot problems.",
            },
            {
              id: ControlPanelSection.Content,
              value: '',
              cells: {
                kulButton: {
                  kulIcon: 'backup',
                  kulLabel: ControlPanelLabels.Backup,
                  kulStyle: ':host { margin: auto; padding:16px 0 }',
                  kulStyling: 'raised',
                  shape: 'button',
                  value: '',
                },
              },
            },
          ],
        },
      ],
    };
  },
  //#endregion
  //#region Debug
  [ControlPanelIds.Debug]: (logsData: KulArticleNode[]): KulArticleNode => {
    return {
      icon: ControlPanelIcons.Debug,
      id: ControlPanelSection.Section,
      cssStyle: STYLES.debugGrid(),
      value: 'Debug',
      children: [
        {
          id: ControlPanelSection.Paragraph,
          value: 'Toggle on/off',
          children: [
            {
              id: ControlPanelSection.Content,
              value: 'Activating the debug will enable the display of verbose logging.',
            },
            {
              id: ControlPanelSection.Content,
              value: '',
              cells: {
                kulToggle: {
                  kulLabel: ControlPanelLabels.Debug,
                  kulLeadingLabel: true,
                  kulStyle: ':host { text-align: center; padding: 16px 0; }',
                  shape: 'toggle',
                  value: !!getLFManager().isDebug(),
                },
              },
            },
          ],
        },
        {
          id: ControlPanelSection.Paragraph,
          value: 'Logs',
          children: [
            {
              id: ControlPanelSection.Content,
              value: 'Every time the node manager receives a messages, it will be printed below.',
            },
            {
              id: ControlPanelSection.Content,
              tagName: 'br',
              value: '',
            },
            {
              id: ControlPanelSection.Content,
              value: 'In the browser console there should be more informations.',
            },
            {
              id: ControlPanelSection.Content,
              tagName: 'br',
              value: '',
            },
            {
              id: ControlPanelSection.Content,
              value:
                'Further below another widget will display additional Ketchup Lite components information.',
            },
            {
              id: ControlPanelSection.Content,
              value: '',
              cells: {
                kulButton: {
                  htmlProps: { className: 'kul-danger kul-full-width' },
                  shape: 'button',
                  kulIcon: 'refresh',
                  kulLabel: ControlPanelLabels.ClearLogs,
                  kulStyle: ':host { padding-top: 16px; }',
                  value: '',
                },
              },
            },
          ],
        },
        {
          id: ControlPanelSection.Paragraph,
          cssStyle: STYLES.debugLogs(),
          value: '',
          children: [
            {
              id: 'content-wrapper',
              cssStyle: STYLES.logsArea(),
              value: '',
              children: logsData,
            },
            {
              cells: {
                kulCard: {
                  kulData: {
                    nodes: [
                      {
                        cells: {
                          kulCode: { shape: 'code', value: '' },
                          kulButton: {
                            shape: 'button',
                            value: '',
                          },
                          kulButton_2: {
                            shape: 'button',
                            value: '',
                          },
                          kulToggle: {
                            shape: 'toggle',
                            value: !!getKulManager().debug.isEnabled(),
                          },
                        },
                        id: 'debug',
                      },
                    ],
                  },
                  kulLayout: 'debug',
                  shape: 'card',
                  value: '',
                },
              },
              id: 'content-wrapper',
            },
          ],
        },
      ],
    };
  },
  //#endregion
  //#region GitHub
  [ControlPanelIds.GitHub]: (): KulArticleNode => {
    const lfManager = getLFManager();
    const releaseData = lfManager.getLatestRelease();
    return {
      icon: ControlPanelIcons.GitHub,
      id: ControlPanelSection.Section,
      value: '',
      children: [
        {
          id: ControlPanelSection.Paragraph,
          value: `Version: ${releaseData?.tag_name || 'N/A'}`,
          children: [
            {
              cells: {
                kulCode: {
                  kulLanguage: 'markdown',
                  shape: 'code',
                  value: releaseData?.body || 'No changelog available',
                },
              },
              id: 'release-description',
            },
            {
              id: 'release-author',
              children: [
                {
                  id: 'author-avatar',
                  value: '',
                  cssStyle: {
                    backgroundImage: `url(${releaseData?.author?.avatar_url || ''})`,
                    backgroundSize: 'cover',
                    borderRadius: '50%',
                    display: 'inline-block',
                    height: '32px',
                    marginRight: '0.5em',
                    verticalAlign: 'middle',
                    width: '32px',
                  },
                },
                {
                  id: 'author-name',
                  value: `Author: ${releaseData?.author?.login || 'Unknown'}`,
                  cssStyle: {
                    fontSize: '0.9em',
                    color: 'var(--kul-secondary-color)',
                    verticalAlign: 'middle',
                  },
                },
              ],
              cssStyle: {
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '1em',
              },
            },
            {
              cssStyle: {
                color: 'var(--kul-secondary-color)',
                display: 'block',
                fontSize: '0.9em',
                fontStyle: 'italic',
                marginBottom: '2em',
                textAlign: 'center',
                width: '100%',
              },
              id: 'release-date',
              value: `Published on: ${
                releaseData?.published_at
                  ? new Date(releaseData.published_at).toLocaleDateString()
                  : 'Unknown'
              }`,
            },
            {
              cssStyle: STYLES.separator(),
              id: ControlPanelSection.ContentSeparator,
              value: '',
            },
            {
              id: ControlPanelSection.Paragraph,
              value: 'Bug report',
              children: [
                {
                  id: ControlPanelSection.Content,
                  value:
                    'If you find bugs or odd behaviors feel free to open an issue on GitHub, just follow the link below!',
                },
                {
                  id: ControlPanelSection.Content,
                  tagName: 'br',
                  value: '',
                },
                {
                  id: ControlPanelSection.Content,
                  value:
                    "Be sure to include as much information as you can, without sufficient data it's difficult to troubleshoot problems.",
                },
                {
                  id: ControlPanelSection.Content,
                  value: '',
                  cells: {
                    kulButton: {
                      kulIcon: 'github',
                      kulLabel: ControlPanelLabels.OpenIssue,
                      kulStyle: ':host { margin: auto; padding:16px 0 }',
                      kulStyling: 'raised',
                      shape: 'button',
                      value: '',
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    };
  },
  //#endregion
  //#region Metadata
  [ControlPanelIds.Metadata]: (): KulArticleNode => {
    return {
      icon: ControlPanelIcons.Metadata,
      id: ControlPanelSection.Section,
      value: 'Metadata',
      children: [
        {
          id: ControlPanelSection.Paragraph,
          value: 'Purge metadata files',
          children: [
            {
              id: ControlPanelSection.Content,
              value:
                'Metadata pulled from CivitAI are stored in .info files saved in the same folders of the models to avoid unnecessary fetches from the API.',
            },
            {
              id: ControlPanelSection.Content,
              value:
                "By pressing this button it's possible to delete every .info file created by fetching the metadata.",
            },
            {
              id: ControlPanelSection.Content,
              tagName: 'br',
              value: '',
            },
            {
              id: ControlPanelSection.Content,
              value: 'This action is IRREVERSIBLE so use it with caution.',
            },
            {
              id: ControlPanelSection.Content,
              value: '',
              cells: {
                kulButton: {
                  kulIcon: 'delete',
                  kulLabel: ControlPanelLabels.DeleteMetadata,
                  kulStyle: ':host { margin: auto; padding:16px 0 }',
                  kulStyling: 'outlined',
                  shape: 'button',
                  value: '',
                },
              },
            },
          ],
        },
      ],
    };
  },
  //#endregion
  //#region Theme
  [ControlPanelIds.Theme]: (): KulArticleNode => {
    return {
      icon: ControlPanelIcons.Theme,
      id: ControlPanelSection.Section,
      value: 'Customization',
      cssStyle: STYLES.customization(),
      children: [
        {
          id: ControlPanelSection.Paragraph,
          value: 'Theme selector',
          children: [
            {
              id: ControlPanelSection.Content,
              value:
                "Through the button below it's possible to set a random theme for the Ketchup Lite components, or select one from the dropdown menu.",
            },
            {
              id: ControlPanelSection.Content,
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
      ],
    };
  },
  //#endregion
};
