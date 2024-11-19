import { handleUpload } from '../helpers/upload.js';
import { KulEventName } from '../types/events/events.js';
import { CustomWidgetName, TagName, } from '../types/widgets/_common.js';
import { createDOMWidget, normalizeValue } from '../utils/common.js';
const BASE_CSS_CLASS = 'lf-upload';
const TYPE = CustomWidgetName.upload;
//#region Upload
export const uploadFactory = {
    cssClasses: {
        content: BASE_CSS_CLASS,
        upload: `${BASE_CSS_CLASS}__widget`,
    },
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
                normalizeValue(value, callback, TYPE);
            },
        };
    },
    render: (node) => {
        const wrapper = document.createElement(TagName.Div);
        const content = document.createElement(TagName.Div);
        const upload = document.createElement(TagName.KulUpload);
        const options = uploadFactory.options(upload);
        content.classList.add(uploadFactory.cssClasses.content);
        upload.classList.add(uploadFactory.cssClasses.upload);
        upload.addEventListener(KulEventName.KulUpload, (e) => {
            handleUpload(e, upload);
        });
        content.appendChild(upload);
        wrapper.appendChild(content);
        return { widget: createDOMWidget(TYPE, wrapper, node, options) };
    },
};
//#endregion
