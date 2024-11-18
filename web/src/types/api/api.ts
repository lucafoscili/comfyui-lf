import { EventName, EventPayload } from '../events';
import { KulDataDataset } from '../ketchup-lite/components';
import { LogSeverity } from '../manager/manager';
import { Extension } from '../nodes';
import { CustomWidgetName } from '../widgets';
import { ImageEditorFilterSettingsMap, ImageEditorFilterType } from '../widgets/imageEditor';

//#region API
export interface APIRoutes {
  analytics: AnalyticsAPIs;
  backup: BackupAPIs;
  image: ImageAPIs;
  json: JSONAPIs;
  metadata: MetadataAPIs;
  event: <P extends EventPayload<CustomWidgetName>>(
    name: EventName,
    callback: (event: CustomEvent<P>) => void,
  ) => void;
  comfyUi: () => ComfyUI;
  fetch: (body: unknown) => Promise<Response>;
  getLinkById: (id: string) => LinkInfo;
  getNodeById: (id: string) => NodeType;
  interrupt: () => Promise<void>;
  queuePrompt: () => Promise<void>;
  redraw: () => void;
  register: (extension: Extension) => void;
  getResourceUrl: (subfolder: string, filename: string, type?: ComfyFolderTypes) => string;
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
