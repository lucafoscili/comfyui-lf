import { h, r as registerInstance, d as createEvent, g as getElement, f as forceUpdate, F as Fragment, H as Host } from './index-4ebcb21f.js';
import { k as kulManagerInstance, K as KUL_WRAPPER_ID, b as KUL_STYLE_ID } from './kul-manager-0684a7cb.js';
import { g as getProps } from './componentUtils-a994b230.js';

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

const BACK_ICON = 'chevron_left';
const FORWARD_ICON = 'chevron_right';
const COMPONENTS = {
    back: (adapter) => {
        return (h("kul-button", { class: "kul-full-height", id: BACK_ICON, kulIcon: "chevron_left", onClick: () => adapter.actions.previous(adapter), title: "View previous slide." }));
    },
    forward: (adapter) => {
        return (h("kul-button", { class: "kul-full-height", id: BACK_ICON, kulIcon: FORWARD_ICON, onClick: () => adapter.actions.next(adapter), title: "View next slide." }));
    },
};

const kulCarouselCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}@keyframes fade-in-grid{0%{display:none}1%{display:grid;opacity:0}100%{display:grid;opacity:1}}:host{display:block;font-family:var(--kul-font-family, sans-serif);height:100%;margin:auto;max-width:600px;overflow:hidden;position:relative;width:100%}#kul-component{height:100%;width:100%}.carousel{display:flex;height:100%;justify-content:center;position:relative;width:100%}.carousel:hover .carousel__indicators-wrapper{bottom:0;opacity:1}.carousel:hover .carousel__controls{width:100%}.carousel__controls{align-items:center;display:flex;height:100%;justify-content:space-between;opacity:0;position:absolute;top:0;transition:opacity 0.375s ease, width 0.375s ease-in;width:calc(100% + 100px)}.carousel__controls:hover{opacity:1}.carousel__indicator{background-color:var(--kul-title-color);border-radius:50%;cursor:pointer;height:8px;width:8px;margin:0 4px;transition:background-color 0.375s ease, opacity 0.375s ease}.carousel__indicator--active{background-color:var(--kul-primary-color);height:12px;width:12px}.carousel__indicator--small{height:6px;width:6px}.carousel__indicators{align-items:center;background:var(--kul-title-background-color);border-radius:16px;display:flex;justify-content:center;opacity:0.375;padding:8px;transition:opacity 0.375s ease;width:100%}.carousel__indicators:hover{opacity:1}.carousel__indicators-wrapper{bottom:-100%;display:flex;opacity:0;padding:8px 0;position:absolute;transition:bottom 0.2s ease-in, opacity 0.2s ease-in}.carousel__track{display:flex;height:100%;transition:transform 0.5s cubic-bezier(0.5, 0, 0.1, 1);will-change:transform;width:100%}.carousel__slide{align-items:center;display:flex;flex-shrink:0;height:100%;justify-content:center;width:100%}.carousel__chevron{color:var(--kul-title-color);cursor:pointer;font-size:12px;margin:0 6px;transition:transform 0.3s ease}.carousel__chevron--left{margin-right:8px}.carousel__chevron--right{margin-left:8px}.carousel__chevron:hover{transform:translateX(-3px)}.carousel__chevron--right:hover{transform:translateX(3px)}";
const KulCarouselStyle0 = kulCarouselCss;

const KulCarousel = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-carousel-event", 6);
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
        this.kulShape = 'image';
        this.kulStyle = '';
    }
    get rootElement() { return getElement(this); }
    /*-------------------------------------------------*/
    /*       I n t e r n a l   V a r i a b l e s       */
    /*-------------------------------------------------*/
    #interval;
    #kulManager = kulManagerInstance();
    #lastSwipeTime = 0;
    #swipeThrottleDelay = 300;
    #touchStartX = 0;
    #touchEndX = 0;
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
        });
    }
    /*-------------------------------------------------*/
    /*                 W a t c h e r s                 */
    /*-------------------------------------------------*/
    async updateShapes() {
        try {
            this.shapes = this.#kulManager.data.cell.shapes.getAll(this.kulData);
        }
        catch (error) {
            this.#kulManager.debug.logs.new(this, 'Error updating shapes: ' + error, 'error');
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
        this.#adapter.actions.toSlide(this.#adapter, index);
    }
    /**
     * Advances to the next slide, looping back to the start if at the end.
     */
    async nextSlide() {
        this.#adapter.actions.next(this.#adapter);
    }
    /**
     * Moves to the previous slide, looping to the last slide if at the beginning.
     */
    async prevSlide() {
        this.#adapter.actions.previous(this.#adapter);
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
    /*                   M e t h o d s                 */
    /*-------------------------------------------------*/
    #adapter = {
        actions: ACTIONS,
        components: COMPONENTS,
        get: {
            carousel: () => this,
            interval: () => this.#interval,
            manager: () => this.#kulManager,
            state: { currentIndex: () => this.currentIndex },
            totalSlides: () => this.#getTotalSlides(),
        },
        set: {
            interval: (value) => (this.#interval = value),
            state: { currentIndex: (value) => (this.currentIndex = value) },
        },
    };
    #getTotalSlides() {
        return this.shapes?.[this.kulShape]?.length || 0;
    }
    #hasShapes() {
        return !!this.shapes?.[this.kulShape];
    }
    #prepCarousel() {
        if (this.#hasShapes()) {
            const shapes = this.shapes[this.kulShape];
            if (shapes?.length) {
                return (h(Fragment, null, h("div", { class: "carousel__track", role: "region", "aria-live": "polite" }, this.#prepSlide()), h("div", { class: "carousel__controls" }, this.#adapter.components.back(this.#adapter), this.#adapter.components.forward(this.#adapter)), h("div", { class: "carousel__indicators-wrapper" }, h("div", { class: "carousel__indicators" }, this.#prepIndicators()))));
            }
        }
    }
    #prepIndicators() {
        const totalSlides = this.#getTotalSlides();
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
                'carousel__chevron--left': true,
            };
            indicators.push(h("span", { class: className, onClick: () => this.#adapter.actions.toSlide(this.#adapter, 0), title: `Jump to the first slide (#${0})` }, "\u00AB"));
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
                'carousel__indicator--active': isCurrent,
                'carousel__indicator--small': (isFirst || isLast) && !isCurrent,
            };
            indicators.push(h("span", { class: className, onClick: () => this.#adapter.actions.toSlide(this.#adapter, actualIndex), title: `#${index}` }));
        });
        if (end < totalSlides) {
            const className = {
                carousel__chevron: true,
                'carousel__chevron--right': true,
            };
            indicators.push(h("span", { class: className, onClick: () => this.#adapter.actions.toSlide(this.#adapter, totalSlides - 1), title: `Jump to the last slide (#${totalSlides - 1})` }, "\u00BB"));
        }
        return indicators;
    }
    #prepSlide() {
        const props = this.shapes[this.kulShape].map(() => ({
            htmlProps: {
                className: 'kul-fit',
            },
        }));
        const decoratedShapes = this.#kulManager.data.cell.shapes.decorate(this.kulShape, this.shapes[this.kulShape], async (e) => this.onKulEvent(e, 'kul-event'), props).element;
        return (h("div", { class: "carousel__slide", "data-index": this.currentIndex }, h(Fragment, null, decoratedShapes[this.currentIndex])));
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentWillLoad() {
        this.#kulManager.theme.register(this);
        this.updateShapes();
        if (this.kulAutoPlay) {
            this.#adapter.actions.autoplay.start(this.#adapter);
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
        return (h(Host, { key: '55f253cd5b74a3f64c9f878273a19035ff31e5df' }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))) : undefined, h("div", { key: 'd11a0bcc21d61d6bd3d8596c8f3459806a74e821', id: KUL_WRAPPER_ID }, h("div", { key: 'f3ff3809b54cc0ef97aea6e314faf25d35b77d55', class: "carousel", onTouchStart: (e) => (this.#touchStartX = e.touches[0].clientX), onTouchMove: () => {
                const swipeDistance = this.#touchEndX - this.#touchStartX;
                const swipeThreshold = 50;
                const currentTime = performance.now();
                if (Math.abs(swipeDistance) > swipeThreshold &&
                    currentTime - this.#lastSwipeTime >
                        this.#swipeThrottleDelay) {
                    this.#lastSwipeTime = currentTime;
                    if (swipeDistance > 0) {
                        this.#adapter.actions.previous(this.#adapter);
                    }
                    else {
                        this.#adapter.actions.next(this.#adapter);
                    }
                }
            }, onTouchEnd: (e) => (this.#touchEndX = e.touches[0].clientX) }, this.#prepCarousel()))));
    }
    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
        this.#adapter.actions.autoplay.stop(this.#adapter);
    }
    static get watchers() { return {
        "kulData": ["updateShapes"],
        "kulShape": ["updateShapes"]
    }; }
};
KulCarousel.style = KulCarouselStyle0;

export { KulCarousel as kul_carousel };

//# sourceMappingURL=kul-carousel.entry.js.map