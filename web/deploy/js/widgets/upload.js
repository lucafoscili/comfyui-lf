import { handleUpload } from '../helpers/upload.js';
import { KulEventName } from '../types/events/events.js';
import { CustomWidgetName, TagName, } from '../types/widgets/_common.js';
import { UploadCSS } from '../types/widgets/upload.js';
import { createDOMWidget, normalizeValue } from '../utils/common.js';
//#region Upload
export const uploadFactory = {
    options: (upload) => {
        return {
            hideOnZoom: true,
            getComp() {
                return upload;
            },
            getValue() {
                return upload.dataset.files;
            },
            setValue(value) {
                const callback = (v) => {
                    upload.dataset.files = v;
                };
                normalizeValue(value, callback, CustomWidgetName.upload);
            },
        };
    },
    render: (node) => {
        const wrapper = document.createElement(TagName.Div);
        const content = document.createElement(TagName.Div);
        const upload = document.createElement(TagName.KulUpload);
        const options = uploadFactory.options(upload);
        content.classList.add(UploadCSS.Content);
        upload.classList.add(UploadCSS.Widget);
        upload.addEventListener(KulEventName.KulUpload, (e) => {
            handleUpload(e, upload);
        });
        content.appendChild(upload);
        wrapper.appendChild(content);
        return { widget: createDOMWidget(CustomWidgetName.upload, wrapper, node, options) };
    },
};
//#endregion
