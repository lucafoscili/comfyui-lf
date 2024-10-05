import { BaseEventPayload, EventName } from './events';
import { KulDataDataset } from './ketchup-lite/components';
import { Extension } from './nodes';

/*-------------------------------------------------------------------*/
/*             G e n e r i c   D e c l a r a t i o n s               */
/*-------------------------------------------------------------------*/

export interface ComfyAPIs {
  clearModelMetadata: () => Promise<void>;
  event: <T extends BaseEventPayload>(
    name: EventName,
    callback: (event: CustomEvent<T>) => void,
  ) => void;
  fetch: (body: unknown) => Promise<Response>;
  getLinkById: (id: string) => LinkInfo;
  getNodeById: (id: string) => NodeType;
  interrupt: () => Promise<void>;
  modelInfoFromCivitAI: (hash: string) => Promise<CivitAIModelData>;
  queuePrompt: () => Promise<void>;
  redraw: () => void;
  register: (extension: Extension) => void;
  saveModelMetadata: (modelPath: string, dataset: KulDataDataset) => void;
}
export enum LogSeverity {
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
}
export interface ClearModelAPIPayload {
  status: 'success';
  message: string;
}
export interface SaveModelAPIPayload {
  status: 'exists' | 'success';
  message: string;
}
export interface APIMetadataEntry {
  apiFlag: boolean;
  dataset: KulDataDataset;
  hash: string;
  path: string;
}
