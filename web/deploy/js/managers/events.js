var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _LFEvents_instances, _LFEvents_getW;
import { EventName } from '../types/events.js';
import { LogSeverity } from '../types/manager.js';
import { CustomWidgetName } from '../types/widgets.js';
import { getApiRoutes, getLFManager } from '../utils/utils.js';
/*-------------------------------------------------*/
/*             E v e n t s   C l a s s             */
/*-------------------------------------------------*/
export class LFEvents {
    constructor() {
        _LFEvents_instances.add(this);
        this.eventHandler = {
            displayJson: (event, addW) => {
                const name = EventName.displayJson;
                getLFManager().log(`Event '${name}' received`, { event }, LogSeverity.Success);
                const payload = event.detail;
                const node = getApiRoutes().getNodeById(payload.id);
                if (node) {
                    const widget = __classPrivateFieldGet(this, _LFEvents_instances, "m", _LFEvents_getW).call(this, node, CustomWidgetName.code, addW);
                    const comp = widget.options.getComp();
                    comp.kulLanguage = 'json';
                    widget.options.setValue(event.detail.json);
                    getApiRoutes().redraw();
                }
            },
            imageHistogram: (event, addW) => {
                const name = EventName.imageHistogram;
                getLFManager().log(`Event '${name}' received`, { event }, LogSeverity.Success);
                const payload = event.detail;
                const node = getApiRoutes().getNodeById(payload.id);
                if (node) {
                    const widget = __classPrivateFieldGet(this, _LFEvents_instances, "m", _LFEvents_getW).call(this, node, CustomWidgetName.chart, addW);
                    const comp = widget.options.getComp();
                    widget.options.setValue(event.detail.dataset);
                    getApiRoutes().redraw();
                }
            },
        };
        this.get = {
            eventHandlers: this.eventHandler,
        };
    }
}
_LFEvents_instances = new WeakSet(), _LFEvents_getW = function _LFEvents_getW(node, name, addW) {
    return node?.widgets?.find((w) => w.name === name) || addW(node, name).widget;
};
