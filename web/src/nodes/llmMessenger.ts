import { KulMessengerDataset } from '../types/ketchup-lite/components';
import { LogSeverity } from '../types/manager';
import { NodeName, type Extension } from '../types/nodes';
import { ComfyWidgetName, CustomWidgetName, MessengerWidgetSetter } from '../types/widgets';
import {
  areJSONEqual,
  getApiRoutes,
  getCustomWidget,
  getInput,
  getLFManager,
  isValidJSON,
  deserializeValue,
} from '../utils/common';
import { messengerFactory } from '../widgets/messenger';

const NAME = NodeName.llmMessenger;

export const llmMessengerFactory = {
  register: (setW: MessengerWidgetSetter) => {
    const extension: Extension = {
      name: 'LFExt_' + NAME,
      beforeRegisterNodeDef: async (nodeType) => {
        if (nodeType.comfyClass === NAME) {
          const onConnectionsChange = nodeType.prototype.onConnectionsChange;
          nodeType.prototype.onConnectionsChange = function () {
            const r = onConnectionsChange?.apply(this, arguments);
            const node = this;

            const jsonInput = getInput(node, ComfyWidgetName.json);
            const linkInput = getApiRoutes().getLinkById(jsonInput?.link?.toString());
            const nodeInput = getApiRoutes().getNodeById(linkInput?.origin_id?.toString());
            if (!jsonInput || !linkInput || !nodeInput) {
              return;
            }

            const messengerW = getCustomWidget(node, CustomWidgetName.messenger);
            const datasetW = nodeInput?.widgets?.[linkInput.origin_slot];
            if (!messengerW?.options?.getComp || !datasetW?.options?.getValue) {
              return;
            }

            const dataset = datasetW.options.getValue();
            const messenger = messengerW.options.getComp();
            try {
              const newData = deserializeValue(dataset).parsedJson;

              if (isValidJSON(newData) && isValidJSON(messenger.kulData)) {
                if (!areJSONEqual(newData, messenger.kulData)) {
                  messenger.kulData = newData as unknown as KulMessengerDataset;
                  messenger.reset();
                  getLFManager().log('Updated messenger data', { dataset }, LogSeverity.Info);
                }
              } else {
                if (isValidJSON(newData)) {
                  messenger.kulData = newData as unknown as KulMessengerDataset;
                  messenger.reset();
                  getLFManager().log('Set messenger data', { dataset }, LogSeverity.Info);
                } else {
                  getLFManager().log(
                    'Invalid JSON data',
                    { dataset, error: 'Invalid JSON' },
                    LogSeverity.Warning,
                  );
                }
              }
              const placeholder = messenger.nextSibling || messenger.previousSibling;
              if (messenger.kulData?.nodes?.[0]) {
                (placeholder as HTMLDivElement).classList.add(
                  messengerFactory.cssClasses.placeholderHidden,
                );
              } else {
                (placeholder as HTMLDivElement).classList.remove(
                  messengerFactory.cssClasses.placeholderHidden,
                );
              }
            } catch (error) {
              getLFManager().log(
                'Error processing messenger data',
                { dataset, error },
                LogSeverity.Error,
              );
            }

            return r;
          };
        }
      },
      getCustomWidgets: setW,
    };
    getApiRoutes().register(extension);
  },
};
