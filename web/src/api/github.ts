import {
  GetGitHubLatestReleaseAPIPayload,
  GetMetadataAPIPayload,
  GitHubAPIs,
} from '../types/api/api';
import { LogSeverity } from '../types/manager/manager';
import { getLFManager } from '../utils/common';

export const GITHUB_API: GitHubAPIs = {
  //#region getLatestRelease
  getLatestRelease: async () => {
    const lfManager = getLFManager();

    const REPO = 'comfyui-lf';
    const USER = 'lucafoscili';

    const payload: GetGitHubLatestReleaseAPIPayload = {
      data: null,
      message: '',
      status: LogSeverity.Info,
    };

    try {
      const response = await fetch(`https://api.github.com/repos/${USER}/${REPO}/releases/latest`);

      const code = response.status;

      switch (code) {
        case 200:
          const releaseData: GetGitHubLatestReleaseAPIPayload['data'] = await response.json();
          payload.data = releaseData;
          payload.message = 'Latest release successfully fetched from GitHub.';
          payload.status = LogSeverity.Success;
          break;
        case 404:
          payload.message = 'No releases found for the repository!';
          payload.status = LogSeverity.Info;
          break;
        default:
          payload.message = 'Unexpected response from the GitHub API!';
          payload.status = LogSeverity.Error;
          break;
      }
    } catch (error) {
      payload.message = `Error fetching release info: ${error}`;
      payload.status = LogSeverity.Error;
    }

    lfManager.log(payload.message, { payload }, payload.status);
    return payload;
  },
  //#endregion
};
