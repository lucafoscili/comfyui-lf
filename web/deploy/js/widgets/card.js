import { EV_HANDLERS, getCardProps, prepCards } from '../helpers/card.js';
import { KulEventName } from '../types/events/events.js';
import { CardCSS, } from '../types/widgets/card.js';
import { CustomWidgetName, NodeName, TagName } from '../types/widgets/widgets.js';
import { createDOMWidget, normalizeValue } from '../utils/common.js';
const STATE = new WeakMap();
export const cardFactory = {
    //#region Options
    options: (wrapper) => {
        return {
            hideOnZoom: false,
            getState: () => STATE.get(wrapper),
            getValue() {
                const { grid } = STATE.get(wrapper);
                return {
                    props: getCardProps(grid) || [],
                };
            },
            setValue(value) {
                const { grid } = STATE.get(wrapper);
                const callback = (_, u) => {
                    const { props } = u.parsedJson;
                    const len = props?.length > 1 ? 2 : 1;
                    grid.style.setProperty('--card-grid', `repeat(1, 1fr) / repeat(${len}, 1fr)`);
                    prepCards(grid, props);
                };
                normalizeValue(value, callback, CustomWidgetName.card);
            },
        };
    },
    //#endregion
    //#region Render
    render: (node) => {
        const wrapper = document.createElement(TagName.Div);
        const content = document.createElement(TagName.Div);
        const grid = document.createElement(TagName.Div);
        grid.classList.add(CardCSS.Grid);
        content.classList.add(CardCSS.Content);
        content.appendChild(grid);
        switch (node.comfyClass) {
            case NodeName.checkpointSelector:
            case NodeName.embeddingSelector:
            case NodeName.loraAndEmbeddingSelector:
            case NodeName.loraSelector:
                content.classList.add(CardCSS.ContentHasButton);
                const spinner = document.createElement(TagName.KulSpinner);
                spinner.kulActive = true;
                spinner.kulDimensions = '0.6em';
                spinner.kulLayout = 2;
                spinner.slot = 'spinner';
                const button = document.createElement(TagName.KulButton);
                button.classList.add('kul-full-width');
                button.kulIcon = 'cloud_download';
                button.kulLabel = 'Refresh';
                button.title = 'Attempts to manually ownload fresh metadata from CivitAI';
                button.addEventListener(KulEventName.KulButton, (e) => EV_HANDLERS.button(STATE.get(wrapper), e));
                button.appendChild(spinner);
                content.appendChild(button);
                break;
        }
        wrapper.appendChild(content);
        const options = cardFactory.options(wrapper);
        STATE.set(wrapper, { grid, node, wrapper });
        return { widget: createDOMWidget(CustomWidgetName.card, wrapper, node, options) };
    },
    //#endregion
    //#region State
    state: STATE,
    //#endregion
};
