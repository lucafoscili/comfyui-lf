import { handlers } from '../helpers/upload';
import { KulEventName } from '../types/events/events';
import { CustomWidgetName, TagName } from '../types/widgets/_common';
import {
  UploadCSS,
  UploadFactory,
  UploadNormalizeCallback,
  UploadState,
} from '../types/widgets/upload';
import { createDOMWidget, normalizeValue } from '../utils/common';

const STATE = new WeakMap<HTMLDivElement, UploadState>();

export const uploadFactory: UploadFactory = {
  //#region Options
  options: (wrapper) => {
    return {
      hideOnZoom: true,
      getState: () => STATE.get(wrapper),
      getValue() {
        const { files } = STATE.get(wrapper);

        return files || '';
      },
      setValue(value) {
        const state = STATE.get(wrapper);

        const callback: UploadNormalizeCallback = (v) => {
          state.files = v;
        };

        normalizeValue(value, callback, CustomWidgetName.upload);
      },
    };
  },
  //#endregion
  //#region Render
  render: (node) => {
    const wrapper = document.createElement(TagName.Div);
    const content = document.createElement(TagName.Div);
    const upload = document.createElement(TagName.KulUpload);

    upload.classList.add(UploadCSS.Widget);
    upload.addEventListener(
      KulEventName.KulUpload,
      handlers.upload.bind(handlers.upload, STATE.get(wrapper)),
    );

    content.classList.add(UploadCSS.Content);
    content.appendChild(upload);

    wrapper.appendChild(content);

    const options = uploadFactory.options(wrapper);

    STATE.set(wrapper, { files: '', node, upload, wrapper });

    return { widget: createDOMWidget(CustomWidgetName.upload, wrapper, node, options) };
  },
  //#endregion
  //#region State
  state: STATE,
  //#endregion
};
