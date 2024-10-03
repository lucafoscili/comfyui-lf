import { LogSeverity } from '../types/manager.js';
import { getLFManager, deserializeValue } from './common.js';
export const CARD_PROPS_TO_SERIALIZE = ['kulData', 'kulStyle'];
export const cardHandler = (container, propsArray) => {
    const cards = container.querySelectorAll('kul-card');
    cards.forEach((c) => c.remove());
    for (let index = 0; propsArray && index < propsArray.length; index++) {
        const card = container.appendChild(createCard());
        const props = propsArray[index];
        if (props.kulData) {
            for (const key in props) {
                if (Object.prototype.hasOwnProperty.call(props, key)) {
                    const prop = props[key];
                    if (key === 'kulData') {
                        try {
                            if (typeof prop === 'string') {
                                card.kulData = deserializeValue(prop).parsedJson;
                            }
                            else {
                                card.kulData = prop;
                            }
                            const node = card.kulData.nodes?.[0];
                            if (node) {
                                card.dataset.link = node.description;
                                card.title = String(node.value).valueOf();
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
};
export const cardEventHandler = (e) => {
    const { comp, eventType } = e.detail;
    const card = comp;
    const node = card.kulData?.nodes?.[0];
    switch (eventType) {
        case 'click':
            if (node) {
                window.open(String(node.value).valueOf(), '_blank');
            }
            break;
    }
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
    return card;
};
