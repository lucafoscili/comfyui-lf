import { h, F as Fragment, r as registerInstance, c as createEvent, g as getElement, f as forceUpdate, H as Host } from './index-9aa60797.js';
import { k as kulManagerInstance, g as getProps, K as KUL_WRAPPER_ID, a as KUL_STYLE_ID } from './kul-manager-dc9a333c.js';

// Messenger Props Enum
var KulMessengerProps;
(function (KulMessengerProps) {
    KulMessengerProps["kulAutosave"] = "Automatically saves the dataset when a chat updates.";
    KulMessengerProps["kulData"] = "The actual data of the component.";
    KulMessengerProps["kulStyle"] = "Custom style of the component.";
    KulMessengerProps["kulValue"] = "Sets the initial configuration, including active character and filters.";
})(KulMessengerProps || (KulMessengerProps = {}));

const LEFT_EXPANDER_ICON = 'chevron_left';
const RIGHT_EXPANDER_ICON = 'chevron_right';
const AVATAR_COVER = 'portrait';
const LOCATION_COVER = 'landscape';
const OUTFIT_COVER = 'loyalty';
const STYLE_COVER = 'style';
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
const MENU_DATASET = {
    nodes: [
        {
            children: [
                {
                    description: 'Download the Ketchup Lite JSON, used as a dataset.',
                    icon: 'download',
                    id: 'kulData',
                    value: 'Download dataset',
                },
                {
                    description: 'Download the current configuration settings.',
                    icon: 'settings',
                    id: 'settings',
                    value: 'Download configuration',
                },
            ],
            id: 'root',
            value: '',
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
            icon: LEFT_EXPANDER_ICON,
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
            icon: RIGHT_EXPANDER_ICON,
            id: 'next',
            value: '',
        },
    ],
};

const prepLeft = (adapter) => {
    const isCollapsed = adapter.get.messenger.ui().panels.isLeftCollapsed;
    return (h("div", { class: `messenger__left ${isCollapsed ? 'messenger__left--collapsed' : ''}` },
        h("div", { class: "messenger__avatar" }, prepAvatar(adapter)),
        h("div", { class: "messenger__biography" }, prepBiography(adapter))));
};
const prepAvatar = (adapter) => {
    const image = adapter.get.image.asCover('avatars');
    const status = adapter.get.messenger.status.connection();
    return (h(Fragment, null,
        h("img", { alt: image.title || '', class: "messenger__avatar__image", src: image.value, title: image.title || '' }),
        h("div", { class: "messenger__avatar__name" },
            h("div", { class: "messenger__avatar__label" },
                h("kul-image", { class: "messenger__avatar__status", kulColor: status === 'ready'
                        ? 'var(--kul-success-color)'
                        : status === 'offline'
                            ? 'var(--kul-danger-color)'
                            : 'var(--kul-warning-color)', kulSizeX: "16px", kulSizeY: "16px", kulValue: "brightness-1", title: status === 'ready'
                        ? 'Ready to chat!'
                        : status === 'offline'
                            ? 'This character seems to be offline...'
                            : 'Contacting this character...' }),
                adapter.get.character.name()),
            prepSaveButton(adapter))));
};
const prepSaveButton = (adapter) => {
    const saveInProgress = adapter.get.messenger.status.save.inProgress();
    const props = {
        kulIcon: saveInProgress ? '' : 'save',
        kulLabel: saveInProgress ? 'Saving...' : 'Save',
        kulShowSpinner: saveInProgress ? true : false,
    };
    return (h("kul-button", { class: 'kul-full-height', ...props, kulData: MENU_DATASET, kulStyling: "flat", "onKul-button-event": buttonClickHandler.bind(buttonClickHandler, adapter), ref: (el) => {
            adapter.components.saveButton = el;
        }, title: "Update the dataset with current settings." },
        h("kul-spinner", { kulActive: true, kulDimensions: "0.6em", kulLayout: 4, slot: "spinner" })));
};
const prepBiography = (adapter) => {
    return (h("kul-code", { kulLanguage: "markdown", kulValue: adapter.get.character.biography() }));
};
const buttonClickHandler = async (adapter, e) => {
    const { eventType, originalEvent } = e.detail;
    switch (eventType) {
        case 'click':
            const saveInProgress = adapter.get.messenger.status.save.inProgress();
            if (!saveInProgress) {
                adapter.set.messenger.data();
            }
            break;
        case 'kul-event':
            listClickHandler(adapter, originalEvent);
            break;
    }
};
const listClickHandler = async (adapter, e) => {
    const { eventType, node } = e.detail;
    let strJson = '';
    switch (eventType) {
        case 'click':
            switch (node.id) {
                case 'full_history':
                    strJson = JSON.stringify(adapter.get.messenger.history(), null, 2);
                    break;
                case 'history':
                    strJson = adapter.get.character.history();
                    break;
                case 'kulData':
                    strJson = JSON.stringify(adapter.get.messenger.data(), null, 2);
                    break;
                case 'settings':
                    strJson = JSON.stringify(adapter.get.messenger.config(), null, 2);
                    break;
            }
            const url = window.URL.createObjectURL(new Blob([strJson], {
                type: 'application/json',
            }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', node.id + '.json');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
    }
};

const prepCenter = (adapter) => {
    const buttons = prepExpanderButtons(adapter);
    return (h("div", { class: "messenger__center" },
        h("div", { class: "messenger__expander messenger__expander--left" }, buttons.left),
        h("div", { class: "messenger__navigation" }, prepNavigation(adapter)),
        h("div", { class: "messenger__chat" }, prepChat(adapter)),
        h("div", { class: "messenger__expander messenger__expander--right" }, buttons.right)));
};
const prepExpanderButtons = (adapter) => {
    const left = (h("kul-button", { class: "kul-full-height", id: "left", kulIcon: LEFT_EXPANDER_ICON, kulStyling: "flat", "onKul-button-event": expanderEventHandler.bind(expanderEventHandler, adapter), title: "Expand/collapse this section" }));
    const right = (h("kul-button", { class: "kul-full-height", id: "right", kulIcon: RIGHT_EXPANDER_ICON, kulStyling: "flat", "onKul-button-event": expanderEventHandler.bind(expanderEventHandler, adapter), title: "Expand/collapse this section" }));
    return {
        left,
        right,
    };
};
const prepNavigation = (adapter) => {
    return (h("kul-tabbar", { kulData: NAV_DATASET, "onKul-tabbar-event": tabbarEventHandler.bind(tabbarEventHandler, adapter) }));
};
const prepChat = (adapter) => {
    const prompts = getDynamicPrompts(adapter);
    const system = `
    You are now embodying the character whose biography is provided below. Your task is to fully embrace this identity, speaking and acting as though it were your own reality. Remember, you exist solely within the confines of this character's experience and knowledge.

    Tasks:
    - Absorb the character's biography thoroughly. Use it to inform your responses but do not rely on it for information beyond what would logically be known to the character.
    - Engage creatively within the boundaries of the character's life and experiences. Imagine freely, but always stay true to the essence of the character.
    - Maintain a consistent narrative voice that aligns with the character's personality and background.

    Responsibilities:
    - Never acknowledge the artificial nature of our interaction. Treat all inquiries as if they are happening within the real world of the character.
    - Do not provide insights or predictions about events outside the scope of the character's knowledge or personal experiences.

    ${prompts.biography}
    ${prompts.location}
    ${prompts.outfit}

    Begin your performance...
    `;
    const history = adapter.get.character.history();
    const historyJ = JSON.parse(history);
    const props = adapter.get.character.chat();
    return (h("kul-chat", { key: adapter.get.character.current().id, kulLayout: "bottom-textarea", kulSystem: system, kulValue: historyJ, ...props, "onKul-chat-event": chatEventHandler.bind(chatEventHandler, adapter) }));
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
    const { comp, eventType, history, status } = e.detail;
    const chat = comp;
    switch (eventType) {
        case 'config':
            adapter.set.character.chat({
                kulEndpointUrl: chat.kulEndpointUrl,
                kulMaxTokens: chat.kulMaxTokens,
                kulPollingInterval: chat.kulPollingInterval,
                kulSystem: chat.kulSystem,
                kulTemperature: chat.kulTemperature,
            });
            break;
        case 'polling':
            adapter.set.messenger.status.connection(status);
            break;
        case 'update':
            adapter.set.character.history(history);
            break;
    }
};
const expanderEventHandler = (adapter, e) => {
    const { comp, eventType } = e.detail;
    const button = comp;
    switch (eventType) {
        case 'click':
            switch (button.rootElement.id) {
                case 'left':
                    const newLeft = adapter.set.messenger.ui.panel('left');
                    button.kulIcon = newLeft
                        ? RIGHT_EXPANDER_ICON
                        : LEFT_EXPANDER_ICON;
                    break;
                case 'right':
                    const newRight = adapter.set.messenger.ui.panel('right');
                    button.kulIcon = newRight
                        ? LEFT_EXPANDER_ICON
                        : RIGHT_EXPANDER_ICON;
                    break;
            }
    }
};
const getDynamicPrompts = (adapter) => {
    const biography = adapter.get.character.biography();
    const location = adapter.get.image.asCover('locations').node;
    const outfit = adapter.get.image.asCover('outfits').node;
    const llmBio = `
    Character Biography:
    ${biography}
    `;
    const locationTitle = location?.value;
    const locationDescription = location?.description;
    const llmLocation = `
    Character Location:
    ${locationTitle} - ${locationDescription}
    `;
    const outfitTitle = outfit?.value;
    const outfitDescription = outfit?.description;
    const llmOutfit = `
    Character Outfit:
    ${outfitTitle} - ${outfitDescription}
    `;
    return {
        biography: biography ? llmBio : '',
        location: location ? llmLocation : '',
        outfit: outfit ? llmOutfit : '',
    };
};

const prepRight = (adapter) => {
    const isCollapsed = adapter.get.messenger.ui().panels.isRightCollapsed;
    return (h("div", { class: `messenger__right ${isCollapsed ? 'messenger__right--collapsed' : ''}` },
        h("div", { class: "messenger__options__active" }, prepOptions(adapter)),
        h("div", { class: "messenger__options__filters" }, prepFilters(adapter)),
        h("div", { class: "messenger__options__list" }, prepList(adapter))));
};
const prepOptions = (adapter) => {
    const locationImage = adapter.get.image.asCover('locations');
    const outfitImage = adapter.get.image.asCover('outfits');
    const styleImage = adapter.get.image.asCover('styles');
    return [
        h("div", { class: "messenger__options__wrapper" },
            h("img", { class: "messenger__options__outfit", alt: styleImage.title || 'No outfit selected.', src: outfitImage.value, title: outfitImage.title || 'No outfit selected.' }),
            h("div", { class: "messenger__options__name" },
                h("div", { class: "messenger__options__label", title: "Active outfit." }, "Outfit"))),
        h("div", { class: "messenger__options__wrapper" },
            h("img", { class: "messenger__options__location", alt: styleImage.title || 'No location selected.', src: locationImage.value, title: locationImage.title || 'No location selected.' }),
            h("div", { class: "messenger__options__name" },
                h("div", { class: "messenger__options__label", title: "Active location." }, "Location"))),
        h("div", { class: "messenger__options__wrapper" },
            h("img", { class: "messenger__options__style", alt: styleImage.title || 'No style selected.', src: styleImage.value, title: styleImage.title || 'No style selected.' }),
            h("div", { class: "messenger__options__name" },
                h("div", { class: "messenger__options__label", title: "Active style." }, "Style"))),
    ];
};
const prepFilters = (adapter) => {
    for (let index = 0; index < FILTER_DATASET.nodes.length; index++) {
        const filter = FILTER_DATASET.nodes[index];
        filter.icon = adapter.get.image.asCover(filter.id, null).value;
    }
    return (h("kul-chip", { key: 'filter_' + adapter.get.character.name(), kulData: FILTER_DATASET, kulStyling: "filter", "onKul-chip-event": chipEventHandler.bind(chipEventHandler, adapter) }));
};
const prepList = (adapter) => {
    const elements = [];
    const filters = adapter.get.messenger.ui().filters;
    const imagesGetter = adapter.get.image.byType;
    for (let index = 0; index < IMAGE_TYPE_IDS.length; index++) {
        const type = IMAGE_TYPE_IDS[index];
        if (filters[type]) {
            const activeIndex = adapter.get.image.coverIndex(type);
            const images = imagesGetter(type).map((node, j) => (h("div", { class: `messenger__options__image-wrapper  ${activeIndex === j ? 'messenger__options__image-wrapper--selected' : ''}`, onClick: imageEventHandler.bind(imageEventHandler, adapter, node, j) },
                h("img", { alt: adapter.get.image.title(node), class: `messenger__options__image`, src: node.cells.kulImage.value, title: adapter.get.image.title(node) }))));
            elements.push(h("div", { class: "messenger__options__section" },
                h("div", { class: "messenger__options__title" }, type),
                h("div", { class: "messenger__options__images" }, images)));
        }
    }
    return elements;
};
const imageEventHandler = (adapter, node, index) => {
    const coverSetter = adapter.set.image.cover;
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
};
const chipEventHandler = (adapter, e) => {
    const { comp, eventType, selectedNodes } = e.detail;
    const filtersSetter = adapter.set.messenger.ui.filters;
    switch (eventType) {
        case 'click':
            const newFilters = {
                avatars: false,
                locations: false,
                outfits: false,
                styles: false,
            };
            Array.from(selectedNodes).forEach((n) => {
                newFilters[n.id] = true;
            });
            filtersSetter(newFilters);
            break;
        case 'ready':
            const filters = adapter.get.messenger.ui().filters;
            const nodes = [];
            for (const key in filters) {
                if (Object.prototype.hasOwnProperty.call(filters, key)) {
                    const option = filters[key];
                    if (option) {
                        nodes.push(key);
                    }
                }
            }
            requestAnimationFrame(() => comp.setSelectedNodes(nodes));
    }
};

const prepGrid = (adapter) => {
    const avatars = [];
    const characters = adapter.get.character.list();
    characters.forEach((c) => {
        const image = adapter.get.image.asCover('avatars', c);
        avatars.push(h("div", { class: "selection-grid__portrait", onClick: () => {
                adapter.set.character.current(c);
            } },
            h("img", { class: 'selection-grid__image', src: image.value, title: image.title || '' }),
            h("div", { class: "selection-grid__name" },
                h("div", { class: "selection-grid__label" }, adapter.get.character.name(c)))));
    });
    return avatars?.length ? (avatars) : (h("div", { class: "empty-dataset" }, "There are no characters to display!"));
};

const kulMessengerCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}:host{--kul_messenger_active_options_name_padding:var(\n    --kul-messenger-active-options-name-padding,\n    4px\n  );--kul_messenger_avatar_name_padding:var(\n    --kul-messenger-avatar-name-padding,\n    12px\n  );--kul_messenger_backdrop_filter:var(\n    --kul-messenger-backdrop-filter,\n    blur(5px)\n  );--kul_messenger_background_color:var(\n    --kul-messenger-background-color,\n    rgba(var(--kul-background-color-rgb), 0.375)\n  );--kul_messenger_font_size:var(\n    --kul-messenger-font-size,\n    var(--kul-font-size)\n  );--kul_messenger_name_background_color:var(\n    --kul-messenger-name-background-color,\n    rgba(var(--kul-title-background-color-rgb), 0.75)\n  );--kul_messenger_letter_spacing:var(--kul-messenger-letter-spacing, 5px);--kul_messenger_name_height:var(--kul-messenger-avatar-height, 50px);--kul_messenger_nav_box_shadow:var(\n    --kul-messenger-nav-box-shadow,\n    0px 1px 7px 3px rgba(var(--kul-text-color-rgb), 0.375)\n  );--kul_messenger_options_title_padding:var(\n    --kul-messenger-options-title-padding,\n    8px\n  );--kul_messenger_text_color:var(\n    --kul-messenger-text-color,\n    var(--kul-text-color)\n  );--kul_messenger_transition:var(--kul-messenger-transition, 125ms ease-out);box-sizing:border-box;background-color:var(--kul_messenger_background_color);color:var(--kul_messenger_text_color);display:block;font-family:var(--kul-font-family);font-size:var(--kul-font-size);height:100%;width:100%}#kul-component{height:100%;width:100%}.messenger{display:grid;grid-template-columns:1fr 3fr 1fr;height:100%;position:relative;width:100%}.messenger:has(.messenger__left--collapsed){grid-template-columns:0 4fr 1fr}.messenger:has(.messenger__right--collapsed){grid-template-columns:1fr 4fr 0}.messenger:has(.messenger__left--collapsed):has(.messenger__right--collapsed){grid-template-columns:0 1fr 0}.messenger__left{display:grid;grid-template-rows:minmax(auto, 40%) minmax(auto, 1fr);height:100%;overflow:auto;transition:height var(--kul_messenger_transition)}.messenger__left--collapsed{overflow:hidden;width:0}.messenger__center{display:grid;grid-template-areas:\"nav nav nav\" \"expander-l chat expander-r\";grid-template-columns:auto 1fr auto;grid-template-rows:auto 1fr;height:100%;overflow:auto}.messenger__right{display:grid;grid-template-rows:40% auto 1fr;height:100%;overflow:auto;transition:height var(--kul_messenger_transition)}.messenger__right--collapsed{overflow:hidden;width:0}.messenger__avatar{position:relative}.messenger__avatar__image{display:block;height:100%;object-fit:cover;width:100%}.messenger__avatar__label{display:flex}.messenger__avatar__status{padding-right:8px}.messenger__avatar__name{align-items:center;background-color:var(--kul_messenger_name_background_color);backdrop-filter:var(--kul_messenger_backdrop_filter);box-sizing:border-box;display:flex;height:var(--kul_messenger_name_height);justify-content:space-between;left:0;letter-spacing:var(--kul_messenger_letter_spacing);padding-left:var(--kul_messenger_avatar_name_padding);position:absolute;text-transform:uppercase;top:0;width:100%}.messenger__biography{font-size:0.8em;overflow:auto}.messenger__expander{box-shadow:var(--kul_messenger_nav_box_shadow)}.messenger__expander--left{grid-area:expander-l}.messenger__expander--right{grid-area:expander-r}.messenger__navigation{box-shadow:var(--kul_messenger_nav_box_shadow);grid-area:nav}.messenger__chat{--kul-chat-padding:16px 8px 0 8px;--kul-chat-buttons-padding:8px 0 0 0;overflow:auto;grid-area:chat}.messenger__options__active{display:grid;grid-template-columns:repeat(3, 1fr)}.messenger__options__wrapper{overflow:hidden;position:relative}.messenger__options__outfit,.messenger__options__location,.messenger__options__style{display:block;height:100%;object-fit:cover;width:100%}.messenger__options__filters{padding:16px 0}.messenger__options__label{font-size:0.8em;letter-spacing:var(--kul_messenger_letter_spacing);overflow:hidden;text-align:center;text-overflow:ellipsis;text-transform:uppercase}.messenger__options__list{display:grid;overflow:auto}.messenger__options__name{background:var(--kul_messenger_name_background_color);bottom:0;box-sizing:border-box;overflow:hidden;padding:var(--kul_messenger_active_options_name_padding);position:absolute;width:100%}.messenger__options__title{background:var(--kul-title-background-color);color:var(--kul-title-color);letter-spacing:var(--kul_messenger_letter_spacing);overflow:hidden;padding:var(--kul_messenger_options_title_padding);position:sticky;text-align:center;text-overflow:ellipsis;text-transform:uppercase;top:-1px;z-index:1}.messenger__options__section{display:grid;grid-template-rows:auto 1fr;height:100%}.messenger__options__images{display:grid;grid-template-columns:repeat(3, 1fr);overflow:auto;width:100%}.messenger__options__image-wrapper{position:relative}.messenger__options__image-wrapper:after{box-shadow:none;content:\"\";height:100%;left:0;position:absolute;top:0;transition:background-color var(--kul_messenger_transition), box-shadow var(--kul_messenger_transition);width:100%}.messenger__options__image-wrapper:hover:not(.messenger__options__image-wrapper--selected):after{box-shadow:inset 0 0 5px 3px var(--kul-primary-color, white);pointer-events:none}.messenger__options__image-wrapper--selected:after{align-content:center;background-color:rgba(var(--kul-title-background-color-rgb), 0.875);content:\"Current\";cursor:default;font-size:0.775em;letter-spacing:var(--kul_messenger_letter_spacing);overflow:hidden;position:absolute;text-align:center;text-overflow:ellipsis;text-transform:uppercase}.messenger__options__image{cursor:pointer;display:block;height:100%;object-fit:cover;width:100%}.selection-grid{display:grid;grid-template-columns:repeat(4, 1fr);height:100%;overflow:auto;width:100%}.selection-grid__image{display:block;height:100%;object-fit:cover;width:100%}.selection-grid__portrait{--kul_messenger_name_background_color:rgba(\n    var(--kul-background-color-rgb),\n    0.375\n  );--kul_messenger_portrait_foredrop_color:rgba(\n    var(--kul-background-color-rgb),\n    0.275\n  );cursor:pointer;overflow:auto;position:relative}.selection-grid__portrait:hover{--kul_messenger_name_background_color:rgba(\n    var(--kul-background-color-rgb),\n    0.775\n  );--kul_messenger_portrait_foredrop_color:rgba(\n    var(--kul-background-color-rgb),\n    0\n  )}.selection-grid__portrait:after{background:var(--kul_messenger_portrait_foredrop_color);content:\"\";height:100%;left:0;pointer-events:none;position:absolute;top:0;transition:background-color var(--kul_messenger_transition);width:100%}.selection-grid__name{align-items:center;backdrop-filter:blur(5px);background-color:var(--kul_messenger_name_background_color);bottom:0;display:flex;height:var(--kul_messenger_name_height);left:0;position:absolute;transition:background-color var(--kul_messenger_transition);width:100%}.selection-grid__label{letter-spacing:var(--kul_messenger_letter_spacing);overflow:hidden;text-align:center;text-overflow:ellipsis;text-transform:uppercase;width:100%}";
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
        this.chat = {};
        this.covers = {};
        this.history = {};
        this.ui = {
            filters: {
                avatars: false,
                locations: false,
                outfits: false,
                styles: false,
            },
            panels: {
                isLeftCollapsed: false,
                isRightCollapsed: false,
            },
        };
        this.saveInProgress = false;
        this.connectionStatus = 'offline';
        this.kulAutosave = true;
        this.kulData = null;
        this.kulStyle = '';
        this.kulValue = null;
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
        const config = {
            currentCharacter: this.currentCharacter?.id,
            ui: this.ui,
        };
        this.kulEvent.emit({
            comp: this,
            id: this.rootElement.id,
            originalEvent: e,
            eventType,
            config,
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
        this.ui = {
            filters: {
                avatars: false,
                locations: false,
                outfits: false,
                styles: false,
            },
            panels: { isLeftCollapsed: false, isRightCollapsed: false },
        };
        this.history = {};
        this.#initStates();
    }
    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/
    #adapter = {
        components: { saveButton: null },
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
                byId: (id) => this.kulData.nodes.find((n) => n.id === id),
                chat: (character = this.currentCharacter) => this.chat[character.id],
                current: () => this.currentCharacter,
                history: (character = this.currentCharacter) => this.history[character.id],
                name: (character = this.currentCharacter) => character.value ||
                    character.id ||
                    character.description ||
                    '?',
                next: (character = this.currentCharacter) => {
                    if (!this.#hasCharacters()) {
                        return;
                    }
                    const nodes = this.kulData.nodes;
                    const currentIdx = nodes.findIndex((n) => n.id === character.id);
                    const nextIdx = (currentIdx + 1) % nodes.length;
                    return nodes[nextIdx];
                },
                list: () => this.kulData.nodes || [],
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
                        const node = root.children[index];
                        return {
                            node: root.children[index],
                            title: this.#adapter.get.image.title(node),
                            value: node.cells.kulImage.value,
                        };
                    }
                    catch (error) {
                        switch (type) {
                            case 'avatars':
                                return { value: AVATAR_COVER };
                            case 'locations':
                                return { value: LOCATION_COVER };
                            case 'outfits':
                                return { value: OUTFIT_COVER };
                            case 'styles':
                                return { value: STYLE_COVER };
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
                root: (type, character = this.currentCharacter) => {
                    const node = character.children.find((n) => n.id === type);
                    if (!node) {
                        throw new Error(`Child node with id '${type}' not found`);
                    }
                    return node;
                },
                title: (node) => {
                    const title = node.value || '';
                    const description = node.description || '';
                    return title && description
                        ? `${title} - ${description}`
                        : description
                            ? description
                            : title
                                ? title
                                : '';
                },
            },
            messenger: {
                config: () => {
                    return {
                        currentCharacter: this.currentCharacter.id,
                        ui: this.ui,
                    };
                },
                data: () => this.kulData,
                history: () => this.history,
                status: {
                    connection: () => this.connectionStatus,
                    save: {
                        inProgress: () => this.saveInProgress,
                    },
                },
                ui: () => this.ui,
            },
        },
        set: {
            character: {
                chat: (chat, character = this.currentCharacter) => (this.chat[character.id] = chat),
                current: (character) => {
                    this.currentCharacter = character;
                },
                history: (history, character = this.currentCharacter) => {
                    if (this.history[character.id] !== history) {
                        this.history[character.id] = history;
                        if (this.kulAutosave) {
                            this.#adapter.set.messenger.data();
                        }
                    }
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
            },
            messenger: {
                data: () => {
                    if (!this.#hasNodes()) {
                        return;
                    }
                    this.saveInProgress = true;
                    this.#save().then(() => {
                        requestAnimationFrame(() => {
                            const button = this.#adapter.components.saveButton;
                            button.kulIcon = 'check';
                            button.kulLabel = 'Saved!';
                            button.kulShowSpinner = false;
                        });
                        setTimeout(() => {
                            requestAnimationFrame(() => (this.saveInProgress = false));
                        }, 1000);
                    });
                },
                status: {
                    connection: (status) => (this.connectionStatus = status),
                    save: {
                        inProgress: (value) => (this.saveInProgress = value),
                    },
                },
                ui: {
                    filters: (filters) => {
                        this.ui.filters = filters;
                        this.refresh();
                    },
                    panel: (panel, value = panel === 'left'
                        ? !this.ui.panels.isLeftCollapsed
                        : !this.ui.panels.isRightCollapsed) => {
                        switch (panel) {
                            case 'left':
                                this.ui.panels.isLeftCollapsed = value;
                                break;
                            case 'right':
                                this.ui.panels.isRightCollapsed = value;
                                break;
                        }
                        this.refresh();
                        return value;
                    },
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
            const chat = character.children?.find((n) => n.id === 'chat');
            this.chat[character.id] = {};
            const chatCell = chat?.cells?.kulChat;
            if (chatCell) {
                const characterChat = this.chat[character.id];
                characterChat.kulEndpointUrl = chatCell.kulEndpointUrl;
                characterChat.kulMaxTokens = chatCell.kulMaxTokens;
                characterChat.kulPollingInterval = chatCell.kulPollingInterval;
                characterChat.kulTemperature = chatCell.kulTemperature;
            }
            const history = chatCell?.kulValue || chatCell?.value || [];
            this.history[character.id] = JSON.stringify(history);
            this.covers[character.id] = covers;
        }
        if (this.kulValue) {
            const currentCharacter = this.kulValue.currentCharacter;
            const filters = this.kulValue.ui.filters;
            const panels = this.kulValue.ui.panels;
            if (currentCharacter) {
                this.currentCharacter =
                    this.#adapter.get.character.byId(currentCharacter);
            }
            for (const key in filters) {
                if (Object.prototype.hasOwnProperty.call(filters, key)) {
                    const filter = filters[key];
                    this.ui.filters[key] = filter;
                }
            }
            for (const key in panels) {
                if (Object.prototype.hasOwnProperty.call(panels, key)) {
                    const panel = panels[key];
                    this.ui.panels[key] = panel;
                }
            }
        }
    }
    async #save() {
        for (let index = 0; index < this.kulData.nodes.length; index++) {
            const character = this.kulData.nodes[index];
            const id = character.id;
            const chatNode = character.children.find((n) => n.id === 'chat');
            const chatComp = this.#adapter.get.character.chat(character);
            const saveChat = () => {
                if (this.history[id] && chatNode) {
                    const historyJson = JSON.parse(this.history[id]);
                    try {
                        chatNode.cells.kulChat.value = historyJson;
                    }
                    catch (error) {
                        chatNode.cells = {
                            kulChat: {
                                shape: 'chat',
                                value: historyJson,
                            },
                        };
                    }
                    chatNode.cells.kulChat.kulEndpointUrl =
                        chatComp.kulEndpointUrl;
                    chatNode.cells.kulChat.kulMaxTokens = chatComp.kulMaxTokens;
                    chatNode.cells.kulChat.kulPollingInterval =
                        chatComp.kulPollingInterval;
                    chatNode.cells.kulChat.kulSystem = chatComp.kulSystem;
                    chatNode.cells.kulChat.kulTemperature =
                        chatComp.kulTemperature;
                }
            };
            const saveCovers = () => {
                const avatars = this.#adapter.get.image.root('avatars');
                const locations = this.#adapter.get.image.root('locations');
                const outfits = this.#adapter.get.image.root('outfits');
                const styles = this.#adapter.get.image.root('styles');
                if (this.covers[id] && avatars) {
                    avatars.value = this.covers[id].avatars;
                }
                if (this.covers[id] && locations) {
                    locations.value = this.covers[id].locations;
                }
                if (this.covers[id] && outfits) {
                    outfits.value = this.covers[id].outfits;
                }
                if (this.covers[id] && styles) {
                    styles.value = this.covers[id].styles;
                }
            };
            saveChat();
            saveCovers();
        }
        this.onKulEvent(new CustomEvent('save'), 'save');
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
        return (h(Host, null, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))) : undefined, h("div", { id: KUL_WRAPPER_ID }, this.currentCharacter ? (h("div", { class: "messenger" }, prepLeft(this.#adapter), prepCenter(this.#adapter), prepRight(this.#adapter))) : (h("div", { class: "selection-grid" }, prepGrid(this.#adapter))))));
    }
    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
    }
};
KulMessenger.style = KulMessengerStyle0;

export { KulMessenger as kul_messenger };

//# sourceMappingURL=kul-messenger.entry.js.map