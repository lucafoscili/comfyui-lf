import { CustomWidgetName, NodeName, TagName, } from '../types/widgets/_common.js';
import { ProgressbarCSS, } from '../types/widgets/progressBar.js';
import { createDOMWidget, normalizeValue } from '../utils/common.js';
const FALLBACK_LABEL = 'N/A';
const TYPE = CustomWidgetName.progressbar;
//#region Progress bar
export const progressbarFactory = {
    options: (progressbar, nodeType) => {
        return {
            hideOnZoom: false,
            getComp() {
                return progressbar;
            },
            getValue() {
                return {
                    bool: progressbar.kulLabel === 'true' ? true : false,
                    roll: progressbar.kulValue || 0,
                };
            },
            setValue(value) {
                const callback = (_, u) => {
                    const { bool, roll } = u.parsedJson;
                    const isFalse = !!(bool === false);
                    const isTrue = !!(bool === true);
                    switch (nodeType.comfyClass) {
                        case NodeName.resolutionSwitcher:
                            progressbar.kulLabel = '!';
                            if (isTrue) {
                                progressbar.kulIcon = 'landscape';
                            }
                            else if (isFalse) {
                                progressbar.kulIcon = 'portrait';
                            }
                            else {
                                progressbar.kulLabel = FALLBACK_LABEL;
                            }
                            break;
                        default:
                            progressbar.classList.remove('kul-success');
                            progressbar.classList.remove('kul-danger');
                            if (isTrue) {
                                progressbar.classList.add('kul-success');
                                progressbar.kulLabel = 'true';
                            }
                            else if (isFalse) {
                                progressbar.classList.add('kul-danger');
                                progressbar.kulLabel = 'false';
                            }
                            else {
                                progressbar.kulLabel = FALLBACK_LABEL;
                            }
                            break;
                    }
                    progressbar.title = roll ? 'Actual roll: ' + roll.toString() : '';
                    progressbar.kulValue = roll || 100;
                };
                normalizeValue(value, callback, TYPE);
            },
        };
    },
    render: (node) => {
        const wrapper = document.createElement(TagName.Div);
        const content = document.createElement(TagName.Div);
        const progressbar = document.createElement(TagName.KulProgressbar);
        const options = progressbarFactory.options(progressbar, node);
        content.classList.add(ProgressbarCSS.Content);
        progressbar.kulIsRadial = true;
        progressbar.kulLabel = FALLBACK_LABEL;
        content.appendChild(progressbar);
        wrapper.appendChild(content);
        return { widget: createDOMWidget(TYPE, wrapper, node, options) };
    },
};
//#endregion
