import { r as registerInstance, d as createEvent, f as forceUpdate, h, H as Host, g as getElement, F as Fragment } from './index-5c52ec0e.js';
import { k as kulManagerInstance, a as KUL_WRAPPER_ID, b as KUL_STYLE_ID } from './kul-manager-c48a993d.js';
import { g as getProps } from './componentUtils-a994b230.js';

//#endregion
//#region Props
var KulCanvasProps;
(function (KulCanvasProps) {
    KulCanvasProps["kulBrush"] = "The shape of the brush.";
    KulCanvasProps["kulColor"] = "The color of the brush.";
    KulCanvasProps["kulCursor"] = " Sets the style of the cursor.";
    KulCanvasProps["kulImageProps"] = "The props of the image displayed inside the badge.";
    KulCanvasProps["kulOpacity"] = "The opacity of the brush.";
    KulCanvasProps["kulPreview"] = "Displays the brush track of the current stroke.";
    KulCanvasProps["kulSize"] = "The size of the brush.";
    KulCanvasProps["kulStrokeTolerance"] = "Simplifies the coordinates array by applying the Ramer-Douglas-Peucker algorithm. This prop sets the tolerance of the algorithm (null to disable)";
    KulCanvasProps["kulStyle"] = "Custom style of the component.";
})(KulCanvasProps || (KulCanvasProps = {}));
//#endregion

//#region simplifyStroke
const simplifyStroke = (points, tolerance) => {
    if (points.length <= 2) {
        return points;
    }
    const sqTolerance = tolerance * tolerance;
    function getSqDist(p1, p2) {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        return dx * dx + dy * dy;
    }
    function simplifyRecursive(start, end, sqTolerance, simplified) {
        let maxSqDist = sqTolerance;
        let index = -1;
        for (let i = start + 1; i < end; i++) {
            const sqDist = getSqDist(points[i], getClosestPoint(points[start], points[end], points[i]));
            if (sqDist > maxSqDist) {
                index = i;
                maxSqDist = sqDist;
            }
        }
        if (maxSqDist > sqTolerance) {
            if (index - start > 1)
                simplifyRecursive(start, index, sqTolerance, simplified);
            simplified.push(points[index]);
            if (end - index > 1)
                simplifyRecursive(index, end, sqTolerance, simplified);
        }
    }
    function getClosestPoint(p1, p2, p) {
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const t = ((p.x - p1.x) * dx + (p.y - p1.y) * dy) / (dx * dx + dy * dy);
        return { x: p1.x + t * dx, y: p1.y + t * dy };
    }
    const simplified = [points[0]];
    simplifyRecursive(0, points.length - 1, sqTolerance, simplified);
    simplified.push(points[points.length - 1]);
    return simplified;
};
//#endregion

const kulCanvasCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}@keyframes fade-in-grid{0%{display:none}1%{display:grid;opacity:0}100%{display:grid;opacity:1}}:host{display:block;height:100%;position:relative;width:100%}#kul-component{height:100%;width:100%}.canvas{height:100%;margin:auto;max-width:100%;position:relative;width:max-content}.canvas--hidden-cursor{cursor:none}.canvas__image{pointer-events:none}.canvas__board,.canvas__cursor{position:absolute;top:0;left:0;width:100%;height:100%}.canvas__cursor{pointer-events:none}";
const KulCanvasStyle0 = kulCanvasCss;

var __classPrivateFieldGet$1 = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
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
var _KulCanvas_instances, _KulCanvas_board, _KulCanvas_boardCtx, _KulCanvas_container, _KulCanvas_cursor, _KulCanvas_cursorCtx, _KulCanvas_image, _KulCanvas_kulManager, _KulCanvas_resizeObserver, _KulCanvas_resizeTimeout, _KulCanvas_isCursorPreview, _KulCanvas_normalizeCoordinate, _KulCanvas_getCanvasCoordinate, _KulCanvas_setupContext, _KulCanvas_handlePointerDown, _KulCanvas_handlePointerMove, _KulCanvas_handlePointerOut, _KulCanvas_handlePointerUp, _KulCanvas_addPoint, _KulCanvas_endCapture, _KulCanvas_drawBrushCursor, _KulCanvas_drawBrushShape, _KulCanvas_drawLastSegment;
const KulCanvas = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-canvas-event", 6);
        _KulCanvas_instances.add(this);
        //#endregion
        //#region Internal variables
        _KulCanvas_board.set(this, void 0);
        _KulCanvas_boardCtx.set(this, void 0);
        _KulCanvas_container.set(this, void 0);
        _KulCanvas_cursor.set(this, void 0);
        _KulCanvas_cursorCtx.set(this, void 0);
        _KulCanvas_image.set(this, void 0);
        _KulCanvas_kulManager.set(this, kulManagerInstance());
        _KulCanvas_resizeObserver.set(this, void 0);
        _KulCanvas_resizeTimeout.set(this, void 0);
        _KulCanvas_handlePointerMove.set(this, (e) => {
            e.preventDefault();
            if (__classPrivateFieldGet$1(this, _KulCanvas_instances, "m", _KulCanvas_isCursorPreview).call(this)) {
                __classPrivateFieldGet$1(this, _KulCanvas_instances, "m", _KulCanvas_drawBrushCursor).call(this, e);
            }
            if (!this.isPainting) {
                return;
            }
            __classPrivateFieldGet$1(this, _KulCanvas_instances, "m", _KulCanvas_addPoint).call(this, e);
            __classPrivateFieldGet$1(this, _KulCanvas_instances, "m", _KulCanvas_drawLastSegment).call(this);
        });
        _KulCanvas_handlePointerOut.set(this, (e) => {
            __classPrivateFieldGet$1(this, _KulCanvas_instances, "m", _KulCanvas_endCapture).call(this, e);
        });
        _KulCanvas_handlePointerUp.set(this, (e) => {
            __classPrivateFieldGet$1(this, _KulCanvas_instances, "m", _KulCanvas_endCapture).call(this, e);
        });
        this.debugInfo = {
            endTime: 0,
            renderCount: 0,
            renderEnd: 0,
            renderStart: 0,
            startTime: performance.now(),
        };
        this.isPainting = false;
        this.points = [];
        this.kulBrush = "round";
        this.kulColor = "#ff0000";
        this.kulCursor = "preview";
        this.kulImageProps = null;
        this.kulOpacity = 1.0;
        this.kulPreview = true;
        this.kulStrokeTolerance = null;
        this.kulSize = 10;
        this.kulStyle = "";
    }
    onKulEvent(e, eventType) {
        this.kulEvent.emit({
            comp: this,
            id: this.rootElement.id,
            originalEvent: e,
            eventType,
            points: this.kulStrokeTolerance !== null && this.points?.length
                ? simplifyStroke(this.points, this.kulStrokeTolerance)
                : this.points,
        });
    }
    //#endregion
    //#region Public methods
    /**
     * Clears the painting canvas .
     */
    async clearCanvas() {
        __classPrivateFieldGet$1(this, _KulCanvas_boardCtx, "f").clearRect(0, 0, __classPrivateFieldGet$1(this, _KulCanvas_board, "f").width, __classPrivateFieldGet$1(this, _KulCanvas_board, "f").height);
    }
    /**
     * Returns the painting canvas .
     * @returns {Promise<HTMLCanvasElement>} The painting canvas.
     */
    async getCanvas() {
        return __classPrivateFieldGet$1(this, _KulCanvas_board, "f");
    }
    /**
     * Fetches debug information of the component's current state.
     * @returns {Promise<KulDebugLifecycleInfo>} A promise that resolves with the debug information object.
     */
    async getDebugInfo() {
        return this.debugInfo;
    }
    /**
     * Returns the image component.
     */
    async getImage() {
        return __classPrivateFieldGet$1(this, _KulCanvas_image, "f");
    }
    /**
     * Used to retrieve component's props values.
     * @param {boolean} descriptions - When provided and true, the result will be the list of props with their description.
     * @returns {Promise<KulCanvasPropsInterface>} List of props as object, each key will be a prop.
     */
    async getProps(descriptions) {
        return getProps(this, KulCanvasProps, descriptions);
    }
    /**
     * This method is used to trigger a new render of the component.
     */
    async refresh() {
        forceUpdate(this);
    }
    /**
     * Automatically resizes the canvas to the match the size of the container.
     */
    async resizeCanvas() {
        const { height, width } = __classPrivateFieldGet$1(this, _KulCanvas_container, "f").getBoundingClientRect();
        __classPrivateFieldGet$1(this, _KulCanvas_board, "f").height = height;
        __classPrivateFieldGet$1(this, _KulCanvas_board, "f").width = width;
        if (__classPrivateFieldGet$1(this, _KulCanvas_instances, "m", _KulCanvas_isCursorPreview).call(this)) {
            __classPrivateFieldGet$1(this, _KulCanvas_cursor, "f").height = height;
            __classPrivateFieldGet$1(this, _KulCanvas_cursor, "f").width = width;
        }
    }
    /**
     * Sets the height of the canvas.
     */
    async setCanvasHeight(value) {
        if (value !== undefined) {
            __classPrivateFieldGet$1(this, _KulCanvas_board, "f").height = value;
            if (__classPrivateFieldGet$1(this, _KulCanvas_instances, "m", _KulCanvas_isCursorPreview).call(this)) {
                __classPrivateFieldGet$1(this, _KulCanvas_cursor, "f").height = value;
            }
        }
        else {
            const { height } = __classPrivateFieldGet$1(this, _KulCanvas_container, "f").getBoundingClientRect();
            __classPrivateFieldGet$1(this, _KulCanvas_board, "f").height = height;
            if (__classPrivateFieldGet$1(this, _KulCanvas_instances, "m", _KulCanvas_isCursorPreview).call(this)) {
                __classPrivateFieldGet$1(this, _KulCanvas_cursor, "f").height = height;
            }
        }
    }
    /**
     * Sets the width of the canvas.
     */
    async setCanvasWidth(value) {
        if (value !== undefined) {
            __classPrivateFieldGet$1(this, _KulCanvas_board, "f").width = value;
            if (__classPrivateFieldGet$1(this, _KulCanvas_instances, "m", _KulCanvas_isCursorPreview).call(this)) {
                __classPrivateFieldGet$1(this, _KulCanvas_cursor, "f").width = value;
            }
        }
        else {
            const { width } = __classPrivateFieldGet$1(this, _KulCanvas_container, "f").getBoundingClientRect();
            __classPrivateFieldGet$1(this, _KulCanvas_board, "f").width = width;
            if (__classPrivateFieldGet$1(this, _KulCanvas_instances, "m", _KulCanvas_isCursorPreview).call(this)) {
                __classPrivateFieldGet$1(this, _KulCanvas_cursor, "f").width = width;
            }
        }
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
    //#endregion
    //#region Lifecycle hooks
    componentWillLoad() {
        __classPrivateFieldGet$1(this, _KulCanvas_kulManager, "f").theme.register(this);
    }
    componentDidLoad() {
        __classPrivateFieldSet(this, _KulCanvas_boardCtx, __classPrivateFieldGet$1(this, _KulCanvas_board, "f").getContext("2d"), "f");
        __classPrivateFieldSet(this, _KulCanvas_cursorCtx, __classPrivateFieldGet$1(this, _KulCanvas_cursor, "f").getContext("2d"), "f");
        this.setCanvasHeight();
        this.setCanvasWidth();
        __classPrivateFieldSet(this, _KulCanvas_resizeObserver, new ResizeObserver(() => {
            clearTimeout(__classPrivateFieldGet$1(this, _KulCanvas_resizeTimeout, "f"));
            __classPrivateFieldSet(this, _KulCanvas_resizeTimeout, setTimeout(() => {
                this.setCanvasHeight();
                this.setCanvasWidth();
            }, 100), "f");
        }), "f");
        __classPrivateFieldGet$1(this, _KulCanvas_resizeObserver, "f").observe(__classPrivateFieldGet$1(this, _KulCanvas_container, "f"));
        this.onKulEvent(new CustomEvent("ready"), "ready");
        __classPrivateFieldGet$1(this, _KulCanvas_kulManager, "f").debug.updateDebugInfo(this, "did-load");
    }
    componentWillRender() {
        __classPrivateFieldGet$1(this, _KulCanvas_kulManager, "f").debug.updateDebugInfo(this, "will-render");
    }
    componentDidRender() {
        __classPrivateFieldGet$1(this, _KulCanvas_kulManager, "f").debug.updateDebugInfo(this, "did-render");
    }
    render() {
        const className = {
            canvas: true,
            "canvas--hidden-cursor": __classPrivateFieldGet$1(this, _KulCanvas_instances, "m", _KulCanvas_isCursorPreview).call(this),
        };
        return (h(Host, { key: '7226f66353c0b9bbbb526c7c918b1e5ecfce3886' }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, __classPrivateFieldGet$1(this, _KulCanvas_kulManager, "f").theme.setKulStyle(this))) : undefined, h("div", { key: 'f9b117f368383d807353e9cc302f826dee346902', id: KUL_WRAPPER_ID }, h("div", { key: '0bfde5689d1b971ba211158022aff3e4fcbf354c', class: className, ref: (el) => {
                if (el) {
                    __classPrivateFieldSet(this, _KulCanvas_container, el, "f");
                }
            } }, h("kul-image", { key: 'b757fb108cac828650487cd4fe96205c0d8578ef', class: "canvas__image kul-fit", ...this.kulImageProps, ref: (el) => {
                if (el) {
                    __classPrivateFieldSet(this, _KulCanvas_image, el, "f");
                }
            } }), h("canvas", { key: '760f31ecc63610bc6b5fa833eb48fdcd79ed066b', class: "canvas__board", onPointerDown: (e) => __classPrivateFieldGet$1(this, _KulCanvas_instances, "m", _KulCanvas_handlePointerDown).call(this, e), onPointerMove: (e) => __classPrivateFieldGet$1(this, _KulCanvas_handlePointerMove, "f").call(this, e), onPointerUp: (e) => this.onKulEvent(e, "stroke"), onPointerOut: (e) => __classPrivateFieldGet$1(this, _KulCanvas_handlePointerOut, "f").call(this, e), ref: (el) => {
                if (el) {
                    __classPrivateFieldSet(this, _KulCanvas_board, el, "f");
                }
            } }), __classPrivateFieldGet$1(this, _KulCanvas_instances, "m", _KulCanvas_isCursorPreview).call(this) && (h("canvas", { key: '52ce19df5a08f41e6e82a2554bc4d276f72b4276', class: "canvas__cursor", ref: (el) => {
                if (el) {
                    __classPrivateFieldSet(this, _KulCanvas_cursor, el, "f");
                }
            } }))))));
    }
    disconnectedCallback() {
        __classPrivateFieldGet$1(this, _KulCanvas_kulManager, "f").theme.unregister(this);
        if (__classPrivateFieldGet$1(this, _KulCanvas_resizeObserver, "f")) {
            __classPrivateFieldGet$1(this, _KulCanvas_resizeObserver, "f").disconnect();
        }
    }
    get rootElement() { return getElement(this); }
};
_KulCanvas_board = new WeakMap(), _KulCanvas_boardCtx = new WeakMap(), _KulCanvas_container = new WeakMap(), _KulCanvas_cursor = new WeakMap(), _KulCanvas_cursorCtx = new WeakMap(), _KulCanvas_image = new WeakMap(), _KulCanvas_kulManager = new WeakMap(), _KulCanvas_resizeObserver = new WeakMap(), _KulCanvas_resizeTimeout = new WeakMap(), _KulCanvas_handlePointerMove = new WeakMap(), _KulCanvas_handlePointerOut = new WeakMap(), _KulCanvas_handlePointerUp = new WeakMap(), _KulCanvas_instances = new WeakSet(), _KulCanvas_isCursorPreview = function _KulCanvas_isCursorPreview() {
    return this.kulCursor === "preview";
}, _KulCanvas_normalizeCoordinate = function _KulCanvas_normalizeCoordinate(event, rect) {
    let x = (event.clientX - rect.left) / rect.width;
    let y = (event.clientY - rect.top) / rect.height;
    x = Math.max(0, Math.min(1, x));
    y = Math.max(0, Math.min(1, y));
    return { x, y };
}, _KulCanvas_getCanvasCoordinate = function _KulCanvas_getCanvasCoordinate(event, rect) {
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    x = Math.max(0, Math.min(rect.width, x));
    y = Math.max(0, Math.min(rect.height, y));
    return { x, y };
}, _KulCanvas_setupContext = function _KulCanvas_setupContext(ctx, isFill = false) {
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.globalAlpha = this.kulOpacity;
    if (isFill) {
        ctx.fillStyle = this.kulColor;
    }
    else {
        ctx.strokeStyle = this.kulColor;
        ctx.lineWidth = this.kulSize;
    }
}, _KulCanvas_handlePointerDown = function _KulCanvas_handlePointerDown(e) {
    e.preventDefault();
    this.isPainting = true;
    this.points = [];
    __classPrivateFieldGet$1(this, _KulCanvas_instances, "m", _KulCanvas_addPoint).call(this, e);
    __classPrivateFieldGet$1(this, _KulCanvas_board, "f").setPointerCapture(e.pointerId);
    __classPrivateFieldGet$1(this, _KulCanvas_board, "f").addEventListener("pointermove", __classPrivateFieldGet$1(this, _KulCanvas_handlePointerMove, "f"));
    __classPrivateFieldGet$1(this, _KulCanvas_board, "f").addEventListener("pointerup", __classPrivateFieldGet$1(this, _KulCanvas_handlePointerUp, "f"));
}, _KulCanvas_addPoint = function _KulCanvas_addPoint(e) {
    const rect = __classPrivateFieldGet$1(this, _KulCanvas_board, "f").getBoundingClientRect();
    const { x, y } = __classPrivateFieldGet$1(this, _KulCanvas_instances, "m", _KulCanvas_normalizeCoordinate).call(this, e, rect);
    this.points.push({ x, y });
}, _KulCanvas_endCapture = function _KulCanvas_endCapture(e) {
    e.preventDefault();
    this.isPainting = false;
    __classPrivateFieldGet$1(this, _KulCanvas_board, "f").releasePointerCapture(e.pointerId);
    __classPrivateFieldGet$1(this, _KulCanvas_board, "f").removeEventListener("pointermove", __classPrivateFieldGet$1(this, _KulCanvas_handlePointerMove, "f"));
    __classPrivateFieldGet$1(this, _KulCanvas_board, "f").removeEventListener("pointerup", __classPrivateFieldGet$1(this, _KulCanvas_handlePointerUp, "f"));
}, _KulCanvas_drawBrushCursor = function _KulCanvas_drawBrushCursor(event) {
    __classPrivateFieldGet$1(this, _KulCanvas_cursorCtx, "f").clearRect(0, 0, __classPrivateFieldGet$1(this, _KulCanvas_cursor, "f").width, __classPrivateFieldGet$1(this, _KulCanvas_cursor, "f").height);
    const rect = __classPrivateFieldGet$1(this, _KulCanvas_board, "f").getBoundingClientRect();
    const { x, y } = __classPrivateFieldGet$1(this, _KulCanvas_instances, "m", _KulCanvas_getCanvasCoordinate).call(this, event, rect);
    __classPrivateFieldGet$1(this, _KulCanvas_instances, "m", _KulCanvas_setupContext).call(this, __classPrivateFieldGet$1(this, _KulCanvas_cursorCtx, "f"), true);
    __classPrivateFieldGet$1(this, _KulCanvas_instances, "m", _KulCanvas_drawBrushShape).call(this, __classPrivateFieldGet$1(this, _KulCanvas_cursorCtx, "f"), x, y, true);
}, _KulCanvas_drawBrushShape = function _KulCanvas_drawBrushShape(ctx, x, y, isFill = true) {
    ctx.beginPath();
    switch (this.kulBrush) {
        case "round":
            ctx.arc(x, y, this.kulSize / 2, 0, Math.PI * 2);
            break;
        case "square":
            const halfSize = this.kulSize / 2;
            ctx.rect(x - halfSize, y - halfSize, this.kulSize, this.kulSize);
            break;
    }
    if (isFill) {
        ctx.fill();
    }
    else {
        ctx.stroke();
    }
}, _KulCanvas_drawLastSegment = function _KulCanvas_drawLastSegment() {
    const len = this.points.length;
    if (len < 2) {
        return;
    }
    const lastPoint = this.points[len - 1];
    const secondLastPoint = this.points[len - 2];
    const x1 = secondLastPoint.x * __classPrivateFieldGet$1(this, _KulCanvas_board, "f").width;
    const y1 = secondLastPoint.y * __classPrivateFieldGet$1(this, _KulCanvas_board, "f").height;
    const x2 = lastPoint.x * __classPrivateFieldGet$1(this, _KulCanvas_board, "f").width;
    const y2 = lastPoint.y * __classPrivateFieldGet$1(this, _KulCanvas_board, "f").height;
    __classPrivateFieldGet$1(this, _KulCanvas_instances, "m", _KulCanvas_setupContext).call(this, __classPrivateFieldGet$1(this, _KulCanvas_boardCtx, "f"), false);
    if (this.kulBrush === "round") {
        __classPrivateFieldGet$1(this, _KulCanvas_boardCtx, "f").beginPath();
        __classPrivateFieldGet$1(this, _KulCanvas_boardCtx, "f").moveTo(x1, y1);
        __classPrivateFieldGet$1(this, _KulCanvas_boardCtx, "f").lineTo(x2, y2);
        __classPrivateFieldGet$1(this, _KulCanvas_boardCtx, "f").stroke();
    }
    else if (this.kulBrush === "square") {
        __classPrivateFieldGet$1(this, _KulCanvas_instances, "m", _KulCanvas_drawBrushShape).call(this, __classPrivateFieldGet$1(this, _KulCanvas_boardCtx, "f"), x2, y2, false);
    }
};
KulCanvas.style = KulCanvasStyle0;

const STYLING = "floating";
const MASONRY_ICON = "view_quilt";
const HORIZONTAL_ICON = "view_column";
const MINUS_ICON = "remove";
const PLUS_ICON = "plus";
const VERTICAL_ICON = "view_day";
const buttonHandler = (adapter, e) => {
    const { eventType, id } = e.detail;
    switch (eventType) {
        case "click":
            switch (id) {
                case MASONRY_ICON:
                    adapter.actions.changeView();
                    break;
                case MINUS_ICON:
                    adapter.actions.removeColumn();
                    break;
                case PLUS_ICON:
                    adapter.actions.addColumn();
                    break;
            }
            break;
    }
};
const ACTIONS = {
    masonry: {
        add: (adapter) => {
            return (h("kul-button", { class: "grid__add-column kul-slim", id: PLUS_ICON, key: PLUS_ICON, kulIcon: PLUS_ICON, kulStyling: STYLING, "onKul-button-event": buttonHandler.bind(buttonHandler, adapter), ref: (el) => {
                    if (el) {
                        adapter.components.buttons.addColumn = el;
                    }
                }, title: "Click to add a column to the masonry." }));
        },
        remove: (adapter) => {
            return (h("kul-button", { class: "grid__remove-column kul-slim", id: MINUS_ICON, key: MINUS_ICON, kulIcon: MINUS_ICON, kulStyling: STYLING, "onKul-button-event": buttonHandler.bind(buttonHandler, adapter), ref: (el) => {
                    if (el) {
                        adapter.components.buttons.removeColumn = el;
                    }
                }, title: "Click to remove a column from the masonry." }));
        },
    },
    changeView: (adapter) => {
        return (h("kul-button", { class: "grid__change-view", id: MASONRY_ICON, key: MASONRY_ICON, kulIcon: adapter.isMasonry()
                ? VERTICAL_ICON
                : adapter.isVertical()
                    ? HORIZONTAL_ICON
                    : MASONRY_ICON, kulStyling: STYLING, "onKul-button-event": buttonHandler.bind(buttonHandler, adapter), ref: (el) => {
                if (el) {
                    adapter.components.buttons.changeView = el;
                }
            }, title: adapter.isMasonry()
                ? "Click to view the images arranged vertically."
                : adapter.isVertical()
                    ? "Click to view the images arranged horizontally."
                    : "Click to view the images arranged in a masonry." }));
    },
};

//#endregion
//#region Props
var KulMasonryProps;
(function (KulMasonryProps) {
    KulMasonryProps["kulColumns"] = "Number of columns of the masonry.";
    KulMasonryProps["kulData"] = "Actual data to masonry.";
    KulMasonryProps["kulSelectable"] = "Allows for the selection of elements.";
    KulMasonryProps["kulShape"] = "Sets the type of shapes to compare.";
    KulMasonryProps["kulStyle"] = "Sets a custom CSS style for the component.";
    KulMasonryProps["kulView"] = "Sets the type of view, either the actual masonry or a sequential view.";
})(KulMasonryProps || (KulMasonryProps = {}));
//#endregion

const kulMasonryCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}@keyframes fade-in-grid{0%{display:none}1%{display:grid;opacity:0}100%{display:grid;opacity:1}}:host{--kul_masonry_button_bottom:var(--kul-masonry-button-bottom, 16px);--kul_masonry_button_right:var(--kul-masonry-button-right, 16px);--kul_masonry_column_size:var(--kul-masonry-column-size, minmax(0px, 1fr));--kul_masonry_grid_items_alignment:var(\n    --kul-masonry-grid-items-alignment,\n    start\n  );--kul_masonry_grid_gap:var(--kul-masonry-grid-gap, 8px);--kul_masonry_padding:var(--kul-masonry-padding, 12px);--kul_masonry_selected_border:var(\n    --kul-masonry-selected-border,\n    var(--kul-primary-color)\n  );--kul_masonry_transition_duration:var(\n    --kul-masonry-transition-duration,\n    0.3s\n  );--kul_masonry_transition_timing_function:var(\n    --kul-masonry-transition-timing-function,\n    ease\n  );--kul_masonry_grid_gap_actions:var(--kul-masonry-grid-gap-actions, 8px);--kul_masonry_grid_gap_actions_sub:var(\n    --kul-masonry-grid-gap-actions-sub,\n    4px\n  );--kul_masonry_selected_border_radius:var(\n    --kul-masonry-selected-border-radius,\n    5px\n  );--kul_masonry_selected_outline_offset:var(\n    --kul-masonry-selected-outline-offset,\n    4px\n  );--kul_masonry_selected_outline_width:var(\n    --kul-masonry-selected-outline-width,\n    2px\n  );--kul_masonry_selected_transform_scale:var(\n    --kul-masonry-selected-transform-scale,\n    1.05\n  );--kul_masonry_hover_brightness:var(--kul-masonry-hover-brightness, 125%);--kul_masonry_selected_after_border_width:var(\n    --kul-masonry-selected-after-border-width,\n    4px\n  );--kul_masonry_selected_after_border_radius:var(\n    --kul-masonry-selected-after-border-radius,\n    8px\n  );--kul_masonry_selected_after_offset:var(\n    --kul-masonry-selected-after-offset,\n    -4px\n  );--kul_masonry_selected_box_shadow_offset_y:var(\n    --kul-masonry-selected-box-shadow-offset-y,\n    4px\n  );--kul_masonry_selected_box_shadow_blur:var(\n    --kul-masonry-selected-box-shadow-blur,\n    10px\n  );--kul_masonry_selected_z_index:var(--kul-masonry-selected-z-index, 1);--kul_masonry_actions_z_index:var(--kul-masonry-actions-z-index, 2);display:block;height:100%;width:100%}:host([kul-selectable]) kul-image{cursor:pointer;overflow:hidden;transition:filter var(--kul_masonry_transition_duration) var(--kul_masonry_transition_timing_function)}:host([kul-selectable]) kul-image:hover{filter:brightness(var(--kul_masonry_hover_brightness))}#kul-component{height:100%;width:100%}.masonry{box-sizing:border-box;display:flex;flex-direction:column;gap:var(--kul_masonry_grid_gap);height:100%;padding:var(--kul_masonry_padding);width:100%}.masonry:not(:hover) .grid__actions{display:none}.grid{align-items:var(--kul_masonry_grid_items_alignment);column-gap:var(--kul_masonry_grid_gap);display:grid}.grid--horizontal{grid-template-rows:1fr}.grid--horizontal .grid__column{flex-direction:row}.grid--masonry{grid-template-columns:repeat(var(--kul_masonry_columns), var(--kul_masonry_column_size))}.grid--masonry .grid__column{flex-direction:column}.grid--vertical{grid-template-columns:1fr}.grid--vertical .grid__column{flex-direction:column}.grid__column{display:flex;flex:1;gap:var(--kul_masonry_grid_gap);width:100%}.grid__actions{animation:fade-in-grid 125ms ease-in;bottom:var(--kul_masonry_button_bottom);display:grid;grid-auto-flow:row;grid-gap:var(--kul_masonry_grid_gap_actions);justify-items:center;position:absolute;right:var(--kul_masonry_button_right);z-index:var(--kul_masonry_actions_z_index)}.grid__actions__sub{display:grid;grid-gap:var(--kul_masonry_grid_gap_actions_sub)}[data-selected=true]{border-radius:var(--kul_masonry_selected_border_radius);box-shadow:0 var(--kul_masonry_selected_box_shadow_offset_y) var(--kul_masonry_selected_box_shadow_blur) var(--kul_masonry_selected_border);outline:var(--kul_masonry_selected_outline_width) solid var(--kul_masonry_selected_border);outline-offset:var(--kul_masonry_selected_outline_offset);position:relative;transform:scale(var(--kul_masonry_selected_transform_scale));transition:transform var(--kul_masonry_transition_duration) var(--kul_masonry_transition_timing_function), box-shadow var(--kul_masonry_transition_duration) var(--kul_masonry_transition_timing_function), outline-offset var(--kul_masonry_transition_duration) var(--kul_masonry_transition_timing_function);z-index:var(--kul_masonry_selected_z_index)}[data-selected=true]:after{border:var(--kul_masonry_selected_after_border_width) solid var(--kul_masonry_selected_border);border-radius:var(--kul_masonry_selected_after_border_radius);bottom:var(--kul_masonry_selected_after_offset);content:\"\";left:var(--kul_masonry_selected_after_offset);pointer-events:none;position:absolute;right:var(--kul_masonry_selected_after_offset);top:var(--kul_masonry_selected_after_offset)}";
const KulMasonryStyle0 = kulMasonryCss;

var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f)
        throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
        throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _KulMasonry_instances, _KulMasonry_kulManager, _KulMasonry_adapter, _KulMasonry_divideShapesIntoColumns, _KulMasonry_hasShapes, _KulMasonry_isVertical, _KulMasonry_isMasonry, _KulMasonry_prepChangeView, _KulMasonry_prepView, _KulMasonry_prepMasonry;
const KulMasonry = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-masonry-event", 6);
        _KulMasonry_instances.add(this);
        /*-------------------------------------------------*/
        /*       I n t e r n a l   V a r i a b l e s       */
        /*-------------------------------------------------*/
        _KulMasonry_kulManager.set(this, kulManagerInstance());
        /*-------------------------------------------------*/
        /*           P r i v a t e   M e t h o d s         */
        /*-------------------------------------------------*/
        _KulMasonry_adapter.set(this, {
            actions: {
                addColumn: async () => {
                    this.kulColumns++;
                },
                removeColumn: async () => {
                    if (this.kulColumns > 2) {
                        this.kulColumns--;
                    }
                },
                changeView: async () => {
                    if (__classPrivateFieldGet(this, _KulMasonry_instances, "m", _KulMasonry_isMasonry).call(this)) {
                        this.kulView = "vertical";
                    }
                    else if (__classPrivateFieldGet(this, _KulMasonry_instances, "m", _KulMasonry_isVertical).call(this)) {
                        this.kulView = "horizontal";
                    }
                    else {
                        this.kulView = "masonry";
                    }
                },
            },
            components: {
                buttons: {
                    addColumn: null,
                    removeColumn: null,
                    changeView: null,
                },
            },
            isMasonry: () => __classPrivateFieldGet(this, _KulMasonry_instances, "m", _KulMasonry_isMasonry).call(this),
            isVertical: () => __classPrivateFieldGet(this, _KulMasonry_instances, "m", _KulMasonry_isVertical).call(this),
            get: { masonry: () => this, shapes: () => this.shapes },
        });
        this.debugInfo = {
            endTime: 0,
            renderCount: 0,
            renderEnd: 0,
            renderStart: 0,
            startTime: performance.now(),
        };
        this.selectedShape = {};
        this.shapes = {};
        this.kulColumns = 3;
        this.kulData = null;
        this.kulSelectable = false;
        this.kulShape = "image";
        this.kulStyle = "";
        this.kulView = "masonry";
    }
    onKulEvent(e, eventType) {
        let shouldUpdateState = false;
        const state = {};
        switch (eventType) {
            case "kul-event":
                const { eventType } = e.detail;
                switch (eventType) {
                    case "click":
                        if (this.kulSelectable) {
                            const { comp } = e
                                .detail;
                            const index = parseInt(comp.rootElement.dataset.index);
                            if (this.selectedShape.index !== index) {
                                state.index = index;
                                state.shape = this.shapes[this.kulShape][index];
                            }
                            shouldUpdateState = true;
                        }
                        break;
                }
                break;
        }
        if (shouldUpdateState) {
            this.selectedShape = state;
        }
        this.kulEvent.emit({
            comp: this,
            eventType,
            id: this.rootElement.id,
            originalEvent: e,
            selectedShape: this.selectedShape,
        });
    }
    /*-------------------------------------------------*/
    /*                 W a t c h e r s                 */
    /*-------------------------------------------------*/
    async updateShapes() {
        try {
            this.shapes = __classPrivateFieldGet(this, _KulMasonry_kulManager, "f").data.cell.shapes.getAll(this.kulData);
        }
        catch (error) {
            __classPrivateFieldGet(this, _KulMasonry_kulManager, "f").debug.logs.new(this, "Error updating shapes: " + error, "error");
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
     * Used to retrieve component's properties and descriptions.
     * @param {boolean} descriptions - When true, includes descriptions for each property.
     * @returns {Promise<GenericObject>} Promise resolved with an object containing the component's properties.
     */
    async getProps(descriptions) {
        return getProps(this, KulMasonryProps, descriptions);
    }
    /**
     * Returns the selected shape.
     * @returns {Promise<KulMasonrySelectedShape>} Selected shape.
     */
    async getSelectedShape() {
        return this.selectedShape;
    }
    /**
     * Redecorates the shapes, updating potential new values.
     */
    async redecorateShapes() {
        this.updateShapes();
    }
    /**
     * This method is used to trigger a new render of the component.
     */
    async refresh() {
        forceUpdate(this);
    }
    /**
     * Sets the selected shape by index.
     */
    async setSelectedShape(index) {
        const shape = this.shapes?.[this.kulShape]?.[index];
        if (shape) {
            const newState = {
                index,
                shape,
            };
            this.selectedShape = newState;
        }
        else {
            this.selectedShape = {};
            __classPrivateFieldGet(this, _KulMasonry_kulManager, "f").debug.logs.new(this, `Couldn't set shape with index: ${index}`);
        }
        this.updateShapes();
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
        __classPrivateFieldGet(this, _KulMasonry_kulManager, "f").theme.register(this);
        this.updateShapes();
    }
    componentDidLoad() {
        this.onKulEvent(new CustomEvent("ready"), "ready");
        __classPrivateFieldGet(this, _KulMasonry_kulManager, "f").debug.updateDebugInfo(this, "did-load");
    }
    componentWillRender() {
        __classPrivateFieldGet(this, _KulMasonry_kulManager, "f").debug.updateDebugInfo(this, "will-render");
    }
    componentDidRender() {
        __classPrivateFieldGet(this, _KulMasonry_kulManager, "f").debug.updateDebugInfo(this, "did-render");
    }
    render() {
        const style = {
            ["--kul_masonry_columns"]: this.kulColumns?.toString() || "4",
        };
        return (h(Host, { key: 'af23197bf3f883074d96d36b28a117ea8349ee9a' }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, __classPrivateFieldGet(this, _KulMasonry_kulManager, "f").theme.setKulStyle(this))) : undefined, h("div", { key: 'f54c88e8ff2618fb02e14fbee9a68db4e00d8a3d', id: KUL_WRAPPER_ID, style: style }, h("div", { key: 'bc776abd07ae91f7fe1fb3bc86eaadf85dd38922', class: "masonry" }, __classPrivateFieldGet(this, _KulMasonry_instances, "m", _KulMasonry_prepMasonry).call(this)))));
    }
    disconnectedCallback() {
        __classPrivateFieldGet(this, _KulMasonry_kulManager, "f").theme.unregister(this);
    }
    get rootElement() { return getElement(this); }
    static get watchers() { return {
        "kulData": ["updateShapes"],
        "kulShape": ["updateShapes"]
    }; }
};
_KulMasonry_kulManager = new WeakMap(), _KulMasonry_adapter = new WeakMap(), _KulMasonry_instances = new WeakSet(), _KulMasonry_divideShapesIntoColumns = function _KulMasonry_divideShapesIntoColumns(columnCount) {
    const props = this.shapes[this.kulShape].map(() => ({
        htmlProps: {
            dataset: { selected: "" },
        },
    }));
    if (this.selectedShape.index !== undefined) {
        props[this.selectedShape.index] = {
            htmlProps: {
                dataset: { selected: "true" },
            },
        };
    }
    const columns = Array.from({ length: columnCount }, () => [], []);
    const decoratedShapes = __classPrivateFieldGet(this, _KulMasonry_kulManager, "f").data.cell.shapes.decorate(this.kulShape, this.shapes[this.kulShape], async (e) => this.onKulEvent(e, "kul-event"), props);
    decoratedShapes.element.forEach((element, index) => {
        element.$attrs$["data-index"] = index.toString();
        columns[index % columnCount].push(element);
    });
    return columns;
}, _KulMasonry_hasShapes = function _KulMasonry_hasShapes() {
    return !!this.shapes?.[this.kulShape];
}, _KulMasonry_isVertical = function _KulMasonry_isVertical() {
    return this.kulView === "vertical";
}, _KulMasonry_isMasonry = function _KulMasonry_isMasonry() {
    return this.kulView === "masonry";
}, _KulMasonry_prepChangeView = function _KulMasonry_prepChangeView() {
    return (h("div", { class: "grid__actions" }, __classPrivateFieldGet(this, _KulMasonry_instances, "m", _KulMasonry_isMasonry).call(this) ? (h("div", { class: "grid__actions__sub" }, ACTIONS.masonry.add(__classPrivateFieldGet(this, _KulMasonry_adapter, "f")), ACTIONS.masonry.remove(__classPrivateFieldGet(this, _KulMasonry_adapter, "f")))) : null, ACTIONS.changeView(__classPrivateFieldGet(this, _KulMasonry_adapter, "f"))));
}, _KulMasonry_prepView = function _KulMasonry_prepView() {
    const columnCount = __classPrivateFieldGet(this, _KulMasonry_instances, "m", _KulMasonry_isMasonry).call(this) ? this.kulColumns : 1;
    const columns = __classPrivateFieldGet(this, _KulMasonry_instances, "m", _KulMasonry_divideShapesIntoColumns).call(this, columnCount);
    return columns.map((column, colIndex) => (h("div", { key: colIndex, class: "grid__column" }, column.map((element) => (h(Fragment, null, element))))));
}, _KulMasonry_prepMasonry = function _KulMasonry_prepMasonry() {
    if (__classPrivateFieldGet(this, _KulMasonry_instances, "m", _KulMasonry_hasShapes).call(this)) {
        const shapes = this.shapes[this.kulShape];
        if (shapes?.length) {
            return (h(Fragment, null, h("div", { class: `grid grid--${this.kulView}` }, __classPrivateFieldGet(this, _KulMasonry_instances, "m", _KulMasonry_prepView).call(this)), __classPrivateFieldGet(this, _KulMasonry_instances, "m", _KulMasonry_prepChangeView).call(this)));
        }
    }
};
KulMasonry.style = KulMasonryStyle0;

export { KulCanvas as kul_canvas, KulMasonry as kul_masonry };

//# sourceMappingURL=kul-canvas_2.entry.js.map