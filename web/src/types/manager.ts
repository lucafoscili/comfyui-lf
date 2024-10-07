import { BaseEventPayload, EventName } from './events';
import { KulDataDataset } from './ketchup-lite/components';
import { Extension } from './nodes';

/*-------------------------------------------------------------------*/
/*             G e n e r i c   D e c l a r a t i o n s               */
/*-------------------------------------------------------------------*/

export interface ComfyAPIs {
  clearModelMetadata: () => Promise<void>;
  clearAnalyticsData: (type: AnalyticsType) => Promise<void>;
  event: <T extends BaseEventPayload>(
    name: EventName,
    callback: (event: CustomEvent<T>) => void,
  ) => void;
  fetch: (body: unknown) => Promise<Response>;
  fetchAnalyticsData: (type: AnalyticsType) => Promise<FetchAnalyticsAPIPayload>;
  getLinkById: (id: string) => LinkInfo;
  getNodeById: (id: string) => NodeType;
  interrupt: () => Promise<void>;
  modelInfoFromCivitAI: (hash: string) => Promise<CivitAIModelData>;
  queuePrompt: () => Promise<void>;
  redraw: () => void;
  register: (extension: Extension) => void;
  saveModelMetadata: (modelPath: string, dataset: KulDataDataset) => void;
}
export type AnalyticsType = 'usage';
export enum LogSeverity {
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
}
export interface APIMetadataEntry {
  apiFlag: boolean;
  dataset: KulDataDataset;
  hash: string;
  path: string;
}
export interface ClearModelAPIPayload {
  status: 'success';
  message: string;
}
export interface FetchAnalyticsAPIPayload {
  status: 'success' | 'not found' | 'error';
  data: Record<string, KulDataDataset>;
}
export interface SaveModelAPIPayload {
  status: 'exists' | 'success';
  message: string;
}
