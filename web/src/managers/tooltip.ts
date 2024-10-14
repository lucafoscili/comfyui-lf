import { getKulManager, getLFManager } from '../utils/common.js';
import { KulButtonEventPayload } from '../types/ketchup-lite/components';
import type {
  KulDynamicPositionAnchor,
  KulDynamicPositionPlacement,
} from '../types/ketchup-lite/managers/kul-dynamic-position/kul-dynamic-position-declarations';
import {
  LogSeverity,
  TooltipCallbacks,
  TooltipLayouts,
  TooltipUploadCallback,
} from '../types/manager.js';

/*-------------------------------------------------*/
/*           T o o l t i p   C l a s s             */
/*-------------------------------------------------*/

export class LFTooltip {
  #CB: {
    upload?: TooltipUploadCallback;
  } = {};
  #CSS_CLASSES = {
    wrapper: 'lf-tooltip',
    content: `lf-tooltip__content`,
  };
  #LAYOUT: TooltipLayouts; // more in the future?
  #TOOLTIP_ELEMENT: HTMLDivElement;

  constructor() {
    const link = document.createElement('link');
    link.dataset.filename = 'tooltip';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = `extensions/comfyui-lf/css/tooltip.css`;
    document.head.appendChild(link);
  }

  #initialize() {
    this.#TOOLTIP_ELEMENT?.remove();
    this.#TOOLTIP_ELEMENT = null;
    this.#CB = {};
    this.#LAYOUT = null;
  }

  #uploadLayout() {
    const content = document.createElement('div');
    const upload = document.createElement('kul-upload');
    const button = document.createElement('kul-button');

    content.classList.add(this.#CSS_CLASSES.content);

    button.classList.add('kul-full-width');
    button.kulIcon = 'upload';
    button.kulLabel = 'Update cover';

    content.appendChild(upload);
    content.appendChild(button);

    button.addEventListener(
      'kul-button-event',
      this.#buttonEventHandler.bind(this.#buttonEventHandler, upload),
    );

    return content;
  }

  #buttonEventHandler = async (
    upload: HTMLKulUploadElement,
    e: CustomEvent<KulButtonEventPayload>,
  ) => {
    const { eventType } = e.detail;

    switch (eventType) {
      case 'click':
        const lfManager = getLFManager();
        switch (this.#LAYOUT) {
          case 'upload':
            const files = await upload.getValue();

            const reader = new FileReader();
            reader.onload = (e) => {
              const result = e.target?.result;
              let base64String = '';

              if (typeof result === 'string') {
                base64String = result.replace(/^data:.*,/, '');
              } else if (result instanceof ArrayBuffer) {
                const arrayBufferView = new Uint8Array(result);
                base64String = btoa(String.fromCharCode.apply(null, arrayBufferView));
              }

              if (this.#CB) {
                lfManager.log('Invoking upload callback.', { base64String }, LogSeverity.Info);
                this.#CB[this.#LAYOUT](base64String);
              }
            };
            reader.readAsDataURL(files[0]);
            break;
        }
    }
  };

  create<T extends TooltipLayouts>(
    anchor: KulDynamicPositionAnchor,
    layout: T,
    cb?: TooltipCallbacks,
  ) {
    const kulManager = getKulManager();
    if (this.#TOOLTIP_ELEMENT) {
      this.#initialize();
    }

    this.#CB = cb ? { [layout]: cb } : {};
    this.#LAYOUT = layout ?? 'upload';
    this.#TOOLTIP_ELEMENT = document.createElement('div');
    this.#TOOLTIP_ELEMENT.classList.add(this.#CSS_CLASSES.wrapper);

    switch (this.#LAYOUT) {
      case 'upload':
        this.#TOOLTIP_ELEMENT.appendChild(this.#uploadLayout());
        break;
    }

    kulManager.dynamicPosition.register(
      this.#TOOLTIP_ELEMENT,
      anchor,
      0,
      '' as KulDynamicPositionPlacement,
      true,
    );
    kulManager.dynamicPosition.start(this.#TOOLTIP_ELEMENT);
    kulManager.addClickCallback({ cb: () => this.destroy(), el: this.#TOOLTIP_ELEMENT });

    requestAnimationFrame(() => document.body.appendChild(this.#TOOLTIP_ELEMENT));
  }

  destroy() {
    this.#initialize();
  }
}
