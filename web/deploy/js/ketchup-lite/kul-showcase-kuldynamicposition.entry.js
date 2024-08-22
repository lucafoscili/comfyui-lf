import { r as registerInstance, g as getElement, h, F as Fragment } from './index-9570d2db.js';
import { K as KUL_WRAPPER_ID } from './GenericVariables-0efba181.js';
import { D as DOC_STYLES } from './kul-showcase-data-71c18a32.js';

const DYNAMIC_POSITION_DATA = {
    nodes: [
        {
            id: '0',
            value: 'KulDynamicPosition',
            children: [
                {
                    id: '1',
                    value: 'Overview',
                    children: [
                        {
                            children: [
                                {
                                    id: '1.1.1',
                                    tagName: 'strong',
                                    value: 'KulDynamicPosition',
                                },
                                {
                                    id: '1.1.2',
                                    value: ' is part of the KulManager class and is a tool that helps in managing dynamic elements, such as dropdown menus.',
                                },
                            ],
                            id: '1.1',
                            value: '',
                        },
                    ],
                },
                {
                    children: [
                        {
                            children: [
                                {
                                    id: '',
                                    cssStyle: DOC_STYLES.underConstruction,
                                    value: 'This page is under construction.',
                                },
                                {
                                    cells: {
                                        kulImage: {
                                            kulSizeX: '128px',
                                            kulSizeY: '128px',
                                            shape: 'image',
                                            value: 'science',
                                        },
                                    },
                                    id: '',
                                    value: '',
                                },
                            ],
                            id: '',
                            value: '',
                        },
                    ],
                    id: '',
                    value: '',
                },
            ],
        },
    ],
};

const kulShowcaseKuldynamicpositionCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}:host{display:block;height:100%;width:100%}";
const KulShowcaseKuldynamicpositionStyle0 = kulShowcaseKuldynamicpositionCss;

const KulShowcaseKuldynamicposition = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get rootElement() { return getElement(this); }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    render() {
        return (h(Fragment, { key: 'b7f36d9c368d21f303cba761d43697b15b411a35' }, h("div", { key: '66d0c6e30905065739c4eb49e46cd8bab49e7a99', id: KUL_WRAPPER_ID }, h("kul-article", { key: '26948e1fe1f74e1d4927537f7aee2e4e2d43f807', kulData: DYNAMIC_POSITION_DATA }))));
    }
};
KulShowcaseKuldynamicposition.style = KulShowcaseKuldynamicpositionStyle0;

export { KulShowcaseKuldynamicposition as kul_showcase_kuldynamicposition };
