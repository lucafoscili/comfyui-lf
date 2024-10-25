import { LogSeverity } from '../types/manager.js';
import { getLFManager, getApiRoutes, unescapeJson } from '../utils/common.js';
export const CARD_PROPS_TO_SERIALIZE = ['kulData', 'kulStyle'];
export const cardHandler = (container, propsArray) => {
    let count = 0;
    const cards = container.querySelectorAll('kul-card');
    cards.forEach((c) => c.remove());
    for (let index = 0; propsArray && index < propsArray.length; index++) {
        const card = container.appendChild(createCard());
        count += 1;
        const props = propsArray[index];
        if (props.kulData) {
            for (const key in props) {
                if (Object.prototype.hasOwnProperty.call(props, key)) {
                    const prop = props[key];
                    if (key === 'kulData') {
                        try {
                            if (typeof prop === 'string') {
                                card.kulData = unescapeJson(prop).parsedJson;
                            }
                            else {
                                card.kulData = prop;
                            }
                            const node = card.kulData.nodes?.[0];
                            if (node) {
                                card.dataset.link = node.description;
                                if (node.value) {
                                    card.title = String(node.value).valueOf();
                                }
                            }
                        }
                        catch (error) {
                            getLFManager().log('Error when setting kulData prop on card!', { error }, LogSeverity.Error);
                        }
                    }
                    else {
                        card[key] = prop;
                    }
                }
            }
        }
    }
    return count;
};
export const getCardProps = (container) => {
    const propsArray = [];
    const cards = container.querySelectorAll('kul-card');
    for (let index = 0; index < cards.length; index++) {
        const card = cards[index];
        const props = CARD_PROPS_TO_SERIALIZE.reduce((acc, p) => {
            if (card[p]) {
                acc[p] = card[p];
            }
            return acc;
        }, {});
        propsArray.push(props);
    }
    return propsArray;
};
export const createCard = () => {
    const card = document.createElement('kul-card');
    card.addEventListener('kul-card-event', cardEventHandler);
    card.addEventListener('contextmenu', contextMenuHandler.bind(contextMenuHandler, card));
    return card;
};
export const cardEventHandler = (e) => {
    const { comp, eventType } = e.detail;
    const card = comp;
    const node = card.kulData?.nodes?.[0];
    switch (eventType) {
        case 'click':
            if (node?.value) {
                window.open(String(node.value).valueOf(), '_blank');
            }
            break;
    }
};
export const contextMenuHandler = (card, e) => {
    e.preventDefault();
    e.stopPropagation();
    const lfManager = getLFManager();
    const tip = lfManager.getManagers().tooltip;
    const cb = async (b64image) => {
        const node = card.kulData?.nodes?.[0];
        if (node) {
            const code = node?.cells?.kulCode;
            if (code) {
                try {
                    const path = JSON.parse(code.value).path;
                    lfManager.log(`Updating cover for model with path: ${path}`, { b64image }, LogSeverity.Info);
                    getApiRoutes().metadata.updateCover(path, b64image);
                    const image = node?.cells?.kulImage;
                    if (image) {
                        image.value = `data:image/png;charset=utf-8;base64,${b64image}`;
                        card.refresh();
                        tip.destroy();
                    }
                }
                catch (error) {
                    lfManager.log("Failed to fetch the model's path from .info file", { b64image }, LogSeverity.Error);
                }
            }
        }
    };
    tip.create({ x: e.x, y: e.y }, 'upload', cb);
};
