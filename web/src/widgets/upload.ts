import { KulUploadEventPayload } from '../types/ketchup-lite/components';
import { KulUpload } from '../types/ketchup-lite/components/kul-upload/kul-upload';
import { IDBFileMetadata, LogSeverity } from '../types/manager';
import { CustomWidgetName, UploadWidgetOptions } from '../types/widgets';
import { createDOMWidget, getLFManager } from '../utils/common';

const BASE_CSS_CLASS = 'lf-upload';
const TYPE = CustomWidgetName.upload;

export const uploadFactory = {
  cssClasses: {
    content: BASE_CSS_CLASS,
    upload: `${BASE_CSS_CLASS}__widget`,
  },

  options: (upload: HTMLKulUploadElement) => {
    return {
      hideOnZoom: true,
      getComp() {
        return upload;
      },
      getValue() {
        return upload.dataset.files;
      },
      setValue(value: string) {
        upload.dataset.files = value;
      },
    } as UploadWidgetOptions;
  },

  render: (node: NodeType, name: CustomWidgetName) => {
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

    return { widget: createDOMWidget(name, TYPE, wrapper, node, options) };
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
      break;
    default:
      return;
  }

  if (eventType !== 'upload') {
    return;
  }

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
};
