import { CustomWidgetName, NodeName, } from '../types/widgets/_common.js';
import { cardHandler, getCardProps } from '../helpers/card.js';
import { createDOMWidget, getCustomWidget, normalizeValue } from '../utils/common.js';
import { cardPlaceholders, fetchModelMetadata } from '../utils/api.js';
const BASE_CSS_CLASS = 'lf-card';
const TYPE = CustomWidgetName.card;
//#region Card factory
export const cardFactory = {
    cssClasses: {
        content: BASE_CSS_CLASS,
        contentHasButton: `${BASE_CSS_CLASS}--has-button`,
        grid: `${BASE_CSS_CLASS}__grid`,
    },
    options: (grid) => {
        return {
            hideOnZoom: false,
            getComp() {
                return Array.from(grid.querySelectorAll('kul-card'));
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
                normalizeValue(value, callback, TYPE);
            },
        };
    },
    render: (node) => {
        const wrapper = document.createElement('div');
        const content = document.createElement('div');
        const grid = document.createElement('div');
        const options = cardFactory.options(grid);
        content.classList.add(cardFactory.cssClasses.content);
        grid.classList.add(cardFactory.cssClasses.grid);
        content.appendChild(grid);
        wrapper.appendChild(content);
        switch (node.comfyClass) {
            case NodeName.checkpointSelector:
            case NodeName.embeddingSelector:
            case NodeName.loraAndEmbeddingSelector:
            case NodeName.loraSelector:
                content.classList.add(cardFactory.cssClasses.contentHasButton);
                content.appendChild(selectorButton(grid, node));
                break;
        }
        return { widget: createDOMWidget(TYPE, wrapper, node, options) };
    },
};
//#endregion
//#region selectorButton
const selectorButton = (grid, node) => {
    const cb = (e) => {
        const { comp, eventType } = e.detail;
        const button = comp;
        switch (eventType) {
            case 'click':
                const cards = Array.from(grid.querySelectorAll('kul-card'));
                if (cards?.length) {
                    const models = [];
                    const widget = getCustomWidget(node, CustomWidgetName.card);
                    cards.forEach((card) => {
                        const hashCell = card.kulData?.nodes?.[0]?.cells?.kulCode;
                        if (hashCell) {
                            const { hash, path } = JSON.parse(JSON.stringify(hashCell.value));
                            const dataset = card.kulData;
                            button.kulShowSpinner = true;
                            models.push({ apiFlag: true, dataset, hash, path });
                        }
                    });
                    if (models.length) {
                        const value = {
                            props: [],
                        };
                        cardPlaceholders(widget, cards.length);
                        fetchModelMetadata(models, true).then((r) => {
                            for (let index = 0; index < r.length; index++) {
                                const cardProps = r[index];
                                if (cardProps.kulData) {
                                    value.props.push(cardProps);
                                }
                                else {
                                    value.props.push({
                                        ...cardProps,
                                        kulData: models[index].dataset,
                                    });
                                }
                            }
                            widget.options.setValue(JSON.stringify(value));
                            requestAnimationFrame(() => (button.kulShowSpinner = false));
                        });
                    }
                }
                break;
        }
    };
    const button = document.createElement('kul-button');
    button.classList.add('kul-full-width');
    button.kulIcon = 'cloud_download';
    button.kulLabel = 'Refresh';
    button.title = 'Attempts to manually ownload fresh metadata from CivitAI';
    button.addEventListener('kul-button-event', cb);
    const spinner = document.createElement('kul-spinner');
    spinner.kulActive = true;
    spinner.kulDimensions = '0.6em';
    spinner.kulLayout = 2;
    spinner.slot = 'spinner';
    button.appendChild(spinner);
    return button;
};
//#endregion
