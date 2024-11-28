import {
  APIEndpoints,
  BaseAPIPayload,
  GetMetadataAPIPayload,
  MetadataAPIs,
} from '../types/api/api';
import { LogSeverity } from '../types/manager/manager';
import { getLFManager } from '../utils/common';
import { api } from '/scripts/api.js';

export const METADATA_API: MetadataAPIs = {
  //#region clear
  clear: async () => {
    const lfManager = getLFManager();

    const payload: BaseAPIPayload = {
      message: '',
      status: LogSeverity.Info,
    };

    try {
      const response = await api.fetchApi(APIEndpoints.ClearMetadata, {
        method: 'POST',
      });

      const code = response.status;

      switch (code) {
        case 200:
          const p: BaseAPIPayload = await response.json();
          if (p.status === 'success') {
            payload.message = p.message;
            payload.status = LogSeverity.Success;
          }
          break;
        default:
          payload.message = 'Unexpected response from the API!';
          payload.status = LogSeverity.Error;
          break;
      }
    } catch (error) {
      payload.message = error;
      payload.status = LogSeverity.Error;
    }

    lfManager.log(payload.message, { payload }, payload.status);
    return payload;
  },
  //#endregion

  //#region get
  get: async (hash) => {
    const lfManager = getLFManager();

    const payload: GetMetadataAPIPayload = {
      data: null,
      message: '',
      status: LogSeverity.Info,
    };

    try {
      const response = await fetch(`https://civitai.com/api/v1/model-versions/by-hash/${hash}`);

      const code = response.status;

      switch (code) {
        case 200:
          const p: GetMetadataAPIPayload['data'] = await response.json();
          payload.data = p;
          payload.message = 'Metadata succesfully fetched from CivitAI.';
          payload.status = LogSeverity.Success;
          break;
        case 404:
          payload.message = 'Model not found on CivitAI!';
          payload.status = LogSeverity.Info;
          break;
        default:
          payload.message = 'Unexpected response from the API!';
          payload.status = LogSeverity.Error;
          break;
      }
    } catch (error) {
      payload.message = error;
      payload.status = LogSeverity.Error;
    }

    lfManager.log(payload.message, { payload }, payload.status);
    return payload;
  },
  //#endregion

  //#region save
  save: async (modelPath, dataset, forcedSave = false) => {
    const lfManager = getLFManager();

    const payload: GetMetadataAPIPayload = {
      data: null,
      message: '',
      status: LogSeverity.Info,
    };

    try {
      const body = new FormData();
      body.append('model_path', modelPath);
      body.append('metadata', JSON.stringify(dataset));
      body.append('forced_save', String(forcedSave).valueOf());

      const response = await api.fetchApi(APIEndpoints.SaveMetadata, {
        method: 'POST',
        body,
      });

      const code = response.status;

      switch (code) {
        case 200:
          const p: BaseAPIPayload = await response.json();
          if (p.status === 'success') {
            payload.message = p.message;
            payload.status = LogSeverity.Success;
          }
          break;
        default:
          payload.message = 'Unexpected response from the API!';
          payload.status = LogSeverity.Error;
          break;
      }
    } catch (error) {
      payload.message = error;
      payload.status = LogSeverity.Error;
    }

    lfManager.log(payload.message, { payload }, payload.status);
    return payload;
  },
  //#endregion

  //#region updateCover
  updateCover: async (modelPath, b64image) => {
    const lfManager = getLFManager();

    const payload: BaseAPIPayload = {
      message: '',
      status: LogSeverity.Info,
    };

    try {
      const body = new FormData();
      body.append('model_path', modelPath);
      body.append('base64_image', b64image);

      const response = await api.fetchApi(APIEndpoints.UpdateMetadataCover, {
        method: 'POST',
        body,
      });

      const code = response.status;

      switch (code) {
        case 200:
          const p: BaseAPIPayload = await response.json();
          if (p.status === 'success') {
            payload.message = p.message;
            payload.status = LogSeverity.Success;
          }
          break;
        default:
          payload.message = 'Unexpected response from the API!';
          payload.status = LogSeverity.Error;
          break;
      }
    } catch (error) {
      payload.message = error;
      payload.status = LogSeverity.Error;
    }

    lfManager.log(payload.message, { payload }, payload.status);
    return payload;
  },
  //#endregion
};
