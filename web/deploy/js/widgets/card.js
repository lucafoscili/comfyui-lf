import { CustomWidgetName, NodeName, TagName, } from '../types/widgets/_common.js';
import { cardHandler, getCardProps, selectorButton, } from '../helpers/card.js';
import { createDOMWidget, normalizeValue } from '../utils/common.js';
import { CardCSS } from '../types/widgets/card.js';
//#region Card factory
export const cardFactory = {
    options: (grid) => {
        return {
            hideOnZoom: false,
            getComp() {
                return Array.from(grid.querySelectorAll(TagName.KulCard));
            },
            getValue() {
                return {
                    props: getCardProps(grid) || [],
                };
            },
            setValue(value) {
                const callback = (_, u) => {
                    const { props } = u.parsedJson;
                    const len = props?.length > 1 ? 2 : 1;
                    grid.style.setProperty('--card-grid', `repeat(1, 1fr) / repeat(${len}, 1fr)`);
                    cardHandler(grid, props);
                };
                normalizeValue(value, callback, CustomWidgetName.card);
            },
        };
    },
    render: (node) => {
        const wrapper = document.createElement(TagName.Div);
        const content = document.createElement(TagName.Div);
        const grid = document.createElement(TagName.Div);
        const options = cardFactory.options(grid);
        content.classList.add(CardCSS.Content);
        grid.classList.add(CardCSS.Grid);
        content.appendChild(grid);
        wrapper.appendChild(content);
        switch (node.comfyClass) {
            case NodeName.checkpointSelector:
            case NodeName.embeddingSelector:
            case NodeName.loraAndEmbeddingSelector:
            case NodeName.loraSelector:
                content.classList.add(CardCSS.ContentHasButton);
                content.appendChild(selectorButton(grid, node));
                break;
        }
        return { widget: createDOMWidget(CustomWidgetName.card, wrapper, node, options) };
    },
};
//#endregion
