import { r as registerInstance, c as createEvent, g as getElement, f as forceUpdate, h, H as Host } from './index-9aa60797.js';
import { k as kulManagerInstance, g as getProps, K as KUL_WRAPPER_ID, a as KUL_STYLE_ID } from './kul-manager-dc9a333c.js';

var KulChatProps;
(function (KulChatProps) {
    KulChatProps["kulEndpointUrl"] = "URL of the endpoint where the LLM is hosted.";
    KulChatProps["kulMaxTokens"] = "Maximum number of tokens allowed in the LLM's answer.";
    KulChatProps["kulPollingInterval"] = "How often the component checks whether the LLM endpoint is online or not.";
    KulChatProps["kulSeed"] = "Seed value for the LLM's answer generation.";
    KulChatProps["kulStyle"] = "Custom style of the component.";
    KulChatProps["kulSystem"] = "System message for the LLM.";
    KulChatProps["kulTemperature"] = "Sets the creative boundaries of the LLM.";
    KulChatProps["kulValue"] = "Initial history of the chat.";
})(KulChatProps || (KulChatProps = {}));

const speechToText = (kulManager, textarea, button) => {
    const speechConstructor = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!speechConstructor) {
        alert('Speech recognition is not supported in this browser.');
        return;
    }
    const recognition = new speechConstructor();
    recognition.lang = kulManager.language.getBCP47();
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.addEventListener('result', (event) => {
        const transcript = Array.from(event.results)
            .map((result) => result[0])
            .map((result) => result.transcript)
            .join('');
        kulManager.debug.logMessage('KulChat (stt)', 'STT response: ' + transcript);
        textarea.setValue(transcript);
        const isFinal = event.results[event.results.length - 1].isFinal;
        if (isFinal) {
            recognition.stop();
        }
    });
    recognition.addEventListener('end', () => {
        recognition.stop();
        button.kulShowSpinner = false;
    });
    recognition.addEventListener('start', () => {
        textarea.setFocus();
        button.kulShowSpinner = true;
    });
    try {
        recognition.start();
    }
    catch (err) {
        kulManager.debug.logMessage('KulChat (stt)', 'Error: ' + err, 'error');
    }
};

const send = async ({ history, max_tokens, seed, system, temperature, url, }) => {
    const request = {
        temperature,
        max_tokens,
        seed,
        messages: history.map((msg) => ({
            role: msg.role,
            content: msg.content,
        })),
    };
    if (system) {
        request.messages.unshift({
            role: 'system',
            content: system,
        });
    }
    try {
        const response = await callLLM(request, url);
        const llmMessage = {
            role: 'llm',
            content: response,
        };
        return llmMessage;
    }
    catch (error) {
        console.error('Error calling LLM:', error);
        return undefined;
    }
};
const callLLM = async (request, url) => {
    try {
        const response = await fetch(`${url}/v1/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.choices?.[0]?.message?.content || '';
    }
    catch (error) {
        console.error('Error calling LLM:', error);
        throw error;
    }
};

const kulChatCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}:host{--kul_chat_blur_radius:var(--kul-chat-blur-radius, 3.5px);--kul_chat_padding:var(--kul-chat-padding, 18px);--kul_chat_grid_gap:var(--kul-chat-grid-gap, 16px);--kul_chat_title_font_size:var(--kul-chat-title-font-size, 2em);--kul-chat_small_font_size:var(--kul-chat-small-font-size, 0.875em);--kul_chat_spinner_size:var(--kul-chat-spinner-size, 48px);--kul_chat_margin_top:var(--kul-chat-margin-top-em, 1.25em);--kul_chat_margin_bottom:var(--kul-chat-margin-bottom-em, 1em);--kul_chat_border_radius:var(--kul-chat-border-radius, 8px);color:var(--kul-text-color);display:block;height:100%;width:100%}#kul-component{height:100%;position:relative;width:100%}.wrapper{backdrop-filter:blur(var(--kul_chat_blur_radius));box-sizing:border-box;display:grid;grid-template-rows:auto 1fr auto;height:100%;margin:auto;padding:var(--kul_chat_padding)}.wrapper--ready{display:flex;flex-direction:column;height:100%;width:100%}.query-area{box-sizing:border-box;max-width:100%;width:100%}.chat-area{align-content:start;display:grid;grid-gap:var(--kul_chat_grid_gap);grid-template-columns:1fr;overflow:auto;margin-top:var(--kul_chat_margin_top);white-space:pre-line;width:100%;word-break:normal}.spinner{height:var(--kul_chat_spinner_size);margin:auto;width:var(--kul_chat_spinner_size)}.title{text-align:center;font-size:var(--kul_chat_title_font_size)}.empty,.text{font-size:var(--kul_chat_small_font_size);font-style:italic;opacity:0.5;text-align:center}.buttons{align-items:center;display:flex;justify-content:space-evenly;padding:1em 0}.stt{padding:0 1em}.user{display:flex;justify-content:end}.user,.llm{font-family:var(--kul-font-family);font-size:calc(var(--kul-font-size) * 1.125);max-width:100%;padding:12px}.message-container{backdrop-filter:blur(var(--kul_chat_blur_radius));background-color:rgba(var(--kul-background-color-rgb), 0.125);border:1px solid rgba(var(--kul-text-color-rgb), 0.5);border-radius:var(--kul_chat_border_radius);height:max-content;max-width:80%;position:relative;transition:background-color 225ms ease}.message-container:hover{background-color:rgba(var(--kup-primary-color-rgb), 0.325)}.message-container--assistant{justify-self:start}.message-container--user{justify-self:end}.message-container:hover .toolbar{height:50px;opacity:1;padding:8px}.toolbar{background:rgba(var(--kul-background-color-rgb), 0.775);border:0;border-bottom-left-radius:var(--kul_chat_border_radius);border-bottom-right-radius:var(--kul_chat_border_radius);border-top:1px inset rgba(var(--kul-text-color-rgb), 0.225);box-sizing:border-box;display:flex;height:0;justify-content:end;opacity:0;overflow:hidden;padding:0;transition:height 125ms ease, opacity 125ms ease, padding 125ms ease}.toolbar__button{margin:0 4px}.spinner-bar-wrapper{bottom:0;height:4px;left:0;position:absolute;width:100%}";
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
        this.state = 'connecting';
        this.kulEndpointUrl = 'http://localhost:5001';
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
    #clearButton;
    #kulManager = kulManagerInstance();
    #spinnerBar;
    #statusinterval;
    #sttButton;
    #submitButton;
    #textarea;
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
    async #checkLLMStatus() {
        if (this.state === 'offline') {
            this.state = 'connecting';
        }
        try {
            const response = await fetch(this.kulEndpointUrl);
            if (!response.ok) {
                this.state = 'offline';
            }
            else {
                this.state = 'ready';
            }
        }
        catch (error) {
            this.state = 'offline';
        }
    }
    #disableInteractivity = (status) => {
        this.#clearButton.kulDisabled = status;
        this.#textarea.kulDisabled = status;
        this.#sttButton.kulDisabled = status;
        this.#submitButton.kulShowSpinner = status;
    };
    #prepChat = () => {
        const nodes = [];
        if (this.history?.length > 0) {
            this.history.forEach((m) => {
                const cssClass = 'kul-slim toolbar__button';
                nodes.push(h("div", { class: `message-container message-container--${m.role}` }, h("div", { class: m.role }, this.#prepMessage(m)), h("div", { class: "toolbar" }, h("kul-button", { class: cssClass + ' kul-danger', kulIcon: "delete", onClick: () => {
                        const index = this.history.indexOf(m);
                        if (index !== -1) {
                            const cb = () => this.history.splice(index, 1);
                            this.#updateHistory(cb);
                            this.refresh();
                        }
                    }, title: "Remove this message from history." }), h("kul-button", { class: cssClass, kulIcon: "content_copy", onClick: () => {
                        navigator.clipboard.writeText(m.content);
                    }, title: "Copy text to clipboard." }), m.role === 'user' ? (h("kul-button", { class: cssClass, kulIcon: "refresh", onClick: () => {
                        const index = this.history.indexOf(m);
                        if (index !== -1) {
                            const cb = () => (this.history =
                                this.history.slice(0, index + 1));
                            this.#updateHistory(cb);
                            this.#sendPrompt();
                        }
                    }, title: "Regenerate answer to this question." })) : null)));
            });
        }
        else {
            nodes.push(h("div", { class: "empty" }, "Your chat history is empty!"));
        }
        return nodes;
    };
    #prepConnecting = () => {
        return [
            h("div", { class: "spinner" }, h("kul-spinner", { kulActive: true, kulLayout: 6, kulDimensions: "7px" })),
            h("div", { class: "title" }, "Just a moment."),
            h("div", { class: "text" }, "Contacting your LLM endpoint..."),
        ];
    };
    #prepError = () => {
        return [
            h("kul-image", { kulValue: "hotel", kulSizeX: "4em", kulSizeY: "4em" }),
            h("div", { class: "title" }, "Zzz..."),
            h("div", { class: "text" }, "The LLM endpoint seems to be offline!"),
        ];
    };
    #prepMessage = (message) => {
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
    #prepReady() {
        return [
            h("div", { class: "query-area" }, h("kul-textfield", { kulLabel: "What's on your mind?", kulStyling: 'textarea', ref: (el) => {
                    if (el) {
                        this.#textarea = el;
                    }
                } }), h("div", { class: "buttons" }, h("kul-button", { kulIcon: "clear", kulLabel: "Clear", onClick: () => {
                    this.#textarea.setValue('');
                }, kulStyling: 'flat', ref: (el) => {
                    if (el) {
                        this.#clearButton = el;
                    }
                } }), h("kul-button", { class: "stt", kulIcon: "keyboard_voice", onClick: () => {
                    speechToText(this.#kulManager, this.#textarea, this.#sttButton);
                }, ref: (el) => {
                    if (el) {
                        this.#sttButton = el;
                    }
                }, kulStyling: 'icon' }, h("kul-spinner", { kulActive: true, kulDimensions: "0.6em", kulLayout: 6, slot: "spinner" })), h("kul-button", { kulIcon: "check", kulLabel: "Send", onClick: async () => {
                    const value = await this.#textarea.getValue();
                    if (value) {
                        const newMessage = {
                            role: 'user',
                            content: value,
                        };
                        const cb = () => (this.history = [
                            ...this.history,
                            newMessage,
                        ]);
                        this.#updateHistory(cb);
                        this.#sendPrompt();
                    }
                }, ref: (el) => {
                    if (el) {
                        this.#submitButton = el;
                    }
                } }, h("kul-spinner", { kulActive: true, kulDimensions: "0.6em", slot: "spinner" })))),
            h("div", { class: `chat-area` }, this.#prepChat()),
            h("div", { class: "spinner-bar-wrapper" }, h("kul-spinner", { kulBarVariant: true, ref: (el) => {
                    if (el)
                        this.#spinnerBar = el;
                } })),
        ];
    }
    async #sendPrompt() {
        this.#spinnerBar.kulActive = true;
        this.#disableInteractivity(true);
        const sendArgs = {
            history: this.history,
            max_tokens: this.kulMaxTokens,
            seed: this.kulSeed,
            system: this.kulSystem,
            temperature: this.kulTemperature,
            url: this.kulEndpointUrl,
        };
        const llmMessage = await send(sendArgs);
        if (llmMessage) {
            const cb = () => this.history.push(llmMessage);
            this.#updateHistory(cb);
            this.#disableInteractivity(false);
            await this.#textarea.setValue('');
            this.#spinnerBar.kulActive = false;
            await this.refresh();
            this.#textarea.setFocus();
        }
        else {
            const cb = () => this.history.pop();
            this.#updateHistory(cb);
        }
    }
    #updateHistory(cb) {
        cb();
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
        return (h(Host, { key: '292c30e753ef62e66685d1ac773b2093230c6d2a' }, this.kulStyle && (h("style", { key: 'dfea7113e104dfa145db44d7ae2366f85191f407', id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))), h("div", { key: '5ef014781b79b6e0db08d126d7cb30bebf0343ff', id: KUL_WRAPPER_ID }, h("div", { key: '997dcdc8286fe4088593e1ac16d226f1f49ee3fd', class: `wrapper ${this.state}` }, this.state === 'ready'
            ? this.#prepReady()
            : this.state === 'connecting'
                ? this.#prepConnecting()
                : this.#prepError()))));
    }
    disconnectedCallback() {
        clearInterval(this.#statusinterval);
        this.#kulManager.theme.unregister(this);
    }
};
KulChat.style = KulChatStyle0;

export { KulChat as kul_chat };
