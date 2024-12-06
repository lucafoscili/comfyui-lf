import { h, r as registerInstance, d as createEvent, f as forceUpdate, H as Host, g as getElement, F as Fragment } from './index-64e8bec6.js';
import { k as kulManagerInstance, a as KUL_WRAPPER_ID, b as KUL_STYLE_ID } from './kul-manager-2a1960f6.js';
import { g as getProps } from './componentUtils-a994b230.js';

const ACTIONS = {
    autoplay: {
        start(adapter) {
            const carousel = adapter.get.carousel();
            if (carousel.kulAutoPlay && carousel.kulInterval > 0) {
                adapter.set.interval(setInterval(() => {
                    adapter.actions.next(adapter);
                }, carousel.kulInterval));
            }
        },
        stop(adapter) {
            const interval = adapter.get.interval();
            if (interval) {
                clearInterval(interval);
                adapter.set.interval(null);
            }
        },
    },
    next: (adapter) => {
        const currentIndex = adapter.get.state.currentIndex();
        const totalSlides = adapter.get.totalSlides();
        adapter.set.state.currentIndex((currentIndex + 1) % totalSlides);
    },
    previous: (adapter) => {
        const currentIndex = adapter.get.state.currentIndex();
        const totalSlides = adapter.get.totalSlides();
        adapter.set.state.currentIndex((currentIndex - 1 + totalSlides) % totalSlides);
    },
    toSlide: (adapter, value) => {
        adapter.set.state.currentIndex(value);
    },
};

const BACK_ICON = "chevron_left";
const FORWARD_ICON = "chevron_right";
const COMPONENTS = {
    back: (adapter) => {
        return (h("kul-button", { class: "kul-full-height", id: BACK_ICON, kulIcon: "chevron_left", onClick: () => adapter.actions.previous(adapter), title: "View previous slide." }));
    },
    forward: (adapter) => {
        return (h("kul-button", { class: "kul-full-height", id: BACK_ICON, kulIcon: FORWARD_ICON, onClick: () => adapter.actions.next(adapter), title: "View next slide." }));
    },
};

/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
var KulCarouselProps;
(function (KulCarouselProps) {
    KulCarouselProps["kulAutoPlay"] = "Enable or disable autoplay for the carousel.";
    KulCarouselProps["kulData"] = "Actual data to carousel.";
    KulCarouselProps["kulInterval"] = "Interval in milliseconds for autoplay.";
    KulCarouselProps["kulShape"] = "Sets the type of shapes to compare.";
    KulCarouselProps["kulStyle"] = "Sets a custom CSS style for the component.";
})(KulCarouselProps || (KulCarouselProps = {}));

const kulCarouselCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}@keyframes fade-in-grid{0%{display:none}1%{display:grid;opacity:0}100%{display:grid;opacity:1}}:host{display:block;font-family:var(--kul-font-family, sans-serif);height:100%;margin:auto;max-width:600px;overflow:hidden;position:relative;width:100%}#kul-component{height:100%;width:100%}.carousel{display:flex;height:100%;justify-content:center;position:relative;width:100%}.carousel:hover .carousel__indicators-wrapper{bottom:0;opacity:1}.carousel:hover .carousel__controls{width:100%}.carousel__controls{align-items:center;display:flex;height:100%;justify-content:space-between;opacity:0;position:absolute;top:0;transition:opacity 0.375s ease, width 0.375s ease-in;width:calc(100% + 100px)}.carousel__controls:hover{opacity:1}.carousel__indicator{background-color:var(--kul-title-color);border-radius:50%;cursor:pointer;height:8px;width:8px;margin:0 4px;transition:background-color 0.375s ease, opacity 0.375s ease}.carousel__indicator--active{background-color:var(--kul-primary-color);height:12px;width:12px}.carousel__indicator--small{height:6px;width:6px}.carousel__indicators{align-items:center;background:var(--kul-title-background-color);border-radius:16px;display:flex;justify-content:center;opacity:0.375;padding:8px;transition:opacity 0.375s ease;width:100%}.carousel__indicators:hover{opacity:1}.carousel__indicators-wrapper{bottom:-100%;display:flex;opacity:0;padding:8px 0;position:absolute;transition:bottom 0.2s ease-in, opacity 0.2s ease-in}.carousel__track{display:flex;height:100%;transition:transform 0.5s cubic-bezier(0.5, 0, 0.1, 1);will-change:transform;width:100%}.carousel__slide{align-items:center;display:flex;flex-shrink:0;height:100%;justify-content:center;width:100%}.carousel__chevron{color:var(--kul-title-color);cursor:pointer;font-size:12px;margin:0 6px;transition:transform 0.3s ease}.carousel__chevron--left{margin-right:8px}.carousel__chevron--right{margin-left:8px}.carousel__chevron:hover{transform:translateX(-3px)}.carousel__chevron--right:hover{transform:translateX(3px)}";
const KulCarouselStyle0 = kulCarouselCss;

var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f)
        throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
        throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m")
        throw new TypeError("Private method is not writable");
    if (kind === "a" && !f)
        throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
        throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _KulCarousel_instances, _KulCarousel_interval, _KulCarousel_kulManager, _KulCarousel_lastSwipeTime, _KulCarousel_swipeThrottleDelay, _KulCarousel_touchStartX, _KulCarousel_touchEndX, _KulCarousel_adapter, _KulCarousel_getTotalSlides, _KulCarousel_hasShapes, _KulCarousel_prepCarousel, _KulCarousel_prepIndicators, _KulCarousel_prepSlide;
const KulCarousel = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-carousel-event", 6);
        _KulCarousel_instances.add(this);
        /*-------------------------------------------------*/
        /*       I n t e r n a l   V a r i a b l e s       */
        /*-------------------------------------------------*/
        _KulCarousel_interval.set(this, void 0);
        _KulCarousel_kulManager.set(this, kulManagerInstance());
        _KulCarousel_lastSwipeTime.set(this, 0);
        _KulCarousel_swipeThrottleDelay.set(this, 300);
        _KulCarousel_touchStartX.set(this, 0);
        _KulCarousel_touchEndX.set(this, 0);
        /*-------------------------------------------------*/
        /*                   M e t h o d s                 */
        /*-------------------------------------------------*/
        _KulCarousel_adapter.set(this, {
            actions: ACTIONS,
            components: COMPONENTS,
            get: {
                carousel: () => this,
                interval: () => __classPrivateFieldGet(this, _KulCarousel_interval, "f"),
                manager: () => __classPrivateFieldGet(this, _KulCarousel_kulManager, "f"),
                state: { currentIndex: () => this.currentIndex },
                totalSlides: () => __classPrivateFieldGet(this, _KulCarousel_instances, "m", _KulCarousel_getTotalSlides).call(this),
            },
            set: {
                interval: (value) => (__classPrivateFieldSet(this, _KulCarousel_interval, value, "f")),
                state: { currentIndex: (value) => (this.currentIndex = value) },
            },
        });
        this.debugInfo = {
            endTime: 0,
            renderCount: 0,
            renderEnd: 0,
            renderStart: 0,
            startTime: performance.now(),
        };
        this.currentIndex = 0;
        this.shapes = {};
        this.kulData = null;
        this.kulAutoPlay = false;
        this.kulInterval = 3000;
        this.kulShape = "image";
        this.kulStyle = "";
    }
    onKulEvent(e, eventType) {
        this.kulEvent.emit({
            comp: this,
            eventType,
            id: this.rootElement.id,
            originalEvent: e,
        });
    }
    /*-------------------------------------------------*/
    /*                 W a t c h e r s                 */
    /*-------------------------------------------------*/
    async updateShapes() {
        try {
            this.shapes = __classPrivateFieldGet(this, _KulCarousel_kulManager, "f").data.cell.shapes.getAll(this.kulData);
        }
        catch (error) {
            __classPrivateFieldGet(this, _KulCarousel_kulManager, "f").debug.logs.new(this, "Error updating shapes: " + error, "error");
        }
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
        return getProps(this, KulCarouselProps, descriptions);
    }
    /**
     * Changes the slide to the specified index if it's within bounds.
     * @param {number} index - The number of the slide to go to.
     */
    async goToSlide(index) {
        __classPrivateFieldGet(this, _KulCarousel_adapter, "f").actions.toSlide(__classPrivateFieldGet(this, _KulCarousel_adapter, "f"), index);
    }
    /**
     * Advances to the next slide, looping back to the start if at the end.
     */
    async nextSlide() {
        __classPrivateFieldGet(this, _KulCarousel_adapter, "f").actions.next(__classPrivateFieldGet(this, _KulCarousel_adapter, "f"));
    }
    /**
     * Moves to the previous slide, looping to the last slide if at the beginning.
     */
    async prevSlide() {
        __classPrivateFieldGet(this, _KulCarousel_adapter, "f").actions.previous(__classPrivateFieldGet(this, _KulCarousel_adapter, "f"));
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
            this.onKulEvent(new CustomEvent("unmount"), "unmount");
            this.rootElement.remove();
        }, ms);
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentWillLoad() {
        __classPrivateFieldGet(this, _KulCarousel_kulManager, "f").theme.register(this);
        this.updateShapes();
        if (this.kulAutoPlay) {
            __classPrivateFieldGet(this, _KulCarousel_adapter, "f").actions.autoplay.start(__classPrivateFieldGet(this, _KulCarousel_adapter, "f"));
        }
    }
    componentDidLoad() {
        this.onKulEvent(new CustomEvent("ready"), "ready");
        __classPrivateFieldGet(this, _KulCarousel_kulManager, "f").debug.updateDebugInfo(this, "did-load");
    }
    componentWillRender() {
        __classPrivateFieldGet(this, _KulCarousel_kulManager, "f").debug.updateDebugInfo(this, "will-render");
    }
    componentDidRender() {
        __classPrivateFieldGet(this, _KulCarousel_kulManager, "f").debug.updateDebugInfo(this, "did-render");
    }
    render() {
        return (h(Host, { key: 'd619cf64cdb72d99c37b11df75a8c885b16145f8' }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, __classPrivateFieldGet(this, _KulCarousel_kulManager, "f").theme.setKulStyle(this))) : undefined, h("div", { key: 'b9808eb7a3b04a82e3d9007d57ec24482ddd86b8', id: KUL_WRAPPER_ID }, h("div", { key: '9bf886590d34ea9a83b8be5b9359e8e00478eba9', class: "carousel", onTouchStart: (e) => (__classPrivateFieldSet(this, _KulCarousel_touchStartX, e.touches[0].clientX, "f")), onTouchMove: () => {
                const swipeDistance = __classPrivateFieldGet(this, _KulCarousel_touchEndX, "f") - __classPrivateFieldGet(this, _KulCarousel_touchStartX, "f");
                const swipeThreshold = 50;
                const currentTime = performance.now();
                if (Math.abs(swipeDistance) > swipeThreshold &&
                    currentTime - __classPrivateFieldGet(this, _KulCarousel_lastSwipeTime, "f") > __classPrivateFieldGet(this, _KulCarousel_swipeThrottleDelay, "f")) {
                    __classPrivateFieldSet(this, _KulCarousel_lastSwipeTime, currentTime, "f");
                    if (swipeDistance > 0) {
                        __classPrivateFieldGet(this, _KulCarousel_adapter, "f").actions.previous(__classPrivateFieldGet(this, _KulCarousel_adapter, "f"));
                    }
                    else {
                        __classPrivateFieldGet(this, _KulCarousel_adapter, "f").actions.next(__classPrivateFieldGet(this, _KulCarousel_adapter, "f"));
                    }
                }
            }, onTouchEnd: (e) => (__classPrivateFieldSet(this, _KulCarousel_touchEndX, e.touches[0].clientX, "f")) }, __classPrivateFieldGet(this, _KulCarousel_instances, "m", _KulCarousel_prepCarousel).call(this)))));
    }
    disconnectedCallback() {
        __classPrivateFieldGet(this, _KulCarousel_kulManager, "f").theme.unregister(this);
        __classPrivateFieldGet(this, _KulCarousel_adapter, "f").actions.autoplay.stop(__classPrivateFieldGet(this, _KulCarousel_adapter, "f"));
    }
    get rootElement() { return getElement(this); }
    static get watchers() { return {
        "kulData": ["updateShapes"],
        "kulShape": ["updateShapes"]
    }; }
};
_KulCarousel_interval = new WeakMap(), _KulCarousel_kulManager = new WeakMap(), _KulCarousel_lastSwipeTime = new WeakMap(), _KulCarousel_swipeThrottleDelay = new WeakMap(), _KulCarousel_touchStartX = new WeakMap(), _KulCarousel_touchEndX = new WeakMap(), _KulCarousel_adapter = new WeakMap(), _KulCarousel_instances = new WeakSet(), _KulCarousel_getTotalSlides = function _KulCarousel_getTotalSlides() {
    return this.shapes?.[this.kulShape]?.length || 0;
}, _KulCarousel_hasShapes = function _KulCarousel_hasShapes() {
    return !!this.shapes?.[this.kulShape];
}, _KulCarousel_prepCarousel = function _KulCarousel_prepCarousel() {
    if (__classPrivateFieldGet(this, _KulCarousel_instances, "m", _KulCarousel_hasShapes).call(this)) {
        const shapes = this.shapes[this.kulShape];
        if (shapes?.length) {
            return (h(Fragment, null, h("div", { class: "carousel__track", role: "region", "aria-live": "polite" }, __classPrivateFieldGet(this, _KulCarousel_instances, "m", _KulCarousel_prepSlide).call(this)), h("div", { class: "carousel__controls" }, __classPrivateFieldGet(this, _KulCarousel_adapter, "f").components.back(__classPrivateFieldGet(this, _KulCarousel_adapter, "f")), __classPrivateFieldGet(this, _KulCarousel_adapter, "f").components.forward(__classPrivateFieldGet(this, _KulCarousel_adapter, "f"))), h("div", { class: "carousel__indicators-wrapper" }, h("div", { class: "carousel__indicators" }, __classPrivateFieldGet(this, _KulCarousel_instances, "m", _KulCarousel_prepIndicators).call(this)))));
        }
    }
}, _KulCarousel_prepIndicators = function _KulCarousel_prepIndicators() {
    const totalSlides = __classPrivateFieldGet(this, _KulCarousel_instances, "m", _KulCarousel_getTotalSlides).call(this);
    const maxIndicators = 9;
    const halfMax = Math.floor(maxIndicators / 2);
    let start = Math.max(0, this.currentIndex - halfMax);
    let end = Math.min(totalSlides, start + maxIndicators);
    if (end === totalSlides) {
        start = Math.max(0, end - maxIndicators);
    }
    const indicators = [];
    if (start > 0) {
        const className = {
            carousel__chevron: true,
            "carousel__chevron--left": true,
        };
        indicators.push(h("span", { class: className, onClick: () => __classPrivateFieldGet(this, _KulCarousel_adapter, "f").actions.toSlide(__classPrivateFieldGet(this, _KulCarousel_adapter, "f"), 0), title: `Jump to the first slide (#${0})` }, "\u00AB"));
    }
    this.shapes[this.kulShape]
        ?.slice(start, end)
        .forEach((_, index) => {
        const actualIndex = start + index;
        const isCurrent = actualIndex === this.currentIndex;
        const isFirst = actualIndex === start;
        const isLast = actualIndex === end - 1;
        const className = {
            carousel__indicator: true,
            "carousel__indicator--active": isCurrent,
            "carousel__indicator--small": (isFirst || isLast) && !isCurrent,
        };
        indicators.push(h("span", { class: className, onClick: () => __classPrivateFieldGet(this, _KulCarousel_adapter, "f").actions.toSlide(__classPrivateFieldGet(this, _KulCarousel_adapter, "f"), actualIndex), title: `#${index}` }));
    });
    if (end < totalSlides) {
        const className = {
            carousel__chevron: true,
            "carousel__chevron--right": true,
        };
        indicators.push(h("span", { class: className, onClick: () => __classPrivateFieldGet(this, _KulCarousel_adapter, "f").actions.toSlide(__classPrivateFieldGet(this, _KulCarousel_adapter, "f"), totalSlides - 1), title: `Jump to the last slide (#${totalSlides - 1})` }, "\u00BB"));
    }
    return indicators;
}, _KulCarousel_prepSlide = function _KulCarousel_prepSlide() {
    const props = this.shapes[this.kulShape].map(() => ({
        htmlProps: {
            className: "kul-fit",
        },
    }));
    const decoratedShapes = __classPrivateFieldGet(this, _KulCarousel_kulManager, "f").data.cell.shapes.decorate(this.kulShape, this.shapes[this.kulShape], async (e) => this.onKulEvent(e, "kul-event"), props).element;
    return (h("div", { class: "carousel__slide", "data-index": this.currentIndex }, h(Fragment, null, decoratedShapes[this.currentIndex])));
};
KulCarousel.style = KulCarouselStyle0;

export { KulCarousel as kul_carousel };

//# sourceMappingURL=kul-carousel.entry.js.map