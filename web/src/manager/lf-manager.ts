import { DisplayJSONAdapter } from '../helpers/displayJson';
import { api } from '/scripts/api.js';
import { app } from '/scripts/app.js';
/*-------------------------------------------------*/
/*                 L F   C l a s s                 */
/*-------------------------------------------------*/
class LFNodesManager {
  #EXT_PREFIX = 'LFExtension_';
  #NODES_DICT: NodeDictionary = {
    LF_DisplayJSON: DisplayJSONAdapter(),
  };

  constructor() {
    for (const key in this.#NODES_DICT) {
      if (Object.prototype.hasOwnProperty.call(this.#NODES_DICT, key)) {
        const node = this.#NODES_DICT[key];
        const name = this.#EXT_PREFIX + key;
        app.registerExtension({
          name,
        });
        api.addEventListener(node.eventName, node.eventCb);
      }
    }
  }
}

const lfNodesManager = new LFNodesManager();
console.log('LF Nodes initialized.', lfNodesManager);
