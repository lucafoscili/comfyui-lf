import { h, a as getAssetPath, c as setAssetPath } from './index-64e8bec6.js';

var KulDataCyAttributes;
(function (KulDataCyAttributes) {
    KulDataCyAttributes["BUTTON"] = "button";
    KulDataCyAttributes["CHECK"] = "check";
    KulDataCyAttributes["DROPDOWN_BUTTON"] = "dropdown-button";
    KulDataCyAttributes["DROPDOWN_MENU"] = "dropdown-menu";
    KulDataCyAttributes["INPUT"] = "input";
    KulDataCyAttributes["NODE"] = "node";
    KulDataCyAttributes["RIPPLE"] = "ripple";
    KulDataCyAttributes["SHAPE"] = "shape";
    KulDataCyAttributes["SHOWCASE_GRID_WRAPPER"] = "wrapper";
})(KulDataCyAttributes || (KulDataCyAttributes = {}));

const findNodeByCell = (dataset, targetCell) => {
    function recursive(nodes) {
        for (const node of nodes) {
            if (node.cells) {
                for (const cellKey in node.cells) {
                    if (node.cells[cellKey] === targetCell) {
                        return node;
                    }
                }
            }
            if (node.children) {
                const foundNode = recursive(node.children);
                if (foundNode)
                    return foundNode;
            }
        }
        return null;
    }
    return recursive(dataset.nodes);
};
const nodeExists = (dataset) => {
    return !!(dataset && dataset.nodes?.length);
};
const nodeFilter = (dataset, filters, partialMatch = false) => {
    const matchingNodes = new Set();
    const remainingNodes = new Set();
    const ancestorNodes = new Set();
    const recursive = (node, ancestor, ancestorSet) => {
        const hasChildren = node.children?.length;
        let matches = false;
        for (const key in filters) {
            const nodeValue = node[key];
            const filterValue = filters[key];
            const nodeValueStr = cellStringify(nodeValue).toLowerCase();
            const filterValueStr = cellStringify(filterValue).toLowerCase();
            if (partialMatch) {
                if (!nodeValueStr.includes(filterValueStr)) {
                    continue;
                }
            }
            else {
                if (nodeValue !== filterValue) {
                    continue;
                }
            }
            matches = true;
            break;
        }
        if (ancestor) {
            ancestorSet.add(ancestor);
        }
        if (matches) {
            matchingNodes.add(node);
        }
        else {
            remainingNodes.add(node);
        }
        if (hasChildren) {
            node.children.forEach((child) => {
                recursive(child, node, ancestorSet);
            });
        }
        else {
            if (matches) {
                ancestorSet.forEach((node) => {
                    ancestorNodes.add(node);
                });
            }
        }
    };
    dataset.nodes.forEach((node) => {
        const ancestorSet = new Set();
        recursive(node, null, ancestorSet);
    });
    return {
        matchingNodes,
        remainingNodes,
        ancestorNodes,
    };
};
const nodeFixIds = (nodes) => {
    function updateNodeIds(node, depth = "0") {
        node.id = depth;
        if (node.children) {
            node.children.forEach((child, index) => {
                const newDepth = `${depth}.${index}`;
                updateNodeIds(child, newDepth);
            });
        }
    }
    nodes.forEach((node) => {
        updateNodeIds(node, "0");
    });
    return nodes;
};
const nodeGetDrilldownInfo = (nodes) => {
    let maxChildren = 0;
    let maxDepth = 0;
    const getDepth = function (n) {
        const depth = 0;
        if (n.children) {
            n.children.forEach(function (d) {
                getDepth(d);
            });
        }
        return depth;
    };
    const recursive = (arr) => {
        maxDepth++;
        for (let index = 0; index < arr.length; index++) {
            const node = arr[index];
            getDepth(node);
            if (Array.isArray(node.children) && maxChildren < node.children.length) {
                maxChildren = node.children.length;
                recursive(node.children);
            }
        }
    };
    recursive(nodes);
    return {
        maxChildren,
        maxDepth,
    };
};
const nodeGetParent = (nodes, child) => {
    let parent = null;
    for (let index = 0; index < nodes.length; index++) {
        const node = nodes[index];
        recursive(node);
        // Recursive function to traverse nodes and find the parent node
        function recursive(node) {
            const hasChildren = !!node.children;
            if (hasChildren && node.children.includes(child)) {
                parent = node;
                return;
            }
            for (let index = 0; !parent && hasChildren && index < node.children.length; index++) {
                recursive(node.children[index]);
            }
        }
    }
    return parent;
};
const nodePop = (nodes, node2remove) => {
    let removed = null;
    for (let index = 0; index < nodes.length; index++) {
        recursive(nodes[index], nodes);
        function recursive(node, array) {
            const i = array.indexOf(node2remove);
            if (i > -1) {
                removed = { ...node2remove };
                array.splice(i, 1);
                return;
            }
            for (let index = 0; node.children && index < node.children.length; index++) {
                if (node.children[index]) {
                    recursive(node.children[index], node.children);
                }
            }
        }
    }
    return removed;
};
const nodeSetProperties = (nodes, properties, recursively, exclude) => {
    const updated = [];
    if (!exclude) {
        exclude = [];
    }
    if (recursively) {
        nodes = nodeToStream(nodes);
    }
    for (let index = 0; index < nodes.length; index++) {
        const node = nodes[index];
        for (const key in properties) {
            if (!exclude.includes(node)) {
                node[key] = properties[key];
                updated.push(node);
            }
        }
    }
    return updated;
};
const nodeToStream = (nodes) => {
    function recursive(node) {
        streamlined.push(node);
        for (let index = 0; node.children && index < node.children.length; index++) {
            recursive(node.children[index]);
        }
    }
    const streamlined = [];
    for (let index = 0; index < nodes.length; index++) {
        const node = nodes[index];
        recursive(node);
    }
    return streamlined;
};

const decorateSpreader = (toSpread, props) => {
    const clean = () => {
        if (toSpread["value"] && !toSpread["kulValue"]) {
            toSpread["kulValue"] = toSpread["value"];
        }
        else if (toSpread["kulValue"] && !toSpread["value"]) {
            toSpread["value"] = toSpread["kulValue"];
        }
        delete toSpread["htmlProps"];
        delete toSpread["shape"];
        delete toSpread["value"];
    };
    if (props.htmlProps) {
        for (const key in props.htmlProps) {
            const prop = props.htmlProps[key];
            if (key === "className") {
                toSpread["class"] = prop;
            }
            else {
                toSpread[key] = prop;
            }
            if (key === "dataset") {
                for (const k in prop) {
                    toSpread[`data-${k}`] = prop[k];
                }
            }
        }
    }
    for (const key in props) {
        const prop = props[key];
        toSpread[key] = prop;
    }
    clean();
};
const cellDecorateShapes = (component, shape, items, eventDispatcher, defaultProps, defaultCb) => {
    const r = { element: [], ref: [] };
    switch (shape) {
        case "number":
        case "text":
            for (let index = 0; items && index < items.length; index++) {
                const props = items[index].value;
                r.element.push(h("div", { id: `${shape}${index}`, ref: (el) => {
                        if (el) {
                            r.ref.push(el);
                        }
                    } }, props));
            }
            return r;
        default:
            for (let index = 0; items && index < items.length; index++) {
                const props = items[index];
                const toSpread = {};
                if (defaultProps?.[index]) {
                    decorateSpreader(toSpread, defaultProps[index]);
                }
                decorateSpreader(toSpread, props);
                const TagName = "kul-" + shape;
                const eventHandler = {
                    ["onKul-" + shape + "-event"]: (e) => {
                        if (defaultCb) {
                            defaultCb(e);
                        }
                        eventDispatcher(e);
                    },
                };
                r.element.push(h(TagName, { "data-component": component, "data-cy": KulDataCyAttributes.SHAPE, id: `${shape}${index}`, ref: (el) => {
                        if (el) {
                            r.ref.push(el);
                        }
                    }, ...eventHandler, ...toSpread }));
            }
            break;
    }
    return r;
};
const cellExists = (node) => {
    return !!(node && node.cells && Object.keys(node.cells).length);
};
const cellGetShape = (cell, deepCopy) => {
    if (!deepCopy) {
        return cell;
    }
    const prefix = "kul";
    const shapeProps = {};
    for (const prop in cell) {
        switch (prop) {
            case "htmlProps":
                Object.assign(shapeProps, cell[prop]);
                break;
            case "shape":
                break;
            default:
                if (prop.indexOf(prefix) === 0) {
                    shapeProps[prop] = cell[prop];
                }
                else {
                    const prefixedProp = prefix + prop.charAt(0).toUpperCase() + prop.slice(1);
                    if (!shapeProps[prefixedProp]) {
                        shapeProps[prefixedProp] = cell[prop];
                    }
                }
                break;
        }
    }
    return shapeProps;
};
const cellGetAllShapes = (dataset, deepCopy = true) => {
    if (!nodeExists(dataset)) {
        return;
    }
    const shapes = {
        badge: [],
        button: [],
        card: [],
        chart: [],
        chat: [],
        chip: [],
        code: [],
        image: [],
        number: [],
        toggle: [],
        text: [],
        upload: [],
    };
    const nodes = dataset.nodes;
    const browseCells = (node) => {
        if (!cellExists(node)) {
            return;
        }
        const cells = node.cells;
        for (const key in cells) {
            if (Object.prototype.hasOwnProperty.call(cells, key)) {
                const cell = cells[key];
                const extracted = cellGetShape(cell, deepCopy);
                switch (cell.shape) {
                    case "badge":
                        shapes.badge.push(extracted);
                        break;
                    case "button":
                        shapes.button.push(extracted);
                        break;
                    case "card":
                        shapes.card.push(extracted);
                        break;
                    case "chart":
                        shapes.chart.push(extracted);
                        break;
                    case "chat":
                        shapes.chat.push(extracted);
                        break;
                    case "chip":
                        shapes.chip.push(extracted);
                        break;
                    case "code":
                        shapes.code.push(extracted);
                        break;
                    case "image":
                        shapes.image.push(extracted);
                        break;
                    case "toggle":
                        shapes.toggle.push(extracted);
                        break;
                    case "number":
                        shapes.number.push(cell);
                        break;
                    case "upload":
                        shapes.upload.push(extracted);
                        break;
                    case "text":
                    default:
                        shapes.text.push(cell);
                        break;
                }
            }
        }
    };
    for (let index = 0; index < nodes.length; index++) {
        const node = nodes[index];
        browseCells(node);
    }
    return shapes;
};
const cellStringify = (value) => {
    if (value === null || value === undefined) {
        return String(value).valueOf();
    }
    else if (value instanceof Date) {
        return value.toISOString();
    }
    else if (typeof value === "object") {
        try {
            return JSON.stringify(value, null, 2);
        }
        catch (error) {
            console.error("Failed to stringify object:", error);
            return "[object Object]";
        }
    }
    else {
        return String(value).valueOf();
    }
};

const columnFind = (dataset, filters) => {
    const result = [];
    if (!dataset) {
        return result;
    }
    const columns = dataset.columns
        ? dataset.columns
        : dataset;
    for (let index = 0; index < columns.length; index++) {
        const column = columns[index];
        for (const key in filters) {
            const filter = filters[key];
            if (column[key] === filter) {
                result.push(column);
            }
        }
    }
    return result;
};

var __classPrivateFieldGet$5 = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _KulData_SHAPES_MAP;
class KulData {
    constructor() {
        _KulData_SHAPES_MAP.set(this, {
            badge: "KulBadge",
            button: "KulButton",
            card: "KulCard",
            chart: "KulChart",
            chat: "KulChat",
            chip: "KulChip",
            code: "KulCode",
            image: "KulImage",
            number: "KulTextfield",
            toggle: "KulToggle",
            text: "KulTextfield",
            upload: "KulUpload",
        });
        this.cell = {
            exists: (node) => cellExists(node),
            shapes: {
                decorate: (shape, items, eventDispatcher, defaultProps, defaultCb) => cellDecorateShapes(__classPrivateFieldGet$5(this, _KulData_SHAPES_MAP, "f")[shape], shape, items, eventDispatcher, defaultProps, defaultCb),
                get: (cell, deepCopy = true) => cellGetShape(cell, deepCopy),
                getAll: (dataset, deepCopy = true) => cellGetAllShapes(dataset, deepCopy),
            },
            stringify: (value) => cellStringify(value),
        };
        this.column = {
            find: (dataset, filters) => columnFind(dataset, filters),
        };
        this.node = {
            exists: (dataset) => nodeExists(dataset),
            filter: (dataset, filters, partialMatch = false) => nodeFilter(dataset, filters, partialMatch),
            findNodeByCell: (dataset, cell) => findNodeByCell(dataset, cell),
            fixIds: (nodes) => nodeFixIds(nodes),
            getDrilldownInfo: (nodes) => nodeGetDrilldownInfo(nodes),
            getParent: (nodes, child) => nodeGetParent(nodes, child),
            pop: (nodes, node2remove) => nodePop(nodes, node2remove),
            removeNodeByCell: (dataset, cell) => findNodeByCell(dataset, cell),
            setProperties: (nodes, properties, recursively, exclude) => nodeSetProperties(nodes, properties, recursively, exclude),
            toStream: (nodes) => nodeToStream(nodes),
        };
    }
}
_KulData_SHAPES_MAP = new WeakMap();

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var dayjs_min = {exports: {}};

(function (module, exports) {
!function(t,e){module.exports=e();}(commonjsGlobal,(function(){var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",c="month",f="quarter",h="year",d="date",l="Invalid Date",$=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return "["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var r=String(t);return !r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},v={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return (e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return -t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,c),s=n-i<0,u=e.clone().add(r+(s?-1:1),c);return +(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return {M:c,y:h,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:f}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},g="en",D={};D[g]=M;var p="$isDayjsObject",S=function(t){return t instanceof _||!(!t||!t[p])},w=function t(e,n,r){var i;if(!e)return g;if("string"==typeof e){var s=e.toLowerCase();D[s]&&(i=s),n&&(D[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else {var a=e.name;D[a]=e,i=a;}return !r&&i&&(g=i),i||!r&&g},O=function(t,e){if(S(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},b=v;b.l=w,b.i=S,b.w=function(t,e){return O(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=w(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[p]=!0;}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(b.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match($);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.init();},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds();},m.$utils=function(){return b},m.isValid=function(){return !(this.$d.toString()===l)},m.isSame=function(t,e){var n=O(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return O(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<O(t)},m.$g=function(t,e,n){return b.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!b.u(e)||e,f=b.p(t),l=function(t,e){var i=b.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},$=function(t,e){return b.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,v="set"+(this.$u?"UTC":"");switch(f){case h:return r?l(1,0):l(31,11);case c:return r?l(1,M):l(0,M+1);case o:var g=this.$locale().weekStart||0,D=(y<g?y+7:y)-g;return l(r?m-D:m+(6-D),M);case a:case d:return $(v+"Hours",0);case u:return $(v+"Minutes",1);case s:return $(v+"Seconds",2);case i:return $(v+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=b.p(t),f="set"+(this.$u?"UTC":""),l=(n={},n[a]=f+"Date",n[d]=f+"Date",n[c]=f+"Month",n[h]=f+"FullYear",n[u]=f+"Hours",n[s]=f+"Minutes",n[i]=f+"Seconds",n[r]=f+"Milliseconds",n)[o],$=o===a?this.$D+(e-this.$W):e;if(o===c||o===h){var y=this.clone().set(d,1);y.$d[l]($),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d;}else l&&this.$d[l]($);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[b.p(t)]()},m.add=function(r,f){var d,l=this;r=Number(r);var $=b.p(f),y=function(t){var e=O(l);return b.w(e.date(e.date()+Math.round(t*r)),l)};if($===c)return this.set(c,this.$M+r);if($===h)return this.set(h,this.$y+r);if($===a)return y(1);if($===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[$]||1,m=this.$d.getTime()+r*M;return b.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||l;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=b.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,c=n.months,f=n.meridiem,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s)},d=function(t){return b.s(s%12||12,t,"0")},$=f||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r};return r.replace(y,(function(t,r){return r||function(t){switch(t){case"YY":return String(e.$y).slice(-2);case"YYYY":return b.s(e.$y,4,"0");case"M":return a+1;case"MM":return b.s(a+1,2,"0");case"MMM":return h(n.monthsShort,a,c,3);case"MMMM":return h(c,a);case"D":return e.$D;case"DD":return b.s(e.$D,2,"0");case"d":return String(e.$W);case"dd":return h(n.weekdaysMin,e.$W,o,2);case"ddd":return h(n.weekdaysShort,e.$W,o,3);case"dddd":return o[e.$W];case"H":return String(s);case"HH":return b.s(s,2,"0");case"h":return d(1);case"hh":return d(2);case"a":return $(s,u,!0);case"A":return $(s,u,!1);case"m":return String(u);case"mm":return b.s(u,2,"0");case"s":return String(e.$s);case"ss":return b.s(e.$s,2,"0");case"SSS":return b.s(e.$ms,3,"0");case"Z":return i}return null}(t)||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,l){var $,y=this,M=b.p(d),m=O(r),v=(m.utcOffset()-this.utcOffset())*e,g=this-m,D=function(){return b.m(y,m)};switch(M){case h:$=D()/12;break;case c:$=D();break;case f:$=D()/3;break;case o:$=(g-v)/6048e5;break;case a:$=(g-v)/864e5;break;case u:$=g/n;break;case s:$=g/e;break;case i:$=g/t;break;default:$=g;}return l?$:b.a($)},m.daysInMonth=function(){return this.endOf(c).$D},m.$locale=function(){return D[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=w(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return b.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),k=_.prototype;return O.prototype=k,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",c],["$y",h],["$D",d]].forEach((function(t){k[t[1]]=function(e){return this.$g(e,t[0],t[1])};})),O.extend=function(t,e){return t.$i||(t(e,_,O),t.$i=!0),O},O.locale=w,O.isDayjs=S,O.unix=function(t){return O(1e3*t)},O.en=D[g],O.Ls=D,O.p={},O}));
}(dayjs_min));

const dayjs = dayjs_min.exports;

var customParseFormat$1 = {exports: {}};

(function (module, exports) {
!function(e,t){module.exports=t();}(commonjsGlobal,(function(){var e={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},t=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,n=/\d/,r=/\d\d/,i=/\d\d?/,o=/\d*[^-_:/,()\s\d]+/,s={},a=function(e){return (e=+e)+(e>68?1900:2e3)};var f=function(e){return function(t){this[e]=+t;}},h=[/[+-]\d\d:?(\d\d)?|Z/,function(e){(this.zone||(this.zone={})).offset=function(e){if(!e)return 0;if("Z"===e)return 0;var t=e.match(/([+-]|\d\d)/g),n=60*t[1]+(+t[2]||0);return 0===n?0:"+"===t[0]?-n:n}(e);}],u=function(e){var t=s[e];return t&&(t.indexOf?t:t.s.concat(t.f))},d=function(e,t){var n,r=s.meridiem;if(r){for(var i=1;i<=24;i+=1)if(e.indexOf(r(i,0,t))>-1){n=i>12;break}}else n=e===(t?"pm":"PM");return n},c={A:[o,function(e){this.afternoon=d(e,!1);}],a:[o,function(e){this.afternoon=d(e,!0);}],Q:[n,function(e){this.month=3*(e-1)+1;}],S:[n,function(e){this.milliseconds=100*+e;}],SS:[r,function(e){this.milliseconds=10*+e;}],SSS:[/\d{3}/,function(e){this.milliseconds=+e;}],s:[i,f("seconds")],ss:[i,f("seconds")],m:[i,f("minutes")],mm:[i,f("minutes")],H:[i,f("hours")],h:[i,f("hours")],HH:[i,f("hours")],hh:[i,f("hours")],D:[i,f("day")],DD:[r,f("day")],Do:[o,function(e){var t=s.ordinal,n=e.match(/\d+/);if(this.day=n[0],t)for(var r=1;r<=31;r+=1)t(r).replace(/\[|\]/g,"")===e&&(this.day=r);}],w:[i,f("week")],ww:[r,f("week")],M:[i,f("month")],MM:[r,f("month")],MMM:[o,function(e){var t=u("months"),n=(u("monthsShort")||t.map((function(e){return e.slice(0,3)}))).indexOf(e)+1;if(n<1)throw new Error;this.month=n%12||n;}],MMMM:[o,function(e){var t=u("months").indexOf(e)+1;if(t<1)throw new Error;this.month=t%12||t;}],Y:[/[+-]?\d+/,f("year")],YY:[r,function(e){this.year=a(e);}],YYYY:[/\d{4}/,f("year")],Z:h,ZZ:h};function l(n){var r,i;r=n,i=s&&s.formats;for(var o=(n=r.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,(function(t,n,r){var o=r&&r.toUpperCase();return n||i[r]||e[r]||i[o].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,(function(e,t,n){return t||n.slice(1)}))}))).match(t),a=o.length,f=0;f<a;f+=1){var h=o[f],u=c[h],d=u&&u[0],l=u&&u[1];o[f]=l?{regex:d,parser:l}:h.replace(/^\[|\]$/g,"");}return function(e){for(var t={},n=0,r=0;n<a;n+=1){var i=o[n];if("string"==typeof i)r+=i.length;else {var s=i.regex,f=i.parser,h=e.slice(r),u=s.exec(h)[0];f.call(t,u),e=e.replace(u,"");}}return function(e){var t=e.afternoon;if(void 0!==t){var n=e.hours;t?n<12&&(e.hours+=12):12===n&&(e.hours=0),delete e.afternoon;}}(t),t}}return function(e,t,n){n.p.customParseFormat=!0,e&&e.parseTwoDigitYear&&(a=e.parseTwoDigitYear);var r=t.prototype,i=r.parse;r.parse=function(e){var t=e.date,r=e.utc,o=e.args;this.$u=r;var a=o[1];if("string"==typeof a){var f=!0===o[2],h=!0===o[3],u=f||h,d=o[2];h&&(d=o[2]),s=this.$locale(),!f&&d&&(s=n.Ls[d]),this.$d=function(e,t,n,r){try{if(["x","X"].indexOf(t)>-1)return new Date(("X"===t?1e3:1)*e);var i=l(t)(e),o=i.year,s=i.month,a=i.day,f=i.hours,h=i.minutes,u=i.seconds,d=i.milliseconds,c=i.zone,m=i.week,M=new Date,Y=a||(o||s?1:M.getDate()),p=o||M.getFullYear(),v=0;o&&!s||(v=s>0?s-1:M.getMonth());var D,w=f||0,g=h||0,y=u||0,L=d||0;return c?new Date(Date.UTC(p,v,Y,w,g,y,L+60*c.offset*1e3)):n?new Date(Date.UTC(p,v,Y,w,g,y,L)):(D=new Date(p,v,Y,w,g,y,L),m&&(D=r(D).week(m).toDate()),D)}catch(e){return new Date("")}}(t,a,r,n),this.init(),d&&!0!==d&&(this.$L=this.locale(d).$L),u&&t!=this.format(a)&&(this.$d=new Date("")),s={};}else if(a instanceof Array)for(var c=a.length,m=1;m<=c;m+=1){o[1]=a[m-1];var M=n.apply(this,o);if(M.isValid()){this.$d=M.$d,this.$L=M.$L,this.init();break}m===c&&(this.$d=new Date(""));}else i.call(this,e);};}}));
}(customParseFormat$1));

const customParseFormat = customParseFormat$1.exports;

var localizedFormat$1 = {exports: {}};

(function (module, exports) {
!function(e,t){module.exports=t();}(commonjsGlobal,(function(){var e={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"};return function(t,o,n){var r=o.prototype,i=r.format;n.en.formats=e,r.format=function(t){void 0===t&&(t="YYYY-MM-DDTHH:mm:ssZ");var o=this.$locale().formats,n=function(t,o){return t.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,(function(t,n,r){var i=r&&r.toUpperCase();return n||o[r]||e[r]||o[i].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,(function(e,t,o){return t||o.slice(1)}))}))}(t,void 0===o?{}:o);return i.call(this,n)};}}));
}(localizedFormat$1));

const localizedFormat = localizedFormat$1.exports;

var minMax$1 = {exports: {}};

(function (module, exports) {
!function(e,n){module.exports=n();}(commonjsGlobal,(function(){return function(e,n,t){var i=function(e,n){if(!n||!n.length||1===n.length&&!n[0]||1===n.length&&Array.isArray(n[0])&&!n[0].length)return null;var t;1===n.length&&n[0].length>0&&(n=n[0]);t=(n=n.filter((function(e){return e})))[0];for(var i=1;i<n.length;i+=1)n[i].isValid()&&!n[i][e](t)||(t=n[i]);return t};t.max=function(){var e=[].slice.call(arguments,0);return i("isAfter",e)},t.min=function(){var e=[].slice.call(arguments,0);return i("isBefore",e)};}}));
}(minMax$1));

const minMax = minMax$1.exports;

var es = {exports: {}};

(function (module, exports) {
!function(e,o){module.exports=o(dayjs_min.exports);}(commonjsGlobal,(function(e){function o(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var s=o(e),d={name:"es",monthsShort:"ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),weekdays:"domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),weekdaysShort:"dom._lun._mar._mié._jue._vie._sáb.".split("_"),weekdaysMin:"do_lu_ma_mi_ju_vi_sá".split("_"),months:"enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),weekStart:1,formats:{LT:"H:mm",LTS:"H:mm:ss",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY H:mm",LLLL:"dddd, D [de] MMMM [de] YYYY H:mm"},relativeTime:{future:"en %s",past:"hace %s",s:"unos segundos",m:"un minuto",mm:"%d minutos",h:"una hora",hh:"%d horas",d:"un día",dd:"%d días",M:"un mes",MM:"%d meses",y:"un año",yy:"%d años"},ordinal:function(e){return e+"º"}};return s.default.locale(d,null,!0),d}));
}(es));

var fr = {exports: {}};

(function (module, exports) {
!function(e,n){module.exports=n(dayjs_min.exports);}(commonjsGlobal,(function(e){function n(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var t=n(e),i={name:"fr",weekdays:"dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),weekdaysShort:"dim._lun._mar._mer._jeu._ven._sam.".split("_"),weekdaysMin:"di_lu_ma_me_je_ve_sa".split("_"),months:"janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),monthsShort:"janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),weekStart:1,yearStart:4,formats:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},relativeTime:{future:"dans %s",past:"il y a %s",s:"quelques secondes",m:"une minute",mm:"%d minutes",h:"une heure",hh:"%d heures",d:"un jour",dd:"%d jours",M:"un mois",MM:"%d mois",y:"un an",yy:"%d ans"},ordinal:function(e){return ""+e+(1===e?"er":"")}};return t.default.locale(i,null,!0),i}));
}(fr));

var it = {exports: {}};

(function (module, exports) {
!function(e,o){module.exports=o(dayjs_min.exports);}(commonjsGlobal,(function(e){function o(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var t=o(e),n={name:"it",weekdays:"domenica_lunedì_martedì_mercoledì_giovedì_venerdì_sabato".split("_"),weekdaysShort:"dom_lun_mar_mer_gio_ven_sab".split("_"),weekdaysMin:"do_lu_ma_me_gi_ve_sa".split("_"),months:"gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre".split("_"),weekStart:1,monthsShort:"gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic".split("_"),formats:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},relativeTime:{future:"tra %s",past:"%s fa",s:"qualche secondo",m:"un minuto",mm:"%d minuti",h:"un' ora",hh:"%d ore",d:"un giorno",dd:"%d giorni",M:"un mese",MM:"%d mesi",y:"un anno",yy:"%d anni"},ordinal:function(e){return e+"º"}};return t.default.locale(n,null,!0),n}));
}(it));

var pl = {exports: {}};

(function (module, exports) {
!function(e,t){module.exports=t(dayjs_min.exports);}(commonjsGlobal,(function(e){function t(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var i=t(e);function a(e){return e%10<5&&e%10>1&&~~(e/10)%10!=1}function n(e,t,i){var n=e+" ";switch(i){case"m":return t?"minuta":"minutę";case"mm":return n+(a(e)?"minuty":"minut");case"h":return t?"godzina":"godzinę";case"hh":return n+(a(e)?"godziny":"godzin");case"MM":return n+(a(e)?"miesiące":"miesięcy");case"yy":return n+(a(e)?"lata":"lat")}}var r="stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia".split("_"),_="styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień".split("_"),s=/D MMMM/,d=function(e,t){return s.test(t)?r[e.month()]:_[e.month()]};d.s=_,d.f=r;var o={name:"pl",weekdays:"niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota".split("_"),weekdaysShort:"ndz_pon_wt_śr_czw_pt_sob".split("_"),weekdaysMin:"Nd_Pn_Wt_Śr_Cz_Pt_So".split("_"),months:d,monthsShort:"sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru".split("_"),ordinal:function(e){return e+"."},weekStart:1,yearStart:4,relativeTime:{future:"za %s",past:"%s temu",s:"kilka sekund",m:n,mm:n,h:n,hh:n,d:"1 dzień",dd:"%d dni",M:"miesiąc",MM:n,y:"rok",yy:n},formats:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"}};return i.default.locale(o,null,!0),o}));
}(pl));

var ru = {exports: {}};

(function (module, exports) {
!function(_,t){module.exports=t(dayjs_min.exports);}(commonjsGlobal,(function(_){function t(_){return _&&"object"==typeof _&&"default"in _?_:{default:_}}var e=t(_),n="января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря".split("_"),s="январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_"),r="янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.".split("_"),o="янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.".split("_"),i=/D[oD]?(\[[^[\]]*\]|\s)+MMMM?/;function d(_,t,e){var n,s;return "m"===e?t?"минута":"минуту":_+" "+(n=+_,s={mm:t?"минута_минуты_минут":"минуту_минуты_минут",hh:"час_часа_часов",dd:"день_дня_дней",MM:"месяц_месяца_месяцев",yy:"год_года_лет"}[e].split("_"),n%10==1&&n%100!=11?s[0]:n%10>=2&&n%10<=4&&(n%100<10||n%100>=20)?s[1]:s[2])}var u=function(_,t){return i.test(t)?n[_.month()]:s[_.month()]};u.s=s,u.f=n;var a=function(_,t){return i.test(t)?r[_.month()]:o[_.month()]};a.s=o,a.f=r;var m={name:"ru",weekdays:"воскресенье_понедельник_вторник_среда_четверг_пятница_суббота".split("_"),weekdaysShort:"вск_пнд_втр_срд_чтв_птн_сбт".split("_"),weekdaysMin:"вс_пн_вт_ср_чт_пт_сб".split("_"),months:u,monthsShort:a,weekStart:1,yearStart:4,formats:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY г.",LLL:"D MMMM YYYY г., H:mm",LLLL:"dddd, D MMMM YYYY г., H:mm"},relativeTime:{future:"через %s",past:"%s назад",s:"несколько секунд",m:d,mm:d,h:"час",hh:d,d:"день",dd:d,M:"месяц",MM:d,y:"год",yy:d},ordinal:function(_){return _},meridiem:function(_){return _<4?"ночи":_<12?"утра":_<17?"дня":"вечера"}};return e.default.locale(m,null,!0),m}));
}(ru));

var zh = {exports: {}};

(function (module, exports) {
!function(e,_){module.exports=_(dayjs_min.exports);}(commonjsGlobal,(function(e){function _(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var t=_(e),d={name:"zh",weekdays:"星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),weekdaysShort:"周日_周一_周二_周三_周四_周五_周六".split("_"),weekdaysMin:"日_一_二_三_四_五_六".split("_"),months:"一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),ordinal:function(e,_){return "W"===_?e+"周":e+"日"},weekStart:1,yearStart:4,formats:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY/MM/DD",LL:"YYYY年M月D日",LLL:"YYYY年M月D日Ah点mm分",LLLL:"YYYY年M月D日ddddAh点mm分",l:"YYYY/M/D",ll:"YYYY年M月D日",lll:"YYYY年M月D日 HH:mm",llll:"YYYY年M月D日dddd HH:mm"},relativeTime:{future:"%s后",past:"%s前",s:"几秒",m:"1 分钟",mm:"%d 分钟",h:"1 小时",hh:"%d 小时",d:"1 天",dd:"%d 天",M:"1 个月",MM:"%d 个月",y:"1 年",yy:"%d 年"},meridiem:function(e,_){var t=100*e+_;return t<600?"凌晨":t<900?"早上":t<1100?"上午":t<1300?"中午":t<1800?"下午":"晚上"}};return t.default.locale(d,null,!0),d}));
}(zh));

var KulDatesNormalize;
(function (KulDatesNormalize) {
    KulDatesNormalize["DATE"] = "date";
    KulDatesNormalize["TIME"] = "time";
    KulDatesNormalize["TIMESTAMP"] = "timestamp";
})(KulDatesNormalize || (KulDatesNormalize = {}));
var KulDatesLocales;
(function (KulDatesLocales) {
    KulDatesLocales["CHINESE"] = "cn";
    KulDatesLocales["ENGLISH"] = "en";
    KulDatesLocales["FRENCH"] = "fr";
    KulDatesLocales["ITALIAN"] = "it";
    KulDatesLocales["POLISH"] = "pl";
    KulDatesLocales["RUSSIAN"] = "ru";
    KulDatesLocales["SPANISH"] = "es";
})(KulDatesLocales || (KulDatesLocales = {}));

class KulDates {
    constructor(locale) {
        this.managedComponents = new Set();
        this.setLocale(locale);
        this.dayjs = dayjs;
        dayjs.extend(customParseFormat);
        dayjs.extend(localizedFormat);
        dayjs.extend(minMax);
    }
    setLocale(locale) {
        if (locale) {
            // Sets locale from string
            this.locale = locale;
        }
        else {
            // Sets locale from browser
            const navLangs = navigator.languages ||
                (navigator.language ? [navigator.language] : false);
            if (!navLangs || !navLangs.length) {
                return "en";
            }
            this.locale = navLangs[0].split("-")[0].toLowerCase();
            let found = false;
            for (const key in KulDatesLocales) {
                if (Object.prototype.hasOwnProperty.call(KulDatesLocales, key)) {
                    const localeItem = KulDatesLocales[key];
                    if (localeItem == this.locale) {
                        found = true;
                        break;
                    }
                }
            }
            if (!found) {
                this.locale = KulDatesLocales.ENGLISH;
            }
        }
        dayjs.locale(this.locale);
        this.managedComponents.forEach(function (comp) {
            if (comp.isConnected) {
                comp.refresh();
            }
        });
        document.dispatchEvent(new CustomEvent("kul-dates-localechange"));
    }
    getLocale() {
        return this.locale;
    }
    getLocales() {
        const items = Object.keys(KulDatesLocales)
            .map((key) => KulDatesLocales[key])
            .filter((value) => typeof value === "string");
        return items;
    }
    getDateFormat() {
        const formatObj = new Intl.DateTimeFormat(this.getLocale()).formatToParts(new Date());
        let dateFormat = formatObj
            .map((obj) => {
            switch (obj.type) {
                case "day":
                    return "DD";
                case "month":
                    return "MM";
                case "year":
                    return "YYYY";
                default:
                    return obj.value;
            }
        })
            .join("");
        return dateFormat;
    }
    getTimeFormat(manageSeconds) {
        const options = {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        };
        if (manageSeconds == true) {
            options.second = "2-digit";
        }
        const formatObj = new Intl.DateTimeFormat(this.getLocale() + "-u-hc-h23", options).formatToParts(new Date());
        let timeFormat = formatObj
            .map((obj) => {
            switch (obj.type) {
                case "hour":
                    return "HH";
                case "minute":
                    return "mm";
                case "second":
                    return "ss";
                default:
                    return obj.value;
            }
        })
            .join("");
        return timeFormat;
    }
    format(input, format) {
        if (!format) {
            format = "L"; // MM/DD/YYYY, DD/MM/YYYY depending on locale
        }
        return dayjs(input).format(format);
    }
    formatTime(time, manageSeconds) {
        const options = {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        };
        if (manageSeconds == true) {
            options.second = "2-digit";
        }
        return time.toLocaleTimeString(this.getLocale() + "-u-hc-h23", options);
    }
    isValid(date, format, strict) {
        if (format && format != null) {
            return dayjs(date, format, strict).isValid();
        }
        else {
            return dayjs(date, undefined, strict).isValid();
        }
    }
    toDate(input, format) {
        if (format && format != null) {
            return dayjs(input, format).toDate();
        }
        else {
            return dayjs(input).toDate();
        }
    }
    toDayjs(input, format) {
        if (format) {
            return dayjs(input, format);
        }
        else {
            return dayjs(input);
        }
    }
    normalize(input, type) {
        const l = dayjs.Ls[this.locale].formats.L;
        // array e for-each con contains
        const allowedChars = [
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
        ];
        let inputCleaned = "";
        for (let i = 0; i < input.length; i++) {
            let ch = input.charAt(i);
            if (allowedChars.includes(ch)) {
                inputCleaned += ch;
            }
        }
        input = inputCleaned;
        switch (type) {
            case KulDatesNormalize.TIME:
                const time = normalizeTime();
                return dayjs(time);
            case KulDatesNormalize.TIMESTAMP:
                return dayjs(input);
            case KulDatesNormalize.DATE:
            default:
                const date = normalizeDate();
                return dayjs(date);
        }
        function normalizeDate() {
            const today = new Date();
            const dIndex = l.indexOf("DD");
            const mIndex = l.indexOf("MM");
            let sub1 = 0, sub2 = 0, year = "";
            switch (input.length) {
                case 1:
                case 2:
                    sub1 = parseInt(input);
                    today.setDate(sub1);
                    break;
                case 3:
                //input = '0' + input; // continue into case 4
                case 4:
                    sub1 = parseInt(input.substring(0, 2));
                    sub2 = parseInt(input.substring(2, 4));
                    if (mIndex === 0) {
                        today.setDate(sub2);
                        today.setMonth(sub1 - 1); // -1 because it's 0 based
                    }
                    else if (dIndex === 0) {
                        today.setDate(sub1);
                        today.setMonth(sub2 - 1); // -1 because it's 0 based
                    }
                    break;
                case 5:
                //input = '0' + input; // continue into case 6
                case 6:
                    sub1 = parseInt(input.substring(0, 2));
                    sub2 = parseInt(input.substring(2, 4));
                    year = today.getFullYear().toString();
                    year = year.substring(0, 2) + input.substring(4);
                    if (mIndex === 0) {
                        today.setFullYear(parseInt(year), sub1 - 1, sub2);
                    }
                    else if (dIndex === 0) {
                        today.setFullYear(parseInt(year), sub2 - 1, sub1);
                    }
                    break;
                case 7:
                //input = '0' + input; // continue into case 8
                case 8:
                    sub1 = parseInt(input.substring(0, 2));
                    sub2 = parseInt(input.substring(2, 4));
                    year = input.substring(4);
                    if (mIndex === 0) {
                        today.setFullYear(parseInt(year), sub1 - 1, sub2);
                    }
                    else if (dIndex === 0) {
                        today.setFullYear(parseInt(year), sub2 - 1, sub1);
                    }
                    break;
            }
            return today;
        }
        function normalizeTime() {
            const today = new Date();
            let hh = 0, mm = 0, ss = 0, ms = 0;
            switch (input.length) {
                case 1:
                case 2:
                    hh = parseInt(input);
                    today.setHours(hh, 0, 0, 0);
                    break;
                case 3:
                //input = '0' + input; // continue into case 4
                case 4:
                    hh = parseInt(input.substring(0, 2));
                    mm = parseInt(input.substring(2, 4));
                    today.setHours(hh, mm, 0, 0);
                    break;
                case 5:
                //input = '0' + input; // continue into case 6
                case 6:
                    hh = parseInt(input.substring(0, 2));
                    mm = parseInt(input.substring(2, 4));
                    ss = parseInt(input.substring(4, 6));
                    today.setHours(hh, mm, ss, 0);
                    break;
                case 7:
                //input = '0' + input; // continue into case 8
                case 8:
                    hh = parseInt(input.substring(0, 2));
                    mm = parseInt(input.substring(2, 4));
                    ss = parseInt(input.substring(4, 6));
                    ms = parseInt(input.substring(6, 8));
                    today.setHours(hh, mm, ss, ms);
                    break;
            }
            return today;
        }
    }
    min(dates) {
        const dayjsDates = [];
        for (let index = 0; index < dates.length; index++) {
            const date = dates[index];
            dayjsDates.push(dayjs(date));
        }
        return dayjs.min(dayjsDates);
    }
    max(dates) {
        const dayjsDates = [];
        for (let index = 0; index < dates.length; index++) {
            const date = dates[index];
            dayjsDates.push(dayjs(date));
        }
        return dayjs.max(dayjsDates);
    }
    add(input, value, unit) {
        return dayjs(input).add(value, unit);
    }
    subtract(input, value, unit) {
        return dayjs(input).subtract(value, unit);
    }
    register(component) {
        this.managedComponents.add(component.rootElement ? component.rootElement : component);
    }
    unregister(component) {
        if (this.managedComponents) {
            this.managedComponents.delete(component.rootElement ? component.rootElement : component);
        }
    }
}

var __classPrivateFieldSet$1 = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet$4 = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _KulDebug_DOM, _KulDebug_IS_ENABLED, _KulDebug_LOG_LIMIT, _KulDebug_LOGS, _KulDebug_MANAGED_COMPONENTS, _KulDebug_codeDispatcher, _KulDebug_toggleDispatcher;
class KulDebug {
    constructor(active, logLimit) {
        _KulDebug_DOM.set(this, document.documentElement);
        _KulDebug_IS_ENABLED.set(this, void 0);
        _KulDebug_LOG_LIMIT.set(this, void 0);
        _KulDebug_LOGS.set(this, void 0);
        _KulDebug_MANAGED_COMPONENTS.set(this, void 0);
        _KulDebug_codeDispatcher.set(this, (log) => {
            Array.from(__classPrivateFieldGet$4(this, _KulDebug_MANAGED_COMPONENTS, "f").codes).forEach((comp) => {
                if (log) {
                    comp.kulValue = `# ${log.id}:\n${log.message}\n\n${comp.kulValue}`;
                }
                else {
                    comp.kulValue = "";
                }
            });
        });
        _KulDebug_toggleDispatcher.set(this, () => {
            Array.from(__classPrivateFieldGet$4(this, _KulDebug_MANAGED_COMPONENTS, "f").togglees).forEach((comp) => {
                comp.setValue(__classPrivateFieldGet$4(this, _KulDebug_IS_ENABLED, "f") ? "on" : "off");
            });
        });
        this.logs = {
            dump: () => {
                __classPrivateFieldSet$1(this, _KulDebug_LOGS, [], "f");
                __classPrivateFieldGet$4(this, _KulDebug_codeDispatcher, "f").call(this);
            },
            fromComponent(comp) {
                return comp.rootElement !== undefined;
            },
            new: async (comp, message, category = "informational") => {
                if (__classPrivateFieldGet$4(this, _KulDebug_MANAGED_COMPONENTS, "f").codes.has(comp)) {
                    return;
                }
                const isFromComponent = this.logs.fromComponent(comp);
                const log = {
                    category,
                    class: null,
                    date: new Date(),
                    id: isFromComponent
                        ? `${comp.rootElement.tagName} ${comp.rootElement.id ? "( #" + comp.rootElement.id + " )" : ""}`
                        : "KulManager",
                    message,
                    type: message.indexOf("Render #") > -1
                        ? "render"
                        : message.indexOf("Component ready") > -1
                            ? "load"
                            : message.indexOf("Size changed") > -1
                                ? "resize"
                                : "misc",
                };
                if (__classPrivateFieldGet$4(this, _KulDebug_LOGS, "f").length > __classPrivateFieldGet$4(this, _KulDebug_LOG_LIMIT, "f")) {
                    if (__classPrivateFieldGet$4(this, _KulDebug_IS_ENABLED, "f")) {
                        console.warn(__classPrivateFieldGet$4(this, _KulDebug_DOM, "f").ketchupLite.dates.format(log.date, "LLL:ms") +
                            " kul-debug => " +
                            "Too many logs (> " +
                            __classPrivateFieldGet$4(this, _KulDebug_LOG_LIMIT, "f") +
                            ")! Dumping (increase debug.logLimit to store more logs)... .");
                    }
                    this.logs.dump();
                }
                __classPrivateFieldGet$4(this, _KulDebug_LOGS, "f").push(log);
                switch (category) {
                    case "error":
                        console.error(__classPrivateFieldGet$4(this, _KulDebug_DOM, "f").ketchupLite.dates.format(log.date, "LLL:ms") +
                            log.id +
                            log.message, log.class);
                        break;
                    case "warning":
                        console.warn(__classPrivateFieldGet$4(this, _KulDebug_DOM, "f").ketchupLite.dates.format(log.date, "LLL:ms") +
                            log.id +
                            log.message, log.class);
                        break;
                }
                if (this.isEnabled()) {
                    __classPrivateFieldGet$4(this, _KulDebug_codeDispatcher, "f").call(this, log);
                }
            },
            print: () => {
                const logsToPrint = {
                    load: [],
                    misc: [],
                    render: [],
                    resize: [],
                };
                for (let index = 0; index < __classPrivateFieldGet$4(this, _KulDebug_LOGS, "f").length; index++) {
                    const log = __classPrivateFieldGet$4(this, _KulDebug_LOGS, "f")[index];
                    const printEntry = {
                        class: log.class,
                        date: __classPrivateFieldGet$4(this, _KulDebug_DOM, "f").ketchupLite.dates.format(log.date, "LLL:ms"),
                        message: log.id + log.message,
                    };
                    logsToPrint[log.type].push(printEntry);
                }
                for (const key in logsToPrint) {
                    if (Object.prototype.hasOwnProperty.call(logsToPrint, key)) {
                        const logs = logsToPrint[key];
                        console.groupCollapsed("%c  %c" + key + " logs " + "(" + logsToPrint[key].length + ")", "background-color: green; margin-right: 10px; border-radius: 50%", "background-color: transparent");
                        for (let index = 0; index < logs.length; index++) {
                            const log = logs[index];
                            console.log(log.date, log.message, log.class);
                        }
                        console.groupEnd();
                    }
                }
                if (__classPrivateFieldGet$4(this, _KulDebug_LOGS, "f").length > 0) {
                    console.groupCollapsed("%c  %c" + "All logs (" + __classPrivateFieldGet$4(this, _KulDebug_LOGS, "f").length + ")", "background-color: blue; margin-right: 10px; border-radius: 50%", "background-color: transparent");
                    console.table(__classPrivateFieldGet$4(this, _KulDebug_LOGS, "f"));
                    console.groupEnd();
                }
            },
        };
        __classPrivateFieldSet$1(this, _KulDebug_IS_ENABLED, active ? true : false, "f");
        __classPrivateFieldSet$1(this, _KulDebug_LOG_LIMIT, logLimit ? logLimit : 250, "f");
        __classPrivateFieldSet$1(this, _KulDebug_LOGS, [], "f");
        __classPrivateFieldSet$1(this, _KulDebug_MANAGED_COMPONENTS, { codes: new Set(), togglees: new Set() }, "f");
    }
    isEnabled() {
        return __classPrivateFieldGet$4(this, _KulDebug_IS_ENABLED, "f");
    }
    register(comp) {
        if (comp.rootElement.tagName.toLowerCase() === "kul-code") {
            __classPrivateFieldGet$4(this, _KulDebug_MANAGED_COMPONENTS, "f").codes.add(comp);
        }
        else {
            __classPrivateFieldGet$4(this, _KulDebug_MANAGED_COMPONENTS, "f").togglees.add(comp);
        }
    }
    toggle(value, dispatch = true) {
        if (value === false || value === true) {
            __classPrivateFieldSet$1(this, _KulDebug_IS_ENABLED, value, "f");
        }
        else {
            __classPrivateFieldSet$1(this, _KulDebug_IS_ENABLED, !__classPrivateFieldGet$4(this, _KulDebug_IS_ENABLED, "f"), "f");
        }
        if (dispatch) {
            __classPrivateFieldGet$4(this, _KulDebug_toggleDispatcher, "f").call(this);
        }
        return __classPrivateFieldGet$4(this, _KulDebug_IS_ENABLED, "f");
    }
    unregister(comp) {
        if (comp.rootElement.tagName.toLowerCase() === "kul-code") {
            __classPrivateFieldGet$4(this, _KulDebug_MANAGED_COMPONENTS, "f").codes.delete(comp);
        }
        else {
            __classPrivateFieldGet$4(this, _KulDebug_MANAGED_COMPONENTS, "f").togglees.delete(comp);
        }
    }
    async updateDebugInfo(comp, lifecycle) {
        switch (lifecycle) {
            case "custom":
                if (this.isEnabled()) {
                    this.logs.new(comp, "Custom breakpoint " +
                        " took " +
                        (window.performance.now() - comp.debugInfo.renderStart) +
                        "ms.");
                }
                break;
            case "did-render":
                comp.debugInfo.renderEnd = window.performance.now();
                if (this.isEnabled()) {
                    this.logs.new(comp, "Render #" +
                        comp.debugInfo.renderCount +
                        " took " +
                        (comp.debugInfo.renderEnd - comp.debugInfo.renderStart) +
                        "ms.");
                }
                break;
            case "did-load":
                comp.debugInfo.endTime = window.performance.now();
                this.logs.new(comp, "Component ready after " +
                    (comp.debugInfo.endTime - comp.debugInfo.startTime) +
                    "ms.");
                break;
            case "will-render":
                comp.debugInfo.renderCount++;
                comp.debugInfo.renderStart = window.performance.now();
        }
    }
}
_KulDebug_DOM = new WeakMap(), _KulDebug_IS_ENABLED = new WeakMap(), _KulDebug_LOG_LIMIT = new WeakMap(), _KulDebug_LOGS = new WeakMap(), _KulDebug_MANAGED_COMPONENTS = new WeakMap(), _KulDebug_codeDispatcher = new WeakMap(), _KulDebug_toggleDispatcher = new WeakMap();

const CSS_VAR_PREFIX = "--kul";
const KUL_DROPDOWN_CLASS = "kul-dropdown-menu";
const KUL_DROPDOWN_CLASS_VISIBLE = "kul-dropdown-menu--visible";
const KUL_STYLE_ID = "kul-style";
const KUL_WRAPPER_ID = "kul-component";
const RIPPLE_SURFACE_CLASS = "ripple-surface";

const kulDynamicPositionAttribute = "kul-dynamic-position";
const kulDynamicPositionAnchorAttribute = "kul-dynamic-position-anchor";
var KulDynamicPositionPlacement;
(function (KulDynamicPositionPlacement) {
    KulDynamicPositionPlacement["AUTO"] = "";
    KulDynamicPositionPlacement["BOTTOM"] = "b";
    KulDynamicPositionPlacement["BOTTOM_LEFT"] = "bl";
    KulDynamicPositionPlacement["BOTTOM_RIGHT"] = "br";
    KulDynamicPositionPlacement["LEFT"] = "l";
    KulDynamicPositionPlacement["RIGHT"] = "r";
    KulDynamicPositionPlacement["TOP"] = "t";
    KulDynamicPositionPlacement["TOP_LEFT"] = "tl";
    KulDynamicPositionPlacement["TOP_RIGHT"] = "tr";
})(KulDynamicPositionPlacement || (KulDynamicPositionPlacement = {}));

var __classPrivateFieldGet$3 = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _KulDynamicPosition_DOM;
class KulDynamicPosition {
    constructor() {
        _KulDynamicPosition_DOM.set(this, document.documentElement);
        this.container = document.createElement("div");
        this.container.setAttribute("kul-dynamic-position", "");
        document.body.appendChild(this.container);
        this.managedElements = new Set();
    }
    anchorIsHTMLElement(anchor) {
        return anchor.tagName !== undefined;
    }
    register(el, anchorEl, margin, placement, detach) {
        if (this.isRegistered(el)) {
            this.changeAnchor(el, anchorEl);
            return;
        }
        const runCb = () => __classPrivateFieldGet$3(this, _KulDynamicPosition_DOM, "f").ketchupLite.dynamicPosition.run(el);
        el.setAttribute(kulDynamicPositionAttribute, "");
        if (this.anchorIsHTMLElement(anchorEl)) {
            anchorEl.setAttribute(kulDynamicPositionAnchorAttribute, "");
        }
        el.style.zIndex = `calc(var(--kul-header-zindex) + 1)`;
        const originalPath = [];
        if (detach) {
            let currentEl = el;
            while (currentEl && currentEl !== document.body) {
                currentEl = currentEl.parentNode
                    ? currentEl.parentNode
                    : currentEl.host;
                originalPath.push(currentEl);
            }
            el.style.position = "absolute";
            this.container.appendChild(el);
        }
        else {
            el.style.position = "fixed";
        }
        el.kulDynamicPosition = {
            anchor: anchorEl,
            detach: detach ? true : false,
            originalPath: originalPath,
            margin: margin ? margin : 0,
            placement: placement ? placement : KulDynamicPositionPlacement.AUTO,
            rAF: null,
        };
        const mutObserver = new MutationObserver(function (mutations) {
            const target = mutations[0].target;
            if (target.classList.contains(KUL_DROPDOWN_CLASS_VISIBLE)) {
                requestAnimationFrame(runCb);
            }
        });
        mutObserver.observe(el, {
            attributes: true,
            attributeFilter: ["class"],
        });
        this.managedElements.add(el);
    }
    changeAnchor(el, anchorEl) {
        el.kulDynamicPosition.anchor = anchorEl;
    }
    unregister(elements) {
        if (this.managedElements) {
            for (let index = 0; index < elements.length; index++) {
                this.managedElements.delete(elements[index]);
            }
        }
    }
    isRegistered(el) {
        return !this.managedElements ? false : this.managedElements.has(el);
    }
    start(el) {
        el.classList.add(KUL_DROPDOWN_CLASS_VISIBLE);
    }
    stop(el) {
        el.classList.remove(KUL_DROPDOWN_CLASS_VISIBLE);
    }
    run(el) {
        if (!el.isConnected) {
            __classPrivateFieldGet$3(this, _KulDynamicPosition_DOM, "f").ketchupLite.dynamicPosition.managedElements.delete(el);
            cancelAnimationFrame(el.kulDynamicPosition.rAF);
            return;
        }
        if (!el.classList.contains(KUL_DROPDOWN_CLASS_VISIBLE)) {
            cancelAnimationFrame(el.kulDynamicPosition.rAF);
            return;
        }
        // Reset placement
        el.style.top = "";
        el.style.right = "";
        el.style.bottom = "";
        el.style.left = "";
        // Fixed position (usually from mouse events).
        // When anchor doesn't have the tagName property, anchor is considered as a set of coordinates.
        if (!this.anchorIsHTMLElement(el.kulDynamicPosition.anchor)) {
            const x = el.kulDynamicPosition.anchor.x;
            const y = el.kulDynamicPosition.anchor.y;
            if (el.offsetWidth > window.innerWidth - el.kulDynamicPosition.anchor.x) {
                el.style.left = x - el.offsetWidth + "px";
            }
            else {
                el.style.left = x + "px";
            }
            if (el.offsetHeight >
                window.innerHeight - el.kulDynamicPosition.anchor.y) {
                el.style.top = y - el.offsetHeight + "px";
            }
            else {
                el.style.top = y + "px";
            }
            return;
        }
        const detached = !!el.kulDynamicPosition.detach;
        const offsetH = el.clientHeight;
        const offsetW = el.clientWidth;
        const rect = el.kulDynamicPosition.anchor.getBoundingClientRect();
        const top = detached ? window.pageYOffset + rect.top : rect.top, left = detached ? window.pageXOffset + rect.left : rect.left, bottom = detached
            ? window.pageYOffset + rect.bottom
            : rect.bottom, right = detached ? window.pageXOffset + rect.right : rect.right;
        // Vertical position
        if (el.kulDynamicPosition.placement === KulDynamicPositionPlacement.TOP ||
            el.kulDynamicPosition.placement ===
                KulDynamicPositionPlacement.TOP_LEFT ||
            el.kulDynamicPosition.placement === KulDynamicPositionPlacement.TOP_RIGHT) {
            el.style.bottom = `${window.innerHeight - top + el.kulDynamicPosition.margin}px`;
        }
        else if (el.kulDynamicPosition.placement === KulDynamicPositionPlacement.BOTTOM ||
            el.kulDynamicPosition.placement ===
                KulDynamicPositionPlacement.BOTTOM_LEFT ||
            el.kulDynamicPosition.placement ===
                KulDynamicPositionPlacement.BOTTOM_RIGHT) {
            el.style.top = `${bottom + el.kulDynamicPosition.margin}px`;
        }
        else {
            if (offsetH < rect.top && window.innerHeight - rect.bottom < offsetH) {
                el.style.bottom = `${window.innerHeight - top + el.kulDynamicPosition.margin}px`;
            }
            else {
                el.style.top = `${bottom + el.kulDynamicPosition.margin}px`;
            }
        }
        // Horizontal position
        if (el.kulDynamicPosition.placement === KulDynamicPositionPlacement.LEFT ||
            el.kulDynamicPosition.placement ===
                KulDynamicPositionPlacement.BOTTOM_LEFT ||
            el.kulDynamicPosition.placement === KulDynamicPositionPlacement.TOP_LEFT) {
            el.style.left = `${left}px`;
        }
        else if (el.kulDynamicPosition.placement === KulDynamicPositionPlacement.RIGHT ||
            el.kulDynamicPosition.placement ===
                KulDynamicPositionPlacement.BOTTOM_RIGHT ||
            el.kulDynamicPosition.placement === KulDynamicPositionPlacement.TOP_RIGHT) {
            let scrollbarWidth = window.innerWidth - document.documentElement.offsetWidth;
            if (scrollbarWidth > 30) {
                scrollbarWidth = 0;
            }
            el.style.right = `${window.innerWidth - scrollbarWidth - right}px`;
        }
        else {
            if (offsetW < rect.right && window.innerWidth - rect.left < offsetW) {
                let scrollbarWidth = window.innerWidth - document.documentElement.offsetWidth;
                if (scrollbarWidth > 30) {
                    scrollbarWidth = 0;
                }
                el.style.right = `${window.innerWidth - scrollbarWidth - right}px`;
            }
            else {
                el.style.left = `${left}px`;
            }
        }
        if (!el.kulDynamicPosition.detach) {
            el.kulDynamicPosition.rAF = requestAnimationFrame(function () {
                __classPrivateFieldGet$3(this, _KulDynamicPosition_DOM, "f").ketchupLite.dynamicPosition.run(el);
            });
        }
        else {
            cancelAnimationFrame(el.kulDynamicPosition.rAF);
            return;
        }
    }
}
_KulDynamicPosition_DOM = new WeakMap();

var KulLanguageDefaults;
(function (KulLanguageDefaults) {
    KulLanguageDefaults["cn"] = "chinese";
    KulLanguageDefaults["en"] = "english";
    KulLanguageDefaults["es"] = "spanish";
    KulLanguageDefaults["it"] = "italian";
    KulLanguageDefaults["fr"] = "french";
    KulLanguageDefaults["pl"] = "polish";
    KulLanguageDefaults["ru"] = "russian";
})(KulLanguageDefaults || (KulLanguageDefaults = {}));
var KulLanguageCheckbox;
(function (KulLanguageCheckbox) {
    KulLanguageCheckbox["ALL"] = "checkboxAll";
    KulLanguageCheckbox["CHECKED"] = "checkboxChecked";
    KulLanguageCheckbox["INDETERMINATE"] = "checkboxIndeterminate";
    KulLanguageCheckbox["UNCHECKED"] = "checkboxUnchecked";
})(KulLanguageCheckbox || (KulLanguageCheckbox = {}));
var KulLanguageColumn;
(function (KulLanguageColumn) {
    KulLanguageColumn["ADD"] = "columnAdd";
    KulLanguageColumn["ADD_DESCRIPTION"] = "columnAddDescription";
    KulLanguageColumn["COLUMNS"] = "columnColumns";
    KulLanguageColumn["HIDE"] = "columnHide";
    KulLanguageColumn["MERGE"] = "columnMerge";
    KulLanguageColumn["NO_FORMULA"] = "columnNoFormula";
    KulLanguageColumn["NON_NUMERICAL"] = "columnNonNumerical";
    KulLanguageColumn["NON_NUMERICAL_IN_TABLE"] = "columnNonNumericalInTable";
    KulLanguageColumn["SWAP"] = "columnSwap";
})(KulLanguageColumn || (KulLanguageColumn = {}));
var KulLanguageDashboard;
(function (KulLanguageDashboard) {
    KulLanguageDashboard["DIMENSION"] = "dashboardDimension";
    KulLanguageDashboard["LOADED"] = "dashboardLoaded";
    KulLanguageDashboard["RESET"] = "dashboardReset";
    KulLanguageDashboard["SAVE"] = "dashboardSave";
    KulLanguageDashboard["VERTICAL"] = "dashboardVertical";
})(KulLanguageDashboard || (KulLanguageDashboard = {}));
var KulLanguageDebug;
(function (KulLanguageDebug) {
    KulLanguageDebug["AUTOPRINT"] = "debugAutoprint";
    KulLanguageDebug["CLEAR"] = "debugClear";
    KulLanguageDebug["DUMP"] = "debugDump";
    KulLanguageDebug["DL_ALL"] = "debugDLAll";
    KulLanguageDebug["DL_PROPS"] = "debugDLProps";
    KulLanguageDebug["DL_PROPS_COMP"] = "debugDLPropsComp";
    KulLanguageDebug["LANGUAGE_CHANGER"] = "debugLanguageChanger";
    KulLanguageDebug["LOCALE_CHANGER"] = "debugLocaleChanger";
    KulLanguageDebug["LOG_LIMIT"] = "debugLogLimit";
    KulLanguageDebug["MAGIC_BOX"] = "debugMagicBox";
    KulLanguageDebug["OFF"] = "debugOff";
    KulLanguageDebug["PRINT"] = "debugPrint";
    KulLanguageDebug["THEME_CHANGER"] = "debugThemeChanger";
})(KulLanguageDebug || (KulLanguageDebug = {}));
var KulLanguageDensity;
(function (KulLanguageDensity) {
    KulLanguageDensity["DENSE"] = "densityDense";
    KulLanguageDensity["LABEL"] = "densityLabel";
    KulLanguageDensity["MEDIUM"] = "densityMedium";
    KulLanguageDensity["WIDE"] = "densityWide";
})(KulLanguageDensity || (KulLanguageDensity = {}));
var KulLanguageFontsize;
(function (KulLanguageFontsize) {
    KulLanguageFontsize["BIG"] = "fontsizeBig";
    KulLanguageFontsize["LABEL"] = "fontsizeLabel";
    KulLanguageFontsize["MEDIUM"] = "fontsizeMedium";
    KulLanguageFontsize["SMALL"] = "fontsizeSmall";
})(KulLanguageFontsize || (KulLanguageFontsize = {}));
var KulLanguageGeneric;
(function (KulLanguageGeneric) {
    KulLanguageGeneric["ABORT"] = "genericAbort";
    KulLanguageGeneric["ADD_NEW"] = "genericAddNew";
    KulLanguageGeneric["APPLY"] = "genericApply";
    KulLanguageGeneric["BACK"] = "genericBack";
    KulLanguageGeneric["COLLAPSE"] = "genericCollapse";
    KulLanguageGeneric["CONFIRM"] = "genericConfirm";
    KulLanguageGeneric["CONFIRM_DELETE"] = "genericConfirmDelete";
    KulLanguageGeneric["CONFIRM_DELETE_X_ROWS"] = "genericConfirmDeleteXRows";
    KulLanguageGeneric["DAY"] = "genericDay";
    KulLanguageGeneric["DRAG_AND_DROP"] = "genericDragAndDrop";
    KulLanguageGeneric["DROP_YOUR_DATA"] = "genericDropYourData";
    KulLanguageGeneric["EDITABLE"] = "genericEditable";
    KulLanguageGeneric["EDITABLE_FIELD"] = "genericEditableField";
    KulLanguageGeneric["EMPTY_DATA"] = "genericEmptyData";
    KulLanguageGeneric["EMPTY_OBJECT"] = "genericEmptyObject";
    KulLanguageGeneric["EXPAND"] = "genericExpand";
    KulLanguageGeneric["EXPERIMENTAL_FEAT"] = "genericExperimentalFeat";
    KulLanguageGeneric["FILTERS"] = "genericFilters";
    KulLanguageGeneric["INFO"] = "genericInfo";
    KulLanguageGeneric["INVALID_COLOR"] = "genericInvalidColor";
    KulLanguageGeneric["LAYOUT_NYI"] = "genericLayoutNotYetImplemented";
    KulLanguageGeneric["LIST"] = "genericList";
    KulLanguageGeneric["LOAD_MORE"] = "genericLoadMoreData";
    KulLanguageGeneric["MERGE"] = "genericMerge";
    KulLanguageGeneric["MENU"] = "genericMenu";
    KulLanguageGeneric["MONTH"] = "genericMonth";
    KulLanguageGeneric["MOVE"] = "genericMove";
    KulLanguageGeneric["NEXT"] = "genericNext";
    KulLanguageGeneric["NO"] = "genericNo";
    KulLanguageGeneric["OPEN_NAVIGATION_MENU"] = "genericOpenNavigationMenu";
    KulLanguageGeneric["OPEN_IN_NEW_TAB"] = "genericOpenInNewTab";
    KulLanguageGeneric["OPEN_IN_NEW_WINDOW"] = "genericOpenInNewWindow";
    KulLanguageGeneric["OPTIONS"] = "genericOptions";
    KulLanguageGeneric["PREVIOUS"] = "genericPrevious";
    KulLanguageGeneric["REMOVE_FILTERS"] = "genericRemoveFilters";
    KulLanguageGeneric["SETTINGS"] = "genericSettings";
    KulLanguageGeneric["SHOW_ROW_OPTIONS"] = "genericShowRowOptions";
    KulLanguageGeneric["SHOW_TOOLTIP_INFO"] = "genericShowTooltipInfo";
    KulLanguageGeneric["SORT_BY"] = "genericSortBy";
    KulLanguageGeneric["SWAP"] = "genericSwap";
    KulLanguageGeneric["TOGGLE"] = "genericToggle";
    KulLanguageGeneric["TODAY"] = "genericToday";
    KulLanguageGeneric["TOP"] = "genericTop";
    KulLanguageGeneric["TOTALS_TABLE"] = "genericTotalsTable";
    KulLanguageGeneric["TRANSPOSE_DATA"] = "genericTransposeData";
    KulLanguageGeneric["VIEW_AS"] = "genericViewAs";
    KulLanguageGeneric["WEEK"] = "genericWeek";
    KulLanguageGeneric["YES"] = "genericYes";
})(KulLanguageGeneric || (KulLanguageGeneric = {}));
var KulLanguageGrid;
(function (KulLanguageGrid) {
    KulLanguageGrid["COLUMN"] = "gridColumn";
    KulLanguageGrid["COMPLETE"] = "gridComplete";
    KulLanguageGrid["LABEL"] = "gridLabel";
    KulLanguageGrid["NONE"] = "gridNone";
    KulLanguageGrid["ROW"] = "gridRow";
})(KulLanguageGrid || (KulLanguageGrid = {}));
var KulLanguageGrouping;
(function (KulLanguageGrouping) {
    KulLanguageGrouping["DISABLE"] = "groupingDisable";
    KulLanguageGrouping["ENABLE"] = "groupingEnable";
    KulLanguageGrouping["GROUPS"] = "groupingGroups";
})(KulLanguageGrouping || (KulLanguageGrouping = {}));
var KulLanguagePage;
(function (KulLanguagePage) {
    KulLanguagePage["PAGE"] = "pagePage";
    KulLanguagePage["TOTAL"] = "pageTotal";
})(KulLanguagePage || (KulLanguagePage = {}));
var KulLanguageRow;
(function (KulLanguageRow) {
    KulLanguageRow["DETAIL"] = "rowDetail";
    KulLanguageRow["EDITABLE_KEY"] = "rowEditableKey";
    KulLanguageRow["KEY"] = "rowKey";
    KulLanguageRow["NEXT"] = "rowNext";
    KulLanguageRow["PREVIOUS"] = "rowPrevious";
    KulLanguageRow["RENDERED"] = "rowRendered";
    KulLanguageRow["ROWS"] = "rowRows";
    KulLanguageRow["SELECTED"] = "rowSelected";
    KulLanguageRow["TOTAL"] = "rowTotal";
})(KulLanguageRow || (KulLanguageRow = {}));
var KulLanguageSearch;
(function (KulLanguageSearch) {
    KulLanguageSearch["FROM"] = "searchFrom";
    KulLanguageSearch["SEARCH"] = "searchSearch";
    KulLanguageSearch["TO"] = "searchTo";
})(KulLanguageSearch || (KulLanguageSearch = {}));
var KulLanguageTotals;
(function (KulLanguageTotals) {
    KulLanguageTotals["AVERAGE"] = "totalsAverage";
    KulLanguageTotals["CALCULATE"] = "totalsCalculate";
    KulLanguageTotals["CANCEL"] = "totalsCancel";
    KulLanguageTotals["COUNT"] = "totalsCount";
    KulLanguageTotals["DIFFERENCE"] = "totalsDifference";
    KulLanguageTotals["DISTINCT"] = "totalsDistinct";
    KulLanguageTotals["FORMULA"] = "totalsFormula";
    KulLanguageTotals["MAXIMUM"] = "totalsMaximum";
    KulLanguageTotals["MINIMUM"] = "totalsMinimum";
    KulLanguageTotals["PRODUCT"] = "totalsProduct";
    KulLanguageTotals["SUM"] = "totalsSum";
})(KulLanguageTotals || (KulLanguageTotals = {}));

const languagesJson = {
    chinese: {
        keys: {
            checkboxAll: "全部",
            checkboxChecked: "已检查",
            checkboxIndeterminate: "不定",
            checkboxUnchecked: "未检查",
            columnAdd: "添加栏",
            columnAddDescription: "添加代码/描述列",
            columnColumns: "列",
            columnHide: "隐藏栏",
            columnMerge: "合并列",
            columnNoFormula: "这些列没有可用的公式",
            columnNonNumerical: "这些列不是数字的",
            columnNonNumericalInTable: "此表中不存在数字列",
            columnSwap: "交换",
            dashboardDimension: "方面",
            dashboardLoaded: "已加载",
            dashboardReset: "重置",
            dashboardSave: "节省",
            dashboardVertical: "垂直的",
            debugAutoprint: "切换自动打印",
            debugClear: "清除小部件",
            debugDLAll: "全部",
            debugDLProps: "下载组件道具",
            debugDLPropsComp: "下载组件道具",
            debugDump: "转储存储的日志",
            debugLanguageChanger: "设置语言",
            debugLocaleChanger: "設置語言環境",
            debugLogLimit: "设置日志限制",
            debugMagicBox: "切换kul-magic-box",
            debugOff: "关闭调试",
            debugPrint: "打印已存储的日志",
            debugThemeChanger: "设置主题",
            densityDense: "稠密",
            densityLabel: "行密度",
            densityMedium: "中等的",
            densityWide: "宽的",
            fontsizeBig: "大的",
            fontsizeLabel: "字体大小",
            fontsizeMedium: "中等的",
            fontsizeSmall: "小的",
            genericAbort: "取消",
            genericAddNew: "添新",
            genericApply: "申请",
            genericBack: "背部",
            genericCollapse: "坍塌",
            genericConfirm: "确认",
            genericConfirmDelete: "你确认取消了吗?",
            genericConfirmDeleteXRows: "删除（{0}）行?",
            genericDay: "日",
            genericDragAndDrop: "拖放",
            genericDropYourData: "将您的数据放在这里",
            genericEditable: "可编辑的",
            genericEditableField: "该字段可以编辑",
            genericEmptyData: "空数据",
            genericEmptyObject: "空对象",
            genericExpand: "扩张",
            genericExperimentalFeat: "实验功能",
            genericFilters: "筛选器",
            genericInfo: "信息",
            genericInvalidColor: "颜色无效",
            genericLayoutNotYetImplemented: "布局尚未实施",
            genericList: "列表",
            genericLoadMoreData: "加载更多数据",
            genericMenu: "画面",
            genericMerge: "合并",
            genericMonth: "月",
            genericMove: "移动",
            genericNext: "下一个",
            genericNo: "不",
            genericOpenInNewTab: "在新标签页中打开",
            genericOpenInNewWindow: "在新窗口中打开",
            genericOpenNavigationMenu: "打开导航菜单",
            genericOptions: "选项",
            genericPrevious: "以前的",
            genericRemoveFilters: "删除过滤器",
            genericSettings: "设置",
            genericShowRowOptions: "显示行选项",
            genericShowTooltipInfo: "显示工具提示信息",
            genericSortBy: "排序方式",
            genericSwap: "隐藏栏",
            genericToday: "今天",
            genericToggle: "切换",
            genericTop: "最佳",
            genericTotalsTable: "总计表",
            genericTransposeData: "转置数据",
            genericViewAs: "查看为",
            genericWeek: "星期",
            genericYes: "是的",
            gridColumn: "柱子",
            gridComplete: "完全的",
            gridLabel: "网格类型",
            gridNone: "没有任何",
            gridRow: "排",
            groupingDisable: "禁用分组",
            groupingEnable: "启用分组",
            groupingGroups: "团体",
            pagePage: "页",
            pageTotal: "总页数",
            rowDetail: "行详细信息",
            rowEditableKey: "可编辑的记录键",
            rowKey: "记录键",
            rowNext: "下一行",
            rowPrevious: "上一行",
            rowRendered: "渲染的行",
            rowRows: "行数",
            rowSelected: "选定的行",
            rowTotal: "总行数",
            searchFrom: "从",
            searchSearch: "搜索",
            searchTo: "至",
            totalsAverage: "平均数",
            totalsCalculate: "计算",
            totalsCancel: "取消",
            totalsCount: "数数",
            totalsDifference: "不同之处",
            totalsDistinct: "清楚的",
            totalsFormula: "公式",
            totalsMaximum: "最大",
            totalsMinimum: "最低限度",
            totalsProduct: "产物",
            totalsSum: "和",
        },
    },
    english: {
        keys: {
            checkboxAll: "All",
            checkboxChecked: "Checked",
            checkboxIndeterminate: "Indeterminate",
            checkboxUnchecked: "Unchecked",
            columnAdd: "Add column",
            columnAddDescription: "Add code/description column",
            columnColumns: "Columns",
            columnHide: "Hide column",
            columnMerge: "Merge columns",
            columnNoFormula: "No formulas available for these columns.",
            columnNonNumerical: "These columns are not numerical.",
            columnNonNumericalInTable: "No numerical columns exist in this table.",
            columnSwap: "Swap columns",
            dashboardDimension: "Dimension",
            dashboardLoaded: "Loaded",
            dashboardReset: "Reset",
            dashboardSave: "Save",
            dashboardVertical: "Vertical",
            debugAutoprint: "Toggle automatic print",
            debugClear: "Clear widget",
            debugDLAll: "All",
            debugDLProps: "Download components props",
            debugDLPropsComp: "Download component props",
            debugDump: "Dump stored logs",
            debugLanguageChanger: "Set language",
            debugLocaleChanger: "Set locale",
            debugLogLimit: "Set log limit",
            debugMagicBox: "Toggle kul-magic-box",
            debugOff: "Turn off debug",
            debugPrint: "Print logs stored",
            debugThemeChanger: "Set theme",
            densityDense: "Dense",
            densityLabel: "Row density",
            densityMedium: "Medium",
            densityWide: "Wide",
            fontsizeBig: "Big",
            fontsizeLabel: "Font size",
            fontsizeMedium: "Medium",
            fontsizeSmall: "Small",
            genericAbort: "Cancel",
            genericAddNew: "Add new",
            genericApply: "Apply",
            genericBack: "Back",
            genericCollapse: "Collapse",
            genericConfirm: "Confirm",
            genericConfirmDelete: "Do you confirm the cancellation?",
            genericConfirmDeleteXRows: "Delete ({0}) rows?",
            genericDay: "Day",
            genericDragAndDrop: "Drag and drop",
            genericDropYourData: "Drop your data here",
            genericEditable: "Editable",
            genericEditableField: "This field can be edited",
            genericEmptyData: "Empty data.",
            genericEmptyObject: "Empty object",
            genericExpand: "Expand",
            genericExperimentalFeat: "Experimental feature",
            genericFilters: "Filters",
            genericInfo: "Info",
            genericInvalidColor: "Invalid color",
            genericLayoutNotYetImplemented: "Layout not yet implemented",
            genericList: "List",
            genericLoadMoreData: "Load more data",
            genericMenu: "Menu",
            genericMerge: "Merge",
            genericMonth: "Month",
            genericMove: "Move",
            genericNext: "Next",
            genericNo: "No",
            genericOpenInNewTab: "Open in new tab",
            genericOpenInNewWindow: "Open in new window",
            genericOpenNavigationMenu: "Open navigation menu",
            genericOptions: "Options",
            genericPrevious: "Previous",
            genericRemoveFilters: "Remove filters",
            genericSettings: "Settings",
            genericShowRowOptions: "Show row options",
            genericShowTooltipInfo: "Show tooltip info",
            genericSortBy: "Sort by",
            genericSwap: "Swap",
            genericToday: "Today",
            genericToggle: "Toggle",
            genericTop: "Top",
            genericTotalsTable: "Totals table",
            genericTransposeData: "Transpose data",
            genericViewAs: "View as",
            genericWeek: "Week",
            genericYes: "Yes",
            gridColumn: "Column",
            gridComplete: "Complete",
            gridLabel: "Grid type",
            gridNone: "None",
            gridRow: "Row",
            groupingDisable: "Disable grouping",
            groupingEnable: "Enable grouping",
            groupingGroups: "Group",
            pagePage: "Page",
            pageTotal: "Total",
            rowDetail: "Row detail",
            rowEditableKey: "Editable record key",
            rowKey: "Record key",
            rowNext: "Next row",
            rowPrevious: "Previous row",
            rowRendered: "Rendered rows",
            rowRows: "Rows",
            rowSelected: "Selected rows",
            rowTotal: "Total rows",
            searchFrom: "From",
            searchSearch: "Search",
            searchTo: "To",
            totalsAverage: "Average",
            totalsCalculate: "Calculate",
            totalsCancel: "Cancel",
            totalsCount: "Count",
            totalsDifference: "Difference",
            totalsDistinct: "Distinct",
            totalsFormula: "Formula",
            totalsMaximum: "Maximum",
            totalsMinimum: "Minimum",
            totalsProduct: "Product",
            totalsSum: "Sum",
        },
    },
    french: {
        keys: {
            checkboxAll: "Tout",
            checkboxChecked: "Vérifié",
            checkboxIndeterminate: "Indéterminé",
            checkboxUnchecked: "Non coché",
            columnAdd: "Ajouter une colonne",
            columnAddDescription: "Ajouter une colonne code / description",
            columnColumns: "Colonnes",
            columnHide: "Masquer la colonne",
            columnMerge: "Fusionner des colonnes",
            columnNoFormula: "Aucune formule disponible pour ces colonnes.",
            columnNonNumerical: "Ces colonnes ne sont pas numériques.",
            columnNonNumericalInTable: "Aucune colonne numérique n'existe dans ce tableau.",
            columnSwap: "Permuter les colonnes",
            dashboardDimension: "Dimension",
            dashboardLoaded: "Chargé",
            dashboardReset: "Réinitialiser",
            dashboardSave: "Enregistrer",
            dashboardVertical: "Vertical",
            debugAutoprint: "Activer l'impression automatique",
            debugClear: "Effacer le widget",
            debugDLAll: "Tout",
            debugDLProps: "Télécharger les accessoires des composants",
            debugDLPropsComp: "Télécharger les accessoires des composants",
            debugDump: "Vider les journaux stockés",
            debugLanguageChanger: "Définir la langue",
            debugLocaleChanger: "Définir les paramètres régionaux",
            debugLogLimit: "Définir la limite du journal",
            debugMagicBox: "Activer / désactiver kul-magic-box",
            debugOff: "Désactiver le débogage",
            debugPrint: "Imprimer les journaux stockés",
            debugThemeChanger: "Définir le thème",
            densityDense: "Dense",
            densityLabel: "Densité des rangs",
            densityMedium: "Moyen",
            densityWide: "Large",
            fontsizeBig: "Gros",
            fontsizeLabel: "Taille de police",
            fontsizeMedium: "Moyen",
            fontsizeSmall: "Petit",
            genericAbort: "Annuler",
            genericAddNew: "Ajouter un nouveau",
            genericApply: "Appliquer",
            genericBack: "Arrière",
            genericCollapse: "Effondrer",
            genericConfirm: "Confirmer",
            genericConfirmDelete: "Confirmez-vous l'annulation?",
            genericConfirmDeleteXRows: "Supprimer ({0}) lignes?",
            genericDay: "Jour",
            genericDragAndDrop: "Glisser-déposer",
            genericDropYourData: "Déposez vos données ici",
            genericEditable: "Modifiable",
            genericEditableField: "Ce champ peut être édité",
            genericEmptyData: "Données vides",
            genericEmptyObject: "Objet vides",
            genericExpand: "Étendre",
            genericExperimentalFeat: "Fonctionnalité expérimentale",
            genericFilters: "Filtres",
            genericInfo: "Info",
            genericInvalidColor: "Couleur invalide",
            genericLayoutNotYetImplemented: "Mise en page pas encore implémentée",
            genericList: "Lister",
            genericLoadMoreData: "Charger plus de données",
            genericMenu: "Menu",
            genericMerge: "Fusionner",
            genericMonth: "Mois",
            genericMove: "Se déplacer",
            genericNext: "Prochain",
            genericNo: "Non",
            genericOpenInNewTab: "Ouvrir dans un nouvel onglet",
            genericOpenInNewWindow: "Ouvrir dans une nouvelle fenêtre",
            genericOpenNavigationMenu: "Ouvrir le menu de navigation",
            genericOptions: "Options",
            genericPrevious: "Précédent",
            genericRemoveFilters: "Supprimer les filtres",
            genericSettings: "Paramètres",
            genericShowRowOptions: "Afficher les options de ligne",
            genericShowTooltipInfo: "Afficher les informations de l'info-bulle",
            genericSortBy: "Trier par",
            genericSwap: "Échanger",
            genericToday: "Aujourd'hui",
            genericToggle: "Basculer",
            genericTop: "Haut",
            genericTotalsTable: "Tableau des totaux",
            genericTransposeData: "Transposer les données",
            genericViewAs: "Voir comme",
            genericWeek: "La semaine",
            genericYes: "Oui",
            gridColumn: "Colonne",
            gridComplete: "Compléte",
            gridLabel: "Type de grille",
            gridNone: "Rien",
            gridRow: "Ligne",
            groupingDisable: "Désactiver le regroupement",
            groupingEnable: "Activer le regroupement",
            groupingGroups: "Groupe",
            pagePage: "Page",
            pageTotal: "Pages totales",
            rowDetail: "Détail de la ligne",
            rowEditableKey: "Clé d'enregistrement modifiable",
            rowKey: "Clé d'enregistrement",
            rowNext: "Ligne suivante",
            rowPrevious: "Ligne précédente",
            rowRendered: "Lignes rendues",
            rowRows: "Lignes",
            rowSelected: "Lignes sélectionnées",
            rowTotal: "Total des lignes",
            searchFrom: "De",
            searchSearch: "Rechercher",
            searchTo: "À",
            totalsAverage: "Moyenne",
            totalsCalculate: "Calculer",
            totalsCancel: "Annuler",
            totalsCount: "Compter",
            totalsDifference: "Différence",
            totalsDistinct: "Distinct",
            totalsFormula: "Formule",
            totalsMaximum: "Maximum",
            totalsMinimum: "Minimum",
            totalsProduct: "Produit",
            totalsSum: "Somme",
        },
    },
    italian: {
        keys: {
            checkboxAll: "Tutti",
            checkboxChecked: "Selezionato",
            checkboxIndeterminate: "Indeterminato",
            checkboxUnchecked: "Non selezionato",
            columnAdd: "Aggiungi colonna",
            columnAddDescription: "Aggiungi colonna codice/descrizione",
            columnColumns: "Colonne",
            columnHide: "Nascondi colonna",
            columnMerge: "Unisci le colonne",
            columnNoFormula: "Non ci sono formule disponibili per queste colonne.",
            columnNonNumerical: "Queste colonne non sono numeriche.",
            columnNonNumericalInTable: "Non esistono colonne numeriche in questa tabella.",
            columnSwap: "Scambia le colonne",
            dashboardDimension: "Dimensione",
            dashboardLoaded: "Caricata",
            dashboardReset: "Ripristina",
            dashboardSave: "Salva",
            dashboardVertical: "Verticale",
            debugAutoprint: "Attiva stampa automatica logs",
            debugClear: "Pulisci widget",
            debugDLAll: "Tutto",
            debugDLProps: "Scarica props componenti",
            debugDLPropsComp: "Scarica props del componente",
            debugDump: "Svuota cache dei logs",
            debugLanguageChanger: "Cambia lingua",
            debugLocaleChanger: "Cambia localizzazione",
            debugLogLimit: "Imposta limite log",
            debugMagicBox: "Attiva kul-magic-box",
            debugOff: "Disattiva debug",
            debugPrint: "Stampa logs immagazzinati",
            debugThemeChanger: "Cambia tema",
            densityDense: "Densa",
            densityLabel: "Densità righe",
            densityMedium: "Media",
            densityWide: "Ampia",
            fontsizeBig: "Grande",
            fontsizeLabel: "Dimensione caratteri",
            fontsizeMedium: "Media",
            fontsizeSmall: "Piccola",
            genericAbort: "Annulla",
            genericAddNew: "Aggiungi nuovo",
            genericApply: "Applica",
            genericBack: "Indietro",
            genericCollapse: "Chiudi",
            genericConfirm: "Conferma",
            genericConfirmDelete: "Confermi la cancellazione?",
            genericConfirmDeleteXRows: "Eliminare ({0}) righe?",
            genericDay: "Giorno",
            genericDragAndDrop: "Drag & drop",
            genericDropYourData: "Trascina qui i tuoi dati",
            genericEditable: "Editabile",
            genericEditableField: "Questo campo è editabile",
            genericEmptyData: "Nessun dato da visualizzare.",
            genericEmptyObject: "Nessun oggetto",
            genericExpand: "Espandi",
            genericExperimentalFeat: "Funzionalità sperimentale",
            genericFilters: "Filtri",
            genericInfo: "Informazioni",
            genericInvalidColor: "Colore invalido",
            genericLayoutNotYetImplemented: "Layout non ancora implementato",
            genericList: "Lista",
            genericLoadMoreData: "Carica più dati",
            genericMenu: "Menu",
            genericMerge: "Unisci",
            genericMonth: "Mese",
            genericMove: "Sposta",
            genericNext: "Avanti",
            genericNo: "No",
            genericOpenInNewTab: "Apri in nuovo tab",
            genericOpenInNewWindow: "Apri in nuova finestra",
            genericOpenNavigationMenu: "Apri menu di navigazione",
            genericOptions: "Opzioni",
            genericPrevious: "Indietro",
            genericRemoveFilters: "Rimuovi filtri",
            genericSettings: "Impostazioni",
            genericShowRowOptions: "Mostra opzioni di riga",
            genericShowTooltipInfo: "Mostra informazioni tooltip",
            genericSortBy: "Ordina per",
            genericSwap: "Scambia",
            genericToday: "Oggi",
            genericToggle: "Attiva",
            genericTop: "Top",
            genericTotalsTable: "Tabella dei totali",
            genericTransposeData: "Trasposizione dati",
            genericViewAs: "Vedi come",
            genericWeek: "Settimana",
            genericYes: "Sì",
            gridColumn: "Colonna",
            gridComplete: "Completa",
            gridLabel: "Tipo di griglia",
            gridNone: "Nessuna",
            gridRow: "Riga",
            groupingDisable: "Disabilita gruppo",
            groupingEnable: "Abilita gruppo",
            groupingGroups: "Gruppo",
            pagePage: "Pagina",
            pageTotal: "Totale",
            rowDetail: "Dettaglio riga",
            rowEditableKey: "Chiave record editabile",
            rowKey: "Chiave record",
            rowNext: "Riga successiva",
            rowPrevious: "Riga precedente",
            rowRendered: "Righe renderizzate",
            rowRows: "Righe",
            rowSelected: "Righe selezionate",
            rowTotal: "Righe totali",
            searchFrom: "Da...",
            searchSearch: "Cerca...",
            searchTo: "A...",
            totalsAverage: "Media",
            totalsCalculate: "Calcola",
            totalsCancel: "Cancella",
            totalsCount: "Conta",
            totalsDifference: "Differenza",
            totalsDistinct: "Distinct",
            totalsFormula: "Formula",
            totalsMinimum: "Minimo",
            totalsMaximum: "Massimo",
            totalsProduct: "Prodotto",
            totalsSum: "Somma",
        },
        variants: {
            smeup: {
                keys: {
                    columnNonNumericalInTable: "Non esistono colonne numeriche in questa matrice.",
                    genericEditableField: "Questo OAV è editabile",
                    genericTotalsTable: "Matrice dei totali",
                    groupingDisable: "Disabilita raggruppamento",
                    groupingEnable: "Abilita raggruppamento",
                    groupingGroups: "Raggruppamento",
                    rowEditableKey: "K01 (editabile)",
                    rowKey: "K01",
                },
            },
        },
    },
    polish: {
        keys: {
            keys: "",
            checkboxAll: "Wszystko",
            checkboxChecked: "Sprawdzone",
            checkboxIndeterminate: "Nieokreślony",
            checkboxUnchecked: "Niepowstrzymany",
            columnAdd: "Dodaj kolumnę",
            columnAddDescription: "Dodaj kolumnę z kodem / opisem",
            columnColumns: "Kolumny",
            columnHide: "Ukryj kolumnę",
            columnMerge: "Scal kolumny",
            columnNoFormula: "Brak dostępnych formuł dla tych kolumn.",
            columnNonNumerical: "Te kolumny nie są numeryczne.",
            columnNonNumericalInTable: "W tej tabeli nie ma kolumn liczbowych.",
            columnSwap: "Zamień kolumny",
            dashboardDimension: "Wymiar",
            dashboardLoaded: "Załadowany",
            dashboardReset: "Resetowanie",
            dashboardSave: "Ratować",
            dashboardVertical: "Pionowy",
            debugAutoprint: "Przełącz automatyczne drukowanie",
            debugClear: "Wyczyść widżet",
            debugDLAll: "Wszystko",
            debugDLProps: "Pobierz właściwości komponentów",
            debugDLPropsComp: "Pobierz rekwizyty komponentów",
            debugDump: "Zrzuć zapisane dzienniki",
            debugLanguageChanger: "Ustaw język",
            debugLocaleChanger: "Ustaw język",
            debugLogLimit: "Ustaw limit logów",
            debugMagicBox: "Przełącz kul-magic-box",
            debugOff: "Wyłącz debugowanie",
            debugPrint: "Drukuj zapisane logi",
            debugThemeChanger: "Ustaw motyw",
            densityDense: "Gęsty",
            densityLabel: "Gęstość rzędów",
            densityMedium: "Średni",
            densityWide: "Szeroki",
            fontsizeBig: "Duży",
            fontsizeLabel: "Rozmiar czcionki",
            fontsizeMedium: "Średni",
            fontsizeSmall: "Mały",
            genericAbort: "Anulować",
            genericAddNew: "Dodaj nowe",
            genericApply: "Zastosować",
            genericBack: "Plecy",
            genericCollapse: "Zawalić się",
            genericConfirm: "Potwierdzać",
            genericConfirmDelete: "Potwierdzasz odwołanie?",
            genericConfirmDeleteXRows: "Usunąć ({0}) wiersze?",
            genericDay: "Dzień",
            genericDragAndDrop: "Przeciągnij i upuść",
            genericDropYourData: "Upuść swoje dane tutaj",
            genericEditable: "Edytowalne",
            genericEditableField: "To pole można edytować",
            genericEmptyData: "Puste dane",
            genericEmptyObject: "Puste obiekt",
            genericExpand: "Rozszerzać",
            genericExperimentalFeat: "Funkcja eksperymentalna",
            genericFilters: "Filtry",
            genericInfo: "Informacje",
            genericInvalidColor: "Nieprawidłowy kolor",
            genericLayoutNotYetImplemented: "Układ nie został jeszcze zaimplementowany",
            genericList: "Lista",
            genericLoadMoreData: "Załaduj więcej danych",
            genericMenu: "Menu",
            genericMerge: "Łączyć",
            genericMonth: "Miesiąc",
            genericMove: "Ruszaj się",
            genericNext: "Następny",
            genericNo: "Nie",
            genericOpenInNewTab: "Otwórz w nowej karcie",
            genericOpenInNewWindow: "Otworzyć w nowym oknie",
            genericOpenNavigationMenu: "Otwórz menu nawigacyjne",
            genericOptions: "Opcje",
            genericPrevious: "Poprzedni",
            genericRemoveFilters: "Usuń filtry",
            genericSettings: "Ustawienia",
            genericShowRowOptions: "Pokaż opcje wierszy",
            genericShowTooltipInfo: "Pokaż informacje w podpowiedzi",
            genericSortBy: "Sortuj według",
            genericSwap: "Zamiana",
            genericToday: "Dziś",
            genericToggle: "Przełącznik",
            genericTop: "Szczyt",
            genericTotalsTable: "Tabela sum",
            genericTransposeData: "Transpozycja danych",
            genericViewAs: "Wyświetl jako",
            genericWeek: "Tydzień",
            genericYes: "TAk",
            gridColumn: "Kolumna",
            gridComplete: "Kompletny",
            gridLabel: "Typ siatki",
            gridNone: "Żaden",
            gridRow: "Rząd",
            groupingDisable: "Wyłącz grupowanie",
            groupingEnable: "Włącz grupowanie",
            groupingGroups: "Grupy",
            pagePage: "Strona",
            pageTotal: "Wszystkie strony",
            rowDetail: "Szczegóły rzędu",
            rowEditableKey: "Edytowalny klucz nagrywania",
            rowKey: "Klucz nagrywania",
            rowNext: "Następny rząd",
            rowPrevious: "Poprzedni wiersz",
            rowRendered: "Renderowane wiersze",
            rowRows: "Wydziwianie",
            rowSelected: "Wybrane wiersze",
            rowTotal: "Łączna liczba wierszy",
            searchFrom: "Z",
            searchSearch: "Szukaj",
            searchTo: "Do",
            totalsAverage: "Średni",
            totalsCalculate: "Oblicz",
            totalsCancel: "Anuluj",
            totalsCount: "Liczyć",
            totalsDifference: "Różnica",
            totalsDistinct: "Odrębny",
            totalsFormula: "Formuła",
            totalsMinimum: "Minimo",
            totalsMaximum: "Maksymalny",
            totalsProduct: "Iloczyn",
            totalsSum: "Suma",
        },
    },
    russian: {
        keys: {
            checkboxAll: "Все",
            checkboxChecked: "Проверено",
            checkboxIndeterminate: "Неопределенный",
            checkboxUnchecked: "Не отмечено",
            columnAdd: "Добавить столбец",
            columnAddDescription: "Добавить столбец кода / описания",
            columnColumns: "Столбцы",
            columnHide: "Скрыть столбец",
            columnMerge: "Объединить столбцы",
            columnNoFormula: "Для этих столбцов нет доступных формул",
            columnNonNumerical: "Эти столбцы не числовые",
            columnNonNumericalInTable: "В этой таблице нет числовых столбцов",
            columnSwap: "Поменять местами столбцы",
            dashboardDimension: "Измерение",
            dashboardLoaded: "Загружено",
            dashboardReset: "Перезагрузить",
            dashboardSave: "Сохранять",
            dashboardVertical: "Вертикальный",
            debugAutoprint: "Включить автоматическую печать",
            debugClear: "Очистить виджет",
            debugDLAll: "Все",
            debugDLProps: "Загрузить свойства компонентов",
            debugDLPropsComp: "Скачать реквизиты компонентов",
            debugDump: "Дамп сохраненных журналов",
            debugLanguageChanger: "Установить язык",
            debugLocaleChanger: "Установить языковой стандарт",
            debugLogLimit: "Установить ограничение журнала",
            debugMagicBox: "Переключить волшебный ящик купа",
            debugOff: "Отключить отладку",
            debugPrint: "Печать сохраненных журналов",
            debugThemeChanger: "Установить тему",
            densityDense: "Плотный",
            densityLabel: "Плотность строк",
            densityMedium: "Середина",
            densityWide: "Широкий",
            fontsizeBig: "Большой",
            fontsizeLabel: "Размер шрифта",
            fontsizeMedium: "Середина",
            fontsizeSmall: "Небольшой",
            genericAbort: "Отмена",
            genericAddNew: "Добавить новое",
            genericApply: "Применять",
            genericBack: "назад",
            genericCollapse: "Kpax",
            genericConfirm: "Подтверждать",
            genericConfirmDelete: "вы подтверждаете отмену?",
            genericConfirmDeleteXRows: "Удалить ({0}) строки?",
            genericDay: "День",
            genericDragAndDrop: "Перетащить и отпустить",
            genericDropYourData: "Перетащите сюда свои данные",
            genericEditable: "Редактируемый",
            genericEditableField: "Это поле можно редактировать",
            genericEmptyData: "Пустые данные",
            genericEmptyObject: "Пустые объект",
            genericExpand: "Расширять",
            genericExperimentalFeat: "Экспериментальная особенность",
            genericFilters: "Фильтры",
            genericInfo: "Информация",
            genericInvalidColor: "Неверный цвет",
            genericLayoutNotYetImplemented: "Макет еще не реализован",
            genericList: "Список",
            genericLoadMoreData: "Загрузить больше данных",
            genericMenu: "Меню",
            genericMerge: "Объединить",
            genericMonth: "Месяц",
            genericMove: "Переехать",
            genericNext: "Следующий",
            genericNo: "Нет",
            genericOpenInNewTab: "Открыть в новой вкладке",
            genericOpenInNewWindow: "Открыть в новом окне",
            genericOpenNavigationMenu: "Открыть меню навигации",
            genericOptions: "Параметры",
            genericPrevious: "Предыдущий",
            genericRemoveFilters: "Удалить фильтры",
            genericSettings: "Настройки",
            genericShowRowOptions: "Показать параметры строки",
            genericShowTooltipInfo: "Показать информацию во всплывающей подсказке",
            genericSortBy: "Сортировать по",
            genericSwap: "Менять",
            genericToday: "Сегодня",
            genericToggle: "Переключать",
            genericTop: "Вершина",
            genericTotalsTable: "Итоговая таблица",
            genericTransposeData: "Транспонировать данные",
            genericViewAs: "Просмотреть как",
            genericWeek: "Неделя",
            genericYes: "Да",
            gridColumn: "Столбец",
            gridComplete: "Полный",
            gridLabel: "Тип сетки",
            gridNone: "Никто",
            gridRow: "Строка",
            groupingDisable: "Отключить группировку",
            groupingEnable: "Включить группировку",
            groupingGroups: "Группы",
            pagePage: "Страница",
            pageTotal: "Всего страниц",
            rowDetail: "Детали строки",
            rowEditableKey: "Редактируемый ключ записи",
            rowKey: "Ключ записи",
            rowNext: "Следующая строка",
            rowPrevious: "Предыдущая строка",
            rowRendered: "Отрисованные строки",
            rowRows: "Рядов",
            rowSelected: "Выбранные строки",
            rowTotal: "Всего строк",
            searchFrom: "Из",
            searchSearch: "Поиск",
            searchTo: "К",
            totalsAverage: "В среднем",
            totalsCalculate: "Рассчитать",
            totalsCancel: "Отмена",
            totalsCount: "Считать",
            totalsDifference: "Разница",
            totalsDistinct: "Отчетливый",
            totalsFormula: "Формула",
            totalsMinimum: "Минимум",
            totalsMaximum: "Максимум",
            totalsProduct: "Продукт",
            totalsSum: "Сумма",
        },
    },
    spanish: {
        keys: {
            checkboxAll: "Todas",
            checkboxChecked: "Marcado",
            checkboxIndeterminate: "Indeterminado",
            checkboxUnchecked: "Sin marcar",
            columnAdd: "Añadir columna",
            columnAddDescription: "Agregar columna de código / descripción",
            columnColumns: "Columnas",
            columnHide: "Ocultar columna",
            columnMerge: "Fusionar columnas",
            columnNoFormula: "No hay fórmulas disponibles para estas columnas.",
            columnNonNumerical: "Estas columnas no son numéricas.",
            columnNonNumericalInTable: "No existen columnas numéricas en esta tabla.",
            columnSwap: "Intercambiar columnas",
            dashboardDimension: "Dimensión",
            dashboardLoaded: "Cargado",
            dashboardReset: "Reiniciar",
            dashboardSave: "Ahorrar",
            dashboardVertical: "Vertical",
            debugAutoprint: "Alternar impresión automática",
            debugClear: "Borrar widget",
            debugDLAll: "Todas",
            debugDLProps: "Descargar accesorios de componentes",
            debugDLPropsComp: "Descargar accesorios de componentes",
            debugDump: "Volcar registros almacenados",
            debugLanguageChanger: "Establecer idioma",
            debugLocaleChanger: "Establecer configuración regional",
            debugLogLimit: "Establecer límite de registro",
            debugMagicBox: "Alternar kul-magic-box",
            debugOff: "Desactivar depuración",
            debugPrint: "Imprimir registros almacenados",
            debugThemeChanger: "Establecer tema",
            densityDense: "Densa",
            densityLabel: "Densidad de hileras",
            densityMedium: "Medio",
            densityWide: "Amplia",
            fontsizeBig: "Grande",
            fontsizeLabel: "Tamaño de fuente",
            fontsizeMedium: "Medio",
            fontsizeSmall: "Pequeño",
            genericAbort: "Cancelar",
            genericAddNew: "Añadir nuevo",
            genericApply: "Solicitar",
            genericBack: "Espalda",
            genericCollapse: "Colapso",
            genericConfirm: "Confirmar",
            genericConfirmDelete: "¿Confirmas la cancelación?",
            genericConfirmDeleteXRows: "¿Eliminar ({0}) filas?",
            genericDay: "Día",
            genericDragAndDrop: "Arrastrar y soltar",
            genericDropYourData: "Deja tus datos aquí",
            genericEditable: "Editable",
            genericEditableField: "Este campo se puede editar",
            genericEmptyData: "Datos vacíos",
            genericEmptyObject: "Objeto vacíos",
            genericExpand: "Expandir",
            genericExperimentalFeat: "Característica experimental",
            genericFilters: "Filtros",
            genericInfo: "Información",
            genericInvalidColor: "Color inválido",
            genericLayoutNotYetImplemented: "Diseño aún no implementado",
            genericList: "Lista",
            genericLoadMoreData: "Cargar más datos",
            genericMenu: "Menú",
            genericMerge: "Unir",
            genericMonth: "Mes",
            genericMove: "Mover",
            genericNext: "Próximo",
            genericNo: "No",
            genericOpenInNewTab: "Abrir en una pestaña nueva",
            genericOpenInNewWindow: "Abrir en Nueva ventana",
            genericOpenNavigationMenu: "Abrir menú de navegación",
            genericOptions: "Opciones",
            genericPrevious: "Previo",
            genericRemoveFilters: "Quitar filtros",
            genericSettings: "Ajustes",
            genericShowRowOptions: "Mostrar opciones de fila",
            genericShowTooltipInfo: "Mostrar información de información sobre herramientas",
            genericSortBy: "Ordenar por",
            genericSwap: "Intercambio",
            genericToday: "Hoy dia",
            genericToggle: "Palanca",
            genericTop: "Cima",
            genericTotalsTable: "Tabla de totales",
            genericTransposeData: "Transponer datos",
            genericViewAs: "Visto como",
            genericWeek: "Semana",
            genericYes: "Sí",
            gridColumn: "Columna",
            gridComplete: "Completa",
            gridLabel: "Tipo de cuadrícula",
            gridNone: "Ninguna",
            gridRow: "Fila",
            groupingDisable: "Desactivar agrupación",
            groupingEnable: "Habilitar agrupación",
            groupingGroups: "Grupo",
            pagePage: "Página",
            pageTotal: "Paginas totales",
            rowDetail: "Detalle de fila",
            rowEditableKey: "Clave de registro editable",
            rowKey: "Grabar clave",
            rowNext: "Siguiente fila",
            rowPrevious: "Fila anterior",
            rowRendered: "Filas renderizadas",
            rowRows: "Filas",
            rowSelected: "Filas seleccionadas",
            rowTotal: "Filas totales",
            searchFrom: "De",
            searchSearch: "Buscar",
            searchTo: "A",
            totalsAverage: "Promedio",
            totalsCalculate: "Calcular",
            totalsCancel: "Cancelar",
            totalsCount: "Contar",
            totalsDifference: "Diferencia",
            totalsDistinct: "Distinct",
            totalsFormula: "Fórmula",
            totalsMaximum: "Máximo",
            totalsMinimum: "Mínimo",
            totalsProduct: "Producto",
            totalsSum: "Suma",
        },
    },
};

class KulLanguage {
    constructor(list, name) {
        this.dom = document.documentElement;
        this.list = list ? list : languagesJson;
        this.managedComponents = new Set();
        this.name = name ? name : KulLanguageDefaults.en;
    }
    translate(key, language) {
        const decodedLanguage = this.decodeLanguage(language ? language : this.name);
        const name = decodedLanguage.language;
        const variantName = decodedLanguage.variant;
        try {
            let translatedString = null;
            if (variantName) {
                const variants = this.list[name].variants;
                if (variants &&
                    variants[variantName] &&
                    variants[variantName].keys[key]) {
                    translatedString = variants[variantName].keys[key];
                }
                else {
                    translatedString = this.list[name].keys[key];
                }
            }
            else {
                translatedString = this.list[name].keys[key];
            }
            if (translatedString) {
                return translatedString;
            }
            else {
                return invalidKey(key);
            }
        }
        catch (error) {
            return invalidKey(key);
        }
        function invalidKey(key) {
            this.dom.ketchupLite.debug.logs.new(this, "Invalid translation for key (" + key + ")!", "warning");
            return key;
        }
    }
    set(language) {
        if (language && typeof language === "string") {
            language = language.toLowerCase();
        }
        else {
            this.dom.ketchupLite.debug.logs.new(this, "Couldn't set language, invalid string received (" + language + ")!", "warning");
            return;
        }
        const decodedLanguage = this.decodeLanguage(language);
        const dLanguage = decodedLanguage.language;
        const dVariant = decodedLanguage.variant;
        if (this.list[dLanguage]) {
            if (dVariant && !this.list[dLanguage].variants[dVariant]) {
                this.dom.ketchupLite.debug.logs.new(this, "Variant not found (" + dVariant + ")!", "warning");
                return;
            }
        }
        else {
            this.dom.ketchupLite.debug.logs.new(this, "Language not found (" + dLanguage + ")!", "warning");
            return;
        }
        this.name = language;
        this.managedComponents.forEach(function (comp) {
            if (comp.isConnected) {
                comp.refresh();
            }
        });
        document.dispatchEvent(new CustomEvent("kul-language-change"));
    }
    decodeLanguage(language) {
        const result = {
            language: null,
            variant: null,
        };
        const separator = language.indexOf("_");
        if (separator > -1) {
            result.variant = language.substring(separator + 1);
            result.language = language.substring(0, separator);
        }
        else {
            result.language = language;
        }
        return result;
    }
    getBCP47(language = this.name?.split("_")[0]) {
        const bcp47Map = {
            chinese: "zh-CN",
            english: "en-US",
            spanish: "es-ES",
            italian: "it-IT",
            french: "fr-FR",
            polish: "pl-PL",
            russian: "ru-RU",
        };
        return bcp47Map[language];
    }
    getLanguages() {
        const languages = [];
        for (var key in this.list) {
            if (this.list.hasOwnProperty(key)) {
                const language = this.list[key];
                languages.push(key);
                for (const variantKey in language.variants) {
                    languages.push(key + "_" + variantKey);
                }
            }
        }
        return languages;
    }
    register(component) {
        this.managedComponents.add(component.rootElement ? component.rootElement : component);
    }
    unregister(component) {
        if (this.managedComponents) {
            this.managedComponents.delete(component.rootElement ? component.rootElement : component);
        }
    }
}

var ScrollOnHoverDirection;
(function (ScrollOnHoverDirection) {
    ScrollOnHoverDirection["BOTTOM"] = "bottom";
    ScrollOnHoverDirection["LEFT"] = "left";
    ScrollOnHoverDirection["RIGHT"] = "right";
    ScrollOnHoverDirection["TOP"] = "top";
})(ScrollOnHoverDirection || (ScrollOnHoverDirection = {}));

var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet$2 = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _KulScrollOnHover_instances, _KulScrollOnHover_arrowsContainer, _KulScrollOnHover_DOM, _KulScrollOnHover_leftArrows, _KulScrollOnHover_rightArrows, _KulScrollOnHover_scrollEvent, _KulScrollOnHover_mousemoveEvent, _KulScrollOnHover_mouseleaveEvent, _KulScrollOnHover_rAF, _KulScrollOnHover_timeout, _KulScrollOnHover_initArrows;
class KulScrollOnHover {
    constructor(delay, step) {
        _KulScrollOnHover_instances.add(this);
        _KulScrollOnHover_arrowsContainer.set(this, void 0);
        _KulScrollOnHover_DOM.set(this, document.documentElement);
        _KulScrollOnHover_leftArrows.set(this, void 0);
        _KulScrollOnHover_rightArrows.set(this, void 0);
        _KulScrollOnHover_scrollEvent.set(this, void 0);
        _KulScrollOnHover_mousemoveEvent.set(this, void 0);
        _KulScrollOnHover_mouseleaveEvent.set(this, void 0);
        _KulScrollOnHover_rAF.set(this, void 0);
        _KulScrollOnHover_timeout.set(this, void 0);
        this.delay = delay ? delay : 500;
        this.managedElements = new Set();
        this.step = step ? step : 50;
        __classPrivateFieldSet(this, _KulScrollOnHover_mouseleaveEvent, (event) => this.stop(event.target), "f");
        __classPrivateFieldSet(this, _KulScrollOnHover_mousemoveEvent, (event) => this.start(event), "f");
        __classPrivateFieldSet(this, _KulScrollOnHover_rAF, null, "f");
        __classPrivateFieldSet(this, _KulScrollOnHover_scrollEvent, (event) => this.updateChildren(event.target), "f");
        __classPrivateFieldSet(this, _KulScrollOnHover_timeout, null, "f");
    }
    register(el, vertical, percentages, step) {
        if (!__classPrivateFieldGet$2(this, _KulScrollOnHover_arrowsContainer, "f")) {
            __classPrivateFieldGet$2(this, _KulScrollOnHover_instances, "m", _KulScrollOnHover_initArrows).call(this);
        }
        el.style.overflowX = "auto";
        el.scrollOnHover = {
            active: false,
            children: el.querySelectorAll(".hover-scrolling-child"),
            percentages: percentages ? percentages : { back: 0.1, forward: 0.9 },
            rect: null,
            step: step,
            vertical: vertical || null,
            x: 0,
            y: 0,
        };
        if (el.scrollOnHover.children) {
            el.addEventListener("scroll", __classPrivateFieldGet$2(this, _KulScrollOnHover_scrollEvent, "f"));
        }
        el.addEventListener("mousemove", __classPrivateFieldGet$2(this, _KulScrollOnHover_mousemoveEvent, "f"));
        el.addEventListener("mouseleave", __classPrivateFieldGet$2(this, _KulScrollOnHover_mouseleaveEvent, "f"));
        this.managedElements.add(el);
    }
    unregister(el) {
        el.removeEventListener("scroll", __classPrivateFieldGet$2(this, _KulScrollOnHover_scrollEvent, "f"));
        el.removeEventListener("mousemove", __classPrivateFieldGet$2(this, _KulScrollOnHover_mousemoveEvent, "f"));
        el.removeEventListener("mouseleave", __classPrivateFieldGet$2(this, _KulScrollOnHover_mouseleaveEvent, "f"));
        if (this.managedElements) {
            this.managedElements.delete(el);
        }
    }
    isRegistered(el) {
        return !this.managedElements ? false : this.managedElements.has(el);
    }
    async start(event) {
        const el = event.currentTarget;
        el.scrollOnHover.rect = el.getBoundingClientRect();
        el.scrollOnHover.x = event.clientX;
        el.scrollOnHover.y = event.clientY;
        __classPrivateFieldGet$2(this, _KulScrollOnHover_arrowsContainer, "f").style.left = event.clientX + "px";
        __classPrivateFieldGet$2(this, _KulScrollOnHover_arrowsContainer, "f").style.top = event.clientY + "px";
        if (el.scrollOnHover.active || __classPrivateFieldGet$2(this, _KulScrollOnHover_timeout, "f")) {
            return;
        }
        let trueHeight = el.clientHeight;
        if (trueHeight === 0) {
            trueHeight = el.offsetHeight;
        }
        let trueWidth = el.clientWidth;
        if (trueWidth === 0) {
            trueWidth = el.offsetWidth;
        }
        if (el.scrollWidth > trueWidth + 10) {
            if (trueWidth !== 0 && !el.scrollOnHover.active) {
                const percRight = trueWidth - trueWidth * el.scrollOnHover.percentages.back;
                const percLeft = trueWidth - trueWidth * el.scrollOnHover.percentages.forward;
                const elOffset = el.scrollOnHover.x - el.scrollOnHover.rect.left;
                const maxScrollLeft = el.scrollWidth - trueWidth;
                const direction = elOffset < percLeft && el.scrollLeft !== 0
                    ? ScrollOnHoverDirection.LEFT
                    : elOffset > percRight && el.scrollLeft !== maxScrollLeft
                        ? ScrollOnHoverDirection.RIGHT
                        : null;
                if (direction) {
                    for (let i = 0; i < 3; i++) {
                        if (direction === ScrollOnHoverDirection.LEFT) {
                            __classPrivateFieldGet$2(this, _KulScrollOnHover_leftArrows, "f")[i].classList.add("kul-activated");
                        }
                        else {
                            __classPrivateFieldGet$2(this, _KulScrollOnHover_rightArrows, "f")[i].classList.add("kul-activated");
                        }
                    }
                    const dom = __classPrivateFieldGet$2(this, _KulScrollOnHover_DOM, "f");
                    __classPrivateFieldSet(this, _KulScrollOnHover_timeout, setTimeout(() => {
                        el.scrollOnHover.active = true;
                        __classPrivateFieldSet(this, _KulScrollOnHover_rAF, requestAnimationFrame(function () {
                            dom.ketchupLite.scrollOnHover.run(el, maxScrollLeft, percRight, percLeft, direction);
                        }), "f");
                    }, this.delay), "f");
                }
            }
        }
        if (el.scrollOnHover.vertical && el.scrollHeight > trueHeight + 10) {
            if (trueHeight !== 0 && !el.scrollOnHover.active) {
                const percBottom = trueHeight - trueHeight * el.scrollOnHover.percentages.back;
                const percTop = trueHeight - trueHeight * el.scrollOnHover.percentages.forward;
                const elOffset = el.scrollOnHover.y - el.scrollOnHover.rect.top;
                const maxScrollTop = el.scrollHeight - trueHeight;
                const direction = elOffset < percTop && el.scrollTop !== 0
                    ? ScrollOnHoverDirection.TOP
                    : elOffset > percBottom && el.scrollTop !== maxScrollTop
                        ? ScrollOnHoverDirection.BOTTOM
                        : null;
                if (direction) {
                    const dom = __classPrivateFieldGet$2(this, _KulScrollOnHover_DOM, "f");
                    __classPrivateFieldSet(this, _KulScrollOnHover_timeout, setTimeout(() => {
                        el.scrollOnHover.active = true;
                        __classPrivateFieldSet(this, _KulScrollOnHover_rAF, requestAnimationFrame(function () {
                            dom.ketchupLite.scrollOnHover.run(el, maxScrollTop, percBottom, percTop, direction);
                        }), "f");
                    }, this.delay), "f");
                }
            }
        }
    }
    async stop(el) {
        el.scrollOnHover.active = false;
        cancelAnimationFrame(__classPrivateFieldGet$2(this, _KulScrollOnHover_rAF, "f"));
        clearTimeout(__classPrivateFieldGet$2(this, _KulScrollOnHover_timeout, "f"));
        __classPrivateFieldSet(this, _KulScrollOnHover_timeout, null, "f");
        for (let i = 0; i < __classPrivateFieldGet$2(this, _KulScrollOnHover_leftArrows, "f").length; i++) {
            __classPrivateFieldGet$2(this, _KulScrollOnHover_leftArrows, "f")[i].classList.remove("kul-activated");
            __classPrivateFieldGet$2(this, _KulScrollOnHover_leftArrows, "f")[i].classList.remove("kul-animated");
        }
        for (let i = 0; i < __classPrivateFieldGet$2(this, _KulScrollOnHover_rightArrows, "f").length; i++) {
            __classPrivateFieldGet$2(this, _KulScrollOnHover_rightArrows, "f")[i].classList.remove("kul-activated");
            __classPrivateFieldGet$2(this, _KulScrollOnHover_rightArrows, "f")[i].classList.remove("kul-animated");
        }
    }
    run(el, maxScrollLeft, percForward, percBack, direction) {
        if (!el.scrollOnHover.active) {
            this.stop(el);
            return;
        }
        let offset = 0;
        switch (direction) {
            case ScrollOnHoverDirection.BOTTOM:
            case ScrollOnHoverDirection.TOP: {
                offset = el.scrollOnHover.y - el.scrollOnHover.rect.top;
                if (offset > percBack && offset < percForward) {
                    this.stop(el);
                    return;
                }
                break;
            }
            case ScrollOnHoverDirection.LEFT:
            case ScrollOnHoverDirection.RIGHT: {
                offset = el.scrollOnHover.x - el.scrollOnHover.rect.left;
                if (offset > percBack && offset < percForward) {
                    this.stop(el);
                    return;
                }
                break;
            }
        }
        if (direction === ScrollOnHoverDirection.RIGHT && percForward > offset) {
            this.stop(el);
            return;
        }
        if (direction === ScrollOnHoverDirection.LEFT && percBack < offset) {
            this.stop(el);
            return;
        }
        if (direction === ScrollOnHoverDirection.TOP && percBack < offset) {
            this.stop(el);
            return;
        }
        if (direction === ScrollOnHoverDirection.BOTTOM && percForward > offset) {
            this.stop(el);
            return;
        }
        if (el.scrollOnHover.children) {
            this.updateChildren(el);
        }
        let arrow;
        switch (direction) {
            case ScrollOnHoverDirection.BOTTOM: {
                arrow = [];
                if (el.scrollTop === maxScrollLeft) {
                    this.stop(el);
                    return;
                }
                el.scrollTop += el.scrollOnHover.step
                    ? el.scrollOnHover.step
                    : this.step;
                break;
            }
            case ScrollOnHoverDirection.LEFT: {
                arrow = __classPrivateFieldGet$2(this, _KulScrollOnHover_leftArrows, "f");
                if (el.scrollLeft === 0) {
                    this.stop(el);
                    return;
                }
                el.scrollLeft -= el.scrollOnHover.step
                    ? el.scrollOnHover.step
                    : this.step;
                break;
            }
            case ScrollOnHoverDirection.RIGHT: {
                arrow = __classPrivateFieldGet$2(this, _KulScrollOnHover_rightArrows, "f");
                if (el.scrollLeft === maxScrollLeft) {
                    this.stop(el);
                    return;
                }
                el.scrollLeft += el.scrollOnHover.step
                    ? el.scrollOnHover.step
                    : this.step;
                break;
            }
            case ScrollOnHoverDirection.TOP: {
                arrow = [];
                if (el.scrollTop === 0) {
                    this.stop(el);
                    return;
                }
                el.scrollTop -= el.scrollOnHover.step
                    ? el.scrollOnHover.step
                    : this.step;
                break;
            }
        }
        for (let i = 0; i < arrow.length; i++) {
            arrow[i].classList.add("kul-animated");
        }
        const dom = __classPrivateFieldGet$2(this, _KulScrollOnHover_DOM, "f");
        __classPrivateFieldSet(this, _KulScrollOnHover_rAF, requestAnimationFrame(function () {
            dom.ketchupLite.scrollOnHover.run(el, maxScrollLeft, percForward, percBack, direction);
        }), "f");
    }
    updateChildren(el) {
        for (let i = 0; i < el.scrollOnHover.children.length; i++) {
            el.scrollOnHover.children[i].scrollLeft = el.scrollLeft;
        }
    }
}
_KulScrollOnHover_arrowsContainer = new WeakMap(), _KulScrollOnHover_DOM = new WeakMap(), _KulScrollOnHover_leftArrows = new WeakMap(), _KulScrollOnHover_rightArrows = new WeakMap(), _KulScrollOnHover_scrollEvent = new WeakMap(), _KulScrollOnHover_mousemoveEvent = new WeakMap(), _KulScrollOnHover_mouseleaveEvent = new WeakMap(), _KulScrollOnHover_rAF = new WeakMap(), _KulScrollOnHover_timeout = new WeakMap(), _KulScrollOnHover_instances = new WeakSet(), _KulScrollOnHover_initArrows = function _KulScrollOnHover_initArrows() {
    __classPrivateFieldSet(this, _KulScrollOnHover_arrowsContainer, document.createElement("div"), "f");
    __classPrivateFieldSet(this, _KulScrollOnHover_leftArrows, [], "f");
    __classPrivateFieldSet(this, _KulScrollOnHover_rightArrows, [], "f");
    __classPrivateFieldGet$2(this, _KulScrollOnHover_arrowsContainer, "f").id = "kul-scrolling-arrows";
    for (let index = 1; index < 4; index++) {
        const arrow = document.createElement("div");
        arrow.setAttribute("class", "kul-left-scrolling-arrow kul-arrow-" + index);
        __classPrivateFieldGet$2(this, _KulScrollOnHover_leftArrows, "f").push(arrow);
    }
    for (let index = 1; index < 4; index++) {
        const arrow = document.createElement("div");
        arrow.setAttribute("class", "kul-right-scrolling-arrow kul-arrow-" + index);
        __classPrivateFieldGet$2(this, _KulScrollOnHover_rightArrows, "f").push(arrow);
    }
    __classPrivateFieldGet$2(this, _KulScrollOnHover_arrowsContainer, "f").append(__classPrivateFieldGet$2(this, _KulScrollOnHover_leftArrows, "f")[2], __classPrivateFieldGet$2(this, _KulScrollOnHover_leftArrows, "f")[1], __classPrivateFieldGet$2(this, _KulScrollOnHover_leftArrows, "f")[0], __classPrivateFieldGet$2(this, _KulScrollOnHover_rightArrows, "f")[0], __classPrivateFieldGet$2(this, _KulScrollOnHover_rightArrows, "f")[1], __classPrivateFieldGet$2(this, _KulScrollOnHover_rightArrows, "f")[2]);
    this.container = document.createElement("div");
    this.container.setAttribute("kul-scroll-on-hover", "");
    this.container.appendChild(__classPrivateFieldGet$2(this, _KulScrollOnHover_arrowsContainer, "f"));
    document.body.appendChild(this.container);
};

var KulThemeColorValues;
(function (KulThemeColorValues) {
    KulThemeColorValues["PRIMARY"] = "--kul-primary-color";
    KulThemeColorValues["SECONDARY"] = "--kul-secondary-color";
    KulThemeColorValues["BACKGROUND"] = "--kul-background-color";
    KulThemeColorValues["NAV_BAR"] = "--kul-header-color";
    KulThemeColorValues["NAV_BAR_BACKGROUND"] = "--kul-header-background-color";
    KulThemeColorValues["DRAWER"] = "--kul-drawer-color";
    KulThemeColorValues["DRAWER_BACKGROUND"] = "--kul-drawer-background-color";
    KulThemeColorValues["TEXT"] = "--kul-text-color";
    KulThemeColorValues["TEXT_ON_PRIMARY"] = "--kul-text-on-primary-color";
    KulThemeColorValues["TEXT_ON_SECONDARY"] = "--kul-text-on-secondary-color";
    KulThemeColorValues["DISABLED_BACKGROUND"] = "--kul-disabled-background-color";
    KulThemeColorValues["DISABLED"] = "--kul-disabled-color";
    KulThemeColorValues["HOVER_BACKGROUND"] = "--kul-hover-background-color";
    KulThemeColorValues["HOVER"] = "--kul-hover-color";
    KulThemeColorValues["TITLE_BACKGROUND"] = "--kul-title-background-color";
    KulThemeColorValues["TITLE"] = "--kul-title-color";
    KulThemeColorValues["ICON"] = "--kul-icon-color";
    KulThemeColorValues["BORDER"] = "--kul-border-color";
    KulThemeColorValues["INFO"] = "--kul-info-color";
    KulThemeColorValues["SUCCESS"] = "--kul-success-color";
    KulThemeColorValues["WARNING"] = "--kul-warning-color";
    KulThemeColorValues["DANGER"] = "--kul-danger-color";
    KulThemeColorValues["SPINNER"] = "--kul-spinner-color";
    KulThemeColorValues["CHART_1"] = "--kul-chart-color-1";
    KulThemeColorValues["CHART_2"] = "--kul-chart-color-2";
    KulThemeColorValues["CHART_3"] = "--kul-chart-color-3";
    KulThemeColorValues["CHART_4"] = "--kul-chart-color-4";
})(KulThemeColorValues || (KulThemeColorValues = {}));
var KulThemeFonts;
(function (KulThemeFonts) {
    KulThemeFonts["ABEL"] = "Abel";
    KulThemeFonts["BLINKER"] = "Blinker";
    KulThemeFonts["CRIMSON_TEXT"] = "CrimsonText";
    KulThemeFonts["FIRA_CODE"] = "FiraCode";
    KulThemeFonts["IBM_PLEX"] = "IBMPlexSans";
    KulThemeFonts["INTER"] = "Inter";
    KulThemeFonts["LATO"] = "Lato";
    KulThemeFonts["MALI"] = "Mali";
    KulThemeFonts["OPEN_SANS"] = "Open_Sans";
    KulThemeFonts["OSWALD"] = "Oswald";
    KulThemeFonts["PUBLIC_SANS"] = "PublicSans";
    KulThemeFonts["RAJDHANI"] = "Rajdhani";
    KulThemeFonts["UBUNTU"] = "Ubuntu";
})(KulThemeFonts || (KulThemeFonts = {}));
var KulThemeIconValues;
(function (KulThemeIconValues) {
    KulThemeIconValues["ASCENDING"] = "--kul-ascending-icon";
    KulThemeIconValues["CLEAR"] = "--kul-clear-icon";
    KulThemeIconValues["COLLAPSED"] = "--kul-collapsed-icon";
    KulThemeIconValues["DESCENDING"] = "--kul-descending-icon";
    KulThemeIconValues["DROPDOWN"] = "--kul-dropdown-icon";
    KulThemeIconValues["EXPANDED"] = "--kul-expanded-icon";
    KulThemeIconValues["FILTER_REMOVE"] = "--kul-filter-remove-icon";
    KulThemeIconValues["KEY"] = "--kul-key-icon";
    KulThemeIconValues["SEARCH"] = "--kul-search-icon";
    KulThemeIconValues["WARNING"] = "--kul-warning-icon";
})(KulThemeIconValues || (KulThemeIconValues = {}));
var KulThemeAttribute;
(function (KulThemeAttribute) {
    KulThemeAttribute["DARK"] = "kul-dark-theme";
    KulThemeAttribute["LIGHT"] = "kul-light-theme";
})(KulThemeAttribute || (KulThemeAttribute = {}));

const themesJson = {
    bubbles: {
        cssVariables: {
            "--kul-primary-color": "#c18f00",
            "--kul-secondary-color": "#1d1d1d",
            "--kul-background-color": "#ffffff",
            "--kul-header-background-color": "#beb08d",
            "--kul-header-color": "#ffffff",
            "--kul-drawer-background-color": "#ffffff",
            "--kul-drawer-color": "#000000",
            "--kul-header-height": "64px",
            "--kul-drawer-width": "300px",
            "--kul-font-family": "Lato, sans-serif",
            "--kul-font-family-monospace": "Roboto Mono, consolas, monospace",
            "--kul-font-size": "14px",
            "--kul-text-color": "#2e2e2e",
            "--kul-text-on-primary-color": "#ffffff",
            "--kul-text-on-secondary-color": "#ffffff",
            "--kul-disabled-background-color": "#eaeaea",
            "--kul-disabled-color": "#5c5c5c",
            "--kul-title-background-color": "#f1f3f4",
            "--kul-title-color": "#2e2e2e",
            "--kul-icon-color": "#505050",
            "--kul-border-color": "#e0e0e0",
            "--kul-box-shadow": "rgba(0, 0, 0, 0.2) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px",
            "--kul-info-color": "#2592df",
            "--kul-success-color": "#4d9f02",
            "--kul-warning-color": "#ffc107",
            "--kul-danger-color": "#d91e18",
            "--kul-spinner-color": "#1D1D1B",
            "--kul-chart-color-1": "#ff5959",
            "--kul-chart-color-2": "#e0a0a0",
            "--kul-chart-color-3": "#8e1010",
            "--kul-chart-color-4": "#f5f5dc",
            "--kul-card-zindex": 900,
            "--kul-drawer-zindex": 900,
            "--kul-header-zindex": 900,
        },
        icons: {
            "--kul-ascending-icon": "sort-ascending",
            "--kul-descending-icon": "sort-descending",
            "--kul-expanded-icon": "chevron-down",
            "--kul-collapsed-icon": "chevron_right",
            "--kul-dropdown-icon": "chevron-down",
            "--kul-clear-icon": "clear",
            "--kul-filter-remove-icon": "filter-remove",
            "--kul-key-icon": "key-variant",
            "--kul-search-icon": "search",
            "--kul-warning-icon": "warning",
        },
        font: [KulThemeFonts.LATO],
        isDark: false,
    },
    cinder: {
        cssVariables: {
            "--kul-primary-color": "#afafaf",
            "--kul-secondary-color": "#333333",
            "--kul-background-color": "#101010",
            "--kul-header-background-color": "#1b1b1b",
            "--kul-header-color": "#e0e0e0",
            "--kul-drawer-background-color": "#1b1b1b",
            "--kul-drawer-color": "#e0e0e0",
            "--kul-header-height": "64px",
            "--kul-drawer-width": "300px",
            "--kul-font-family": "Inter, sans-serif",
            "--kul-font-family-monospace": "Fira Code, monospace",
            "--kul-font-size": "16px",
            "--kul-text-color": "#e0e0e0",
            "--kul-text-on-primary-color": "#1e1e1e",
            "--kul-text-on-secondary-color": "#e0e0e0",
            "--kul-disabled-background-color": "#333333",
            "--kul-disabled-color": "#666666",
            "--kul-title-background-color": "#2b2b2b",
            "--kul-title-color": "#e0e0e0",
            "--kul-icon-color": "#a1a1a1",
            "--kul-border-color": "#444444",
            "--kul-box-shadow": "0 8px 32px rgba(0, 0, 0, 0.4)",
            "--kul-info-color": "#56ccf2",
            "--kul-success-color": "#6fcf97",
            "--kul-warning-color": "#f2c94c",
            "--kul-danger-color": "#eb5757",
            "--kul-spinner-color": "#56ccf2",
            "--kul-chart-color-1": "#735DED",
            "--kul-chart-color-2": "#00B2CB",
            "--kul-chart-color-3": "#F2994A",
            "--kul-chart-color-4": "#27ae60",
            "--kul-card-zindex": 900,
            "--kul-drawer-zindex": 900,
            "--kul-header-zindex": 900,
        },
        icons: {
            "--kul-ascending-icon": "arrow_drop_up",
            "--kul-descending-icon": "arrow_drop_down",
            "--kul-expanded-icon": "arrow_drop_down",
            "--kul-collapsed-icon": "menu-right",
            "--kul-dropdown-icon": "arrow_drop_down",
            "--kul-clear-icon": "cancel",
            "--kul-filter-remove-icon": "filter-remove",
            "--kul-key-icon": "key-variant",
            "--kul-search-icon": "search",
            "--kul-warning-icon": "warning",
        },
        font: [KulThemeFonts.INTER, KulThemeFonts.FIRA_CODE],
        isDark: true,
    },
    cobalt: {
        cssVariables: {
            "--kul-primary-color": "#248aff",
            "--kul-secondary-color": "#65cbe9",
            "--kul-background-color": "#222222",
            "--kul-header-background-color": "#131313",
            "--kul-header-color": "#65cbe9",
            "--kul-drawer-background-color": "#2e2e2e",
            "--kul-drawer-color": "#65cbe9",
            "--kul-header-height": "64px",
            "--kul-drawer-width": "300px",
            "--kul-font-family": "Blinker, sans-serif;",
            "--kul-font-family-monospace": "Andalé Mono, monospace",
            "--kul-font-size": "14px",
            "--kul-text-color": "#65cbe9",
            "--kul-text-on-primary-color": "#f1f7ff",
            "--kul-text-on-secondary-color": "#000000",
            "--kul-disabled-background-color": "#3c3c3c",
            "--kul-disabled-color": "#7e7e7e",
            "--kul-title-background-color": "#2e2e2e",
            "--kul-title-color": "#f5f5f5",
            "--kul-icon-color": "#65cbe9",
            "--kul-border-color": "#535353",
            "--kul-box-shadow": "0px 0px 7.5px 0px rgba(128, 128, 128, 0.5)",
            "--kul-info-color": "#2592df",
            "--kul-success-color": "#4d9f02",
            "--kul-warning-color": "#ffc107",
            "--kul-danger-color": "#d91e18",
            "--kul-spinner-color": "#a4d9f7",
            "--kul-chart-color-1": "#308aff",
            "--kul-chart-color-2": "#5eb6d1",
            "--kul-chart-color-3": "#b1eafb",
            "--kul-chart-color-4": "#ffffff",
            "--kul-card-zindex": 900,
            "--kul-drawer-zindex": 900,
            "--kul-header-zindex": 900,
        },
        icons: {
            "--kul-ascending-icon": "arrow_drop_up",
            "--kul-descending-icon": "arrow_drop_down",
            "--kul-expanded-icon": "arrow_drop_down",
            "--kul-collapsed-icon": "menu-right",
            "--kul-dropdown-icon": "arrow_drop_down",
            "--kul-clear-icon": "cancel",
            "--kul-filter-remove-icon": "filter-remove",
            "--kul-key-icon": "key-variant",
            "--kul-search-icon": "search",
            "--kul-warning-icon": "warning",
        },
        font: [KulThemeFonts.BLINKER],
        isDark: true,
    },
    night: {
        cssVariables: {
            "--kul-primary-color": "#82f0e2",
            "--kul-secondary-color": "#f9ff00",
            "--kul-background-color": "#2d2d2d",
            "--kul-header-background-color": "#2d2d2d",
            "--kul-header-color": "#ffffff",
            "--kul-drawer-background-color": "#1f1f1f",
            "--kul-drawer-color": "#f5f5f5",
            "--kul-header-height": "64px",
            "--kul-drawer-width": "300px",
            "--kul-font-family": "Lato, sans-serif",
            "--kul-font-family-monospace": "Roboto Mono, consolas, monospace",
            "--kul-font-size": "14px",
            "--kul-text-color": "#f5f5f5",
            "--kul-text-on-primary-color": "#555555",
            "--kul-text-on-secondary-color": "#000000",
            "--kul-disabled-background-color": "#3c3c3c",
            "--kul-disabled-color": "#7e7e7e",
            "--kul-title-background-color": "#111111",
            "--kul-title-color": "#f5f5f5",
            "--kul-icon-color": "#e0e0e0",
            "--kul-border-color": "#535353",
            "--kul-box-shadow": "0px 0px 7.5px 0px rgba(128, 128, 128, 0.5)",
            "--kul-info-color": "#2592df",
            "--kul-success-color": "#4d9f02",
            "--kul-warning-color": "#ffc107",
            "--kul-danger-color": "#d91e18",
            "--kul-spinner-color": "#f2e114",
            "--kul-chart-color-1": "#60c3fc",
            "--kul-chart-color-2": "#e268d8",
            "--kul-chart-color-3": "#860bb5",
            "--kul-chart-color-4": "#1a83e4",
            "--kul-card-zindex": 900,
            "--kul-drawer-zindex": 900,
            "--kul-header-zindex": 900,
        },
        icons: {
            "--kul-ascending-icon": "arrow_drop_up",
            "--kul-descending-icon": "arrow_drop_down",
            "--kul-expanded-icon": "arrow_drop_down",
            "--kul-collapsed-icon": "menu-right",
            "--kul-dropdown-icon": "arrow_drop_down",
            "--kul-clear-icon": "cancel",
            "--kul-filter-remove-icon": "filter-remove",
            "--kul-key-icon": "key-variant",
            "--kul-search-icon": "search",
            "--kul-warning-icon": "warning",
        },
        font: [KulThemeFonts.LATO],
        isDark: true,
    },
    flamingo: {
        cssVariables: {
            "--kul-primary-color": "#e88aab",
            "--kul-secondary-color": "#7f00e7",
            "--kul-background-color": "#222222",
            "--kul-header-background-color": "#2d2d2d",
            "--kul-header-color": "#ffffff",
            "--kul-drawer-background-color": "#1f1f1f",
            "--kul-drawer-color": "#f5f5f5",
            "--kul-header-height": "64px",
            "--kul-drawer-width": "300px",
            "--kul-font-family": "Mali, cursive;",
            "--kul-font-family-monospace": "Roboto Mono, consolas, monospace",
            "--kul-font-size": "14px",
            "--kul-text-color": "#f5f5f5",
            "--kul-text-on-primary-color": "#000000",
            "--kul-text-on-secondary-color": "#ffffff",
            "--kul-disabled-background-color": "#3c3c3c",
            "--kul-disabled-color": "#7e7e7e",
            "--kul-title-background-color": "#111111",
            "--kul-title-color": "#f5f5f5",
            "--kul-icon-color": "#e0e0e0",
            "--kul-border-color": "#535353",
            "--kul-box-shadow": "0px 0px 7.5px 0px rgba(128, 128, 128, 0.5)",
            "--kul-info-color": "#2592df",
            "--kul-success-color": "#4d9f02",
            "--kul-warning-color": "#ffc107",
            "--kul-danger-color": "#d91e18",
            "--kul-spinner-color": "#ffd0d8",
            "--kul-chart-color-1": "#e88aab",
            "--kul-chart-color-2": "#dc5584",
            "--kul-chart-color-3": "#c21350",
            "--kul-chart-color-4": "#c88da1",
            "--kul-card-zindex": 900,
            "--kul-drawer-zindex": 900,
            "--kul-header-zindex": 900,
        },
        icons: {
            "--kul-ascending-icon": "arrow_drop_up",
            "--kul-descending-icon": "arrow_drop_down",
            "--kul-expanded-icon": "arrow_drop_down",
            "--kul-collapsed-icon": "menu-right",
            "--kul-dropdown-icon": "arrow_drop_down",
            "--kul-clear-icon": "cancel",
            "--kul-filter-remove-icon": "filter-remove",
            "--kul-key-icon": "key-variant",
            "--kul-search-icon": "search",
            "--kul-warning-icon": "warning",
        },
        font: [KulThemeFonts.MALI],
        isDark: true,
    },
    graphite: {
        cssVariables: {
            "--kul-primary-color": "#888888",
            "--kul-secondary-color": "#d91e18",
            "--kul-background-color": "#ffffff",
            "--kul-header-background-color": "#535353",
            "--kul-header-color": "#ffffff",
            "--kul-drawer-background-color": "#ffffff",
            "--kul-drawer-color": "#545454",
            "--kul-header-height": "64px",
            "--kul-drawer-width": "300px",
            "--kul-font-family": "Roboto, sans-serif",
            "--kul-font-family-monospace": "Roboto Mono, consolas, monospace",
            "--kul-font-size": "13px",
            "--kul-text-color": "#545454",
            "--kul-text-on-primary-color": "#ffffff",
            "--kul-text-on-secondary-color": "#ffffff",
            "--kul-disabled-color": "#5c5c5c",
            "--kul-disabled-background-color": "#eaeaea",
            "--kul-title-background-color": "#f0f0f0",
            "--kul-title-color": "#545454",
            "--kul-icon-color": "#808080",
            "--kul-border-color": "#e0e0e0",
            "--kul-box-shadow": "0px 0px 7.5px 0px rgba(128, 128, 128, 0.5)",
            "--kul-info-color": "#2592df",
            "--kul-success-color": "#4d9f02",
            "--kul-warning-color": "#ffc107",
            "--kul-danger-color": "#d91e18",
            "--kul-spinner-color": "#eaa710",
            "--kul-chart-color-1": "red",
            "--kul-chart-color-2": "blue",
            "--kul-chart-color-3": "orange",
            "--kul-chart-color-4": "green",
            "--kul-chart-color-5": "yellow",
            "--kul-chart-color-6": "cyan",
            "--kul-chart-color-7": "brown",
            "--kul-chart-color-8": "magenta",
            "--kul-chart-color-9": "grey",
            "--kul-chart-color-10": "indigo",
            "--kul-card-zindex": 900,
            "--kul-drawer-zindex": 900,
            "--kul-header-zindex": 900,
        },
        customStyles: {
            "kul-BUTTON": "#kul-component button {\ntext-transform: unset;\n}\n\n",
        },
        icons: {
            "--kul-ascending-icon": "arrow_drop_up",
            "--kul-descending-icon": "arrow_drop_down",
            "--kul-expanded-icon": "arrow_drop_down",
            "--kul-collapsed-icon": "menu-right",
            "--kul-dropdown-icon": "arrow_drop_down",
            "--kul-clear-icon": "cancel",
            "--kul-filter-remove-icon": "filter-remove",
            "--kul-key-icon": "key-variant",
            "--kul-search-icon": "search",
            "--kul-warning-icon": "warning",
        },
        isDark: false,
    },
    ketchup: {
        cssVariables: {
            "--kul-primary-color": "#d64325",
            "--kul-secondary-color": "#a6192e",
            "--kul-background-color": "#ffffff",
            "--kul-header-background-color": "#2e2e2e",
            "--kul-header-color": "#ffffff",
            "--kul-drawer-background-color": "#ffffff",
            "--kul-drawer-color": "#595959",
            "--kul-header-height": "64px",
            "--kul-drawer-width": "300px",
            "--kul-font-family": "Ubuntu, sans-serif",
            "--kul-font-family-monospace": "Roboto Mono, consolas, monospace",
            "--kul-font-size": "14px",
            "--kul-text-color": "#595959",
            "--kul-text-on-primary-color": "#ffffff",
            "--kul-text-on-secondary-color": "#ffffff",
            "--kul-disabled-background-color": "#eaeaea",
            "--kul-disabled-color": "#5c5c5c",
            "--kul-title-background-color": "#f1f3f4",
            "--kul-title-color": "#2e2e2e",
            "--kul-icon-color": "#505050",
            "--kul-border-color": "#e0e0e0",
            "--kul-box-shadow": "rgba(0, 0, 0, 0.2) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px",
            "--kul-info-color": "#2592df",
            "--kul-success-color": "#4d9f02",
            "--kul-warning-color": "#ffc107",
            "--kul-danger-color": "#d91e18",
            "--kul-spinner-color": "#eaa710",
            "--kul-chart-color-1": "#ff5959",
            "--kul-chart-color-2": "#e0a0a0",
            "--kul-chart-color-3": "#8e1010",
            "--kul-chart-color-4": "#f5f5dc",
            "--kul-card-zindex": 900,
            "--kul-drawer-zindex": 900,
            "--kul-header-zindex": 900,
        },
        icons: {
            "--kul-ascending-icon": "sort-ascending",
            "--kul-descending-icon": "sort-descending",
            "--kul-expanded-icon": "chevron-down",
            "--kul-collapsed-icon": "chevron_right",
            "--kul-dropdown-icon": "chevron-down",
            "--kul-clear-icon": "clear",
            "--kul-filter-remove-icon": "filter-remove",
            "--kul-key-icon": "key",
            "--kul-search-icon": "search",
            "--kul-warning-icon": "warning",
        },
        font: [KulThemeFonts.UBUNTU],
        isDark: false,
    },
    obsidian: {
        cssVariables: {
            "--kul-primary-color": "#8b1a2e",
            "--kul-secondary-color": "#8c8c8c",
            "--kul-background-color": "#ffffff",
            "--kul-header-background-color": "#1a1a1a",
            "--kul-header-color": "#ffffff",
            "--kul-drawer-background-color": "#f2f2f2",
            "--kul-font-family": "IBM Plex Sans, sans-serif",
            "--kul-text-color": "#333333",
            "--kul-icon-color": "#c1c1c1",
            "--kul-border-color": "#bbbbbb",
            "--kul-box-shadow": "0px 4px 12px rgba(0, 0, 0, 0.1)",
            "--kul-chart-color-1": "#a35761",
            "--kul-chart-color-2": "#63707e",
            "--kul-chart-color-3": "#9e9e9e",
            "--kul-chart-color-4": "#4a4a4a",
            "--kul-drawer-color": "#4c4c4d",
            "--kul-header-height": "64px",
            "--kul-drawer-width": "300px",
            "--kul-font-family-monospace": "Courier New, Courier, monospace",
            "--kul-font-size": "13px",
            "--kul-text-on-primary-color": "#ffffff",
            "--kul-text-on-secondary-color": "#a6192e",
            "--kul-disabled-background-color": "#ffffff",
            "--kul-disabled-color": "#4c4c4d",
            "--kul-title-background-color": "#068a9c",
            "--kul-title-color": "#ffffff",
            "--kul-info-color": "#2592df",
            "--kul-success-color": "#4d9f02",
            "--kul-warning-color": "#ffc107",
            "--kul-danger-color": "#A6192E",
            "--kul-spinner-color": "#a6192e",
            "--kul-chart-color-5": "yellow",
            "--kul-chart-color-6": "cyan",
            "--kul-chart-color-7": "brown",
            "--kul-chart-color-8": "magenta",
            "--kul-chart-color-9": "grey",
            "--kul-chart-color-10": "indigo",
            "--kul-card-zindex": 900,
            "--kul-drawer-zindex": 900,
            "--kul-header-zindex": 900,
        },
        icons: {
            "--kul-ascending-icon": "arrow_drop_up",
            "--kul-descending-icon": "arrow_drop_down",
            "--kul-expanded-icon": "arrow_drop_down",
            "--kul-collapsed-icon": "menu-right",
            "--kul-dropdown-icon": "arrow_drop_down",
            "--kul-clear-icon": "cancel",
            "--kul-filter-remove-icon": "filter-remove",
            "--kul-key-icon": "key-variant",
            "--kul-search-icon": "search",
            "--kul-warning-icon": "warning",
        },
        font: [KulThemeFonts.IBM_PLEX],
        isDark: false,
    },
    ocean: {
        cssVariables: {
            "--kul-primary-color": "#0074b7",
            "--kul-secondary-color": "#a2d5f2",
            "--kul-background-color": "#f0f8ff",
            "--kul-header-background-color": "#013a6b",
            "--kul-header-color": "#ffffff",
            "--kul-drawer-background-color": "#e1eff7",
            "--kul-font-family": "Public Sans, sans-serif",
            "--kul-text-color": "#1e2a33",
            "--kul-icon-color": "#5a7da0",
            "--kul-border-color": "#b8d3e4",
            "--kul-box-shadow": "0px 2px 8px rgba(0, 0, 0, 0.1)",
            "--kul-chart-color-1": "#8fcfe3",
            "--kul-chart-color-2": "#a2b7cf",
            "--kul-chart-color-3": "#d9f1ff",
            "--kul-chart-color-4": "#93b1c4",
            "--kul-drawer-color": "#1b1b1b",
            "--kul-header-height": "64px",
            "--kul-drawer-width": "300px",
            "--kul-font-family-monospace": "Roboto Mono, consolas, monospace",
            "--kul-font-size": "16px",
            "--kul-text-on-primary-color": "#ffffff",
            "--kul-text-on-secondary-color": "#ffffff",
            "--kul-disabled-background-color": "#eaeaea",
            "--kul-disabled-color": "#5c5c5c",
            "--kul-title-background-color": "#f1f3f4",
            "--kul-title-color": "#1b1b1b",
            "--kul-info-color": "#2592df",
            "--kul-success-color": "#4d9f02",
            "--kul-warning-color": "#ffc107",
            "--kul-danger-color": "#d91e18",
            "--kul-spinner-color": "#6edeff",
            "--kul-card-zindex": 900,
            "--kul-drawer-zindex": 900,
            "--kul-header-zindex": 900,
        },
        icons: {
            "--kul-ascending-icon": "arrow_drop_up",
            "--kul-descending-icon": "arrow_drop_down",
            "--kul-expanded-icon": "arrow_drop_down",
            "--kul-collapsed-icon": "menu-right",
            "--kul-dropdown-icon": "arrow_drop_down",
            "--kul-clear-icon": "cancel",
            "--kul-filter-remove-icon": "filter-remove",
            "--kul-key-icon": "key-variant",
            "--kul-search-icon": "search",
            "--kul-warning-icon": "warning",
        },
        font: [KulThemeFonts.PUBLIC_SANS],
        isDark: false,
    },
    raj: {
        cssVariables: {
            "--kul-primary-color": "rgb(187, 198, 5)",
            "--kul-secondary-color": "#ffe600",
            "--kul-background-color": "#000000",
            "--kul-header-background-color": "#000000",
            "--kul-header-color": "#ffffff",
            "--kul-drawer-background-color": "#000000",
            "--kul-drawer-color": "#ffffff",
            "--kul-header-height": "64px",
            "--kul-drawer-width": "300px",
            "--kul-font-family": "'Rajdhani', sans-serif",
            "--kul-font-family-monospace": "Roboto Mono, consolas, monospace",
            "--kul-font-size": "15px",
            "--kul-text-color": "#ffffff",
            "--kul-text-on-primary-color": "#000000",
            "--kul-text-on-secondary-color": "#000000",
            "--kul-disabled-background-color": "#151515",
            "--kul-disabled-color": "#7b7b7b",
            "--kul-title-background-color": "#ffe600",
            "--kul-title-color": "#000000",
            "--kul-icon-color": "#9d9d9d",
            "--kul-border-color": "#9d9d9d",
            "--kul-box-shadow": "0px 0px 7.5px 0px rgba(128, 128, 128, 0.5)",
            "--kul-info-color": "#2592df",
            "--kul-success-color": "#4d9f02",
            "--kul-warning-color": "#ffc107",
            "--kul-danger-color": "#d91e18",
            "--kul-spinner-color": "#ffe600",
            "--kul-chart-color-1": "#ffffff",
            "--kul-chart-color-2": "rgb(187, 198, 5)",
            "--kul-chart-color-3": "#ffe600",
            "--kul-chart-color-4": "#effd02",
            "--kul-card-zindex": 900,
            "--kul-drawer-zindex": 900,
            "--kul-header-zindex": 900,
        },
        icons: {
            "--kul-ascending-icon": "sort-ascending",
            "--kul-descending-icon": "sort-descending",
            "--kul-expanded-icon": "chevron-down",
            "--kul-collapsed-icon": "chevron_right",
            "--kul-dropdown-icon": "chevron-down",
            "--kul-clear-icon": "cancel",
            "--kul-filter-remove-icon": "filter-remove",
            "--kul-key-icon": "key-variant",
            "--kul-search-icon": "search",
            "--kul-warning-icon": "warning",
        },
        font: [KulThemeFonts.RAJDHANI],
        isDark: true,
    },
    red: {
        cssVariables: {
            "--kul-primary-color": "#a6192e",
            "--kul-secondary-color": "#ffc107",
            "--kul-background-color": "#ffffff",
            "--kul-header-background-color": "#a6192e",
            "--kul-header-color": "#ffffff",
            "--kul-drawer-background-color": "#f5f5f5",
            "--kul-drawer-color": "#000000",
            "--kul-header-height": "64px",
            "--kul-drawer-width": "300px",
            "--kul-font-family": "Open Sans, arial, helvatica",
            "--kul-font-family-monospace": "Roboto Mono, consolas, monospace",
            "--kul-font-size": "13px",
            "--kul-text-color": "#000000",
            "--kul-text-on-primary-color": "#ffffff",
            "--kul-text-on-secondary-color": "#ffffff",
            "--kul-disabled-background-color": "#eaeaea",
            "--kul-disabled-color": "#333333",
            "--kul-title-background-color": "#f1f3f4",
            "--kul-title-color": "#2e2e2e",
            "--kul-icon-color": "#808080",
            "--kul-border-color": "#ededed",
            "--kul-box-shadow": "rgba(0, 0, 0, 0.2) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px",
            "--kul-info-color": "#2592df",
            "--kul-success-color": "#4d9f02",
            "--kul-warning-color": "#ffc107",
            "--kul-danger-color": "#A6192E",
            "--kul-spinner-color": "#1D1D1B",
            "--kul-chart-color-1": "#735DED",
            "--kul-chart-color-2": "#00B2CB",
            "--kul-chart-color-3": "#EDC900",
            "--kul-chart-color-4": "#a6192e",
            "--kul-chart-color-5": "yellow",
            "--kul-chart-color-6": "cyan",
            "--kul-chart-color-7": "brown",
            "--kul-chart-color-8": "magenta",
            "--kul-chart-color-9": "grey",
            "--kul-chart-color-10": "indigo",
            "--kul-card-zindex": 900,
            "--kul-drawer-zindex": 900,
            "--kul-header-zindex": 900,
        },
        icons: {
            "--kul-ascending-icon": "arrow_drop_up",
            "--kul-descending-icon": "arrow_drop_down",
            "--kul-expanded-icon": "arrow_drop_down",
            "--kul-collapsed-icon": "menu-right",
            "--kul-dropdown-icon": "arrow_drop_down",
            "--kul-clear-icon": "cancel",
            "--kul-filter-remove-icon": "filter-remove",
            "--kul-key-icon": "key-variant",
            "--kul-search-icon": "search",
            "--kul-warning-icon": "warning",
        },
        font: [KulThemeFonts.OPEN_SANS],
        isDark: false,
    },
    sapphire: {
        cssVariables: {
            "--kul-primary-color": "#003b77",
            "--kul-secondary-color": "#ff1414",
            "--kul-background-color": "#ffffff",
            "--kul-header-background-color": "#003b77",
            "--kul-header-color": "#ffffff",
            "--kul-drawer-background-color": "#002244",
            "--kul-drawer-color": "#ffffff",
            "--kul-header-height": "64px",
            "--kul-drawer-width": "20em",
            "--kul-font-family": "Arial",
            "--kul-font-family-monospace": "Arial",
            "--kul-font-size": "13px",
            "--kul-text-color": "#333333",
            "--kul-text-on-primary-color": "#fafafa",
            "--kul-text-on-secondary-color": "#ffffff",
            "--kul-disabled-background-color": "#ddecf8",
            "--kul-disabled-color": "#333333",
            "--kul-title-background-color": "#003b77",
            "--kul-title-color": "#ffffff",
            "--kul-icon-color": "#808080",
            "--kul-border-color": "#93c4ec",
            "--kul-box-shadow": "rgba(0, 0, 0, 0.2) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px",
            "--kul-info-color": "#2592df",
            "--kul-success-color": "#4d9f02",
            "--kul-warning-color": "#ffc107",
            "--kul-danger-color": "#a94442",
            "--kul-spinner-color": "#003b77",
            "--kul-chart-color-1": "#0781fd",
            "--kul-chart-color-2": "#002244",
            "--kul-chart-color-3": "#c6cff8",
            "--kul-chart-color-4": "#66bdda",
            "--kul-chart-color-5": "yellow",
            "--kul-chart-color-6": "cyan",
            "--kul-chart-color-7": "brown",
            "--kul-chart-color-8": "magenta",
            "--kul-chart-color-9": "grey",
            "--kul-chart-color-10": "indigo",
            "--kul-card-zindex": 900,
            "--kul-drawer-zindex": 900,
            "--kul-header-zindex": 900,
        },
        icons: {
            "--kul-ascending-icon": "arrow_drop_up",
            "--kul-descending-icon": "arrow_drop_down",
            "--kul-expanded-icon": "arrow_drop_down",
            "--kul-collapsed-icon": "menu-right",
            "--kul-dropdown-icon": "arrow_drop_down",
            "--kul-clear-icon": "cancel",
            "--kul-filter-remove-icon": "filter-remove",
            "--kul-key-icon": "key-variant",
            "--kul-search-icon": "search",
            "--kul-warning-icon": "warning",
        },
        isDark: false,
    },
    silver: {
        cssVariables: {
            "--kul-primary-color": "#c0c0c0",
            "--kul-secondary-color": "#c0c0c0",
            "--kul-background-color": "#000000",
            "--kul-header-background-color": "#ffffff",
            "--kul-header-color": "#000000",
            "--kul-drawer-background-color": "#ffffff",
            "--kul-drawer-color": "#000000",
            "--kul-header-height": "80px",
            "--kul-drawer-width": "320px",
            "--kul-font-family": "Oswald, sans-serif",
            "--kul-font-family-monospace": "Xanh Mono, monospace",
            "--kul-font-size": "16px",
            "--kul-text-color": "#fefefe",
            "--kul-text-on-primary-color": "#4a4a4a",
            "--kul-text-on-secondary-color": "#4a4a4a",
            "--kul-disabled-background-color": "#3c3c3c",
            "--kul-disabled-color": "#7e7e7e",
            "--kul-title-background-color": "#151515",
            "--kul-title-color": "#d9d9d9",
            "--kul-icon-color": "#c0c0c0",
            "--kul-border-color": "#c0c0c0",
            "--kul-box-shadow": "0px 0px 7.5px 0px rgba(128, 128, 128, 0.5)",
            "--kul-info-color": "#2592df",
            "--kul-success-color": "#4d9f02",
            "--kul-warning-color": "#ffc107",
            "--kul-danger-color": "#d91e18",
            "--kul-spinner-color": "#c0c0c0",
            "--kul-chart-color-1": "#ffffff",
            "--kul-chart-color-2": "#979797",
            "--kul-chart-color-3": "#bababa",
            "--kul-chart-color-4": "#000000",
            "--kul-chart-color-5": "#b35454",
            "--kul-chart-color-6": "#59af57",
            "--kul-chart-color-7": "#aeaa5d",
            "--kul-card-zindex": 900,
            "--kul-drawer-zindex": 900,
            "--kul-header-zindex": 900,
        },
        icons: {
            "--kul-ascending-icon": "arrow_drop_up",
            "--kul-descending-icon": "arrow_drop_down",
            "--kul-expanded-icon": "arrow_drop_down",
            "--kul-collapsed-icon": "menu-right",
            "--kul-dropdown-icon": "arrow_drop_down",
            "--kul-clear-icon": "cancel",
            "--kul-filter-remove-icon": "filter-remove",
            "--kul-key-icon": "key-variant",
            "--kul-search-icon": "search",
            "--kul-warning-icon": "warning",
        },
        font: [KulThemeFonts.OSWALD],
        isDark: true,
    },
    snow: {
        cssVariables: {
            "--kul-primary-color": "#525252",
            "--kul-secondary-color": "#e0e0e0",
            "--kul-background-color": "#f7f9fc",
            "--kul-header-background-color": "#ffffff",
            "--kul-header-color": "#333333",
            "--kul-drawer-background-color": "#ffffff",
            "--kul-drawer-color": "#333333",
            "--kul-header-height": "64px",
            "--kul-drawer-width": "300px",
            "--kul-font-family": "Inter, sans-serif",
            "--kul-font-family-monospace": "Fira Code, monospace",
            "--kul-font-size": "16px",
            "--kul-text-color": "#333333",
            "--kul-text-on-primary-color": "#ffffff",
            "--kul-text-on-secondary-color": "#333333",
            "--kul-disabled-background-color": "#eaeaea",
            "--kul-disabled-color": "#9c9c9c",
            "--kul-title-background-color": "#ffffff",
            "--kul-title-color": "#333333",
            "--kul-icon-color": "#5a5a5a",
            "--kul-border-color": "#d3d3d3",
            "--kul-box-shadow": "0 8px 32px rgba(31, 38, 135, 0.2)",
            "--kul-info-color": "#56ccf2",
            "--kul-success-color": "#6fcf97",
            "--kul-warning-color": "#f2c94c",
            "--kul-danger-color": "#eb5757",
            "--kul-spinner-color": "#8e8e8e",
            "--kul-chart-color-1": "#56ccf2",
            "--kul-chart-color-2": "#bb6bd9",
            "--kul-chart-color-3": "#f2994a",
            "--kul-chart-color-4": "#27ae60",
            "--kul-card-zindex": 900,
            "--kul-drawer-zindex": 900,
            "--kul-header-zindex": 900,
        },
        icons: {
            "--kul-ascending-icon": "arrow_drop_up",
            "--kul-descending-icon": "arrow_drop_down",
            "--kul-expanded-icon": "arrow_drop_down",
            "--kul-collapsed-icon": "menu-right",
            "--kul-dropdown-icon": "arrow_drop_down",
            "--kul-clear-icon": "cancel",
            "--kul-filter-remove-icon": "filter-remove",
            "--kul-key-icon": "key-variant",
            "--kul-search-icon": "search",
            "--kul-warning-icon": "warning",
        },
        font: [KulThemeFonts.INTER, KulThemeFonts.FIRA_CODE],
        isDark: false,
    },
    teal: {
        cssVariables: {
            "--kul-primary-color": "#068A9C",
            "--kul-secondary-color": "#ffc107",
            "--kul-background-color": "#ffffff",
            "--kul-header-background-color": "#068A9C",
            "--kul-header-color": "#ffffff",
            "--kul-drawer-background-color": "#ffffff",
            "--kul-drawer-color": "#000000",
            "--kul-header-height": "64px",
            "--kul-drawer-width": "300px",
            "--kul-font-family": "Roboto, sans-serif",
            "--kul-font-family-monospace": "Roboto Mono, consolas, monospace",
            "--kul-font-size": "13px",
            "--kul-text-color": "#000000",
            "--kul-text-on-primary-color": "#ffffff",
            "--kul-text-on-secondary-color": "#ffffff",
            "--kul-disabled-background-color": "#eaeaea",
            "--kul-disabled-color": "#333333",
            "--kul-title-background-color": "#f1f3f4",
            "--kul-title-color": "#2e2e2e",
            "--kul-icon-color": "#808080",
            "--kul-border-color": "#ededed",
            "--kul-box-shadow": "rgba(0, 0, 0, 0.2) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px",
            "--kul-info-color": "#2592df",
            "--kul-success-color": "#4d9f02",
            "--kul-warning-color": "#ffc107",
            "--kul-danger-color": "#A6192E",
            "--kul-spinner-color": "#eaa710",
            "--kul-chart-color-1": "#068A9C",
            "--kul-chart-color-2": "#009643",
            "--kul-chart-color-3": "#EDC900",
            "--kul-chart-color-4": "#188F00",
            "--kul-chart-color-5": "#758700",
            "--kul-chart-color-6": "#7D2F00",
            "--kul-chart-color-7": "#710008",
            "--kul-chart-color-8": "#640056",
            "--kul-chart-color-9": "#1C0056",
            "--kul-chart-color-10": "#000046",
            "--kul-card-zindex": 900,
            "--kul-drawer-zindex": 900,
            "--kul-header-zindex": 900,
        },
        icons: {
            "--kul-ascending-icon": "arrow_drop_up",
            "--kul-descending-icon": "arrow_drop_down",
            "--kul-expanded-icon": "arrow_drop_down",
            "--kul-collapsed-icon": "menu-right",
            "--kul-dropdown-icon": "arrow_drop_down",
            "--kul-clear-icon": "cancel",
            "--kul-filter-remove-icon": "filter-remove",
            "--kul-key-icon": "key-variant",
            "--kul-search-icon": "search",
            "--kul-warning-icon": "warning",
        },
        isDark: false,
    },
    wildlife: {
        cssVariables: {
            "--kul-primary-color": "#1a7340",
            "--kul-secondary-color": "#826a4a",
            "--kul-background-color": "#f9f9f5",
            "--kul-header-background-color": "#12522e",
            "--kul-header-color": "#ffffff",
            "--kul-drawer-background-color": "#e7f2e1",
            "--kul-drawer-color": "#000000",
            "--kul-font-family": "Crimson Text, serif",
            "--kul-font-family-monospace": "Roboto Mono, consolas, monospace",
            "--kul-text-color": "#1a1a1a",
            "--kul-box-shadow": "0px 4px 10px rgba(0, 0, 0, 0.15)",
            "--kul-icon-color": "#4e8c57",
            "--kul-border-color": "#c4c4c4",
            "--kul-chart-color-1": "#58a27f",
            "--kul-chart-color-2": "#a9c1a1",
            "--kul-chart-color-3": "#6e8d5e",
            "--kul-chart-color-4": "#f0f2e7",
            "--kul-header-height": "64px",
            "--kul-drawer-width": "300px",
            "--kul-font-size": "16px",
            "--kul-text-on-primary-color": "#ffffff",
            "--kul-text-on-secondary-color": "#ffffff",
            "--kul-disabled-background-color": "#eaeaea",
            "--kul-disabled-color": "#5c5c5c",
            "--kul-title-background-color": "#f1f3f4",
            "--kul-title-color": "#000000",
            "--kul-info-color": "#2592df",
            "--kul-success-color": "#4d9f02",
            "--kul-warning-color": "#ffc107",
            "--kul-danger-color": "#d91e18",
            "--kul-spinner-color": "#44b383",
            "--kul-card-zindex": 900,
            "--kul-drawer-zindex": 900,
            "--kul-header-zindex": 900,
        },
        icons: {
            "--kul-ascending-icon": "arrow_drop_up",
            "--kul-descending-icon": "arrow_drop_down",
            "--kul-expanded-icon": "arrow_drop_down",
            "--kul-collapsed-icon": "menu-right",
            "--kul-dropdown-icon": "arrow_drop_down",
            "--kul-clear-icon": "cancel",
            "--kul-filter-remove-icon": "filter-remove",
            "--kul-key-icon": "key-variant",
            "--kul-search-icon": "search",
            "--kul-warning-icon": "warning",
        },
        font: [KulThemeFonts.CRIMSON_TEXT],
        isDark: false,
    },
};

var __classPrivateFieldGet$1 = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _KulTheme_DOM, _KulTheme_MASTER_CUSTOM_STYLE, _KulTheme_cssVariables, _KulTheme_customStyle, _KulTheme_font, _KulTheme_icons;
class KulTheme {
    constructor(list, name) {
        _KulTheme_DOM.set(this, document.documentElement);
        _KulTheme_MASTER_CUSTOM_STYLE.set(this, "MASTER");
        _KulTheme_cssVariables.set(this, () => {
            const theme = this.list[this.name];
            const variables = theme.cssVariables;
            let css = "";
            Object.entries(variables).forEach(([key, val]) => {
                this.cssVars[key] = val;
                css += `${key}: ${val};`;
                if (key.includes("color")) {
                    const { rgbValues, hue, saturation, lightness } = this.colorCheck(val);
                    const rgbKey = `${key}-rgb`;
                    const hKey = `${key}-h`;
                    const sKey = `${key}-s`;
                    const lKey = `${key}-l`;
                    this.cssVars[rgbKey] = rgbValues;
                    this.cssVars[hKey] = hue;
                    this.cssVars[lKey] = lightness;
                    this.cssVars[sKey] = saturation;
                    css += `${rgbKey}: ${rgbValues};`;
                    css += `${hKey}: ${hue};`;
                    css += `${lKey}: ${lightness};`;
                    css += `${sKey}: ${saturation};`;
                }
            });
            return css;
        });
        _KulTheme_customStyle.set(this, () => {
            this.managedComponents.forEach(function (comp) {
                if (comp?.rootElement?.isConnected) {
                    comp.refresh();
                }
            });
        });
        _KulTheme_font.set(this, () => {
            let fonts = "";
            const theme = this.list[this.name];
            if (theme.font?.length) {
                theme.font.forEach((f) => {
                    const fontPath = getAssetPath(`./assets/fonts/${f}-Regular`);
                    const fontFace = `@font-face{font-family:${f.split("-")[0].replace(/(?<!^)(?=[A-Z])/g, " ")};src:url('${fontPath}.woff2')format('woff2'),url('${fontPath}.woff') format('woff');}`;
                    fonts += fontFace;
                });
            }
            return fonts;
        });
        _KulTheme_icons.set(this, () => {
            const theme = this.list[this.name];
            const icons = theme.icons;
            let css = "";
            for (var key in icons) {
                if (icons.hasOwnProperty(key)) {
                    const val = `url('${getAssetPath(`./assets/svg/${icons[key]}.svg`)}') no-repeat center`;
                    this.cssVars[key] = val;
                    css += key + ": " + val + ";";
                }
            }
            return css;
        });
        this.set = (name, list) => {
            if (name) {
                this.name = name;
            }
            if (list) {
                this.list = list;
            }
            __classPrivateFieldGet$1(this, _KulTheme_DOM, "f").ketchupLite.debug.logs.new(this, "Setting theme to: " + this.name + ".");
            const theme = this.list?.[this.name];
            if (!theme) {
                __classPrivateFieldGet$1(this, _KulTheme_DOM, "f").ketchupLite.debug.logs.new(this, 'Invalid theme name, falling back to default ("silver").');
                this.name = "silver";
            }
            this.isDarkTheme = theme.isDark;
            this.cssVars = {};
            this.styleTag.innerText = `
        ${__classPrivateFieldGet$1(this, _KulTheme_font, "f").call(this)}
        :root[kul-theme="${this.name}"] {
        ${__classPrivateFieldGet$1(this, _KulTheme_cssVariables, "f").call(this)}
        ${__classPrivateFieldGet$1(this, _KulTheme_icons, "f").call(this)}
        }`;
            __classPrivateFieldGet$1(this, _KulTheme_customStyle, "f").call(this);
            __classPrivateFieldGet$1(this, _KulTheme_DOM, "f").setAttribute("kul-theme", this.name);
            if (this.isDarkTheme) {
                __classPrivateFieldGet$1(this, _KulTheme_DOM, "f").removeAttribute(KulThemeAttribute.LIGHT);
                __classPrivateFieldGet$1(this, _KulTheme_DOM, "f").setAttribute(KulThemeAttribute.DARK, "");
            }
            else {
                __classPrivateFieldGet$1(this, _KulTheme_DOM, "f").removeAttribute(KulThemeAttribute.DARK);
                __classPrivateFieldGet$1(this, _KulTheme_DOM, "f").setAttribute(KulThemeAttribute.LIGHT, "");
            }
            document.dispatchEvent(new CustomEvent("kul-theme-change"));
        };
        this.getThemes = () => {
            const themes = [];
            for (var key in this.list) {
                if (this.list.hasOwnProperty(key)) {
                    themes.push(key);
                }
            }
            return themes;
        };
        this.refresh = () => {
            try {
                this.styleTag.innerText =
                    ':root[kul-theme="' +
                        this.name +
                        '"]{' +
                        __classPrivateFieldGet$1(this, _KulTheme_cssVariables, "f").call(this) +
                        __classPrivateFieldGet$1(this, _KulTheme_icons, "f").call(this) +
                        "}";
                __classPrivateFieldGet$1(this, _KulTheme_customStyle, "f").call(this);
                __classPrivateFieldGet$1(this, _KulTheme_DOM, "f").ketchupLite.debug.logs.new(this, "Theme " + __classPrivateFieldGet$1(this, _KulTheme_DOM, "f").getAttribute("kul-theme") + " refreshed.");
                document.dispatchEvent(new CustomEvent("kul-theme-refresh"));
            }
            catch (error) {
                __classPrivateFieldGet$1(this, _KulTheme_DOM, "f").ketchupLite.debug.logs.new(this, "Theme not refreshed.", "warning");
            }
        };
        this.ripple = {
            setup: (el) => {
                el.classList.add(RIPPLE_SURFACE_CLASS);
                el.dataset.cy = "ripple";
            },
            trigger: (e, el) => {
                const rect = el.getBoundingClientRect();
                const parent = el.parentElement;
                const ripple = document.createElement("span");
                const parentComputedStyle = getComputedStyle(parent);
                const rippleX = e.clientX - rect.left - rect.width / 2;
                const rippleY = e.clientY - rect.top - rect.height / 2;
                el.style.borderRadius = parentComputedStyle.borderRadius;
                ripple.classList.add("ripple");
                ripple.style.width = `${rect.width}px`;
                ripple.style.height = `${rect.height}px`;
                ripple.style.background = parentComputedStyle.color;
                ripple.style.opacity = "0.225";
                ripple.style.left = `${rippleX}px`;
                ripple.style.top = `${rippleY}px`;
                el.appendChild(ripple);
                setTimeout(() => {
                    ripple.remove();
                }, 500);
            },
        };
        this.register = (comp) => {
            this.managedComponents.add(comp);
        };
        this.unregister = (comp) => {
            this.managedComponents?.delete(comp);
        };
        this.setKulStyle = (comp) => {
            const styles = this.list[this.name].customStyles;
            let completeStyle = "";
            if (styles && styles[__classPrivateFieldGet$1(this, _KulTheme_MASTER_CUSTOM_STYLE, "f")]) {
                completeStyle += styles[__classPrivateFieldGet$1(this, _KulTheme_MASTER_CUSTOM_STYLE, "f")];
            }
            if (styles && styles[comp.rootElement.tagName]) {
                completeStyle += " " + styles[comp.rootElement.tagName];
            }
            if (comp.kulStyle) {
                completeStyle += " " + comp.kulStyle;
            }
            return completeStyle ? completeStyle : null;
        };
        this.colorContrast = (color) => {
            color = this.colorCheck(color).rgbColor;
            const colorValues = color.replace(/[^\d,.]/g, "").split(",");
            const brightness = Math.round((parseInt(colorValues[0]) * 299 +
                parseInt(colorValues[1]) * 587 +
                parseInt(colorValues[2]) * 114) /
                1000);
            return brightness > 125 ? "black" : "white";
        };
        this.randomColor = (brightness) => {
            function randomChannel(brightness) {
                var r = 255 - brightness;
                var n = 0 | (Math.random() * r + brightness);
                var s = n.toString(16);
                return s.length == 1 ? "0" + s : s;
            }
            return ("#" +
                randomChannel(brightness) +
                randomChannel(brightness) +
                randomChannel(brightness));
        };
        this.randomTheme = () => {
            let themes = [];
            for (var key in this.list) {
                if (this.list.hasOwnProperty(key)) {
                    if (key !== "test" && key !== "print") {
                        themes.push(key);
                    }
                }
            }
            if (themes.length > 0) {
                let index = null;
                while (index === null || themes[index] === this.name) {
                    index = Math.floor(Math.random() * Math.floor(themes.length));
                }
                this.set(themes[index]);
            }
            else {
                __classPrivateFieldGet$1(this, _KulTheme_DOM, "f").ketchupLite.debug.logs.new(this, "Couldn't set a random theme: no themes available!", "warning");
            }
        };
        this.colorCheck = (color) => {
            if (color === "transparent") {
                color = this.cssVars["--kul-background-color"];
                __classPrivateFieldGet$1(this, _KulTheme_DOM, "f").ketchupLite.debug.logs.new(this, "Received TRANSPARENT color, converted to " +
                    color +
                    " (theme background).");
            }
            const altRgbRe = /R(\d{1,3})G(\d{1,3})B(\d{1,3})/;
            const altRgb = altRgbRe.test(color);
            if (altRgb) {
                const parts = color.match(altRgbRe);
                color = "rgb(" + parts[1] + "," + parts[2] + "," + parts[3] + ")";
            }
            let isHex = color.substring(0, 1) === "#";
            const isHsl = color.substring(0, 3).toLowerCase() === "hsl";
            const isRgb = color.substring(0, 3).toLowerCase() === "rgb";
            if (!isHex && !isHsl && !isRgb) {
                const oldColor = color;
                color = this.codeToHex(color);
                isHex = color.substring(0, 1) === "#" ? true : false;
                __classPrivateFieldGet$1(this, _KulTheme_DOM, "f").ketchupLite.debug.logs.new(this, "Received CODE NAME color " +
                    oldColor +
                    ", converted to " +
                    color +
                    ".");
            }
            let hexColor = null;
            let rgbColor = null;
            let hslColor = null;
            let hslValues = null;
            let hue = null;
            let lightness = null;
            let saturation = null;
            if (isHex || isHsl) {
                const oldColor = color;
                let rgbColorObj = null;
                if (isHex) {
                    hexColor = color;
                    rgbColorObj = this.hexToRgb(color);
                }
                else {
                    hslColor = color;
                    const regexp = /hsl\(\s*(\d+)\s*,\s*(\d+(?:\.\d+)?%)\s*,\s*(\d+(?:\.\d+)?%)\)/g;
                    const hsl = regexp.exec(color).slice(1);
                    hslValues = hsl[0] + "," + hsl[1] + "," + hsl[2];
                    hue = hsl[0];
                    saturation = hsl[2];
                    lightness = hsl[1];
                    const h = parseInt(hue.replace("deg", ""));
                    const s = parseInt(saturation.replace("%", "")) / 100;
                    const l = parseInt(lightness.replace("%", "")) / 100;
                    rgbColorObj = this.hslToRgb(h, s, l);
                }
                try {
                    color =
                        "rgb(" +
                            rgbColorObj.r +
                            "," +
                            rgbColorObj.g +
                            "," +
                            rgbColorObj.b +
                            ")";
                    if (isHex) {
                        const hsl = this.rgbToHsl(rgbColorObj.r, rgbColorObj.g, rgbColorObj.b);
                        hue = hsl.h.toString();
                        saturation = hsl.s.toString() + "%";
                        lightness = hsl.l.toString() + "%";
                        hslValues = hue + "," + saturation + "," + lightness;
                        hslColor = "hsl(" + hslValues + ")";
                    }
                    else {
                        hexColor = this.rgbToHex(rgbColorObj.r, rgbColorObj.g, rgbColorObj.b);
                    }
                    __classPrivateFieldGet$1(this, _KulTheme_DOM, "f").ketchupLite.debug.logs.new(this, "Received HEX color " + oldColor + ", converted to " + color + ".");
                }
                catch (error) {
                    __classPrivateFieldGet$1(this, _KulTheme_DOM, "f").ketchupLite.debug.logs.new(this, "Invalid color: " + color + ".");
                }
            }
            let rgbValues = "";
            const values = color.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/);
            try {
                rgbValues = values[1] + "," + values[2] + "," + values[3];
                rgbColor = color;
            }
            catch (error) {
                __classPrivateFieldGet$1(this, _KulTheme_DOM, "f").ketchupLite.debug.logs.new(this, "Color not converted to rgb values: " + color + ".");
            }
            if (!hexColor) {
                try {
                    hexColor = this.rgbToHex(parseInt(values[1]), parseInt(values[2]), parseInt(values[3]));
                }
                catch (error) {
                    __classPrivateFieldGet$1(this, _KulTheme_DOM, "f").ketchupLite.debug.logs.new(this, "Color not converted to hex value: " + color + ".");
                }
            }
            if (!hslColor || !hslValues) {
                try {
                    const hsl = this.rgbToHsl(parseInt(values[1]), parseInt(values[2]), parseInt(values[3]));
                    hue = hsl.h.toString();
                    saturation = hsl.s.toString() + "%";
                    lightness = hsl.l.toString() + "%";
                    hslValues = hsl.h + "," + hsl.s + "%," + hsl.l + "%";
                    hslColor = "hsl(" + hsl.h + "," + hsl.s + "%," + hsl.l + "%)";
                }
                catch (error) {
                    __classPrivateFieldGet$1(this, _KulTheme_DOM, "f").ketchupLite.debug.logs.new(this, "Color not converted to hex value: " + color + ".");
                }
            }
            return {
                hexColor: hexColor,
                hslColor: hslColor,
                hslValues: hslValues,
                hue: hue,
                lightness: lightness,
                saturation: saturation,
                rgbColor: rgbColor,
                rgbValues: rgbValues,
            };
        };
        this.hexToRgb = (hex) => {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result
                ? {
                    r: parseInt(result[1], 16),
                    g: parseInt(result[2], 16),
                    b: parseInt(result[3], 16),
                }
                : null;
        };
        this.hslToRgb = (h, s, l) => {
            if (h == undefined) {
                return { r: 0, g: 0, b: 0 };
            }
            let huePrime = h / 60;
            const chroma = (1 - Math.abs(2 * l - 1)) * s;
            const secondComponent = chroma * (1 - Math.abs((huePrime % 2) - 1));
            huePrime = Math.floor(huePrime);
            let red, green, blue;
            if (huePrime === 0) {
                red = chroma;
                green = secondComponent;
                blue = 0;
            }
            else if (huePrime === 1) {
                red = secondComponent;
                green = chroma;
                blue = 0;
            }
            else if (huePrime === 2) {
                red = 0;
                green = chroma;
                blue = secondComponent;
            }
            else if (huePrime === 3) {
                red = 0;
                green = secondComponent;
                blue = chroma;
            }
            else if (huePrime === 4) {
                red = secondComponent;
                green = 0;
                blue = chroma;
            }
            else if (huePrime === 5) {
                red = chroma;
                green = 0;
                blue = secondComponent;
            }
            const lightnessAdjustment = l - chroma / 2;
            red += lightnessAdjustment;
            green += lightnessAdjustment;
            blue += lightnessAdjustment;
            return {
                r: Math.round(red * 255),
                g: Math.round(green * 255),
                b: Math.round(blue * 255),
            };
        };
        this.rgbToHex = (r, g, b) => {
            return "#" + this.valueToHex(r) + this.valueToHex(g) + this.valueToHex(b);
        };
        this.rgbToHsl = (r, g, b) => {
            r /= 255;
            g /= 255;
            b /= 255;
            const cmin = Math.min(r, g, b), cmax = Math.max(r, g, b), delta = cmax - cmin;
            let h = 0, s = 0, l = 0;
            if (delta == 0)
                h = 0;
            else if (cmax == r)
                h = ((g - b) / delta) % 6;
            else if (cmax == g)
                h = (b - r) / delta + 2;
            else
                h = (r - g) / delta + 4;
            h = Math.round(h * 60);
            if (h < 0)
                h += 360;
            l = (cmax + cmin) / 2;
            s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
            s = +(s * 100).toFixed(1);
            l = +(l * 100).toFixed(1);
            return { h: h, s: s, l: l };
        };
        this.valueToHex = (c) => {
            const hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        };
        this.cssVars = {};
        this.list = list ? list : themesJson;
        this.managedComponents = new Set();
        this.name = name ? name : "silver";
        this.styleTag = __classPrivateFieldGet$1(this, _KulTheme_DOM, "f")
            .querySelector("head")
            .appendChild(document.createElement("style"));
    }
    codeToHex(color) {
        const colorCodes = {
            aliceblue: "#f0f8ff",
            antiquewhite: "#faebd7",
            aqua: "#00ffff",
            aquamarine: "#7fffd4",
            azure: "#f0ffff",
            beige: "#f5f5dc",
            bisque: "#ffe4c4",
            black: "#000000",
            blanchedalmond: "#ffebcd",
            blue: "#0000ff",
            blueviolet: "#8a2be2",
            brown: "#a52a2a",
            burlywood: "#deb887",
            cadetblue: "#5f9ea0",
            chartreuse: "#7fff00",
            chocolate: "#d2691e",
            coral: "#ff7f50",
            cornflowerblue: "#6495ed",
            cornsilk: "#fff8dc",
            crimson: "#dc143c",
            cyan: "#00ffff",
            darkblue: "#00008b",
            darkcyan: "#008b8b",
            darkgoldenrod: "#b8860b",
            darkgray: "#a9a9a9",
            darkgreen: "#006400",
            darkgrey: "#a9a9a9",
            darkkhaki: "#bdb76b",
            darkmagenta: "#8b008b",
            darkolivegreen: "#556b2f",
            darkorange: "#ff8c00",
            darkorchid: "#9932cc",
            darkred: "#8b0000",
            darksalmon: "#e9967a",
            darkseagreen: "#8fbc8f",
            darkslateblue: "#483d8b",
            darkslategray: "#2f4f4f",
            darkslategrey: "#2f4f4f",
            darkturquoise: "#00ced1",
            darkviolet: "#9400d3",
            deeppink: "#ff1493",
            deepskyblue: "#00bfff",
            dimgray: "#696969",
            dimgrey: "#696969",
            dodgerblue: "#1e90ff",
            firebrick: "#b22222",
            floralwhite: "#fffaf0",
            forestgreen: "#228b22",
            fuchsia: "#ff00ff",
            gainsboro: "#dcdcdc",
            ghostwhite: "#f8f8ff",
            goldenrod: "#daa520",
            gold: "#ffd700",
            gray: "#808080",
            green: "#008000",
            greenyellow: "#adff2f",
            grey: "#808080",
            honeydew: "#f0fff0",
            hotpink: "#ff69b4",
            indianred: "#cd5c5c",
            indigo: "#4b0082",
            ivory: "#fffff0",
            khaki: "#f0e68c",
            lavenderblush: "#fff0f5",
            lavender: "#e6e6fa",
            lawngreen: "#7cfc00",
            lemonchiffon: "#fffacd",
            lightblue: "#add8e6",
            lightcoral: "#f08080",
            lightcyan: "#e0ffff",
            lightgoldenrodyellow: "#fafad2",
            lightgray: "#d3d3d3",
            lightgreen: "#90ee90",
            lightgrey: "#d3d3d3",
            lightpink: "#ffb6c1",
            lightsalmon: "#ffa07a",
            lightseagreen: "#20b2aa",
            lightskyblue: "#87cefa",
            lightslategray: "#778899",
            lightslategrey: "#778899",
            lightsteelblue: "#b0c4de",
            lightyellow: "#ffffe0",
            lime: "#00ff00",
            limegreen: "#32cd32",
            linen: "#faf0e6",
            magenta: "#ff00ff",
            maroon: "#800000",
            mediumaquamarine: "#66cdaa",
            mediumblue: "#0000cd",
            mediumorchid: "#ba55d3",
            mediumpurple: "#9370db",
            mediumseagreen: "#3cb371",
            mediumslateblue: "#7b68ee",
            mediumspringgreen: "#00fa9a",
            mediumturquoise: "#48d1cc",
            mediumvioletred: "#c71585",
            midnightblue: "#191970",
            mintcream: "#f5fffa",
            mistyrose: "#ffe4e1",
            moccasin: "#ffe4b5",
            navajowhite: "#ffdead",
            navy: "#000080",
            oldlace: "#fdf5e6",
            olive: "#808000",
            olivedrab: "#6b8e23",
            orange: "#ffa500",
            orangered: "#ff4500",
            orchid: "#da70d6",
            palegoldenrod: "#eee8aa",
            palegreen: "#98fb98",
            paleturquoise: "#afeeee",
            palevioletred: "#db7093",
            papayawhip: "#ffefd5",
            peachpuff: "#ffdab9",
            peru: "#cd853f",
            pink: "#ffc0cb",
            plum: "#dda0dd",
            powderblue: "#b0e0e6",
            purple: "#800080",
            rebeccapurple: "#663399",
            red: "#ff0000",
            rosybrown: "#bc8f8f",
            royalblue: "#4169e1",
            saddlebrown: "#8b4513",
            salmon: "#fa8072",
            sandybrown: "#f4a460",
            seagreen: "#2e8b57",
            seashell: "#fff5ee",
            sienna: "#a0522d",
            silver: "#c0c0c0",
            skyblue: "#87ceeb",
            slateblue: "#6a5acd",
            slategray: "#708090",
            slategrey: "#708090",
            snow: "#fffafa",
            springgreen: "#00ff7f",
            steelblue: "#4682b4",
            tan: "#d2b48c",
            teal: "#008080",
            thistle: "#d8bfd8",
            tomato: "#ff6347",
            turquoise: "#40e0d0",
            violet: "#ee82ee",
            wheat: "#f5deb3",
            white: "#ffffff",
            whitesmoke: "#f5f5f5",
            yellow: "#ffff00",
            yellowgreen: "#9acd32",
        };
        if (colorCodes[color.toLowerCase()]) {
            return colorCodes[color.toLowerCase()];
        }
        else {
            __classPrivateFieldGet$1(this, _KulTheme_DOM, "f").ketchupLite.debug.logs.new(this, "Could not decode color " + color + "!");
            return color;
        }
    }
}
_KulTheme_DOM = new WeakMap(), _KulTheme_MASTER_CUSTOM_STYLE = new WeakMap(), _KulTheme_cssVariables = new WeakMap(), _KulTheme_customStyle = new WeakMap(), _KulTheme_font = new WeakMap(), _KulTheme_icons = new WeakMap();

class KulLLM {
    async fetch(request, url) {
        try {
            const response = await fetch(`${url}/v1/chat/completions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(request),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error("Error calling LLM:", error);
            throw error;
        }
    }
    async poll(url) {
        return fetch(url);
    }
    async speechToText(textarea, button) {
        const kulManager = kulManagerInstance();
        const speechConstructor = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!speechConstructor) {
            alert("Speech recognition is not supported in this browser.");
            return;
        }
        const recognition = new speechConstructor();
        recognition.lang = kulManager.language.getBCP47();
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;
        recognition.addEventListener("result", (event) => {
            const transcript = Array.from(event.results)
                .map((result) => result[0])
                .map((result) => result.transcript)
                .join("");
            kulManager.debug.logs.new(this, "STT response: " + transcript);
            textarea.setValue(transcript);
            const isFinal = event.results[event.results.length - 1].isFinal;
            if (isFinal) {
                recognition.stop();
            }
        });
        recognition.addEventListener("end", () => {
            recognition.stop();
            button.kulShowSpinner = false;
        });
        recognition.addEventListener("start", () => {
            textarea.setFocus();
            button.kulShowSpinner = true;
        });
        try {
            recognition.start();
        }
        catch (err) {
            kulManager.debug.logs.new(this, "Error: " + err, "error");
        }
    }
}

var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _KulManager_instances, _KulManager_setupListeners;
class KulManager {
    constructor(overrides) {
        _KulManager_instances.add(this);
        this.overrides = overrides ?? {};
        if (overrides?.assetsPath) {
            setAssetPath(overrides.assetsPath);
        }
        this.data = new KulData();
        this.dates = new KulDates(overrides?.dates?.locale ?? null);
        this.debug = new KulDebug(overrides?.debug?.active ?? null, overrides?.debug?.logLimit ?? null);
        this.dynamicPosition = new KulDynamicPosition();
        this.language = new KulLanguage(overrides?.language?.list ?? null, overrides?.language?.name ?? null);
        this.llm = new KulLLM();
        this.scrollOnHover = new KulScrollOnHover(overrides?.scrollOnHover?.delay ?? null, overrides?.scrollOnHover?.step ?? null);
        this.theme = new KulTheme(overrides?.theme?.list ?? null, overrides?.theme?.name ?? null);
        this.utilities = {
            clickCallbacks: new Set(),
        };
        __classPrivateFieldGet(this, _KulManager_instances, "m", _KulManager_setupListeners).call(this);
    }
    addClickCallback(cb, async) {
        if (async) {
            setTimeout(() => {
                this.utilities.clickCallbacks.add(cb);
            }, 0);
        }
        else {
            this.utilities.clickCallbacks.add(cb);
        }
    }
    removeClickCallback(cb) {
        this.utilities.clickCallbacks.delete(cb);
    }
    setLibraryLocalization(locale) {
        if (!Object.values(KulDatesLocales).includes(locale)) {
            this.debug.logs.new(this, "Missing locale (" + locale + ")!", "error");
            return;
        }
        if (!KulLanguageDefaults[locale]) {
            this.debug.logs.new(this, "Missing language for locale (" + locale + ")!", "error");
            return;
        }
        this.dates.setLocale(locale);
        this.language.set(KulLanguageDefaults[locale]);
    }
}
_KulManager_instances = new WeakSet(), _KulManager_setupListeners = function _KulManager_setupListeners() {
    document.addEventListener("click", (e) => {
        const paths = e.composedPath();
        this.utilities.clickCallbacks.forEach((obj) => {
            if (obj && obj.el && obj.el.isConnected && !paths.includes(obj.el)) {
                const elAsDynamicPos = obj.el;
                let found = false;
                if (elAsDynamicPos.kulDynamicPosition &&
                    elAsDynamicPos.kulDynamicPosition.detach) {
                    for (let index = 0; index < paths.length; index++) {
                        const pathEl = paths[index];
                        const pathElAsDynamicPos = pathEl;
                        if (pathElAsDynamicPos.kulDynamicPosition &&
                            pathElAsDynamicPos.kulDynamicPosition.detach) {
                            const originalPath = pathElAsDynamicPos.kulDynamicPosition.originalPath;
                            if (originalPath.includes(obj.el)) {
                                found = true;
                            }
                        }
                    }
                    if (!found) {
                        obj.cb();
                    }
                }
                else {
                    obj.cb();
                }
            }
        });
    });
};
function kulManagerInstance() {
    const dom = document.documentElement;
    if (!dom.ketchupLite) {
        const overrides = dom.ketchupLiteInit ?? null;
        dom.ketchupLite = new KulManager(overrides);
        dom.ketchupLite.theme.set();
        globalThis.kulManager = dom.ketchupLite;
        if (overrides?.autoSetLocalization) {
            const locale = dom.ketchupLite.dates.locale;
            if (!overrides.language || !overrides.language.name) {
                dom.ketchupLite.language.set(KulLanguageDefaults[locale]);
            }
        }
        document.dispatchEvent(new CustomEvent("kul-manager-ready"));
    }
    return dom.ketchupLite;
}

export { CSS_VAR_PREFIX as C, KulDataCyAttributes as K, RIPPLE_SURFACE_CLASS as R, KUL_WRAPPER_ID as a, KUL_STYLE_ID as b, KulThemeColorValues as c, commonjsGlobal as d, KulLanguageSearch as e, KulLanguageGeneric as f, KUL_DROPDOWN_CLASS as g, KUL_DROPDOWN_CLASS_VISIBLE as h, KulDynamicPositionPlacement as i, kulManagerInstance as k };

//# sourceMappingURL=kul-manager-2a1960f6.js.map