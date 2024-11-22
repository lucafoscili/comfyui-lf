import { handleUpload } from '../helpers/upload';
import { KulEventName } from '../types/events/events';
import {
  CustomWidgetDeserializedValuesMap,
  CustomWidgetName,
  NormalizeValueCallback,
  TagName,
} from '../types/widgets/_common';
import { UploadCSS, UploadFactory } from '../types/widgets/upload';
import { createDOMWidget, normalizeValue } from '../utils/common';

//#region Upload
export const uploadFactory: UploadFactory = {
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
          CustomWidgetDeserializedValuesMap<typeof CustomWidgetName.upload> | string
        > = (v) => {
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
