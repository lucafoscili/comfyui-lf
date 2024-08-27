import { createDOMWidget } from '../utils/utils.js';
const cssClasses = {
    content: 'lf-displayjson',
    code: 'lf-displayjson__code',
};
export function renderCode(node, name, wType, getOptions) {
    const wrapper = document.createElement('div');
    const content = document.createElement('div');
    const code = document.createElement('kul-code');
    const options = getOptions(code);
    content.classList.add(cssClasses.content);
    code.classList.add(cssClasses.code);
    code.kulLanguage = 'json';
    content.appendChild(code);
    wrapper.appendChild(content);
    return { widget: createDOMWidget(name, wType, wrapper, node, options) };
}
