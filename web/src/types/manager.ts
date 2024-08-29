import { BaseEventPayload, EventName } from './events';
import { Extension } from './nodes';

/*-------------------------------------------------------------------*/
/*             G e n e r i c   D e c l a r a t i o n s               */
/*-------------------------------------------------------------------*/

export interface ComfyAPIs {
  event: <T extends BaseEventPayload>(
    name: EventName,
    callback: (event: CustomEvent<T>) => void,
  ) => void;
  getNodeById: (id: string) => NodeType;
  redraw: () => void;
  register: (extension: Extension) => void;
}
export enum LogSeverity {
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
}
