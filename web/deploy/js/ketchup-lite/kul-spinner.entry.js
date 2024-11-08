import { r as registerInstance, d as createEvent, g as getElement, f as forceUpdate, h, H as Host } from './index-7f37b7be.js';
import { k as kulManagerInstance, K as KUL_WRAPPER_ID, b as KUL_STYLE_ID } from './kul-manager-75d4bcb9.js';
import { g as getProps } from './componentUtils-a994b230.js';

/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
var KulSpinnerProps;
(function (KulSpinnerProps) {
    KulSpinnerProps["kulActive"] = "Specifies if the spinner is animating.";
    KulSpinnerProps["kulBarVariant"] = "Controls if the component displays as a bar or a spinner.";
    KulSpinnerProps["kulDimensions"] = "Defines the width and height of the spinner. In the bar variant, it specifies only the height.";
    KulSpinnerProps["kulFader"] = "Applies a blending modal over the component to darken or lighten the view, based on the theme.";
    KulSpinnerProps["kulFaderTimeout"] = "Duration needed for the fader to become active.";
    KulSpinnerProps["kulFullScreen"] = "Fills the entire viewport when enabled.";
    KulSpinnerProps["kulLayout"] = "Selects the spinner layout.";
    KulSpinnerProps["kulStyle"] = "Sets a custom style for the component.";
})(KulSpinnerProps || (KulSpinnerProps = {}));

const kulSpinnerCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}@keyframes fade-in-grid{0%{display:none}1%{display:grid;opacity:0}100%{display:grid;opacity:1}}:host{--kul_spinner_border_color:var(\n    --kul-spinner-border-color,\n    var(--kul-border-color)\n  );display:block}#loading-wrapper-master{background:transparent;opacity:0;overflow:hidden;transition:opacity 0.8s ease-in, background-color 1s ease-in;transform:translatez(0)}#loading-wrapper-master.spinner-version>#loading-wrapper-master-spinner{width:100%;height:100%;position:relative}#loading-wrapper-master.spinner-version>#loading-wrapper-master-spinner div{margin:auto;position:absolute;top:0;right:0;bottom:0;left:0;transition:top 0.25s ease-in-out, opacity 0.25s ease-in-out}:host([kul-active]) #loading-wrapper-master{opacity:1}:host([kul-active]) #loading-wrapper-master.spinner-version>#loading-wrapper-master-spinner{opacity:1;overflow:hidden}:host([kul-active]) #loading-wrapper-master[kul-bar-variant]>#loading-wrapper-master-bar{opacity:1}:host([kul-active]) #loading-wrapper-master[kul-bar-variant]>#loading-wrapper-master-bar div.spinner-bar-v2{animation:sk-spinner-bar-v2 20s;background-color:var(--kul-spinner-color);left:-1%}:host([kul-active]) #loading-wrapper-master.loading-wrapper-big-wait{background:rgba(128, 128, 128, 0.25)}:host([kul-active]) #loading-wrapper-master.loading-wrapper-big-wait>#loading-wrapper-master-spinner{font-size:10px}:host([kul-full-screen]) #loading-wrapper-master{top:0;left:0;bottom:0;right:0;pointer-events:none;position:fixed;width:100%;z-index:9999}:host([kul-full-screen]) #loading-wrapper-master div,:host([kul-full-screen]) #loading-wrapper-master.spinner-version #loading-wrapper-master-spinner{position:fixed;transition:opacity 1.25s ease-in, background-color 1s ease-in, top 0.5s ease-in}.spinner-v1{border-top:1em solid var(--kul_spinner_border_color);border-right:1em solid var(--kul_spinner_border_color);border-bottom:1em solid var(--kul_spinner_border_color);border-left:1em solid var(--kul-spinner-color);transform:translatez(0);animation:sk-spinner-v1 1.1s infinite linear}.spinner-v1,.spinner-v1:after{border-radius:50%;width:7em;height:7em}@keyframes sk-spinner-v1{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.spinner-v2,.spinner-v2:before,.spinner-v2:after{border-radius:50%;width:2em;height:2em;animation-fill-mode:both;animation:sk-spinner-v2 1.4s infinite ease-in-out;transform:translatez(0)}.spinner-v2{backface-visibility:hidden;color:var(--kul-spinner-color);font-size:1em;transform:translateY(-2.5em);animation-delay:-0.16s}.spinner-v2:before,.spinner-v2:after{content:\"\";position:absolute;top:0}.spinner-v2:before{left:-4em;-webkit-animation-delay:-0.32s;animation-delay:-0.32s}.spinner-v2:after{left:4em}@keyframes sk-spinner-v2{0%,80%,100%{box-shadow:0 2.5em 0 -1.3em}40%{box-shadow:0 2.5em 0 0}}.spinner-v3{color:var(--kul-spinner-color);font-size:6em;width:1em;height:1em;border-radius:50%;transform:translatez(0);animation:sk-spinner-v3 1.7s infinite ease, sk-spinner-v3-1 1.7s infinite ease}@keyframes sk-spinner-v3{0%{box-shadow:0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em}5%,95%{box-shadow:0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em}10%,59%{box-shadow:0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em}20%{box-shadow:0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em, -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em, -0.749em -0.34em 0 -0.477em}38%{box-shadow:0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em, -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em, -0.82em -0.09em 0 -0.477em}100%{box-shadow:0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em}}@keyframes sk-spinner-v3-1{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.spinner-v4{color:var(--kul-spinner-color);width:1em;height:1em;border-radius:50%;animation:sk-spinner-v4 1.3s infinite linear;transform:translatez(0)}@keyframes sk-spinner-v4{0%,100%{box-shadow:0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0}12.5%{box-shadow:0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em}25%{box-shadow:0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em}37.5%{box-shadow:0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em}50%{box-shadow:0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em}62.5%{box-shadow:0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em}75%{box-shadow:0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0}87.5%{box-shadow:0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em}}.spinner-v5{margin-top:-0.8em;width:9em;height:9em;border-radius:50%;background:linear-gradient(to right, var(--kul-spinner-color) 10%, rgba(255, 255, 255, 0) 42%);animation:sk-spinner-v5 1.4s infinite linear;transform:translatez(0)}.spinner-v5:before{width:50%;height:50%;background:var(--kul-spinner-color);border-radius:100% 0 0 0;position:absolute;top:0;left:0;content:\"\"}.spinner-v5:after{background:var(--kul_spinner_border_color);width:75%;height:75%;border-radius:50%;content:\"\";margin:auto;position:absolute;top:0;left:0;bottom:0;right:0}@keyframes sk-spinner-v5{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}.spinner-v6,.spinner-v6:before,.spinner-v6:after{background:var(--kul-spinner-color);animation:sk-spinner-v6 1s infinite ease-in-out;width:1em;height:4em}.spinner-v6{color:var(--kul-spinner-color);margin-top:2em;transform:translatez(0);animation-delay:-0.16s}.spinner-v6:before,.spinner-v6:after{position:absolute;top:0;content:\"\"}.spinner-v6:before{left:-1.5em;-webkit-animation-delay:-0.32s;animation-delay:-0.32s}.spinner-v6:after{left:1.5em}@keyframes sk-spinner-v6{0%,80%,100%{box-shadow:0 0;height:4em}40%{box-shadow:0 -2em;height:5em}}.spinner-v7{width:6em;height:6em;position:relative;animation:sk-spinner-v7 2.5s infinite linear both}.sk-spinner-v7-dot{width:100%;height:100%;position:absolute;left:0;top:0;animation:sk-spinner-v7-dot 2s infinite ease-in-out both}.sk-spinner-v7-dot:before{content:\"\";display:block;width:25%;height:25%;background-color:var(--kul-spinner-color);border-radius:100%;animation:sk-spinner-v7-dot-before 2s infinite ease-in-out both}.sk-spinner-v7-dot:nth-child(1){animation-delay:-1.1s}.sk-spinner-v7-dot:nth-child(2){animation-delay:-1s}.sk-spinner-v7-dot:nth-child(3){animation-delay:-0.9s}.sk-spinner-v7-dot:nth-child(4){animation-delay:-0.8s}.sk-spinner-v7-dot:nth-child(5){animation-delay:-0.7s}.sk-spinner-v7-dot:nth-child(6){animation-delay:-0.6s}.sk-spinner-v7-dot:nth-child(1):before{animation-delay:-1.1s}.sk-spinner-v7-dot:nth-child(2):before{animation-delay:-1s}.sk-spinner-v7-dot:nth-child(3):before{animation-delay:-0.9s}.sk-spinner-v7-dot:nth-child(4):before{animation-delay:-0.8s}.sk-spinner-v7-dot:nth-child(5):before{animation-delay:-0.7s}.sk-spinner-v7-dot:nth-child(6):before{animation-delay:-0.6s}@keyframes sk-spinner-v7{100%{transform:rotate(360deg)}}@keyframes sk-spinner-v7-dot{80%,100%{transform:rotate(360deg)}}@keyframes sk-spinner-v7-dot-before{50%{transform:scale(0.4)}100%,0%{transform:scale(1)}}.spinner-v8{width:8em;height:8em;background-color:var(--kul-spinner-color);animation:sk-spinner-v8 1.2s infinite ease-in-out}@keyframes sk-spinner-v8{0%{transform:perspective(120px) rotateX(0deg) rotateY(0deg)}50%{transform:perspective(120px) rotateX(-180.1deg) rotateY(0deg)}100%{transform:perspective(120px) rotateX(-180deg) rotateY(-179.9deg)}}.spinner-v9{width:8em;height:8em;position:relative}.sk-spinner-v9-bounce1,.sk-spinner-v9-bounce2{width:100%;height:100%;border-radius:50%;background-color:var(--kul-spinner-color);opacity:0.6;position:absolute;top:0;left:0;animation:sk-spinner-v9 2s infinite ease-in-out}.sk-spinner-v9-bounce2{animation-delay:-1s}@keyframes sk-spinner-v9{0%,100%{transform:scale(0)}50%{transform:scale(1)}}.spinner-v10{width:8em;height:8em;position:relative}.sk-spinner-v10-cube1,.sk-spinner-v10-cube2{backface-visibility:hidden;background-color:var(--kul-spinner-color);width:2em;height:2em;position:absolute;top:0;left:0;bottom:unset !important;right:unset !important;animation:sk-spinner-v10 1.8s infinite ease-in-out}.sk-spinner-v10-cube2{animation-delay:-0.9s}@keyframes sk-spinner-v10{25%{transform:translateX(5em) rotate(-90deg) scale(0.5)}50%{transform:translateX(5em) translateY(5em) rotate(-179deg)}50.1%{transform:translateX(5em) translateY(5em) rotate(-180deg)}75%{transform:translateX(0px) translateY(5em) rotate(-270deg) scale(0.5)}100%{transform:rotate(-360deg)}}.spinner-v11{width:8em;height:8em;background-color:var(--kul-spinner-color);border-radius:100%;animation:sk-spinner-v11 1s infinite ease-in-out}@keyframes sk-spinner-v11{0%{transform:scale(0)}100%{transform:scale(1);opacity:0}}.spinner-v12{width:8em;height:8em;position:relative;text-align:center;animation:sk-spinner-v12 2s infinite linear}.sk-spinner-v12-dot1,.sk-spinner-v12-dot2{width:60%;height:60%;display:inline-block;position:absolute;top:0 !important;left:unset !important;bottom:unset !important;right:unset !important;background-color:var(--kul-spinner-color);border-radius:100%;animation:sk-spinner-v12-1 2s infinite ease-in-out}.sk-spinner-v12-dot2{top:auto !important;bottom:0 !important;left:unset !important;right:unset !important;animation-delay:-1s}@keyframes sk-spinner-v12{100%{transform:rotate(360deg);-webkit-transform:rotate(360deg)}}@keyframes sk-spinner-v12-1{0%,100%{transform:scale(0);-webkit-transform:scale(0)}50%{transform:scale(1);-webkit-transform:scale(1)}}.spinner-v13{width:7em;height:7em}.spinner-v13 .sk-spinner-v13-cube{backface-visibility:hidden;background-color:var(--kul-spinner-color);float:left;height:33%;width:33%;position:relative !important;animation:sk-spinner-v13 1.3s infinite ease-in-out;outline:1px solid transparent}.spinner-v13 .sk-spinner-v13-cube1{animation-delay:0.2s}.spinner-v13 .sk-spinner-v13-cube2{animation-delay:0.3s}.spinner-v13 .sk-spinner-v13-cube3{animation-delay:0.4s}.spinner-v13 .sk-spinner-v13-cube4{animation-delay:0.1s}.spinner-v13 .sk-spinner-v13-cube5{animation-delay:0.2s}.spinner-v13 .sk-spinner-v13-cube6{animation-delay:0.3s}.spinner-v13 .sk-spinner-v13-cube7{animation-delay:0s}.spinner-v13 .sk-spinner-v13-cube8{animation-delay:0.1s}.spinner-v13 .sk-spinner-v13-cube9{animation-delay:0.2s}@keyframes sk-spinner-v13{0%,70%,100%{transform:scale3D(1, 1, 1)}35%{transform:scale3D(0, 0, 1)}}.spinner-v14{width:8em;height:8em;position:relative}.spinner-v14 .sk-spinner-v14-circle{width:100%;height:100%;position:absolute;left:0;top:0}.spinner-v14 .sk-spinner-v14-circle:before{content:\"\";display:block;margin:0 auto;width:15%;height:15%;background-color:var(--kul-spinner-color);border-radius:100%;-webkit-animation:sk-spinner-v14-circleFadeDelay 1.2s infinite ease-in-out both;animation:sk-spinner-v14-circleFadeDelay 1.2s infinite ease-in-out both}.spinner-v14 .sk-spinner-v14-circle2{-webkit-transform:rotate(30deg);-ms-transform:rotate(30deg);transform:rotate(30deg)}.spinner-v14 .sk-spinner-v14-circle3{-webkit-transform:rotate(60deg);-ms-transform:rotate(60deg);transform:rotate(60deg)}.spinner-v14 .sk-spinner-v14-circle4{-webkit-transform:rotate(90deg);-ms-transform:rotate(90deg);transform:rotate(90deg)}.spinner-v14 .sk-spinner-v14-circle5{-webkit-transform:rotate(120deg);-ms-transform:rotate(120deg);transform:rotate(120deg)}.spinner-v14 .sk-spinner-v14-circle6{-webkit-transform:rotate(150deg);-ms-transform:rotate(150deg);transform:rotate(150deg)}.spinner-v14 .sk-spinner-v14-circle7{-webkit-transform:rotate(180deg);-ms-transform:rotate(180deg);transform:rotate(180deg)}.spinner-v14 .sk-spinner-v14-circle8{-webkit-transform:rotate(210deg);-ms-transform:rotate(210deg);transform:rotate(210deg)}.spinner-v14 .sk-spinner-v14-circle9{-webkit-transform:rotate(240deg);-ms-transform:rotate(240deg);transform:rotate(240deg)}.spinner-v14 .sk-spinner-v14-circle10{-webkit-transform:rotate(270deg);-ms-transform:rotate(270deg);transform:rotate(270deg)}.spinner-v14 .sk-spinner-v14-circle11{-webkit-transform:rotate(300deg);-ms-transform:rotate(300deg);transform:rotate(300deg)}.spinner-v14 .sk-spinner-v14-circle12{-webkit-transform:rotate(330deg);-ms-transform:rotate(330deg);transform:rotate(330deg)}.spinner-v14 .sk-spinner-v14-circle2:before{-webkit-animation-delay:-1.1s;animation-delay:-1.1s}.spinner-v14 .sk-spinner-v14-circle3:before{-webkit-animation-delay:-1s;animation-delay:-1s}.spinner-v14 .sk-spinner-v14-circle4:before{-webkit-animation-delay:-0.9s;animation-delay:-0.9s}.spinner-v14 .sk-spinner-v14-circle5:before{-webkit-animation-delay:-0.8s;animation-delay:-0.8s}.spinner-v14 .sk-spinner-v14-circle6:before{-webkit-animation-delay:-0.7s;animation-delay:-0.7s}.spinner-v14 .sk-spinner-v14-circle7:before{-webkit-animation-delay:-0.6s;animation-delay:-0.6s}.spinner-v14 .sk-spinner-v14-circle8:before{-webkit-animation-delay:-0.5s;animation-delay:-0.5s}.spinner-v14 .sk-spinner-v14-circle9:before{-webkit-animation-delay:-0.4s;animation-delay:-0.4s}.spinner-v14 .sk-spinner-v14-circle10:before{-webkit-animation-delay:-0.3s;animation-delay:-0.3s}.spinner-v14 .sk-spinner-v14-circle11:before{-webkit-animation-delay:-0.2s;animation-delay:-0.2s}.spinner-v14 .sk-spinner-v14-circle12:before{-webkit-animation-delay:-0.1s;animation-delay:-0.1s}@keyframes sk-spinner-v14-circleFadeDelay{0%,39%,100%{opacity:0}40%{opacity:1}}.spinner-bar-v1{height:1em;width:100%;position:absolute;overflow:hidden;transform:translatez(0)}.spinner-bar-v1:before{display:block;position:absolute;content:\"\";width:25%;height:1em;animation:sk-spinner-bar-v1 5s linear infinite;transform:translatez(0)}@keyframes sk-spinner-bar-v1{from{left:-25%;background:var(--kul-spinner-color);background:linear-gradient(to left, var(--kul-spinner-color) 0, rgba(255, 255, 255, 0) 100%)}50%{left:100%}to{left:-25%;background:var(--kul-spinner-color);background:linear-gradient(to right, var(--kul-spinner-color) 0, rgba(255, 255, 255, 0) 100%)}}.spinner-bar-v2{box-shadow:-1px 0px 2px 2px var(--kul-spinner-color);height:calc(1em - 2px);position:absolute;overflow:hidden;animation-timing-function:cubic-bezier(0.19, 0.78, 0.19, 0.78);transform:translatez(0);animation:none;width:100%}@keyframes sk-spinner-bar-v2{from{left:-100%}to{left:-1%}}:host(.kul-unclickable) #loading-wrapper-master{cursor:wait;pointer-events:all}";
const KulSpinnerStyle0 = kulSpinnerCss;

const KulSpinner = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-spinner-event", 6);
        this.debugInfo = {
            endTime: 0,
            renderCount: 0,
            renderEnd: 0,
            renderStart: 0,
            startTime: performance.now(),
        };
        this.kulActive = false;
        this.kulBarVariant = false;
        this.kulDimensions = '';
        this.kulFader = false;
        this.kulFaderTimeout = 3500;
        this.kulFullScreen = false;
        this.kulLayout = 1;
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
     * @returns {Promise<KulDebugLifecycleInfo>} A promise that resolves with the debug information object.
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
        return getProps(this, KulSpinnerProps, descriptions);
    }
    /**
     * This method is used to trigger a new render of the component.
     */
    async refresh() {
        forceUpdate(this);
    }
    /**
     * Initiates the unmount sequence, which removes the component from the DOM after a delay.
     * @param {number} ms - Number of milliseconds
     */
    async unmount(ms = 0) {
        setTimeout(() => {
            this.onKulEvent(new CustomEvent('unmount'), 'unmount');
            this.rootElement.remove();
        }, ms);
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentWillLoad() {
        this.#kulManager.theme.register(this);
    }
    componentDidLoad() {
        this.onKulEvent(new CustomEvent('ready'), 'ready');
        this.#kulManager.debug.updateDebugInfo(this, 'did-load');
    }
    componentWillRender() {
        this.#kulManager.debug.updateDebugInfo(this, 'will-render');
    }
    componentDidUpdate() {
        const root = this.rootElement.shadowRoot;
        if (root) {
            root.querySelector('#loading-wrapper-master').classList.remove('loading-wrapper-big-wait');
        }
    }
    componentDidRender() {
        const root = this.rootElement.shadowRoot;
        if (root) {
            if (this.kulFader) {
                setTimeout(function () {
                    root.querySelector('#loading-wrapper-master').classList.add('loading-wrapper-big-wait');
                }, this.kulFaderTimeout);
            }
        }
        this.#kulManager.debug.updateDebugInfo(this, 'did-render');
    }
    render() {
        let masterClass = '';
        let wrapperClass = '';
        let spinnerClass = '';
        let spinnerEl = [];
        let elStyle = undefined;
        if (this.kulBarVariant) {
            wrapperClass = 'loading-wrapper-master-bar';
            spinnerClass = 'spinner-bar-v' + this.kulLayout;
        }
        else {
            masterClass += ' spinner-version';
            wrapperClass = 'loading-wrapper-master-spinner';
            spinnerClass = 'spinner-v' + this.kulLayout;
            if (this.kulLayout === 7) {
                spinnerEl = [
                    h("div", { key: '542d94437cdce87d9065afad802227ecae2e0505', class: "sk-spinner-v7-dot" }),
                    h("div", { key: '8f2c3ff32af698bba4e09662ab467967fa56fe03', class: "sk-spinner-v7-dot" }),
                    h("div", { key: 'fad92179d58c320d0f9ae15f5a3fb64b2152eee2', class: "sk-spinner-v7-dot" }),
                    h("div", { key: '60814df4f288ed1569a24a1b6d6842dec081a6a5', class: "sk-spinner-v7-dot" }),
                    h("div", { key: 'ddc73fc717d9871c1c0ec81a54f81531da7d25e4', class: "sk-spinner-v7-dot" }),
                    h("div", { key: 'a9ea964c2a304de8fb150cf3a4348ab1b11f3ce4', class: "sk-spinner-v7-dot" }),
                ];
            }
            if (this.kulLayout === 9) {
                spinnerEl = [
                    h("div", { key: 'c56b082eb968b48353dea050377881c33eba71dc', class: "sk-spinner-v9-bounce1" }),
                    h("div", { key: '79a3713bc04db8422a0b1ca3ec7020c00255cb23', class: "sk-spinner-v9-bounce2" }),
                ];
            }
            if (this.kulLayout === 10) {
                spinnerEl = [
                    h("div", { key: 'e7145c94a8a8decb18987d2c93f68e39b7b533b0', class: "sk-spinner-v10-cube1" }),
                    h("div", { key: '7a97e80394333b47c1f5eab523f6f5bd7e5dfd4e', class: "sk-spinner-v10-cube2" }),
                ];
            }
            if (this.kulLayout === 12) {
                spinnerEl = [
                    h("div", { key: '75f6c0724381ca2eca457d09337409117dad1000', class: "sk-spinner-v12-dot1" }),
                    h("div", { key: '630c30bef31470f74e554ca9ff9bd65c599e0b90', class: "sk-spinner-v12-dot2" }),
                ];
            }
            if (this.kulLayout === 13) {
                spinnerEl = [
                    h("div", { key: 'e3034b189e1803cb353175c6924c0c35b3053e43', class: "sk-spinner-v13-cube sk-spinner-v13-cube1" }),
                    h("div", { key: '124116731a1f8a636031a01238eef7056de13a7f', class: "sk-spinner-v13-cube sk-spinner-v13-cube2" }),
                    h("div", { key: 'c877304a362ba302e8fd9166574835a77632c9fd', class: "sk-spinner-v13-cube sk-spinner-v13-cube3" }),
                    h("div", { key: '4925fc1d6b576898110c48d1792b9370bfd23015', class: "sk-spinner-v13-cube sk-spinner-v13-cube4" }),
                    h("div", { key: 'eb84136b76653cef7af0f56a6acdeda84e4ed5fb', class: "sk-spinner-v13-cube sk-spinner-v13-cube5" }),
                    h("div", { key: '74c91d397135627040a243cd8d496615237fc97c', class: "sk-spinner-v13-cube sk-spinner-v13-cube6" }),
                    h("div", { key: 'b596587a8d6c72a9fa4a65a375bae5c3171c9790', class: "sk-spinner-v13-cube sk-spinner-v13-cube7" }),
                    h("div", { key: '999cbe438ed735fdf2c430cf198392a841528d2d', class: "sk-spinner-v13-cube sk-spinner-v13-cube8" }),
                    h("div", { key: 'db671099a421f5391ba0566f9112f59d7c4c905d', class: "sk-spinner-v13-cube sk-spinner-v13-cube9" }),
                ];
            }
            if (this.kulLayout === 14) {
                spinnerEl = [
                    h("div", { key: '6beb7afb46f146d82523bafea3572760ca2b33e8', class: "sk-spinner-v14-circle1 sk-spinner-v14-circle" }),
                    h("div", { key: '6f2c3a5e6d1245585aa7354e36131ba16be61998', class: "sk-spinner-v14-circle2 sk-spinner-v14-circle" }),
                    h("div", { key: '2b07c4d7c6da8055a7d92be57c4affd45ffb99d3', class: "sk-spinner-v14-circle3 sk-spinner-v14-circle" }),
                    h("div", { key: '28c62373dea87d4cfbdbc7c3877e13f3524426dc', class: "sk-spinner-v14-circle4 sk-spinner-v14-circle" }),
                    h("div", { key: '60749f4b17946e7bb7266b90dcc8ad37a93228c0', class: "sk-spinner-v14-circle5 sk-spinner-v14-circle" }),
                    h("div", { key: '91a86ee65441b13c20116e9be4c19a278cd2e3a8', class: "sk-spinner-v14-circle6 sk-spinner-v14-circle" }),
                    h("div", { key: '2bf8a4f24fb0765dc1a954bfa8ff53e16b367d05', class: "sk-spinner-v14-circle7 sk-spinner-v14-circle" }),
                    h("div", { key: '21555ac2f2d229ef1e2d6b0ac0355256ae8e5aa3', class: "sk-spinner-v14-circle8 sk-spinner-v14-circle" }),
                    h("div", { key: 'ed303eaf0103eff4a76f9527e0cff4bca8aba724', class: "sk-spinner-v14-circle9 sk-spinner-v14-circle" }),
                    h("div", { key: 'fa4d7f9428ab6ef5206d1878395698fb64ddb9c7', class: "sk-spinner-v14-circle10 sk-spinner-v14-circle" }),
                    h("div", { key: '23f89b1adaf6efd38659b93014b6d616a8e6bba3', class: "sk-spinner-v14-circle11 sk-spinner-v14-circle" }),
                    h("div", { key: 'f123d9199a058646df2f095c7c5969118a86a99f', class: "sk-spinner-v14-circle12 sk-spinner-v14-circle" }),
                ];
            }
        }
        if (!this.kulFullScreen) {
            elStyle = {
                height: '100%',
                width: '100%',
            };
        }
        if (this.kulDimensions) {
            elStyle = {
                ...elStyle,
                fontSize: this.kulDimensions,
            };
        }
        else if (!this.kulBarVariant) {
            elStyle = {
                ...elStyle,
                fontSize: '16px',
            };
        }
        else {
            elStyle = {
                ...elStyle,
                fontSize: '3px',
            };
        }
        return (h(Host, { key: '0db14708b175291500f6fdd9abfc4f7f7ecb8716', style: elStyle }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))) : undefined, h("div", { key: '693a3383e3388682d3336c32870f6ea45b0e1c52', id: KUL_WRAPPER_ID, style: elStyle }, h("div", { key: '9536e29a4cb7dda4deec2055df2e8a1ba49a0dd2', id: "loading-wrapper-master", class: masterClass, style: elStyle }, h("div", { key: 'e4b1dd984532e85e23e375691baa25946ea4cdcf', id: wrapperClass, style: elStyle }, h("div", { key: '15a50d4263ebc52e794cd11aea417ce37d41a123', class: spinnerClass }, spinnerEl))))));
    }
    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
    }
};
KulSpinner.style = KulSpinnerStyle0;

export { KulSpinner as kul_spinner };

//# sourceMappingURL=kul-spinner.entry.js.map