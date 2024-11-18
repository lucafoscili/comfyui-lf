import { KulUploadEventPayload } from '../types/ketchup-lite/components';
import { LogSeverity } from '../types/manager/manager';
import {
  CustomWidgetDeserializedValuesMap,
  CustomWidgetName,
  NormalizeValueCallback,
} from '../types/widgets';
import { UploadFactory } from '../types/widgets/upload';
import { createDOMWidget, getLFManager, normalizeValue } from '../utils/common';

const BASE_CSS_CLASS = 'lf-upload';
const TYPE = CustomWidgetName.upload;

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
    const wrapper = document.createElement('div');
    const content = document.createElement('div');
    const upload = document.createElement('kul-upload');
    const options = uploadFactory.options(upload);

    content.classList.add(uploadFactory.cssClasses.content);
    upload.classList.add(uploadFactory.cssClasses.upload);
    upload.addEventListener('kul-upload-event', (e) => {
      handleUpload(e, upload);
    });

    content.appendChild(upload);
    wrapper.appendChild(content);

    return { widget: createDOMWidget(TYPE, wrapper, node, options) };
  },
};

const handleUpload = async (
  e: CustomEvent<KulUploadEventPayload>,
  upload: HTMLKulUploadElement,
) => {
  const { eventType, selectedFiles } = e.detail;

  switch (eventType) {
    case 'delete':
      upload.dataset.files = Array.from(selectedFiles, (file) => file.name).join(';') || '';
      return;
    case 'upload':
      const fileNames: Set<string> = new Set();

      for (let index = 0; index < selectedFiles.length; index++) {
        const file = selectedFiles[index];
        try {
          const body = new FormData();
          const i = file.webkitRelativePath.lastIndexOf('/');
          const subfolder = file.webkitRelativePath.slice(0, i + 1);
          const new_file = new File([file], file.name, {
            type: file.type,
            lastModified: file.lastModified,
          });
          body.append('image', new_file);
          if (i > 0) {
            body.append('subfolder', subfolder);
          }
          const resp = await getLFManager().getApiRoutes().fetch(body);

          if (resp.status === 200 || resp.status === 201) {
            getLFManager().log('POST result', { json: resp.json }, LogSeverity.Success);
            fileNames.add(file.name);
            upload.dataset.files = upload.dataset.files + ';' + file.name;
          } else {
            getLFManager().log('POST failed', { statusText: resp.statusText }, LogSeverity.Error);
          }
        } catch (error) {
          alert(`Upload failed: ${error}`);
        }
      }

      upload.dataset.files = Array.from(fileNames)?.join(';') || '';
      break;
    default:
      return;
  }
};
