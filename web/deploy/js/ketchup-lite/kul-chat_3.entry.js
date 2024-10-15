import { h, F as Fragment, r as registerInstance, c as createEvent, g as getElement, f as forceUpdate, H as Host, a as getAssetPath } from './index-21ee70d9.js';
import { k as kulManagerInstance, g as getProps, K as KulThemeColorValues } from './kul-manager-57799b8b.js';
import { K as KUL_WRAPPER_ID, a as KUL_STYLE_ID } from './GenericVariables-0efba181.js';
import { K as KulDataCyAttributes } from './GenericTypes-8038330a.js';

/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
var KulChatProps;
(function (KulChatProps) {
    KulChatProps["kulContextWindow"] = "How many tokens the context window can handle, used to calculate the occupied space.";
    KulChatProps["kulEndpointUrl"] = "URL of the endpoint where the LLM is hosted.";
    KulChatProps["kulLayout"] = "Sets the layout of the chat.";
    KulChatProps["kulMaxTokens"] = "Maximum number of tokens allowed in the LLM's answer.";
    KulChatProps["kulPollingInterval"] = "How often the component checks whether the LLM endpoint is online or not.";
    KulChatProps["kulSeed"] = "Seed value for the LLM's answer generation.";
    KulChatProps["kulStyle"] = "Custom style of the component.";
    KulChatProps["kulSystem"] = "System message for the LLM.";
    KulChatProps["kulTemperature"] = "Sets the creative boundaries of the LLM.";
    KulChatProps["kulValue"] = "Initial history of the chat.";
})(KulChatProps || (KulChatProps = {}));

const OPTIONS_IDS = {
    contextWindow: 'context-option',
    endpointUrl: 'endpoint-option',
    maxTokens: 'maxtokens-option',
    polling: 'polling-option',
    system: 'system-option',
    temperature: 'temperature-option',
};
const prepSettings = (adapter) => {
    return (h(Fragment, null,
        prepButton(adapter),
        h("div", { class: "settings__options" }, prepFields(adapter)),
        h("kul-textfield", { id: OPTIONS_IDS.system, class: "settings__system kul-full-height", kulLabel: "System prompt", kulStyling: "textarea", kulValue: adapter.get.props.system(), "onKul-textfield-event": textfieldEventHandler.bind(textfieldEventHandler, adapter), ref: (el) => {
                if (el) {
                    adapter.components.textareas.system = el;
                }
            } })));
};
const prepButton = (adapter) => {
    return (h("kul-button", { class: "kul-full-width", kulIcon: "arrow_back", kulLabel: "Back", "onKul-button-event": backEventHandler.bind(backEventHandler, adapter) }));
};
const prepFields = (adapter) => {
    return (h(Fragment, null,
        h("kul-textfield", { id: OPTIONS_IDS.contextWindow, kulHtmlAttributes: {
                min: 10,
                step: 100,
                type: 'number',
            }, kulIcon: "data_usage", kulLabel: "Context window length", kulValue: String(adapter.get.props.contextWindow()).valueOf(), "onKul-textfield-event": textfieldEventHandler.bind(textfieldEventHandler, adapter) }),
        h("kul-textfield", { id: OPTIONS_IDS.temperature, kulHtmlAttributes: {
                min: 0,
                step: 0.1,
                type: 'number',
            }, kulIcon: "thermometer", kulLabel: "Temperature", kulValue: String(adapter.get.props.temperature()).valueOf(), "onKul-textfield-event": textfieldEventHandler.bind(textfieldEventHandler, adapter) }),
        h("kul-textfield", { id: OPTIONS_IDS.endpointUrl, kulIcon: "http", kulLabel: "Endpoint URL", kulValue: adapter.get.props.endpointUrl(), "onKul-textfield-event": textfieldEventHandler.bind(textfieldEventHandler, adapter) }),
        h("kul-textfield", { id: OPTIONS_IDS.maxTokens, kulHtmlAttributes: {
                min: 10,
                step: 100,
                type: 'number',
            }, kulIcon: "plus_one", kulLabel: "Max tokens count", kulValue: String(adapter.get.props.maxTokens()).valueOf(), "onKul-textfield-event": textfieldEventHandler.bind(textfieldEventHandler, adapter) }),
        h("kul-textfield", { id: OPTIONS_IDS.polling, kulHtmlAttributes: {
                min: 10,
                step: 10,
                type: 'number',
            }, kulIcon: "timer", kulLabel: "Polling interval", kulValue: String(adapter.get.props.pollingInterval()).valueOf(), "onKul-textfield-event": textfieldEventHandler.bind(textfieldEventHandler, adapter) })));
};
const backEventHandler = (adapter, e) => {
    const { eventType } = e.detail;
    switch (eventType) {
        case 'click':
            adapter.emit.event('config');
            adapter.set.status.view('chat');
            break;
    }
};
const textfieldEventHandler = (adapter, e) => {
    const { eventType, id, value } = e.detail;
    switch (eventType) {
        case 'change':
            switch (id) {
                case OPTIONS_IDS.contextWindow:
                    adapter.set.props.contextWindow(parseInt(value));
                    break;
                case OPTIONS_IDS.endpointUrl:
                    adapter.set.props.endpointUrl(value);
                    break;
                case OPTIONS_IDS.maxTokens:
                    adapter.set.props.maxTokens(parseInt(value));
                    break;
                case OPTIONS_IDS.polling:
                    adapter.set.props.pollingInterval(parseInt(value));
                    break;
                case OPTIONS_IDS.system:
                    adapter.set.props.system(value);
                    break;
                case OPTIONS_IDS.temperature:
                    adapter.set.props.temperature(parseFloat(value));
                    break;
            }
            break;
    }
};

const prepInputArea = (adapter) => {
    return (h("div", { class: "chat__request__input" },
        h("kul-button", { class: "chat__request__input__button kul-full-height", id: "settings-button", kulIcon: "settings", kulStyling: "flat", "onKul-button-event": buttonEventHandler.bind(buttonEventHandler, adapter), ref: (el) => {
                if (el) {
                    adapter.components.buttons.settings = el;
                }
            } }),
        h("kul-textfield", { class: "chat__request__input__textarea", kulFullWidth: true, kulLabel: "What's on your mind?", kulStyling: "textarea", ref: (el) => {
                if (el) {
                    adapter.components.textareas.prompt = el;
                }
            } }),
        prepProgressBar(adapter)));
};
const prepButtons = (adapter) => {
    return (h("div", { class: "chat__request__buttons" },
        h("kul-button", { id: "clear-button", kulLabel: "Clear", kulStyling: 'flat', "onKul-button-event": buttonEventHandler.bind(buttonEventHandler, adapter), ref: (el) => {
                if (el) {
                    adapter.components.buttons.clear = el;
                }
            }, title: "Clear the textarea." }),
        h("kul-button", { id: "stt-button", class: "chat__request__buttons__stt", kulIcon: "keyboard_voice", kulStyling: 'icon', "onKul-button-event": buttonEventHandler.bind(buttonEventHandler, adapter), ref: (el) => {
                if (el) {
                    adapter.components.buttons.stt = el;
                }
            }, title: "Activate Speech To Text with your browser's API (if supported)." },
            h("kul-spinner", { kulActive: true, kulDimensions: "0.6em", kulLayout: 6, slot: "spinner" })),
        h("kul-button", { id: "send-button", kulIcon: "check", kulLabel: "Send", "onKul-button-event": buttonEventHandler.bind(buttonEventHandler, adapter), ref: (el) => {
                if (el) {
                    adapter.components.buttons.send = el;
                }
            }, title: "Send your prompt (CTRL+Enter)." },
            h("kul-spinner", { kulActive: true, kulDimensions: "0.6em", slot: "spinner" }))));
};
const prepProgressBar = (adapter) => {
    const cssClass = {
        chat__request__input__progressbar: true,
        ['kul-animated']: true,
        ['kul-striped']: true,
    };
    return (h("kul-progressbar", { class: cssClass, kulCenteredLabel: true, kulIcon: "data_usage", kulLabel: "Context window", "onKul-progressbar-event": progressbarEventHandler.bind(progressbarEventHandler, adapter), ref: (el) => {
            if (el) {
                adapter.components.progressbar = el;
            }
        } }));
};
const buttonEventHandler = async (adapter, e) => {
    const { eventType, id } = e.detail;
    const textarea = adapter.components.textareas.prompt;
    switch (eventType) {
        case 'click':
            switch (id) {
                case 'clear-button':
                    await textarea.setValue('');
                    await textarea.setFocus();
                    break;
                case 'send-button':
                    adapter.actions.send();
                    break;
                case 'settings-button':
                    adapter.set.status.view('settings');
                    break;
                case 'stt-button':
                    adapter.actions.stt();
                    break;
            }
    }
};
const progressbarEventHandler = async (adapter, e) => {
    const { eventType } = e.detail;
    switch (eventType) {
        case 'ready':
            adapter.actions.updateTokenCount();
            break;
    }
};

const prepMessages = (adapter) => {
    const elements = [];
    const history = adapter.get.history();
    const toolbarMessage = adapter.get.status.toolbarMessage();
    if (history?.length > 0) {
        history.forEach((m) => {
            const element = (h("div", { class: `chat__messages__container chat__messages__container--${m.role}`, onPointerEnter: () => adapter.set.status.toolbarMessage(m), onPointerLeave: () => adapter.set.status.toolbarMessage(null) },
                h("div", { class: `chat__messages__content chat__messages__content--${m.role}` }, prepContent(m)),
                m === toolbarMessage ? prepToolbar(adapter, m) : null));
            elements.push(element);
        });
    }
    else {
        elements.push(h("div", { class: "chat__messages__empty" }, "Your chat history is empty!"));
    }
    return elements;
};
const prepToolbar = (adapter, m) => {
    const cssClass = 'chat__messages__toolbar__button kul-slim';
    return (h("div", { class: "chat__messages__toolbar" },
        h("kul-button", { class: cssClass + ' kul-danger', kulIcon: "delete", onClick: () => adapter.actions.delete(m), title: "Remove this message from history." }),
        h("kul-button", { class: cssClass, kulIcon: "content_copy", onClick: () => navigator.clipboard.writeText(m.content), title: "Copy text to clipboard." }),
        m.role === 'user' ? (h("kul-button", { class: cssClass, kulIcon: "refresh", onClick: () => adapter.actions.regenerate(m), title: "Regenerate answer to this question." })) : null));
};
const prepContent = (message) => {
    const elements = [];
    const messageContent = message.content;
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    let lastIndex = 0;
    let match;
    while ((match = codeBlockRegex.exec(messageContent)) !== null) {
        if (match.index > lastIndex) {
            const textPart = messageContent.slice(lastIndex, match.index);
            elements.push(h("div", { class: "paragraph" }, textPart));
        }
        const language = match[1] ? match[1].trim() : 'text';
        const codePart = match[2].trim();
        elements.push(h("kul-code", { class: 'code', kulLanguage: language, kulValue: codePart }));
        lastIndex = match.index + match[0].length;
    }
    if (lastIndex < messageContent.length) {
        const remainingText = messageContent.slice(lastIndex);
        elements.push(h("div", { class: "paragraph" }, remainingText));
    }
    return elements;
};

const prepChat = (adapter) => {
    return (h(Fragment, null,
        h("div", { class: "chat__request" },
            prepInputArea(adapter),
            prepButtons(adapter)),
        h("div", { class: `chat__messages` }, prepMessages(adapter)),
        h("div", { class: "chat__spinner-bar" },
            h("kul-spinner", { kulBarVariant: true, ref: (el) => {
                    if (el) {
                        adapter.components.spinner = el;
                    }
                } }))));
};

const kulChatCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}:host{--kul_chat_blur_radius:var(--kul-chat-blur-radius, 3.5px);--kul_chat_border_radius:var(--kul-chat-border-radius, 8px);--kul_chat_buttons_padding:var(--kul-chat-buttons-padding, 1em 0);--kul_chat_grid_gap:var(--kul-chat-grid-gap, 16px);--kul_chat_inner_padding:var(--kul-chat-inner-padding, 0 16px);--kul_chat_margin_bottom:var(--kul-chat-margin-bottom, 16px);--kul_chat_margin_top:var(--kul-chat-margin-top, 16px);--kul_chat_outer_grid_gap:var(--kul-chat-outer-grid-gap, 12px);--kul_chat_padding:var(--kul-chat-padding, 18px);--kul-chat_small_font_size:var(--kul-chat-small-font-size, 0.875em);--kul_chat_spinner_size:var(--kul-chat-spinner-size, 48px);--kul_chat_title_font_size:var(--kul-chat-title-font-size, 2em);color:var(--kul-text-color);display:block;height:100%;width:100%}#kul-component{height:100%;position:relative;width:100%}.chat{backdrop-filter:blur(var(--kul_chat_blur_radius));box-sizing:border-box;display:grid;height:100%;margin:auto;padding:var(--kul_chat_padding)}.chat--bottom-textarea{align-content:center;grid-gap:var(--kul_chat_outer_grid_gap);grid-template-areas:\"messages\" \"spinner\" \"request\";grid-template-rows:1fr auto auto}.chat--top-textarea{grid-gap:var(--kul_chat_outer_grid_gap);grid-template-areas:\"request\" \"messages\" \"spinner\";grid-template-rows:auto 1fr auto}.chat--offline{grid-template-rows:1fr auto}.chat--offline__error{padding:32px}.chat__request{box-sizing:border-box;grid-area:request;max-width:100%;padding:var(--kul_chat_inner_padding);width:100%}.chat__request__input{display:grid;grid-template-areas:\"textarea button\" \"progressbar button\";grid-template-columns:1fr auto}.chat__request__input__button{--kul-button-border-radius:0;--kul-button-padding:0 1em;grid-area:button}.chat__request__input__progressbar{--kul-progressbar-border-radius:0;--kul-progressbar-height:1.75em;grid-area:progressbar}.chat__request__input__textarea{--kul-textfield-border-radius:0;grid-area:textarea;overflow-x:hidden}.chat__request__buttons{align-items:center;display:flex;justify-content:space-evenly;padding:var(--kul_chat_buttons_padding)}.chat__request__buttons__stt{padding:0 1em}.chat__messages{align-content:start;box-sizing:border-box;display:grid;grid-area:messages;grid-gap:var(--kul_chat_grid_gap);grid-template-columns:1fr;margin-bottom:var(--kul_chat_margin_top);margin-top:var(--kul_chat_margin_top);overflow:auto;padding:var(--kul_chat_inner_padding);white-space:pre-line;width:100%;word-break:normal}.chat__messages__container{backdrop-filter:blur(var(--kul_chat_blur_radius));background-color:rgba(var(--kul-background-color-rgb), 0.125);border:1px solid rgba(var(--kul-text-color-rgb), 0.5);border-radius:var(--kul_chat_border_radius);display:flex;height:max-content;max-width:80%;position:relative;transition:background-color 225ms ease}.chat__messages__container:hover{background-color:rgba(var(--kup-primary-color-rgb), 0.325)}.chat__messages__container--assistant{justify-self:start}.chat__messages__container--user{justify-self:end}.chat__messages__empty{font-size:var(--kul_chat_small_font_size);font-style:italic;opacity:0.5;text-align:center}.chat__messages__content{font-family:var(--kul-font-family);font-size:calc(var(--kul-font-size) * 1.125);max-width:100%;padding:12px}.chat__messages__toolbar{animation:fade-in-flex 0.25s ease-out;border:0;border-bottom-right-radius:var(--kul_chat_border_radius);border-top-right-radius:var(--kul_chat_border_radius);border-top:1px inset rgba(var(--kul-text-color-rgb), 0.225);box-sizing:border-box;display:flex;flex-direction:column;flex-flow:wrap-reverse;height:100%;justify-content:end;padding:12px;transition:width 125ms ease, opacity 125ms ease, padding 125ms ease}.chat__messages__toolbar__button{margin:4px}.chat__spinner-bar{bottom:0;grid-area:spinner;height:4px;left:0;position:absolute;width:100%}.chat__title{text-align:center;font-size:var(--kul_chat_title_font_size)}.chat__text{font-size:var(--kul_chat_small_font_size);font-style:italic;opacity:0.5;text-align:center}.settings{display:grid;grid-gap:8px;grid-template-rows:auto auto 1fr;height:100%}.settings__system{box-sizing:border-box;overflow:hidden;padding-top:18px}";
const KulChatStyle0 = kulChatCss;

const KulChat = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-chat-event", 6);
        this.debugInfo = {
            endTime: 0,
            renderCount: 0,
            renderEnd: 0,
            renderStart: 0,
            startTime: performance.now(),
        };
        this.history = [];
        this.status = 'connecting';
        this.toolbarMessage = undefined;
        this.view = 'chat';
        this.kulContextWindow = 8192;
        this.kulEndpointUrl = 'http://localhost:5001';
        this.kulLayout = 'top-textarea';
        this.kulMaxTokens = 250;
        this.kulPollingInterval = 10000;
        this.kulSeed = -1;
        this.kulStyle = '';
        this.kulSystem = 'You are a helpful and cheerful assistant eager to help the user out with his tasks.';
        this.kulTemperature = 0.7;
        this.kulValue = [];
    }
    get rootElement() { return getElement(this); }
    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/
    #kulManager = kulManagerInstance();
    #statusinterval;
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
            eventType,
            id: this.rootElement.id,
            originalEvent: e,
            history: JSON.stringify(this.history) || '',
            status: this.status,
        });
    }
    /*-------------------------------------------------*/
    /*                L i s t e n e r s                */
    /*-------------------------------------------------*/
    listenKeydown(e) {
        switch (e.key) {
            case 'Enter':
                if (e.ctrlKey) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.#adapter.actions.send();
                }
                break;
            default:
                e.stopPropagation();
        }
    }
    /*-------------------------------------------------*/
    /*                 W a t c h e r s                 */
    /*-------------------------------------------------*/
    async updateTokensCount() {
        const progressbar = this.#adapter.components.progressbar;
        const system = this.#adapter.components.textareas.system;
        if (!this.kulContextWindow || !progressbar) {
            return;
        }
        let count = this.kulSystem ? this.kulSystem.length / 4 : 0;
        this.history.forEach((m) => (count += m.content.length));
        const estimated = count / 4;
        const value = (estimated / this.kulContextWindow) * 100;
        requestAnimationFrame(() => {
            if (progressbar) {
                if (value > 90) {
                    progressbar.classList.add('kul-danger');
                }
                else {
                    progressbar.classList.remove('kul-danger');
                }
                progressbar.kulValue = value;
                progressbar.title = `Estimated tokens used: ${estimated}/${this.kulContextWindow}`;
            }
            if (system) {
                system.setValue(this.kulSystem);
            }
        });
    }
    /*-------------------------------------------------*/
    /*           P u b l i c   M e t h o d s           */
    /*-------------------------------------------------*/
    /**
     * Retrieves the debug information reflecting the current state of the component.
     * @returns {Promise<KulDebugComponentInfo>} A promise that resolves to a KulDebugComponentInfo object containing debug information.
     */
    async getDebugInfo() {
        return this.debugInfo;
    }
    /**
     * Returns the full history as a string.
     * @returns {Promise<string>} Full history of the chat.
     */
    async getHistory() {
        try {
            return JSON.stringify(this.history);
        }
        catch {
            return '';
        }
    }
    /**
     * Returns the last message as a string.
     * @returns {Promise<string>} The last message of the history.
     */
    async getLastMessage() {
        return this.history?.slice(-1)?.[0]?.content ?? '';
    }
    /**
     * Retrieves the properties of the component, with optional descriptions.
     * @param {boolean} descriptions - If true, returns properties with descriptions; otherwise, returns properties only.
     * @returns {Promise<GenericObject>} A promise that resolves to an object where each key is a property name, optionally with its description.
     */
    async getProps(descriptions) {
        return getProps(this, KulChatProps, descriptions);
    }
    /**
     * Triggers a re-render of the component to reflect any state changes.
     */
    async refresh() {
        forceUpdate(this);
    }
    /**
     * Sets the history of the component through a string.
     */
    async setHistory(history) {
        try {
            const cb = () => (this.history = JSON.parse(history));
            this.#updateHistory(cb);
        }
        catch { }
    }
    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/
    #adapter = {
        actions: {
            delete: (m) => {
                const index = this.history.indexOf(m);
                if (index !== -1) {
                    const cb = () => this.history.splice(index, 1);
                    this.#updateHistory(cb);
                    this.refresh();
                }
            },
            disableInteractivity: (shouldDisable) => {
                this.#adapter.components.buttons.send.kulShowSpinner =
                    shouldDisable;
                this.#adapter.components.textareas.prompt.kulDisabled =
                    shouldDisable;
                this.#adapter.components.buttons.stt.kulDisabled =
                    shouldDisable;
            },
            regenerate: (m) => {
                const index = this.history.indexOf(m);
                if (index !== -1) {
                    const cb = () => (this.history = this.history.slice(0, index + 1));
                    this.#updateHistory(cb);
                    this.#sendPrompt();
                }
            },
            send: async () => {
                const textarea = this.#adapter.components.textareas.prompt;
                await textarea.setBlur();
                const prompt = await textarea.getValue();
                if (prompt) {
                    const newMessage = {
                        role: 'user',
                        content: prompt,
                    };
                    const cb = () => (this.history = [...this.history, newMessage]);
                    this.#updateHistory(cb);
                    this.#sendPrompt();
                }
            },
            stt: () => this.#kulManager.llm.speechToText(this.#adapter.components.textareas.prompt, this.#adapter.components.buttons.stt),
            updateTokenCount: async () => this.updateTokensCount(),
        },
        components: {
            buttons: {
                clear: null,
                send: null,
                settings: null,
                stt: null,
            },
            progressbar: null,
            spinner: null,
            textareas: { prompt: null, system: null },
        },
        emit: {
            event: (eventType, e = new CustomEvent(eventType)) => {
                this.onKulEvent(e, eventType);
            },
        },
        get: {
            history: () => this.history,
            manager: () => this.#kulManager,
            status: {
                connection: () => this.status,
                toolbarMessage: () => this.toolbarMessage,
                view: () => this.view,
            },
            props: {
                contextWindow: () => this.kulContextWindow,
                endpointUrl: () => this.kulEndpointUrl,
                maxTokens: () => this.kulMaxTokens,
                pollingInterval: () => this.kulPollingInterval,
                system: () => this.kulSystem,
                temperature: () => this.kulTemperature,
            },
        },
        set: {
            props: {
                contextWindow: (value) => (this.kulContextWindow = value),
                endpointUrl: (value) => (this.kulEndpointUrl = value),
                maxTokens: (value) => (this.kulMaxTokens = value),
                pollingInterval: (value) => (this.kulPollingInterval = value),
                system: (value) => (this.kulSystem = value),
                temperature: (value) => (this.kulTemperature = value),
            },
            status: {
                connection: (status) => (this.status = status),
                toolbarMessage: (element) => (this.toolbarMessage = element),
                view: (view) => (this.view = view),
            },
        },
    };
    async #checkLLMStatus() {
        if (this.status === 'offline') {
            this.status = 'connecting';
        }
        try {
            const response = await this.#kulManager.llm.poll(this.kulEndpointUrl);
            if (!response.ok) {
                this.status = 'offline';
            }
            else {
                this.status = 'ready';
            }
        }
        catch (error) {
            this.status = 'offline';
        }
        this.onKulEvent(new CustomEvent('polling'), 'polling');
    }
    #prepConnecting = () => {
        return (h(Fragment, null, h("div", { class: "spinner" }, h("kul-spinner", { kulActive: true, kulLayout: 6, kulDimensions: "7px" })), h("div", { class: "chat__title" }, "Just a moment."), h("div", { class: "chat__text" }, "Contacting your LLM endpoint...")));
    };
    #prepOffline = () => {
        return (h(Fragment, null, h("div", { class: "chat__error" }, h("kul-image", { kulValue: "hotel", kulSizeX: "4em", kulSizeY: "4em" }), h("div", { class: "chat__title" }, "Zzz..."), h("div", { class: "chat__text" }, "The LLM endpoint seems to be offline!")), h("kul-button", { class: "chat__config kul-full-width", kulIcon: "wrench", kulLabel: "Configuration", kulStyling: "flat", "onKul-button-event": (e) => {
                const { eventType } = e.detail;
                switch (eventType) {
                    case 'click':
                        this.#adapter.set.status.view('settings');
                        break;
                }
            } })));
    };
    async #sendPrompt() {
        const disabler = this.#adapter.actions.disableInteractivity;
        const textarea = this.#adapter.components.textareas.prompt;
        this.#adapter.components.spinner.kulActive = true;
        requestAnimationFrame(() => disabler(true));
        const request = {
            temperature: this.kulTemperature,
            max_tokens: this.kulMaxTokens,
            seed: this.kulSeed,
            messages: this.history.map((msg) => ({
                role: msg.role,
                content: msg.content,
            })),
        };
        if (this.kulSystem) {
            request.messages.unshift({
                role: 'system',
                content: this.kulSystem,
            });
        }
        try {
            const response = await this.#kulManager.llm.fetch(request, this.kulEndpointUrl);
            const message = response.choices?.[0]?.message?.content;
            const llmMessage = {
                role: 'assistant',
                content: message,
            };
            const cb = () => this.history.push(llmMessage);
            this.#updateHistory(cb);
            await this.refresh();
            disabler(false);
            this.#adapter.components.spinner.kulActive = false;
            await textarea.setValue('');
            await textarea.setFocus();
        }
        catch (error) {
            console.error('Error calling LLM:', error);
            const cb = () => this.history.pop();
            this.#updateHistory(cb);
        }
    }
    #updateHistory(cb) {
        cb();
        this.#adapter.actions.updateTokenCount();
        this.onKulEvent(new CustomEvent('update'), 'update');
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentWillLoad() {
        this.#kulManager.theme.register(this);
        if (this.kulValue) {
            try {
                const parsedValue = typeof this.kulValue === 'string'
                    ? JSON.parse(this.kulValue)
                    : this.kulValue;
                const cb = () => (this.history = parsedValue);
                this.#updateHistory(cb);
            }
            catch (error) {
                this.#kulManager.debug.logMessage(this, "Couldn't set value for chat history", 'warning');
            }
        }
    }
    componentDidLoad() {
        this.#statusinterval = setInterval(() => {
            this.#checkLLMStatus();
        }, this.kulPollingInterval);
        this.onKulEvent(new CustomEvent('ready'), 'ready');
        this.#checkLLMStatus();
        this.#kulManager.debug.updateDebugInfo(this, 'did-load');
    }
    componentWillRender() {
        this.#kulManager.debug.updateDebugInfo(this, 'will-render');
    }
    componentDidRender() {
        this.#kulManager.debug.updateDebugInfo(this, 'did-render');
    }
    render() {
        return (h(Host, { key: '7f25f4217fcb5829f526948b56f8695398f470bb' }, this.kulStyle && (h("style", { key: '4a4c4defd1ece21160fb267cbaf80c148de5e179', id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))), h("div", { key: '3a54cf5519dd5bc193a46ff6744135ccc86f2e87', id: KUL_WRAPPER_ID }, h("div", { key: '4bebb8a0d019dcdbe9c68eeeb9f571ca3af434fa', class: `${this.view} ${this.view}--${this.kulLayout} ${this.view}--${this.status}` }, this.view === 'settings'
            ? prepSettings(this.#adapter)
            : this.status === 'ready'
                ? prepChat(this.#adapter)
                : this.status === 'connecting'
                    ? this.#prepConnecting()
                    : this.#prepOffline()))));
    }
    disconnectedCallback() {
        clearInterval(this.#statusinterval);
        this.#kulManager.theme.unregister(this);
    }
    static get watchers() { return {
        "kulSystem": ["updateTokensCount"]
    }; }
};
KulChat.style = KulChatStyle0;

/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
var KulChipProps;
(function (KulChipProps) {
    KulChipProps["kulData"] = "The data of the chip chip.";
    KulChipProps["kulRipple"] = "When set to true, the pointerdown event will trigger a ripple effect.";
    KulChipProps["kulStyle"] = "Custom style of the component.";
    KulChipProps["kulStyling"] = "Styling of the chip component, includes: \"choice\", \"input\", \"filter\" and \"standard\".";
})(KulChipProps || (KulChipProps = {}));

const kulChipCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}:host{--kul_chip_background_color:var(\n    --kul-chip-background-color,\n    var(--kul-background-color)\n  );--kul_chip_border_radius:var(--kul-chip-border-radius, 16px);--kul_chip_font_family:var(--kul-chip-font-family, var(--kul-font-family));--kul_chip_font_size:var(--kul-chip-font-size, var(--kul-font-size));--kul_chip_font_weight:var(--kul-chip-font-weight, var(--kul-font-weight));--kul_chip_height:var(--kul-chip-height, 32px);--kul_chip_indent_multiplier:var(--kul-chip-indent-multiplier, 10);--kul_chip_margin:var(--kul-chip-margin, 4px);--kul_chip_padding:var(--kul-chip-padding, 0 12px);--kul_chip_primary_color:var(\n    --kul-chip-primary-color,\n    var(--kul-primary-color)\n  );--kul_chip_primary_color_rgb:var(\n    --kul-chip-primary-color-rgb,\n    var(--kul-primary-color-rgb)\n  );--kul_chip_text_color:var(--kul-chip-text-color, var(--kul-text-color));--kul_chip_text_color_rgb:var(\n    --kul-chip-text_color_rgb,\n    var(--kul-text-color-rgb)\n  )}:host{-webkit-backdrop-filter:var(--kul_list_backdrop_filter);backdrop-filter:var(--kul_list_backdrop_filter);background-color:var(--kul_list_background_color);display:block;font-family:var(--kul_chip_font_family);font-size:var(--kul_chip_font_size);height:100%;outline:none;width:100%}#kul-component,.chip-set{height:100%;width:100%}.chip-set{align-content:center;box-sizing:border-box;display:flex;flex-wrap:wrap;justify-content:center;padding:4px}.chip-set--choice .chip,.chip-set--filter .chip,.chip-set--input .chip{cursor:pointer}.chip-set--choice .chip--selected{background-color:var(--kul_chip_background_color);background-image:linear-gradient(to right, rgba(var(--kul_chip_primary_color_rgb), 0.25) 0%, rgba(var(--kul_chip_primary_color_rgb), 0.25) 0.1%, rgba(var(--kul_chip_primary_color_rgb), 0.25));color:var(--kul_chip_primary_color)}.chip-set--filter .chip__icon--leading{opacity:1;transition:opacity 75ms linear;transition-delay:-50ms}.chip-set--filter .chip__icon--leading+.chip__checkmark{opacity:0;transition:opacity 75ms linear;transition-delay:80ms}.chip-set--filter .chip__icon--leading+.chip__checkmark .chip__checkmark-svg{transition:width 0ms}.chip-set--filter .chip__icon--leading.chip__icon--leading-hidden{display:none;width:0;opacity:0}.chip-set--filter .chip__icon--leading.chip__icon--leading-hidden+.chip__checkmark{height:20px;width:20px;opacity:1}.chip-set--filter .chip--selected .chip__icon--leading{opacity:0}.chip-set--filter .chip--selected .chip__checkmark-path{stroke-dashoffset:0}.chip-set--filter .chip--selected .chip__checkmark{margin-left:-4px;margin-right:4px}.chip-set--filter .chip--selected .chip__checkmark .chip__checkmark-svg{height:20px;width:20px}.chip-set--input .kul-clear-icon{margin-left:4px;margin-right:-4px}.chip-set--input .kul-clear-icon:hover{opacity:0.75}.node{display:flex;flex-direction:column}.node__expand{background-color:var(--kul_chip_text_color);cursor:pointer;height:1.5em;margin:0;-webkit-mask:var(--kul-collapsed-icon);mask:var(--kul-collapsed-icon);overflow:hidden;transition:transform 125ms ease;width:1.5em}.node__expand:hover{transform:scale(1.25)}.node__expand--expanded{-webkit-mask:var(--kul-expanded-icon);mask:var(--kul-expanded-icon)}.node__expand--placeholder{visibility:hidden}.chip-wrapper{align-items:center;display:flex}.chip-wrapper--hidden-children .dropdown-icon{transform:unset}.indent{width:calc(var(--kul_chip_margin) * var(--kul_chip_indent_offset) * var(--kul_chip_indent_multiplier))}.chip{align-items:center;background-color:var(--kul_chip_background_color);background-image:linear-gradient(to right, rgba(var(--kul_chip_text_color_rgb), 0.1) 0%, rgba(var(--kul_chip_text_color_rgb), 0.1) 0.1%, rgba(var(--kul_chip_text_color_rgb), 0.1));border-radius:var(--kul_chip_border_radius);border-width:0;box-sizing:border-box;color:var(--kul_chip_text_color);display:inline-flex;font-size:0.875em;font-weight:var(--kul_chip_font_weight);height:var(--kul_chip_height);letter-spacing:0.0178571429em;margin:var(--kul_chip_margin);max-width:max-content;outline:none;padding:var(--kul_chip_padding);position:relative;text-decoration:inherit;text-transform:inherit}.chip__icon--leading{color:var(--kul_chip_text_color)}.chip__icon--leading:not(.chip__icon--leading-hidden){margin-left:-4px;margin-right:6px}.chip__icon{background:var(--kul_chip_text_color);display:block;height:18px;outline:none;width:18px}.chip__icon--leading:not(.chip__icon--leading-hidden){width:20px;height:20px;font-size:20px}.chip__icon--trailing{margin-right:-4px;margin-left:6px}.chip__checkmark-svg{width:0;height:20px;transition:width 150ms cubic-bezier(0.4, 0, 0.2, 1)}.chip__checkmark-path{transition:stroke-dashoffset 150ms 50ms cubic-bezier(0.4, 0, 0.6, 1);stroke-width:2px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.chip svg path{color:var(--kul_chip_text_color);stroke:var(--kul_chip_text_color)}.chip__primary-action{outline:none}.chip__primary-action .chip__text{white-space:nowrap}:host(.kul-danger){--kul-chip-primary-color:var(--kul-danger-color);--kul-chip-primary-color-rgb:var(--kul-danger-color-rgb)}:host(.kul-info){--kul-chip-primary-color:var(--kul-info-color);--kul-chip-primary-color-rgb:var(--kul-info-color-rgb)}:host(.kul-secondary){--kul-chip-primary-color:var(--kul-secondary-color);--kul-chip-primary-color-rgb:var(--kul-secondary-color-rgb)}:host(.kul-success){--kul-chip-primary-color:var(--kul-success-color);--kul-chip-primary-color-rgb:var(--kul-success-color-rgb)}:host(.kul-warning){--kul-chip-primary-color:var(--kul-warning-color);--kul-chip-primary-color-rgb:var(--kul-warning-color-rgb)}";
const KulChipStyle0 = kulChipCss;

const KulChip = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-chip-event", 6);
        this.debugInfo = {
            endTime: 0,
            renderCount: 0,
            renderEnd: 0,
            renderStart: 0,
            startTime: performance.now(),
        };
        this.expandedNodes = new Set();
        this.hiddenNodes = new Set();
        this.selectedNodes = new Set();
        this.kulData = null;
        this.kulRipple = true;
        this.kulStyle = '';
        this.kulStyling = 'standard';
    }
    get rootElement() { return getElement(this); }
    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/
    #nodeItems = [];
    #kulManager = kulManagerInstance();
    #rippleSurface = [];
    /*-------------------------------------------------*/
    /*                   E v e n t s                   */
    /*-------------------------------------------------*/
    /**
     * Describes event emitted.
     */
    kulEvent;
    onKulEvent(e, eventType, args) {
        const { expansion, node } = args || {};
        switch (eventType) {
            case 'click':
                if (expansion && this.#hasChildren(node)) {
                    if (this.expandedNodes.has(node)) {
                        this.expandedNodes.delete(node);
                    }
                    else {
                        this.expandedNodes.add(node);
                    }
                    this.expandedNodes = new Set(this.expandedNodes);
                }
                else if (node) {
                    if (this.selectedNodes.has(node)) {
                        this.selectedNodes.delete(node);
                    }
                    else {
                        this.selectedNodes.add(node);
                    }
                    this.selectedNodes = new Set(this.selectedNodes);
                }
                break;
            case 'delete':
                const nodeIndex = this.kulData?.nodes?.indexOf(node);
                if (nodeIndex > -1) {
                    this.kulData.nodes.splice(nodeIndex, 1);
                    this.refresh();
                }
                break;
            case 'pointerdown':
                if (this.kulRipple && this.#isClickable()) {
                    this.#kulManager.theme.ripple.trigger(e, this.#rippleSurface[node.id]);
                }
                break;
        }
        this.kulEvent.emit({
            comp: this,
            eventType,
            id: this.rootElement.id,
            originalEvent: e,
            node,
            selectedNodes: this.selectedNodes,
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
     * @param {boolean} descriptions - When provided and true, the result will be the chip of props with their description.
     * @returns {Promise<GenericObject>} Chip of props as object, each key will be a prop.
     */
    async getProps(descriptions) {
        return getProps(this, KulChipProps, descriptions);
    }
    /**
     * Returns the selected nodes.
     * @returns {Promise<KulDataNode[]>} Selected nodes.
     */
    async getSelectedNodes() {
        return this.selectedNodes;
    }
    /**
     * Selects one or more nodes in the chip component.
     * @param {KulDataNode[] | string[]} nodes - An array of KulDataNode objects or node IDs to be selected.
     * @returns {Promise<void>}
     */
    async setSelectedNodes(nodes) {
        const nodesToAdd = new Set();
        const isStringArray = Array.isArray(nodes) &&
            nodes.every((item) => typeof item === 'string');
        this.kulData?.nodes?.forEach((n) => {
            if (isStringArray) {
                if (typeof n.id === 'string' && nodes.includes(n.id)) {
                    nodesToAdd.add(n);
                }
            }
            else {
                if (nodes.includes(n)) {
                    nodesToAdd.add(n);
                }
            }
        });
        this.selectedNodes = nodesToAdd;
    }
    /**
     * This method is used to trigger a new render of the component.
     */
    async refresh() {
        forceUpdate(this);
    }
    /*-------------------------------------------------*/
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/
    #hasChildren(node) {
        return !!(node.children && node.children.length);
    }
    #hasIconOnly(node) {
        return !!(node.icon && !node.value);
    }
    #isChoice() {
        return this.kulStyling === 'choice';
    }
    #isClickable() {
        return this.kulStyling === 'choice' || this.kulStyling === 'filter';
    }
    #isExpanded(node) {
        return this.expandedNodes.has(node);
    }
    #isFilter() {
        return this.kulStyling === 'filter';
    }
    #isInput() {
        return this.kulStyling === 'input';
    }
    #isSelected(node) {
        return this.selectedNodes.has(node);
    }
    #prepChip(node, i) {
        const className = {
            chip: true,
            'chip--only-icon': this.#hasIconOnly(node),
            'chip--selected': this.#isSelected(node),
        };
        return (h("div", { class: className, "data-value": node.id, onClick: (e) => {
                this.onKulEvent(e, 'click', { node });
            }, role: "row", title: node.description ?? '' }, this.#prepRipple(node), h("span", { class: "indent" }), this.#prepIcons(node), h("span", { role: "button", tabindex: i, class: "chip__primary-action", "data-cy": KulDataCyAttributes.INPUT, onBlur: (e) => {
                this.onKulEvent(e, 'blur', { node });
            }, onFocus: (e) => {
                this.onKulEvent(e, 'focus', { node });
            } }, h("span", { class: "chip__text" }, node.value)), this.#isInput() && this.#prepDeleteIcon(node)));
    }
    #prepChipSet() {
        const elements = [];
        const nodeCount = this.kulData?.nodes?.length;
        for (let i = 0; nodeCount && i < nodeCount; i++) {
            this.#nodeItems = [];
            const node = this.kulData.nodes[i];
            this.#prepNode(node, 0);
            elements.push(h("div", { class: "node" }, this.#nodeItems));
        }
        return elements;
    }
    #prepDeleteIcon(node) {
        const path = getAssetPath(`./assets/svg/clear.svg`);
        const style = {
            mask: `url('${path}') no-repeat center`,
            webkitMask: `url('${path}') no-repeat center`,
        };
        return (h("div", { class: "chip__icon chip__icon--trailing", "data-cy": KulDataCyAttributes.BUTTON, key: node.id + '_delete', onClick: (e) => {
                this.onKulEvent(e, 'delete', { node });
            }, style: style }));
    }
    #prepIcons(node) {
        const icons = [];
        const className = {
            chip__icon: true,
            'chip__icon--leading': true,
            'chip__icon--leading-hidden': this.kulStyling === 'filter' && this.#isSelected(node),
        };
        if (node.icon) {
            const path = getAssetPath(`./assets/svg/${node.icon}.svg`);
            const style = {
                mask: `url('${path}') no-repeat center`,
                webkitMask: `url('${path}') no-repeat center`,
            };
            icons.push(h("div", { class: className, style: style }));
        }
        if (this.#isFilter()) {
            icons.push(h("span", { class: "chip__checkmark" }, h("svg", { class: "chip__checkmark-svg", viewBox: "-2 -3 30 30" }, h("path", { class: "chip__checkmark-path", fill: "none", stroke: "black", d: "M1.73,12.91 8.1,19.28 22.79,4.59" }))));
        }
        return icons;
    }
    #prepNode(node, indent) {
        const className = {
            'chip-wrapper': true,
            'chip-wrapper--hidden-children': this.#hasChildren(node) && !this.#showChildren(node),
        };
        const indentStyle = {
            ['--kul_chip_indent_offset']: indent.toString(),
        };
        this.#nodeItems.push(h("div", { class: className }, h("div", { class: "indent", style: indentStyle }), this.#hasChildren(node) ? (h("div", { class: `node__expand ${this.#isExpanded(node) ? 'node__expand--expanded' : ''}`, onClick: (e) => {
                this.onKulEvent(e, 'click', {
                    expansion: true,
                    node,
                });
            } })) : indent ? (h("div", { class: `node__expand node__expand--placeholder` })) : null, this.#prepChip(node, indent)));
        if (this.#showChildren(node)) {
            for (let index = 0; index < node.children.length; index++) {
                if (node.children[index]) {
                    this.#prepNode(node.children[index], indent + 1);
                }
            }
        }
    }
    #prepRipple(node) {
        if (this.kulRipple && this.#isClickable()) {
            return (h("div", { onPointerDown: (e) => this.onKulEvent(e, 'pointerdown', { node }), ref: (el) => {
                    if (el && this.kulRipple) {
                        this.#rippleSurface[node.id] = el;
                    }
                } }));
        }
    }
    #showChildren(node) {
        return this.expandedNodes.has(node);
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentWillLoad() {
        this.#kulManager.theme.register(this);
    }
    componentDidLoad() {
        if (this.#rippleSurface?.length) {
            this.#rippleSurface.forEach((el) => {
                this.#kulManager.theme.ripple.setup(el);
            });
        }
        this.onKulEvent(new CustomEvent('ready'), 'ready');
        this.#kulManager.debug.updateDebugInfo(this, 'did-load');
    }
    componentWillRender() {
        this.#kulManager.debug.updateDebugInfo(this, 'will-render');
    }
    componentDidRender() {
        if (Object.keys(this.#rippleSurface).length) {
            for (const key in this.#rippleSurface) {
                if (Object.prototype.hasOwnProperty.call(this.#rippleSurface, key)) {
                    const surface = this.#rippleSurface[key];
                    this.#kulManager.theme.ripple.setup(surface);
                }
            }
        }
        this.#kulManager.debug.updateDebugInfo(this, 'did-render');
    }
    render() {
        this.#nodeItems = [];
        const className = {
            'chip-set': true,
            'chip-set--choice': this.#isChoice(),
            'chip-set--filter': this.#isFilter(),
            'chip-set--input': this.#isInput(),
        };
        return (h(Host, { key: 'b62fc66ed0334cfe7c67261bcb72afd98d268743' }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))) : undefined, h("div", { key: 'c848e72fefda1c2f15c5cec863c53131efbadc38', id: KUL_WRAPPER_ID }, h("div", { key: '95416b2cffed95ed5f35f061c7898f135c97185b', class: className, role: "grid" }, this.#prepChipSet()))));
    }
    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
    }
};
KulChip.style = KulChipStyle0;

/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
var KulTabbarProps;
(function (KulTabbarProps) {
    KulTabbarProps["kulData"] = "Actual data of the component.";
    KulTabbarProps["kulRipple"] = "When set to true, the pointerdown event will trigger a ripple effect.";
    KulTabbarProps["kulStyle"] = "Custom style of the component.";
    KulTabbarProps["kulValue"] = "Sets the initial selected node's index.";
})(KulTabbarProps || (KulTabbarProps = {}));

const kulTabbarCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}:host{--kul_tabbar_backdrop_filter:var(--kul-tabbar-backdrop-filter, blur(3.5px));--kul_tabbar_backdrop_filter_hover:var(\n    --kul-tabbar-backdrop-filter-hover,\n    blur(5px)\n  );--kul_tabbar_font_size:var(--kul-tabbar-font-size, var(--kul-font-size));--kul_tabbar_font_weight:var(--kul-tabbar-font-weight, 500);--kul_tabbar_height:var(--kul-tabbar-height, 36px);--kul_tabbar_primary_color_rgb:var(\n    --kul-tabbar-primary-color-rgb,\n    var(--kul-primary-color-rgb)\n  );--kul_tabbar_primary_color:var(\n    --kul-tabbar-primary-color,\n    var(--kul-primary-color)\n  );--kul_tabbar_tab_padding:var(--kul-tabbar-tab-padding, 0 24px);display:block;font-size:var(--kul_tabbar_font_size);width:100%}.tabbar{width:100%}.tabbar__scroller{height:var(--kul_tabbar_height);overflow-y:hidden}.tabbar__scroll-area{display:flex;overflow:auto;overflow-x:hidden}.tabbar__scroll-content{display:flex;flex:1 0 auto;position:relative;transform:none;will-change:transform}.tab{appearance:none;-webkit-backdrop-filter:var(--kul_tabbar_backdrop_filter);backdrop-filter:var(--kul_tabbar_backdrop_filter);background:none;border:none;box-sizing:border-box;color:var(--kul_tabbar_primary_color);cursor:pointer;display:flex;flex:1 0 auto;font-family:var(--kul_tabbar_font_family);font-size:0.875em;font-weight:var(--kul_tabbar_font_weight);height:var(--kul_tabbar_height);justify-content:center;letter-spacing:0.0892857143em;margin:0px;min-width:90px;outline:none;padding:var(--kul_tabbar_tab_padding);position:relative;text-align:center;text-transform:uppercase;white-space:nowrap;z-index:1}.tab:hover{-webkit-backdrop-filter:var(--kul_tabbar_backdrop_filter_hover);backdrop-filter:var(--kul_tabbar_backdrop_filter_hover);background-color:rgba(var(--kul_tabbar_primary_color_rgb), 0.075)}.tab--active .tab__icon{transition-delay:100ms}.tab--active .tab__text-label{transition-delay:100ms}.tab__icon{font-size:24px;height:24px;transition:color 150ms linear 0s;width:24px;z-index:2}.tab__icon.kul-icon{background-color:var(--kul_tabbar_primary_color);height:24px;width:24px}.tab__content{align-items:center;display:flex;height:inherit;justify-content:center;pointer-events:none;position:relative}.tab__text-label{color:var(--kul_tabbar_primary_color);display:inline-block;line-height:1;transition:color 150ms linear 0s;z-index:2}.tab__icon+.tab__text-label{padding-left:8px;padding-right:0px}.tab__indicator{display:flex;height:100%;justify-content:center;left:0px;pointer-events:none;position:absolute;top:0px;width:100%;z-index:1}.tab__indicator--active .tab__indicator-content{opacity:1}.tab__indicator-content{border-color:var(--kul_tabbar_primary_color);opacity:0;transform-origin:left center}.tab__indicator-content--underline{align-self:flex-end;border-top-style:solid;border-top-width:2px;box-sizing:border-box;transition:all 125ms cubic-bezier(0.4, 0, 0.2, 1) 0s;width:100%}";
const KulTabbarStyle0 = kulTabbarCss;

const KulTabbar = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-tabbar-event", 6);
        this.debugInfo = {
            endTime: 0,
            renderCount: 0,
            renderEnd: 0,
            renderStart: 0,
            startTime: performance.now(),
        };
        this.value = null;
        this.kulData = null;
        this.kulRipple = true;
        this.kulStyle = '';
        this.kulValue = 0;
    }
    get rootElement() { return getElement(this); }
    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/
    #kulManager = kulManagerInstance();
    #rippleSurface;
    #scrollArea;
    /*-------------------------------------------------*/
    /*                   E v e n t s                   */
    /*-------------------------------------------------*/
    /**
     * Describes events emitted.
     */
    kulEvent;
    onKulEvent(e, eventType, index = 0, node) {
        if (eventType === 'pointerdown') {
            if (this.kulRipple) {
                this.#kulManager.theme.ripple.trigger(e, this.#rippleSurface[index]);
            }
        }
        if (eventType === 'click') {
            this.value = {
                index,
                node,
            };
        }
        this.kulEvent.emit({
            comp: this,
            eventType,
            id: this.rootElement.id,
            originalEvent: e,
            node,
        });
    }
    /*-------------------------------------------------*/
    /*           P u b l i c   M e t h o d s           */
    /*-------------------------------------------------*/
    /**
     * Retrieves the debug information reflecting the current state of the component.
     * @returns {Promise<KulDebugComponentInfo>} A promise that resolves to a KulDebugComponentInfo object containing debug information.
     */
    async getDebugInfo() {
        return this.debugInfo;
    }
    /**
     * Retrieves the properties of the component, with optional descriptions.
     * @param {boolean} descriptions - If true, returns properties with descriptions; otherwise, returns properties only.
     * @returns {Promise<GenericObject>} A promise that resolves to an object where each key is a property name, optionally with its description.
     */
    async getProps(descriptions) {
        return getProps(this, KulTabbarProps, descriptions);
    }
    /**
     * Returns the selected node and its index.
     * @returns {Promise<KulTabbarState>} Selected node and its index.
     */
    async getValue() {
        return this.value;
    }
    /**
     * Triggers a re-render of the component to reflect any state changes.
     */
    async refresh() {
        forceUpdate(this);
    }
    /**
     * Sets the value of the component based on the provided argument.
     * @param {number | string} value - The index of the node or the id of the node.
     * @returns {Promise<KulTabbarState>} The newly set value.
     */
    async setValue(value) {
        let index;
        let node;
        if (typeof value === 'number') {
            index = value;
            node = this.kulData.nodes[index];
        }
        else if (typeof value === 'string') {
            index = this.kulData.nodes.findIndex((node) => node.id === value);
            node = this.kulData.nodes[index];
        }
        this.value = {
            index,
            node,
        };
        return this.value;
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentWillLoad() {
        try {
            if (this.kulValue !== null) {
                if (typeof this.kulValue === 'number') {
                    this.value = {
                        index: this.kulValue,
                        node: this.kulData.nodes[this.kulValue],
                    };
                }
                if (typeof this.kulValue === 'string') {
                    const node = this.kulData.nodes.find((node) => node.id === this.kulValue);
                    this.value = {
                        index: this.kulData.nodes.indexOf(node),
                        node,
                    };
                }
            }
        }
        catch (error) {
            this.#kulManager.debug.logMessage(this, 'Something went wrong while setting the initial selected value.', 'warning');
        }
        this.#kulManager.theme.register(this);
    }
    componentDidLoad() {
        if (this.#scrollArea) {
            this.#kulManager.scrollOnHover.register(this.#scrollArea);
        }
        this.onKulEvent(new CustomEvent('ready'), 'ready');
        this.#kulManager.debug.updateDebugInfo(this, 'did-load');
    }
    componentWillRender() {
        if (this.#rippleSurface?.length) {
            this.#rippleSurface.forEach((el) => {
                this.#kulManager.theme.ripple.setup(el);
            });
        }
        this.#kulManager.debug.updateDebugInfo(this, 'will-render');
    }
    componentDidRender() {
        this.#kulManager.debug.updateDebugInfo(this, 'did-render');
    }
    render() {
        if (!this.#kulManager.data.node.exists(this.kulData)) {
            return;
        }
        this.#rippleSurface = [];
        const nodes = this.kulData.nodes;
        const elements = [];
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            const isActive = node === this.value?.node;
            const tabClass = {
                tab: true,
                'tab--active': isActive ? true : false,
            };
            elements.push(h("button", { "aria-selected": isActive ? true : false, class: tabClass, "data-cy": KulDataCyAttributes.BUTTON, onClick: (e) => {
                    this.onKulEvent(e, 'click', i, node);
                }, onPointerDown: (e) => {
                    this.onKulEvent(e, 'pointerdown', i, node);
                }, role: "tab", tabIndex: i, title: node.description ? node.description : null }, h("div", { ref: (el) => {
                    if (el && this.kulRipple) {
                        this.#rippleSurface.push(el);
                    }
                } }), h("span", { class: "tab__content" }, node.icon ? (h("kul-image", { class: "tab__icon", kulColor: `var(${KulThemeColorValues.PRIMARY})`, kulSizeX: "24px", kulSizeY: "24px", kulValue: node.icon })) : null, node.value ? (h("span", { class: "tab__text-label" }, node.value)) : null), h("span", { class: `tab__indicator ${isActive ? ' tab__indicator--active' : ''}` }, h("span", { class: "tab__indicator-content tab__indicator-content--underline" }))));
        }
        return (h(Host, null, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))) : undefined, h("div", { id: KUL_WRAPPER_ID }, h("div", { class: "tabbar", role: "tablist" }, h("div", { class: "tabbar_scroller" }, h("div", { class: "tabbar__scroll-area", ref: (el) => (this.#scrollArea =
                el) }, h("div", { class: "tabbar__scroll-content" }, elements)))))));
    }
    disconnectedCallback() {
        if (this.#scrollArea) {
            this.#kulManager.scrollOnHover.unregister(this.#scrollArea);
        }
        this.#kulManager.theme.unregister(this);
    }
};
KulTabbar.style = KulTabbarStyle0;

export { KulChat as kul_chat, KulChip as kul_chip, KulTabbar as kul_tabbar };

//# sourceMappingURL=kul-chat_3.entry.js.map