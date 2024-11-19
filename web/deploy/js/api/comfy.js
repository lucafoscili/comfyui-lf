import { api } from '/scripts/api.js';
import { app } from '/scripts/app.js';
//#region Comfy APIs
export const COMFY_API = {
    comfyUi: () => window.comfyAPI,
    event: (name, callback) => {
        api.addEventListener(name, callback);
    },
    getLinkById: (id) => {
        return app.graph.links[String(id).valueOf()];
    },
    getNodeById: (id) => {
        return app.graph.getNodeById(+(id || app.runningNodeId));
    },
    getResourceUrl: (subfolder, filename, type = 'output') => {
        const params = [
            'filename=' + encodeURIComponent(filename),
            'type=' + type,
            'subfolder=' + subfolder,
            app.getRandParam().substring(1),
        ].join('&');
        return `/view?${params}`;
    },
    interrupt: () => {
        return api.interrupt();
    },
    queuePrompt: async () => {
        app.queuePrompt(0);
    },
    redraw: () => {
        app.graph.setDirtyCanvas(true, false);
    },
    register: (extension) => {
        app.registerExtension(extension);
    },
    upload: async (body) => {
        return await api.fetchApi('/upload/image', {
            method: 'POST',
            body,
        });
    },
};
//#endregion
