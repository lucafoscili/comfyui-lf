import { LogSeverity } from '../types/manager.js';
import { NodeName } from '../types/nodes.js';
import { CustomWidgetName, } from '../types/widgets.js';
import { createDOMWidget, deserializeValue, getLFManager } from '../utils/common.js';
const BASE_CSS_CLASS = 'lf-rollviewer';
const TYPE = CustomWidgetName.rollViewer;
export const rollViewerFactory = {
    cssClasses: {
        content: BASE_CSS_CLASS,
    },
    options: (rollViewer, nodeType) => {
        return {
            hideOnZoom: true,
            getComp() {
                return rollViewer;
            },
            getValue() {
                const value = {
                    bool: rollViewer.kulLabel === 'true' ? true : false,
                    roll: rollViewer.kulValue,
                };
                return JSON.stringify(value);
            },
            setValue(value) {
                try {
                    const parsedJson = deserializeValue(value)
                        .parsedJson;
                    const { bool, roll } = parsedJson;
                    const isFalse = !!(bool === false);
                    const isTrue = !!(bool === true);
                    switch (nodeType.comfyClass) {
                        case NodeName.resolutionSwitcher:
                            rollViewer.kulLabel = '!';
                            if (isTrue) {
                                rollViewer.kulIcon = 'landscape';
                            }
                            else if (isFalse) {
                                rollViewer.kulIcon = 'portrait';
                            }
                            else {
                                rollViewer.kulLabel = 'Roll!';
                            }
                            break;
                        default:
                            rollViewer.classList.remove('kul-success');
                            rollViewer.classList.remove('kul-danger');
                            if (isTrue) {
                                rollViewer.classList.add('kul-success');
                                rollViewer.kulLabel = 'true';
                            }
                            else if (isFalse) {
                                rollViewer.classList.add('kul-danger');
                                rollViewer.kulLabel = 'false';
                            }
                            else {
                                rollViewer.kulLabel = 'Roll!';
                            }
                            break;
                    }
                    rollViewer.title = 'Actual roll: ' + roll.toString();
                    rollViewer.kulValue = roll;
                }
                catch (error) {
                    getLFManager().log('Error setting RollViewer value', { error, value }, LogSeverity.Warning);
                }
            },
        };
    },
    render: (node, name) => {
        const wrapper = document.createElement('div');
        const content = document.createElement('div');
        const rollViewer = document.createElement('kul-progressbar');
        const options = rollViewerFactory.options(rollViewer, node);
        content.classList.add(rollViewerFactory.cssClasses.content);
        rollViewer.kulIsRadial = true;
        rollViewer.kulLabel = 'Roll!';
        content.appendChild(rollViewer);
        wrapper.appendChild(content);
        return { widget: createDOMWidget(name, TYPE, wrapper, node, options) };
    },
};
