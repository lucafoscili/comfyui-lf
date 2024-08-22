import { r as registerInstance, g as getElement, h, F as Fragment } from './index-9570d2db.js';
import { K as KUL_WRAPPER_ID } from './GenericVariables-0efba181.js';
import { D as DOC_STYLES } from './kul-showcase-data-71c18a32.js';

const DATA_DOC = {
    nodes: [
        {
            id: '0',
            value: 'KulData',
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
                                    value: 'KulData',
                                },
                                {
                                    id: '1.1.2',
                                    value: ' is part of the KulManager class and serves as the foundation for dataset management and manipulation.',
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

const kulShowcaseKuldataCss = ".ripple-surface{cursor:pointer;height:100%;left:0;overflow:hidden;position:absolute;top:0;width:100%}.ripple{animation:ripple 0.675s ease-out;border-radius:50%;pointer-events:none;position:absolute;transform:scale(0)}@keyframes ripple{to{opacity:0;transform:scale(4)}}::-webkit-scrollbar{width:9px}::-webkit-scrollbar-thumb{background-color:var(--kul-primary-color);-webkit-transition:background-color 0.2s ease-in-out;transition:background-color 0.2s ease-in-out}::-webkit-scrollbar-track{background-color:var(--kul-background-color)}:host{display:block;height:100%;width:100%}";
const KulShowcaseKuldataStyle0 = kulShowcaseKuldataCss;

const KulShowcaseKuldata = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get rootElement() { return getElement(this); }
    /*-------------------------------------------------*/
    /*          L i f e c y c l e   H o o k s          */
    /*-------------------------------------------------*/
    render() {
        return (h(Fragment, { key: 'bca1ec529723778e79cfaa46fa569602b50feb85' }, h("div", { key: '65f25ebb4a65a0cdd20a8cdc14f2d3a649df8668', id: KUL_WRAPPER_ID }, h("kul-article", { key: 'be4d22c516ef70134a41b7a6e9aa4cf2d0c93617', kulData: DATA_DOC }))));
    }
};
KulShowcaseKuldata.style = KulShowcaseKuldataStyle0;

export { KulShowcaseKuldata as kul_showcase_kuldata };
