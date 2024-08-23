import { D as DOC_STYLES } from './kul-showcase-data-71c18a32.js';

const KUL_DOC = {
    "kul-accordion": {
        methods: [
            {
                name: "getDebugInfo",
                docs: "Fetches debug information of the component's current state.",
                returns: {
                    type: "Promise<KulDebugComponentInfo>",
                    docs: "A promise that resolves with the debug information object.",
                },
                signature: "() => Promise<KulDebugComponentInfo>",
            },
            {
                name: "getProps",
                docs: "Used to retrieve component's properties and descriptions.",
                returns: {
                    type: "Promise<GenericObject<unknown>>",
                    docs: "Promise resolved with an object containing the component's properties.",
                },
                signature: "(descriptions?: boolean) => Promise<GenericObject>",
            },
            {
                name: "refresh",
                docs: "This method is used to trigger a new render of the component.",
                returns: {
                    type: "Promise<void>",
                    docs: "",
                },
                signature: "() => Promise<void>",
            },
            {
                name: "toggleNode",
                docs: "This method activates or deactivates an node.",
                returns: {
                    type: "Promise<void>",
                    docs: "",
                },
                signature: "(id: string, e?: Event) => Promise<void>",
            },
        ],
        props: [
            {
                name: "kulData",
                docs: "Actual data of the accordion.",
                type: "KulDataDataset",
            },
            {
                name: "kulRipple",
                docs: "When set to true, the pointerdown event will trigger a ripple effect.",
                type: "boolean",
            },
            {
                name: "kulStyle",
                docs: "Custom style of the component.",
                type: "string",
            },
        ],
        styles: [
            {
                name: "--kul-accordion-backdrop-filter",
                docs: "Sets the backdrop filter of the accordion. Defaults to blur(3.5px).",
            },
            {
                name: "--kul-accordion-background-color",
                docs: "Sets background of the component. Defaults to var(--kul-background-color).",
            },
            {
                name: "--kul-accordion-background-color-hover",
                docs: "Sets background color of the hover effect. Defaults to rgba(var(--kul-text-color-rgb), 0.175).",
            },
            {
                name: "--kul-accordion-border",
                docs: "Sets borders color of the accordion. Defaults to 1px solid var(--kul-border-color).",
            },
            {
                name: "--kul-accordion-border-radius",
                docs: "Sets border radius of the first and last nodes of the accordion. Defaults to 4px.",
            },
            {
                name: "--kul-accordion-color-hover",
                docs: "Sets text color of the hover effect. Defaults to var(--kul-text-color).",
            },
            {
                name: "--kul-accordion-dropdown-icon-color",
                docs: "Sets color of the dropdown icon. Defaults to var(--kul-text-color).",
            },
            {
                name: "--kul-accordion-font-family",
                docs: "Sets font family of the component. Defaults to var(--kul-font-family).",
            },
            {
                name: "--kul-accordion-font-size",
                docs: "Sets font size of the component. Defaults to var(--kul-font-size).",
            },
            {
                name: "--kul-accordion-padding",
                docs: "Sets padding of the accordion's nodes. Defaults to 1em 1.5em.",
            },
            {
                name: "--kul-accordion-primary-color",
                docs: "Sets primary color of the component. Defaults to var(--kul-primary-color).",
            },
            {
                name: "--kul-accordion-primary-color-rgb",
                docs: "Sets primary color RGB values of the component. Defaults to var(--kul-primary-color-rgb).",
            },
            {
                name: "--kul-accordion-text-color",
                docs: "Sets text color of the component. Defaults to var(--kul-text-color).",
            },
            {
                name: "--kul-accordion-text-on-primary-color",
                docs: "Sets text on primary color of the component. Defaults to var(--kul-text-on-primary-color).",
            },
            {
                name: "--kul-accordion-transition",
                docs: "Sets transition duration for color and background-color. Defaults to 80ms.",
            },
        ],
    },
    "kul-article": {
        methods: [
            {
                name: "getDebugInfo",
                docs: "Retrieves the debug information reflecting the current state of the component.",
                returns: {
                    type: "Promise<KulDebugComponentInfo>",
                    docs: "A promise that resolves to a KulDebugComponentInfo object containing debug information.",
                },
                signature: "() => Promise<KulDebugComponentInfo>",
            },
            {
                name: "getProps",
                docs: "Retrieves the properties of the component, with optional descriptions.",
                returns: {
                    type: "Promise<GenericObject<unknown>>",
                    docs: "A promise that resolves to an object where each key is a property name, optionally with its description.",
                },
                signature: "(descriptions?: boolean) => Promise<GenericObject>",
            },
            {
                name: "refresh",
                docs: "Triggers a re-render of the component to reflect any state changes.",
                returns: {
                    type: "Promise<void>",
                    docs: "",
                },
                signature: "() => Promise<void>",
            },
        ],
        props: [
            {
                name: "kulData",
                docs: "The actual data of the article.",
                type: "KulArticleDataset",
            },
            {
                name: "kulStyle",
                docs: "Enables customization of the component's style.",
                type: "string",
            },
        ],
        styles: [
            {
                name: "--kul-article-content-color",
                docs: "Sets the color for .content elements. Defaults to var(--kul-text-color)",
            },
            {
                name: "--kul-article-content-font-family",
                docs: "Sets the font family for .content elements. Defaults to var(--kul-font-family)",
            },
            {
                name: "--kul-article-content-font-size",
                docs: "Sets the font size for .content elements. Defaults to var(--kul-font-size)",
            },
            {
                name: "--kul-article-h3-color",
                docs: "Sets the color for <h3> elements. Defaults to var(--kul-text-color)",
            },
            {
                name: "--kul-article-h3-font-family",
                docs: "Sets the font family for <h3> elements. Defaults to var(--kul-font-family)",
            },
            {
                name: "--kul-article-h3-font-size",
                docs: "Sets the font size for <h3> elements. Defaults to 1.5em",
            },
            {
                name: "--kul-article-margin",
                docs: "Sets the margin of the article tag. Defaults to automatic.",
            },
            {
                name: "--kul-article-max-width",
                docs: "Sets the max-width of the article tag. Defaults to 1200px.",
            },
            {
                name: "--kul-article-padding",
                docs: "Sets the padding of the article tag. Defaults to 40px.",
            },
        ],
    },
    "kul-badge": {
        methods: [
            {
                name: "getDebugInfo",
                docs: "Fetches debug information of the component's current state.",
                returns: {
                    type: "Promise<KulDebugComponentInfo>",
                    docs: "A promise that resolves with the debug information object.",
                },
                signature: "() => Promise<KulDebugComponentInfo>",
            },
            {
                name: "getProps",
                docs: "Used to retrieve component's props values.",
                returns: {
                    type: "Promise<GenericObject<unknown>>",
                    docs: "List of props as object, each key will be a prop.",
                },
                signature: "(descriptions?: boolean) => Promise<GenericObject>",
            },
            {
                name: "refresh",
                docs: "This method is used to trigger a new render of the component.",
                returns: {
                    type: "Promise<void>",
                    docs: "",
                },
                signature: "() => Promise<void>",
            },
        ],
        props: [
            {
                name: "kulImageProps",
                docs: "The props of the image displayed inside the badge.",
                type: "KulImagePropsInterface",
            },
            {
                name: "kulLabel",
                docs: "The text displayed inside the badge.",
                type: "string",
            },
            {
                name: "kulStyle",
                docs: "Custom style of the component.",
                type: "string",
            },
        ],
        styles: [
            {
                name: "--kul-badge-border-radius",
                docs: "Sets the border radius of the badge. Defaults to 30px.",
            },
            {
                name: "--kul-badge-font-family",
                docs: "Sets the font family of the badge. Defaults to var(--kul-font-family).",
            },
            {
                name: "--kul-badge-font-size",
                docs: "Sets the font size of the badge. Defaults to var(--kul-font-size).",
            },
            {
                name: "--kul-badge-min-size",
                docs: "Sets the minimum size of the badge. Defaults to 1.5em.",
            },
            {
                name: "--kul-badge-padding",
                docs: "Sets the padding of the badge. Defaults to 0.25em.",
            },
            {
                name: "--kul-badge-primary-color",
                docs: "Sets the primary color of the badge. Defaults to var(--kul-primary-color).",
            },
            {
                name: "--kul-badge-text-on-primary-color",
                docs: "Sets the text color on the primary color of the badge. Defaults to var(--kul-text-on-primary-color).",
            },
        ],
    },
    "kul-button": {
        methods: [
            {
                name: "getDebugInfo",
                docs: "Fetches debug information of the component's current state.",
                returns: {
                    type: "Promise<KulDebugComponentInfo>",
                    docs: "A promise that resolves with the debug information object.",
                },
                signature: "() => Promise<KulDebugComponentInfo>",
            },
            {
                name: "getProps",
                docs: "Used to retrieve component's properties and descriptions.",
                returns: {
                    type: "Promise<GenericObject<unknown>>",
                    docs: "Promise resolved with an object containing the component's properties.",
                },
                signature: "(descriptions?: boolean) => Promise<GenericObject>",
            },
            {
                name: "getValue",
                docs: "Used to retrieve the component's current state.",
                returns: {
                    type: "Promise<KulButtonState>",
                    docs: "Promise resolved with the current state of the component.",
                },
                signature: "() => Promise<KulButtonState>",
            },
            {
                name: "refresh",
                docs: "This method is used to trigger a new render of the component.",
                returns: {
                    type: "Promise<void>",
                    docs: "",
                },
                signature: "() => Promise<void>",
            },
            {
                name: "setValue",
                docs: "Sets the component's state.",
                returns: {
                    type: "Promise<void>",
                    docs: "",
                },
                signature: "(value: KulButtonState) => Promise<void>",
            },
        ],
        props: [
            {
                name: "kulData",
                docs: "Actual data of the button, used to render dropdown buttons.",
                type: "KulDataDataset",
            },
            {
                name: "kulDisabled",
                docs: "Defaults at false. When set to true, the component is disabled.",
                type: "boolean",
            },
            {
                name: "kulIcon",
                docs: "When set, the button will show this icon.",
                type: "string",
            },
            {
                name: "kulIconOff",
                docs: "When set, the icon button off state will show this icon. Otherwise, an outlined version of the icon prop will be displayed.",
                type: "string",
            },
            {
                name: "kulLabel",
                docs: "When set, the button will show this text.",
                type: "string",
            },
            {
                name: "kulRipple",
                docs: "When set to true, the pointerdown event will trigger a ripple effect.",
                type: "boolean",
            },
            {
                name: "kulShowSpinner",
                docs: "When set to true, the button show a spinner received in slot.",
                type: "boolean",
            },
            {
                name: "kulStyle",
                docs: "Custom style of the component.",
                type: "string",
            },
            {
                name: "kulStyling",
                docs: "Defines the style of the button. This property controls the visual appearance of the button.",
                type: '"flat" | "floating" | "icon" | "outlined" | "raised"',
            },
            {
                name: "kulToggable",
                docs: "When set to true, the icon button will be toggable on/off.",
                type: "boolean",
            },
            {
                name: "kulTrailingIcon",
                docs: "When set, the icon will be shown after the text.",
                type: "boolean",
            },
            {
                name: "kulType",
                docs: "Sets the type of the button.",
                type: '"button" | "reset" | "submit"',
            },
            {
                name: "kulValue",
                docs: "When set to true, the icon button state will be on.",
                type: "boolean",
            },
        ],
        styles: [
            {
                name: "--kul-button-backdrop-filter",
                docs: "Sets the backdrop filter of buttons. Defaults to blur(3.5px).",
            },
            {
                name: "--kul-button-backdrop-filter-hover",
                docs: "Sets the backdrop filter of buttons when hovering. Defaults to blur(5px).",
            },
            {
                name: "--kul-button-border-radius",
                docs: "Sets border radius of the button. Defaults to 4px.",
            },
            {
                name: "--kul-button-disabled-color",
                docs: "Sets disabled color of the button. Defaults to var(--kul-disabled-color).",
            },
            {
                name: "--kul-button-font-family",
                docs: "Sets font family of the button. Defaults to var(--kul-font-family).",
            },
            {
                name: "--kul-button-font-size",
                docs: "Sets font size of the button. Defaults to var(--kul-font-size).",
            },
            {
                name: "--kul-button-font-weight",
                docs: "Sets font weight of the button. Defaults to 400.",
            },
            {
                name: "--kul-button-height",
                docs: "Sets height of the button. Defaults to 3em.",
            },
            {
                name: "--kul-button-padding",
                docs: "Sets padding of the button. Defaults to 0 1.25em.",
            },
            {
                name: "--kul-button-primary-color",
                docs: "Sets the primary color of the button. Defaults to var(--kul-primary-color).",
            },
            {
                name: "--kul-button-primary-color-h",
                docs: "Sets the primary color Hue value of the button (used for focus/hover effects). Defaults to var(--kul-primary-color-h).",
            },
            {
                name: "--kul-button-primary-color-l",
                docs: "Sets the primary color Lightness value of the button (used for focus/hover effects). Defaults to var(--kul-primary-color-l).",
            },
            {
                name: "--kul-button-primary-color-rgb",
                docs: "Sets the primary color RGB values of the button (used for shaders). Defaults to var(--kul-primary-color-rgb).",
            },
            {
                name: "--kul-button-primary-color-s",
                docs: "Sets the primary color Saturation value of the button (used for focus/hover effects). Defaults to var(--kul-primary-color-s).",
            },
            {
                name: "--kul-button-text-on-primary-color",
                docs: "Sets text and icon color for raised buttons. Defaults to var(--kul-text-on-primary-color).",
            },
            {
                name: "--kul-button-text-transform",
                docs: "Set the label case, default is uppercase. Defaults to uppercase.",
            },
            {
                name: "--kul-spinner-color",
                docs: "Sets the spinner color. Defaults to var(--kul-button-primary-color).",
            },
        ],
    },
    "kul-card": {
        methods: [
            {
                name: "getDebugInfo",
                docs: "Fetches debug information of the component's current state.",
                returns: {
                    type: "Promise<KulDebugComponentInfo>",
                    docs: "A promise that resolves with the debug information object.",
                },
                signature: "() => Promise<KulDebugComponentInfo>",
            },
            {
                name: "getProps",
                docs: "Used to retrieve component's props values.",
                returns: {
                    type: "Promise<GenericObject<unknown>>",
                    docs: "List of props as object, each key will be a prop.",
                },
                signature: "(descriptions?: boolean) => Promise<GenericObject>",
            },
            {
                name: "getShapes",
                docs: "Used to retrieve component's shapes.",
                returns: {
                    type: "Promise<KulDataShapesMap>",
                    docs: "Map of shapes.",
                },
                signature: "() => Promise<KulDataShapesMap>",
            },
            {
                name: "refresh",
                docs: "This method is used to trigger a new render of the component.",
                returns: {
                    type: "Promise<void>",
                    docs: "",
                },
                signature: "() => Promise<void>",
            },
        ],
        props: [
            {
                name: "kulData",
                docs: "The actual data of the card.",
                type: "KulDataDataset",
            },
            {
                name: "kulLayout",
                docs: "Sets the layout.",
                type: "string",
            },
            {
                name: "kulSizeX",
                docs: "The width of the card, defaults to 100%. Accepts any valid CSS format (px, %, vw, etc.).",
                type: "string",
            },
            {
                name: "kulSizeY",
                docs: "The height of the card, defaults to 100%. Accepts any valid CSS format (px, %, vh, etc.).",
                type: "string",
            },
            {
                name: "kulStyle",
                docs: "Custom style of the component.",
                type: "string",
            },
        ],
        styles: [
            {
                name: "--kul-card-backdrop",
                docs: "Sets the backdrop color of the component when visible. Defaults to rgba(0, 0, 0, 0.32).",
            },
        ],
    },
    "kul-chart": {
        methods: [
            {
                name: "getDebugInfo",
                docs: "Fetches debug information of the component's current state.",
                returns: {
                    type: "Promise<KulDebugComponentInfo>",
                    docs: "A promise that resolves with the debug information object.",
                },
                signature: "() => Promise<KulDebugComponentInfo>",
            },
            {
                name: "getProps",
                docs: "Used to retrieve component's props values.",
                returns: {
                    type: "Promise<GenericObject<unknown>>",
                    docs: "List of props as object, each key will be a prop.",
                },
                signature: "(descriptions?: boolean) => Promise<GenericObject>",
            },
            {
                name: "refresh",
                docs: "This method is used to trigger a new render of the component.",
                returns: {
                    type: "Promise<void>",
                    docs: "",
                },
                signature: "() => Promise<void>",
            },
        ],
        props: [
            {
                name: "kulAxis",
                docs: "Sets the axis of the chart.",
                type: "string",
            },
            {
                name: "kulColors",
                docs: "Overrides theme's colors.",
                type: "string[]",
            },
            {
                name: "kulData",
                docs: "The actual data of the chart.",
                type: "KulDataDataset",
            },
            {
                name: "kulLegend",
                docs: "Sets the position of the legend. Supported values: bottom, left, right, top, hidden. Keep in mind that legend types are tied to chart types, some combinations might not work.",
                type: '"bottom" | "hidden" | "left" | "right" | "top"',
            },
            {
                name: "kulSeries",
                docs: "The data series to be displayed. They must be of the same type.",
                type: "string[]",
            },
            {
                name: "kulSizeX",
                docs: "The width of the chart, defaults to 100%. Accepts any valid CSS format (px, %, vw, etc.).",
                type: "string",
            },
            {
                name: "kulSizeY",
                docs: "The height of the chart, defaults to 100%. Accepts any valid CSS format (px, %, vh, etc.).",
                type: "string",
            },
            {
                name: "kulStyle",
                docs: "Custom style of the component.",
                type: "string",
            },
            {
                name: "kulTypes",
                docs: "The type of the chart. Supported formats: Bar, Gaussian, Line, Pie, Map and Scatter.",
                type: "KulChartType[]",
            },
            {
                name: "kulXAxis",
                docs: "Customization options for the x Axis.",
                type: 'AxisBaseOptionCommon & { gridIndex?: number; gridId?: string; position?: CartesianAxisPosition; offset?: number; categorySortInfo?: OrdinalSortInfo; } & { mainType?: "xAxis"; } | CategoryAxisBaseOption & { gridIndex?: number; gridId?: string; position?: CartesianAxisPosition; offset?: number; categorySortInfo?: OrdinalSortInfo; } & { mainType?: "xAxis"; } | LogAxisBaseOption & { gridIndex?: number; gridId?: string; position?: CartesianAxisPosition; offset?: number; categorySortInfo?: OrdinalSortInfo; } & { mainType?: "xAxis"; } | TimeAxisBaseOption & { gridIndex?: number; gridId?: string; position?: CartesianAxisPosition; offset?: number; categorySortInfo?: OrdinalSortInfo; } & { mainType?: "xAxis"; } | ValueAxisBaseOption & { gridIndex?: number; gridId?: string; position?: CartesianAxisPosition; offset?: number; categorySortInfo?: OrdinalSortInfo; } & { mainType?: "xAxis"; }',
            },
            {
                name: "kulYAxis",
                docs: "Customization options for the y Axis.",
                type: 'AxisBaseOptionCommon & { gridIndex?: number; gridId?: string; position?: CartesianAxisPosition; offset?: number; categorySortInfo?: OrdinalSortInfo; } & { mainType?: "yAxis"; } | CategoryAxisBaseOption & { gridIndex?: number; gridId?: string; position?: CartesianAxisPosition; offset?: number; categorySortInfo?: OrdinalSortInfo; } & { mainType?: "yAxis"; } | LogAxisBaseOption & { gridIndex?: number; gridId?: string; position?: CartesianAxisPosition; offset?: number; categorySortInfo?: OrdinalSortInfo; } & { mainType?: "yAxis"; } | TimeAxisBaseOption & { gridIndex?: number; gridId?: string; position?: CartesianAxisPosition; offset?: number; categorySortInfo?: OrdinalSortInfo; } & { mainType?: "yAxis"; } | ValueAxisBaseOption & { gridIndex?: number; gridId?: string; position?: CartesianAxisPosition; offset?: number; categorySortInfo?: OrdinalSortInfo; } & { mainType?: "yAxis"; }',
            },
        ],
        styles: [],
    },
    "kul-code": {
        methods: [
            {
                name: "getDebugInfo",
                docs: "Retrieves the debug information reflecting the current state of the component.",
                returns: {
                    type: "Promise<KulDebugComponentInfo>",
                    docs: "A promise that resolves to a KulDebugComponentInfo object containing debug information.",
                },
                signature: "() => Promise<KulDebugComponentInfo>",
            },
            {
                name: "getProps",
                docs: "Retrieves the properties of the component, with optional descriptions.",
                returns: {
                    type: "Promise<GenericObject<unknown>>",
                    docs: "A promise that resolves to an object where each key is a property name, optionally with its description.",
                },
                signature: "(descriptions?: boolean) => Promise<GenericObject>",
            },
            {
                name: "refresh",
                docs: "Triggers a re-render of the component to reflect any state changes.",
                returns: {
                    type: "Promise<void>",
                    docs: "",
                },
                signature: "() => Promise<void>",
            },
        ],
        props: [
            {
                name: "kulLanguage",
                docs: "Sets the language of the snippet.",
                type: "string",
            },
            {
                name: "kulStyle",
                docs: "Enables customization of the component's style.",
                type: "string",
            },
            {
                name: "kulValue",
                docs: "String containing the snippet of code to display.",
                type: "string",
            },
        ],
        styles: [
            {
                name: "--kul-code-background-color",
                docs: "Sets the background color of the component. Defaults to rgba(var(--kul-background-color-rgb) 0.275)",
            },
            {
                name: "--kul-code-font-family",
                docs: "Sets the font family of the component. Defaults to var(--kul-font-family-monospace)",
            },
            {
                name: "--kul-code-header-background-color",
                docs: "Sets the background color of the header. Defaults to var(--kul-title-background-color)",
            },
            {
                name: "--kul-code-header-color",
                docs: "Sets the color of the header. Defaults to var(--kul-title-color)",
            },
            {
                name: "--kul-code-selection-background-color",
                docs: "Sets the background color of selected text. Defaults to rgba(var(--kul-border-color-rgb, 0.275))",
            },
            {
                name: "--kul-code-text-color",
                docs: "Sets the color of the text. Defaults to var(--kul-text-color)",
            },
            {
                name: "--kul-code-token-color-1",
                docs: "Sets the background color of: boolean, constant, deleted, number, property, symbol, tag. Defaults to rgb(231, 0, 127)",
            },
            {
                name: "--kul-code-token-color-2",
                docs: "Sets the background color of: attr-name, builtin, char, inserted, selector, string. Defaults to rgb(146, 219, 0)",
            },
            {
                name: "--kul-code-token-color-3",
                docs: "Sets the background color of: atrule, attr-value, keyword. Defaults to rgb(0, 165, 236)",
            },
            {
                name: "--kul-code-token-color-4",
                docs: "Sets the background color of: class-name, function. Defaults to #ff6363",
            },
            {
                name: "--kul-code-token-color-5",
                docs: "Sets the background color of: important, regex, variable. Defaults to rgb(255, 196, 86)",
            },
        ],
    },
    "kul-drawer": {
        methods: [
            {
                name: "close",
                docs: "Closes the drawer.",
                returns: {
                    type: "Promise<void>",
                    docs: "",
                },
                signature: "() => Promise<void>",
            },
            {
                name: "getDebugInfo",
                docs: "Fetches debug information of the component's current state.",
                returns: {
                    type: "Promise<KulDebugComponentInfo>",
                    docs: "A promise that resolves with the debug information object.",
                },
                signature: "() => Promise<KulDebugComponentInfo>",
            },
            {
                name: "getProps",
                docs: "Used to retrieve component's props values.",
                returns: {
                    type: "Promise<GenericObject<unknown>>",
                    docs: "List of props as object, each key will be a prop.",
                },
                signature: "(descriptions?: boolean) => Promise<GenericObject>",
            },
            {
                name: "isOpened",
                docs: "Returns the state of the drawer.",
                returns: {
                    type: "Promise<boolean>",
                    docs: "True when opened, false when closed.",
                },
                signature: "() => Promise<boolean>",
            },
            {
                name: "open",
                docs: "Opens the drawer.",
                returns: {
                    type: "Promise<void>",
                    docs: "",
                },
                signature: "() => Promise<void>",
            },
            {
                name: "refresh",
                docs: "This method is used to trigger a new render of the component.",
                returns: {
                    type: "Promise<void>",
                    docs: "",
                },
                signature: "() => Promise<void>",
            },
            {
                name: "toggle",
                docs: "Opens the drawer when closed and vice-versa.",
                returns: {
                    type: "Promise<void>",
                    docs: "",
                },
                signature: "() => Promise<void>",
            },
        ],
        props: [
            {
                name: "kulStyle",
                docs: "Custom style of the component.",
                type: "string",
            },
        ],
        styles: [
            {
                name: "--kul-drawer-backdrop",
                docs: "Sets the backdrop color of the drawer when in slide mode. Defaults to rgba(0, 0, 0, 0.32).",
            },
            {
                name: "--kul-drawer-box-shadow",
                docs: "Sets the box shadow of the drawer when in slide mode. Defaults to a combination of shadows for depth.",
            },
            {
                name: "--kul-drawer-permanent-border",
                docs: "Sets the border of the drawer in permanent mode. Defaults to a 1px solid border with the color defined by --kul-border-color.",
            },
            {
                name: "--kul-drawer-slide-transition",
                docs: "Sets the horizontal transition duration when in slide mode. Defaults to 750ms.",
            },
            {
                name: "--kul-drawer-transition",
                docs: "Sets the transition duration for the drawer. Defaults to 250ms.",
            },
        ],
    },
    "kul-header": {
        methods: [
            {
                name: "getDebugInfo",
                docs: "Fetches debug information of the component's current state.",
                returns: {
                    type: "Promise<KulDebugComponentInfo>",
                    docs: "A promise that resolves with the debug information object.",
                },
                signature: "() => Promise<KulDebugComponentInfo>",
            },
            {
                name: "getProps",
                docs: "Used to retrieve component's props values.",
                returns: {
                    type: "Promise<GenericObject<unknown>>",
                    docs: "List of props as object, each key will be a prop.",
                },
                signature: "(descriptions?: boolean) => Promise<GenericObject>",
            },
            {
                name: "refresh",
                docs: "This method is used to trigger a new render of the component.",
                returns: {
                    type: "Promise<void>",
                    docs: "",
                },
                signature: "() => Promise<void>",
            },
        ],
        props: [
            {
                name: "kulStyle",
                docs: "Customizes the style of the component. This property allows you to apply a custom CSS style to the component.",
                type: "string",
            },
        ],
        styles: [
            {
                name: "--kul-header-box-shadow",
                docs: "Sets the box shadow of the header component. Defaults to a combination of shadows for depth.",
            },
            {
                name: "--kul-header-padding",
                docs: "Sets the padding of the header component. Defaults to 8px top and bottom, 12px left and right.",
            },
            {
                name: "--kul-header-position",
                docs: "Sets the CSS positioning of the header component. Defaults to fixed.",
            },
            {
                name: "--kul-header-transition",
                docs: "Sets the transition time of the header component. Defaults to 250ms.",
            },
            {
                name: "--kul-header-width",
                docs: "Sets the width of the header component. Defaults to 100%.",
            },
        ],
    },
    "kul-image": {
        methods: [
            {
                name: "getDebugInfo",
                docs: "Fetches debug information of the component's current state.",
                returns: {
                    type: "Promise<KulDebugComponentInfo>",
                    docs: "A promise that resolves with the debug information object.",
                },
                signature: "() => Promise<KulDebugComponentInfo>",
            },
            {
                name: "getProps",
                docs: "Used to retrieve component's props values.",
                returns: {
                    type: "Promise<GenericObject<unknown>>",
                    docs: "List of props as object, each key will be a prop.",
                },
                signature: "(descriptions?: boolean) => Promise<GenericObject>",
            },
            {
                name: "refresh",
                docs: "This method is used to trigger a new render of the component.",
                returns: {
                    type: "Promise<void>",
                    docs: "",
                },
                signature: "() => Promise<void>",
            },
        ],
        props: [
            {
                name: "kulBadgeProps",
                docs: "This property is used to attach a badge to the component.",
                type: "KulBadgePropsInterface",
            },
            {
                name: "kulColor",
                docs: "Specifies the color of the icon using a CSS variable. This property is used to set the color of the component's icon.",
                type: "string",
            },
            {
                name: "kulShowSpinner",
                docs: "Controls the display of a loading indicator. When enabled, a spinner is shown until the image finishes loading. This property is not compatible with SVG images.",
                type: "boolean",
            },
            {
                name: "kulSizeX",
                docs: "Sets the width of the icon. This property accepts any valid CSS measurement value (e.g., px, %, vh, etc.) and defaults to 100%.",
                type: "string",
            },
            {
                name: "kulSizeY",
                docs: "Sets the height of the icon. This property accepts any valid CSS measurement value (e.g., px, %, vh, etc.) and defaults to 100%.",
                type: "string",
            },
            {
                name: "kulStyle",
                docs: "Customizes the style of the component. This property allows you to apply a custom CSS style to the component.",
                type: "string",
            },
            {
                name: "kulValue",
                docs: "Defines the source URL of the image. This property is used to set the image resource that the component should display.",
                type: "string",
            },
        ],
        styles: [],
    },
    "kul-lazy": {
        methods: [
            {
                name: "getComponent",
                docs: "Returns the HTMLElement of the component to lazy load.",
                returns: {
                    type: "Promise<HTMLElement>",
                    docs: "Lazy loaded component.",
                },
                signature: "() => Promise<HTMLElement>",
            },
            {
                name: "getDebugInfo",
                docs: "Fetches debug information of the component's current state.",
                returns: {
                    type: "Promise<KulDebugComponentInfo>",
                    docs: "A promise that resolves with the debug information object.",
                },
                signature: "() => Promise<KulDebugComponentInfo>",
            },
            {
                name: "getProps",
                docs: "Used to retrieve component's props values.",
                returns: {
                    type: "Promise<GenericObject<unknown>>",
                    docs: "List of props as object, each key will be a prop.",
                },
                signature: "(descriptions?: boolean) => Promise<GenericObject>",
            },
            {
                name: "refresh",
                docs: "This method is used to trigger a new render of the component.",
                returns: {
                    type: "Promise<void>",
                    docs: "",
                },
                signature: "() => Promise<void>",
            },
        ],
        props: [
            {
                name: "kulComponentName",
                docs: "Sets the tag name of the component to be lazy loaded.",
                type: "string",
            },
            {
                name: "kulComponentProps",
                docs: "Sets the data of the component to be lazy loaded.",
                type: "unknown",
            },
            {
                name: "kulRenderMode",
                docs: "Decides when the sub-component should be rendered.\r\nBy default when both the component props exist and the component is in the viewport.",
                type: '"both" | "props" | "viewport"',
            },
            {
                name: "kulShowPlaceholder",
                docs: "Displays an animated SVG placeholder until the component is loaded.",
                type: "boolean",
            },
            {
                name: "kulStyle",
                docs: "Customizes the style of the component. This property allows you to apply a custom CSS style to the component.",
                type: "string",
            },
        ],
        styles: [
            {
                name: "--kul-lazy-animation-time",
                docs: "Sets the duration of the animation. Defaults to 2s.",
            },
            {
                name: "--kul-lazy-height",
                docs: "Sets the height of the component and subcomponent. Defaults to 100%.",
            },
            {
                name: "--kul-lazy-hor-alignment",
                docs: "Sets the horizontal alignment of the subcomponent. Defaults to center.",
            },
            {
                name: "--kul-lazy-placeholder-color",
                docs: "Sets color of the placeholder icon. Defaults to var(--kul-icon-color).",
            },
            {
                name: "--kul-lazy-ver-alignment",
                docs: "Sets the vertical alignment of the subcomponent. Defaults to center.",
            },
            {
                name: "--kul-lazy-width",
                docs: "Sets the width of the component and subcomponent. Defaults to 100%.",
            },
        ],
    },
    "kul-list": {
        methods: [
            {
                name: "focusNext",
                docs: "Focuses the next element of the list.",
                returns: {
                    type: "Promise<void>",
                    docs: "",
                },
                signature: "() => Promise<void>",
            },
            {
                name: "focusPrevious",
                docs: "Focuses the previous element of the list.",
                returns: {
                    type: "Promise<void>",
                    docs: "",
                },
                signature: "() => Promise<void>",
            },
            {
                name: "getDebugInfo",
                docs: "Fetches debug information of the component's current state.",
                returns: {
                    type: "Promise<KulDebugComponentInfo>",
                    docs: "A promise that resolves with the debug information object.",
                },
                signature: "() => Promise<KulDebugComponentInfo>",
            },
            {
                name: "getProps",
                docs: "Used to retrieve component's props values.",
                returns: {
                    type: "Promise<GenericObject<unknown>>",
                    docs: "List of props as object, each key will be a prop.",
                },
                signature: "(descriptions?: boolean) => Promise<GenericObject>",
            },
            {
                name: "getSelected",
                docs: "Returns the selected node.",
                returns: {
                    type: "Promise<KulDataNode>",
                    docs: "Selected node.",
                },
                signature: "() => Promise<KulDataNode>",
            },
            {
                name: "refresh",
                docs: "This method is used to trigger a new render of the component.",
                returns: {
                    type: "Promise<void>",
                    docs: "",
                },
                signature: "() => Promise<void>",
            },
            {
                name: "selectNode",
                docs: "Calls handleSelection private method to select the given item.",
                returns: {
                    type: "Promise<void>",
                    docs: "",
                },
                signature: "(index?: number) => Promise<void>",
            },
        ],
        props: [
            {
                name: "kulData",
                docs: "The data of the list.",
                type: "KulDataDataset",
            },
            {
                name: "kulNavigation",
                docs: "When true, enables items' navigation through arrow keys.",
                type: "boolean",
            },
            {
                name: "kulRipple",
                docs: "When set to true, the pointerdown event will trigger a ripple effect.",
                type: "boolean",
            },
            {
                name: "kulSelectable",
                docs: "Defines whether items are selectable or not.",
                type: "boolean",
            },
            {
                name: "kulStyle",
                docs: "Custom style of the component.",
                type: "string",
            },
        ],
        styles: [
            {
                name: "--kul-list-backdrop-filter",
                docs: "Sets the backdrop filter of the list. Defaults to blur(3.5px).",
            },
            {
                name: "--kul-list-background-color",
                docs: "Sets the background color of the list. Defaults to rgba(var(--kul-background-color-rgb), 0.75).",
            },
            {
                name: "--kul-list-font-family",
                docs: "Sets font family of the component. Defaults to the value of --kul-font-family.",
            },
            {
                name: "--kul-list-font-size",
                docs: "Sets font size of the component. Defaults to the value of --kul-font-size.",
            },
            {
                name: "--kul-list-font-weight",
                docs: "Sets font weight of the component. Defaults to 400.",
            },
            {
                name: "--kul-list-group-item-height",
                docs: "Sets height of each list item when the list contains radio buttons or checkboxes. Defaults to 3em.",
            },
            {
                name: "--kul-list-item-height",
                docs: "Sets height of each list item. Defaults to 2.5em.",
            },
            {
                name: "--kul-list-item-padding",
                docs: "Sets the padding of each list item. Defaults to 0 0.75em.",
            },
            {
                name: "--kul-list-primary-color",
                docs: "Sets the primary color of the component. Defaults to the value of --kul-primary-color.",
            },
            {
                name: "--kul-list-primary-color-rgb",
                docs: "Sets the RGB values of the primary color of the component (used for shaders). Defaults to the value of --kul-primary-color-rgb.",
            },
            {
                name: "--kul-list-text-color",
                docs: "Sets text color of the list. Defaults to the value of --kul-text-color.",
            },
            {
                name: "--kul-list-text-color-rgb",
                docs: "Sets the RGB values of text color. Defaults to the value of --kul-text-color-rgb.",
            },
            {
                name: "--kul-list-transition",
                docs: "Transitions duration for text and background colors. Defaults to 125ms.",
            },
        ],
    },
    "kul-photoframe": {
        methods: [
            {
                name: "getDebugInfo",
                docs: "Fetches debug information of the component's current state.",
                returns: {
                    type: "Promise<KulDebugComponentInfo>",
                    docs: "A promise that resolves with the debug information object.",
                },
                signature: "() => Promise<KulDebugComponentInfo>",
            },
            {
                name: "getProps",
                docs: "Used to retrieve component's props values.",
                returns: {
                    type: "Promise<GenericObject<unknown>>",
                    docs: "List of props as object, each key will be a prop.",
                },
                signature: "(descriptions?: boolean) => Promise<GenericObject>",
            },
            {
                name: "refresh",
                docs: "This method is used to trigger a new render of the component.",
                returns: {
                    type: "Promise<void>",
                    docs: "",
                },
                signature: "() => Promise<void>",
            },
        ],
        props: [
            {
                name: "kulPlaceholder",
                docs: "Html attributes of the picture before the component enters the viewport.",
                type: "GenericObject<unknown>",
            },
            {
                name: "kulStyle",
                docs: "Custom style of the component.",
                type: "string",
            },
            {
                name: "kulThreshold",
                docs: "Percentage of the component dimensions entering the viewport (0.1 => 1).",
                type: "number",
            },
            {
                name: "kulValue",
                docs: "Html attributes of the picture after the component enters the viewport.",
                type: "GenericObject<unknown>",
            },
        ],
        styles: [
            {
                name: "--kul-photoframe-border",
                docs: "Sets the border of the component. Defaults to 1px inset var(--kul-border-color).",
            },
            {
                name: "--kul-photoframe-fade-out-time",
                docs: "Sets the time of the placeholder's fade out transition. Defaults to 2000ms.",
            },
        ],
    },
    "kul-showcase": {
        methods: [
            {
                name: "getDebugInfo",
                docs: "Fetches debug information of the component's current state.",
                returns: {
                    type: "Promise<KulDebugComponentInfo>",
                    docs: "A promise that resolves with the debug information object.",
                },
                signature: "() => Promise<KulDebugComponentInfo>",
            },
            {
                name: "getProps",
                docs: "Used to retrieve component's props values.",
                returns: {
                    type: "Promise<GenericObject<unknown>>",
                    docs: "List of props as object, each key will be a prop.",
                },
                signature: "(descriptions?: boolean) => Promise<GenericObject>",
            },
            {
                name: "refresh",
                docs: "This method is used to trigger a new render of the component.",
                returns: {
                    type: "Promise<void>",
                    docs: "",
                },
                signature: "() => Promise<void>",
            },
        ],
        props: [
            {
                name: "kulStyle",
                docs: "Custom style of the component.",
                type: "string",
            },
        ],
        styles: [],
    },
    "kul-showcase-accordion": {
        methods: [],
        props: [],
        styles: [],
    },
    "kul-showcase-article": {
        methods: [],
        props: [],
        styles: [],
    },
    "kul-showcase-badge": {
        methods: [],
        props: [],
        styles: [],
    },
    "kul-showcase-button": {
        methods: [],
        props: [],
        styles: [],
    },
    "kul-showcase-card": {
        methods: [],
        props: [],
        styles: [],
    },
    "kul-showcase-chart": {
        methods: [],
        props: [],
        styles: [],
    },
    "kul-showcase-code": {
        methods: [],
        props: [],
        styles: [],
    },
    "kul-showcase-debug": {
        methods: [],
        props: [],
        styles: [],
    },
    "kul-showcase-drawer": {
        methods: [],
        props: [],
        styles: [],
    },
    "kul-showcase-header": {
        methods: [],
        props: [],
        styles: [],
    },
    "kul-showcase-image": {
        methods: [],
        props: [],
        styles: [],
    },
    "kul-showcase-kuldata": {
        methods: [],
        props: [],
        styles: [],
    },
    "kul-showcase-kuldates": {
        methods: [],
        props: [],
        styles: [],
    },
    "kul-showcase-kuldebug": {
        methods: [],
        props: [],
        styles: [],
    },
    "kul-showcase-kuldynamicposition": {
        methods: [],
        props: [],
        styles: [],
    },
    "kul-showcase-kullanguage": {
        methods: [],
        props: [],
        styles: [],
    },
    "kul-showcase-kulmanager": {
        methods: [],
        props: [],
        styles: [],
    },
    "kul-showcase-kulmath": {
        methods: [],
        props: [],
        styles: [],
    },
    "kul-showcase-kulscrollonhover": {
        methods: [],
        props: [],
        styles: [],
    },
    "kul-showcase-kultheme": {
        methods: [],
        props: [],
        styles: [],
    },
    "kul-showcase-lazy": {
        methods: [],
        props: [],
        styles: [],
    },
    "kul-showcase-list": {
        methods: [],
        props: [],
        styles: [],
    },
    "kul-showcase-photoframe": {
        methods: [],
        props: [],
        styles: [],
    },
    "kul-showcase-spinner": {
        methods: [],
        props: [],
        styles: [],
    },
    "kul-showcase-splash": {
        methods: [],
        props: [],
        styles: [],
    },
    "kul-showcase-switch": {
        methods: [],
        props: [],
        styles: [],
    },
    "kul-showcase-tabbar": {
        methods: [],
        props: [],
        styles: [],
    },
    "kul-showcase-textfield": {
        methods: [],
        props: [],
        styles: [],
    },
    "kul-showcase-toast": {
        methods: [],
        props: [],
        styles: [],
    },
    "kul-showcase-tree": {
        methods: [],
        props: [],
        styles: [],
    },
    "kul-showcase-upload": {
        methods: [],
        props: [],
        styles: [],
    },
    "kul-spinner": {
        methods: [
            {
                name: "getDebugInfo",
                docs: "Fetches debug information of the component's current state.",
                returns: {
                    type: "Promise<KulDebugComponentInfo>",
                    docs: "A promise that resolves with the debug information object.",
                },
                signature: "() => Promise<KulDebugComponentInfo>",
            },
            {
                name: "getProps",
                docs: "Used to retrieve component's props values.",
                returns: {
                    type: "Promise<GenericObject<unknown>>",
                    docs: "List of props as object, each key will be a prop.",
                },
                signature: "(descriptions?: boolean) => Promise<GenericObject>",
            },
            {
                name: "refresh",
                docs: "This method is used to trigger a new render of the component.",
                returns: {
                    type: "Promise<void>",
                    docs: "",
                },
                signature: "() => Promise<void>",
            },
        ],
        props: [
            {
                name: "kulActive",
                docs: "Specifies if the spinner is animating.",
                type: "boolean",
            },
            {
                name: "kulBarVariant",
                docs: "Controls if the component displays as a bar or a spinner.",
                type: "boolean",
            },
            {
                name: "kulDimensions",
                docs: "Defines the width and height of the spinner. In the bar variant, it specifies only the height.",
                type: "string",
            },
            {
                name: "kulFader",
                docs: "Applies a blending modal over the component to darken or lighten the view, based on the theme.",
                type: "boolean",
            },
            {
                name: "kulFaderTimeout",
                docs: "Duration needed for the fader to become active.",
                type: "number",
            },
            {
                name: "kulFullScreen",
                docs: "Fills the entire viewport when enabled.",
                type: "boolean",
            },
            {
                name: "kulLayout",
                docs: "Selects the spinner layout.",
                type: "number",
            },
            {
                name: "kulStyle",
                docs: "Sets a custom style for the component.",
                type: "string",
            },
        ],
        styles: [
            {
                name: "--kul-spinner-border-color",
                docs: "Sets the border color of the spinner component. Defaults to var(--kul-border-color).",
            },
        ],
    },
    "kul-splash": {
        methods: [
            {
                name: "getDebugInfo",
                docs: "Retrieves the debug information reflecting the current state of the component.",
                returns: {
                    type: "Promise<KulDebugComponentInfo>",
                    docs: "A promise that resolves to a KulDebugComponentInfo object containing debug information.",
                },
                signature: "() => Promise<KulDebugComponentInfo>",
            },
            {
                name: "getProps",
                docs: "Retrieves the properties of the component, with optional descriptions.",
                returns: {
                    type: "Promise<GenericObject<unknown>>",
                    docs: "A promise that resolves to an object where each key is a property name, optionally with its description.",
                },
                signature: "(descriptions?: boolean) => Promise<GenericObject>",
            },
            {
                name: "refresh",
                docs: "Triggers a re-render of the component to reflect any state changes.",
                returns: {
                    type: "Promise<void>",
                    docs: "",
                },
                signature: "() => Promise<void>",
            },
            {
                name: "unmount",
                docs: "Initiates the unmount sequence, which removes the component from the DOM after a delay.",
                returns: {
                    type: "Promise<void>",
                    docs: "",
                },
                signature: "(ms?: number) => Promise<void>",
            },
        ],
        props: [
            {
                name: "kulLabel",
                docs: "Initial text displayed within the component, typically shown during loading.",
                type: "string",
            },
            {
                name: "kulStyle",
                docs: "Enables customization of the component's style.",
                type: "string",
            },
        ],
        styles: [
            {
                name: "--kul-splash-background-color",
                docs: "Sets the color of the spinner. Defaults to the value of --kul-background-color.",
            },
            {
                name: "--kul-splash-font-family",
                docs: "Sets the label's font family. Defaults to the value of --kul-font-family.",
            },
            {
                name: "--kul-splash-font-size",
                docs: "Sets the label's font size. Defaults to the value of --kul-font-size.",
            },
            {
                name: "--kul-splash-label-color",
                docs: "Sets the color of the label. Defaults to the value of --kul-text-color.",
            },
            {
                name: "--kul-splash-label-display",
                docs: "Sets the display property of the label. Defaults to block.",
            },
            {
                name: "--kul-splash-widget-color",
                docs: "Sets the color of the widget. Defaults to the value of --kul-primary-color.",
            },
            {
                name: "--kul-splash-widget-height",
                docs: "Sets the height of the widget. Defaults to 150px.",
            },
            {
                name: "--kul-splash-widget-width",
                docs: "Sets the width of the widget. Defaults to 150px.",
            },
        ],
    },
    "kul-switch": {
        methods: [
            {
                name: "getDebugInfo",
                docs: "Fetches debug information of the component's current state.",
                returns: {
                    type: "Promise<KulDebugComponentInfo>",
                    docs: "A promise that resolves with the debug information object.",
                },
                signature: "() => Promise<KulDebugComponentInfo>",
            },
            {
                name: "getProps",
                docs: "Used to retrieve component's properties and descriptions.",
                returns: {
                    type: "Promise<GenericObject<unknown>>",
                    docs: "Promise resolved with an object containing the component's properties.",
                },
                signature: "(descriptions?: boolean) => Promise<GenericObject>",
            },
            {
                name: "getValue",
                docs: "Used to retrieve the component's current state.",
                returns: {
                    type: "Promise<KulSwitchState>",
                    docs: "Promise resolved with the current state of the component.",
                },
                signature: "() => Promise<KulSwitchState>",
            },
            {
                name: "refresh",
                docs: "This method is used to trigger a new render of the component.",
                returns: {
                    type: "Promise<void>",
                    docs: "",
                },
                signature: "() => Promise<void>",
            },
            {
                name: "setValue",
                docs: "Sets the component's state.",
                returns: {
                    type: "Promise<void>",
                    docs: "",
                },
                signature: "(value: KulSwitchState) => Promise<void>",
            },
        ],
        props: [
            {
                name: "kulDisabled",
                docs: "Defaults at false. When set to true, the component is disabled.",
                type: "boolean",
            },
            {
                name: "kulLabel",
                docs: "Defines text to display along with the switch.",
                type: "string",
            },
            {
                name: "kulLeadingLabel",
                docs: "Defaults at false. When set to true, the label will be displayed before the component.",
                type: "boolean",
            },
            {
                name: "kulRipple",
                docs: "When set to true, the pointerdown event will trigger a ripple effect.",
                type: "boolean",
            },
            {
                name: "kulStyle",
                docs: "Custom style of the component.",
                type: "string",
            },
            {
                name: "kulValue",
                docs: "Sets the initial boolean state of the switch.",
                type: "boolean",
            },
        ],
        styles: [
            {
                name: "--kul-switch-font-family",
                docs: "Sets font family of the switch's label. Defaults to var(--kul-font-family).",
            },
            {
                name: "--kul-switch-font-size",
                docs: "Sets font size of the switch's label. Defaults to var(--kul-font-size).",
            },
            {
                name: "--kul-switch-font-weight",
                docs: "Sets font weight of the switch's label. Defaults to 400.",
            },
            {
                name: "--kul-switch-label-color",
                docs: "Sets text color of the switch's label. Defaults to var(--kul-text-color).",
            },
            {
                name: "--kul-switch-primary-color",
                docs: "Sets primary color of the component. Defaults to var(--kul-primary-color).",
            },
            {
                name: "--kul-switch-primary-color-rgb",
                docs: "Sets primary color RGB values of the component. Defaults to var(--kul-primary-color-rgb).",
            },
            {
                name: "--kul-switch-thumb-color",
                docs: "Sets thumb color. Defaults to var(--kul-border-color).",
            },
        ],
    },
    "kul-tabbar": {
        methods: [
            {
                name: "getDebugInfo",
                docs: "Retrieves the debug information reflecting the current state of the component.",
                returns: {
                    type: "Promise<KulDebugComponentInfo>",
                    docs: "A promise that resolves to a KulDebugComponentInfo object containing debug information.",
                },
                signature: "() => Promise<KulDebugComponentInfo>",
            },
            {
                name: "getProps",
                docs: "Retrieves the properties of the component, with optional descriptions.",
                returns: {
                    type: "Promise<GenericObject<unknown>>",
                    docs: "A promise that resolves to an object where each key is a property name, optionally with its description.",
                },
                signature: "(descriptions?: boolean) => Promise<GenericObject>",
            },
            {
                name: "getValue",
                docs: "Returns the selected node and its index.",
                returns: {
                    type: "Promise<KulTabbarState>",
                    docs: "Selected node and its index.",
                },
                signature: "() => Promise<KulTabbarState>",
            },
            {
                name: "refresh",
                docs: "Triggers a re-render of the component to reflect any state changes.",
                returns: {
                    type: "Promise<void>",
                    docs: "",
                },
                signature: "() => Promise<void>",
            },
            {
                name: "setValue",
                docs: "Sets the value of the component based on the provided argument.",
                returns: {
                    type: "Promise<KulTabbarState>",
                    docs: "The newly set value.",
                },
                signature: "(value: number | string) => Promise<KulTabbarState>",
            },
        ],
        props: [
            {
                name: "kulData",
                docs: "Actual data of the component.",
                type: "KulDataDataset",
            },
            {
                name: "kulRipple",
                docs: "When set to true, the pointerdown event will trigger a ripple effect.",
                type: "boolean",
            },
            {
                name: "kulStyle",
                docs: "Custom style of the component.",
                type: "string",
            },
            {
                name: "kulValue",
                docs: "Sets the initial selected node's index.",
                type: "number",
            },
        ],
        styles: [
            {
                name: "--kul-tabbar-backdrop-filter",
                docs: "Sets the backdrop filter of tabs. Defaults to blur(3.5px).",
            },
            {
                name: "--kul-tabbar-backdrop-filter-hover",
                docs: "Sets the backdrop filter of tabs when hovering. Defaults to blur(5px).",
            },
            {
                name: "--kul-tabbar-font-size",
                docs: "Sets the font size of the tab bar. Defaults to the value of --kul-font-size.",
            },
            {
                name: "--kul-tabbar-font-weight",
                docs: "Sets the font weight of the tab bar. Defaults to 500.",
            },
            {
                name: "--kul-tabbar-height",
                docs: "Sets the height of the tab bar. Defaults to 36px.",
            },
            {
                name: "--kul-tabbar-primary-color",
                docs: "Sets the primary color of the tab bar. Defaults to the value of --kul-primary-color.",
            },
            {
                name: "--kul-tabbar-primary-color-rgb",
                docs: "Sets the primary color of the tab bar in RGB format. Defaults to the value of --kul-primary-color-rgb.",
            },
            {
                name: "--kul-tabbar-tab-padding",
                docs: "Sets the padding of the tabs in the tab bar. Defaults to 0 24px.",
            },
        ],
    },
    "kul-textfield": {
        methods: [
            {
                name: "getDebugInfo",
                docs: "Fetches debug information of the component's current state.",
                returns: {
                    type: "Promise<KulDebugComponentInfo>",
                    docs: "A promise that resolves with the debug information object.",
                },
                signature: "() => Promise<KulDebugComponentInfo>",
            },
            {
                name: "getProps",
                docs: "Used to retrieve component's props values.",
                returns: {
                    type: "Promise<GenericObject<unknown>>",
                    docs: "List of props as object, each key will be a prop.",
                },
                signature: "(descriptions?: boolean) => Promise<GenericObject>",
            },
            {
                name: "getValue",
                docs: "Used to retrieve the component's current state.",
                returns: {
                    type: "Promise<string>",
                    docs: "Promise resolved with the current state of the component.",
                },
                signature: "() => Promise<string>",
            },
            {
                name: "refresh",
                docs: "This method is used to trigger a new render of the component.",
                returns: {
                    type: "Promise<void>",
                    docs: "",
                },
                signature: "() => Promise<void>",
            },
            {
                name: "setValue",
                docs: "Sets the component's state.",
                returns: {
                    type: "Promise<void>",
                    docs: "",
                },
                signature: "(value: string) => Promise<void>",
            },
        ],
        props: [
            {
                name: "kulDisabled",
                docs: "Enables or disables the text field to prevent user interaction.",
                type: "boolean",
            },
            {
                name: "kulFullWidth",
                docs: "Applies a full-width styling to the text field, making it occupy all available horizontal space.",
                type: "boolean",
            },
            {
                name: "kulHelper",
                docs: "Specifies helper text to display alongside the text field.\r\nHelper text can provide additional context or instructions to the user.",
                type: "KulTextfieldHelper",
            },
            {
                name: "kulHtmlAttributes",
                docs: "Allows customization of the input or textarea element through additional HTML attributes.\r\nThis can include attributes like 'readonly', 'placeholder', etc., to further customize the behavior or appearance of the input.",
                type: "GenericObject<unknown>",
            },
            {
                name: "kulIcon",
                docs: "Defines the icon to be displayed within the text field.\r\nIcons can indicate actions such as search, clear, or provide visual cues related to the input's purpose.",
                type: "string",
            },
            {
                name: "kulLabel",
                docs: "Assigns a label to the text field, improving accessibility and providing context to the user about what kind of input is expected.\r\nLabels are especially important for screen readers and users navigating with keyboard-only controls.",
                type: "string",
            },
            {
                name: "kulStyle",
                docs: "Accepts custom CSS styles to apply directly to the text field component.\r\nThis allows for fine-grained control over the appearance of the component beyond predefined styling options.",
                type: "string",
            },
            {
                name: "kulStyling",
                docs: "Determines the overall styling theme of the text field, affecting its shape and border.\r\nOptions include 'default', 'outlined', or 'textarea', each offering a distinct visual presentation.",
                type: '"flat" | "outlined" | "raised" | "textarea"',
            },
            {
                name: "kulTrailingIcon",
                docs: "Controls whether the icon should appear after the text input, typically used for action buttons like clear or search.",
                type: "boolean",
            },
            {
                name: "kulValue",
                docs: "Initializes the text field with a default value when the component is first rendered.\r\nThis can be used to pre-fill forms or set a starting point for user input.",
                type: "string",
            },
        ],
        styles: [
            {
                name: "--kul-textfield-backdrop-filter",
                docs: "Sets the backdrop filter of the text field. Defaults to blur(3.5px).",
            },
            {
                name: "--kul-textfield-backdrop-filter-hover",
                docs: "Sets the backdrop filter of the text field when hovering. Defaults to blur(5px).",
            },
            {
                name: "--kul-textfield-background-color",
                docs: "Sets the background color of the text field. Defaults to rgba(var(--kul-text-color-rgb), 0.125).",
            },
            {
                name: "--kul-textfield-background-color-hover",
                docs: "Sets the background color of the text field when hovering. Defaults to rgba(var(--kul-text-color-rgb), 0.125).",
            },
            {
                name: "--kul-textfield-border-radius",
                docs: "Sets the border radius of the text field. Defaults to 4px.",
            },
            {
                name: "--kul-textfield-font-family",
                docs: "Sets the font family of the text field. Defaults to var(--kul-font-family).",
            },
            {
                name: "--kul-textfield-input-color",
                docs: "Sets the color of the text field's input text. Defaults to var(--kul-text-color).",
            },
            {
                name: "--kul-textfield-input-color-rgb",
                docs: "Sets the rgb color of the text field's input text. Defaults to var(--kul-text-color-rgb).",
            },
            {
                name: "--kul-textfield-input-font-size",
                docs: "Sets the font size of the text field's value. Defaults to var(--kul-font-size).",
            },
            {
                name: "--kul-textfield-input-font-weight",
                docs: "Sets the font weight of the text field's input. Defaults to 400.",
            },
            {
                name: "--kul-textfield-label-color",
                docs: "Sets the color of the text field's label. Defaults to rgba(var(--kul-text-color-rgb), 0.875).",
            },
            {
                name: "--kul-textfield-label-font-size",
                docs: "Sets the font size of the text field's label. Defaults to var(--kul-font-size).",
            },
            {
                name: "--kul-textfield-label-font-weight",
                docs: "Sets the font weight of the text field's label. Defaults to 400.",
            },
            {
                name: "--kul-textfield-padding",
                docs: "Sets the padding of the text field. Defaults to 0 16px.",
            },
            {
                name: "--kul-textfield-primary-color",
                docs: "Sets the primary color of the text field. Defaults to var(--kul-primary-color).",
            },
        ],
    },
    "kul-toast": {
        methods: [
            {
                name: "getDebugInfo",
                docs: "Retrieves the debug information reflecting the current state of the component.",
                returns: {
                    type: "Promise<KulDebugComponentInfo>",
                    docs: "A promise that resolves to a KulDebugComponentInfo object containing debug information.",
                },
                signature: "() => Promise<KulDebugComponentInfo>",
            },
            {
                name: "getProps",
                docs: "Retrieves the properties of the component, with optional descriptions.",
                returns: {
                    type: "Promise<GenericObject<unknown>>",
                    docs: "A promise that resolves to an object where each key is a property name, optionally with its description.",
                },
                signature: "(descriptions?: boolean) => Promise<GenericObject>",
            },
            {
                name: "refresh",
                docs: "Triggers a re-render of the component to reflect any state changes.",
                returns: {
                    type: "Promise<void>",
                    docs: "",
                },
                signature: "() => Promise<void>",
            },
        ],
        props: [
            {
                name: "kulCloseCallback",
                docs: "Callback invoked when the toast is closed.",
                type: "() => void",
            },
            {
                name: "kulCloseIcon",
                docs: "Sets the props of the clickable icon used to close the toast.",
                type: "KulImagePropsInterface",
            },
            {
                name: "kulIcon",
                docs: "Sets the props of an optional icon that will be displayed along with the message.",
                type: "KulImagePropsInterface",
            },
            {
                name: "kulMessage",
                docs: "Sets the message of the toast.",
                type: "string",
            },
            {
                name: "kulStyle",
                docs: "Enables customization of the component's style.",
                type: "string",
            },
            {
                name: "kulTimer",
                docs: "When kulTimer is set with a number, the toast will close itself after the specified amount of time (in ms).",
                type: "number",
            },
        ],
        styles: [
            {
                name: "--kul-toast-accent-color",
                docs: "Sets the accent color of the toast, identified by a bar displayed on the top of the component. Defaults to var(--kul-info-color).",
            },
            {
                name: "--kul-toast-accent-height",
                docs: "Sets the height of the accent color bar. Defaults to 4px.",
            },
            {
                name: "--kul-toast-icon-opacity",
                docs: "Sets the opacity of the icon. Defaults to 0.625.",
            },
            {
                name: "--kul-toast-slidein-from",
                docs: "Sets the animation starting point. Defaults to translateX(100%).",
            },
            {
                name: "--kul-toast-slidein-to",
                docs: "Sets the animation ending point. Defaults to translateX(0).",
            },
        ],
    },
    "kul-tree": {
        methods: [
            {
                name: "getDebugInfo",
                docs: "Retrieves the debug information reflecting the current state of the component.",
                returns: {
                    type: "Promise<KulDebugComponentInfo>",
                    docs: "A promise that resolves to a KulDebugComponentInfo object containing debug information.",
                },
                signature: "() => Promise<KulDebugComponentInfo>",
            },
            {
                name: "getProps",
                docs: "Retrieves the properties of the component, with optional descriptions.",
                returns: {
                    type: "Promise<GenericObject<unknown>>",
                    docs: "A promise that resolves to an object where each key is a property name, optionally with its description.",
                },
                signature: "(descriptions?: boolean) => Promise<GenericObject>",
            },
            {
                name: "refresh",
                docs: "Triggers a re-render of the component to reflect any state changes.",
                returns: {
                    type: "Promise<void>",
                    docs: "",
                },
                signature: "() => Promise<void>",
            },
        ],
        props: [
            {
                name: "kulAccordionLayout",
                docs: "When enabled, the first level of depth will create an accordion-style appearance for nodes.",
                type: "boolean",
            },
            {
                name: "kulData",
                docs: "The actual data of the tree.",
                type: "KulDataDataset",
            },
            {
                name: "kulFilter",
                docs: "When true, displays a text field which enables filtering the dataset of the tree.",
                type: "boolean",
            },
            {
                name: "kulInitialExpansionDepth",
                docs: "Sets the initial expanded nodes based on the specified depth.\r\nIf the property is not provided, all nodes in the tree will be expanded.",
                type: "number",
            },
            {
                name: "kulRipple",
                docs: "When set to true, the pointerdown event will trigger a ripple effect.",
                type: "boolean",
            },
            {
                name: "kulSelectable",
                docs: "When true, nodes can be selected.",
                type: "boolean",
            },
            {
                name: "kulStyle",
                docs: "Enables customization of the component's style.",
                type: "string",
            },
        ],
        styles: [
            {
                name: "--kul-tree-accordion-background-color",
                docs: 'Sets the background color for top-level nodes (data-depth="0") when kul-accordion-layout is applied. Defaults to #ffffff.',
            },
            {
                name: "--kul-tree-accordion-border-radius",
                docs: 'Sets the border radius for top-level nodes (data-depth="0") when kul-accordion-layout is applied. Defaults to 4px.',
            },
            {
                name: "--kul-tree-accordion-color",
                docs: 'Sets the text color for top-level nodes (data-depth="0") when kul-accordion-layout is applied. Defaults to #000000.',
            },
            {
                name: "--kul-tree-accordion-font-size",
                docs: 'Sets the font size for top-level nodes (data-depth="0") when kul-accordion-layout is applied. Defaults to 1.125em.',
            },
            {
                name: "--kul-tree-accordion-hover-background-color",
                docs: 'Sets the background color for top-level nodes (data-depth="0") on hover when kul-accordion-layout is applied. Defaults to var(--kul-primary-color).',
            },
            {
                name: "--kul-tree-accordion-hover-color",
                docs: 'Sets the text color for top-level nodes (data-depth="0") on hover when kul-accordion-layout is applied. Defaults to var(--kul-text-on-primary-color).',
            },
            {
                name: "--kul-tree-accordion-node-height",
                docs: 'Sets the height of top-level nodes (data-depth="0") when the tree has an accordion layout. Defaults to 4em.',
            },
            {
                name: "--kul-tree-backdrop-filter",
                docs: "Sets the backdrop filter of the tree. Defaults to blur(3.5px).",
            },
            {
                name: "--kul-tree-node-background-color-hover",
                docs: "Sets the background color when hovering a node. Defaults to rgba(var(--kul-primary-color-rgb), 0.175).",
            },
            {
                name: "--kul-tree-node-background-color-selected",
                docs: "Sets the background color of the selected node. Defaults to rgba(var(--kul-primary-color-rgb), 0.375).",
            },
            {
                name: "--kul-tree-node-height",
                docs: "Sets the height for all nodes. Replaces the static value previously used. Defaults to 2em.",
            },
            {
                name: "--kul-tree-node-padding",
                docs: "Sets the padding of nodes. Defaults to 0 1em.",
            },
            {
                name: "--kul-tree-padding",
                docs: "Sets the padding of the tree. Defaults to 0.",
            },
            {
                name: "--kul-tree-text-color",
                docs: "Sets the text color of the tree. Defaults to var(--kul-text-color).",
            },
        ],
    },
    "kul-upload": {
        methods: [
            {
                name: "getDebugInfo",
                docs: "Retrieves the debug information reflecting the current state of the component.",
                returns: {
                    type: "Promise<KulDebugComponentInfo>",
                    docs: "A promise that resolves to a KulDebugComponentInfo object containing debug information.",
                },
                signature: "() => Promise<KulDebugComponentInfo>",
            },
            {
                name: "getProps",
                docs: "Retrieves the properties of the component, with optional descriptions.",
                returns: {
                    type: "Promise<GenericObject<unknown>>",
                    docs: "A promise that resolves to an object where each key is a property name, optionally with its description.",
                },
                signature: "(descriptions?: boolean) => Promise<GenericObject>",
            },
            {
                name: "getValue",
                docs: "Returns the component's internal value.",
                returns: {
                    type: "Promise<File[]>",
                    docs: "",
                },
                signature: "() => Promise<File[]>",
            },
            {
                name: "refresh",
                docs: "Triggers a re-render of the component to reflect any state changes.",
                returns: {
                    type: "Promise<void>",
                    docs: "",
                },
                signature: "() => Promise<void>",
            },
        ],
        props: [
            {
                name: "kulLabel",
                docs: "Sets the button's label.",
                type: "string",
            },
            {
                name: "kulRipple",
                docs: "When set to true, the pointerdown event will trigger a ripple effect.",
                type: "boolean",
            },
            {
                name: "kulStyle",
                docs: "Enables customization of the component's style.",
                type: "string",
            },
            {
                name: "kulValue",
                docs: "Initializes the component with these files.",
                type: "any",
            },
        ],
        styles: [
            {
                name: "--kul-upload-backdrop-filter",
                docs: "Sets the backdrop filter for the upload component. Defaults to a blur effect of 5px.",
            },
            {
                name: "--kul-upload-backdrop-filter-hover",
                docs: "Sets the backdrop filter for the upload component on hover. Defaults to a blur effect of 10px.",
            },
            {
                name: "--kul-upload-border",
                docs: "Sets the border for the upload component. Defaults to a 1px solid border with a color defined by --kul-border-color-rgb.",
            },
            {
                name: "--kul-upload-border-radius",
                docs: "Sets the border radius for the upload component. Defaults to 4px.",
            },
            {
                name: "--kul-upload-button-height",
                docs: "Sets the height of the upload button. Defaults to 42px.",
            },
            {
                name: "--kul-upload-button-text-transform",
                docs: "Sets the text transformation for the upload button. Defaults to uppercase.",
            },
            {
                name: "--kul-upload-grid-gap",
                docs: "Sets the grid gap for the upload component. Defaults to 20px.",
            },
            {
                name: "--kul-upload-info-height",
                docs: "Sets the height of the info section in the upload component. Defaults to 1fr.",
            },
            {
                name: "--kul-upload-padding",
                docs: "Sets the padding for the upload component. Defaults to 1em.",
            },
        ],
    },
};

class Documentation {
    get = {
        methods: (compName) => {
            const component = 'kul-' + compName;
            const nodes = [];
            const docMethods = KUL_DOC[component]
                .methods;
            docMethods.forEach((method) => {
                const node = {
                    children: [],
                    cssStyle: DOC_STYLES.monoPrimaryH3,
                    id: '',
                    value: `${method.name} ${method.signature}`,
                };
                const propDescription = {
                    children: [
                        {
                            id: '',
                            value: method.docs,
                        },
                    ],
                    id: '',
                    value: '',
                };
                node.children.push(propDescription);
                nodes.push(node);
            });
            return nodes;
        },
        props: (compName) => {
            const component = 'kul-' + compName;
            const nodes = [];
            const docProps = KUL_DOC[component].props;
            docProps.forEach((prop) => {
                const node = {
                    children: [],
                    cssStyle: DOC_STYLES.monoPrimaryH3,
                    id: '',
                    value: prop.name,
                };
                const propTitle = {
                    children: [
                        {
                            id: '',
                            value: 'Type:',
                        },
                        {
                            id: '',
                            tagName: 'strong',
                            value: prop.type,
                        },
                    ],
                    id: '',
                    value: '',
                };
                const propDescription = {
                    children: [
                        {
                            id: '',
                            value: prop.docs,
                        },
                    ],
                    id: '',
                    value: '',
                };
                node.children.push(propTitle);
                node.children.push(propDescription);
                nodes.push(node);
            });
            return nodes;
        },
        styles: (compName) => {
            const component = 'kul-' + compName;
            const nodes = [];
            const docStyles = KUL_DOC[component]
                .styles;
            const kulStyle = {
                children: [
                    {
                        id: '',
                        value: 'The component uses Shadow DOM for encapsulation, ensuring that its styles do not leak into the global scope. However, custom styles can be applied using the ',
                    },
                    {
                        id: '',
                        tagName: 'strong',
                        value: 'kulStyle',
                    },
                    {
                        id: '',
                        value: ' property.',
                    },
                    {
                        cells: {
                            kulCode: {
                                shape: 'code',
                                kulLanguage: 'markup',
                                value: `<${component} kul-style="#kul-component { max-height: 20vh; }"></${component}>`,
                            },
                        },
                        id: '',
                        value: '',
                    },
                ],
                id: '',
                tagName: 'strong',
                value: 'kulStyle',
            };
            const listNode = {
                children: [],
                id: '',
                value: 'Additionally, the following CSS variables can be used to customize the appearance of the component:',
            };
            const wrapperNode = {
                children: [],
                id: '',
                value: 'CSS Variables',
            };
            docStyles?.forEach((style) => {
                const styleNode = {
                    children: [
                        {
                            cssStyle: DOC_STYLES.monoPrimaryContent,
                            id: '',
                            tagName: 'strong',
                            value: style.name,
                        },
                        { id: '', value: `: ${style.docs}` },
                    ],
                    id: '',
                    tagName: 'li',
                    value: '',
                };
                listNode.children.push(styleNode);
            });
            nodes.push(kulStyle);
            if (listNode.children.length > 0) {
                nodes.push(wrapperNode);
                wrapperNode.children.push(listNode);
            }
            return nodes;
        },
    };
}
const SHOWCASE_DOC = new Documentation();
class DynamicExampleManager {
    #componentsIds = {};
    styles = {
        custom: [
            '#kul-component { background-color: var(--kul-secondary-color)} ',
            '#kul-component { color: var(--kul-primary-color);} ',
            '#kul-component { border-radius: 8px;} ',
            '#kul-component { box-shadow: 0px 0px 5px var(--kul-shadow-color);} ',
            '#kul-component { transition: all 0.3s ease;} ',
            '#kul-component { opacity: 0.5;} ',
            '#kul-component { text-transform: uppercase;} ',
        ],
        ['state-colors']: [
            '',
            'kul-secondary',
            'kul-info',
            'kul-success',
            'kul-warning',
            'kul-danger',
        ],
        positions: ['', 'kul-top-right', 'kul-bottom-left', 'kul-bottom-right'],
    };
    #getStyle(type, id) {
        if (this.#componentsIds[id] === undefined) {
            this.#componentsIds[id] = 0;
        }
        if (++this.#componentsIds[id] === this.styles[type].length) {
            this.#componentsIds[id] = 0;
        }
        return this.styles[type][this.#componentsIds[id]];
    }
    custom = {
        get: (id) => {
            return this.#getStyle('custom', id);
        },
    };
    position = {
        get: (id) => {
            return this.#getStyle('positions', id);
        },
    };
    stateColors = {
        get: (id) => {
            return this.#getStyle('state-colors', id);
        },
    };
}
const SHOWCASE_DYN_EXAMPLES = new DynamicExampleManager();
function random2digitsNumber() {
    return Math.floor(Math.random() * 99) + 1;
}

export { SHOWCASE_DOC as S, SHOWCASE_DYN_EXAMPLES as a, random2digitsNumber as r };
