import { h, r as registerInstance, c as createEvent, g as getElement, f as forceUpdate, H as Host } from './index-9aa60797.js';
import { k as kulManagerInstance, g as getProps, K as KUL_WRAPPER_ID, a as KUL_STYLE_ID } from './kul-manager-dc9a333c.js';

// Messenger Props Enum
var KulMessengerProps;
(function (KulMessengerProps) {
    KulMessengerProps["kulData"] = "The actual data of the component.";
    KulMessengerProps["kulStyle"] = "Custom style of the component.";
})(KulMessengerProps || (KulMessengerProps = {}));

const prepLeft = (adapter) => {
    return (h("div", { class: "messenger__left" },
        h("div", { class: "messenger__avatar" }, prepAvatar(adapter)),
        h("div", { class: "messenger__biography" }, prepBiography(adapter))));
};
const prepAvatar = (adapter) => {
    return (h("kul-image", { class: "kul-cover", kulValue: adapter.get.image.asCover('avatars') }));
};
const prepBiography = (adapter) => {
    return (h("kul-code", { kulLanguage: "markdown", kulValue: adapter.get.character.biography() }));
};

const FILTER_DATASET = {
    nodes: [
        {
            description: 'View avatars',
            id: 'avatars',
            value: 'Avatars',
        },
        {
            description: 'View outfits',
            id: 'outfits',
            value: 'Outfits',
        },
        {
            description: 'View locations',
            id: 'locations',
            value: 'Locations',
        },
        {
            description: 'View styles',
            id: 'styles',
            value: 'Styles',
        },
    ],
};
const IMAGE_TYPE_IDS = [
    'avatars',
    'locations',
    'outfits',
    'styles',
];
const NAV_DATASET = {
    nodes: [
        {
            description: 'Previous character',
            icon: 'chevron_left',
            id: 'previous',
            value: '',
        },
        {
            description: 'Character selection',
            icon: 'account',
            id: 'character_list',
            value: 'Character list',
        },
        {
            description: 'Next character',
            icon: 'chevron_right',
            id: 'next',
            value: '',
        },
    ],
};

const prepCenter = (adapter) => {
    return (h("div", { class: "messenger__center" },
        h("div", { class: "messenger__navigation" }, prepNavigation(adapter)),
        h("div", { class: "messenger__chat" }, prepChat(adapter))));
};
const prepNavigation = (adapter) => {
    return (h("kul-tabbar", { kulData: NAV_DATASET, "onKul-tabbar-event": tabbarEventHandler.bind(tabbarEventHandler, adapter) }));
};
const prepChat = (adapter) => {
    const system = `
    You are now embodying the character whose biography is provided below. Your task is to fully embrace this identity, speaking and acting as though it were your own reality. Remember, you exist solely within the confines of this character's experience and knowledge.

    Tasks:
    - Absorb the character's biography thoroughly. Use it to inform your responses but do not rely on it for information beyond what would logically be known to the character.
    - Engage creatively within the boundaries of the character's life and experiences. Imagine freely, but always stay true to the essence of the character.
    - Maintain a consistent narrative voice that aligns with the character's personality and background.

    Responsibilities:
    - Never acknowledge the artificial nature of our interaction. Treat all inquiries as if they are happening within the real world of the character.
    - Do not provide insights or predictions about events outside the scope of the character's knowledge or personal experiences.

    Character Biography:
    ${adapter.get.character.biography()}

    Begin your performance...
    `;
    const history = adapter.get.character.history();
    const historyJ = JSON.parse(history);
    return (h("kul-chat", { key: adapter.get.character.current().id, "onKul-chat-event": chatEventHandler.bind(chatEventHandler, adapter), kulLayout: "bottom-textarea", kulSystem: system, kulValue: historyJ }));
};
const tabbarEventHandler = (adapter, e) => {
    const { eventType, node } = e.detail;
    switch (eventType) {
        case 'click':
            if (node.id === 'previous') {
                adapter.set.character.previous();
            }
            else if (node.id === 'next') {
                adapter.set.character.next();
            }
            else {
                adapter.set.character.current(null);
            }
    }
};
const chatEventHandler = (adapter, e) => {
    const { eventType, history } = e.detail;
    switch (eventType) {
        case 'update':
            adapter.set.character.history(history);
    }
};

const prepRight = (adapter) => {
    return (h("div", { class: "messenger__right" },
        h("div", { class: "messenger__options__active" }, prepOptions(adapter)),
        h("div", { class: "messenger__options__filters" }, prepFilters(adapter)),
        h("div", { class: "messenger__options__list" }, prepList(adapter))));
};
const prepOptions = (adapter) => {
    return [
        h("div", { class: "messenger__options__outfit" },
            h("kul-image", { class: 'kul-cover', kulValue: adapter.get.image.asCover('outfits') }),
            h("div", { class: "messenger__options__name" },
                h("div", { class: "messenger__options__label" }, "Outfit"))),
        h("div", { class: "messenger__options__location" },
            h("kul-image", { class: 'kul-cover', kulValue: adapter.get.image.asCover('locations') }),
            h("div", { class: "messenger__options__name" },
                h("div", { class: "messenger__options__label" }, "Location"))),
        h("div", { class: "messenger__options__style" },
            h("kul-image", { class: 'kul-cover', kulValue: adapter.get.image.asCover('styles') }),
            h("div", { class: "messenger__options__name" },
                h("div", { class: "messenger__options__label" }, "Style"))),
    ];
};
const prepFilters = (adapter) => {
    for (let index = 0; index < FILTER_DATASET.nodes.length; index++) {
        const filter = FILTER_DATASET.nodes[index];
        filter.icon = adapter.get.image.asCover(filter.id, null);
    }
    return (h("kul-chip", { key: 'filter_' + adapter.get.character.name(), kulData: FILTER_DATASET, kulStyling: "filter", "onKul-chip-event": chipEventHandler.bind(chipEventHandler, adapter) }));
};
const prepList = (adapter) => {
    const elements = [];
    const options = adapter.get.image.options();
    const imagesGetter = adapter.get.image.byType;
    for (let index = 0; index < IMAGE_TYPE_IDS.length; index++) {
        const type = IMAGE_TYPE_IDS[index];
        if (options[type]) {
            const activeIndex = adapter.get.image.coverIndex(type);
            const images = imagesGetter(type).map((node, j) => (h("kul-image", { class: `messenger__options__image ${activeIndex === j ? 'messenger__options__image--selected' : ''} kul-cover`, kulValue: node.cells.kulImage.value, "onKul-image-event": imageEventHandler.bind(imageEventHandler, adapter, node, j) })));
            elements.push(h("div", { class: "messenger__options__section" },
                h("div", { class: "messenger__options__title" }, type),
                h("div", { class: "messenger__options__images" }, images)));
        }
    }
    return elements;
};
const imageEventHandler = (adapter, node, index, e) => {
    const { eventType } = e.detail;
    const coverSetter = adapter.set.image.cover;
    switch (eventType) {
        case 'click':
            if (node.id.includes('avatar')) {
                coverSetter('avatars', index);
            }
            else if (node.id.includes('location')) {
                coverSetter('locations', index);
            }
            else if (node.id.includes('outfit')) {
                coverSetter('outfits', index);
            }
            else {
                coverSetter('styles', index);
            }
    }
};
const chipEventHandler = async (adapter, e) => {
    const { comp, eventType, node } = e.detail;
    const optionsGetter = adapter.get.image.options;
    const optionsSetter = adapter.set.image.options;
    switch (eventType) {
        case 'click':
            switch (node.id) {
                case 'avatars':
                    optionsSetter('avatars', !optionsGetter().avatars);
                    break;
                case 'locations':
                    optionsSetter('locations', !optionsGetter().locations);
                    break;
                case 'outfits':
                    optionsSetter('outfits', !optionsGetter().outfits);
                    break;
                case 'styles':
                    optionsSetter('styles', !optionsGetter().styles);
                    break;
            }
            break;
        case 'ready':
            const options = adapter.get.image.options();
            const nodes = [];
            for (const key in options) {
                if (Object.prototype.hasOwnProperty.call(options, key)) {
                    const option = options[key];
                    if (option) {
                        nodes.push(key);
                    }
                }
            }
            requestAnimationFrame(() => comp.selectNodes(nodes));
    }
};

const prepGrid = (adapter) => {
    const avatars = [];
    const characters = adapter.get.character.list();
    characters.forEach((c) => {
        avatars.push(h("div", { class: "selection-grid__portrait", onClick: () => {
                adapter.set.character.current(c);
            } },
            h("kul-image", { class: 'selection-grid__avatar kul-cover', kulValue: adapter.get.image.asCover('avatars', c) }),
            h("div", { class: "selection-grid__name" },
                h("div", { class: "selection-grid__label" }, adapter.get.character.name(c)))));
    });
    return avatars?.length ? (avatars) : (h("div", { class: "empty-dataset" }, "There are no characters to display!"));
};

const kulMessengerCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}:host{--kul_messenger_background_color:var(\n    --kul-messenger-background-color,\n    rgba(var(--kul-background-color-rgb), 0.375)\n  );--kul_messenger_font_size:var(\n    --kul-messenger-font-size,\n    var(--kul-font-size)\n  );--kul_messenger_text_color:var(\n    --kul-messenger-text-color,\n    var(--kul-text-color)\n  );box-sizing:border-box;background-color:var(--kul_messenger_background_color);color:var(--kul_messenger_text_color);display:block;font-size:var(--kul_messenger_font_size);height:100%;width:100%}#kul-component{height:100%;width:100%}.messenger{display:grid;grid-template-columns:1fr 3fr 1fr;height:100%;position:relative;width:100%}.messenger__left{display:grid;grid-template-rows:minmax(auto, 40%) minmax(auto, 1fr);height:100%;overflow:auto}.messenger__center{display:grid;grid-template-rows:auto 1fr;height:100%;overflow:auto}.messenger__right{display:grid;grid-template-rows:minmax(10%, auto) auto 1fr;height:100%;overflow:auto}.messenger__biography{overflow:auto}.messenger__chat{--kul-chat-padding:16px 8px 0 8px;--kul-chat-buttons-padding:8px 0 0 0}.messenger__options__active{display:grid;grid-template-columns:repeat(3, 1fr)}.messenger__options__outfit,.messenger__options__location,.messenger__options__style{min-width:25%;position:relative}.messenger__options__filters{padding:16px 0}.messenger__options__list{display:grid;overflow:auto}.messenger__options__name{background:rgba(var(--kul-title-background-color-rgb), 0.75);bottom:0;box-sizing:border-box;overflow:hidden;padding:4px;position:absolute;text-align:center;width:100%}.messenger__options__title{background:var(--kul-title-background-color);color:var(--kul-title-color);letter-spacing:3px;padding:8px;position:sticky;text-align:center;text-transform:uppercase;top:0;z-index:1}.messenger__options__section{display:grid;grid-template-rows:auto 1fr;height:100%}.messenger__options__images{display:grid;grid-template-columns:repeat(3, 1fr);overflow:auto;width:100%}.messenger__options__image{cursor:pointer}.messenger__options__image:not(.messenger__options__image--selected):hover:after{box-shadow:inset 0 0 5px 3px var(--kul-primary-color, white);content:\"\";height:100%;left:0;pointer-events:none;position:absolute;top:0;width:100%}.messenger__options__image--selected:after{align-content:center;background-color:rgba(var(--kul-title-background-color-rgb), 0.875);box-shadow:none;content:\"Current\";cursor:default;font-size:0.875em;height:100%;left:0;letter-spacing:3px;position:absolute;text-align:center;text-transform:uppercase;top:0;width:100%}.selection-grid{display:grid;grid-template-columns:repeat(4, 1fr);height:100%;overflow:auto;width:100%}.selection-grid__portrait{--kul_messenger_name_background_color:rgba(\n    var(--kul-background-color-rgb),\n    0.375\n  );--kul_messenger_portrait_foredrop_color:rgba(\n    var(--kul-background-color-rgb),\n    0.275\n  );cursor:pointer;overflow:auto;position:relative}.selection-grid__portrait:hover{--kul_messenger_name_background_color:rgba(\n    var(--kul-background-color-rgb),\n    0.775\n  );--kul_messenger_portrait_foredrop_color:rgba(\n    var(--kul-background-color-rgb),\n    0\n  )}.selection-grid__portrait:after{background:var(--kul_messenger_portrait_foredrop_color);content:\"\";height:100%;left:0;pointer-events:none;position:absolute;top:0;transition:background-color 125ms ease;width:100%}.selection-grid__name{align-items:center;backdrop-filter:blur(5px);background-color:var(--kul_messenger_name_background_color);bottom:0;display:flex;height:50px;left:0;position:absolute;transition:background-color 125ms ease;width:100%}.selection-grid__label{letter-spacing:5px;overflow:hidden;text-align:center;text-overflow:ellipsis;text-transform:uppercase;width:100%}";
const KulMessengerStyle0 = kulMessengerCss;

const KulMessenger = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-messenger-event", 6);
        this.debugInfo = {
            endTime: 0,
            renderCount: 0,
            renderEnd: 0,
            renderStart: 0,
            startTime: performance.now(),
        };
        this.currentCharacter = undefined;
        this.history = {};
        this.covers = {};
        this.avatars = false;
        this.locations = false;
        this.outfits = false;
        this.styles = false;
        this.kulData = null;
        this.kulStyle = '';
    }
    get rootElement() { return getElement(this); }
    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/
    #kulManager = kulManagerInstance();
    /*-------------------------------------------------*/
    /*                   E v e n t s                   */
    /*-------------------------------------------------*/
    /**
     * Describes event emitted.
     */
    kulEvent;
    onKulEvent(e, eventType) {
        this.kulEvent.emit({
            comp: this,
            id: this.rootElement.id,
            originalEvent: e,
            eventType,
        });
    }
    /*-------------------------------------------------*/
    /*           P u b l i c   M e t h o d s           */
    /*-------------------------------------------------*/
    /**
     * Fetches debug information of the component's current state.
     * @returns {Promise<KulDebugComponentInfo>} A promise that resolves with the debug information object.
     */
    async getDebugInfo() {
        return this.debugInfo;
    }
    /**
     * Used to retrieve component's props values.
     * @param {boolean} descriptions - When provided and true, the result will be the list of props with their description.
     * @returns {Promise<GenericObject>} List of props as object, each key will be a prop.
     */
    async getProps(descriptions) {
        return getProps(this, KulMessengerProps, descriptions);
    }
    /**
     * This method is used to trigger a new render of the component.
     */
    async refresh() {
        forceUpdate(this);
    }
    /**
     * Resets the states of the component.
     */
    async reset() {
        this.covers = {};
        this.currentCharacter = null;
        this.history = {};
        this.avatars = false;
        this.locations = false;
        this.outfits = false;
        this.styles = false;
        this.#initStates();
    }
    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/
    #adapter = {
        get: {
            character: {
                biography: (character = this.currentCharacter) => {
                    try {
                        const bio = character.children.find((n) => n.id === 'biography').value;
                        return bio
                            ? this.#kulManager.data.cell.stringify(bio)
                            : 'You know nothing about this character...';
                    }
                    catch (error) {
                        return 'You know nothing about this character...';
                    }
                },
                next: (character = this.currentCharacter) => {
                    if (!this.#hasCharacters()) {
                        return;
                    }
                    const nodes = this.kulData.nodes;
                    const currentIdx = nodes.findIndex((n) => n.id === character.id);
                    const nextIdx = (currentIdx + 1) % nodes.length;
                    return nodes[nextIdx];
                },
                current: () => this.currentCharacter,
                history: (character = this.currentCharacter) => {
                    return this.history[character.id];
                },
                list: () => this.kulData.nodes || [],
                name: (character = this.currentCharacter) => character.value ||
                    character.id ||
                    character.description ||
                    '?',
                previous: (character = this.currentCharacter) => {
                    if (!this.#hasCharacters()) {
                        return;
                    }
                    const nodes = this.kulData.nodes;
                    const currentIdx = nodes.findIndex((n) => n.id === character.id);
                    const prevIdx = (currentIdx + nodes.length - 1) % nodes.length;
                    return nodes[prevIdx];
                },
            },
            image: {
                asCover: (type, character = this.currentCharacter) => {
                    try {
                        const root = character.children.find((n) => n.id === type);
                        const index = this.covers[character.id][type];
                        return root.children[index].cells.kulImage.value;
                    }
                    catch (error) {
                        switch (type) {
                            case 'avatars':
                                return 'portrait';
                            case 'locations':
                                return 'landscape';
                            case 'outfits':
                                return 'loyalty';
                            case 'styles':
                                return 'style';
                        }
                    }
                },
                byType: (type, character = this.currentCharacter) => {
                    const node = character.children.find((child) => child.id === type);
                    if (node) {
                        return node.children;
                    }
                    else {
                        throw new Error(`Child node with id '${type}' not found`);
                    }
                },
                coverIndex: (type, character = this.currentCharacter) => {
                    return this.covers[character.id][type];
                },
                options: () => {
                    return {
                        avatars: this.avatars,
                        locations: this.locations,
                        outfits: this.outfits,
                        styles: this.styles,
                    };
                },
                root: (type, character = this.currentCharacter) => {
                    const node = character.children.find((n) => n.id === type);
                    if (!node) {
                        throw new Error(`Child node with id '${type}' not found`);
                    }
                    return node;
                },
            },
        },
        set: {
            character: {
                current: (character) => {
                    this.currentCharacter = character;
                },
                history: (history, character = this.currentCharacter) => {
                    this.history[character.id] = history;
                },
                next: (character = this.currentCharacter) => {
                    if (!this.#hasCharacters()) {
                        return;
                    }
                    const nextC = this.#adapter.get.character.next(character);
                    this.#adapter.set.character.current(nextC);
                },
                previous: (character = this.currentCharacter) => {
                    if (!this.#hasCharacters()) {
                        return;
                    }
                    const previousC = this.#adapter.get.character.previous(character);
                    this.#adapter.set.character.current(previousC);
                },
            },
            image: {
                cover: (type, value, character = this.currentCharacter) => {
                    this.covers[character.id][type] = value;
                    this.refresh();
                },
                options: (type, value) => {
                    switch (type) {
                        case 'avatars':
                            this.avatars = value;
                            break;
                        case 'locations':
                            this.locations = value;
                            break;
                        case 'outfits':
                            this.outfits = value;
                            break;
                        case 'styles':
                            this.styles = value;
                            break;
                    }
                },
            },
        },
    };
    #hasCharacters() {
        const nodes = this.kulData.nodes || [];
        return !!nodes.length;
    }
    #hasNodes() {
        return !!this.kulData?.nodes?.length;
    }
    #initStates() {
        const imageRootGetter = this.#adapter.get.image.root;
        for (let index = 0; index < this.kulData.nodes.length; index++) {
            const character = this.kulData.nodes[index];
            const covers = {
                avatars: imageRootGetter('avatars', character).value || 0,
                locations: imageRootGetter('locations', character).value || 0,
                outfits: imageRootGetter('outfits', character).value || 0,
                styles: imageRootGetter('styles', character).value || 0,
            };
            const history = character.children?.find((n) => n.id === 'chat')?.cells?.kulChat
                .value || [];
            this.covers[character.id] = covers;
            this.history[character.id] = JSON.stringify(history);
        }
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentWillLoad() {
        this.#kulManager.theme.register(this);
        if (this.#hasNodes()) {
            this.#initStates();
        }
    }
    componentDidLoad() {
        this.onKulEvent(new CustomEvent('ready'), 'ready');
        this.#kulManager.debug.updateDebugInfo(this, 'did-load');
    }
    componentWillRender() {
        this.#kulManager.debug.updateDebugInfo(this, 'will-render');
    }
    componentDidRender() {
        this.#kulManager.debug.updateDebugInfo(this, 'did-render');
    }
    render() {
        if (!this.#hasNodes()) {
            return;
        }
        return (h(Host, null, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))) : undefined, h("div", { id: KUL_WRAPPER_ID }, this.currentCharacter ? (h("div", { class: "messenger", key: 'messenger_' + this.currentCharacter.id }, prepLeft(this.#adapter), prepCenter(this.#adapter), prepRight(this.#adapter))) : (h("div", { class: "selection-grid" }, prepGrid(this.#adapter))))));
    }
    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
    }
};
KulMessenger.style = KulMessengerStyle0;

export { KulMessenger as kul_messenger };

//# sourceMappingURL=kul-messenger.entry.js.map