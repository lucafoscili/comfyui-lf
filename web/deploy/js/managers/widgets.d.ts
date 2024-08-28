export declare class LFWidgets {
    #private;
    constructor();
    add: {
        controlPanel: (nodeType: NodeType) => any;
        code: (nodeType: NodeType) => any;
    };
    option: {
        code: (code: HTMLKulCodeElement) => {
            hideOnZoom: boolean;
            getComp(): HTMLKulCodeElement;
            getProps(): Promise<import("../types/ketchup-lite/components.js").GenericObject<unknown>>;
            getValue(): string;
            refresh: () => void;
            setProps(props: Partial<HTMLKulCodeElement>): void;
            setValue(value: Record<string, unknown> | string): void;
        };
    };
    set: {
        controlPanel: () => {
            KUL_CONTROL_PANEL: (nodeType: NodeType, name: string) => {
                widget: Widget;
            };
        };
        code: () => {
            KUL_CODE: (nodeType: NodeType, name: string) => {
                widget: Widget;
            };
        };
    };
    get: {
        adders: {
            controlPanel: (nodeType: NodeType) => any;
            code: (nodeType: NodeType) => any;
        };
        options: {
            code: (code: HTMLKulCodeElement) => {
                hideOnZoom: boolean;
                getComp(): HTMLKulCodeElement;
                getProps(): Promise<import("../types/ketchup-lite/components.js").GenericObject<unknown>>;
                getValue(): string;
                refresh: () => void;
                setProps(props: Partial<HTMLKulCodeElement>): void;
                setValue(value: Record<string, unknown> | string): void;
            };
        };
        setters: {
            controlPanel: () => {
                KUL_CONTROL_PANEL: (nodeType: NodeType, name: string) => {
                    widget: Widget;
                };
            };
            code: () => {
                KUL_CODE: (nodeType: NodeType, name: string) => {
                    widget: Widget;
                };
            };
        };
    };
}
