import { handleUpload } from '../helpers/upload';
import { KulEventName } from '../types/events/events';
import {
  CustomWidgetDeserializedValuesMap,
  CustomWidgetName,
  NormalizeValueCallback,
  TagName,
} from '../types/widgets/_common';
import { UploadFactory } from '../types/widgets/upload';
import { createDOMWidget, normalizeValue } from '../utils/common';

const BASE_CSS_CLASS = 'lf-upload';
const TYPE = CustomWidgetName.upload;

//#region Upload
export const uploadFactory: UploadFactory = {
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
        const callback: NormalizeValueCallback<
          CustomWidgetDeserializedValuesMap<typeof TYPE> | string
        > = (v) => {
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
