import { r as registerInstance, d as createEvent, g as getElement, f as forceUpdate, h, H as Host, F as Fragment } from './index-53f95fee.js';
import { k as kulManagerInstance, K as KUL_WRAPPER_ID, b as KUL_STYLE_ID } from './kul-manager-9e1be956.js';
import { g as getProps } from './componentUtils-a994b230.js';

//#endregion
//#region Props
var KulCanvasProps;
(function (KulCanvasProps) {
    KulCanvasProps["kulBrush"] = "The shape of the brush.";
    KulCanvasProps["kulColor"] = "The color of the brush.";
    KulCanvasProps["kulImageProps"] = "The props of the image displayed inside the badge.";
    KulCanvasProps["kulOpacity"] = "The opacity of the brush.";
    KulCanvasProps["kulPreview"] = "Displays the brush track of the current stroke.";
    KulCanvasProps["kulSize"] = "The size of the brush.";
    KulCanvasProps["kulStrokeTolerance"] = "Simplifies the coordinates array by applying the Ramer-Douglas-Peucker algorithm. This prop sets the tolerance of the algorithm (null to disable)";
    KulCanvasProps["kulStyle"] = "Custom style of the component.";
})(KulCanvasProps || (KulCanvasProps = {}));
//#endregion

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

const kulCanvasCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}@keyframes fade-in-grid{0%{display:none}1%{display:grid;opacity:0}100%{display:grid;opacity:1}}:host{display:block;height:100%;position:relative;width:100%}#kul-component{height:100%;width:100%}.canvas{cursor:none;height:100%;margin:auto;max-width:100%;position:relative;width:max-content}.canvas__image{pointer-events:none}.canvas__board,.canvas__cursor{position:absolute;top:0;left:0;width:100%;height:100%}.canvas__cursor{pointer-events:none}";
const KulCanvasStyle0 = kulCanvasCss;

const KulCanvas = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-canvas-event", 6);
        this.debugInfo = {
            endTime: 0,
            renderCount: 0,
            renderEnd: 0,
            renderStart: 0,
            startTime: performance.now(),
        };
        this.isPainting = false;
        this.points = [];
        this.kulBrush = 'round';
        this.kulColor = '#ff0000';
        this.kulImageProps = null;
        this.kulOpacity = 1.0;
        this.kulPreview = true;
        this.kulStrokeTolerance = null;
        this.kulSize = 10;
        this.kulStyle = '';
    }
    get rootElement() { return getElement(this); }
    //#endregion
    //#region Internal variables
    #board;
    #boardCtx;
    #container;
    #cursor;
    #cursorCtx;
    #image;
    #kulManager = kulManagerInstance();
    #resizeObserver;
    #resizeTimeout;
    //#endregion
    //#region Events
    kulEvent;
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
     * Returns the painting canvas .
     * @returns {Promise<HTMLCanvasElement>} The painting canvas.
     */
    async getCanvas() {
        return this.#board;
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
        return this.#image;
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
     * Sets the height of the canvas.
     */
    async setCanvasHeight(value) {
        if (value !== undefined) {
            this.#board.height = value;
            this.#cursor.height = value;
        }
        else {
            const h = this.#container.clientHeight;
            this.#board.height = h;
            this.#cursor.height = h;
        }
    }
    /**
     * Sets the width of the canvas.
     */
    async setCanvasWidth(value) {
        if (value !== undefined) {
            this.#board.width = value;
            this.#cursor.width = value;
        }
        else {
            const w = this.#container.clientWidth;
            this.#board.width = w;
            this.#cursor.width = w;
        }
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
    //#endregion
    //#region Private methods
    #normalizeCoordinate(event, rect) {
        let x = (event.clientX - rect.left) / rect.width;
        let y = (event.clientY - rect.top) / rect.height;
        x = Math.max(0, Math.min(1, x));
        y = Math.max(0, Math.min(1, y));
        return { x, y };
    }
    #getCanvasCoordinate(event, rect) {
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        x = Math.max(0, Math.min(rect.width, x));
        y = Math.max(0, Math.min(rect.height, y));
        return { x, y };
    }
    #setupContext(ctx, isFill = false) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.globalAlpha = this.kulOpacity;
        if (isFill) {
            ctx.fillStyle = this.kulColor;
        }
        else {
            ctx.strokeStyle = this.kulColor;
            ctx.lineWidth = this.kulSize;
        }
    }
    #handlePointerDown(e) {
        e.preventDefault();
        this.isPainting = true;
        this.points = [];
        this.#addPoint(e);
        this.#board.setPointerCapture(e.pointerId);
        this.#board.addEventListener('pointermove', this.#handlePointerMove);
        this.#board.addEventListener('pointerup', this.#handlePointerUp);
    }
    #handlePointerMove = (e) => {
        e.preventDefault();
        this.#drawBrushCursor(e);
        if (!this.isPainting) {
            return;
        }
        this.#addPoint(e);
        this.#drawLastSegment();
    };
    #handlePointerOut = (e) => {
        this.#endCapture(e);
    };
    #handlePointerUp = (e) => {
        this.#endCapture(e);
    };
    #addPoint(e) {
        const rect = this.#board.getBoundingClientRect();
        const { x, y } = this.#normalizeCoordinate(e, rect);
        this.points.push({ x, y });
    }
    #endCapture(e) {
        e.preventDefault();
        this.isPainting = false;
        this.#boardCtx.clearRect(0, 0, this.#board.width, this.#board.height);
        this.#board.releasePointerCapture(e.pointerId);
        this.#board.removeEventListener('pointermove', this.#handlePointerMove);
        this.#board.removeEventListener('pointerup', this.#handlePointerUp);
    }
    #drawBrushCursor(event) {
        this.#cursorCtx.clearRect(0, 0, this.#cursor.width, this.#cursor.height);
        const rect = this.#board.getBoundingClientRect();
        const { x, y } = this.#getCanvasCoordinate(event, rect);
        this.#setupContext(this.#cursorCtx, true);
        this.#drawBrushShape(this.#cursorCtx, x, y, true);
    }
    #drawBrushShape(ctx, x, y, isFill = true) {
        ctx.beginPath();
        switch (this.kulBrush) {
            case 'round':
                ctx.arc(x, y, this.kulSize / 2, 0, Math.PI * 2);
                break;
            case 'square':
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
    }
    #drawLastSegment() {
        const len = this.points.length;
        if (len < 2) {
            return;
        }
        const lastPoint = this.points[len - 1];
        const secondLastPoint = this.points[len - 2];
        const x1 = secondLastPoint.x * this.#board.width;
        const y1 = secondLastPoint.y * this.#board.height;
        const x2 = lastPoint.x * this.#board.width;
        const y2 = lastPoint.y * this.#board.height;
        this.#setupContext(this.#boardCtx, false);
        if (this.kulBrush === 'round') {
            this.#boardCtx.beginPath();
            this.#boardCtx.moveTo(x1, y1);
            this.#boardCtx.lineTo(x2, y2);
            this.#boardCtx.stroke();
        }
        else if (this.kulBrush === 'square') {
            this.#drawBrushShape(this.#boardCtx, x2, y2, false);
        }
    }
    //#endregion
    //#region Lifecycle hooks
    componentWillLoad() {
        this.#kulManager.theme.register(this);
    }
    componentDidLoad() {
        this.#boardCtx = this.#board.getContext('2d');
        this.#cursorCtx = this.#cursor.getContext('2d');
        this.setCanvasHeight();
        this.setCanvasWidth();
        this.#resizeObserver = new ResizeObserver(() => {
            clearTimeout(this.#resizeTimeout);
            this.#resizeTimeout = setTimeout(() => {
                this.setCanvasHeight();
                this.setCanvasWidth();
            }, 100);
        });
        this.#resizeObserver.observe(this.#container);
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
        return (h(Host, { key: '84ce4ccc0b2ea4d7b0398874bd5561ae7a0aced7' }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))) : undefined, h("div", { key: 'e774d36b96482327e6a187ea893df2470db9aacf', id: KUL_WRAPPER_ID }, h("div", { key: '1bf4b53f746e0bb443b04bfa1958593a30d94f1e', class: "canvas", ref: (el) => {
                if (el) {
                    this.#container = el;
                }
            } }, h("kul-image", { key: '4adc27a0164e4983ff5a67592ea6c48967656d3c', class: "canvas__image kul-fit", ...this.kulImageProps, ref: (el) => {
                if (el) {
                    this.#image = el;
                }
            } }), h("canvas", { key: '67113d04ac26ff2b47970fff2f6dc9301abf52bc', class: "canvas__board", onPointerDown: (e) => this.#handlePointerDown(e), onPointerMove: (e) => this.#handlePointerMove(e), onPointerUp: (e) => this.onKulEvent(e, 'stroke'), onPointerOut: (e) => this.#handlePointerOut(e), ref: (el) => {
                if (el) {
                    this.#board = el;
                }
            } }), h("canvas", { key: 'e715251adbe0590f010fbdce2b11550f823ab05e', class: "canvas__cursor", ref: (el) => {
                if (el) {
                    this.#cursor = el;
                }
            } })))));
    }
    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
        if (this.#resizeObserver) {
            this.#resizeObserver.disconnect();
        }
    }
};
KulCanvas.style = KulCanvasStyle0;

/*-------------------------------------------------*/
/*                    P r o p s                    */
/*-------------------------------------------------*/
var KulMasonryProps;
(function (KulMasonryProps) {
    KulMasonryProps["kulColumns"] = "Number of columns of the masonry.";
    KulMasonryProps["kulData"] = "Actual data to masonry.";
    KulMasonryProps["kulSelectable"] = "Allows for the selection of elements.";
    KulMasonryProps["kulShape"] = "Sets the type of shapes to compare.";
    KulMasonryProps["kulStyle"] = "Sets a custom CSS style for the component.";
    KulMasonryProps["kulView"] = "Sets the type of view, either the actual masonry or a sequential view.";
})(KulMasonryProps || (KulMasonryProps = {}));

const STYLING = 'floating';
const MASONRY_ICON = 'view_quilt';
const HORIZONTAL_ICON = 'view_column';
const MINUS_ICON = 'remove';
const PLUS_ICON = 'plus';
const VERTICAL_ICON = 'view_day';
const buttonHandler = (adapter, e) => {
    const { eventType, id } = e.detail;
    switch (eventType) {
        case 'click':
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
            return (h("kul-button", { class: 'grid__add-column kul-slim', id: PLUS_ICON, key: PLUS_ICON, kulIcon: PLUS_ICON, kulStyling: STYLING, "onKul-button-event": buttonHandler.bind(buttonHandler, adapter), ref: (el) => {
                    if (el) {
                        adapter.components.buttons.addColumn = el;
                    }
                }, title: "Click to add a column to the masonry." }));
        },
        remove: (adapter) => {
            return (h("kul-button", { class: 'grid__remove-column kul-slim', id: MINUS_ICON, key: MINUS_ICON, kulIcon: MINUS_ICON, kulStyling: STYLING, "onKul-button-event": buttonHandler.bind(buttonHandler, adapter), ref: (el) => {
                    if (el) {
                        adapter.components.buttons.removeColumn = el;
                    }
                }, title: "Click to remove a column from the masonry." }));
        },
    },
    changeView: (adapter) => {
        return (h("kul-button", { class: 'grid__change-view', id: MASONRY_ICON, key: MASONRY_ICON, kulIcon: adapter.isMasonry()
                ? VERTICAL_ICON
                : adapter.isVertical()
                    ? HORIZONTAL_ICON
                    : MASONRY_ICON, kulStyling: STYLING, "onKul-button-event": buttonHandler.bind(buttonHandler, adapter), ref: (el) => {
                if (el) {
                    adapter.components.buttons.changeView = el;
                }
            }, title: adapter.isMasonry()
                ? 'Click to view the images arranged vertically.'
                : adapter.isVertical()
                    ? 'Click to view the images arranged horizontally.'
                    : 'Click to view the images arranged in a masonry.' }));
    },
};

const kulMasonryCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}@keyframes fade-in-block{0%{display:none}1%{display:block;opacity:0}100%{display:block;opacity:1}}@keyframes fade-in-flex{0%{display:none}1%{display:flex;opacity:0}100%{display:flex;opacity:1}}@keyframes fade-in-grid{0%{display:none}1%{display:grid;opacity:0}100%{display:grid;opacity:1}}:host{--kul_masonry_button_bottom:var(--kul-masonry-button-bottom, 16px);--kul_masonry_button_right:var(--kul-masonry-button-right, 16px);--kul_masonry_column_size:var(--kul-masonry-column-size, minmax(0px, 1fr));--kul_masonry_grid_items_alignment:var(\n    --kul-masonry-grid-items-alignment,\n    start\n  );--kul_masonry_grid_gap:var(--kul-masonry-grid-gap, 8px);--kul_masonry_padding:var(--kul-masonry-padding, 12px);--kul_masonry_selected_border:var(\n    --kul-masonry-selected-border,\n    var(--kul-primary-color)\n  );--kul_masonry_transition_duration:var(\n    --kul-masonry-transition-duration,\n    0.3s\n  );--kul_masonry_transition_timing_function:var(\n    --kul-masonry-transition-timing-function,\n    ease\n  );--kul_masonry_grid_gap_actions:var(--kul-masonry-grid-gap-actions, 8px);--kul_masonry_grid_gap_actions_sub:var(\n    --kul-masonry-grid-gap-actions-sub,\n    4px\n  );--kul_masonry_selected_border_radius:var(\n    --kul-masonry-selected-border-radius,\n    5px\n  );--kul_masonry_selected_outline_offset:var(\n    --kul-masonry-selected-outline-offset,\n    4px\n  );--kul_masonry_selected_outline_width:var(\n    --kul-masonry-selected-outline-width,\n    2px\n  );--kul_masonry_selected_transform_scale:var(\n    --kul-masonry-selected-transform-scale,\n    1.05\n  );--kul_masonry_hover_brightness:var(--kul-masonry-hover-brightness, 125%);--kul_masonry_selected_after_border_width:var(\n    --kul-masonry-selected-after-border-width,\n    4px\n  );--kul_masonry_selected_after_border_radius:var(\n    --kul-masonry-selected-after-border-radius,\n    8px\n  );--kul_masonry_selected_after_offset:var(\n    --kul-masonry-selected-after-offset,\n    -4px\n  );--kul_masonry_selected_box_shadow_offset_y:var(\n    --kul-masonry-selected-box-shadow-offset-y,\n    4px\n  );--kul_masonry_selected_box_shadow_blur:var(\n    --kul-masonry-selected-box-shadow-blur,\n    10px\n  );--kul_masonry_selected_z_index:var(--kul-masonry-selected-z-index, 1);--kul_masonry_actions_z_index:var(--kul-masonry-actions-z-index, 2);display:block;height:100%;width:100%}:host([kul-selectable]) kul-image{cursor:pointer;overflow:hidden;transition:filter var(--kul_masonry_transition_duration) var(--kul_masonry_transition_timing_function)}:host([kul-selectable]) kul-image:hover{filter:brightness(var(--kul_masonry_hover_brightness))}#kul-component{height:100%;width:100%}.masonry{box-sizing:border-box;display:flex;flex-direction:column;gap:var(--kul_masonry_grid_gap);height:100%;padding:var(--kul_masonry_padding);width:100%}.masonry:not(:hover) .grid__actions{display:none}.grid{align-items:var(--kul_masonry_grid_items_alignment);column-gap:var(--kul_masonry_grid_gap);display:grid}.grid--horizontal{grid-template-rows:1fr}.grid--horizontal .grid__column{flex-direction:row}.grid--masonry{grid-template-columns:repeat(var(--kul_masonry_columns), var(--kul_masonry_column_size))}.grid--masonry .grid__column{flex-direction:column}.grid--vertical{grid-template-columns:1fr}.grid--vertical .grid__column{flex-direction:column}.grid__column{display:flex;flex:1;gap:var(--kul_masonry_grid_gap);width:100%}.grid__actions{animation:fade-in-grid 125ms ease-in;bottom:var(--kul_masonry_button_bottom);display:grid;grid-auto-flow:row;grid-gap:var(--kul_masonry_grid_gap_actions);justify-items:center;position:absolute;right:var(--kul_masonry_button_right);z-index:var(--kul_masonry_actions_z_index)}.grid__actions__sub{display:grid;grid-gap:var(--kul_masonry_grid_gap_actions_sub)}[data-selected=true]{border-radius:var(--kul_masonry_selected_border_radius);box-shadow:0 var(--kul_masonry_selected_box_shadow_offset_y) var(--kul_masonry_selected_box_shadow_blur) var(--kul_masonry_selected_border);outline:var(--kul_masonry_selected_outline_width) solid var(--kul_masonry_selected_border);outline-offset:var(--kul_masonry_selected_outline_offset);position:relative;transform:scale(var(--kul_masonry_selected_transform_scale));transition:transform var(--kul_masonry_transition_duration) var(--kul_masonry_transition_timing_function), box-shadow var(--kul_masonry_transition_duration) var(--kul_masonry_transition_timing_function), outline-offset var(--kul_masonry_transition_duration) var(--kul_masonry_transition_timing_function);z-index:var(--kul_masonry_selected_z_index)}[data-selected=true]:after{border:var(--kul_masonry_selected_after_border_width) solid var(--kul_masonry_selected_border);border-radius:var(--kul_masonry_selected_after_border_radius);bottom:var(--kul_masonry_selected_after_offset);content:\"\";left:var(--kul_masonry_selected_after_offset);pointer-events:none;position:absolute;right:var(--kul_masonry_selected_after_offset);top:var(--kul_masonry_selected_after_offset)}";
const KulMasonryStyle0 = kulMasonryCss;

const KulMasonry = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.kulEvent = createEvent(this, "kul-masonry-event", 6);
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
        this.kulShape = 'image';
        this.kulStyle = '';
        this.kulView = 'masonry';
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
        let shouldUpdateState = false;
        const state = {};
        switch (eventType) {
            case 'kul-event':
                const { eventType } = e.detail;
                switch (eventType) {
                    case 'click':
                        if (this.kulSelectable) {
                            const { comp } = e.detail;
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
            this.#kulManager.debug.logs.new(this, `Couldn't set shape with index: ${index}`);
        }
        this.updateShapes();
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
    /*           P r i v a t e   M e t h o d s         */
    /*-------------------------------------------------*/
    #adapter = {
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
                if (this.#isMasonry()) {
                    this.kulView = 'vertical';
                }
                else if (this.#isVertical()) {
                    this.kulView = 'horizontal';
                }
                else {
                    this.kulView = 'masonry';
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
        isMasonry: () => this.#isMasonry(),
        isVertical: () => this.#isVertical(),
        get: { masonry: () => this, shapes: () => this.shapes },
    };
    #divideShapesIntoColumns(columnCount) {
        const props = this.shapes[this.kulShape].map(() => ({
            htmlProps: {
                dataset: { selected: '' },
            },
        }));
        if (this.selectedShape.index !== undefined) {
            props[this.selectedShape.index] = {
                htmlProps: {
                    dataset: { selected: 'true' },
                },
            };
        }
        const columns = Array.from({ length: columnCount }, () => [], []);
        const decoratedShapes = this.#kulManager.data.cell.shapes.decorate(this.kulShape, this.shapes[this.kulShape], async (e) => this.onKulEvent(e, 'kul-event'), props);
        decoratedShapes.element.forEach((element, index) => {
            element.$attrs$['data-index'] = index.toString();
            columns[index % columnCount].push(element);
        });
        return columns;
    }
    #hasShapes() {
        return !!this.shapes?.[this.kulShape];
    }
    #isVertical() {
        return this.kulView === 'vertical';
    }
    #isMasonry() {
        return this.kulView === 'masonry';
    }
    #prepChangeView() {
        return (h("div", { class: "grid__actions" }, this.#isMasonry() ? (h("div", { class: "grid__actions__sub" }, ACTIONS.masonry.add(this.#adapter), ACTIONS.masonry.remove(this.#adapter))) : null, ACTIONS.changeView(this.#adapter)));
    }
    #prepView() {
        const columnCount = this.#isMasonry() ? this.kulColumns : 1;
        const columns = this.#divideShapesIntoColumns(columnCount);
        return columns.map((column, colIndex) => (h("div", { key: colIndex, class: "grid__column" }, column.map((element) => (h(Fragment, null, element))))));
    }
    #prepMasonry() {
        if (this.#hasShapes()) {
            const shapes = this.shapes[this.kulShape];
            if (shapes?.length) {
                return (h(Fragment, null, h("div", { class: `grid grid--${this.kulView}` }, this.#prepView()), this.#prepChangeView()));
            }
        }
    }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    componentWillLoad() {
        this.#kulManager.theme.register(this);
        this.updateShapes();
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
        const style = {
            ['--kul_masonry_columns']: this.kulColumns?.toString() || '4',
        };
        return (h(Host, { key: 'e3d00fd2c82626c21699b13bcad7f1293d6daa38' }, this.kulStyle ? (h("style", { id: KUL_STYLE_ID }, this.#kulManager.theme.setKulStyle(this))) : undefined, h("div", { key: '484b9a25f5a4ea162d4ebd7fb5677e0c60b88eaf', id: KUL_WRAPPER_ID, style: style }, h("div", { key: '65763b5e781a84a587b41abbbaefb5c1797a0301', class: "masonry" }, this.#prepMasonry()))));
    }
    disconnectedCallback() {
        this.#kulManager.theme.unregister(this);
    }
    static get watchers() { return {
        "kulData": ["updateShapes"],
        "kulShape": ["updateShapes"]
    }; }
};
KulMasonry.style = KulMasonryStyle0;

export { KulCanvas as kul_canvas, KulMasonry as kul_masonry };

//# sourceMappingURL=kul-canvas_2.entry.js.map