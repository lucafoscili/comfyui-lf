import { api } from '/scripts/api.js';
import { APIEndpoints, } from '../types/api/api.js';
import { getLFManager } from '../utils/common.js';
import { LogSeverity } from '../types/manager/manager.js';
export const IMAGE_API = {
    //#region get
    get: async (directory) => {
        const lfManager = getLFManager();
        const payload = {
            data: {},
            message: '',
            status: LogSeverity.Info,
        };
        try {
            const body = new FormData();
            body.append('directory', directory);
            const response = await api.fetchApi(APIEndpoints.GetImage, {
                body,
                method: 'POST',
            });
            const code = response.status;
            switch (code) {
                case 200:
                    const p = await response.json();
                    if (p.status === 'success') {
                        payload.data = p.data;
                        payload.message = 'Analytics data fetched successfully.';
                        payload.status = LogSeverity.Success;
                        lfManager.log(payload.message, { payload }, payload.status);
                        lfManager.getCachedDatasets().usage = payload.data;
                    }
                    break;
                default:
                    payload.message = `Unexpected response from the get-image API: ${response.text}`;
                    payload.status = LogSeverity.Error;
                    break;
            }
        }
        catch (error) {
            payload.message = error;
            payload.status = LogSeverity.Error;
        }
        lfManager.log(payload.message, { payload }, payload.status);
        return payload;
    },
    //#endregion
    //#region process
    process: async (url, type, settings) => {
        const lfManager = getLFManager();
        const payload = {
            data: '',
            message: '',
            status: LogSeverity.Info,
        };
        try {
            const body = new FormData();
            body.append('url', url);
            body.append('type', type);
            body.append('settings', JSON.stringify(settings));
            const response = await api.fetchApi(APIEndpoints.ProcessImage, {
                body,
                method: 'POST',
            });
            const code = response.status;
            switch (code) {
                case 200:
                    const p = await response.json();
                    if (p.status === 'success') {
                        payload.data = p.data;
                        payload.message = 'Image processed successfully.';
                        payload.status = LogSeverity.Success;
                        lfManager.log(payload.message, { payload }, payload.status);
                    }
                    break;
                default:
                    payload.message = `Unexpected response from the process-image API: ${response.text}`;
                    payload.status = LogSeverity.Error;
                    break;
            }
        }
        catch (error) {
            payload.message = error;
            payload.status = LogSeverity.Error;
        }
        lfManager.log(payload.message, { payload }, payload.status);
        return payload;
    },
    //#endregion
};
