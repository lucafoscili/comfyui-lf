import { r as registerInstance, c as createEvent, g as getElement, f as forceUpdate, h, H as Host } from './index-21ee70d9.js';
import { k as kulManagerInstance, g as getProps, K as KUL_WRAPPER_ID, a as KUL_STYLE_ID } from './kul-manager-caaff688.js';

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

const kulSpinnerCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}:host{--kul_spinner_border_color:var(\n    --kul-spinner-border-color,\n    var(--kul-border-color)\n  );display:block}#loading-wrapper-master{background:transparent;opacity:0;overflow:hidden;transition:opacity 0.8s ease-in, background-color 1s ease-in;transform:translatez(0)}#loading-wrapper-master.spinner-version>#loading-wrapper-master-spinner{width:100%;height:100%;position:relative}#loading-wrapper-master.spinner-version>#loading-wrapper-master-spinner div{margin:auto;position:absolute;top:0;right:0;bottom:0;left:0;transition:top 0.25s ease-in-out, opacity 0.25s ease-in-out}:host([kul-active]) #loading-wrapper-master{opacity:1}:host([kul-active]) #loading-wrapper-master.spinner-version>#loading-wrapper-master-spinner{opacity:1;overflow:hidden}:host([kul-active]) #loading-wrapper-master[kul-bar-variant]>#loading-wrapper-master-bar{opacity:1}:host([kul-active]) #loading-wrapper-master[kul-bar-variant]>#loading-wrapper-master-bar div.spinner-bar-v2{animation:sk-spinner-bar-v2 20s;background-color:var(--kul-spinner-color);left:-1%}:host([kul-active]) #loading-wrapper-master.loading-wrapper-big-wait{background:rgba(128, 128, 128, 0.25)}:host([kul-active]) #loading-wrapper-master.loading-wrapper-big-wait>#loading-wrapper-master-spinner{font-size:10px}:host([kul-full-screen]) #loading-wrapper-master{top:0;left:0;bottom:0;right:0;pointer-events:none;position:fixed;width:100%;z-index:9999}:host([kul-full-screen]) #loading-wrapper-master div,:host([kul-full-screen]) #loading-wrapper-master.spinner-version #loading-wrapper-master-spinner{position:fixed;transition:opacity 1.25s ease-in, background-color 1s ease-in, top 0.5s ease-in}.spinner-v1{border-top:1em solid var(--kul_spinner_border_color);border-right:1em solid var(--kul_spinner_border_color);border-bottom:1em solid var(--kul_spinner_border_color);border-left:1em solid var(--kul-spinner-color);transform:translatez(0);animation:sk-spinner-v1 1.1s infinite linear}.spinner-v1,.spinner-v1:after{border-radius:50%;width:7em;height:7em}@keyframes sk-spinner-v1{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.spinner-v2,.spinner-v2:before,.spinner-v2:after{border-radius:50%;width:2em;height:2em;animation-fill-mode:both;animation:sk-spinner-v2 1.4s infinite ease-in-out;transform:translatez(0)}.spinner-v2{backface-visibility:hidden;color:var(--kul-spinner-color);font-size:1em;transform:translateY(-2.5em);animation-delay:-0.16s}.spinner-v2:before,.spinner-v2:after{content:\"\";position:absolute;top:0}.spinner-v2:before{left:-4em;-webkit-animation-delay:-0.32s;animation-delay:-0.32s}.spinner-v2:after{left:4em}@keyframes sk-spinner-v2{0%,80%,100%{box-shadow:0 2.5em 0 -1.3em}40%{box-shadow:0 2.5em 0 0}}.spinner-v3{color:var(--kul-spinner-color);font-size:6em;width:1em;height:1em;border-radius:50%;transform:translatez(0);animation:sk-spinner-v3 1.7s infinite ease, sk-spinner-v3-1 1.7s infinite ease}@keyframes sk-spinner-v3{0%{box-shadow:0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em}5%,95%{box-shadow:0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em}10%,59%{box-shadow:0 -0.83em 0 -0.4em, -0.087em -0.825em 0 -0.42em, -0.173em -0.812em 0 -0.44em, -0.256em -0.789em 0 -0.46em, -0.297em -0.775em 0 -0.477em}20%{box-shadow:0 -0.83em 0 -0.4em, -0.338em -0.758em 0 -0.42em, -0.555em -0.617em 0 -0.44em, -0.671em -0.488em 0 -0.46em, -0.749em -0.34em 0 -0.477em}38%{box-shadow:0 -0.83em 0 -0.4em, -0.377em -0.74em 0 -0.42em, -0.645em -0.522em 0 -0.44em, -0.775em -0.297em 0 -0.46em, -0.82em -0.09em 0 -0.477em}100%{box-shadow:0 -0.83em 0 -0.4em, 0 -0.83em 0 -0.42em, 0 -0.83em 0 -0.44em, 0 -0.83em 0 -0.46em, 0 -0.83em 0 -0.477em}}@keyframes sk-spinner-v3-1{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.spinner-v4{color:var(--kul-spinner-color);width:1em;height:1em;border-radius:50%;animation:sk-spinner-v4 1.3s infinite linear;transform:translatez(0)}@keyframes sk-spinner-v4{0%,100%{box-shadow:0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0}12.5%{box-shadow:0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em}25%{box-shadow:0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em}37.5%{box-shadow:0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em}50%{box-shadow:0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em}62.5%{box-shadow:0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em}75%{box-shadow:0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0}87.5%{box-shadow:0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em}}.spinner-v5{margin-top:-0.8em;width:9em;height:9em;border-radius:50%;background:linear-gradient(to right, var(--kul-spinner-color) 10%, rgba(255, 255, 255, 0) 42%);animation:sk-spinner-v5 1.4s infinite linear;transform:translatez(0)}.spinner-v5:before{width:50%;height:50%;background:var(--kul-spinner-color);border-radius:100% 0 0 0;position:absolute;top:0;left:0;content:\"\"}.spinner-v5:after{background:var(--kul_spinner_border_color);width:75%;height:75%;border-radius:50%;content:\"\";margin:auto;position:absolute;top:0;left:0;bottom:0;right:0}@keyframes sk-spinner-v5{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}.spinner-v6,.spinner-v6:before,.spinner-v6:after{background:var(--kul-spinner-color);animation:sk-spinner-v6 1s infinite ease-in-out;width:1em;height:4em}.spinner-v6{color:var(--kul-spinner-color);margin-top:2em;transform:translatez(0);animation-delay:-0.16s}.spinner-v6:before,.spinner-v6:after{position:absolute;top:0;content:\"\"}.spinner-v6:before{left:-1.5em;-webkit-animation-delay:-0.32s;animation-delay:-0.32s}.spinner-v6:after{left:1.5em}@keyframes sk-spinner-v6{0%,80%,100%{box-shadow:0 0;height:4em}40%{box-shadow:0 -2em;height:5em}}.spinner-v7{width:6em;height:6em;position:relative;animation:sk-spinner-v7 2.5s infinite linear both}.sk-spinner-v7-dot{width:100%;height:100%;position:absolute;left:0;top:0;animation:sk-spinner-v7-dot 2s infinite ease-in-out both}.sk-spinner-v7-dot:before{content:\"\";display:block;width:25%;height:25%;background-color:var(--kul-spinner-color);border-radius:100%;animation:sk-spinner-v7-dot-before 2s infinite ease-in-out both}.sk-spinner-v7-dot:nth-child(1){animation-delay:-1.1s}.sk-spinner-v7-dot:nth-child(2){animation-delay:-1s}.sk-spinner-v7-dot:nth-child(3){animation-delay:-0.9s}.sk-spinner-v7-dot:nth-child(4){animation-delay:-0.8s}.sk-spinner-v7-dot:nth-child(5){animation-delay:-0.7s}.sk-spinner-v7-dot:nth-child(6){animation-delay:-0.6s}.sk-spinner-v7-dot:nth-child(1):before{animation-delay:-1.1s}.sk-spinner-v7-dot:nth-child(2):before{animation-delay:-1s}.sk-spinner-v7-dot:nth-child(3):before{animation-delay:-0.9s}.sk-spinner-v7-dot:nth-child(4):before{animation-delay:-0.8s}.sk-spinner-v7-dot:nth-child(5):before{animation-delay:-0.7s}.sk-spinner-v7-dot:nth-child(6):before{animation-delay:-0.6s}@keyframes sk-spinner-v7{100%{transform:rotate(360deg)}}@keyframes sk-spinner-v7-dot{80%,100%{transform:rotate(360deg)}}@keyframes sk-spinner-v7-dot-before{50%{transform:scale(0.4)}100%,0%{transform:scale(1)}}.spinner-v8{width:8em;height:8em;background-color:var(--kul-spinner-color);animation:sk-spinner-v8 1.2s infinite ease-in-out}@keyframes sk-spinner-v8{0%{transform:perspective(120px) rotateX(0deg) rotateY(0deg)}50%{transform:perspective(120px) rotateX(-180.1deg) rotateY(0deg)}100%{transform:perspective(120px) rotateX(-180deg) rotateY(-179.9deg)}}.spinner-v9{width:8em;height:8em;position:relative}.sk-spinner-v9-bounce1,.sk-spinner-v9-bounce2{width:100%;height:100%;border-radius:50%;background-color:var(--kul-spinner-color);opacity:0.6;position:absolute;top:0;left:0;animation:sk-spinner-v9 2s infinite ease-in-out}.sk-spinner-v9-bounce2{animation-delay:-1s}@keyframes sk-spinner-v9{0%,100%{transform:scale(0)}50%{transform:scale(1)}}.spinner-v10{width:8em;height:8em;position:relative}.sk-spinner-v10-cube1,.sk-spinner-v10-cube2{backface-visibility:hidden;background-color:var(--kul-spinner-color);width:2em;height:2em;position:absolute;top:0;left:0;bottom:unset !important;right:unset !important;animation:sk-spinner-v10 1.8s infinite ease-in-out}.sk-spinner-v10-cube2{animation-delay:-0.9s}@keyframes sk-spinner-v10{25%{transform:translateX(5em) rotate(-90deg) scale(0.5)}50%{transform:translateX(5em) translateY(5em) rotate(-179deg)}50.1%{transform:translateX(5em) translateY(5em) rotate(-180deg)}75%{transform:translateX(0px) translateY(5em) rotate(-270deg) scale(0.5)}100%{transform:rotate(-360deg)}}.spinner-v11{width:8em;height:8em;background-color:var(--kul-spinner-color);border-radius:100%;animation:sk-spinner-v11 1s infinite ease-in-out}@keyframes sk-spinner-v11{0%{transform:scale(0)}100%{transform:scale(1);opacity:0}}.spinner-v12{width:8em;height:8em;position:relative;text-align:center;animation:sk-spinner-v12 2s infinite linear}.sk-spinner-v12-dot1,.sk-spinner-v12-dot2{width:60%;height:60%;display:inline-block;position:absolute;top:0 !important;left:unset !important;bottom:unset !important;right:unset !important;background-color:var(--kul-spinner-color);border-radius:100%;animation:sk-spinner-v12-1 2s infinite ease-in-out}.sk-spinner-v12-dot2{top:auto !important;bottom:0 !important;left:unset !important;right:unset !important;animation-delay:-1s}@keyframes sk-spinner-v12{100%{transform:rotate(360deg);-webkit-transform:rotate(360deg)}}@keyframes sk-spinner-v12-1{0%,100%{transform:scale(0);-webkit-transform:scale(0)}50%{transform:scale(1);-webkit-transform:scale(1)}}.spinner-v13{width:7em;height:7em}.spinner-v13 .sk-spinner-v13-cube{backface-visibility:hidden;background-color:var(--kul-spinner-color);float:left;height:33%;width:33%;position:relative !important;animation:sk-spinner-v13 1.3s infinite ease-in-out;outline:1px solid transparent}.spinner-v13 .sk-spinner-v13-cube1{animation-delay:0.2s}.spinner-v13 .sk-spinner-v13-cube2{animation-delay:0.3s}.spinner-v13 .sk-spinner-v13-cube3{animation-delay:0.4s}.spinner-v13 .sk-spinner-v13-cube4{animation-delay:0.1s}.spinner-v13 .sk-spinner-v13-cube5{animation-delay:0.2s}.spinner-v13 .sk-spinner-v13-cube6{animation-delay:0.3s}.spinner-v13 .sk-spinner-v13-cube7{animation-delay:0s}.spinner-v13 .sk-spinner-v13-cube8{animation-delay:0.1s}.spinner-v13 .sk-spinner-v13-cube9{animation-delay:0.2s}@keyframes sk-spinner-v13{0%,70%,100%{transform:scale3D(1, 1, 1)}35%{transform:scale3D(0, 0, 1)}}.spinner-v14{width:8em;height:8em;position:relative}.spinner-v14 .sk-spinner-v14-circle{width:100%;height:100%;position:absolute;left:0;top:0}.spinner-v14 .sk-spinner-v14-circle:before{content:\"\";display:block;margin:0 auto;width:15%;height:15%;background-color:var(--kul-spinner-color);border-radius:100%;-webkit-animation:sk-spinner-v14-circleFadeDelay 1.2s infinite ease-in-out both;animation:sk-spinner-v14-circleFadeDelay 1.2s infinite ease-in-out both}.spinner-v14 .sk-spinner-v14-circle2{-webkit-transform:rotate(30deg);-ms-transform:rotate(30deg);transform:rotate(30deg)}.spinner-v14 .sk-spinner-v14-circle3{-webkit-transform:rotate(60deg);-ms-transform:rotate(60deg);transform:rotate(60deg)}.spinner-v14 .sk-spinner-v14-circle4{-webkit-transform:rotate(90deg);-ms-transform:rotate(90deg);transform:rotate(90deg)}.spinner-v14 .sk-spinner-v14-circle5{-webkit-transform:rotate(120deg);-ms-transform:rotate(120deg);transform:rotate(120deg)}.spinner-v14 .sk-spinner-v14-circle6{-webkit-transform:rotate(150deg);-ms-transform:rotate(150deg);transform:rotate(150deg)}.spinner-v14 .sk-spinner-v14-circle7{-webkit-transform:rotate(180deg);-ms-transform:rotate(180deg);transform:rotate(180deg)}.spinner-v14 .sk-spinner-v14-circle8{-webkit-transform:rotate(210deg);-ms-transform:rotate(210deg);transform:rotate(210deg)}.spinner-v14 .sk-spinner-v14-circle9{-webkit-transform:rotate(240deg);-ms-transform:rotate(240deg);transform:rotate(240deg)}.spinner-v14 .sk-spinner-v14-circle10{-webkit-transform:rotate(270deg);-ms-transform:rotate(270deg);transform:rotate(270deg)}.spinner-v14 .sk-spinner-v14-circle11{-webkit-transform:rotate(300deg);-ms-transform:rotate(300deg);transform:rotate(300deg)}.spinner-v14 .sk-spinner-v14-circle12{-webkit-transform:rotate(330deg);-ms-transform:rotate(330deg);transform:rotate(330deg)}.spinner-v14 .sk-spinner-v14-circle2:before{-webkit-animation-delay:-1.1s;animation-delay:-1.1s}.spinner-v14 .sk-spinner-v14-circle3:before{-webkit-animation-delay:-1s;animation-delay:-1s}.spinner-v14 .sk-spinner-v14-circle4:before{-webkit-animation-delay:-0.9s;animation-delay:-0.9s}.spinner-v14 .sk-spinner-v14-circle5:before{-webkit-animation-delay:-0.8s;animation-delay:-0.8s}.spinner-v14 .sk-spinner-v14-circle6:before{-webkit-animation-delay:-0.7s;animation-delay:-0.7s}.spinner-v14 .sk-spinner-v14-circle7:before{-webkit-animation-delay:-0.6s;animation-delay:-0.6s}.spinner-v14 .sk-spinner-v14-circle8:before{-webkit-animation-delay:-0.5s;animation-delay:-0.5s}.spinner-v14 .sk-spinner-v14-circle9:before{-webkit-animation-delay:-0.4s;animation-delay:-0.4s}.spinner-v14 .sk-spinner-v14-circle10:before{-webkit-animation-delay:-0.3s;animation-delay:-0.3s}.spinner-v14 .sk-spinner-v14-circle11:before{-webkit-animation-delay:-0.2s;animation-delay:-0.2s}.spinner-v14 .sk-spinner-v14-circle12:before{-webkit-animation-delay:-0.1s;animation-delay:-0.1s}@keyframes sk-spinner-v14-circleFadeDelay{0%,39%,100%{opacity:0}40%{opacity:1}}.spinner-bar-v1{height:1em;width:100%;position:absolute;overflow:hidden;transform:translatez(0)}.spinner-bar-v1:before{display:block;position:absolute;content:\"\";width:25%;height:1em;animation:sk-spinner-bar-v1 5s linear infinite;transform:translatez(0)}@keyframes sk-spinner-bar-v1{from{left:-25%;background:var(--kul-spinner-color);background:linear-gradient(to left, var(--kul-spinner-color) 0, rgba(255, 255, 255, 0) 100%)}50%{left:100%}to{left:-25%;background:var(--kul-spinner-color);background:linear-gradient(to right, var(--kul-spinner-color) 0, rgba(255, 255, 255, 0) 100%)}}.spinner-bar-v2{box-shadow:-1px 0px 2px 2px var(--kul-spinner-color);height:calc(1em - 2px);position:absolute;overflow:hidden;animation-timing-function:cubic-bezier(0.19, 0.78, 0.19, 0.78);transform:translatez(0);animation:none;width:100%}@keyframes sk-spinner-bar-v2{from{left:-100%}to{left:-1%}}:host(.kul-unclickable) #loading-wrapper-master{cursor:wait;pointer-events:all}";
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
        return getProps(this, KulSpinnerProps, descriptions);
    }
    /**
     * This method is used to trigger a new render of the component.
     */
    async refresh() {
        forceUpdate(this);
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
                    h("div", { key: '304e7221bd3583e18d812bd4121bd736221e7963', class: "sk-spinner-v7-dot" }),
                    h("div", { key: 'aa76c4e28241e8fcb7c369b5398643d5487f7b4e', class: "sk-spinner-v7-dot" }),
                    h("div", { key: 'f55ef1895f13976007c4cfaf4dc9fedb9f4fcc21', class: "sk-spinner-v7-dot" }),
                    h("div", { key: '275f3c5ee097f9b9af9282e0ecaa293361c7e784', class: "sk-spinner-v7-dot" }),
                    h("div", { key: '330c98f4b06e4c5f0ad1f390ff07a61798c46843', class: "sk-spinner-v7-dot" }),
                    h("div", { key: '7c913a9d8bda71a5fc502074b7dbd397efbaf44a', class: "sk-spinner-v7-dot" }),
                ];
            }
            if (this.kulLayout === 9) {
                spinnerEl = [
                    h("div", { key: '4b8450640e334bcb02af712ed0e068ef49ad9b7c', class: "sk-spinner-v9-bounce1" }),
                    h("div", { key: '5622abaa56fc65ea9529d2480d87d0fb830ab61b', class: "sk-spinner-v9-bounce2" }),
                ];
            }
            if (this.kulLayout === 10) {
                spinnerEl = [
                    h("div", { key: 'cda2fbe4a8cda05dfedb810ed2e8dfb73a1122ac', class: "sk-spinner-v10-cube1" }),
                    h("div", { key: '1044fa542f6d066f183da12bae1e3bf0f20c5398', class: "sk-spinner-v10-cube2" }),
                ];
            }
            if (this.kulLayout === 12) {
                spinnerEl = [
                    h("div", { key: '24bfc61dcc59ba976db01f62d2e07266354ebfff', class: "sk-spinner-v12-dot1" }),
                    h("div", { key: '61356db2164228a96f22e4ade913d7dc59f11e1a', class: "sk-spinner-v12-dot2" }),
                ];
            }
            if (this.kulLayout === 13) {
                spinnerEl = [
                    h("div", { key: 'bb933c1e67141b920c3b11cf1b81590a226449a9', class: "sk-spinner-v13-cube sk-spinner-v13-cube1" }),
                    h("div", { key: '08bcf16b09a2c1207a7866f4e4acd95336f346f1', class: "sk-spinner-v13-cube sk-spinner-v13-cube2" }),
                    h("div", { key: '9ce4cd758695e73b19747d20ec23037e9f43f9c0', class: "sk-spinner-v13-cube sk-spinner-v13-cube3" }),
                    h("div", { key: 'baed32b51628d818919a60fa810162f53e4b4515', class: "sk-spinner-v13-cube sk-spinner-v13-cube4" }),
                    h("div", { key: '0abd09c4aecff8479f6d6cc4d924abdfb9cc1360', class: "sk-spinner-v13-cube sk-spinner-v13-cube5" }),
                    h("div", { key: 'c857b5ee00e8bc72f25ca68ad31311093f3364ba', class: "sk-spinner-v13-cube sk-spinner-v13-cube6" }),
                    h("div", { key: '9cdc9c62d56926b7c9b179202fe052d654be4123', class: "sk-spinner-v13-cube sk-spinner-v13-cube7" }),
                    h("div", { key: '1ac08a53f84a17bc000733e9de1f848b5847e4af', class: "sk-spinner-v13-cube sk-spinner-v13-cube8" }),
                    h("div", { key: '315bd8753f9909a7555f687891baf17a6b371361', class: "sk-spinner-v13-cube sk-spinner-v13-cube9" }),
                ];
            }
            if (this.kulLayout === 14) {
                spinnerEl = [
                    h("div", { key: 'ab068ac8ba27b1abb7f6bcc996a0b158e8cf2dcf', class: "sk-spinner-v14-circle1 sk-spinner-v14-circle" }),
                    h("div", { key: 'c3849417f1dcd2ef1a94e510464b52bb1d9870f6', class: "sk-spinner-v14-circle2 sk-spinner-v14-circle" }),
                    h("div", { key: 'c9d547dadd4c3196bda7a79821faf0698b4f9b7d', class: "sk-spinner-v14-circle3 sk-spinner-v14-circle" }),
                    h("div", { key: 'f69df95430ed22d44743808604cfd82b6f2d811a', class: "sk-spinner-v14-circle4 sk-spinner-v14-circle" }),
                    h("div", { key: 'a52696bb4edd5935d9eb02cb353d750630a60af4', class: "sk-spinner-v14-circle5 sk-spinner-v14-circle" }),
                    h("div", { key: 'd2bca8edc5f1c2174f80d8ee7cfddacf6be00a62', class: "sk-spinner-v14-circle6 sk-spinner-v14-circle" }),
                    h("div", { key: 'b9b161bf70f8b20dc298b6fe2e22d4bba76dc630', class: "sk-spinner-v14-circle7 sk-spinner-v14-circle" }),
                    h("div", { key: '6503c945444acda07dbe53866d3b62415928a18e', class: "sk-spinner-v14-circle8 sk-spinner-v14-circle" }),
                    h("div", { key: '23e7afa7ab501092af63a6ca549d215c3d708182', class: "sk-spinner-v14-circle9 sk-spinner-v14-circle" }),
                    h("div", { key: 'e269f3d28b29be2d55b7c1451863f6afb87ae11f', class: "sk-spinner-v14-circle10 sk-spinner-v14-circle" }),
                    h("div", { key: 'b1091dc316a9224f55d25430837b22814db776c5', class: "sk-spinner-v14-circle11 sk-spinner-v14-circle" }),
                    h("div", { key: 'e494c4e4c628a3acb489f25ca90eb163214e252a', class: "sk-spinner-v14-circle12 sk-spinner-v14-circle" }),
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
        return (h(Host, { key: 'e364e1b6f1cc61f4119b686cb5d3cdfea4db42dc', style: elStyle }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))) : undefined, h("div", { key: '41f07b703b6bc474da27bfa5b39825625ec1bb53', id: KUL_WRAPPER_ID, style: elStyle }, h("div", { key: '8e4418ced2df1cc936753bf974b2e0a7d5cc1542', id: "loading-wrapper-master", class: masterClass, style: elStyle }, h("div", { key: '6314d2d33480197a98cddacfda2dd57b9a4d66b4', id: wrapperClass, style: elStyle }, h("div", { key: '0cff3a26e60e5fe15e1b4b4c183e32f790a2bdab', class: spinnerClass }, spinnerEl))))));
    }
    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
    }
};
KulSpinner.style = KulSpinnerStyle0;

export { KulSpinner as kul_spinner };

//# sourceMappingURL=kul-spinner.entry.js.map