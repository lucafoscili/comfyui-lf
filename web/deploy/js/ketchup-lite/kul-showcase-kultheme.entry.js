import { r as registerInstance, g as getElement, h, F as Fragment } from './index-9570d2db.js';
import { K as KUL_WRAPPER_ID } from './GenericVariables-0efba181.js';
import { D as DOC_STYLES } from './kul-showcase-data-71c18a32.js';

const THEME_DATA = {
    nodes: [
        {
            id: '0',
            value: 'KulTheme',
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
                                    value: 'KulTheme',
                                },
                                {
                                    id: '1.1.2',
                                    value: " is a component of the KulManager class and serves as the core of the library's design system.",
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

const kulShowcaseKulthemeCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}:host{display:block;height:100%;width:100%}";
const KulShowcaseKulthemeStyle0 = kulShowcaseKulthemeCss;

const KulShowcaseKultheme = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get rootElement() { return getElement(this); }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    render() {
        return (h(Fragment, { key: 'ab432f259f0f40823a0981cd8e8a74ed43ce5afc' }, h("div", { key: '1c5fd85692ee5415874069ed98f5f47aa6fc34b8', id: KUL_WRAPPER_ID }, h("kul-article", { key: '108e0eda149111f0d5844280b17e5bab066eba08', kulData: THEME_DATA }))));
    }
};
KulShowcaseKultheme.style = KulShowcaseKulthemeStyle0;

export { KulShowcaseKultheme as kul_showcase_kultheme };
