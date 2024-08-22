import { r as registerInstance, g as getElement, h, F as Fragment } from './index-9570d2db.js';
import { K as KUL_WRAPPER_ID } from './GenericVariables-0efba181.js';
import { D as DOC_STYLES } from './kul-showcase-data-71c18a32.js';

const LANGUAGE_DATA = {
    nodes: [
        {
            id: '0',
            value: 'KulLanguage',
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
                                    value: 'KulLanguage',
                                },
                                {
                                    id: '1.1.2',
                                    value: ' is a component of the KulManager class and serves as the fundamental basis of localization for the library.',
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

const kulShowcaseKullanguageCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}:host{display:block;height:100%;width:100%}";
const KulShowcaseKullanguageStyle0 = kulShowcaseKullanguageCss;

const KulShowcaseKullanguage = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get rootElement() { return getElement(this); }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    render() {
        return (h(Fragment, { key: '476ea3a789490c153518bf6f8e7bc2325a2d9b26' }, h("div", { key: 'd5c0a874db883538b2065a681ad19f7990ef3575', id: KUL_WRAPPER_ID }, h("kul-article", { key: '348712cc768c80d4aedd942b20c589089e689826', kulData: LANGUAGE_DATA }))));
    }
};
KulShowcaseKullanguage.style = KulShowcaseKullanguageStyle0;

export { KulShowcaseKullanguage as kul_showcase_kullanguage };
