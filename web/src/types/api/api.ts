import { EventName, GenericEvent } from '../events/events';
import { KulDataDataset } from '../ketchup-lite/components';
import { Extension, LogSeverity } from '../manager/manager';
import { ImageEditorFilterSettingsMap, ImageEditorFilterType } from '../widgets/imageEditor';

//#region API
export interface APIRoutes {
  analytics: AnalyticsAPIs;
  backup: BackupAPIs;
  comfy: ComfyAPIs;
  github: GitHubAPIs;
  image: ImageAPIs;
  json: JSONAPIs;
  metadata: MetadataAPIs;
}
export type AnalyticsType = 'usage';
export interface AnalyticsAPIs {
  clear: (type: AnalyticsType) => Promise<BaseAPIPayload>;
  get: (dir: string, type: AnalyticsType) => Promise<GetAnalyticsAPIPayload>;
}
export type BackupType = 'automatic' | 'manual';
export interface BackupAPIs {
  new: (backupType?: BackupType) => Promise<BaseAPIPayload>;
}
export type ComfyURLType = 'input' | 'output' | 'temp';
export interface ComfyAPIs {
  comfyUi: () => ComfyUI;
  event: (name: EventName, callback: (e: GenericEvent) => void) => void;
  getLinkById: (id: string) => LinkInfo;
  getNodeById: (id: string) => NodeType;
  getResourceUrl: (subfolder: string, filename: string, type: ComfyURLType) => void;
  interrupt: () => void;
  queuePrompt: () => Promise<void>;
  redraw: () => void;
  register: (extension: Extension) => void;
  upload: (body: FormData) => Promise<Response>;
}
export interface GitHubAPIs {
  getLatestRelease: () => Promise<GetGitHubLatestReleaseAPIPayload>;
}
export interface ImageAPIs {
  get: (dir: string) => Promise<GetImageAPIPayload>;
  process: <T extends ImageEditorFilterType>(
    url: string,
    type: T,
    settings: ImageEditorFilterSettingsMap[T],
  ) => Promise<ProcessImageAPIPayload>;
}
export interface JSONAPIs {
  get: (path: string) => Promise<GetJSONAPIPayload>;
  update: (path: string, dataset: KulDataDataset) => Promise<BaseAPIPayload>;
}
export interface APIMetadataEntry {
  apiFlag: boolean;
  dataset: KulDataDataset;
  hash: string;
  path: string;
}
export interface MetadataAPIs {
  clear: () => Promise<BaseAPIPayload>;
  get: (hash: string) => Promise<GetMetadataAPIPayload>;
  save: (
    modelPath: string,
    dataset: KulDataDataset,
    forcedSave?: boolean,
  ) => Promise<BaseAPIPayload>;
  updateCover: (modelPath: string, b64image: string) => Promise<BaseAPIPayload>;
}
//#endregion

//#region Payloads
export interface BaseAPIPayload {
  message: string;
  status: LogSeverity;
}
export interface GetAnalyticsAPIPayload extends BaseAPIPayload {
  data: Record<string, KulDataDataset>;
}
export interface GetGitHubLatestReleaseAPIPayload extends BaseAPIPayload {
  data: GitHubRelease;
}
export interface GetImageAPIPayload extends BaseAPIPayload {
  data: KulDataDataset;
}
export interface GetJSONAPIPayload extends BaseAPIPayload {
  data: KulDataDataset;
}
export interface GetMetadataAPIPayload extends BaseAPIPayload {
  data: CivitAIModelData;
}
export interface ProcessImageAPIPayload extends BaseAPIPayload {
  data: string;
}
//#endregion

//#region Routes
export enum APIEndpoints {
  ClearAnalytics = `/comfyui-lf/clear-analytics`,
  ClearMetadata = `/comfyui-lf/clear-metadata`,
  GetAnalytics = `/comfyui-lf/get-analytics`,
  GetImage = `/comfyui-lf/get-image`,
  GetJson = `/comfyui-lf/get-json`,
  GetMetadata = `/comfyui-lf/get-metadata`,
  NewBackup = `/comfyui-lf/new-backup`,
  ProcessImage = `/comfyui-lf/process-image`,
  SaveMetadata = '/comfyui-lf/save-metadata',
  UpdateJson = `/comfyui-lf/update-json`,
  UpdateMetadataCover = '/comfyui-lf/update-metadata-cover',
}
//#endregion
