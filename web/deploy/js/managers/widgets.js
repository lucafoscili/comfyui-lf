import { app } from '/scripts/app.js';
import { KUL_CONTROL_PANEL } from '../widgets/controlPanel.js';
/*-------------------------------------------------*/
/*                 L F   C l a s s                 */
/*-------------------------------------------------*/
export class LFWidgets {
    constructor() {
        this.TYPES = {
            controlPanel: 'KUL_CONTROL_PANEL',
        };
        this.create = {
            controlPanel: (nodeType) => {
                const widget = app.widgets.KUL_CONTROL_PANEL(nodeType, this.TYPES.controlPanel, {
                    isReady: false,
                }).widget;
                widget.serializeValue = false;
            },
        };
        this.get = {
            controlPanel: () => {
                return {
                    KUL_CONTROL_PANEL: (nodeType, name) => {
                        return KUL_CONTROL_PANEL(nodeType, name, this.TYPES.controlPanel);
                    },
                };
            },
        };
    }
}
