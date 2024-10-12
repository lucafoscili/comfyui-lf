import { a as getAssetPath, d as setAssetPath } from './index-21ee70d9.js';

/**
 * Retrieves component's prop values based on a list and option to include descriptions.
 * @param {KulComponent} comp - The component requesting prop values.
 * @param {GenericMap} list - A map listing the prop keys, optionally containing their descriptions.
 * @param {boolean} [descriptions=false] - If true, returns the list itself including descriptions. Otherwise, returns the actual prop values from the component.
 * @returns {GenericObject} - An object with prop keys and values, or keys and descriptions based on the `descriptions` parameter.
 */
function getProps(comp, list, descriptions) {
    let props = {};
    if (descriptions) {
        props = list;
    }
    else {
        for (const key in list) {
            if (Object.prototype.hasOwnProperty.call(list, key)) {
                props[key] = comp[key];
            }
        }
    }
    return props;
}

function findColumns(dataset, filters) {
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
}

/**
 * Finds all nodes in the input dataset that match the specified filter criteria.
 * @param {(value: unknown) => string} stringify - Method of KulData that stringifies a cell/value.
 * @param {KulDataDataset} dataset - The dataset containing nodes to search through.
 * @param {Partial<KulDataNode>} filters - Criteria to match nodes against.
 * @param {boolean} partialMatch - Whether to allow partial matches for filter values.
 * @returns {{ matchingNodes: KulDataNode[], remainingNodes: KulDataNode[], ancestorNodes: KulDataNode[] }} Object containing arrays of matching nodes, nodes remaining after filtering, and their ancestor nodes.
 */
function filter(stringify, dataset, filters, partialMatch = false) {
    const matchingNodes = new Set();
    const remainingNodes = new Set();
    const ancestorNodes = new Set();
    const recursive = (node, ancestor, ancestorSet) => {
        const hasChildren = node.children?.length;
        let matches = false;
        for (const key in filters) {
            const nodeValue = node[key];
            const filterValue = filters[key];
            const nodeValueStr = stringify(nodeValue).toLowerCase();
            const filterValueStr = stringify(filterValue).toLowerCase();
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
}
/**
 * Gets information about the tree depth, such as max number of children and max depth.
 * @param {KulDataNode[]} nodes - Input array of nodes.
 * @returns {KulDataNodeDrilldownInfo} Information about the tree depth.
 */
function getDrilldownInfo(nodes) {
    let maxChildren = 0;
    let maxDepth = 0;
    // Function to get the depth of a node
    const getDepth = function (n) {
        const depth = 0;
        if (n.children) {
            n.children.forEach(function (d) {
                getDepth(d);
            });
        }
        return depth;
    };
    // Recursive function to traverse nodes and update maxDepth and maxChildren
    const recursive = (arr) => {
        maxDepth++;
        for (let index = 0; index < arr.length; index++) {
            const node = arr[index];
            getDepth(node);
            if (Array.isArray(node.children) &&
                maxChildren < node.children.length) {
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
}
/**
 * Returns the parent of the given node.
 * @param {KulDataNode[]} nodes - Input array of nodes.
 * @param {KulDataNode} child - Child node.
 * @returns {KulDataNode} Parent node.
 */
function getParent(nodes, child) {
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
}
/**
 * Removes the given node from the input array, by searching even children.
 * @param {KulDataNode[]} nodes - Input array of nodes.
 * @param {KulDataNode} node2remove - Node to remove.
 * @returns {KulDataNode} Copy of the removed node.
 */
function pop(nodes, node2remove) {
    let removed = null;
    for (let index = 0; index < nodes.length; index++) {
        recursive(nodes[index], nodes);
        // Recursive function to traverse nodes and remove the specified node
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
}
/**
 * Sets the values specified in the properties to every node of the input array.
 * @param {KulDataNode[]} nodes - Input array of nodes.
 * @param {Partial<KulDataNode>} properties - New properties values to set.
 * @param {boolean} recursively - Sets values to every child node.
 * @param {KulDataNode[]} exclude - Nodes to exclude (they won't be updated).
 * @returns {KulDataNode[]} Array of the updated nodes.
 */
function setProperties(nodes, properties, recursively, exclude) {
    const updated = [];
    if (!exclude) {
        exclude = [];
    }
    // Streamline nodes if properties should be set recursively
    if (recursively) {
        nodes = toStream(nodes);
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
}
/**
 * Streamlines an array of nodes by recursively fetching every child node.
 * @param {KulDataNode[]} nodes - Input array of nodes.
 * @returns {KulDataNode[]} Streamlined array of every node and their children.
 */
function toStream(nodes) {
    const streamlined = [];
    for (let index = 0; index < nodes.length; index++) {
        const node = nodes[index];
        recursive(node);
        // Recursive function to traverse nodes and add them to the streamlined array
        function recursive(node) {
            streamlined.push(node);
            for (let index = 0; node.children && index < node.children.length; index++) {
                recursive(node.children[index]);
            }
        }
    }
    return streamlined;
}

/**
 * Handles data operations.
 * @module KulData
 */
class KulData {
    cell = {
        exists: (node) => {
            return !!(node && node.cells && Object.keys(node.cells).length);
        },
        stringify: (value) => {
            if (value === null || value === undefined) {
                return String(value);
            }
            else if (value instanceof Date) {
                return value.toISOString();
            }
            else if (typeof value === 'object') {
                try {
                    return JSON.stringify(value, null, 2);
                }
                catch (error) {
                    console.error('Failed to stringify object:', error);
                    return '[object Object]';
                }
            }
            else {
                return String(value);
            }
        },
    };
    column = {
        find(dataset, filters) {
            return findColumns(dataset, filters);
        },
    };
    extract = {
        shapes: (dataset) => {
            if (!this.node.exists(dataset)) {
                return;
            }
            const shapes = {
                badge: [],
                button: [],
                chat: [],
                code: [],
                image: [],
                number: [],
                switch: [],
                text: [],
            };
            const nodes = dataset.nodes;
            const browseCells = (node) => {
                if (!this.cell.exists(node)) {
                    return;
                }
                const cells = node.cells;
                for (const key in cells) {
                    if (Object.prototype.hasOwnProperty.call(cells, key)) {
                        const cell = cells[key];
                        const extracted = this.extract.singleShape(cell);
                        switch (cell.shape) {
                            case 'badge':
                                shapes.badge.push(extracted);
                                break;
                            case 'button':
                                shapes.button.push(extracted);
                                break;
                            case 'chat':
                                shapes.chat.push(extracted);
                                break;
                            case 'code':
                                shapes.code.push(extracted);
                                break;
                            case 'image':
                                shapes.image.push(extracted);
                                break;
                            case 'switch':
                                shapes.switch.push(extracted);
                                break;
                            case 'number':
                                shapes.number.push(cell);
                                break;
                            case 'text':
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
        },
        singleShape: (cell) => {
            const prefix = 'kul';
            const shapeProps = {};
            for (const prop in cell) {
                switch (prop) {
                    case 'htmlProps':
                        Object.assign(shapeProps, cell[prop]);
                        break;
                    case 'shape':
                        break;
                    default:
                        if (prop.indexOf(prefix) === 0) {
                            shapeProps[prop] = cell[prop];
                        }
                        else {
                            const prefixedProp = prefix +
                                prop.charAt(0).toUpperCase() +
                                prop.slice(1);
                            if (!shapeProps[prefixedProp]) {
                                shapeProps[prefixedProp] = cell[prop];
                            }
                        }
                        break;
                }
            }
            return shapeProps;
        },
    };
    node = {
        exists: (dataset) => {
            return !!(dataset && dataset.nodes?.length);
        },
        filter: (dataset, filters, partialMatch = false) => {
            return filter(this.cell.stringify, dataset, filters, partialMatch);
        },
        fixIds: (nodes) => {
            function updateNodeIds(node, depth = '0') {
                node.id = depth;
                if (node.children) {
                    node.children.forEach((child, index) => {
                        const newDepth = `${depth}.${index}`;
                        updateNodeIds(child, newDepth);
                    });
                }
            }
            nodes.forEach((node) => {
                updateNodeIds(node, '0');
            });
            return nodes;
        },
        getDrilldownInfo(nodes) {
            return getDrilldownInfo(nodes);
        },
        getParent(nodes, child) {
            return getParent(nodes, child);
        },
        pop(nodes, node2remove) {
            return pop(nodes, node2remove);
        },
        setProperties(nodes, properties, recursively, exclude) {
            return setProperties(nodes, properties, recursively, exclude);
        },
        toStream(nodes) {
            return toStream(nodes);
        },
    };
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var dayjs_min = {exports: {}};

(function (module, exports) {
!function(t,e){module.exports=e();}(commonjsGlobal,(function(){var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",c="month",f="quarter",h="year",d="date",l="Invalid Date",$=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return "["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var r=String(t);return !r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},v={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return (e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return -t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,c),s=n-i<0,u=e.clone().add(r+(s?-1:1),c);return +(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return {M:c,y:h,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:f}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},g="en",D={};D[g]=M;var p="$isDayjsObject",S=function(t){return t instanceof _||!(!t||!t[p])},w=function t(e,n,r){var i;if(!e)return g;if("string"==typeof e){var s=e.toLowerCase();D[s]&&(i=s),n&&(D[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else {var a=e.name;D[a]=e,i=a;}return !r&&i&&(g=i),i||!r&&g},O=function(t,e){if(S(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},b=v;b.l=w,b.i=S,b.w=function(t,e){return O(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=w(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[p]=!0;}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(b.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match($);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.init();},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds();},m.$utils=function(){return b},m.isValid=function(){return !(this.$d.toString()===l)},m.isSame=function(t,e){var n=O(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return O(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<O(t)},m.$g=function(t,e,n){return b.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!b.u(e)||e,f=b.p(t),l=function(t,e){var i=b.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},$=function(t,e){return b.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,v="set"+(this.$u?"UTC":"");switch(f){case h:return r?l(1,0):l(31,11);case c:return r?l(1,M):l(0,M+1);case o:var g=this.$locale().weekStart||0,D=(y<g?y+7:y)-g;return l(r?m-D:m+(6-D),M);case a:case d:return $(v+"Hours",0);case u:return $(v+"Minutes",1);case s:return $(v+"Seconds",2);case i:return $(v+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=b.p(t),f="set"+(this.$u?"UTC":""),l=(n={},n[a]=f+"Date",n[d]=f+"Date",n[c]=f+"Month",n[h]=f+"FullYear",n[u]=f+"Hours",n[s]=f+"Minutes",n[i]=f+"Seconds",n[r]=f+"Milliseconds",n)[o],$=o===a?this.$D+(e-this.$W):e;if(o===c||o===h){var y=this.clone().set(d,1);y.$d[l]($),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d;}else l&&this.$d[l]($);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[b.p(t)]()},m.add=function(r,f){var d,l=this;r=Number(r);var $=b.p(f),y=function(t){var e=O(l);return b.w(e.date(e.date()+Math.round(t*r)),l)};if($===c)return this.set(c,this.$M+r);if($===h)return this.set(h,this.$y+r);if($===a)return y(1);if($===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[$]||1,m=this.$d.getTime()+r*M;return b.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||l;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=b.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,c=n.months,f=n.meridiem,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s)},d=function(t){return b.s(s%12||12,t,"0")},$=f||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r};return r.replace(y,(function(t,r){return r||function(t){switch(t){case"YY":return String(e.$y).slice(-2);case"YYYY":return b.s(e.$y,4,"0");case"M":return a+1;case"MM":return b.s(a+1,2,"0");case"MMM":return h(n.monthsShort,a,c,3);case"MMMM":return h(c,a);case"D":return e.$D;case"DD":return b.s(e.$D,2,"0");case"d":return String(e.$W);case"dd":return h(n.weekdaysMin,e.$W,o,2);case"ddd":return h(n.weekdaysShort,e.$W,o,3);case"dddd":return o[e.$W];case"H":return String(s);case"HH":return b.s(s,2,"0");case"h":return d(1);case"hh":return d(2);case"a":return $(s,u,!0);case"A":return $(s,u,!1);case"m":return String(u);case"mm":return b.s(u,2,"0");case"s":return String(e.$s);case"ss":return b.s(e.$s,2,"0");case"SSS":return b.s(e.$ms,3,"0");case"Z":return i}return null}(t)||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,l){var $,y=this,M=b.p(d),m=O(r),v=(m.utcOffset()-this.utcOffset())*e,g=this-m,D=function(){return b.m(y,m)};switch(M){case h:$=D()/12;break;case c:$=D();break;case f:$=D()/3;break;case o:$=(g-v)/6048e5;break;case a:$=(g-v)/864e5;break;case u:$=g/n;break;case s:$=g/e;break;case i:$=g/t;break;default:$=g;}return l?$:b.a($)},m.daysInMonth=function(){return this.endOf(c).$D},m.$locale=function(){return D[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=w(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return b.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),k=_.prototype;return O.prototype=k,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",c],["$y",h],["$D",d]].forEach((function(t){k[t[1]]=function(e){return this.$g(e,t[0],t[1])};})),O.extend=function(t,e){return t.$i||(t(e,_,O),t.$i=!0),O},O.locale=w,O.isDayjs=S,O.unix=function(t){return O(1e3*t)},O.en=D[g],O.Ls=D,O.p={},O}));
}(dayjs_min));

const dayjs = dayjs_min.exports;

var customParseFormat$1 = {exports: {}};

(function (module, exports) {
!function(e,t){module.exports=t();}(commonjsGlobal,(function(){var e={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},t=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,n=/\d\d/,r=/\d\d?/,i=/\d*[^-_:/,()\s\d]+/,o={},s=function(e){return (e=+e)+(e>68?1900:2e3)};var a=function(e){return function(t){this[e]=+t;}},f=[/[+-]\d\d:?(\d\d)?|Z/,function(e){(this.zone||(this.zone={})).offset=function(e){if(!e)return 0;if("Z"===e)return 0;var t=e.match(/([+-]|\d\d)/g),n=60*t[1]+(+t[2]||0);return 0===n?0:"+"===t[0]?-n:n}(e);}],h=function(e){var t=o[e];return t&&(t.indexOf?t:t.s.concat(t.f))},u=function(e,t){var n,r=o.meridiem;if(r){for(var i=1;i<=24;i+=1)if(e.indexOf(r(i,0,t))>-1){n=i>12;break}}else n=e===(t?"pm":"PM");return n},d={A:[i,function(e){this.afternoon=u(e,!1);}],a:[i,function(e){this.afternoon=u(e,!0);}],S:[/\d/,function(e){this.milliseconds=100*+e;}],SS:[n,function(e){this.milliseconds=10*+e;}],SSS:[/\d{3}/,function(e){this.milliseconds=+e;}],s:[r,a("seconds")],ss:[r,a("seconds")],m:[r,a("minutes")],mm:[r,a("minutes")],H:[r,a("hours")],h:[r,a("hours")],HH:[r,a("hours")],hh:[r,a("hours")],D:[r,a("day")],DD:[n,a("day")],Do:[i,function(e){var t=o.ordinal,n=e.match(/\d+/);if(this.day=n[0],t)for(var r=1;r<=31;r+=1)t(r).replace(/\[|\]/g,"")===e&&(this.day=r);}],M:[r,a("month")],MM:[n,a("month")],MMM:[i,function(e){var t=h("months"),n=(h("monthsShort")||t.map((function(e){return e.slice(0,3)}))).indexOf(e)+1;if(n<1)throw new Error;this.month=n%12||n;}],MMMM:[i,function(e){var t=h("months").indexOf(e)+1;if(t<1)throw new Error;this.month=t%12||t;}],Y:[/[+-]?\d+/,a("year")],YY:[n,function(e){this.year=s(e);}],YYYY:[/\d{4}/,a("year")],Z:f,ZZ:f};function c(n){var r,i;r=n,i=o&&o.formats;for(var s=(n=r.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,(function(t,n,r){var o=r&&r.toUpperCase();return n||i[r]||e[r]||i[o].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,(function(e,t,n){return t||n.slice(1)}))}))).match(t),a=s.length,f=0;f<a;f+=1){var h=s[f],u=d[h],c=u&&u[0],l=u&&u[1];s[f]=l?{regex:c,parser:l}:h.replace(/^\[|\]$/g,"");}return function(e){for(var t={},n=0,r=0;n<a;n+=1){var i=s[n];if("string"==typeof i)r+=i.length;else {var o=i.regex,f=i.parser,h=e.slice(r),u=o.exec(h)[0];f.call(t,u),e=e.replace(u,"");}}return function(e){var t=e.afternoon;if(void 0!==t){var n=e.hours;t?n<12&&(e.hours+=12):12===n&&(e.hours=0),delete e.afternoon;}}(t),t}}return function(e,t,n){n.p.customParseFormat=!0,e&&e.parseTwoDigitYear&&(s=e.parseTwoDigitYear);var r=t.prototype,i=r.parse;r.parse=function(e){var t=e.date,r=e.utc,s=e.args;this.$u=r;var a=s[1];if("string"==typeof a){var f=!0===s[2],h=!0===s[3],u=f||h,d=s[2];h&&(d=s[2]),o=this.$locale(),!f&&d&&(o=n.Ls[d]),this.$d=function(e,t,n){try{if(["x","X"].indexOf(t)>-1)return new Date(("X"===t?1e3:1)*e);var r=c(t)(e),i=r.year,o=r.month,s=r.day,a=r.hours,f=r.minutes,h=r.seconds,u=r.milliseconds,d=r.zone,l=new Date,m=s||(i||o?1:l.getDate()),M=i||l.getFullYear(),Y=0;i&&!o||(Y=o>0?o-1:l.getMonth());var p=a||0,v=f||0,D=h||0,g=u||0;return d?new Date(Date.UTC(M,Y,m,p,v,D,g+60*d.offset*1e3)):n?new Date(Date.UTC(M,Y,m,p,v,D,g)):new Date(M,Y,m,p,v,D,g)}catch(e){return new Date("")}}(t,a,r),this.init(),d&&!0!==d&&(this.$L=this.locale(d).$L),u&&t!=this.format(a)&&(this.$d=new Date("")),o={};}else if(a instanceof Array)for(var l=a.length,m=1;m<=l;m+=1){s[1]=a[m-1];var M=n.apply(this,s);if(M.isValid()){this.$d=M.$d,this.$L=M.$L,this.init();break}m===l&&(this.$d=new Date(""));}else i.call(this,e);};}}));
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

var es$1 = {exports: {}};

(function (module, exports) {
!function(e,o){module.exports=o(dayjs_min.exports);}(commonjsGlobal,(function(e){function o(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var s=o(e),d={name:"es",monthsShort:"ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),weekdays:"domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),weekdaysShort:"dom._lun._mar._mié._jue._vie._sáb.".split("_"),weekdaysMin:"do_lu_ma_mi_ju_vi_sá".split("_"),months:"enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),weekStart:1,formats:{LT:"H:mm",LTS:"H:mm:ss",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY H:mm",LLLL:"dddd, D [de] MMMM [de] YYYY H:mm"},relativeTime:{future:"en %s",past:"hace %s",s:"unos segundos",m:"un minuto",mm:"%d minutos",h:"una hora",hh:"%d horas",d:"un día",dd:"%d días",M:"un mes",MM:"%d meses",y:"un año",yy:"%d años"},ordinal:function(e){return e+"º"}};return s.default.locale(d,null,!0),d}));
}(es$1));

var fr$1 = {exports: {}};

(function (module, exports) {
!function(e,n){module.exports=n(dayjs_min.exports);}(commonjsGlobal,(function(e){function n(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var t=n(e),i={name:"fr",weekdays:"dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),weekdaysShort:"dim._lun._mar._mer._jeu._ven._sam.".split("_"),weekdaysMin:"di_lu_ma_me_je_ve_sa".split("_"),months:"janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),monthsShort:"janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),weekStart:1,yearStart:4,formats:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},relativeTime:{future:"dans %s",past:"il y a %s",s:"quelques secondes",m:"une minute",mm:"%d minutes",h:"une heure",hh:"%d heures",d:"un jour",dd:"%d jours",M:"un mois",MM:"%d mois",y:"un an",yy:"%d ans"},ordinal:function(e){return ""+e+(1===e?"er":"")}};return t.default.locale(i,null,!0),i}));
}(fr$1));

var it$1 = {exports: {}};

(function (module, exports) {
!function(e,o){module.exports=o(dayjs_min.exports);}(commonjsGlobal,(function(e){function o(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var t=o(e),n={name:"it",weekdays:"domenica_lunedì_martedì_mercoledì_giovedì_venerdì_sabato".split("_"),weekdaysShort:"dom_lun_mar_mer_gio_ven_sab".split("_"),weekdaysMin:"do_lu_ma_me_gi_ve_sa".split("_"),months:"gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre".split("_"),weekStart:1,monthsShort:"gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic".split("_"),formats:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},relativeTime:{future:"tra %s",past:"%s fa",s:"qualche secondo",m:"un minuto",mm:"%d minuti",h:"un' ora",hh:"%d ore",d:"un giorno",dd:"%d giorni",M:"un mese",MM:"%d mesi",y:"un anno",yy:"%d anni"},ordinal:function(e){return e+"º"}};return t.default.locale(n,null,!0),n}));
}(it$1));

var pl$1 = {exports: {}};

(function (module, exports) {
!function(e,t){module.exports=t(dayjs_min.exports);}(commonjsGlobal,(function(e){function t(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var i=t(e);function a(e){return e%10<5&&e%10>1&&~~(e/10)%10!=1}function n(e,t,i){var n=e+" ";switch(i){case"m":return t?"minuta":"minutę";case"mm":return n+(a(e)?"minuty":"minut");case"h":return t?"godzina":"godzinę";case"hh":return n+(a(e)?"godziny":"godzin");case"MM":return n+(a(e)?"miesiące":"miesięcy");case"yy":return n+(a(e)?"lata":"lat")}}var r="stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia".split("_"),_="styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień".split("_"),s=/D MMMM/,d=function(e,t){return s.test(t)?r[e.month()]:_[e.month()]};d.s=_,d.f=r;var o={name:"pl",weekdays:"niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota".split("_"),weekdaysShort:"ndz_pon_wt_śr_czw_pt_sob".split("_"),weekdaysMin:"Nd_Pn_Wt_Śr_Cz_Pt_So".split("_"),months:d,monthsShort:"sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru".split("_"),ordinal:function(e){return e+"."},weekStart:1,yearStart:4,relativeTime:{future:"za %s",past:"%s temu",s:"kilka sekund",m:n,mm:n,h:n,hh:n,d:"1 dzień",dd:"%d dni",M:"miesiąc",MM:n,y:"rok",yy:n},formats:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd, D MMMM YYYY HH:mm"}};return i.default.locale(o,null,!0),o}));
}(pl$1));

var ru$1 = {exports: {}};

(function (module, exports) {
!function(_,t){module.exports=t(dayjs_min.exports);}(commonjsGlobal,(function(_){function t(_){return _&&"object"==typeof _&&"default"in _?_:{default:_}}var e=t(_),n="января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря".split("_"),s="январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_"),r="янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.".split("_"),o="янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.".split("_"),i=/D[oD]?(\[[^[\]]*\]|\s)+MMMM?/;function d(_,t,e){var n,s;return "m"===e?t?"минута":"минуту":_+" "+(n=+_,s={mm:t?"минута_минуты_минут":"минуту_минуты_минут",hh:"час_часа_часов",dd:"день_дня_дней",MM:"месяц_месяца_месяцев",yy:"год_года_лет"}[e].split("_"),n%10==1&&n%100!=11?s[0]:n%10>=2&&n%10<=4&&(n%100<10||n%100>=20)?s[1]:s[2])}var u=function(_,t){return i.test(t)?n[_.month()]:s[_.month()]};u.s=s,u.f=n;var a=function(_,t){return i.test(t)?r[_.month()]:o[_.month()]};a.s=o,a.f=r;var m={name:"ru",weekdays:"воскресенье_понедельник_вторник_среда_четверг_пятница_суббота".split("_"),weekdaysShort:"вск_пнд_втр_срд_чтв_птн_сбт".split("_"),weekdaysMin:"вс_пн_вт_ср_чт_пт_сб".split("_"),months:u,monthsShort:a,weekStart:1,yearStart:4,formats:{LT:"H:mm",LTS:"H:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY г.",LLL:"D MMMM YYYY г., H:mm",LLLL:"dddd, D MMMM YYYY г., H:mm"},relativeTime:{future:"через %s",past:"%s назад",s:"несколько секунд",m:d,mm:d,h:"час",hh:d,d:"день",dd:d,M:"месяц",MM:d,y:"год",yy:d},ordinal:function(_){return _},meridiem:function(_){return _<4?"ночи":_<12?"утра":_<17?"дня":"вечера"}};return e.default.locale(m,null,!0),m}));
}(ru$1));

var zh = {exports: {}};

(function (module, exports) {
!function(e,_){module.exports=_(dayjs_min.exports);}(commonjsGlobal,(function(e){function _(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var t=_(e),d={name:"zh",weekdays:"星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),weekdaysShort:"周日_周一_周二_周三_周四_周五_周六".split("_"),weekdaysMin:"日_一_二_三_四_五_六".split("_"),months:"一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),ordinal:function(e,_){return "W"===_?e+"周":e+"日"},weekStart:1,yearStart:4,formats:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY/MM/DD",LL:"YYYY年M月D日",LLL:"YYYY年M月D日Ah点mm分",LLLL:"YYYY年M月D日ddddAh点mm分",l:"YYYY/M/D",ll:"YYYY年M月D日",lll:"YYYY年M月D日 HH:mm",llll:"YYYY年M月D日dddd HH:mm"},relativeTime:{future:"%s后",past:"%s前",s:"几秒",m:"1 分钟",mm:"%d 分钟",h:"1 小时",hh:"%d 小时",d:"1 天",dd:"%d 天",M:"1 个月",MM:"%d 个月",y:"1 年",yy:"%d 年"},meridiem:function(e,_){var t=100*e+_;return t<600?"凌晨":t<900?"早上":t<1100?"上午":t<1300?"中午":t<1800?"下午":"晚上"}};return t.default.locale(d,null,!0),d}));
}(zh));

/**
 * Normalization types.
 */
var KulDatesNormalize;
(function (KulDatesNormalize) {
    KulDatesNormalize["DATE"] = "date";
    KulDatesNormalize["TIME"] = "time";
    KulDatesNormalize["TIMESTAMP"] = "timestamp";
})(KulDatesNormalize || (KulDatesNormalize = {}));
/**
 * Supported locales.
 */
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
/**
 * Format Months
 */
var KulDateTimeFormatOptionsMonth;
(function (KulDateTimeFormatOptionsMonth) {
    KulDateTimeFormatOptionsMonth["NUMERIC"] = "numeric";
    KulDateTimeFormatOptionsMonth["DIGIT2"] = "2-digit";
    KulDateTimeFormatOptionsMonth["LONG"] = "long";
    KulDateTimeFormatOptionsMonth["SHORT"] = "short";
    KulDateTimeFormatOptionsMonth["NARROW"] = "narrow";
})(KulDateTimeFormatOptionsMonth || (KulDateTimeFormatOptionsMonth = {}));
/**
 * Common use formats
 */
var KulDatesFormats;
(function (KulDatesFormats) {
    KulDatesFormats["ISO_DATE"] = "YYYY-MM-DD";
    KulDatesFormats["ISO_DATE_TIME"] = "YYYY-MM-DD HH:mm:ss";
    KulDatesFormats["ISO_TIME"] = "HH:mm:ss";
    KulDatesFormats["ISO_TIME_WITHOUT_SECONDS"] = "HH:mm";
})(KulDatesFormats || (KulDatesFormats = {}));

/**
 * Handles operations and formatting of dates.
 * @module KulDates
 */
class KulDates {
    dayjs;
    locale;
    managedComponents;
    /**
     * Initializes KulDates.
     */
    constructor(locale) {
        this.managedComponents = new Set();
        this.setLocale(locale);
        this.dayjs = dayjs;
        dayjs.extend(customParseFormat);
        dayjs.extend(localizedFormat);
        dayjs.extend(minMax);
    }
    /**
     * Sets the locale from the browser or from a given argument.
     * @returns {string} Locale string.
     * @see https://github.com/iamkun/dayjs/issues/732
     */
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
                return 'en';
            }
            this.locale = navLangs[0]
                .split('-')[0]
                .toLowerCase();
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
        document.dispatchEvent(new CustomEvent('kul-dates-localechange'));
    }
    /**
     * @returns {string} The current locale.
     */
    getLocale() {
        return this.locale;
    }
    /**
     * Gets the available locales.
     * @returns {Array<KulDatesLocales>} Array of locales' names.
     */
    getLocales() {
        const items = Object.keys(KulDatesLocales)
            .map((key) => KulDatesLocales[key])
            .filter((value) => typeof value === 'string');
        return items;
    }
    /**
     * Gets date format by browser locale
     * @returns {string} date format pattern, by browser locale
     */
    getDateFormat() {
        const formatObj = new Intl.DateTimeFormat(this.getLocale()).formatToParts(new Date());
        let dateFormat = formatObj
            .map((obj) => {
            switch (obj.type) {
                case 'day':
                    return 'DD';
                case 'month':
                    return 'MM';
                case 'year':
                    return 'YYYY';
                default:
                    return obj.value;
            }
        })
            .join('');
        return dateFormat;
    }
    /**
     * Gets time format by browser locale
     * @param {boolean} manageSeconds flag to set seconds managing
     * @returns {string} time format pattern, by browser locale
     */
    getTimeFormat(manageSeconds) {
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        };
        if (manageSeconds == true) {
            options.second = '2-digit';
        }
        const formatObj = new Intl.DateTimeFormat(this.getLocale() + '-u-hc-h23', options).formatToParts(new Date());
        let timeFormat = formatObj
            .map((obj) => {
            switch (obj.type) {
                case 'hour':
                    return 'HH';
                case 'minute':
                    return 'mm';
                case 'second':
                    return 'ss';
                default:
                    return obj.value;
            }
        })
            .join('');
        return timeFormat;
    }
    /**
     * Formats the given date.
     * @param {dayjs.ConfigType} input - Date to be formatted.
     * @param {string} format - Output format.
     * @see https://day.js.org/docs/en/display/format
     */
    format(input, format) {
        if (!format) {
            format = 'L'; // MM/DD/YYYY, DD/MM/YYYY depending on locale
        }
        return dayjs(input).format(format);
    }
    /**
     * Gets the time formatted
     * @param {Date} time time as Date object
     * @param {boolean} manageSeconds flag to set seconds managing
     * @return {string} time as string, formatted
     **/
    formatTime(time, manageSeconds) {
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        };
        if (manageSeconds == true) {
            options.second = '2-digit';
        }
        return time.toLocaleTimeString(this.getLocale() + '-u-hc-h23', options);
    }
    /**
     * Validates the given date.
     * @param {dayjs.ConfigType} date - Date to be validated.
     * @param {string} format - Format of the input date.
     * @param {boolean} strict - Strict parsing requires that the format and input match exactly, including delimiters.
     * @returns {boolean} Returns whether the argument is a valid date or not.
     */
    isValid(date, format, strict) {
        if (format && format != null) {
            return dayjs(date, format, strict).isValid();
        }
        else {
            return dayjs(date, undefined, strict).isValid();
        }
    }
    /**
     * Validates the given date as string.
     * @param {string} value time string, formatted by actual browser locale
     * @param {boolean} manageSeconds if manage seconds
     * @returns {boolean} true if time string in input is a valid time
     */
    isValidFormattedStringTime(value, manageSeconds) {
        let format = this.getTimeFormat(manageSeconds);
        return this.isValid(value, format, true);
    }
    /**
     * Converts the input in a Date object.
     * @param {dayjs.ConfigType} input - Input date.
     * @param {string} format - Format of the input date.
     * @returns {Date} Date object.
     */
    toDate(input, format) {
        if (format && format != null) {
            return dayjs(input, format).toDate();
        }
        else {
            return dayjs(input).toDate();
        }
    }
    /**
     * Converts the input in a Dayjs object.
     * @param {dayjs.ConfigType} input - Input date.
     * @param {string} format - Format of the input date.
     * @returns {dayjs.Dayjs} Dayjs object.
     */
    toDayjs(input, format) {
        if (format) {
            return dayjs(input, format);
        }
        else {
            return dayjs(input);
        }
    }
    /**
     * Returns a computed ISO date/time from a partial string.
     * @param {string} input - Input string containing a partial date/time (i.e.: 011221).
     * @param {KulDatesNormalize} type - Type of the input string.
     * @returns {dayjs.Dayjs} Dayjs object of the normalized date.
     */
    normalize(input, type) {
        const l = dayjs.Ls[this.locale].formats.L;
        // array e for-each con contains
        const allowedChars = [
            '0',
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
        ];
        let inputCleaned = '';
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
            const dIndex = l.indexOf('DD');
            const mIndex = l.indexOf('MM');
            let sub1 = 0, sub2 = 0, year = '';
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
    /**
     * Returns the minimum date from an array of dates.
     * @param {dayjs.ConfigType[]} dates - Array of dates.
     * @returns {dayjs.Dayjs} Minimum date.
     */
    min(dates) {
        const dayjsDates = [];
        for (let index = 0; index < dates.length; index++) {
            const date = dates[index];
            dayjsDates.push(dayjs(date));
        }
        return dayjs.min(dayjsDates);
    }
    /**
     * Returns the maximum date from an array of dates.
     * @param {dayjs.ConfigType[]} dates - Array of dates.
     * @returns {dayjs.Dayjs} Maximum date.
     */
    max(dates) {
        const dayjsDates = [];
        for (let index = 0; index < dates.length; index++) {
            const date = dates[index];
            dayjsDates.push(dayjs(date));
        }
        return dayjs.max(dayjsDates);
    }
    /**
     * Adds the given amount of time to the input date.
     * @param {dayjs.ConfigType} input - Input date.
     * @param {number} value - The value of the addition (i.e.: 7).
     * @param {dayjs.OpUnitType} unit - The unit of the addition (i.e.: "year").
     * @returns {dayjs.Dayjs} Computed date.
     * @see https://day.js.org/docs/en/manipulate/add
     */
    add(input, value, unit) {
        return dayjs(input).add(value, unit);
    }
    /**
     * Subtracts the given amount of time from the input date.
     * @param {dayjs.ConfigType} input - Input date.
     * @param {number} value - The value of the subtraction (i.e.: 7).
     * @param {dayjs.OpUnitType} unit - The unit of the subtraction (i.e.: "year").
     * @returns {dayjs.Dayjs} Computed date.
     * @see https://day.js.org/docs/en/manipulate/subtract
     */
    subtract(input, value, unit) {
        return dayjs(input).subtract(value, unit);
    }
    /**
     * Gets the month formatted
     * @param {number} month month id
     * @param {KulDateTimeFormatOptionsMonth} format format
     * @returns {string} the month formatted, by browser locale
     */
    getMonthAsString(month, format) {
        if (month == null) {
            return '';
        }
        const dateTmp = new Date();
        dateTmp.setDate(1);
        dateTmp.setMonth(month - 1);
        const options = {
            month: format,
        };
        const dateTimeFormat = new Intl.DateTimeFormat(this.getLocale(), options);
        return dateTimeFormat.format(dateTmp);
    }
    /**
     * Gets the year months formatted
     * @param {KulDateTimeFormatOptionsMonth} format format
     * @returns {string[]} the months formatted, by browser locale
     */
    getMonthsAsString(format) {
        if (format == null || format.trim() == '') {
            format = KulDateTimeFormatOptionsMonth.LONG;
        }
        var months = [];
        for (var i = 0; i < 12; i++) {
            months[i] = this.getMonthAsString(i + 1, format);
        }
        return months;
    }
    /**
     * Gets the day formatted
     * @param {Date} date date
     * @returns {string} the day formatted, by browser locale
     */
    getDayAsString(date) {
        if (date == null) {
            return '';
        }
        const options = {
            weekday: 'narrow',
            /** weekday: 'narrow' 'short' 'long' */
        };
        const dateTimeFormat = new Intl.DateTimeFormat(this.getLocale(), options);
        return dateTimeFormat.format(date);
    }
    /**
     * First day of current week
     * @param {number} firstDayIndex first day of week index
     * @returns {Date} the first day of current week
     */
    firstDayThisWeek(firstDayIndex) {
        var d = new Date();
        const day = d.getDay();
        // dayIndex0
        d.setDate(d.getDate() - day);
        // dayIndexX
        d.setDate(d.getDate() + firstDayIndex);
        return d;
    }
    /**
     * Dates of current week
     * @param {number} firstDayIndex first day of week index
     * @returns { startDate: Date; endDate: Date } the dates of current week
     */
    thisWeek(firstDayIndex) {
        const firstDay = this.firstDayThisWeek(firstDayIndex);
        return {
            startDate: firstDay,
            endDate: offsetDate(firstDay, 6),
        };
        function offsetDate(base, count) {
            const date = new Date(base);
            date.setDate(base.getDate() + count);
            return date;
        }
    }
    /**
     * Gets the days of current week as string
     * @param {number} firstDayIndex first day of week index
     * @returns {string[]} the days of current week as string
     */
    getDaysOfWeekAsString(firstDayIndex) {
        var thisWeekDays = this.thisWeek(firstDayIndex);
        var monday = thisWeekDays.startDate;
        var days = [];
        for (var i = 0; i < 7; i++) {
            var date = new Date(monday.toISOString());
            date.setDate(date.getDate() + i);
            days[i] = this.getDayAsString(date);
        }
        return days;
    }
    /**
     * Gets the timestamp formatted
     * @param {string} value date/time as string, formatted ISO
     * @returns {string} date/time as string, formatted by actual browser locale
     **/
    timestampStringToFormattedString(value) {
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        };
        let date = this.toDate(this.normalize(value, KulDatesNormalize.TIMESTAMP));
        return date.toLocaleString(this.getLocale() + '-u-hc-h23', options);
    }
    /**
     * Gets ISO date/time from formatted string, as string
     * @param {string} value date/time as string, formatted by actual browser locale
     * @returns {string} date/time as string, formatted ISO
     **/
    formattedStringToTimestampString(value) {
        return this.formattedStringToCustomDateTime(value, KulDatesFormats.ISO_DATE_TIME, true);
    }
    /**
     * Gets formatted dateTime as customed ISO (see KulDatesFormats)
     * @param {string} value time as string, formatted by actual browser locale
     * @param {string} outputFormat time format to return (see KulDatesFormats)
     * @param {boolean} manageSeconds flag to set seconds managing
     * @returns {string} time as string, formatted
     **/
    formattedStringToCustomDateTime(value, outputFormat, manageSeconds) {
        let inputFormat = this.getTimeFormat(manageSeconds);
        if (this.isValid(value, inputFormat)) {
            return this.format(this.normalize(value, KulDatesNormalize.TIME), outputFormat);
        }
        else {
            return '';
        }
    }
    /**
     * Gets the time formatted
     * @param {string} value time as string, formatted ISO
     * @param {boolean} manageSeconds flag to set seconds managing
     * @param {string} customedFormat time format from smeupObject
     * @returns {string} time as string, formatted by actual browser locale
     **/
    timeStringToFormattedString(value, manageSeconds, customedFormat) {
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        };
        if (manageSeconds == true) {
            options.second = '2-digit';
        }
        let date = this.toDate(this.normalize(value, KulDatesNormalize.TIME));
        return formatByCustomedOutputTimeFormat(value, date, options, customedFormat, this);
        function formatByCustomedOutputTimeFormat(valueStr, date, options, customedFormat, kulDates) {
            if (customedFormat == null) {
                return date.toLocaleTimeString(kulDates.getLocale() + '-u-hc-h23', options);
            }
            switch (customedFormat) {
                case 'I13': {
                    //hh:mm
                    break;
                }
                case 'I12': {
                    //hh:mm:ss
                    break;
                }
                case 'I11': {
                    //???
                    //hh:dddd
                    //return moment(date).format('HH:DDDD');
                    return valueStr;
                }
                case 'I14': {
                    //???
                    //sssss
                    //return moment(date).format('SSSSS');
                    return valueStr;
                }
                case 'I1H': {
                    //???
                    //Ora,Cen/Min HH,xx
                    return valueStr;
                }
                case 'I1M': {
                    //???
                    //Min,Cen/Sec  MMMM,xx
                    return valueStr;
                }
                case 'I21': {
                    //???
                    //Giorni,(4 decim)
                    return valueStr;
                }
                case 'I22': {
                    //???
                    //Ore,(4 decim)
                    return valueStr;
                }
                case 'I23': {
                    //???
                    //Minuti,(4 decim)
                    return valueStr;
                }
                case 'I24': {
                    //???
                    //Secondi
                    return valueStr;
                }
                case 'I2H': {
                    //???
                    //Ora,Cen/Min HHHH,xx
                    return valueStr;
                }
                case 'I2D': {
                    //???
                    //Ore Minuti Secondi HHMMS
                    return valueStr;
                }
                case 'I2M': {
                    //???
                    //Min,Cen/Sec MMMM,xx
                    return valueStr;
                }
            }
            return date.toLocaleTimeString(kulDates.getLocale() + '-u-hc-h23', options);
        }
    }
    /**
     * Registers a KulComponent in KulDates, in order to be properly handled whenever the locale changes.
     * @param {any} component - The Ketchup component to be registered.
     */
    register(component) {
        this.managedComponents.add(component.rootElement ? component.rootElement : component);
    }
    /**
     * Unregisters a KulComponent, so it won't be refreshed when the locale changes.
     *
     * @param {any} component - The component calling this function.
     */
    unregister(component) {
        if (this.managedComponents) {
            this.managedComponents.delete(component.rootElement ? component.rootElement : component);
        }
    }
    /**
     * Formats a JS Date Object to ISO String
     *
     * @param {Date} date - The date to be formatted to ISO.
     */
    formatToIsoDate = (date) => {
        return dayjs(date).toISOString() ?? undefined;
    };
    /**
     * Parses a Date string to JS Date Object
     *
     * @param {string} ymd - The string to be converted to Date.
     */
    parseToDayStart = (ymd) => {
        return dayjs(ymd).toDate();
    };
    parseToDayEnd = (endDate) => {
        return dayjs(endDate)
            .set('hour', 23)
            .set('minute', 59)
            .set('second', 59)
            .toDate();
    };
    /**
     * Returns Start and end date of given dates
     *
     * @param {string} startDate - The start date string.
     * @param {string} endDate - The end date string.
     * @param {string} _name
     */
    validDates = (startDate, endDate, _name) => {
        let start = this.parseToDayStart(startDate);
        const end = this.parseToDayEnd(endDate);
        if (start?.getTime() > end?.getTime()) {
            start = this.parseToDayStart(endDate);
        }
        return { start, end };
    };
    formatToLocaleSimple = (date) => dayjs(date).format('DD/MM/YYYY');
}

const dom$7 = document.documentElement;
/**
 * Debugging suite, used to log messages and statuses from the Ketchup components.
 * @module KulDebug
 */
class KulDebug {
    active;
    autoPrint;
    container;
    logLimit;
    logs;
    //#debugWidget: HTMLKulCardElement;
    /**
     * Initializes KulDebug.
     * @param {boolean} active - When true, the debug is active on initialization.
     * @param {boolean} autoprint - When true, logs will be automatically printed inside the debug widget.
     * @param {number} logLimit - Maximum amount of logs stored, when they exceed the number specified in logLimit the cache will be automatically cleared.
     */
    constructor(active, autoprint, logLimit) {
        this.active = active ? true : false;
        this.autoPrint = autoprint ? true : false;
        this.container = document.createElement('div');
        this.container.setAttribute('kul-debug', '');
        document.body.appendChild(this.container);
        this.logLimit = logLimit ? logLimit : 250;
        this.logs = [];
    }
    /*  this.#debugWidget = null;
        document.addEventListener('kul-language-change', () => {
            if (this.active && this.#debugWidget) {
                this.hideWidget();
                this.showWidget();
            }
        });
    }
    /**
     * Allows the download of props by creating a temporary clickable anchor element.
     */
    /*private downloadProps(res: GenericObject) {
        const dataStr: string =
            'data:text/json;charset=utf-8,' +
            encodeURIComponent(JSON.stringify(res, null, 2));
        const downloadAnchorNode: HTMLAnchorElement =
            document.createElement('a');
        downloadAnchorNode.setAttribute('href', dataStr);
        downloadAnchorNode.setAttribute('download', 'kul_props.json');
        this.container.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }
    /**
     * Creates the debug widget.
     */
    /*private showWidget(): void {
        const debugWidget: HTMLKulCardElement =
            document.createElement('kul-card');
        const languages: string[] = dom.ketchupLite.language.getLanguages();
        const languagesListData: KulListNode[] = [];
        for (let index = 0; index < languages.length; index++) {
            languagesListData.push({
                id: languages[index],
                selected:
                    languages[index] === dom.ketchupLite.language.name
                        ? true
                        : false,
                value: languages[index],
            });
        }
        const themes: string[] = dom.ketchupLite.theme.getThemes();
        const themesListData: KulListNode[] = [];
        for (let index = 0; index < themes.length; index++) {
            themesListData.push({
                id: themes[index],
                selected:
                    themes[index] === dom.ketchupLite.theme.name ? true : false,
                value: themes[index],
            });
        }
        const locales: string[] = dom.ketchupLite.dates.getLocales();
        const localesListData: KulListNode[] = [];
        for (let index = 0; index < locales.length; index++) {
            localesListData.push({
                id: locales[index],
                selected:
                    locales[index] === dom.ketchupLite.dates.locale ? true : false,
                value: locales[index],
            });
        }
        debugWidget.data = {
            button: [
                {
                    icon: 'power_settings_new',
                    id: 'kul-debug-off',
                    customStyle:
                        ':host {--kul-font-size: 0.875em; border-left: 1px solid var(--kul-border-color); border-right: 1px solid var(--kul-border-color);}',
                    title: dom.ketchupLite.language.translate(KulLanguageDebug.OFF),
                },
                {
                    customStyle: ':host {--kul-font-size: 0.875em;}',
                    icon: 'print',
                    id: 'kul-debug-print',
                    title: dom.ketchupLite.language.translate(
                        KulLanguageDebug.PRINT
                    ),
                },
                {
                    checked: this.autoPrint,
                    customStyle:
                        ':host {--kul-font-size: 0.875em; border-right: 1px solid var(--kul-border-color);}',
                    icon: 'speaker_notes',
                    iconOff: 'speaker_notes_off',
                    id: 'kul-debug-autoprint',
                    title: dom.ketchupLite.language.translate(
                        KulLanguageDebug.AUTOPRINT
                    ),
                    toggable: true,
                },
                {
                    customStyle: ':host {--kul-font-size: 0.875em;}',
                    icon: 'broom',
                    id: 'kul-debug-clear',
                    title: dom.ketchupLite.language.translate(
                        KulLanguageDebug.CLEAR
                    ),
                },
                {
                    customStyle: ':host {--kul-font-size: 0.875em;}',
                    icon: 'delete',
                    id: 'kul-debug-delete',
                    title: dom.ketchupLite.language.translate(
                        KulLanguageDebug.DUMP
                    ),
                },
                {
                    className: 'kul-full-height',
                    customStyle:
                        ':host {border-left: 1px solid var(--kul-border-color);}',
                    icon: 'download',
                    id: 'kul-debug-dl-props',
                    label: 'Props',
                    styling: 'flat',
                    title: dom.ketchupLite.language.translate(
                        KulLanguageDebug.DL_PROPS
                    ),
                },
                {
                    className: 'kul-full-height',
                    customStyle:
                        ':host {border-right: 1px solid var(--kul-border-color);}',
                    icon: 'download',
                    id: 'kul-debug-dl-all',
                    label: dom.ketchupLite.language.translate(
                        KulLanguageDebug.DL_ALL
                    ),
                    styling: 'flat',
                    title: dom.ketchupLite.language.translate(
                        KulLanguageDebug.DL_ALL
                    ),
                },
                {
                    customStyle: ':host {--kul-font-size: 0.875em;}',
                    icon: 'auto-fix',
                    id: 'kul-debug-magic-box',
                    title: dom.ketchupLite.language.translate(
                        KulLanguageDebug.MAGIC_BOX
                    ),
                },
            ],
            combobox: [
                {
                    className: 'kul-full-height',
                    data: {
                        'kul-list': {
                            data: themesListData,
                            id: 'kul-debug-theme-changer-list',
                        },
                        'kul-text-field': {
                            className: 'kul-full-height',
                            emitSubmitEventOnEnter: false,
                            inputType: 'text',
                            label: dom.ketchupLite.language.translate(
                                KulLanguageDebug.THEME_CHANGER
                            ),
                        },
                    },
                    id: 'kul-debug-theme-changer',
                    initialValue: dom.ketchupLite.theme.name,
                    isSelect: true,
                },
                {
                    className: 'kul-full-height',
                    data: {
                        'kul-list': {
                            data: languagesListData,
                            id: 'kul-debug-language-changer-list',
                        },
                        'kul-text-field': {
                            className: 'kul-full-height',
                            emitSubmitEventOnEnter: false,
                            inputType: 'text',
                            label: dom.ketchupLite.language.translate(
                                KulLanguageDebug.LANGUAGE_CHANGER
                            ),
                        },
                    },
                    id: 'kul-debug-language-changer',
                    initialValue: dom.ketchupLite.language.name,
                    isSelect: true,
                },
                {
                    className: 'kul-full-height',
                    data: {
                        'kul-list': {
                            data: localesListData,
                            id: 'kul-debug-locale-changer-list',
                        },
                        'kul-text-field': {
                            className: 'kul-full-height',
                            emitSubmitEventOnEnter: false,
                            inputType: 'text',
                            label: dom.ketchupLite.language.translate(
                                KulLanguageDebug.LOCALE_CHANGER
                            ),
                        },
                    },
                    id: 'kul-debug-locale-changer',
                    initialValue: dom.ketchupLite.dates.locale,
                    isSelect: true,
                },
            ],
            textfield: [
                {
                    className: 'kul-full-height',
                    id: 'kul-debug-log-limit',
                    label: dom.ketchupLite.language.translate(
                        KulLanguageDebug.LOG_LIMIT
                    ),
                    initialValue: this.logLimit,
                    emitSubmitEventOnEnter: false,
                    inputType: 'number',
                },
            ],
        };
        debugWidget.customStyle =
            '#kul-debug-log-limit {width: 120px;} #kul-debug-theme-changer {width: 190px;} #kul-debug-language-changer {width: 190px;} #kul-debug-locale-changer {width: 190px;}';
        debugWidget.id = 'kul-debug-widget';
        debugWidget.layoutFamily = KulCardFamily.DIALOG;
        debugWidget.layoutNumber = 3;
        debugWidget.sizeX = 'max-content';
        debugWidget.sizeY = 'auto';
        const handler = this.handleEvents;
        debugWidget.addEventListener('kul-card-event', (e: CustomEvent) =>
            handler(e, this)
        );

        this.container.append(debugWidget);
        this.#debugWidget = debugWidget;
    }
    /**
     * Listens the card events and handles the related actions.
     * @param {CustomEvent<KulCardEventPayload>} e - kul-card-event.
     * @param {KulDebug} kulDebug - Instance of the KulDebug class.
     */
    /*private handleEvents(
        e: CustomEvent<KulCardEventPayload>,
        kulDebug: KulDebug
    ): void {
        const compEvent: CustomEvent = e.detail.event;
        const compID: string = compEvent.detail.id;
        switch (compEvent.type) {
            case 'kul-button-click':
                switch (compID) {
                    case 'kul-debug-autoprint':
                        kulDebug.autoPrint = !kulDebug.autoPrint;
                        break;
                    case 'kul-debug-clear':
                        kulDebug.widgetClear();
                        kulDebug.#debugWidget.refresh();
                        break;
                    case 'kul-debug-dl-props':
                        kulDebug.getProps().then((res: GenericObject) => {
                            kulDebug.downloadProps(res);
                        });
                        break;
                    case 'kul-debug-dl-all':
                        kulDebug.getProps(true).then((res: GenericObject) => {
                            kulDebug.downloadProps(res);
                        });
                        break;
                    case 'kul-debug-delete':
                        kulDebug.dump();
                        break;
                    case 'kul-debug-off':
                        kulDebug.toggle();
                        break;
                    case 'kul-debug-print':
                        kulDebug.widgetClear();
                        kulDebug.widgetPrint();
                        kulDebug.#debugWidget.refresh();
                        break;
                }
                break;
            case 'kul-combobox-itemclick':
                switch (compID) {
                    case 'kul-debug-language-changer':
                        dom.ketchupLite.language.set(compEvent.detail.value);
                        break;
                    case 'kul-debug-locale-changer':
                        dom.ketchupLite.dates.setLocale(compEvent.detail.value);
                        dom.ketchupLite.math.setLocale(compEvent.detail.value);
                        break;
                    case 'kul-debug-theme-changer':
                        dom.ketchupLite.theme.set(compEvent.detail.value);
                        break;
                }
            case 'kul-textfield-input':
                switch (compID) {
                    case 'kul-debug-log-limit':
                        if (
                            compEvent.detail.value === '' ||
                            compEvent.detail.value < 1
                        ) {
                            kulDebug.logLimit = 1;
                        } else {
                            kulDebug.logLimit = compEvent.detail.value;
                        }
                        break;
                }
        }
    }
    /**
     * Closes the debug widget.
     */
    /*private hideWidget() {
        this.#debugWidget.remove();
        this.#debugWidget = null;
    }
    /**
     * Clears all the printed logs inside the debug widget.
     */
    /*private widgetClear(): void {
        const children: HTMLCollection = Array.prototype.slice.call(
            this.#debugWidget.children,
            0
        );
        for (let index = 0; index < children.length; index++) {
            children[index].remove();
        }
    }
    /**
     * Prints the stored logs inside the debug widget.
     */
    /*private widgetPrint(): void {
        const slots: Array<HTMLDivElement> = [];
        for (let index = 0; index < this.logs.length; index++) {
            // Wrapper div
            const slot: HTMLDivElement = document.createElement('div');
            slot.classList.add('text');
            switch (this.logs[index].category) {
                case KulDebugCategory.ERROR:
                    slot.style.backgroundColor =
                        'rgba(var(--kul-danger-color-rgb), 0.15)';
                    slot.style.borderLeft = '5px solid var(--kul-danger-color)';
                    break;
                case KulDebugCategory.WARNING:
                    slot.style.backgroundColor =
                        'rgba(var(--kul-warning-color-rgb), 0.15)';
                    slot.style.borderLeft =
                        '5px solid var(--kul-warning-color)';
                    break;
                case KulDebugCategory.INFO:
                default:
                    slot.style.borderLeft = '5px solid var(--kul-info-color)';
                    break;
            }
            // If the log is tied to a KulComponent, on click its props will be downloaded.
            // Also, a different style will be applied to distinguish it between the others.
            if (typeof this.logs[index].element == 'object') {
                slot.title = dom.ketchupLite.language.translate(
                    KulLanguageDebug.DL_PROPS_COMP
                );
                slot.style.fontWeight = 'bold';
                slot.style.cursor = 'pointer';
                slot.onclick = () => {
                    try {
                        (this.logs[index].element as KulComponent)
                            .getProps()
                            .then((res: GenericObject) => {
                                this.downloadProps(res);
                            });
                    } catch (err) {
                        this.logMessage(
                            'kul-debug',
                            err,
                            KulDebugCategory.WARNING
                        );
                    }
                };
            }
            // ID span
            const id: HTMLSpanElement = document.createElement('span');
            id.innerHTML = this.logs[index].id;
            id.style.opacity = '0.75';
            id.style.marginLeft = '5px';
            // Message span
            const message: HTMLSpanElement = document.createElement('span');
            message.innerHTML = this.logs[index].message;
            // Append elements
            slot.append(id, message);
            slots.push(slot);
        }
        slots.reverse();
        for (let index = 0; index < slots.length; index++) {
            this.#debugWidget.append(slots[index]);
        }
    }
    /**
     * Dumps the stored logs.
     */
    dump() {
        this.logs = [];
    }
    /**
     * Displays a table with debug information inside the browser's console.
     */
    print() {
        let printLog = {};
        for (let index = 0; index < this.logs.length; index++) {
            const type = this.logs[index].message.indexOf('Render #') > -1
                ? 'Render'
                : this.logs[index].message.indexOf('Component ready') > -1
                    ? 'Load'
                    : this.logs[index].message.indexOf('Size changed') > -1
                        ? 'Resize'
                        : 'Misc';
            const isComponent = !!this.logs[index]
                .element;
            if (!printLog[type]) {
                printLog[type] = [];
            }
            printLog[type].push({
                date: dom$7.ketchupLite.dates.format(this.logs[index].date, 'LLL:ms'),
                element: isComponent
                    ? this.logs[index]
                        .element
                    : this.logs[index].id,
                message: isComponent
                    ? this.logs[index].id + this.logs[index].message
                    : this.logs[index].message,
            });
        }
        for (const key in printLog) {
            if (Object.prototype.hasOwnProperty.call(printLog, key)) {
                console.groupCollapsed('%c  %c' +
                    key +
                    ' logs ' +
                    '(' +
                    printLog[key].length +
                    ')', 'background-color: green; margin-right: 10px; border-radius: 50%', 'background-color: transparent');
                for (let index = 0; index < printLog[key].length; index++) {
                    console.log(printLog[key][index].date, printLog[key][index].message, printLog[key][index].element);
                }
                console.groupEnd();
            }
        }
        if (this.logs.length > 0) {
            console.groupCollapsed('%c  %c' + 'All logs (' + this.logs.length + ')', 'background-color: blue; margin-right: 10px; border-radius: 50%', 'background-color: transparent');
            console.table(this.logs);
            console.groupEnd();
        }
    }
    /**
     * Function used to set the status of the debug.
     * If no argument is provided, this method will work as a toggler.
     * @param {boolean} value - If this argument is provided, the debug status will be forced to its value.
     */
    /*toggle(value?: boolean): void {
        if (typeof value !== 'boolean') {
            this.active = !this.active;
        } else {
            this.active = value;
        }
        if (this.active) {
            document.dispatchEvent(new CustomEvent('kul-debug-active'));
            if (!this.#debugWidget) {
                this.showWidget();
            }
        } else {
            document.dispatchEvent(new CustomEvent('kul-debug-inactive'));
            if (this.#debugWidget) {
                this.hideWidget();
            }
        }
    }
    /**
     * Function used to check whether the debug is active or not.
     * @returns {boolean} Status of the debug.
     */
    isDebug() {
        return this.active;
    }
    /**
     * Retrieves the information for every component in this.logs by invoking the getProps public method of each component.
     * 'tag' will contain the props of the component's html tag (i.e.: <kul-chip>).
     * 'props' will contain the developer defined props of the component, making it handy for test purposes.
     * @param {boolean} detail - If provided and true, the returned object will contain additional information (i.e.: className, id).
     * @returns {GenericObject} Props of the components.
     */
    /*async getProps(detail?: boolean): Promise<GenericObject> {
        let comps: Set<KulComponent> = new Set();
        let props: GenericObject = detail ? { descriptions: {} } : {};
        // Storing unique components inside "comps"
        for (let index = 0; index < this.logs.length; index++) {
            if (typeof this.logs[index].element !== 'string') {
                if (!comps.has(this.logs[index].element as KulComponent)) {
                    comps.add(this.logs[index].element as KulComponent);
                }
            }
        }
        // Object of two arrays, positionally matching each other.
        // One contains components, the other the relative promise.
        const matchingObject: {
            comps: KulComponent[];
            promises: Promise<GenericObject>[];
        } = {
            comps: [],
            promises: [],
        };
        comps.forEach((el: KulComponent) => {
            try {
                matchingObject.comps.push(el);
                matchingObject.promises.push(el.getProps());
            } catch (error) {
                this.logMessage(
                    'kul-debug',
                    'Exception when accessing "getProps" public method for component: ' +
                        el.rootElement.tagName,
                    KulDebugCategory.WARNING
                );
            }
        });
        // Returning "props", which is returned by the Promise.all
        return Promise.all(matchingObject.promises).then((responses) => {
            for (let index = 0; index < matchingObject.comps.length; index++) {
                const el: KulComponent = matchingObject.comps[index];
                const res: GenericObject = responses[index];
                let cnt: number = 0;
                let key: string = el.rootElement.id
                    ? el.rootElement.tagName + '#' + el.rootElement.id
                    : el.rootElement.tagName + '_' + ++cnt;
                while (props[key]) {
                    key = el.rootElement.tagName + '_' + ++cnt;
                }
                if (detail) {
                    let tag: GenericObject = {};
                    for (const key in el.rootElement) {
                        tag[key] = el.rootElement[key];
                    }
                    props[key] = {
                        props: res,
                        tagInfo: tag,
                    };
                    if (!props.descriptions[el.rootElement.tagName]) {
                        try {
                            el.getProps(true).then((res: GenericObject) => {
                                props.descriptions[el.rootElement.tagName] =
                                    res;
                            });
                        } catch (error) {
                            this.logMessage(
                                'kul-debug',
                                'Exception when accessing "getProps" public method for component: ' +
                                    el.rootElement.tagName,
                                KulDebugCategory.WARNING
                            );
                        }
                    }
                } else {
                    props[key] = res;
                }
            }
            return props;
        });
    }
    /**
     * Displays a timestamped message in the browser's console when the kulDebug property on document.documentElement is true.
     * Warnings and errors will be displayed even when kulDebug !== true.
     * @param {any} comp - The component calling this function or a string.
     * @param {string} message - The actual message that will be printed.
     * @param {KulDebugCategory} category - The type of console message, defaults to log but warning and error can be used as well.
     */
    logMessage(comp, message, category) {
        if ((!category || category === 'informational') && !this.isDebug()) {
            return;
        }
        const date = new Date();
        if (!category) {
            category = 'informational';
        }
        let obj = null;
        let id = '';
        if (typeof comp !== 'string') {
            id =
                ' ' +
                    comp.rootElement.tagName +
                    '#' +
                    comp.rootElement.id +
                    ' => ';
            obj = comp;
        }
        else {
            id = ' ' + comp + ' => ';
            obj = '';
        }
        if (this.isDebug() && id.indexOf('#kul-debug') < 0) {
            const log = {
                category: category,
                date: date,
                element: obj,
                id: id,
                message: message,
            };
            if (this.logs.length > this.logLimit) {
                console.warn(dom$7.ketchupLite.dates.format(date, 'LLL:ms') +
                    ' kul-debug => ' +
                    'Too many logs (> ' +
                    this.logLimit +
                    ')! Dumping (increase debug.logLimit to store more logs)... .');
                this.dump();
            }
            this.logs.push(log);
            /*if (this.autoPrint && this.#debugWidget) {
                this.widgetClear();
                this.widgetPrint();
                this.#debugWidget.refresh();
            }*/
        }
        switch (category) {
            case 'error':
                console.error(dom$7.ketchupLite.dates.format(date, 'LLL:ms') + id + message, obj);
                window.dispatchEvent(new CustomEvent('kul-debug-error', {
                    bubbles: true,
                    detail: { comp, date, message },
                }));
                break;
            case 'warning':
                console.warn(dom$7.ketchupLite.dates.format(date, 'LLL:ms') + id + message, obj);
                break;
        }
    }
    /**
     * Function used to time the loading times of a component.
     * @param {any} KulComponent - The component calling this function or a string.
     * @param {boolean} didLoad - Must be set to false when called inside a componentWillLoad() lifecycle hook and true when called inside componentDidLoad().
     */
    async updateDebugInfo(comp, lifecycle) {
        switch (lifecycle) {
            case 'custom':
                if (this.isDebug()) {
                    this.logMessage(comp, 'Custom breakpoint ' +
                        ' took ' +
                        (window.performance.now() -
                            comp.debugInfo.renderStart) +
                        'ms.');
                }
                break;
            case 'did-render':
                comp.debugInfo.renderEnd = window.performance.now();
                if (this.isDebug()) {
                    this.logMessage(comp, 'Render #' +
                        comp.debugInfo.renderCount +
                        ' took ' +
                        (comp.debugInfo.renderEnd -
                            comp.debugInfo.renderStart) +
                        'ms.');
                }
                break;
            case 'did-load':
                comp.debugInfo.endTime = window.performance.now();
                this.logMessage(comp, 'Component ready after ' +
                    (comp.debugInfo.endTime - comp.debugInfo.startTime) +
                    'ms.');
                break;
            case 'will-render':
                comp.debugInfo.renderCount++;
                comp.debugInfo.renderStart = window.performance.now();
        }
    }
}

const CSS_VAR_PREFIX = '--kul';
const KUL_DROPDOWN_CLASS = 'kul-dropdown-menu';
const KUL_DROPDOWN_CLASS_VISIBLE = 'kul-dropdown-menu--visible';
const KUL_STYLE_ID = 'kul-style';
const KUL_WRAPPER_ID = 'kul-component';
const RIPPLE_SURFACE_CLASS = 'ripple-surface';

/**
 * HTML attribute attached to dynamically positioned elements.
 */
const kulDynamicPositionAttribute = 'kul-dynamic-position';
/**
 * HTML attribute attached to dynamically positioned elements' anchor point.
 */
const kulDynamicPositionAnchorAttribute = 'kul-dynamic-position-anchor';
/**
 * Available placements.
 */
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

const dom$6 = document.documentElement;
/**
 * This class is used to dynamically reposition HTML elements.
 * @module KulDynamicPosition
 */
class KulDynamicPosition {
    container;
    managedElements;
    /**
     * Initializes KulDynamicPosition.
     */
    constructor() {
        this.container = document.createElement('div');
        this.container.setAttribute('kul-dynamic-position', '');
        document.body.appendChild(this.container);
        this.managedElements = new Set();
    }
    /**
     * Function used to check whether the anchor point is an HTMLElement or a set of coordinates.
     * @param {KulDynamicPositionAnchor} anchor - Anchor point.
     * @returns {anchor is HTMLElement} Returns true when the anchor point is an HTMLElement.
     */
    anchorIsHTMLElement(anchor) {
        return anchor.tagName !== undefined;
    }
    /**
     * Watches the element eligible to dynamic positioning.
     * @param {KulDynamicPositionElement} el - Element to reposition.
     * @param {KulDynamicPositionAnchor} anchorEl - "el" position will be anchored to this element or to these coordinates.
     * @param {number} margin - "el" distance from its parent in pixels.
     * @param {KulDynamicPositionPlacement} placement - "el" placement.
     * @param {boolean} detach - When true, the function won't be recursive but it will be executed only once. "el" will be detached from its original parent and it will be appended to this.container.
     */
    register(el, anchorEl, margin, placement, detach) {
        if (this.isRegistered(el)) {
            this.changeAnchor(el, anchorEl);
            return;
        }
        el.setAttribute(kulDynamicPositionAttribute, '');
        if (this.anchorIsHTMLElement(anchorEl)) {
            anchorEl.setAttribute(kulDynamicPositionAnchorAttribute, '');
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
            el.style.position = 'absolute';
            this.container.appendChild(el);
        }
        else {
            el.style.position = 'fixed';
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
                requestAnimationFrame(function () {
                    dom$6.ketchupLite.dynamicPosition.run(el);
                });
            }
        });
        mutObserver.observe(el, {
            attributes: true,
            attributeFilter: ['class'],
        });
        this.managedElements.add(el);
    }
    /**
     * Changes the anchor point of the given element.
     * @param {KulDynamicPositionElement} elements - Dynamically positioned element previously registered.
     * @param {KulDynamicPositionAnchor} anchorEl - New anchor point.
     */
    changeAnchor(el, anchorEl) {
        el.kulDynamicPosition.anchor = anchorEl;
    }
    /**
     * Removes the element from dynamic position management.
     * @param {KulDynamicPositionElement[]} elements - Elements to remove from the managed elements set.
     */
    unregister(elements) {
        if (this.managedElements) {
            for (let index = 0; index < elements.length; index++) {
                this.managedElements.delete(elements[index]);
            }
        }
    }
    /**
     * Returns whether an element was previously registered or not.
     * @param {KulDynamicPositionElement} el - Element to test.
     * @returns {boolean} True if the element was registered.
     */
    isRegistered(el) {
        return !this.managedElements ? false : this.managedElements.has(el);
    }
    /**
     * Starts the process of dynamically reposition the element (which must be firstly initialized through this.setup()).
     * @param {KulDynamicPositionElement} el - Element to reposition.
     */
    start(el) {
        el.classList.add(KUL_DROPDOWN_CLASS_VISIBLE);
    }
    /**
     * Ends the process of dynamically reposition the element.
     * @param {KulDynamicPositionElement} el - Element to reposition.
     */
    stop(el) {
        el.classList.remove(KUL_DROPDOWN_CLASS_VISIBLE);
    }
    /**
     * This function calculates where to place the element in order to correctly display it attached to its anchor point.
     * @param {KulDynamicPositionElement} el - Element to reposition.
     */
    run(el) {
        if (!el.isConnected) {
            dom$6.ketchupLite.dynamicPosition.managedElements.delete(el);
            cancelAnimationFrame(el.kulDynamicPosition.rAF);
            return;
        }
        if (!el.classList.contains(KUL_DROPDOWN_CLASS_VISIBLE)) {
            cancelAnimationFrame(el.kulDynamicPosition.rAF);
            return;
        }
        // Reset placement
        el.style.top = '';
        el.style.right = '';
        el.style.bottom = '';
        el.style.left = '';
        // Fixed position (usually from mouse events).
        // When anchor doesn't have the tagName property, anchor is considered as a set of coordinates.
        if (!this.anchorIsHTMLElement(el.kulDynamicPosition.anchor)) {
            const x = el.kulDynamicPosition.anchor.x;
            const y = el.kulDynamicPosition.anchor.y;
            if (el.offsetWidth >
                window.innerWidth - el.kulDynamicPosition.anchor.x) {
                el.style.left = x - el.offsetWidth + 'px';
            }
            else {
                el.style.left = x + 'px';
            }
            if (el.offsetHeight >
                window.innerHeight - el.kulDynamicPosition.anchor.y) {
                el.style.top = y - el.offsetHeight + 'px';
            }
            else {
                el.style.top = y + 'px';
            }
            return;
        }
        const detached = !!el.kulDynamicPosition.detach;
        const offsetH = el.clientHeight;
        const offsetW = el.clientWidth;
        const rect = el.kulDynamicPosition.anchor.getBoundingClientRect();
        const top = detached ? window.pageYOffset + rect.top : rect.top, left = detached
            ? window.pageXOffset + rect.left
            : rect.left, bottom = detached
            ? window.pageYOffset + rect.bottom
            : rect.bottom, right = detached
            ? window.pageXOffset + rect.right
            : rect.right;
        // Vertical position
        if (el.kulDynamicPosition.placement ===
            KulDynamicPositionPlacement.TOP ||
            el.kulDynamicPosition.placement ===
                KulDynamicPositionPlacement.TOP_LEFT ||
            el.kulDynamicPosition.placement ===
                KulDynamicPositionPlacement.TOP_RIGHT) {
            el.style.bottom = `${window.innerHeight - top + el.kulDynamicPosition.margin}px`;
        }
        else if (el.kulDynamicPosition.placement ===
            KulDynamicPositionPlacement.BOTTOM ||
            el.kulDynamicPosition.placement ===
                KulDynamicPositionPlacement.BOTTOM_LEFT ||
            el.kulDynamicPosition.placement ===
                KulDynamicPositionPlacement.BOTTOM_RIGHT) {
            el.style.top = `${bottom + el.kulDynamicPosition.margin}px`;
        }
        else {
            if (offsetH < rect.top &&
                window.innerHeight - rect.bottom < offsetH) {
                el.style.bottom = `${window.innerHeight - top + el.kulDynamicPosition.margin}px`;
            }
            else {
                el.style.top = `${bottom + el.kulDynamicPosition.margin}px`;
            }
        }
        // Horizontal position
        if (el.kulDynamicPosition.placement ===
            KulDynamicPositionPlacement.LEFT ||
            el.kulDynamicPosition.placement ===
                KulDynamicPositionPlacement.BOTTOM_LEFT ||
            el.kulDynamicPosition.placement ===
                KulDynamicPositionPlacement.TOP_LEFT) {
            el.style.left = `${left}px`;
        }
        else if (el.kulDynamicPosition.placement ===
            KulDynamicPositionPlacement.RIGHT ||
            el.kulDynamicPosition.placement ===
                KulDynamicPositionPlacement.BOTTOM_RIGHT ||
            el.kulDynamicPosition.placement ===
                KulDynamicPositionPlacement.TOP_RIGHT) {
            let scrollbarWidth = window.innerWidth - document.documentElement.offsetWidth;
            if (scrollbarWidth > 30) {
                scrollbarWidth = 0;
            }
            el.style.right = `${window.innerWidth - scrollbarWidth - right}px`;
        }
        else {
            if (offsetW < rect.right &&
                window.innerWidth - rect.left < offsetW) {
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
        // Recursive
        if (!el.kulDynamicPosition.detach) {
            el.kulDynamicPosition.rAF = requestAnimationFrame(function () {
                dom$6.ketchupLite.dynamicPosition.run(el);
            });
        }
        else {
            cancelAnimationFrame(el.kulDynamicPosition.rAF);
            return;
        }
    }
}

/**
 * Default languages available.
 */
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
/**
 * Checkbox statuses decodes.
 */
var KulLanguageCheckbox;
(function (KulLanguageCheckbox) {
    KulLanguageCheckbox["ALL"] = "checkboxAll";
    KulLanguageCheckbox["CHECKED"] = "checkboxChecked";
    KulLanguageCheckbox["INDETERMINATE"] = "checkboxIndeterminate";
    KulLanguageCheckbox["UNCHECKED"] = "checkboxUnchecked";
})(KulLanguageCheckbox || (KulLanguageCheckbox = {}));
/**
 * Column related decodes.
 */
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
/**
 * Dashboard related decodes.
 */
var KulLanguageDashboard;
(function (KulLanguageDashboard) {
    KulLanguageDashboard["DIMENSION"] = "dashboardDimension";
    KulLanguageDashboard["LOADED"] = "dashboardLoaded";
    KulLanguageDashboard["RESET"] = "dashboardReset";
    KulLanguageDashboard["SAVE"] = "dashboardSave";
    KulLanguageDashboard["VERTICAL"] = "dashboardVertical";
})(KulLanguageDashboard || (KulLanguageDashboard = {}));
/**
 * Debug widget decodes.
 */
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
/**
 * Density decodes (data table customization settings).
 */
var KulLanguageDensity;
(function (KulLanguageDensity) {
    KulLanguageDensity["DENSE"] = "densityDense";
    KulLanguageDensity["LABEL"] = "densityLabel";
    KulLanguageDensity["MEDIUM"] = "densityMedium";
    KulLanguageDensity["WIDE"] = "densityWide";
})(KulLanguageDensity || (KulLanguageDensity = {}));
/**
 * Font size decodes (data table customization settings).
 */
var KulLanguageFontsize;
(function (KulLanguageFontsize) {
    KulLanguageFontsize["BIG"] = "fontsizeBig";
    KulLanguageFontsize["LABEL"] = "fontsizeLabel";
    KulLanguageFontsize["MEDIUM"] = "fontsizeMedium";
    KulLanguageFontsize["SMALL"] = "fontsizeSmall";
})(KulLanguageFontsize || (KulLanguageFontsize = {}));
/**
 * Generic user interface action/messages.
 */
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
/**
 * Grid decodes (data table customization settings).
 */
var KulLanguageGrid;
(function (KulLanguageGrid) {
    KulLanguageGrid["COLUMN"] = "gridColumn";
    KulLanguageGrid["COMPLETE"] = "gridComplete";
    KulLanguageGrid["LABEL"] = "gridLabel";
    KulLanguageGrid["NONE"] = "gridNone";
    KulLanguageGrid["ROW"] = "gridRow";
})(KulLanguageGrid || (KulLanguageGrid = {}));
/**
 * Grouping decodes (data table groups).
 */
var KulLanguageGrouping;
(function (KulLanguageGrouping) {
    KulLanguageGrouping["DISABLE"] = "groupingDisable";
    KulLanguageGrouping["ENABLE"] = "groupingEnable";
    KulLanguageGrouping["GROUPS"] = "groupingGroups";
})(KulLanguageGrouping || (KulLanguageGrouping = {}));
/**
 * Page related decodes.
 */
var KulLanguagePage;
(function (KulLanguagePage) {
    KulLanguagePage["PAGE"] = "pagePage";
    KulLanguagePage["TOTAL"] = "pageTotal";
})(KulLanguagePage || (KulLanguagePage = {}));
/**
 * Row related decodes.
 */
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
/**
 * Search decodes.
 */
var KulLanguageSearch;
(function (KulLanguageSearch) {
    KulLanguageSearch["FROM"] = "searchFrom";
    KulLanguageSearch["SEARCH"] = "searchSearch";
    KulLanguageSearch["TO"] = "searchTo";
})(KulLanguageSearch || (KulLanguageSearch = {}));
/**
 * Footer totals decodes (tree and data table).
 */
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
            checkboxAll: '全部',
            checkboxChecked: '已检查',
            checkboxIndeterminate: '不定',
            checkboxUnchecked: '未检查',
            columnAdd: '添加栏',
            columnAddDescription: '添加代码/描述列',
            columnColumns: '列',
            columnHide: '隐藏栏',
            columnMerge: '合并列',
            columnNoFormula: '这些列没有可用的公式',
            columnNonNumerical: '这些列不是数字的',
            columnNonNumericalInTable: '此表中不存在数字列',
            columnSwap: '交换',
            dashboardDimension: '方面',
            dashboardLoaded: '已加载',
            dashboardReset: '重置',
            dashboardSave: '节省',
            dashboardVertical: '垂直的',
            debugAutoprint: '切换自动打印',
            debugClear: '清除小部件',
            debugDLAll: '全部',
            debugDLProps: '下载组件道具',
            debugDLPropsComp: '下载组件道具',
            debugDump: '转储存储的日志',
            debugLanguageChanger: '设置语言',
            debugLocaleChanger: '設置語言環境',
            debugLogLimit: '设置日志限制',
            debugMagicBox: '切换kul-magic-box',
            debugOff: '关闭调试',
            debugPrint: '打印已存储的日志',
            debugThemeChanger: '设置主题',
            densityDense: '稠密',
            densityLabel: '行密度',
            densityMedium: '中等的',
            densityWide: '宽的',
            fontsizeBig: '大的',
            fontsizeLabel: '字体大小',
            fontsizeMedium: '中等的',
            fontsizeSmall: '小的',
            genericAbort: '取消',
            genericAddNew: '添新',
            genericApply: '申请',
            genericBack: '背部',
            genericCollapse: '坍塌',
            genericConfirm: '确认',
            genericConfirmDelete: '你确认取消了吗?',
            genericConfirmDeleteXRows: '删除（{0}）行?',
            genericDay: '日',
            genericDragAndDrop: '拖放',
            genericDropYourData: '将您的数据放在这里',
            genericEditable: '可编辑的',
            genericEditableField: '该字段可以编辑',
            genericEmptyData: '空数据',
            genericEmptyObject: '空对象',
            genericExpand: '扩张',
            genericExperimentalFeat: '实验功能',
            genericFilters: '筛选器',
            genericInfo: '信息',
            genericInvalidColor: '颜色无效',
            genericLayoutNotYetImplemented: '布局尚未实施',
            genericList: '列表',
            genericLoadMoreData: '加载更多数据',
            genericMenu: '画面',
            genericMerge: '合并',
            genericMonth: '月',
            genericMove: '移动',
            genericNext: '下一个',
            genericNo: '不',
            genericOpenInNewTab: '在新标签页中打开',
            genericOpenInNewWindow: '在新窗口中打开',
            genericOpenNavigationMenu: '打开导航菜单',
            genericOptions: '选项',
            genericPrevious: '以前的',
            genericRemoveFilters: '删除过滤器',
            genericSettings: '设置',
            genericShowRowOptions: '显示行选项',
            genericShowTooltipInfo: '显示工具提示信息',
            genericSortBy: '排序方式',
            genericSwap: '隐藏栏',
            genericToday: '今天',
            genericToggle: '切换',
            genericTop: '最佳',
            genericTotalsTable: '总计表',
            genericTransposeData: '转置数据',
            genericViewAs: '查看为',
            genericWeek: '星期',
            genericYes: '是的',
            gridColumn: '柱子',
            gridComplete: '完全的',
            gridLabel: '网格类型',
            gridNone: '没有任何',
            gridRow: '排',
            groupingDisable: '禁用分组',
            groupingEnable: '启用分组',
            groupingGroups: '团体',
            pagePage: '页',
            pageTotal: '总页数',
            rowDetail: '行详细信息',
            rowEditableKey: '可编辑的记录键',
            rowKey: '记录键',
            rowNext: '下一行',
            rowPrevious: '上一行',
            rowRendered: '渲染的行',
            rowRows: '行数',
            rowSelected: '选定的行',
            rowTotal: '总行数',
            searchFrom: '从',
            searchSearch: '搜索',
            searchTo: '至',
            totalsAverage: '平均数',
            totalsCalculate: '计算',
            totalsCancel: '取消',
            totalsCount: '数数',
            totalsDifference: '不同之处',
            totalsDistinct: '清楚的',
            totalsFormula: '公式',
            totalsMaximum: '最大',
            totalsMinimum: '最低限度',
            totalsProduct: '产物',
            totalsSum: '和',
        },
    },
    english: {
        keys: {
            checkboxAll: 'All',
            checkboxChecked: 'Checked',
            checkboxIndeterminate: 'Indeterminate',
            checkboxUnchecked: 'Unchecked',
            columnAdd: 'Add column',
            columnAddDescription: 'Add code/description column',
            columnColumns: 'Columns',
            columnHide: 'Hide column',
            columnMerge: 'Merge columns',
            columnNoFormula: 'No formulas available for these columns.',
            columnNonNumerical: 'These columns are not numerical.',
            columnNonNumericalInTable: 'No numerical columns exist in this table.',
            columnSwap: 'Swap columns',
            dashboardDimension: 'Dimension',
            dashboardLoaded: 'Loaded',
            dashboardReset: 'Reset',
            dashboardSave: 'Save',
            dashboardVertical: 'Vertical',
            debugAutoprint: 'Toggle automatic print',
            debugClear: 'Clear widget',
            debugDLAll: 'All',
            debugDLProps: 'Download components props',
            debugDLPropsComp: 'Download component props',
            debugDump: 'Dump stored logs',
            debugLanguageChanger: 'Set language',
            debugLocaleChanger: 'Set locale',
            debugLogLimit: 'Set log limit',
            debugMagicBox: 'Toggle kul-magic-box',
            debugOff: 'Turn off debug',
            debugPrint: 'Print logs stored',
            debugThemeChanger: 'Set theme',
            densityDense: 'Dense',
            densityLabel: 'Row density',
            densityMedium: 'Medium',
            densityWide: 'Wide',
            fontsizeBig: 'Big',
            fontsizeLabel: 'Font size',
            fontsizeMedium: 'Medium',
            fontsizeSmall: 'Small',
            genericAbort: 'Cancel',
            genericAddNew: 'Add new',
            genericApply: 'Apply',
            genericBack: 'Back',
            genericCollapse: 'Collapse',
            genericConfirm: 'Confirm',
            genericConfirmDelete: 'Do you confirm the cancellation?',
            genericConfirmDeleteXRows: 'Delete ({0}) rows?',
            genericDay: 'Day',
            genericDragAndDrop: 'Drag and drop',
            genericDropYourData: 'Drop your data here',
            genericEditable: 'Editable',
            genericEditableField: 'This field can be edited',
            genericEmptyData: 'Empty data.',
            genericEmptyObject: 'Empty object',
            genericExpand: 'Expand',
            genericExperimentalFeat: 'Experimental feature',
            genericFilters: 'Filters',
            genericInfo: 'Info',
            genericInvalidColor: 'Invalid color',
            genericLayoutNotYetImplemented: 'Layout not yet implemented',
            genericList: 'List',
            genericLoadMoreData: 'Load more data',
            genericMenu: 'Menu',
            genericMerge: 'Merge',
            genericMonth: 'Month',
            genericMove: 'Move',
            genericNext: 'Next',
            genericNo: 'No',
            genericOpenInNewTab: 'Open in new tab',
            genericOpenInNewWindow: 'Open in new window',
            genericOpenNavigationMenu: 'Open navigation menu',
            genericOptions: 'Options',
            genericPrevious: 'Previous',
            genericRemoveFilters: 'Remove filters',
            genericSettings: 'Settings',
            genericShowRowOptions: 'Show row options',
            genericShowTooltipInfo: 'Show tooltip info',
            genericSortBy: 'Sort by',
            genericSwap: 'Swap',
            genericToday: 'Today',
            genericToggle: 'Toggle',
            genericTop: 'Top',
            genericTotalsTable: 'Totals table',
            genericTransposeData: 'Transpose data',
            genericViewAs: 'View as',
            genericWeek: 'Week',
            genericYes: 'Yes',
            gridColumn: 'Column',
            gridComplete: 'Complete',
            gridLabel: 'Grid type',
            gridNone: 'None',
            gridRow: 'Row',
            groupingDisable: 'Disable grouping',
            groupingEnable: 'Enable grouping',
            groupingGroups: 'Group',
            pagePage: 'Page',
            pageTotal: 'Total',
            rowDetail: 'Row detail',
            rowEditableKey: 'Editable record key',
            rowKey: 'Record key',
            rowNext: 'Next row',
            rowPrevious: 'Previous row',
            rowRendered: 'Rendered rows',
            rowRows: 'Rows',
            rowSelected: 'Selected rows',
            rowTotal: 'Total rows',
            searchFrom: 'From',
            searchSearch: 'Search',
            searchTo: 'To',
            totalsAverage: 'Average',
            totalsCalculate: 'Calculate',
            totalsCancel: 'Cancel',
            totalsCount: 'Count',
            totalsDifference: 'Difference',
            totalsDistinct: 'Distinct',
            totalsFormula: 'Formula',
            totalsMaximum: 'Maximum',
            totalsMinimum: 'Minimum',
            totalsProduct: 'Product',
            totalsSum: 'Sum',
        },
    },
    french: {
        keys: {
            checkboxAll: 'Tout',
            checkboxChecked: 'Vérifié',
            checkboxIndeterminate: 'Indéterminé',
            checkboxUnchecked: 'Non coché',
            columnAdd: 'Ajouter une colonne',
            columnAddDescription: 'Ajouter une colonne code / description',
            columnColumns: 'Colonnes',
            columnHide: 'Masquer la colonne',
            columnMerge: 'Fusionner des colonnes',
            columnNoFormula: 'Aucune formule disponible pour ces colonnes.',
            columnNonNumerical: 'Ces colonnes ne sont pas numériques.',
            columnNonNumericalInTable: "Aucune colonne numérique n'existe dans ce tableau.",
            columnSwap: 'Permuter les colonnes',
            dashboardDimension: 'Dimension',
            dashboardLoaded: 'Chargé',
            dashboardReset: 'Réinitialiser',
            dashboardSave: 'Enregistrer',
            dashboardVertical: 'Vertical',
            debugAutoprint: "Activer l'impression automatique",
            debugClear: 'Effacer le widget',
            debugDLAll: 'Tout',
            debugDLProps: 'Télécharger les accessoires des composants',
            debugDLPropsComp: 'Télécharger les accessoires des composants',
            debugDump: 'Vider les journaux stockés',
            debugLanguageChanger: 'Définir la langue',
            debugLocaleChanger: 'Définir les paramètres régionaux',
            debugLogLimit: 'Définir la limite du journal',
            debugMagicBox: 'Activer / désactiver kul-magic-box',
            debugOff: 'Désactiver le débogage',
            debugPrint: 'Imprimer les journaux stockés',
            debugThemeChanger: 'Définir le thème',
            densityDense: 'Dense',
            densityLabel: 'Densité des rangs',
            densityMedium: 'Moyen',
            densityWide: 'Large',
            fontsizeBig: 'Gros',
            fontsizeLabel: 'Taille de police',
            fontsizeMedium: 'Moyen',
            fontsizeSmall: 'Petit',
            genericAbort: 'Annuler',
            genericAddNew: 'Ajouter un nouveau',
            genericApply: 'Appliquer',
            genericBack: 'Arrière',
            genericCollapse: 'Effondrer',
            genericConfirm: 'Confirmer',
            genericConfirmDelete: "Confirmez-vous l'annulation?",
            genericConfirmDeleteXRows: 'Supprimer ({0}) lignes?',
            genericDay: 'Jour',
            genericDragAndDrop: 'Glisser-déposer',
            genericDropYourData: 'Déposez vos données ici',
            genericEditable: 'Modifiable',
            genericEditableField: 'Ce champ peut être édité',
            genericEmptyData: 'Données vides',
            genericEmptyObject: 'Objet vides',
            genericExpand: 'Étendre',
            genericExperimentalFeat: 'Fonctionnalité expérimentale',
            genericFilters: 'Filtres',
            genericInfo: 'Info',
            genericInvalidColor: 'Couleur invalide',
            genericLayoutNotYetImplemented: 'Mise en page pas encore implémentée',
            genericList: 'Lister',
            genericLoadMoreData: 'Charger plus de données',
            genericMenu: 'Menu',
            genericMerge: 'Fusionner',
            genericMonth: 'Mois',
            genericMove: 'Se déplacer',
            genericNext: 'Prochain',
            genericNo: 'Non',
            genericOpenInNewTab: 'Ouvrir dans un nouvel onglet',
            genericOpenInNewWindow: 'Ouvrir dans une nouvelle fenêtre',
            genericOpenNavigationMenu: 'Ouvrir le menu de navigation',
            genericOptions: 'Options',
            genericPrevious: 'Précédent',
            genericRemoveFilters: 'Supprimer les filtres',
            genericSettings: 'Paramètres',
            genericShowRowOptions: 'Afficher les options de ligne',
            genericShowTooltipInfo: "Afficher les informations de l'info-bulle",
            genericSortBy: 'Trier par',
            genericSwap: 'Échanger',
            genericToday: "Aujourd'hui",
            genericToggle: 'Basculer',
            genericTop: 'Haut',
            genericTotalsTable: 'Tableau des totaux',
            genericTransposeData: 'Transposer les données',
            genericViewAs: 'Voir comme',
            genericWeek: 'La semaine',
            genericYes: 'Oui',
            gridColumn: 'Colonne',
            gridComplete: 'Compléte',
            gridLabel: 'Type de grille',
            gridNone: 'Rien',
            gridRow: 'Ligne',
            groupingDisable: 'Désactiver le regroupement',
            groupingEnable: 'Activer le regroupement',
            groupingGroups: 'Groupe',
            pagePage: 'Page',
            pageTotal: 'Pages totales',
            rowDetail: 'Détail de la ligne',
            rowEditableKey: "Clé d'enregistrement modifiable",
            rowKey: "Clé d'enregistrement",
            rowNext: 'Ligne suivante',
            rowPrevious: 'Ligne précédente',
            rowRendered: 'Lignes rendues',
            rowRows: 'Lignes',
            rowSelected: 'Lignes sélectionnées',
            rowTotal: 'Total des lignes',
            searchFrom: 'De',
            searchSearch: 'Rechercher',
            searchTo: 'À',
            totalsAverage: 'Moyenne',
            totalsCalculate: 'Calculer',
            totalsCancel: 'Annuler',
            totalsCount: 'Compter',
            totalsDifference: 'Différence',
            totalsDistinct: 'Distinct',
            totalsFormula: 'Formule',
            totalsMaximum: 'Maximum',
            totalsMinimum: 'Minimum',
            totalsProduct: 'Produit',
            totalsSum: 'Somme',
        },
    },
    italian: {
        keys: {
            checkboxAll: 'Tutti',
            checkboxChecked: 'Selezionato',
            checkboxIndeterminate: 'Indeterminato',
            checkboxUnchecked: 'Non selezionato',
            columnAdd: 'Aggiungi colonna',
            columnAddDescription: 'Aggiungi colonna codice/descrizione',
            columnColumns: 'Colonne',
            columnHide: 'Nascondi colonna',
            columnMerge: 'Unisci le colonne',
            columnNoFormula: 'Non ci sono formule disponibili per queste colonne.',
            columnNonNumerical: 'Queste colonne non sono numeriche.',
            columnNonNumericalInTable: 'Non esistono colonne numeriche in questa tabella.',
            columnSwap: 'Scambia le colonne',
            dashboardDimension: 'Dimensione',
            dashboardLoaded: 'Caricata',
            dashboardReset: 'Ripristina',
            dashboardSave: 'Salva',
            dashboardVertical: 'Verticale',
            debugAutoprint: 'Attiva stampa automatica logs',
            debugClear: 'Pulisci widget',
            debugDLAll: 'Tutto',
            debugDLProps: 'Scarica props componenti',
            debugDLPropsComp: 'Scarica props del componente',
            debugDump: 'Svuota cache dei logs',
            debugLanguageChanger: 'Cambia lingua',
            debugLocaleChanger: 'Cambia localizzazione',
            debugLogLimit: 'Imposta limite log',
            debugMagicBox: 'Attiva kul-magic-box',
            debugOff: 'Disattiva debug',
            debugPrint: 'Stampa logs immagazzinati',
            debugThemeChanger: 'Cambia tema',
            densityDense: 'Densa',
            densityLabel: 'Densità righe',
            densityMedium: 'Media',
            densityWide: 'Ampia',
            fontsizeBig: 'Grande',
            fontsizeLabel: 'Dimensione caratteri',
            fontsizeMedium: 'Media',
            fontsizeSmall: 'Piccola',
            genericAbort: 'Annulla',
            genericAddNew: 'Aggiungi nuovo',
            genericApply: 'Applica',
            genericBack: 'Indietro',
            genericCollapse: 'Chiudi',
            genericConfirm: 'Conferma',
            genericConfirmDelete: 'Confermi la cancellazione?',
            genericConfirmDeleteXRows: 'Eliminare ({0}) righe?',
            genericDay: 'Giorno',
            genericDragAndDrop: 'Drag & drop',
            genericDropYourData: 'Trascina qui i tuoi dati',
            genericEditable: 'Editabile',
            genericEditableField: 'Questo campo è editabile',
            genericEmptyData: 'Nessun dato da visualizzare.',
            genericEmptyObject: 'Nessun oggetto',
            genericExpand: 'Espandi',
            genericExperimentalFeat: 'Funzionalità sperimentale',
            genericFilters: 'Filtri',
            genericInfo: 'Informazioni',
            genericInvalidColor: 'Colore invalido',
            genericLayoutNotYetImplemented: 'Layout non ancora implementato',
            genericList: 'Lista',
            genericLoadMoreData: 'Carica più dati',
            genericMenu: 'Menu',
            genericMerge: 'Unisci',
            genericMonth: 'Mese',
            genericMove: 'Sposta',
            genericNext: 'Avanti',
            genericNo: 'No',
            genericOpenInNewTab: 'Apri in nuovo tab',
            genericOpenInNewWindow: 'Apri in nuova finestra',
            genericOpenNavigationMenu: 'Apri menu di navigazione',
            genericOptions: 'Opzioni',
            genericPrevious: 'Indietro',
            genericRemoveFilters: 'Rimuovi filtri',
            genericSettings: 'Impostazioni',
            genericShowRowOptions: 'Mostra opzioni di riga',
            genericShowTooltipInfo: 'Mostra informazioni tooltip',
            genericSortBy: 'Ordina per',
            genericSwap: 'Scambia',
            genericToday: 'Oggi',
            genericToggle: 'Attiva',
            genericTop: 'Top',
            genericTotalsTable: 'Tabella dei totali',
            genericTransposeData: 'Trasposizione dati',
            genericViewAs: 'Vedi come',
            genericWeek: 'Settimana',
            genericYes: 'Sì',
            gridColumn: 'Colonna',
            gridComplete: 'Completa',
            gridLabel: 'Tipo di griglia',
            gridNone: 'Nessuna',
            gridRow: 'Riga',
            groupingDisable: 'Disabilita gruppo',
            groupingEnable: 'Abilita gruppo',
            groupingGroups: 'Gruppo',
            pagePage: 'Pagina',
            pageTotal: 'Totale',
            rowDetail: 'Dettaglio riga',
            rowEditableKey: 'Chiave record editabile',
            rowKey: 'Chiave record',
            rowNext: 'Riga successiva',
            rowPrevious: 'Riga precedente',
            rowRendered: 'Righe renderizzate',
            rowRows: 'Righe',
            rowSelected: 'Righe selezionate',
            rowTotal: 'Righe totali',
            searchFrom: 'Da...',
            searchSearch: 'Cerca...',
            searchTo: 'A...',
            totalsAverage: 'Media',
            totalsCalculate: 'Calcola',
            totalsCancel: 'Cancella',
            totalsCount: 'Conta',
            totalsDifference: 'Differenza',
            totalsDistinct: 'Distinct',
            totalsFormula: 'Formula',
            totalsMinimum: 'Minimo',
            totalsMaximum: 'Massimo',
            totalsProduct: 'Prodotto',
            totalsSum: 'Somma',
        },
        variants: {
            smeup: {
                keys: {
                    columnNonNumericalInTable: 'Non esistono colonne numeriche in questa matrice.',
                    genericEditableField: 'Questo OAV è editabile',
                    genericTotalsTable: 'Matrice dei totali',
                    groupingDisable: 'Disabilita raggruppamento',
                    groupingEnable: 'Abilita raggruppamento',
                    groupingGroups: 'Raggruppamento',
                    rowEditableKey: 'K01 (editabile)',
                    rowKey: 'K01',
                },
            },
        },
    },
    polish: {
        keys: {
            keys: '',
            checkboxAll: 'Wszystko',
            checkboxChecked: 'Sprawdzone',
            checkboxIndeterminate: 'Nieokreślony',
            checkboxUnchecked: 'Niepowstrzymany',
            columnAdd: 'Dodaj kolumnę',
            columnAddDescription: 'Dodaj kolumnę z kodem / opisem',
            columnColumns: 'Kolumny',
            columnHide: 'Ukryj kolumnę',
            columnMerge: 'Scal kolumny',
            columnNoFormula: 'Brak dostępnych formuł dla tych kolumn.',
            columnNonNumerical: 'Te kolumny nie są numeryczne.',
            columnNonNumericalInTable: 'W tej tabeli nie ma kolumn liczbowych.',
            columnSwap: 'Zamień kolumny',
            dashboardDimension: 'Wymiar',
            dashboardLoaded: 'Załadowany',
            dashboardReset: 'Resetowanie',
            dashboardSave: 'Ratować',
            dashboardVertical: 'Pionowy',
            debugAutoprint: 'Przełącz automatyczne drukowanie',
            debugClear: 'Wyczyść widżet',
            debugDLAll: 'Wszystko',
            debugDLProps: 'Pobierz właściwości komponentów',
            debugDLPropsComp: 'Pobierz rekwizyty komponentów',
            debugDump: 'Zrzuć zapisane dzienniki',
            debugLanguageChanger: 'Ustaw język',
            debugLocaleChanger: 'Ustaw język',
            debugLogLimit: 'Ustaw limit logów',
            debugMagicBox: 'Przełącz kul-magic-box',
            debugOff: 'Wyłącz debugowanie',
            debugPrint: 'Drukuj zapisane logi',
            debugThemeChanger: 'Ustaw motyw',
            densityDense: 'Gęsty',
            densityLabel: 'Gęstość rzędów',
            densityMedium: 'Średni',
            densityWide: 'Szeroki',
            fontsizeBig: 'Duży',
            fontsizeLabel: 'Rozmiar czcionki',
            fontsizeMedium: 'Średni',
            fontsizeSmall: 'Mały',
            genericAbort: 'Anulować',
            genericAddNew: 'Dodaj nowe',
            genericApply: 'Zastosować',
            genericBack: 'Plecy',
            genericCollapse: 'Zawalić się',
            genericConfirm: 'Potwierdzać',
            genericConfirmDelete: 'Potwierdzasz odwołanie?',
            genericConfirmDeleteXRows: 'Usunąć ({0}) wiersze?',
            genericDay: 'Dzień',
            genericDragAndDrop: 'Przeciągnij i upuść',
            genericDropYourData: 'Upuść swoje dane tutaj',
            genericEditable: 'Edytowalne',
            genericEditableField: 'To pole można edytować',
            genericEmptyData: 'Puste dane',
            genericEmptyObject: 'Puste obiekt',
            genericExpand: 'Rozszerzać',
            genericExperimentalFeat: 'Funkcja eksperymentalna',
            genericFilters: 'Filtry',
            genericInfo: 'Informacje',
            genericInvalidColor: 'Nieprawidłowy kolor',
            genericLayoutNotYetImplemented: 'Układ nie został jeszcze zaimplementowany',
            genericList: 'Lista',
            genericLoadMoreData: 'Załaduj więcej danych',
            genericMenu: 'Menu',
            genericMerge: 'Łączyć',
            genericMonth: 'Miesiąc',
            genericMove: 'Ruszaj się',
            genericNext: 'Następny',
            genericNo: 'Nie',
            genericOpenInNewTab: 'Otwórz w nowej karcie',
            genericOpenInNewWindow: 'Otworzyć w nowym oknie',
            genericOpenNavigationMenu: 'Otwórz menu nawigacyjne',
            genericOptions: 'Opcje',
            genericPrevious: 'Poprzedni',
            genericRemoveFilters: 'Usuń filtry',
            genericSettings: 'Ustawienia',
            genericShowRowOptions: 'Pokaż opcje wierszy',
            genericShowTooltipInfo: 'Pokaż informacje w podpowiedzi',
            genericSortBy: 'Sortuj według',
            genericSwap: 'Zamiana',
            genericToday: 'Dziś',
            genericToggle: 'Przełącznik',
            genericTop: 'Szczyt',
            genericTotalsTable: 'Tabela sum',
            genericTransposeData: 'Transpozycja danych',
            genericViewAs: 'Wyświetl jako',
            genericWeek: 'Tydzień',
            genericYes: 'TAk',
            gridColumn: 'Kolumna',
            gridComplete: 'Kompletny',
            gridLabel: 'Typ siatki',
            gridNone: 'Żaden',
            gridRow: 'Rząd',
            groupingDisable: 'Wyłącz grupowanie',
            groupingEnable: 'Włącz grupowanie',
            groupingGroups: 'Grupy',
            pagePage: 'Strona',
            pageTotal: 'Wszystkie strony',
            rowDetail: 'Szczegóły rzędu',
            rowEditableKey: 'Edytowalny klucz nagrywania',
            rowKey: 'Klucz nagrywania',
            rowNext: 'Następny rząd',
            rowPrevious: 'Poprzedni wiersz',
            rowRendered: 'Renderowane wiersze',
            rowRows: 'Wydziwianie',
            rowSelected: 'Wybrane wiersze',
            rowTotal: 'Łączna liczba wierszy',
            searchFrom: 'Z',
            searchSearch: 'Szukaj',
            searchTo: 'Do',
            totalsAverage: 'Średni',
            totalsCalculate: 'Oblicz',
            totalsCancel: 'Anuluj',
            totalsCount: 'Liczyć',
            totalsDifference: 'Różnica',
            totalsDistinct: 'Odrębny',
            totalsFormula: 'Formuła',
            totalsMinimum: 'Minimo',
            totalsMaximum: 'Maksymalny',
            totalsProduct: 'Iloczyn',
            totalsSum: 'Suma',
        },
    },
    russian: {
        keys: {
            checkboxAll: 'Все',
            checkboxChecked: 'Проверено',
            checkboxIndeterminate: 'Неопределенный',
            checkboxUnchecked: 'Не отмечено',
            columnAdd: 'Добавить столбец',
            columnAddDescription: 'Добавить столбец кода / описания',
            columnColumns: 'Столбцы',
            columnHide: 'Скрыть столбец',
            columnMerge: 'Объединить столбцы',
            columnNoFormula: 'Для этих столбцов нет доступных формул',
            columnNonNumerical: 'Эти столбцы не числовые',
            columnNonNumericalInTable: 'В этой таблице нет числовых столбцов',
            columnSwap: 'Поменять местами столбцы',
            dashboardDimension: 'Измерение',
            dashboardLoaded: 'Загружено',
            dashboardReset: 'Перезагрузить',
            dashboardSave: 'Сохранять',
            dashboardVertical: 'Вертикальный',
            debugAutoprint: 'Включить автоматическую печать',
            debugClear: 'Очистить виджет',
            debugDLAll: 'Все',
            debugDLProps: 'Загрузить свойства компонентов',
            debugDLPropsComp: 'Скачать реквизиты компонентов',
            debugDump: 'Дамп сохраненных журналов',
            debugLanguageChanger: 'Установить язык',
            debugLocaleChanger: 'Установить языковой стандарт',
            debugLogLimit: 'Установить ограничение журнала',
            debugMagicBox: 'Переключить волшебный ящик купа',
            debugOff: 'Отключить отладку',
            debugPrint: 'Печать сохраненных журналов',
            debugThemeChanger: 'Установить тему',
            densityDense: 'Плотный',
            densityLabel: 'Плотность строк',
            densityMedium: 'Середина',
            densityWide: 'Широкий',
            fontsizeBig: 'Большой',
            fontsizeLabel: 'Размер шрифта',
            fontsizeMedium: 'Середина',
            fontsizeSmall: 'Небольшой',
            genericAbort: 'Отмена',
            genericAddNew: 'Добавить новое',
            genericApply: 'Применять',
            genericBack: 'назад',
            genericCollapse: 'Kpax',
            genericConfirm: 'Подтверждать',
            genericConfirmDelete: 'вы подтверждаете отмену?',
            genericConfirmDeleteXRows: 'Удалить ({0}) строки?',
            genericDay: 'День',
            genericDragAndDrop: 'Перетащить и отпустить',
            genericDropYourData: 'Перетащите сюда свои данные',
            genericEditable: 'Редактируемый',
            genericEditableField: 'Это поле можно редактировать',
            genericEmptyData: 'Пустые данные',
            genericEmptyObject: 'Пустые объект',
            genericExpand: 'Расширять',
            genericExperimentalFeat: 'Экспериментальная особенность',
            genericFilters: 'Фильтры',
            genericInfo: 'Информация',
            genericInvalidColor: 'Неверный цвет',
            genericLayoutNotYetImplemented: 'Макет еще не реализован',
            genericList: 'Список',
            genericLoadMoreData: 'Загрузить больше данных',
            genericMenu: 'Меню',
            genericMerge: 'Объединить',
            genericMonth: 'Месяц',
            genericMove: 'Переехать',
            genericNext: 'Следующий',
            genericNo: 'Нет',
            genericOpenInNewTab: 'Открыть в новой вкладке',
            genericOpenInNewWindow: 'Открыть в новом окне',
            genericOpenNavigationMenu: 'Открыть меню навигации',
            genericOptions: 'Параметры',
            genericPrevious: 'Предыдущий',
            genericRemoveFilters: 'Удалить фильтры',
            genericSettings: 'Настройки',
            genericShowRowOptions: 'Показать параметры строки',
            genericShowTooltipInfo: 'Показать информацию во всплывающей подсказке',
            genericSortBy: 'Сортировать по',
            genericSwap: 'Менять',
            genericToday: 'Сегодня',
            genericToggle: 'Переключать',
            genericTop: 'Вершина',
            genericTotalsTable: 'Итоговая таблица',
            genericTransposeData: 'Транспонировать данные',
            genericViewAs: 'Просмотреть как',
            genericWeek: 'Неделя',
            genericYes: 'Да',
            gridColumn: 'Столбец',
            gridComplete: 'Полный',
            gridLabel: 'Тип сетки',
            gridNone: 'Никто',
            gridRow: 'Строка',
            groupingDisable: 'Отключить группировку',
            groupingEnable: 'Включить группировку',
            groupingGroups: 'Группы',
            pagePage: 'Страница',
            pageTotal: 'Всего страниц',
            rowDetail: 'Детали строки',
            rowEditableKey: 'Редактируемый ключ записи',
            rowKey: 'Ключ записи',
            rowNext: 'Следующая строка',
            rowPrevious: 'Предыдущая строка',
            rowRendered: 'Отрисованные строки',
            rowRows: 'Рядов',
            rowSelected: 'Выбранные строки',
            rowTotal: 'Всего строк',
            searchFrom: 'Из',
            searchSearch: 'Поиск',
            searchTo: 'К',
            totalsAverage: 'В среднем',
            totalsCalculate: 'Рассчитать',
            totalsCancel: 'Отмена',
            totalsCount: 'Считать',
            totalsDifference: 'Разница',
            totalsDistinct: 'Отчетливый',
            totalsFormula: 'Формула',
            totalsMinimum: 'Минимум',
            totalsMaximum: 'Максимум',
            totalsProduct: 'Продукт',
            totalsSum: 'Сумма',
        },
    },
    spanish: {
        keys: {
            checkboxAll: 'Todas',
            checkboxChecked: 'Marcado',
            checkboxIndeterminate: 'Indeterminado',
            checkboxUnchecked: 'Sin marcar',
            columnAdd: 'Añadir columna',
            columnAddDescription: 'Agregar columna de código / descripción',
            columnColumns: 'Columnas',
            columnHide: 'Ocultar columna',
            columnMerge: 'Fusionar columnas',
            columnNoFormula: 'No hay fórmulas disponibles para estas columnas.',
            columnNonNumerical: 'Estas columnas no son numéricas.',
            columnNonNumericalInTable: 'No existen columnas numéricas en esta tabla.',
            columnSwap: 'Intercambiar columnas',
            dashboardDimension: 'Dimensión',
            dashboardLoaded: 'Cargado',
            dashboardReset: 'Reiniciar',
            dashboardSave: 'Ahorrar',
            dashboardVertical: 'Vertical',
            debugAutoprint: 'Alternar impresión automática',
            debugClear: 'Borrar widget',
            debugDLAll: 'Todas',
            debugDLProps: 'Descargar accesorios de componentes',
            debugDLPropsComp: 'Descargar accesorios de componentes',
            debugDump: 'Volcar registros almacenados',
            debugLanguageChanger: 'Establecer idioma',
            debugLocaleChanger: 'Establecer configuración regional',
            debugLogLimit: 'Establecer límite de registro',
            debugMagicBox: 'Alternar kul-magic-box',
            debugOff: 'Desactivar depuración',
            debugPrint: 'Imprimir registros almacenados',
            debugThemeChanger: 'Establecer tema',
            densityDense: 'Densa',
            densityLabel: 'Densidad de hileras',
            densityMedium: 'Medio',
            densityWide: 'Amplia',
            fontsizeBig: 'Grande',
            fontsizeLabel: 'Tamaño de fuente',
            fontsizeMedium: 'Medio',
            fontsizeSmall: 'Pequeño',
            genericAbort: 'Cancelar',
            genericAddNew: 'Añadir nuevo',
            genericApply: 'Solicitar',
            genericBack: 'Espalda',
            genericCollapse: 'Colapso',
            genericConfirm: 'Confirmar',
            genericConfirmDelete: '¿Confirmas la cancelación?',
            genericConfirmDeleteXRows: '¿Eliminar ({0}) filas?',
            genericDay: 'Día',
            genericDragAndDrop: 'Arrastrar y soltar',
            genericDropYourData: 'Deja tus datos aquí',
            genericEditable: 'Editable',
            genericEditableField: 'Este campo se puede editar',
            genericEmptyData: 'Datos vacíos',
            genericEmptyObject: 'Objeto vacíos',
            genericExpand: 'Expandir',
            genericExperimentalFeat: 'Característica experimental',
            genericFilters: 'Filtros',
            genericInfo: 'Información',
            genericInvalidColor: 'Color inválido',
            genericLayoutNotYetImplemented: 'Diseño aún no implementado',
            genericList: 'Lista',
            genericLoadMoreData: 'Cargar más datos',
            genericMenu: 'Menú',
            genericMerge: 'Unir',
            genericMonth: 'Mes',
            genericMove: 'Mover',
            genericNext: 'Próximo',
            genericNo: 'No',
            genericOpenInNewTab: 'Abrir en una pestaña nueva',
            genericOpenInNewWindow: 'Abrir en Nueva ventana',
            genericOpenNavigationMenu: 'Abrir menú de navegación',
            genericOptions: 'Opciones',
            genericPrevious: 'Previo',
            genericRemoveFilters: 'Quitar filtros',
            genericSettings: 'Ajustes',
            genericShowRowOptions: 'Mostrar opciones de fila',
            genericShowTooltipInfo: 'Mostrar información de información sobre herramientas',
            genericSortBy: 'Ordenar por',
            genericSwap: 'Intercambio',
            genericToday: 'Hoy dia',
            genericToggle: 'Palanca',
            genericTop: 'Cima',
            genericTotalsTable: 'Tabla de totales',
            genericTransposeData: 'Transponer datos',
            genericViewAs: 'Visto como',
            genericWeek: 'Semana',
            genericYes: 'Sí',
            gridColumn: 'Columna',
            gridComplete: 'Completa',
            gridLabel: 'Tipo de cuadrícula',
            gridNone: 'Ninguna',
            gridRow: 'Fila',
            groupingDisable: 'Desactivar agrupación',
            groupingEnable: 'Habilitar agrupación',
            groupingGroups: 'Grupo',
            pagePage: 'Página',
            pageTotal: 'Paginas totales',
            rowDetail: 'Detalle de fila',
            rowEditableKey: 'Clave de registro editable',
            rowKey: 'Grabar clave',
            rowNext: 'Siguiente fila',
            rowPrevious: 'Fila anterior',
            rowRendered: 'Filas renderizadas',
            rowRows: 'Filas',
            rowSelected: 'Filas seleccionadas',
            rowTotal: 'Filas totales',
            searchFrom: 'De',
            searchSearch: 'Buscar',
            searchTo: 'A',
            totalsAverage: 'Promedio',
            totalsCalculate: 'Calcular',
            totalsCancel: 'Cancelar',
            totalsCount: 'Contar',
            totalsDifference: 'Diferencia',
            totalsDistinct: 'Distinct',
            totalsFormula: 'Fórmula',
            totalsMaximum: 'Máximo',
            totalsMinimum: 'Mínimo',
            totalsProduct: 'Producto',
            totalsSum: 'Suma',
        },
    },
};

const dom$5 = document.documentElement;
/**
 * Handles the translation to different languages.
 * @module KulLanguage
 */
class KulLanguage {
    list;
    managedComponents;
    name;
    /**
     * Initializes KulLanguage.
     * @param {KulLanguageJSON} list - Overrides the default languages.json.
     * @param {string} name - Starting language. Can be a combination of language and variant (separated by "_").
     */
    constructor(list, name) {
        this.list = list ? list : languagesJson;
        this.managedComponents = new Set();
        this.name = name ? name : KulLanguageDefaults.en;
    }
    /**
     * Translates the string to the given language.
     * When translation fails, the key will be displayed in place of the string - this way it will be easier to correct missing string <-> key bounds.
     * @param {KulLanguageKey} key - Key of a string to be translated.
     * @param {string} language - Language to translate the string to. When not provided, KulLanguage current language will be used.
     * @returns {string} Translated string or initial string (when translation failed).
     */
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
            dom$5.ketchupLite.debug.logMessage('kul-language', 'Invalid translation for key (' + key + ')!', 'warning');
            return key;
        }
    }
    /**
     * Changes the current Ketchup language to the one provided. If the language argument contains a "_", a combo of language and variant will be assumed.
     * @param {string} language - The new language. If not present in this.list, this function will keep the previous language.
     */
    set(language) {
        if (language && typeof language === 'string') {
            language = language.toLowerCase();
        }
        else {
            dom$5.ketchupLite.debug.logMessage('kul-language', "Couldn't set language, invalid string received (" +
                language +
                ')!', 'warning');
            return;
        }
        const decodedLanguage = this.decodeLanguage(language);
        const dLanguage = decodedLanguage.language;
        const dVariant = decodedLanguage.variant;
        if (this.list[dLanguage]) {
            if (dVariant && !this.list[dLanguage].variants[dVariant]) {
                dom$5.ketchupLite.debug.logMessage('kul-language', 'Variant not found (' + dVariant + ')!', 'warning');
                return;
            }
        }
        else {
            dom$5.ketchupLite.debug.logMessage('kul-language', 'Language not found (' + dLanguage + ')!', 'warning');
            return;
        }
        this.name = language;
        this.managedComponents.forEach(function (comp) {
            if (comp.isConnected) {
                comp.refresh();
            }
        });
        document.dispatchEvent(new CustomEvent('kul-language-change'));
    }
    /**
     * Checks whether the language is a combination of main language and variant (separated by "_"), returning them splitted in an object.
     * @param {string} language - Language to check.
     * @returns {KulLanguageDecode} Object containing language and variant.
     */
    decodeLanguage(language) {
        const result = {
            language: null,
            variant: null,
        };
        const separator = language.indexOf('_');
        if (separator > -1) {
            result.variant = language.substring(separator + 1);
            result.language = language.substring(0, separator);
        }
        else {
            result.language = language;
        }
        return result;
    }
    /**
     * Gets the BCP47 language code of the specified language.
     * @param {string} language - Language to check.
     * @returns {string} BCP47 code
     */
    getBCP47(language = this.name?.split('_')[0]) {
        const bcp47Map = {
            chinese: 'zh-CN',
            english: 'en-US',
            spanish: 'es-ES',
            italian: 'it-IT',
            french: 'fr-FR',
            polish: 'pl-PL',
            russian: 'ru-RU',
        };
        return bcp47Map[language];
    }
    /**
     * Gets the name of available languages and variants.
     * @returns {Array<string>} Array of languages' names.
     */
    getLanguages() {
        const languages = [];
        for (var key in this.list) {
            if (this.list.hasOwnProperty(key)) {
                const language = this.list[key];
                languages.push(key);
                for (const variantKey in language.variants) {
                    languages.push(key + '_' + variantKey);
                }
            }
        }
        return languages;
    }
    /**
     * Registers a KulComponent in KulLanguage, in order to be automatically refreshed whenever the language changes.
     * @param {any} component - The component calling this function.
     */
    register(component) {
        this.managedComponents.add(component.rootElement ? component.rootElement : component);
    }
    /**
     * Unregisters a KulComponent, so it won't be refreshed when the language changes.
     *
     * @param {any} component - The component calling this function.
     */
    unregister(component) {
        if (this.managedComponents) {
            this.managedComponents.delete(component.rootElement ? component.rootElement : component);
        }
    }
}

var numeral$1 = {exports: {}};

/*! @preserve
 * numeral.js
 * version : 2.0.6
 * author : Adam Draper
 * license : MIT
 * http://adamwdraper.github.com/Numeral-js/
 */

(function (module) {
(function (global, factory) {
    if (module.exports) {
        module.exports = factory();
    } else {
        global.numeral = factory();
    }
}(commonjsGlobal, function () {
    /************************************
        Variables
    ************************************/

    var numeral,
        _,
        VERSION = '2.0.6',
        formats = {},
        locales = {},
        defaults = {
            currentLocale: 'en',
            zeroFormat: null,
            nullFormat: null,
            defaultFormat: '0,0',
            scalePercentBy100: true
        },
        options = {
            currentLocale: defaults.currentLocale,
            zeroFormat: defaults.zeroFormat,
            nullFormat: defaults.nullFormat,
            defaultFormat: defaults.defaultFormat,
            scalePercentBy100: defaults.scalePercentBy100
        };


    /************************************
        Constructors
    ************************************/

    // Numeral prototype object
    function Numeral(input, number) {
        this._input = input;

        this._value = number;
    }

    numeral = function(input) {
        var value,
            kind,
            unformatFunction,
            regexp;

        if (numeral.isNumeral(input)) {
            value = input.value();
        } else if (input === 0 || typeof input === 'undefined') {
            value = 0;
        } else if (input === null || _.isNaN(input)) {
            value = null;
        } else if (typeof input === 'string') {
            if (options.zeroFormat && input === options.zeroFormat) {
                value = 0;
            } else if (options.nullFormat && input === options.nullFormat || !input.replace(/[^0-9]+/g, '').length) {
                value = null;
            } else {
                for (kind in formats) {
                    regexp = typeof formats[kind].regexps.unformat === 'function' ? formats[kind].regexps.unformat() : formats[kind].regexps.unformat;

                    if (regexp && input.match(regexp)) {
                        unformatFunction = formats[kind].unformat;

                        break;
                    }
                }

                unformatFunction = unformatFunction || numeral._.stringToNumber;

                value = unformatFunction(input);
            }
        } else {
            value = Number(input)|| null;
        }

        return new Numeral(input, value);
    };

    // version number
    numeral.version = VERSION;

    // compare numeral object
    numeral.isNumeral = function(obj) {
        return obj instanceof Numeral;
    };

    // helper functions
    numeral._ = _ = {
        // formats numbers separators, decimals places, signs, abbreviations
        numberToFormat: function(value, format, roundingFunction) {
            var locale = locales[numeral.options.currentLocale],
                negP = false,
                optDec = false,
                leadingCount = 0,
                abbr = '',
                trillion = 1000000000000,
                billion = 1000000000,
                million = 1000000,
                thousand = 1000,
                decimal = '',
                neg = false,
                abbrForce, // force abbreviation
                abs,
                int,
                precision,
                signed,
                thousands,
                output;

            // make sure we never format a null value
            value = value || 0;

            abs = Math.abs(value);

            // see if we should use parentheses for negative number or if we should prefix with a sign
            // if both are present we default to parentheses
            if (numeral._.includes(format, '(')) {
                negP = true;
                format = format.replace(/[\(|\)]/g, '');
            } else if (numeral._.includes(format, '+') || numeral._.includes(format, '-')) {
                signed = numeral._.includes(format, '+') ? format.indexOf('+') : value < 0 ? format.indexOf('-') : -1;
                format = format.replace(/[\+|\-]/g, '');
            }

            // see if abbreviation is wanted
            if (numeral._.includes(format, 'a')) {
                abbrForce = format.match(/a(k|m|b|t)?/);

                abbrForce = abbrForce ? abbrForce[1] : false;

                // check for space before abbreviation
                if (numeral._.includes(format, ' a')) {
                    abbr = ' ';
                }

                format = format.replace(new RegExp(abbr + 'a[kmbt]?'), '');

                if (abs >= trillion && !abbrForce || abbrForce === 't') {
                    // trillion
                    abbr += locale.abbreviations.trillion;
                    value = value / trillion;
                } else if (abs < trillion && abs >= billion && !abbrForce || abbrForce === 'b') {
                    // billion
                    abbr += locale.abbreviations.billion;
                    value = value / billion;
                } else if (abs < billion && abs >= million && !abbrForce || abbrForce === 'm') {
                    // million
                    abbr += locale.abbreviations.million;
                    value = value / million;
                } else if (abs < million && abs >= thousand && !abbrForce || abbrForce === 'k') {
                    // thousand
                    abbr += locale.abbreviations.thousand;
                    value = value / thousand;
                }
            }

            // check for optional decimals
            if (numeral._.includes(format, '[.]')) {
                optDec = true;
                format = format.replace('[.]', '.');
            }

            // break number and format
            int = value.toString().split('.')[0];
            precision = format.split('.')[1];
            thousands = format.indexOf(',');
            leadingCount = (format.split('.')[0].split(',')[0].match(/0/g) || []).length;

            if (precision) {
                if (numeral._.includes(precision, '[')) {
                    precision = precision.replace(']', '');
                    precision = precision.split('[');
                    decimal = numeral._.toFixed(value, (precision[0].length + precision[1].length), roundingFunction, precision[1].length);
                } else {
                    decimal = numeral._.toFixed(value, precision.length, roundingFunction);
                }

                int = decimal.split('.')[0];

                if (numeral._.includes(decimal, '.')) {
                    decimal = locale.delimiters.decimal + decimal.split('.')[1];
                } else {
                    decimal = '';
                }

                if (optDec && Number(decimal.slice(1)) === 0) {
                    decimal = '';
                }
            } else {
                int = numeral._.toFixed(value, 0, roundingFunction);
            }

            // check abbreviation again after rounding
            if (abbr && !abbrForce && Number(int) >= 1000 && abbr !== locale.abbreviations.trillion) {
                int = String(Number(int) / 1000);

                switch (abbr) {
                    case locale.abbreviations.thousand:
                        abbr = locale.abbreviations.million;
                        break;
                    case locale.abbreviations.million:
                        abbr = locale.abbreviations.billion;
                        break;
                    case locale.abbreviations.billion:
                        abbr = locale.abbreviations.trillion;
                        break;
                }
            }


            // format number
            if (numeral._.includes(int, '-')) {
                int = int.slice(1);
                neg = true;
            }

            if (int.length < leadingCount) {
                for (var i = leadingCount - int.length; i > 0; i--) {
                    int = '0' + int;
                }
            }

            if (thousands > -1) {
                int = int.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + locale.delimiters.thousands);
            }

            if (format.indexOf('.') === 0) {
                int = '';
            }

            output = int + decimal + (abbr ? abbr : '');

            if (negP) {
                output = (negP && neg ? '(' : '') + output + (negP && neg ? ')' : '');
            } else {
                if (signed >= 0) {
                    output = signed === 0 ? (neg ? '-' : '+') + output : output + (neg ? '-' : '+');
                } else if (neg) {
                    output = '-' + output;
                }
            }

            return output;
        },
        // unformats numbers separators, decimals places, signs, abbreviations
        stringToNumber: function(string) {
            var locale = locales[options.currentLocale],
                stringOriginal = string,
                abbreviations = {
                    thousand: 3,
                    million: 6,
                    billion: 9,
                    trillion: 12
                },
                abbreviation,
                value,
                regexp;

            if (options.zeroFormat && string === options.zeroFormat) {
                value = 0;
            } else if (options.nullFormat && string === options.nullFormat || !string.replace(/[^0-9]+/g, '').length) {
                value = null;
            } else {
                value = 1;

                if (locale.delimiters.decimal !== '.') {
                    string = string.replace(/\./g, '').replace(locale.delimiters.decimal, '.');
                }

                for (abbreviation in abbreviations) {
                    regexp = new RegExp('[^a-zA-Z]' + locale.abbreviations[abbreviation] + '(?:\\)|(\\' + locale.currency.symbol + ')?(?:\\))?)?$');

                    if (stringOriginal.match(regexp)) {
                        value *= Math.pow(10, abbreviations[abbreviation]);
                        break;
                    }
                }

                // check for negative number
                value *= (string.split('-').length + Math.min(string.split('(').length - 1, string.split(')').length - 1)) % 2 ? 1 : -1;

                // remove non numbers
                string = string.replace(/[^0-9\.]+/g, '');

                value *= Number(string);
            }

            return value;
        },
        isNaN: function(value) {
            return typeof value === 'number' && isNaN(value);
        },
        includes: function(string, search) {
            return string.indexOf(search) !== -1;
        },
        insert: function(string, subString, start) {
            return string.slice(0, start) + subString + string.slice(start);
        },
        reduce: function(array, callback /*, initialValue*/) {
            if (this === null) {
                throw new TypeError('Array.prototype.reduce called on null or undefined');
            }

            if (typeof callback !== 'function') {
                throw new TypeError(callback + ' is not a function');
            }

            var t = Object(array),
                len = t.length >>> 0,
                k = 0,
                value;

            if (arguments.length === 3) {
                value = arguments[2];
            } else {
                while (k < len && !(k in t)) {
                    k++;
                }

                if (k >= len) {
                    throw new TypeError('Reduce of empty array with no initial value');
                }

                value = t[k++];
            }
            for (; k < len; k++) {
                if (k in t) {
                    value = callback(value, t[k], k, t);
                }
            }
            return value;
        },
        /**
         * Computes the multiplier necessary to make x >= 1,
         * effectively eliminating miscalculations caused by
         * finite precision.
         */
        multiplier: function (x) {
            var parts = x.toString().split('.');

            return parts.length < 2 ? 1 : Math.pow(10, parts[1].length);
        },
        /**
         * Given a variable number of arguments, returns the maximum
         * multiplier that must be used to normalize an operation involving
         * all of them.
         */
        correctionFactor: function () {
            var args = Array.prototype.slice.call(arguments);

            return args.reduce(function(accum, next) {
                var mn = _.multiplier(next);
                return accum > mn ? accum : mn;
            }, 1);
        },
        /**
         * Implementation of toFixed() that treats floats more like decimals
         *
         * Fixes binary rounding issues (eg. (0.615).toFixed(2) === '0.61') that present
         * problems for accounting- and finance-related software.
         */
        toFixed: function(value, maxDecimals, roundingFunction, optionals) {
            var splitValue = value.toString().split('.'),
                minDecimals = maxDecimals - (optionals || 0),
                boundedPrecision,
                optionalsRegExp,
                power,
                output;

            // Use the smallest precision value possible to avoid errors from floating point representation
            if (splitValue.length === 2) {
              boundedPrecision = Math.min(Math.max(splitValue[1].length, minDecimals), maxDecimals);
            } else {
              boundedPrecision = minDecimals;
            }

            power = Math.pow(10, boundedPrecision);

            // Multiply up by precision, round accurately, then divide and use native toFixed():
            output = (roundingFunction(value + 'e+' + boundedPrecision) / power).toFixed(boundedPrecision);

            if (optionals > maxDecimals - boundedPrecision) {
                optionalsRegExp = new RegExp('\\.?0{1,' + (optionals - (maxDecimals - boundedPrecision)) + '}$');
                output = output.replace(optionalsRegExp, '');
            }

            return output;
        }
    };

    // avaliable options
    numeral.options = options;

    // avaliable formats
    numeral.formats = formats;

    // avaliable formats
    numeral.locales = locales;

    // This function sets the current locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    numeral.locale = function(key) {
        if (key) {
            options.currentLocale = key.toLowerCase();
        }

        return options.currentLocale;
    };

    // This function provides access to the loaded locale data.  If
    // no arguments are passed in, it will simply return the current
    // global locale object.
    numeral.localeData = function(key) {
        if (!key) {
            return locales[options.currentLocale];
        }

        key = key.toLowerCase();

        if (!locales[key]) {
            throw new Error('Unknown locale : ' + key);
        }

        return locales[key];
    };

    numeral.reset = function() {
        for (var property in defaults) {
            options[property] = defaults[property];
        }
    };

    numeral.zeroFormat = function(format) {
        options.zeroFormat = typeof(format) === 'string' ? format : null;
    };

    numeral.nullFormat = function (format) {
        options.nullFormat = typeof(format) === 'string' ? format : null;
    };

    numeral.defaultFormat = function(format) {
        options.defaultFormat = typeof(format) === 'string' ? format : '0.0';
    };

    numeral.register = function(type, name, format) {
        name = name.toLowerCase();

        if (this[type + 's'][name]) {
            throw new TypeError(name + ' ' + type + ' already registered.');
        }

        this[type + 's'][name] = format;

        return format;
    };


    numeral.validate = function(val, culture) {
        var _decimalSep,
            _thousandSep,
            _currSymbol,
            _valArray,
            _abbrObj,
            _thousandRegEx,
            localeData,
            temp;

        //coerce val to string
        if (typeof val !== 'string') {
            val += '';

            if (console.warn) {
                console.warn('Numeral.js: Value is not string. It has been co-erced to: ', val);
            }
        }

        //trim whitespaces from either sides
        val = val.trim();

        //if val is just digits return true
        if (!!val.match(/^\d+$/)) {
            return true;
        }

        //if val is empty return false
        if (val === '') {
            return false;
        }

        //get the decimal and thousands separator from numeral.localeData
        try {
            //check if the culture is understood by numeral. if not, default it to current locale
            localeData = numeral.localeData(culture);
        } catch (e) {
            localeData = numeral.localeData(numeral.locale());
        }

        //setup the delimiters and currency symbol based on culture/locale
        _currSymbol = localeData.currency.symbol;
        _abbrObj = localeData.abbreviations;
        _decimalSep = localeData.delimiters.decimal;
        if (localeData.delimiters.thousands === '.') {
            _thousandSep = '\\.';
        } else {
            _thousandSep = localeData.delimiters.thousands;
        }

        // validating currency symbol
        temp = val.match(/^[^\d]+/);
        if (temp !== null) {
            val = val.substr(1);
            if (temp[0] !== _currSymbol) {
                return false;
            }
        }

        //validating abbreviation symbol
        temp = val.match(/[^\d]+$/);
        if (temp !== null) {
            val = val.slice(0, -1);
            if (temp[0] !== _abbrObj.thousand && temp[0] !== _abbrObj.million && temp[0] !== _abbrObj.billion && temp[0] !== _abbrObj.trillion) {
                return false;
            }
        }

        _thousandRegEx = new RegExp(_thousandSep + '{2}');

        if (!val.match(/[^\d.,]/g)) {
            _valArray = val.split(_decimalSep);
            if (_valArray.length > 2) {
                return false;
            } else {
                if (_valArray.length < 2) {
                    return ( !! _valArray[0].match(/^\d+.*\d$/) && !_valArray[0].match(_thousandRegEx));
                } else {
                    if (_valArray[0].length === 1) {
                        return ( !! _valArray[0].match(/^\d+$/) && !_valArray[0].match(_thousandRegEx) && !! _valArray[1].match(/^\d+$/));
                    } else {
                        return ( !! _valArray[0].match(/^\d+.*\d$/) && !_valArray[0].match(_thousandRegEx) && !! _valArray[1].match(/^\d+$/));
                    }
                }
            }
        }

        return false;
    };


    /************************************
        Numeral Prototype
    ************************************/

    numeral.fn = Numeral.prototype = {
        clone: function() {
            return numeral(this);
        },
        format: function(inputString, roundingFunction) {
            var value = this._value,
                format = inputString || options.defaultFormat,
                kind,
                output,
                formatFunction;

            // make sure we have a roundingFunction
            roundingFunction = roundingFunction || Math.round;

            // format based on value
            if (value === 0 && options.zeroFormat !== null) {
                output = options.zeroFormat;
            } else if (value === null && options.nullFormat !== null) {
                output = options.nullFormat;
            } else {
                for (kind in formats) {
                    if (format.match(formats[kind].regexps.format)) {
                        formatFunction = formats[kind].format;

                        break;
                    }
                }

                formatFunction = formatFunction || numeral._.numberToFormat;

                output = formatFunction(value, format, roundingFunction);
            }

            return output;
        },
        value: function() {
            return this._value;
        },
        input: function() {
            return this._input;
        },
        set: function(value) {
            this._value = Number(value);

            return this;
        },
        add: function(value) {
            var corrFactor = _.correctionFactor.call(null, this._value, value);

            function cback(accum, curr, currI, O) {
                return accum + Math.round(corrFactor * curr);
            }

            this._value = _.reduce([this._value, value], cback, 0) / corrFactor;

            return this;
        },
        subtract: function(value) {
            var corrFactor = _.correctionFactor.call(null, this._value, value);

            function cback(accum, curr, currI, O) {
                return accum - Math.round(corrFactor * curr);
            }

            this._value = _.reduce([value], cback, Math.round(this._value * corrFactor)) / corrFactor;

            return this;
        },
        multiply: function(value) {
            function cback(accum, curr, currI, O) {
                var corrFactor = _.correctionFactor(accum, curr);
                return Math.round(accum * corrFactor) * Math.round(curr * corrFactor) / Math.round(corrFactor * corrFactor);
            }

            this._value = _.reduce([this._value, value], cback, 1);

            return this;
        },
        divide: function(value) {
            function cback(accum, curr, currI, O) {
                var corrFactor = _.correctionFactor(accum, curr);
                return Math.round(accum * corrFactor) / Math.round(curr * corrFactor);
            }

            this._value = _.reduce([this._value, value], cback);

            return this;
        },
        difference: function(value) {
            return Math.abs(numeral(this._value).subtract(value).value());
        }
    };

    /************************************
        Default Locale && Format
    ************************************/

    numeral.register('locale', 'en', {
        delimiters: {
            thousands: ',',
            decimal: '.'
        },
        abbreviations: {
            thousand: 'k',
            million: 'm',
            billion: 'b',
            trillion: 't'
        },
        ordinal: function(number) {
            var b = number % 10;
            return (~~(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
        },
        currency: {
            symbol: '$'
        }
    });

    

(function() {
        numeral.register('format', 'bps', {
            regexps: {
                format: /(BPS)/,
                unformat: /(BPS)/
            },
            format: function(value, format, roundingFunction) {
                var space = numeral._.includes(format, ' BPS') ? ' ' : '',
                    output;

                value = value * 10000;

                // check for space before BPS
                format = format.replace(/\s?BPS/, '');

                output = numeral._.numberToFormat(value, format, roundingFunction);

                if (numeral._.includes(output, ')')) {
                    output = output.split('');

                    output.splice(-1, 0, space + 'BPS');

                    output = output.join('');
                } else {
                    output = output + space + 'BPS';
                }

                return output;
            },
            unformat: function(string) {
                return +(numeral._.stringToNumber(string) * 0.0001).toFixed(15);
            }
        });
})();


(function() {
        var decimal = {
            base: 1000,
            suffixes: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        },
        binary = {
            base: 1024,
            suffixes: ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
        };

    var allSuffixes =  decimal.suffixes.concat(binary.suffixes.filter(function (item) {
            return decimal.suffixes.indexOf(item) < 0;
        }));
        var unformatRegex = allSuffixes.join('|');
        // Allow support for BPS (http://www.investopedia.com/terms/b/basispoint.asp)
        unformatRegex = '(' + unformatRegex.replace('B', 'B(?!PS)') + ')';

    numeral.register('format', 'bytes', {
        regexps: {
            format: /([0\s]i?b)/,
            unformat: new RegExp(unformatRegex)
        },
        format: function(value, format, roundingFunction) {
            var output,
                bytes = numeral._.includes(format, 'ib') ? binary : decimal,
                suffix = numeral._.includes(format, ' b') || numeral._.includes(format, ' ib') ? ' ' : '',
                power,
                min,
                max;

            // check for space before
            format = format.replace(/\s?i?b/, '');

            for (power = 0; power <= bytes.suffixes.length; power++) {
                min = Math.pow(bytes.base, power);
                max = Math.pow(bytes.base, power + 1);

                if (value === null || value === 0 || value >= min && value < max) {
                    suffix += bytes.suffixes[power];

                    if (min > 0) {
                        value = value / min;
                    }

                    break;
                }
            }

            output = numeral._.numberToFormat(value, format, roundingFunction);

            return output + suffix;
        },
        unformat: function(string) {
            var value = numeral._.stringToNumber(string),
                power,
                bytesMultiplier;

            if (value) {
                for (power = decimal.suffixes.length - 1; power >= 0; power--) {
                    if (numeral._.includes(string, decimal.suffixes[power])) {
                        bytesMultiplier = Math.pow(decimal.base, power);

                        break;
                    }

                    if (numeral._.includes(string, binary.suffixes[power])) {
                        bytesMultiplier = Math.pow(binary.base, power);

                        break;
                    }
                }

                value *= (bytesMultiplier || 1);
            }

            return value;
        }
    });
})();


(function() {
        numeral.register('format', 'currency', {
        regexps: {
            format: /(\$)/
        },
        format: function(value, format, roundingFunction) {
            var locale = numeral.locales[numeral.options.currentLocale],
                symbols = {
                    before: format.match(/^([\+|\-|\(|\s|\$]*)/)[0],
                    after: format.match(/([\+|\-|\)|\s|\$]*)$/)[0]
                },
                output,
                symbol,
                i;

            // strip format of spaces and $
            format = format.replace(/\s?\$\s?/, '');

            // format the number
            output = numeral._.numberToFormat(value, format, roundingFunction);

            // update the before and after based on value
            if (value >= 0) {
                symbols.before = symbols.before.replace(/[\-\(]/, '');
                symbols.after = symbols.after.replace(/[\-\)]/, '');
            } else if (value < 0 && (!numeral._.includes(symbols.before, '-') && !numeral._.includes(symbols.before, '('))) {
                symbols.before = '-' + symbols.before;
            }

            // loop through each before symbol
            for (i = 0; i < symbols.before.length; i++) {
                symbol = symbols.before[i];

                switch (symbol) {
                    case '$':
                        output = numeral._.insert(output, locale.currency.symbol, i);
                        break;
                    case ' ':
                        output = numeral._.insert(output, ' ', i + locale.currency.symbol.length - 1);
                        break;
                }
            }

            // loop through each after symbol
            for (i = symbols.after.length - 1; i >= 0; i--) {
                symbol = symbols.after[i];

                switch (symbol) {
                    case '$':
                        output = i === symbols.after.length - 1 ? output + locale.currency.symbol : numeral._.insert(output, locale.currency.symbol, -(symbols.after.length - (1 + i)));
                        break;
                    case ' ':
                        output = i === symbols.after.length - 1 ? output + ' ' : numeral._.insert(output, ' ', -(symbols.after.length - (1 + i) + locale.currency.symbol.length - 1));
                        break;
                }
            }


            return output;
        }
    });
})();


(function() {
        numeral.register('format', 'exponential', {
        regexps: {
            format: /(e\+|e-)/,
            unformat: /(e\+|e-)/
        },
        format: function(value, format, roundingFunction) {
            var output,
                exponential = typeof value === 'number' && !numeral._.isNaN(value) ? value.toExponential() : '0e+0',
                parts = exponential.split('e');

            format = format.replace(/e[\+|\-]{1}0/, '');

            output = numeral._.numberToFormat(Number(parts[0]), format, roundingFunction);

            return output + 'e' + parts[1];
        },
        unformat: function(string) {
            var parts = numeral._.includes(string, 'e+') ? string.split('e+') : string.split('e-'),
                value = Number(parts[0]),
                power = Number(parts[1]);

            power = numeral._.includes(string, 'e-') ? power *= -1 : power;

            function cback(accum, curr, currI, O) {
                var corrFactor = numeral._.correctionFactor(accum, curr),
                    num = (accum * corrFactor) * (curr * corrFactor) / (corrFactor * corrFactor);
                return num;
            }

            return numeral._.reduce([value, Math.pow(10, power)], cback, 1);
        }
    });
})();


(function() {
        numeral.register('format', 'ordinal', {
        regexps: {
            format: /(o)/
        },
        format: function(value, format, roundingFunction) {
            var locale = numeral.locales[numeral.options.currentLocale],
                output,
                ordinal = numeral._.includes(format, ' o') ? ' ' : '';

            // check for space before
            format = format.replace(/\s?o/, '');

            ordinal += locale.ordinal(value);

            output = numeral._.numberToFormat(value, format, roundingFunction);

            return output + ordinal;
        }
    });
})();


(function() {
        numeral.register('format', 'percentage', {
        regexps: {
            format: /(%)/,
            unformat: /(%)/
        },
        format: function(value, format, roundingFunction) {
            var space = numeral._.includes(format, ' %') ? ' ' : '',
                output;

            if (numeral.options.scalePercentBy100) {
                value = value * 100;
            }

            // check for space before %
            format = format.replace(/\s?\%/, '');

            output = numeral._.numberToFormat(value, format, roundingFunction);

            if (numeral._.includes(output, ')')) {
                output = output.split('');

                output.splice(-1, 0, space + '%');

                output = output.join('');
            } else {
                output = output + space + '%';
            }

            return output;
        },
        unformat: function(string) {
            var number = numeral._.stringToNumber(string);
            if (numeral.options.scalePercentBy100) {
                return number * 0.01;
            }
            return number;
        }
    });
})();


(function() {
        numeral.register('format', 'time', {
        regexps: {
            format: /(:)/,
            unformat: /(:)/
        },
        format: function(value, format, roundingFunction) {
            var hours = Math.floor(value / 60 / 60),
                minutes = Math.floor((value - (hours * 60 * 60)) / 60),
                seconds = Math.round(value - (hours * 60 * 60) - (minutes * 60));

            return hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
        },
        unformat: function(string) {
            var timeArray = string.split(':'),
                seconds = 0;

            // turn hours and minutes into seconds and add them all up
            if (timeArray.length === 3) {
                // hours
                seconds = seconds + (Number(timeArray[0]) * 60 * 60);
                // minutes
                seconds = seconds + (Number(timeArray[1]) * 60);
                // seconds
                seconds = seconds + Number(timeArray[2]);
            } else if (timeArray.length === 2) {
                // minutes
                seconds = seconds + (Number(timeArray[0]) * 60);
                // seconds
                seconds = seconds + Number(timeArray[1]);
            }
            return Number(seconds);
        }
    });
})();

return numeral;
}));
}(numeral$1));

const numeral = numeral$1.exports;

var chs = {exports: {}};

(function (module) {
// numeral.js locale configuration
// locale : simplified chinese (chs)
// author : badplum : https://github.com/badplum

(function (global, factory) {
    if (module.exports) {
        factory(numeral$1.exports);
    } else {
        factory(global.numeral);
    }
}(commonjsGlobal, function (numeral) {
    numeral.register('locale', 'chs', {
        delimiters: {
            thousands: ',',
            decimal: '.'
        },
        abbreviations: {
            thousand: '千',
            million: '百万',
            billion: '十亿',
            trillion: '兆'
        },
        ordinal: function (number) {
            return '.';
        },
        currency: {
            symbol: '¥'
        }
    });
}));
}(chs));

var es = {exports: {}};

(function (module) {
// numeral.js locale configuration
// locale : spanish
// author : Hernan Garcia : https://github.com/hgarcia

(function (global, factory) {
    if (module.exports) {
        factory(numeral$1.exports);
    } else {
        factory(global.numeral);
    }
}(commonjsGlobal, function (numeral) {
    numeral.register('locale', 'es', {
        delimiters: {
            thousands: '.',
            decimal: ','
        },
        abbreviations: {
            thousand: 'k',
            million: 'mm',
            billion: 'b',
            trillion: 't'
        },
        ordinal: function (number) {
            var b = number % 10;
            return (b === 1 || b === 3) ? 'er' :
                (b === 2) ? 'do' :
                (b === 7 || b === 0) ? 'mo' :
		(b === 8) ? 'vo' :
		(b === 9) ? 'no' : 'to';
        },
        currency: {
            symbol: '$'
        }
    });
}));
}(es));

var fr = {exports: {}};

(function (module) {
// numeral.js locale configuration
// locale : french (fr)
// author : Adam Draper : https://github.com/adamwdraper

(function (global, factory) {
    if (module.exports) {
        factory(numeral$1.exports);
    } else {
        factory(global.numeral);
    }
}(commonjsGlobal, function (numeral) {
    numeral.register('locale', 'fr', {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 'k',
            million: 'm',
            billion: 'b',
            trillion: 't'
        },
        ordinal : function (number) {
            return number === 1 ? 'er' : 'e';
        },
        currency: {
            symbol: '€'
        }
    });
}));
}(fr));

var it = {exports: {}};

(function (module) {
// numeral.js locale configuration
// locale : italian Italy (it)
// author : Giacomo Trombi : http://cinquepunti.it

(function (global, factory) {
    if (module.exports) {
        factory(numeral$1.exports);
    } else {
        factory(global.numeral);
    }
}(commonjsGlobal, function (numeral) {
    numeral.register('locale', 'it', {
        delimiters: {
            thousands: '.',
            decimal: ','
        },
        abbreviations: {
            thousand: 'mila',
            million: 'mil',
            billion: 'b',
            trillion: 't'
        },
        ordinal: function (number) {
            return 'º';
        },
        currency: {
            symbol: '€'
        }
    });
}));
}(it));

var pl = {exports: {}};

(function (module) {
// numeral.js locale configuration
// locale : polish (pl)
// author : Dominik Bulaj : https://github.com/dominikbulaj

(function (global, factory) {
    if (module.exports) {
        factory(numeral$1.exports);
    } else {
        factory(global.numeral);
    }
}(commonjsGlobal, function (numeral) {
    numeral.register('locale', 'pl', {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 'tys.',
            million: 'mln',
            billion: 'mld',
            trillion: 'bln'
        },
        ordinal: function (number) {
            return '.';
        },
        currency: {
            symbol: 'PLN'
        }
    });
}));
}(pl));

var ru = {exports: {}};

(function (module) {
// numeral.js locale configuration
// locale : russian (ru)
// author : Anatoli Papirovski : https://github.com/apapirovski

(function (global, factory) {
    if (module.exports) {
        factory(numeral$1.exports);
    } else {
        factory(global.numeral);
    }
}(commonjsGlobal, function (numeral) {
    numeral.register('locale', 'ru', {
        delimiters: {
            thousands: ' ',
            decimal: ','
        },
        abbreviations: {
            thousand: 'тыс.',
            million: 'млн.',
            billion: 'млрд.',
            trillion: 'трлн.'
        },
        ordinal: function () {
            // not ideal, but since in Russian it can taken on
            // different forms (masculine, feminine, neuter)
            // this is all we can do
            return '.';
        },
        currency: {
            symbol: 'руб.'
        }
    });
}));
}(ru));

/**
 * Locales available for KulMath.
 */
var KulMathLocales;
(function (KulMathLocales) {
    KulMathLocales["cn"] = "chs";
    KulMathLocales["en"] = "en";
    KulMathLocales["es"] = "es";
    KulMathLocales["it"] = "it";
    KulMathLocales["fr"] = "fr";
    KulMathLocales["pl"] = "pl";
    KulMathLocales["ru"] = "ru";
})(KulMathLocales || (KulMathLocales = {}));

const dom$4 = document.documentElement;
/**
 * Takes a mathematical formula as string in input, with column names between brackets, and returns the result as a number.
 * @param {string} formula - Mathematical operation (i.e.: ([COL1] - [COL2]) * 100 / [COL3]).
 * @param {{ [index: string]: number }} row - Object containing column names as indexes and the related values as keys.
 * @returns {number} Result of the formula.
 */
function customFormula(formula, row) {
    const keys = Object.keys(row);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let value = row[key];
        if (value != null && !isNaN(value)) {
            let re = new RegExp(key, 'g');
            formula = formula.replace(re, value.toString());
        }
    }
    formula = formula.replace(/[\[\]']+/g, '');
    try {
        const result = Function('"use strict"; return (' + formula + ')')();
        return result;
    }
    catch (e) {
        dom$4.ketchupLite.debug.logMessage('kul-data', 'Error while evaluating the following formula!(' + formula + ')', 'warning');
        return NaN;
    }
}
/**
 * Calculates a single Y point of a normal distribution.
 * @param {number} average - Average.
 * @param {number} variance - Variance.
 * @param {number} x - X coordinate.
 * @returns {number} Result.
 */
function normalDistributionFormula(average, variance, x) {
    return ((1 / Math.sqrt(variance * 2 * Math.PI)) *
        Math.exp(-Math.pow(x - average, 2) / (2 * variance)));
}

/**
 * Creates a regular expression object from a provided string, with special characters escaped.
 * @param s The string to be escaped and used to create the regular expression.
 * @param flags Optional flags that modify the regular expression.
 * @returns A RegExp object constructed with the escaped string and provided flags.
 */
function getRegExpFromString(s, flags) {
    return new RegExp(escapeRegExp(s), flags);
}
/**
 * Escapes special characters in a string to be used in a regular expression.
 * @param s The string to escape.
 * @returns The escaped string with special regular expression characters prefixed with a backslash.
 */
function escapeRegExp(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

const dom$3 = document.documentElement;
/**
 * Handles mathematical operations and number formatting/conversion.
 * @module KulMath
 */
class KulMath {
    formulas = {
        custom(formula, row) {
            return customFormula(formula, row);
        },
        normalDistribution(average, variance, x) {
            return normalDistributionFormula(average, variance, x);
        },
    };
    locale;
    managedComponents;
    numbers = {
        toLocaleString(value) {
            const maximumFractionDigits = 14;
            if (value == null || value == '')
                return value;
            return Number(value).toLocaleString(this.locale, {
                maximumFractionDigits: maximumFractionDigits,
            });
        },
    };
    numeral;
    /**
     * Initializes KulMath.
     */
    constructor(locale) {
        this.locale = locale ? locale : KulMathLocales.en;
        this.managedComponents = new Set();
        this.numeral = numeral;
        this.numeral.locale(this.locale);
    }
    /**
     * Sets the locale of the numeral instance. The locales available must be tied to the KulDates locales.
     * @param {KulMathLocales} locale - Numeraljs locale string.
     */
    setLocale(locale) {
        if (!Object.values(KulMathLocales).includes(locale)) {
            locale = KulMathLocales.en;
            dom$3.ketchupLite.debug.logMessage('kul-math', 'Invalid locale (' + locale + ')! Defaulting to english.', 'warning');
        }
        this.locale = locale;
        this.numeral.locale(locale);
        this.managedComponents.forEach(function (comp) {
            if (comp.isConnected) {
                comp.refresh();
            }
        });
        document.dispatchEvent(new CustomEvent('kul-math-localechange'));
    }
    /**
     * Calculates the normal distribution on a set of values.
     * @param {string[] | number[] | String[]} values - Array of values.
     * @param {number} precision - Number of iterations to run (points). When not specified, defaults to 201.
     * @returns {number[][]} Returns an array of arrays containing numbers, which are the representation of the calculated normal distribution.
     */
    normalDistribution(values, precision) {
        if (!precision) {
            precision = 201;
        }
        const data = [];
        let max = Math.max.apply(Math, values);
        let min = Math.min.apply(Math, values);
        let average = 0;
        let variance = 0;
        for (let index = 0; index < values.length; index++) {
            const value = values[index];
            average += this.numberify(value);
        }
        average = average / values.length;
        for (let index = 0; index < values.length; index++) {
            const value = values[index];
            variance += Math.pow(this.numberify(value) - average, 2);
        }
        variance = variance / values.length;
        if (!variance) {
            variance = 0.001;
        }
        max = max + ((average / 100) * 50 + (variance / average) * 3);
        min = min - ((average / 100) * 50 + (variance / average) * 3);
        for (let i = 0; i < precision; i++) {
            const x = ((max - min) * i) / precision + min;
            data.push([
                x,
                this.formulas.normalDistribution(average, variance, x),
            ]);
        }
        return data;
    }
    /**
     * Formats the input number with the specified format of the currently set locale.
     * @param {string | String | number} input - Input number which will be automatically "numberified".
     * @param {string} format - Desired format. Defaults to '0,0.00' (i.e.: 2,000,000.51).
     * @param {boolean} inputIsLocalized Numberifies assuming the input string is in the current KulMath locale's format.
     * @returns {string} Formatted number.
     */
    format(input, format, inputIsLocalized) {
        const n = this.numberify(input, inputIsLocalized);
        if (!format) {
            const positiveN = Math.abs(n);
            const decimals = positiveN - Math.floor(positiveN);
            if (decimals) {
                format = '0,0.00';
            }
            else {
                format = '0,0';
            }
        }
        return this.numeral(n).format(format);
    }
    /**
     * Create the pattern string for format a number
     * @param {boolean} thousandPoint - show thousandPoint
     * @param {number} decimals - number of decimals
     * @returns {string} - formatter pattern
     */
    createFormatPattern(thousandPoint, decimals) {
        var format = '0';
        if (thousandPoint) {
            format += ',0';
        }
        if (decimals && decimals > 0) {
            format += '.';
            for (let i = 0; i < decimals; i++) {
                format += '0';
            }
        }
        return format;
    }
    /**
     * Returns the decimal separator of current browser
     * @returns {string} current decimal separator, by locale
     */
    decimalSeparator() {
        const numberWithGroupAndDecimalSeparator = 1000.1;
        return Intl.NumberFormat(this.locale)
            .formatToParts(numberWithGroupAndDecimalSeparator)
            .find((part) => part.type === 'decimal').value;
    }
    /**
     * Returns the group separator of current browser
     * @returns {string} current group separator, by locale
     */
    groupSeparator() {
        const numberWithGroupAndDecimalSeparator = 1000.1;
        return Intl.NumberFormat(this.locale)
            .formatToParts(numberWithGroupAndDecimalSeparator)
            .find((part) => part.type === 'group').value;
    }
    /**
     * Checks if an input string matches options, for desired formatted decimal number (integer digits, decimal digits)
     * @param {string} value the input value to check
     * @param {NumericFieldFormatOptions} options options for customize the check
     * @returns {RegExpMatchArray} an object from applying the regular expression for check
     */
    matchNumericValueWithOptions(value, options) {
        value = value.replace(getRegExpFromString(this.groupSeparator(), 'g'), '');
        // see https://github.com/24eme/jquery-input-number-format.git
        let found = undefined;
        let integerPartSuffix = '+';
        if (options.integer && options.integer > 0) {
            integerPartSuffix = '{0,' + options.integer + '}';
        }
        let regexp = '^[0-9]' + integerPartSuffix;
        if (options.allowNegative) {
            regexp = '^-{0,1}[0-9]' + integerPartSuffix;
        }
        if (options.decimal && options.decimal > 0) {
            regexp +=
                '([' +
                    this.decimalSeparator() +
                    '][0-9]{0,' +
                    options.decimal +
                    '})?';
            let regexpObj = new RegExp(regexp + '$');
            found = value.match(regexpObj);
            if (!found) {
                regexp =
                    '^[' +
                        this.decimalSeparator() +
                        '][0-9]{0,' +
                        options.decimal +
                        '}';
                regexpObj = new RegExp(regexp + '$');
                found = value.match(regexpObj);
            }
        }
        else {
            let regexpObj = new RegExp(regexp + '$');
            found = value.match(regexpObj);
        }
        return found;
    }
    /**
     * Returns a number from a non-specified input type between string, number, or String.
     * @param {string | String | number} input - Input value to numberify.
     * @param {boolean} inputIsLocalized - Numberifies assuming the input string is in the current KulMath locale's format.
     * @param {string} type - type of number for calculate suffix
     * @param {string} decFmt - decimal format for the input value.
     * @returns {number} Resulting number or NaN (when not a number).
     */
    numberify(input, inputIsLocalized, type, decFmt) {
        if (typeof input != 'number') {
            if (type) {
                let suffix = this.getNumericValueSuffix(type);
                if (suffix != '') {
                    input = input.replace(getRegExpFromString(suffix, 'g'), '');
                }
            }
            if (!decFmt) {
                decFmt = inputIsLocalized ? this.decimalSeparator() : '.';
            }
            const groupSeparator = decFmt == '.' ? ',' : '.';
            input = input.replace(getRegExpFromString(groupSeparator, 'g'), '');
            if (decFmt != '.') {
                input = input.replace(getRegExpFromString(decFmt, 'g'), '.');
            }
        }
        let n = NaN;
        const locale = this.numeral.locale();
        this.numeral.locale(KulMathLocales.en);
        n = this.numeral(input).value();
        this.numeral.locale(locale);
        if (n === null) {
            return NaN;
        }
        return n;
    }
    /**
     * Returns a number from a non-specified input type between string, number, or String.
     * If value in is null, undefined or blank, returns 0
     * @param {string} input number as string, formatted by locale US, decimal separator . (like java decimal numbers)
     * @param {boolean} inputIsLocalized - Numberifies assuming the input string is in the current KulMath locale's format.
     * @param {string} type - type of number for calculate suffix
     * @returns {number} Resulting number
     **/
    numberifySafe(input, inputIsLocalized, type, decFmt) {
        if (!input || input == null || input.trim() == '') {
            input = '0';
        }
        return this.numberify(input, inputIsLocalized, type, decFmt);
    }
    /**
     * Checks if input is a valid number
     * @param {any} value input value to check
     * @returns {boolean} if input value is valid number
     */
    isNumber(value) {
        //return typeof value === 'number';
        return !isNaN(value);
    }
    /**
     * Checks if string in input is a valid formatted number
     * @param {string} value number as string, formatted by actual browser locale
     * @param {string} type - type of number for calculate suffix
     * @returns {boolean} true if number string in input is a valid number
     */
    isStringNumber(value, type) {
        if (value == null || value.trim() == '') {
            return false;
        }
        let tmpStr = this.formattedStringToNumberString(value, type);
        if (this.isNumber(tmpStr)) {
            return true;
        }
        return false;
    }
    /**
     * Gets number as string, formatted by locale US, decimal separator . (like java decimal numbers)
     * @param {string} input number as string, formatted by actual browser locale (maybe)
     * @param {string} type - type of number for calculate suffix
     * @param {string} decSeparator - decimal serparator of input string
     * @returns {string} number as string, formatted by locale US, decimal separator . (like java decimal numbers), without group separator
     **/
    formattedStringToNumberString(input, type, decSeparator) {
        return numberStringToNumberString(input, type, decSeparator, this);
        function numberStringToNumberString(input, type, decFmt, kulMath) {
            if (!input || input == null || input.trim() == '') {
                return '';
            }
            let unf = kulMath.numberifySafe(input, !decFmt || decFmt != '.', type, decFmt);
            if (unf == null || isNaN(unf)) {
                return input;
            }
            return numberToString(unf, -1, 'en-US', kulMath);
        }
        function numberToString(input, decimals, locale, kulMath) {
            if (input == null) {
                input = 0;
            }
            if (decimals == null || decimals == -1) {
                decimals = kulMath.countDecimals(input);
            }
            let n = Number(input);
            let f = decimals > -1
                ? {
                    minimumFractionDigits: decimals,
                    maximumFractionDigits: decimals,
                    useGrouping: false,
                }
                : { useGrouping: false };
            return n.toLocaleString(locale, f);
        }
    }
    /**
     * Gets the number of decimals for current number
     * @param {number} value numer input
     * @returns {number} the number of decimals
     */
    countDecimals(value) {
        if (Math.floor(value) === value)
            return 0;
        let stringValue = value.toString().split('.')[1];
        if (stringValue) {
            return stringValue.length ?? 0;
        }
        else {
            return 0;
        }
    }
    /**
     * Gets the suffix for number, by type
     * @param {string} type - type of number for calculate suffix
     * @returns {string} suffix for number, by type
     **/
    getNumericValueSuffix(type) {
        type = type.toUpperCase();
        let nstr = '';
        if (type == 'P') {
            nstr = ' %';
        }
        else if (type == 'VE') {
            nstr = ' €';
        }
        else if (type == 'VL') {
            nstr = ' £';
        }
        else if (type == 'VV') {
            nstr = ' $';
        }
        return nstr;
    }
    /**
     * Gets the number as string, formatted by actual browser locale, with suffix by type
     * @param {number} input number
     * @param {number} decimals number of significant decimal digits for output
     * @param {string} type - type of number for calculate suffix
     * @returns {string} number as string, formatted by actual browser locale, with suffix by type
     **/
    numberToFormattedString(input, decimals, type) {
        if (input == null || isNaN(input)) {
            return '';
        }
        if (decimals == null || decimals == -1) {
            decimals = this.countDecimals(input);
        }
        let nstr = this.format(input, this.createFormatPattern(true, decimals));
        nstr = nstr + this.getNumericValueSuffix(type);
        return nstr;
    }
    /**
     * Gets the number as string, formatted by actual browser locale, with suffix by type
     * @param {string} input number as string, formatted by locale US, decimal separator . (like java decimal numbers)
     * @param {number} decimals number of significant decimal digits for output
     * @param {string} type - type of number for calculate suffix
     * @param {string} decSeparator decimal separator for output string
     * @returns {string} number as string, formatted by actual browser locale (or using decimal separator param), with suffix by type
     **/
    numberStringToFormattedString(input, decimals, type, decSeparator) {
        let value = this.numberToFormattedString(this.numberifySafe(input), decimals, type);
        if (!decSeparator) {
            return value;
        }
        const browserDecSeparator = this.decimalSeparator();
        if (browserDecSeparator == decSeparator) {
            return value;
        }
        const browserGroupSeparator = this.groupSeparator();
        value = value.replace(getRegExpFromString(browserGroupSeparator, 'g'), '');
        value = value.replace(getRegExpFromString(browserDecSeparator, 'g'), decSeparator);
        return value;
    }
    /**
     * Registers a KulComponent in KulMath, in order to be properly handled whenever the locale changes.
     * @param {any} component - The Ketchup component to be registered.
     */
    register(component) {
        this.managedComponents.add(component.rootElement ? component.rootElement : component);
    }
    /**
     * Unregisters a KulComponent, so it won't be refreshed when the locale changes.
     *
     * @param {any} component - The component calling this function.
     */
    unregister(component) {
        if (this.managedComponents) {
            this.managedComponents.delete(component.rootElement ? component.rootElement : component);
        }
    }
}

/**
 * The direction to which ScollableElement can be scrolled.
 */
var ScrollOnHoverDirection;
(function (ScrollOnHoverDirection) {
    ScrollOnHoverDirection["BOTTOM"] = "bottom";
    ScrollOnHoverDirection["LEFT"] = "left";
    ScrollOnHoverDirection["RIGHT"] = "right";
    ScrollOnHoverDirection["TOP"] = "top";
})(ScrollOnHoverDirection || (ScrollOnHoverDirection = {}));

const dom$2 = document.documentElement;
/**
 * Lets the user scroll an element's overflow by hovering with the mouse on its left/right edge.
 * @module KulScrollOnHover
 */
class KulScrollOnHover {
    container;
    delay;
    managedElements;
    step;
    #arrowsContainer;
    #leftArrows;
    #rightArrows;
    #scrollEvent;
    #mousemoveEvent;
    #mouseleaveEvent;
    #rAF;
    #timeout;
    /**
     * Initializes KulScrollOnHover.
     * @param {number} delay - Sets the time in milliseconds before the scrolling starts when mouse-hovering.
     * @param {number} step - The amount in pixels for each scroll recursion.
     */
    constructor(delay, step) {
        this.delay = delay ? delay : 500;
        this.managedElements = new Set();
        this.step = step ? step : 50;
        this.#mouseleaveEvent = (event) => this.stop(event.target);
        this.#mousemoveEvent = (event) => this.start(event);
        this.#rAF = null;
        this.#scrollEvent = (event) => this.updateChildren(event.target);
        this.#timeout = null;
    }
    /**
     * Initializes the left and right arrow icons.
     */
    #initArrows() {
        this.#arrowsContainer = document.createElement('div');
        this.#leftArrows = [];
        this.#rightArrows = [];
        this.#arrowsContainer.id = 'kul-scrolling-arrows';
        for (let index = 1; index < 4; index++) {
            const arrow = document.createElement('div');
            arrow.setAttribute('class', 'kul-left-scrolling-arrow kul-arrow-' + index);
            this.#leftArrows.push(arrow);
        }
        for (let index = 1; index < 4; index++) {
            const arrow = document.createElement('div');
            arrow.setAttribute('class', 'kul-right-scrolling-arrow kul-arrow-' + index);
            this.#rightArrows.push(arrow);
        }
        this.#arrowsContainer.append(this.#leftArrows[2], this.#leftArrows[1], this.#leftArrows[0], this.#rightArrows[0], this.#rightArrows[1], this.#rightArrows[2]);
        this.container = document.createElement('div');
        this.container.setAttribute('kul-scroll-on-hover', '');
        this.container.appendChild(this.#arrowsContainer);
        document.body.appendChild(this.container);
    }
    /**
     * Watches the given element in order to trigger the scroll on hover when conditions are met.
     * Children nodes with the "hover-scrolling-child" will be watched and scrolled when el scrolls.
     * @param {KulScrollOnHoverElement} el - Element to watch.
     * @param {boolean} vertical - Enables vertical scroll.
     * @param {KulScrollOnHoverPercentages} percentages - Sets how big is the area in which the scroll is enabled.
     * @param {number} step - The amount in pixels for each scroll recursion.
     */
    register(el, vertical, percentages, step) {
        if (!this.#arrowsContainer) {
            this.#initArrows();
        }
        el.style.overflowX = 'auto';
        el.scrollOnHover = {
            active: false,
            children: el.querySelectorAll('.hover-scrolling-child'),
            percentages: percentages
                ? percentages
                : { back: 0.1, forward: 0.9 },
            rect: null,
            step: step,
            vertical: vertical || null,
            x: 0,
            y: 0,
        };
        if (el.scrollOnHover.children) {
            el.addEventListener('scroll', this.#scrollEvent);
        }
        el.addEventListener('mousemove', this.#mousemoveEvent);
        el.addEventListener('mouseleave', this.#mouseleaveEvent);
        this.managedElements.add(el);
    }
    /**
     * Removes the given element from ScrollOnHover watchlist.
     * @param {KulScrollOnHoverElement} el - Element to unregister.
     */
    unregister(el) {
        el.removeEventListener('scroll', this.#scrollEvent);
        el.removeEventListener('mousemove', this.#mousemoveEvent);
        el.removeEventListener('mouseleave', this.#mouseleaveEvent);
        if (this.managedElements) {
            this.managedElements.delete(el);
        }
    }
    /**
     * Returns whether an element was previously registered or not.
     * @param {KulScrollOnHoverElement} el - Element to test.
     * @returns {boolean} True if the element was registered.
     */
    isRegistered(el) {
        return !this.managedElements ? false : this.managedElements.has(el);
    }
    /**
     * When called, this function prepares the class for the scrolling process.
     * @param {MouseEvent} event - The starter event, which should be a MouseMove event.
     */
    async start(event) {
        const el = event.currentTarget;
        el.scrollOnHover.rect = el.getBoundingClientRect();
        el.scrollOnHover.x = event.clientX;
        el.scrollOnHover.y = event.clientY;
        this.#arrowsContainer.style.left = event.clientX + 'px';
        this.#arrowsContainer.style.top = event.clientY + 'px';
        if (el.scrollOnHover.active || this.#timeout) {
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
                const percLeft = trueWidth -
                    trueWidth * el.scrollOnHover.percentages.forward;
                const elOffset = el.scrollOnHover.x - el.scrollOnHover.rect.left;
                const maxScrollLeft = el.scrollWidth - trueWidth;
                const direction = elOffset < percLeft && el.scrollLeft !== 0
                    ? ScrollOnHoverDirection.LEFT
                    : elOffset > percRight &&
                        el.scrollLeft !== maxScrollLeft
                        ? ScrollOnHoverDirection.RIGHT
                        : null;
                if (direction) {
                    for (let i = 0; i < 3; i++) {
                        if (direction === ScrollOnHoverDirection.LEFT) {
                            this.#leftArrows[i].classList.add('kul-activated');
                        }
                        else {
                            this.#rightArrows[i].classList.add('kul-activated');
                        }
                    }
                    this.#timeout = setTimeout(() => {
                        el.scrollOnHover.active = true;
                        this.#rAF = requestAnimationFrame(function () {
                            dom$2.ketchupLite.scrollOnHover.run(el, maxScrollLeft, percRight, percLeft, direction);
                        });
                    }, this.delay);
                }
            }
        }
        if (el.scrollOnHover.vertical && el.scrollHeight > trueHeight + 10) {
            if (trueHeight !== 0 && !el.scrollOnHover.active) {
                const percBottom = trueHeight - trueHeight * el.scrollOnHover.percentages.back;
                const percTop = trueHeight -
                    trueHeight * el.scrollOnHover.percentages.forward;
                const elOffset = el.scrollOnHover.y - el.scrollOnHover.rect.top;
                const maxScrollTop = el.scrollHeight - trueHeight;
                const direction = elOffset < percTop && el.scrollTop !== 0
                    ? ScrollOnHoverDirection.TOP
                    : elOffset > percBottom && el.scrollTop !== maxScrollTop
                        ? ScrollOnHoverDirection.BOTTOM
                        : null;
                if (direction) {
                    this.#timeout = setTimeout(() => {
                        el.scrollOnHover.active = true;
                        this.#rAF = requestAnimationFrame(function () {
                            dom$2.ketchupLite.scrollOnHover.run(el, maxScrollTop, percBottom, percTop, direction);
                        });
                    }, this.delay);
                }
            }
        }
    }
    /**
     * When called, this function stops the scrolling process.
     * @param {KulScrollOnHoverElement} el - The scrolled element.
     */
    async stop(el) {
        el.scrollOnHover.active = false;
        cancelAnimationFrame(this.#rAF);
        clearTimeout(this.#timeout);
        this.#timeout = null;
        for (let i = 0; i < this.#leftArrows.length; i++) {
            this.#leftArrows[i].classList.remove('kul-activated');
            this.#leftArrows[i].classList.remove('kul-animated');
        }
        for (let i = 0; i < this.#rightArrows.length; i++) {
            this.#rightArrows[i].classList.remove('kul-activated');
            this.#rightArrows[i].classList.remove('kul-animated');
        }
    }
    /**
     * The actual recursive scroll function.
     * @param {KulScrollOnHoverElement} el - The scrolled element.
     * @param {number} maxScrollLeft - Left coordinates to which the recursiveness must be stopped.
     * @param {number} percForward - Range of the right (or bottom) area.
     * @param {number} percBack - Range of the left (or top) scrollable area.
     * @param {ScrollOnHoverDirection} direction - Direction of the scroll.
     */
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
        if (direction === ScrollOnHoverDirection.RIGHT &&
            percForward > offset) {
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
        if (direction === ScrollOnHoverDirection.BOTTOM &&
            percForward > offset) {
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
                arrow = this.#leftArrows;
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
                arrow = this.#rightArrows;
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
            arrow[i].classList.add('kul-animated');
        }
        this.#rAF = requestAnimationFrame(function () {
            dom$2.ketchupLite.scrollOnHover.run(el, maxScrollLeft, percForward, percBack, direction);
        });
    }
    /**
     * Scrolls children of the element having the "hover-scrolling-child" class
     * @param {KulScrollOnHoverElement} el - The scrolled element.
     */
    updateChildren(el) {
        for (let i = 0; i < el.scrollOnHover.children.length; i++) {
            el.scrollOnHover.children[i].scrollLeft = el.scrollLeft;
        }
    }
}

/**
 * Variable used to fetch the MASTER customStyle (used in every component).
 */
const masterCustomStyle = 'MASTER';
/**
 * List of all colors.
 */
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
/**
 * List of all icons.
 */
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

const themesJson = {
    bubbles: {
        cssVariables: {
            '--kul-primary-color': '#c18f00',
            '--kul-secondary-color': '#1d1d1d',
            '--kul-background-color': '#ffffff',
            '--kul-header-background-color': '#beb08d',
            '--kul-header-color': '#ffffff',
            '--kul-drawer-background-color': '#ffffff',
            '--kul-drawer-color': '#000000',
            '--kul-header-height': '64px',
            '--kul-drawer-width': '300px',
            '--kul-font-family': 'Lato, sans-serif',
            '--kul-font-family-monospace': 'Roboto Mono, consolas, monospace',
            '--kul-font-size': '14px',
            '--kul-text-color': '#2e2e2e',
            '--kul-text-on-primary-color': '#ffffff',
            '--kul-text-on-secondary-color': '#ffffff',
            '--kul-disabled-background-color': '#eaeaea',
            '--kul-disabled-color': '#5c5c5c',
            '--kul-title-background-color': '#f1f3f4',
            '--kul-title-color': '#2e2e2e',
            '--kul-icon-color': '#505050',
            '--kul-border-color': '#e0e0e0',
            '--kul-box-shadow': 'rgba(0, 0, 0, 0.2) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px',
            '--kul-info-color': '#2592df',
            '--kul-success-color': '#4d9f02',
            '--kul-warning-color': '#ffc107',
            '--kul-danger-color': '#d91e18',
            '--kul-spinner-color': '#1D1D1B',
            '--kul-chart-color-1': '#ff5959',
            '--kul-chart-color-2': '#e0a0a0',
            '--kul-chart-color-3': '#8e1010',
            '--kul-chart-color-4': '#f5f5dc',
            '--kul-obj-cursor': 'inherit',
            '--kul-card-zindex': 900,
            '--kul-drawer-zindex': 900,
            '--kul-header-zindex': 900,
        },
        icons: {
            '--kul-ascending-icon': 'sort-ascending',
            '--kul-descending-icon': 'sort-descending',
            '--kul-expanded-icon': 'chevron-down',
            '--kul-collapsed-icon': 'chevron_right',
            '--kul-dropdown-icon': 'chevron-down',
            '--kul-clear-icon': 'clear',
            '--kul-filter-remove-icon': 'filter-remove',
            '--kul-key-icon': 'key-variant',
            '--kul-search-icon': 'search',
            '--kul-warning-icon': 'warning',
        },
        isDark: false,
        customStyles: {},
        imports: [
            "@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400&display=swap')",
        ],
    },
    cobalt: {
        cssVariables: {
            '--kul-primary-color': '#248aff',
            '--kul-secondary-color': '#65cbe9',
            '--kul-background-color': '#222222',
            '--kul-header-background-color': '#131313',
            '--kul-header-color': '#65cbe9',
            '--kul-drawer-background-color': '#2e2e2e',
            '--kul-drawer-color': '#65cbe9',
            '--kul-header-height': '64px',
            '--kul-drawer-width': '300px',
            '--kul-font-family': 'Blinker, sans-serif;',
            '--kul-font-family-monospace': 'Andalé Mono, monospace',
            '--kul-font-size': '14px',
            '--kul-text-color': '#65cbe9',
            '--kul-text-on-primary-color': '#f1f7ff',
            '--kul-text-on-secondary-color': '#000000',
            '--kul-disabled-background-color': '#3c3c3c',
            '--kul-disabled-color': '#7e7e7e',
            '--kul-title-background-color': '#2e2e2e',
            '--kul-title-color': '#f5f5f5',
            '--kul-icon-color': '#65cbe9',
            '--kul-border-color': '#535353',
            '--kul-box-shadow': '0px 0px 7.5px 0px rgba(128, 128, 128, 0.5)',
            '--kul-info-color': '#2592df',
            '--kul-success-color': '#4d9f02',
            '--kul-warning-color': '#ffc107',
            '--kul-danger-color': '#d91e18',
            '--kul-spinner-color': '#a4d9f7',
            '--kul-chart-color-1': '#308aff',
            '--kul-chart-color-2': '#5eb6d1',
            '--kul-chart-color-3': '#b1eafb',
            '--kul-chart-color-4': '#ffffff',
            '--kul-obj-cursor': 'inherit',
            '--kul-card-zindex': 900,
            '--kul-drawer-zindex': 900,
            '--kul-header-zindex': 900,
        },
        icons: {
            '--kul-ascending-icon': 'arrow_drop_up',
            '--kul-descending-icon': 'arrow_drop_down',
            '--kul-expanded-icon': 'arrow_drop_down',
            '--kul-collapsed-icon': 'menu-right',
            '--kul-dropdown-icon': 'arrow_drop_down',
            '--kul-clear-icon': 'cancel',
            '--kul-filter-remove-icon': 'filter-remove',
            '--kul-key-icon': 'key-variant',
            '--kul-search-icon': 'search',
            '--kul-warning-icon': 'warning',
        },
        isDark: true,
        imports: [
            "url('https://fonts.googleapis.com/css2?family=Blinker:wght@200;300;600&display=swap')",
        ],
    },
    night: {
        cssVariables: {
            '--kul-primary-color': '#82f0e2',
            '--kul-secondary-color': '#f9ff00',
            '--kul-background-color': '#2d2d2d',
            '--kul-header-background-color': '#2d2d2d',
            '--kul-header-color': '#ffffff',
            '--kul-drawer-background-color': '#1f1f1f',
            '--kul-drawer-color': '#f5f5f5',
            '--kul-header-height': '64px',
            '--kul-drawer-width': '300px',
            '--kul-font-family': 'Lato, sans-serif',
            '--kul-font-family-monospace': 'Roboto Mono, consolas, monospace',
            '--kul-font-size': '14px',
            '--kul-text-color': '#f5f5f5',
            '--kul-text-on-primary-color': '#555555',
            '--kul-text-on-secondary-color': '#000000',
            '--kul-disabled-background-color': '#3c3c3c',
            '--kul-disabled-color': '#7e7e7e',
            '--kul-title-background-color': '#111111',
            '--kul-title-color': '#f5f5f5',
            '--kul-icon-color': '#e0e0e0',
            '--kul-border-color': '#535353',
            '--kul-box-shadow': '0px 0px 7.5px 0px rgba(128, 128, 128, 0.5)',
            '--kul-info-color': '#2592df',
            '--kul-success-color': '#4d9f02',
            '--kul-warning-color': '#ffc107',
            '--kul-danger-color': '#d91e18',
            '--kul-spinner-color': '#f2e114',
            '--kul-chart-color-1': '#60c3fc',
            '--kul-chart-color-2': '#e268d8',
            '--kul-chart-color-3': '#860bb5',
            '--kul-chart-color-4': '#1a83e4',
            '--kul-obj-cursor': 'inherit',
            '--kul-card-zindex': 900,
            '--kul-drawer-zindex': 900,
            '--kul-header-zindex': 900,
        },
        icons: {
            '--kul-ascending-icon': 'arrow_drop_up',
            '--kul-descending-icon': 'arrow_drop_down',
            '--kul-expanded-icon': 'arrow_drop_down',
            '--kul-collapsed-icon': 'menu-right',
            '--kul-dropdown-icon': 'arrow_drop_down',
            '--kul-clear-icon': 'cancel',
            '--kul-filter-remove-icon': 'filter-remove',
            '--kul-key-icon': 'key-variant',
            '--kul-search-icon': 'search',
            '--kul-warning-icon': 'warning',
        },
        isDark: true,
        imports: [
            "@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400&display=swap')",
        ],
    },
    flamingo: {
        cssVariables: {
            '--kul-primary-color': '#e88aab',
            '--kul-secondary-color': '#7f00e7',
            '--kul-background-color': '#222222',
            '--kul-header-background-color': '#2d2d2d',
            '--kul-header-color': '#ffffff',
            '--kul-drawer-background-color': '#1f1f1f',
            '--kul-drawer-color': '#f5f5f5',
            '--kul-header-height': '64px',
            '--kul-drawer-width': '300px',
            '--kul-font-family': 'Mali, cursive;',
            '--kul-font-family-monospace': 'Roboto Mono, consolas, monospace',
            '--kul-font-size': '14px',
            '--kul-text-color': '#f5f5f5',
            '--kul-text-on-primary-color': '#000000',
            '--kul-text-on-secondary-color': '#ffffff',
            '--kul-disabled-background-color': '#3c3c3c',
            '--kul-disabled-color': '#7e7e7e',
            '--kul-title-background-color': '#111111',
            '--kul-title-color': '#f5f5f5',
            '--kul-icon-color': '#e0e0e0',
            '--kul-border-color': '#535353',
            '--kul-box-shadow': '0px 0px 7.5px 0px rgba(128, 128, 128, 0.5)',
            '--kul-info-color': '#2592df',
            '--kul-success-color': '#4d9f02',
            '--kul-warning-color': '#ffc107',
            '--kul-danger-color': '#d91e18',
            '--kul-spinner-color': '#ffd0d8',
            '--kul-chart-color-1': '#e88aab',
            '--kul-chart-color-2': '#dc5584',
            '--kul-chart-color-3': '#c21350',
            '--kul-chart-color-4': '#c88da1',
            '--kul-obj-cursor': 'inherit',
            '--kul-card-zindex': 900,
            '--kul-drawer-zindex': 900,
            '--kul-header-zindex': 900,
        },
        icons: {
            '--kul-ascending-icon': 'arrow_drop_up',
            '--kul-descending-icon': 'arrow_drop_down',
            '--kul-expanded-icon': 'arrow_drop_down',
            '--kul-collapsed-icon': 'menu-right',
            '--kul-dropdown-icon': 'arrow_drop_down',
            '--kul-clear-icon': 'cancel',
            '--kul-filter-remove-icon': 'filter-remove',
            '--kul-key-icon': 'key-variant',
            '--kul-search-icon': 'search',
            '--kul-warning-icon': 'warning',
        },
        isDark: true,
        imports: [
            "url('https://fonts.googleapis.com/css2?family=Mali:wght@300&display=swap')",
        ],
    },
    graphite: {
        cssVariables: {
            '--kul-primary-color': '#888888',
            '--kul-secondary-color': '#d91e18',
            '--kul-background-color': '#ffffff',
            '--kul-header-background-color': '#535353',
            '--kul-header-color': '#ffffff',
            '--kul-drawer-background-color': '#ffffff',
            '--kul-drawer-color': '#545454',
            '--kul-header-height': '64px',
            '--kul-drawer-width': '300px',
            '--kul-font-family': 'Roboto, sans-serif',
            '--kul-font-family-monospace': 'Roboto Mono, consolas, monospace',
            '--kul-font-size': '13px',
            '--kul-text-color': '#545454',
            '--kul-text-on-primary-color': '#ffffff',
            '--kul-text-on-secondary-color': '#ffffff',
            '--kul-disabled-color': '#5c5c5c',
            '--kul-disabled-background-color': '#eaeaea',
            '--kul-title-background-color': '#f0f0f0',
            '--kul-title-color': '#545454',
            '--kul-icon-color': '#808080',
            '--kul-border-color': '#e0e0e0',
            '--kul-box-shadow': '0px 0px 7.5px 0px rgba(128, 128, 128, 0.5)',
            '--kul-info-color': '#2592df',
            '--kul-success-color': '#4d9f02',
            '--kul-warning-color': '#ffc107',
            '--kul-danger-color': '#d91e18',
            '--kul-spinner-color': '#eaa710',
            '--kul-chart-color-1': 'red',
            '--kul-chart-color-2': 'blue',
            '--kul-chart-color-3': 'orange',
            '--kul-chart-color-4': 'green',
            '--kul-chart-color-5': 'yellow',
            '--kul-chart-color-6': 'cyan',
            '--kul-chart-color-7': 'brown',
            '--kul-chart-color-8': 'magenta',
            '--kul-chart-color-9': 'grey',
            '--kul-chart-color-10': 'indigo',
            '--kul-obj-cursor': 'inherit',
            '--kul-card-zindex': 900,
            '--kul-drawer-zindex': 900,
            '--kul-header-zindex': 900,
        },
        customStyles: {
            'kul-BUTTON': '#kul-component button {\ntext-transform: unset;\n}\n\n',
        },
        isDark: false,
        icons: {
            '--kul-ascending-icon': 'arrow_drop_up',
            '--kul-descending-icon': 'arrow_drop_down',
            '--kul-expanded-icon': 'arrow_drop_down',
            '--kul-collapsed-icon': 'menu-right',
            '--kul-dropdown-icon': 'arrow_drop_down',
            '--kul-clear-icon': 'cancel',
            '--kul-filter-remove-icon': 'filter-remove',
            '--kul-key-icon': 'key-variant',
            '--kul-search-icon': 'search',
            '--kul-warning-icon': 'warning',
        },
    },
    ketchup: {
        cssVariables: {
            '--kul-primary-color': '#d64325',
            '--kul-secondary-color': '#a6192e',
            '--kul-background-color': '#ffffff',
            '--kul-header-background-color': '#2e2e2e',
            '--kul-header-color': '#ffffff',
            '--kul-drawer-background-color': '#ffffff',
            '--kul-drawer-color': '#595959',
            '--kul-header-height': '64px',
            '--kul-drawer-width': '300px',
            '--kul-font-family': 'Ubuntu, sans-serif',
            '--kul-font-family-monospace': 'Roboto Mono, consolas, monospace',
            '--kul-font-size': '14px',
            '--kul-text-color': '#595959',
            '--kul-text-on-primary-color': '#ffffff',
            '--kul-text-on-secondary-color': '#ffffff',
            '--kul-disabled-background-color': '#eaeaea',
            '--kul-disabled-color': '#5c5c5c',
            '--kul-title-background-color': '#f1f3f4',
            '--kul-title-color': '#2e2e2e',
            '--kul-icon-color': '#505050',
            '--kul-border-color': '#e0e0e0',
            '--kul-box-shadow': 'rgba(0, 0, 0, 0.2) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px',
            '--kul-info-color': '#2592df',
            '--kul-success-color': '#4d9f02',
            '--kul-warning-color': '#ffc107',
            '--kul-danger-color': '#d91e18',
            '--kul-spinner-color': '#eaa710',
            '--kul-chart-color-1': '#ff5959',
            '--kul-chart-color-2': '#e0a0a0',
            '--kul-chart-color-3': '#8e1010',
            '--kul-chart-color-4': '#f5f5dc',
            '--kul-obj-cursor': 'inherit',
            '--kul-card-zindex': 900,
            '--kul-drawer-zindex': 900,
            '--kul-header-zindex': 900,
        },
        isDark: false,
        icons: {
            '--kul-ascending-icon': 'sort-ascending',
            '--kul-descending-icon': 'sort-descending',
            '--kul-expanded-icon': 'chevron-down',
            '--kul-collapsed-icon': 'chevron_right',
            '--kul-dropdown-icon': 'chevron-down',
            '--kul-clear-icon': 'clear',
            '--kul-filter-remove-icon': 'filter-remove',
            '--kul-key-icon': 'key',
            '--kul-search-icon': 'search',
            '--kul-warning-icon': 'warning',
        },
        imports: [
            "url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;500&display=swap')",
        ],
    },
    obsidian: {
        cssVariables: {
            '--kul-primary-color': '#a6192e',
            '--kul-secondary-color': '#f5f4f4',
            '--kul-background-color': '#ffffff',
            '--kul-header-background-color': '#000000',
            '--kul-header-color': '#ffffff',
            '--kul-drawer-background-color': '#f5f4f4',
            '--kul-drawer-color': '#4c4c4d',
            '--kul-header-height': '64px',
            '--kul-drawer-width': '300px',
            '--kul-font-family': 'Open Sans, arial, helvatica',
            '--kul-font-family-monospace': 'Courier New, Courier, monospace',
            '--kul-font-size': '13px',
            '--kul-text-color': '#4c4c4d',
            '--kul-text-on-primary-color': '#ffffff',
            '--kul-text-on-secondary-color': '#a6192e',
            '--kul-disabled-background-color': '#ffffff',
            '--kul-disabled-color': '#4c4c4d',
            '--kul-title-background-color': '#068a9c',
            '--kul-title-color': '#ffffff',
            '--kul-icon-color': '#9d9d9d',
            '--kul-border-color': '#ededed',
            '--kul-box-shadow': 'rgba(0, 0, 0, 0.2) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px',
            '--kul-info-color': '#2592df',
            '--kul-success-color': '#4d9f02',
            '--kul-warning-color': '#ffc107',
            '--kul-danger-color': '#A6192E',
            '--kul-spinner-color': '#a6192e',
            '--kul-chart-color-1': '#735DED',
            '--kul-chart-color-2': '#00B2CB',
            '--kul-chart-color-3': '#EDC900',
            '--kul-chart-color-4': 'green',
            '--kul-chart-color-5': 'yellow',
            '--kul-chart-color-6': 'cyan',
            '--kul-chart-color-7': 'brown',
            '--kul-chart-color-8': 'magenta',
            '--kul-chart-color-9': 'grey',
            '--kul-chart-color-10': 'indigo',
            '--kul-obj-cursor': 'inherit',
            '--kul-card-zindex': 900,
            '--kul-drawer-zindex': 900,
            '--kul-header-zindex': 900,
        },
        isDark: false,
        icons: {
            '--kul-ascending-icon': 'arrow_drop_up',
            '--kul-descending-icon': 'arrow_drop_down',
            '--kul-expanded-icon': 'arrow_drop_down',
            '--kul-collapsed-icon': 'menu-right',
            '--kul-dropdown-icon': 'arrow_drop_down',
            '--kul-clear-icon': 'cancel',
            '--kul-filter-remove-icon': 'filter-remove',
            '--kul-key-icon': 'key-variant',
            '--kul-search-icon': 'search',
            '--kul-warning-icon': 'warning',
        },
        imports: [
            "url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400&display=swap')",
        ],
    },
    ocean: {
        cssVariables: {
            '--kul-primary-color': '#0081c5',
            '--kul-secondary-color': '#3a8ede',
            '--kul-background-color': '#ffffff',
            '--kul-header-background-color': '#001d3e',
            '--kul-header-color': '#ffffff',
            '--kul-drawer-background-color': '#e6f1ff',
            '--kul-drawer-color': '#1b1b1b',
            '--kul-header-height': '64px',
            '--kul-drawer-width': '300px',
            '--kul-font-family': 'Open Sans Condensed, sans-serif',
            '--kul-font-family-monospace': 'Roboto Mono, consolas, monospace',
            '--kul-font-size': '16px',
            '--kul-text-color': '#1b1b1b',
            '--kul-text-on-primary-color': '#ffffff',
            '--kul-text-on-secondary-color': '#ffffff',
            '--kul-disabled-background-color': '#eaeaea',
            '--kul-disabled-color': '#5c5c5c',
            '--kul-title-background-color': '#f1f3f4',
            '--kul-title-color': '#1b1b1b',
            '--kul-icon-color': '#505050',
            '--kul-border-color': '#e0e0e0',
            '--kul-box-shadow': '0px 0px 7.5px 0px rgba(128, 128, 128, 0.5)',
            '--kul-info-color': '#2592df',
            '--kul-success-color': '#4d9f02',
            '--kul-warning-color': '#ffc107',
            '--kul-danger-color': '#d91e18',
            '--kul-spinner-color': '#6edeff',
            '--kul-chart-color-1': '#60c3fc',
            '--kul-chart-color-2': '#e268d8',
            '--kul-chart-color-3': '#e48b47',
            '--kul-chart-color-4': '#81e447',
            '--kul-obj-cursor': 'inherit',
            '--kul-card-zindex': 900,
            '--kul-drawer-zindex': 900,
            '--kul-header-zindex': 900,
        },
        isDark: false,
        icons: {
            '--kul-ascending-icon': 'arrow_drop_up',
            '--kul-descending-icon': 'arrow_drop_down',
            '--kul-expanded-icon': 'arrow_drop_down',
            '--kul-collapsed-icon': 'menu-right',
            '--kul-dropdown-icon': 'arrow_drop_down',
            '--kul-clear-icon': 'cancel',
            '--kul-filter-remove-icon': 'filter-remove',
            '--kul-key-icon': 'key-variant',
            '--kul-search-icon': 'search',
            '--kul-warning-icon': 'warning',
        },
        imports: [
            "url('https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@300;700&display=swap')",
        ],
    },
    print: {
        cssVariables: {
            '--kul-primary-color': '#000000',
            '--kul-secondary-color': '#cccccc',
            '--kul-background-color': '#ffffff',
            '--kul-header-background-color': '#000000',
            '--kul-header-color': '#ffffff',
            '--kul-drawer-background-color': '#ffffff',
            '--kul-drawer-color': '#000000',
            '--kul-header-height': '64px',
            '--kul-drawer-width': '300px',
            '--kul-font-family': 'Arial, Helvetica, sans-serif',
            '--kul-font-family-monospace': 'Courier New, Courier, monospace',
            '--kul-font-size': '13px',
            '--kul-text-color': '#000000',
            '--kul-text-on-primary-color': '#ffffff',
            '--kul-text-on-secondary-color': '#000000',
            '--kul-disabled-background-color': '#ffffff',
            '--kul-disabled-color': '#000000',
            '--kul-title-background-color': '#f1f1f1',
            '--kul-title-color': '#000000',
            '--kul-icon-color': '#9d9d9d',
            '--kul-border-color': '#ededed',
            '--kul-box-shadow': 'rgba(0, 0, 0, 0.2) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px',
            '--kul-info-color': '#2592df',
            '--kul-success-color': '#4d9f02',
            '--kul-warning-color': '#ffc107',
            '--kul-danger-color': '#A6192E',
            '--kul-spinner-color': '#eaa710',
            '--kul-chart-color-1': '#735DED',
            '--kul-chart-color-2': '#00B2CB',
            '--kul-chart-color-3': '#EDC900',
            '--kul-chart-color-4': 'green',
            '--kul-chart-color-5': 'yellow',
            '--kul-chart-color-6': 'cyan',
            '--kul-chart-color-7': 'brown',
            '--kul-chart-color-8': 'magenta',
            '--kul-chart-color-9': 'grey',
            '--kul-chart-color-10': 'indigo',
            '--kul-obj-cursor': 'inherit',
            '--kul-card-zindex': 900,
            '--kul-drawer-zindex': 900,
            '--kul-header-zindex': 900,
        },
        isDark: false,
        customStyles: {
            MASTER: '#kul-component #global-filter {\ndisplay: none;\n}\n\n',
            'kul-BOX': '#kul-component #box-container .box-wrapper .box:hover {\nbox-shadow: none;\n}\n\n#kul-component #box-container .box-wrapper .box.selected {\nbackground-color: inherit;\n}',
            'kul-BUTTON': ':host(:not(.printable)) {\ndisplay: none;\n}\n\n',
            'kul-CARD': '',
            'kul-DATA-TABLE': '#kul-component sticky-header {\ndisplay: none;\n}\n\n#kul-component kul-paginator {\ndisplay: none;\n}\n\n:host(.cross-selection) #kul-component table tr.selected td.selected, \n#kul-component table td.selected, #kul-component tr.selected td {\nbackground-color: inherit;\nbackground-image: none;\n}\n\n#kul-component table,\n#kul-component .below-wrapper {\noverflow: hidden !important;\n}\n\n:host(.cross-selection) #kul-component tr.selected td:first-of-type,\n:host(.cross-selection) #kul-component th.selected { \nbox-shadow: none !important;\n}\n\n:host(.cross-selection) #kul-component table td.selected,\n:host(.cross-selection) #kul-component table tr.selected td {\nbackground-color: inherit;\n}\n\n:host(.cross-selection) #kul-component table tr.selected td.fixed-column.selected,\n:host(.cross-selection) #kul-component table td.selected.fixed-column, \n:host(.cross-selection) #kul-component table td.selected.fixed-row,\n:host(.cross-selection) #kul-component table tr.selected td.fixed-column, \n:host(.cross-selection) #kul-component table tr.selected td.fixed-row {\nbackground-color: inherit;\nbackground-image: none;\n}\n\n',
            'kul-FAMILY-TREE': '#kul-component .family-tree__item__expand {\ndisplay: none;\n}\n\n',
            'kul-PROGRESS-BAR': '#kul-component .progress-bar {\nbackground: #e7e7e7;\n}\n\n#kul-component .progress-bar-percentage span {\ntext-shadow: 0px 0px 0px hsl(0deg 0% 100%);\n}\n\n',
            'kul-TREE': '#kul-component .wrapper {\noverflow: hidden;\n}\n\n#kul-component tr.mdc-ripple-surface::before, \n#kul-component tr.mdc-ripple-surface::after,\n#kul-component td.mdc-ripple-surface::before, \n#kul-component td.mdc-ripple-surface::after,\n#kul-component .kul-tree__node--selected:not(.kul-tree__node--disabled) td {\nbackground-color: var(--kul-background-color);\n}',
        },
        icons: {
            '--kul-ascending-icon': 'arrow_drop_up',
            '--kul-descending-icon': 'arrow_drop_down',
            '--kul-expanded-icon': 'arrow_drop_down',
            '--kul-collapsed-icon': 'menu-right',
            '--kul-dropdown-icon': 'arrow_drop_down',
            '--kul-clear-icon': 'cancel',
            '--kul-filter-remove-icon': 'filter-remove',
            '--kul-key-icon': 'key-variant',
            '--kul-search-icon': 'search',
            '--kul-warning-icon': 'warning',
        },
    },
    raj: {
        cssVariables: {
            '--kul-primary-color': 'rgb(187, 198, 5)',
            '--kul-secondary-color': '#ffe600',
            '--kul-background-color': '#000000',
            '--kul-header-background-color': '#000000',
            '--kul-header-color': '#ffffff',
            '--kul-drawer-background-color': '#000000',
            '--kul-drawer-color': '#ffffff',
            '--kul-header-height': '64px',
            '--kul-drawer-width': '300px',
            '--kul-font-family': "'Rajdhani', sans-serif",
            '--kul-font-family-monospace': 'Roboto Mono, consolas, monospace',
            '--kul-font-size': '15px',
            '--kul-text-color': '#ffffff',
            '--kul-text-on-primary-color': '#000000',
            '--kul-text-on-secondary-color': '#000000',
            '--kul-disabled-background-color': '#151515',
            '--kul-disabled-color': '#7b7b7b',
            '--kul-title-background-color': '#ffe600',
            '--kul-title-color': '#000000',
            '--kul-icon-color': '#9d9d9d',
            '--kul-border-color': '#9d9d9d',
            '--kul-box-shadow': '0px 0px 7.5px 0px rgba(128, 128, 128, 0.5)',
            '--kul-info-color': '#2592df',
            '--kul-success-color': '#4d9f02',
            '--kul-warning-color': '#ffc107',
            '--kul-danger-color': '#d91e18',
            '--kul-spinner-color': '#ffe600',
            '--kul-chart-color-1': '#ffffff',
            '--kul-chart-color-2': 'rgb(187, 198, 5)',
            '--kul-chart-color-3': '#ffe600',
            '--kul-chart-color-4': '#effd02',
            '--kul-obj-cursor': 'inherit',
            '--kul-card-zindex': 900,
            '--kul-drawer-zindex': 900,
            '--kul-header-zindex': 900,
        },
        isDark: true,
        icons: {
            '--kul-ascending-icon': 'sort-ascending',
            '--kul-descending-icon': 'sort-descending',
            '--kul-expanded-icon': 'chevron-down',
            '--kul-collapsed-icon': 'chevron_right',
            '--kul-dropdown-icon': 'chevron-down',
            '--kul-clear-icon': 'cancel',
            '--kul-filter-remove-icon': 'filter-remove',
            '--kul-key-icon': 'key-variant',
            '--kul-search-icon': 'search',
            '--kul-warning-icon': 'warning',
        },
        imports: [
            "url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600&display=swap')",
        ],
    },
    red: {
        cssVariables: {
            '--kul-primary-color': '#a6192e',
            '--kul-secondary-color': '#ffc107',
            '--kul-background-color': '#ffffff',
            '--kul-header-background-color': '#a6192e',
            '--kul-header-color': '#ffffff',
            '--kul-drawer-background-color': '#f5f5f5',
            '--kul-drawer-color': '#000000',
            '--kul-header-height': '64px',
            '--kul-drawer-width': '300px',
            '--kul-font-family': 'Open Sans, arial, helvatica',
            '--kul-font-family-monospace': 'Roboto Mono, consolas, monospace',
            '--kul-font-size': '13px',
            '--kul-text-color': '#000000',
            '--kul-text-on-primary-color': '#ffffff',
            '--kul-text-on-secondary-color': '#ffffff',
            '--kul-disabled-background-color': '#eaeaea',
            '--kul-disabled-color': '#333333',
            '--kul-title-background-color': '#f1f3f4',
            '--kul-title-color': '#2e2e2e',
            '--kul-icon-color': '#808080',
            '--kul-border-color': '#ededed',
            '--kul-box-shadow': 'rgba(0, 0, 0, 0.2) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px',
            '--kul-info-color': '#2592df',
            '--kul-success-color': '#4d9f02',
            '--kul-warning-color': '#ffc107',
            '--kul-danger-color': '#A6192E',
            '--kul-spinner-color': '#1D1D1B',
            '--kul-chart-color-1': '#735DED',
            '--kul-chart-color-2': '#00B2CB',
            '--kul-chart-color-3': '#EDC900',
            '--kul-chart-color-4': '#a6192e',
            '--kul-chart-color-5': 'yellow',
            '--kul-chart-color-6': 'cyan',
            '--kul-chart-color-7': 'brown',
            '--kul-chart-color-8': 'magenta',
            '--kul-chart-color-9': 'grey',
            '--kul-chart-color-10': 'indigo',
            '--kul-obj-cursor': 'inherit',
            '--kul-card-zindex': 900,
            '--kul-drawer-zindex': 900,
            '--kul-header-zindex': 900,
        },
        isDark: false,
        icons: {
            '--kul-ascending-icon': 'arrow_drop_up',
            '--kul-descending-icon': 'arrow_drop_down',
            '--kul-expanded-icon': 'arrow_drop_down',
            '--kul-collapsed-icon': 'menu-right',
            '--kul-dropdown-icon': 'arrow_drop_down',
            '--kul-clear-icon': 'cancel',
            '--kul-filter-remove-icon': 'filter-remove',
            '--kul-key-icon': 'key-variant',
            '--kul-search-icon': 'search',
            '--kul-warning-icon': 'warning',
        },
        customStyles: {},
        imports: [
            "url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400&display=swap')",
        ],
    },
    sapphire: {
        cssVariables: {
            '--kul-primary-color': '#003b77',
            '--kul-secondary-color': '#ff1414',
            '--kul-background-color': '#ffffff',
            '--kul-header-background-color': '#003b77',
            '--kul-header-color': '#ffffff',
            '--kul-drawer-background-color': '#002244',
            '--kul-drawer-color': '#ffffff',
            '--kul-header-height': '64px',
            '--kul-drawer-width': '20em',
            '--kul-font-family': 'Arial',
            '--kul-font-family-monospace': 'Arial',
            '--kul-font-size': '13px',
            '--kul-text-color': '#333333',
            '--kul-text-on-primary-color': '#fafafa',
            '--kul-text-on-secondary-color': '#ffffff',
            '--kul-disabled-background-color': '#ddecf8',
            '--kul-disabled-color': '#333333',
            '--kul-title-background-color': '#003b77',
            '--kul-title-color': '#ffffff',
            '--kul-icon-color': '#808080',
            '--kul-border-color': '#93c4ec',
            '--kul-box-shadow': 'rgba(0, 0, 0, 0.2) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px',
            '--kul-info-color': '#2592df',
            '--kul-success-color': '#4d9f02',
            '--kul-warning-color': '#ffc107',
            '--kul-danger-color': '#a94442',
            '--kul-spinner-color': '#003b77',
            '--kul-chart-color-1': '#0781fd',
            '--kul-chart-color-2': '#002244',
            '--kul-chart-color-3': '#c6cff8',
            '--kul-chart-color-4': '#66bdda',
            '--kul-chart-color-5': 'yellow',
            '--kul-chart-color-6': 'cyan',
            '--kul-chart-color-7': 'brown',
            '--kul-chart-color-8': 'magenta',
            '--kul-chart-color-9': 'grey',
            '--kul-chart-color-10': 'indigo',
            '--kul-obj-cursor': 'inherit',
            '--kul-card-zindex': 900,
            '--kul-drawer-zindex': 900,
            '--kul-header-zindex': 900,
        },
        isDark: false,
        icons: {
            '--kul-ascending-icon': 'arrow_drop_up',
            '--kul-descending-icon': 'arrow_drop_down',
            '--kul-expanded-icon': 'arrow_drop_down',
            '--kul-collapsed-icon': 'menu-right',
            '--kul-dropdown-icon': 'arrow_drop_down',
            '--kul-clear-icon': 'cancel',
            '--kul-filter-remove-icon': 'filter-remove',
            '--kul-key-icon': 'key-variant',
            '--kul-search-icon': 'search',
            '--kul-warning-icon': 'warning',
        },
        customStyles: {
            'kul-DATA-TABLE': '#kul-component th { --kul_datatable_th_border: none; font-weight: normal; }',
        },
    },
    silver: {
        cssVariables: {
            '--kul-primary-color': '#c0c0c0',
            '--kul-secondary-color': '#c0c0c0',
            '--kul-background-color': '#000000',
            '--kul-header-background-color': '#ffffff',
            '--kul-header-color': '#000000',
            '--kul-drawer-background-color': '#ffffff',
            '--kul-drawer-color': '#000000',
            '--kul-header-height': '80px',
            '--kul-drawer-width': '320px',
            '--kul-font-family': 'Oswald, sans-serif',
            '--kul-font-family-monospace': 'Xanh Mono, monospace',
            '--kul-font-size': '16px',
            '--kul-text-color': '#fefefe',
            '--kul-text-on-primary-color': '#4a4a4a',
            '--kul-text-on-secondary-color': '#4a4a4a',
            '--kul-disabled-background-color': '#3c3c3c',
            '--kul-disabled-color': '#7e7e7e',
            '--kul-title-background-color': '#151515',
            '--kul-title-color': '#d9d9d9',
            '--kul-icon-color': '#c0c0c0',
            '--kul-border-color': '#c0c0c0',
            '--kul-box-shadow': '0px 0px 7.5px 0px rgba(128, 128, 128, 0.5)',
            '--kul-info-color': '#2592df',
            '--kul-success-color': '#4d9f02',
            '--kul-warning-color': '#ffc107',
            '--kul-danger-color': '#d91e18',
            '--kul-spinner-color': '#c0c0c0',
            '--kul-chart-color-1': '#ffffff',
            '--kul-chart-color-2': '#979797',
            '--kul-chart-color-3': '#bababa',
            '--kul-chart-color-4': '#000000',
            '--kul-chart-color-5': '#b35454',
            '--kul-chart-color-6': '#59af57',
            '--kul-chart-color-7': '#aeaa5d',
            '--kul-obj-cursor': 'inherit',
            '--kul-card-zindex': 900,
            '--kul-drawer-zindex': 900,
            '--kul-header-zindex': 900,
        },
        isDark: true,
        icons: {
            '--kul-ascending-icon': 'arrow_drop_up',
            '--kul-descending-icon': 'arrow_drop_down',
            '--kul-expanded-icon': 'arrow_drop_down',
            '--kul-collapsed-icon': 'menu-right',
            '--kul-dropdown-icon': 'arrow_drop_down',
            '--kul-clear-icon': 'cancel',
            '--kul-filter-remove-icon': 'filter-remove',
            '--kul-key-icon': 'key-variant',
            '--kul-search-icon': 'search',
            '--kul-warning-icon': 'warning',
        },
        imports: [
            "url('https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&family=Xanh+Mono&display=swap')",
        ],
        customStyles: {},
    },
    teal: {
        cssVariables: {
            '--kul-primary-color': '#068A9C',
            '--kul-secondary-color': '#ffc107',
            '--kul-background-color': '#ffffff',
            '--kul-header-background-color': '#068A9C',
            '--kul-header-color': '#ffffff',
            '--kul-drawer-background-color': '#ffffff',
            '--kul-drawer-color': '#000000',
            '--kul-header-height': '64px',
            '--kul-drawer-width': '300px',
            '--kul-font-family': 'Roboto, sans-serif',
            '--kul-font-family-monospace': 'Roboto Mono, consolas, monospace',
            '--kul-font-size': '13px',
            '--kul-text-color': '#000000',
            '--kul-text-on-primary-color': '#ffffff',
            '--kul-text-on-secondary-color': '#ffffff',
            '--kul-disabled-background-color': '#eaeaea',
            '--kul-disabled-color': '#333333',
            '--kul-title-background-color': '#f1f3f4',
            '--kul-title-color': '#2e2e2e',
            '--kul-icon-color': '#808080',
            '--kul-border-color': '#ededed',
            '--kul-box-shadow': 'rgba(0, 0, 0, 0.2) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px',
            '--kul-info-color': '#2592df',
            '--kul-success-color': '#4d9f02',
            '--kul-warning-color': '#ffc107',
            '--kul-danger-color': '#A6192E',
            '--kul-spinner-color': '#eaa710',
            '--kul-chart-color-1': '#068A9C',
            '--kul-chart-color-2': '#009643',
            '--kul-chart-color-3': '#EDC900',
            '--kul-chart-color-4': '#188F00',
            '--kul-chart-color-5': '#758700',
            '--kul-chart-color-6': '#7D2F00',
            '--kul-chart-color-7': '#710008',
            '--kul-chart-color-8': '#640056',
            '--kul-chart-color-9': '#1C0056',
            '--kul-chart-color-10': '#000046',
            '--kul-obj-cursor': 'inherit',
            '--kul-card-zindex': 900,
            '--kul-drawer-zindex': 900,
            '--kul-header-zindex': 900,
        },
        isDark: false,
        icons: {
            '--kul-ascending-icon': 'arrow_drop_up',
            '--kul-descending-icon': 'arrow_drop_down',
            '--kul-expanded-icon': 'arrow_drop_down',
            '--kul-collapsed-icon': 'menu-right',
            '--kul-dropdown-icon': 'arrow_drop_down',
            '--kul-clear-icon': 'cancel',
            '--kul-filter-remove-icon': 'filter-remove',
            '--kul-key-icon': 'key-variant',
            '--kul-search-icon': 'search',
            '--kul-warning-icon': 'warning',
        },
    },
    wildlife: {
        cssVariables: {
            '--kul-primary-color': '#0fa918',
            '--kul-secondary-color': '#739f5a',
            '--kul-background-color': '#ffffff',
            '--kul-header-background-color': '#095a1f',
            '--kul-header-color': '#ffffff',
            '--kul-drawer-background-color': '#dbfbd5',
            '--kul-drawer-color': '#000000',
            '--kul-header-height': '64px',
            '--kul-drawer-width': '300px',
            '--kul-font-family': 'Abel, sans-serif',
            '--kul-font-family-monospace': 'Roboto Mono, consolas, monospace',
            '--kul-font-size': '16px',
            '--kul-text-color': '#000000',
            '--kul-text-on-primary-color': '#ffffff',
            '--kul-text-on-secondary-color': '#ffffff',
            '--kul-disabled-background-color': '#eaeaea',
            '--kul-disabled-color': '#5c5c5c',
            '--kul-title-background-color': '#f1f3f4',
            '--kul-title-color': '#000000',
            '--kul-icon-color': '#333333',
            '--kul-border-color': '#e0e0e0',
            '--kul-box-shadow': '0px 0px 7.5px 0px rgba(128, 128, 128, 0.5)',
            '--kul-info-color': '#2592df',
            '--kul-success-color': '#4d9f02',
            '--kul-warning-color': '#ffc107',
            '--kul-danger-color': '#d91e18',
            '--kul-spinner-color': '#44b383',
            '--kul-chart-color-1': '#60c3fc',
            '--kul-chart-color-2': '#e268d8',
            '--kul-chart-color-3': '#e48b47',
            '--kul-chart-color-4': '#81e447',
            '--kul-obj-cursor': 'inherit',
            '--kul-card-zindex': 900,
            '--kul-drawer-zindex': 900,
            '--kul-header-zindex': 900,
        },
        isDark: false,
        icons: {
            '--kul-ascending-icon': 'arrow_drop_up',
            '--kul-descending-icon': 'arrow_drop_down',
            '--kul-expanded-icon': 'arrow_drop_down',
            '--kul-collapsed-icon': 'menu-right',
            '--kul-dropdown-icon': 'arrow_drop_down',
            '--kul-clear-icon': 'cancel',
            '--kul-filter-remove-icon': 'filter-remove',
            '--kul-key-icon': 'key-variant',
            '--kul-search-icon': 'search',
            '--kul-warning-icon': 'warning',
        },
        imports: [
            "url('https://fonts.googleapis.com/css2?family=Abel&display=swap')",
        ],
    },
};

const dom$1 = document.documentElement;
/**
 * Theme manager, handles everything about theming, kulStyles and color utilities.
 * @module KulTheme
 */
class KulTheme {
    cssVars;
    isDarkTheme;
    list;
    managedComponents;
    name;
    styleTag;
    /**
     * Initializes KulTheme.
     */
    constructor(list, name) {
        this.cssVars = {};
        this.list = list ? list : themesJson;
        this.managedComponents = new Set();
        this.name = name ? name : 'silver';
        this.styleTag = dom$1
            .querySelector('head')
            .appendChild(document.createElement('style'));
    }
    /**
     * Sets the CSS variables of the theme.
     */
    imports() {
        const imports = this.list[this.name].imports
            ? this.list[this.name].imports
            : [];
        let css = '';
        for (let index = 0; index < imports.length; index++) {
            css += '@import ' + imports[index] + ';';
        }
        return css;
    }
    /**
     * Sets the CSS variables of the theme.
     */
    cssVariables() {
        const variables = this.list[this.name].cssVariables;
        let css = '';
        for (let key in variables) {
            if (variables.hasOwnProperty(key)) {
                const val = variables[key];
                this.cssVars[key] = val;
                css += key + ': ' + val + ';';
                if (key.indexOf('color') > -1) {
                    const computedColor = this.colorCheck(val);
                    const rgbKey = key + '-rgb';
                    const hKey = key + '-h';
                    const sKey = key + '-s';
                    const lKey = key + '-l';
                    const rgbVal = computedColor.rgbValues;
                    const hue = computedColor.hue;
                    const saturation = computedColor.saturation;
                    const lightness = computedColor.lightness;
                    this.cssVars[rgbKey] = rgbVal;
                    this.cssVars[hKey] = hue;
                    this.cssVars[lKey] = lightness;
                    this.cssVars[sKey] = saturation;
                    css += rgbKey + ': ' + rgbVal + ';';
                    css += hKey + ': ' + hue + ';';
                    css += lKey + ': ' + lightness + ';';
                    css += sKey + ': ' + saturation + ';';
                }
            }
        }
        return css;
    }
    /**
     * Sets the icon variables of the theme.
     */
    icons() {
        const icons = this.list[this.name].icons;
        let css = '';
        for (var key in icons) {
            if (icons.hasOwnProperty(key)) {
                const val = `url('${getAssetPath(`./assets/svg/${icons[key]}.svg`)}') no-repeat center`;
                this.cssVars[key] = val;
                css += key + ': ' + val + ';';
            }
        }
        return css;
    }
    /**
     * Refreshed managed components to apply theme kulStyles.
     */
    customStyle() {
        this.managedComponents.forEach(function (comp) {
            if (comp.rootElement.isConnected) {
                comp.refresh();
            }
        });
    }
    /**
     * Sets the theme using this.name or the function's argument.
     * @param {string} name - When present, this theme will be set.
     */
    set(name, list) {
        if (name) {
            this.name = name;
        }
        if (list) {
            this.list = list;
        }
        dom$1.ketchupLite.debug.logMessage('theme manager', 'Setting theme to: ' + this.name + '.');
        if (!this.list[this.name]) {
            dom$1.ketchupLite.debug.logMessage('theme manager', 'Invalid theme name, falling back to default ("silver").');
            this.name = 'silver';
        }
        this.isDarkTheme = this.list[this.name].isDark;
        this.cssVars = {};
        this.styleTag.innerText =
            this.imports() +
                ' :root[kul-theme="' +
                this.name +
                '"]{' +
                this.cssVariables() +
                this.icons() +
                '}';
        this.customStyle();
        document.documentElement.setAttribute('kul-theme', this.name);
        if (this.isDarkTheme) {
            document.documentElement.removeAttribute('kul-light-theme');
            document.documentElement.setAttribute('kul-dark-theme', '');
        }
        else {
            document.documentElement.removeAttribute('kul-dark-theme');
            document.documentElement.setAttribute('kul-light-theme', '');
        }
        document.dispatchEvent(new CustomEvent('kul-theme-change'));
    }
    /**
     * Gets the name of available themes.
     * @returns {Array<string>} Array of themes' names.
     */
    getThemes() {
        const themes = [];
        for (var key in this.list) {
            if (this.list.hasOwnProperty(key)) {
                themes.push(key);
            }
        }
        return themes;
    }
    /**
     * This method will just refresh the current theme.
     */
    refresh() {
        try {
            this.styleTag.innerText =
                ':root[kul-theme="' +
                    this.name +
                    '"]{' +
                    this.cssVariables() +
                    this.icons() +
                    '}';
            this.customStyle();
            dom$1.ketchupLite.debug.logMessage('kul-theme', 'Theme ' + dom$1.getAttribute('kul-theme') + ' refreshed.');
            document.dispatchEvent(new CustomEvent('kul-theme-refresh'));
        }
        catch (error) {
            dom$1.ketchupLite.debug.logMessage('kul-theme', 'Theme not refreshed.', 'warning');
        }
    }
    /**
     * Ripple effect utility for DOM elements. It allows the addition of the ripple effect on elements triggered by pointer events.
     */
    ripple = {
        /**
         * Adds a ripple effect to the specified HTML element by adding a specific class.
         * @param {HTMLElement} el - The element to which the ripple effect will be applied.
         */
        setup: (el) => {
            el.classList.add(RIPPLE_SURFACE_CLASS);
            el.dataset.cy = 'ripple';
        },
        /**
         * Triggers the ripple effect on the specified element based on the location of a pointer event.
         * @param {PointerEvent} e - The pointer event that triggers the ripple effect.
         * @param {HTMLElement} el - The element on which the ripple effect is to be applied.
         */
        trigger: (e, el) => {
            const rect = el.getBoundingClientRect();
            const parent = el.parentElement;
            const ripple = document.createElement('span');
            const parentComputedStyle = getComputedStyle(parent);
            const rippleX = e.clientX - rect.left - rect.width / 2;
            const rippleY = e.clientY - rect.top - rect.height / 2;
            el.style.borderRadius = parentComputedStyle.borderRadius;
            ripple.classList.add('ripple');
            ripple.style.width = `${rect.width}px`;
            ripple.style.height = `${rect.height}px`;
            ripple.style.background = parentComputedStyle.color;
            ripple.style.opacity = '0.225';
            ripple.style.left = `${rippleX}px`;
            ripple.style.top = `${rippleY}px`;
            el.appendChild(ripple);
            setTimeout(() => {
                ripple.remove();
            }, 500);
        },
    };
    /**
     * Registers a KulComponent in KulTheme, in order to be properly refreshed whenever the theme changes.
     * @param {any} comp - The component calling this function.
     */
    register(comp) {
        this.managedComponents.add(comp.rootElement ? comp.rootElement : comp);
    }
    /**
     * Unregisters a KulComponent, so it won't be refreshed when the theme changes.
     * @param {any} comp - The component calling this function.
     */
    unregister(comp) {
        if (this.managedComponents) {
            this.managedComponents.delete(comp.rootElement ? comp.rootElement : comp);
        }
    }
    /**
     * Combines global (style every component should have), theme's and component's customStyles, returning the result.
     * @param comp - The component calling this function.
     * @returns {string} Combined customStyle.
     */
    setKulStyle(comp) {
        const styles = this.list[this.name].customStyles;
        let completeStyle = '';
        if (styles && styles[masterCustomStyle]) {
            completeStyle += styles[masterCustomStyle];
        }
        if (styles && styles[comp.rootElement.tagName]) {
            completeStyle += ' ' + styles[comp.rootElement.tagName];
        }
        if (comp.kulStyle) {
            completeStyle += ' ' + comp.kulStyle;
        }
        return completeStyle ? completeStyle : null;
    }
    /**
     * Checks whether on a given color the text should be white or black.
     * @param {string} color - Color used to check the contrast.
     * @returns {string} "white" or "black".
     */
    colorContrast(color) {
        color = this.colorCheck(color).rgbColor;
        const colorValues = color.replace(/[^\d,.]/g, '').split(',');
        const brightness = Math.round((parseInt(colorValues[0]) * 299 +
            parseInt(colorValues[1]) * 587 +
            parseInt(colorValues[2]) * 114) /
            1000);
        return brightness > 125 ? 'black' : 'white';
    }
    /**
     * Generates a random HEX color.
     * @param {number} brightness - Brightness of the color generated (0-255).
     * @returns {string} Random HEX color.
     */
    randomColor(brightness) {
        function randomChannel(brightness) {
            var r = 255 - brightness;
            var n = 0 | (Math.random() * r + brightness);
            var s = n.toString(16);
            return s.length == 1 ? '0' + s : s;
        }
        return ('#' +
            randomChannel(brightness) +
            randomChannel(brightness) +
            randomChannel(brightness));
    }
    /**
     * Sets a random theme between those specified in this.list (excludes "print" and "test") and different from the currently used one.
     */
    randomTheme() {
        let themes = [];
        for (var key in this.list) {
            if (this.list.hasOwnProperty(key)) {
                if (key !== 'test' && key !== 'print') {
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
            dom$1.ketchupLite.debug.logMessage('kul-theme', "Couldn't set a random theme: no themes available!", 'warning');
        }
    }
    /**
     * Returns HEX, RGB, HSL, HSL values and RGB values from a given color.
     * @param {string} color - Input color.
     * @returns {KulThemeColor} Object of color values: hexColor ("#ffffff"), hslColor ("hsl(255,100%,100%)"), hslValues ("255,100%,100%"), rgbColor ("rgb(255,255,255)") and rgbValues ("255,255,255").
     */
    colorCheck(color) {
        //Testing whether the color is transparent, if it is a fall back value will be returned matching the background-color
        if (color === 'transparent') {
            color = this.cssVars['--kul-background-color'];
            dom$1.ketchupLite.debug.logMessage('theme manager', 'Received TRANSPARENT color, converted to ' +
                color +
                ' (theme background).');
        }
        const altRgbRe = /R(\d{1,3})G(\d{1,3})B(\d{1,3})/;
        const altRgb = altRgbRe.test(color);
        if (altRgb) {
            const parts = color.match(altRgbRe);
            color = 'rgb(' + parts[1] + ',' + parts[2] + ',' + parts[3] + ')';
        }
        let isHex = color.substring(0, 1) === '#';
        const isHsl = color.substring(0, 3).toLowerCase() === 'hsl';
        const isRgb = color.substring(0, 3).toLowerCase() === 'rgb';
        //If true, supposedly it's a code word
        if (!isHex && !isHsl && !isRgb) {
            const oldColor = color;
            color = this.codeToHex(color);
            isHex = color.substring(0, 1) === '#' ? true : false;
            dom$1.ketchupLite.debug.logMessage('theme manager', 'Received CODE NAME color ' +
                oldColor +
                ', converted to ' +
                color +
                '.');
        }
        //Testing whether the color is "hex" value or "hsl"
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
                hslValues = hsl[0] + ',' + hsl[1] + ',' + hsl[2];
                hue = hsl[0];
                saturation = hsl[2];
                lightness = hsl[1];
                const h = parseInt(hue.replace('deg', ''));
                const s = parseInt(saturation.replace('%', '')) / 100;
                const l = parseInt(lightness.replace('%', '')) / 100;
                rgbColorObj = this.hslToRgb(h, s, l);
            }
            try {
                color =
                    'rgb(' +
                        rgbColorObj.r +
                        ',' +
                        rgbColorObj.g +
                        ',' +
                        rgbColorObj.b +
                        ')';
                if (isHex) {
                    const hsl = this.rgbToHsl(rgbColorObj.r, rgbColorObj.g, rgbColorObj.b);
                    hue = hsl.h.toString();
                    saturation = hsl.s.toString() + '%';
                    lightness = hsl.l.toString() + '%';
                    hslValues = hue + ',' + saturation + ',' + lightness;
                    hslColor = 'hsl(' + hslValues + ')';
                }
                else {
                    hexColor = this.rgbToHex(rgbColorObj.r, rgbColorObj.g, rgbColorObj.b);
                }
                dom$1.ketchupLite.debug.logMessage('theme-manager', 'Received HEX color ' +
                    oldColor +
                    ', converted to ' +
                    color +
                    '.');
            }
            catch (error) {
                dom$1.ketchupLite.debug.logMessage('theme-manager', 'Invalid color: ' + color + '.');
            }
        }
        let rgbValues = null;
        const values = color.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/);
        try {
            rgbValues = values[1] + ',' + values[2] + ',' + values[3];
            rgbColor = color;
        }
        catch (error) {
            dom$1.ketchupLite.debug.logMessage('theme-manager', 'Color not converted to rgb values: ' + color + '.');
        }
        if (!hexColor) {
            try {
                hexColor = this.rgbToHex(parseInt(values[1]), parseInt(values[2]), parseInt(values[3]));
            }
            catch (error) {
                dom$1.ketchupLite.debug.logMessage('theme-manager', 'Color not converted to hex value: ' + color + '.');
            }
        }
        if (!hslColor || !hslValues) {
            try {
                const hsl = this.rgbToHsl(parseInt(values[1]), parseInt(values[2]), parseInt(values[3]));
                hue = hsl.h.toString();
                saturation = hsl.s.toString() + '%';
                lightness = hsl.l.toString() + '%';
                hslValues = hsl.h + ',' + hsl.s + '%,' + hsl.l + '%';
                hslColor = 'hsl(' + hsl.h + ',' + hsl.s + '%,' + hsl.l + '%)';
            }
            catch (error) {
                dom$1.ketchupLite.debug.logMessage('theme-manager', 'Color not converted to hex value: ' + color + '.');
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
    }
    /**
     * Converts an HEX color to its RGB values.
     * @param {string} hex - Hex code.
     * @returns {KulThemeRGBValues} Object containing RGB values.
     */
    hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16),
            }
            : null;
    }
    /**
     * Converts an HSL color to its RGB values.
     * @param {number} h - Hue (range [0, 360)).
     * @param {number} s - Saturation (range [0, 1)).
     * @param {number} l - Lightness (range [0, 1)).
     * @returns {Array} RGB values.
     */
    hslToRgb(h, s, l) {
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
    }
    /**
     * Converts a color in RGB format to the corresponding HEX color.
     * @param {number} r - Red channel value.
     * @param {number} g - Green channel value.
     * @param {number} b - Blue channel value.
     * @returns {string} HEX color.
     */
    rgbToHex(r, g, b) {
        return ('#' + this.valueToHex(r) + this.valueToHex(g) + this.valueToHex(b));
    }
    /**
     * Converts a color in RGB format to the corresponding HSL color.
     * @param {number} r - Red channel value.
     * @param {number} g - Green channel value.
     * @param {number} b - Blue channel value.
     * @returns {KulThemeHSLValues} Object containing HSL values.
     */
    rgbToHsl(r, g, b) {
        // Make r, g, and b fractions of 1
        r /= 255;
        g /= 255;
        b /= 255;
        // Find greatest and smallest channel values
        const cmin = Math.min(r, g, b), cmax = Math.max(r, g, b), delta = cmax - cmin;
        let h = 0, s = 0, l = 0;
        // Calculate hue
        // No difference
        if (delta == 0)
            h = 0;
        // Red is max
        else if (cmax == r)
            h = ((g - b) / delta) % 6;
        // Green is max
        else if (cmax == g)
            h = (b - r) / delta + 2;
        // Blue is max
        else
            h = (r - g) / delta + 4;
        h = Math.round(h * 60);
        // Make negative hues positive behind 360°
        if (h < 0)
            h += 360;
        // Calculate lightness
        l = (cmax + cmin) / 2;
        // Calculate saturation
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
        // Multiply l and s by 100
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);
        return { h: h, s: s, l: l };
    }
    /**
     * Converts a single RGB value to the corresponding HEX value.
     * @param {number} c - Color value.
     * @returns {string} HEX value.
     */
    valueToHex(c) {
        const hex = c.toString(16);
        return hex.length == 1 ? '0' + hex : hex;
    }
    /**
     * Converts a color code word to the corresponding HEX value.
     * @param {string} color - Color code word.
     * @returns {string} HEX value.
     */
    codeToHex(color) {
        const colorCodes = {
            aliceblue: '#f0f8ff',
            antiquewhite: '#faebd7',
            aqua: '#00ffff',
            aquamarine: '#7fffd4',
            azure: '#f0ffff',
            beige: '#f5f5dc',
            bisque: '#ffe4c4',
            black: '#000000',
            blanchedalmond: '#ffebcd',
            blue: '#0000ff',
            blueviolet: '#8a2be2',
            brown: '#a52a2a',
            burlywood: '#deb887',
            cadetblue: '#5f9ea0',
            chartreuse: '#7fff00',
            chocolate: '#d2691e',
            coral: '#ff7f50',
            cornflowerblue: '#6495ed',
            cornsilk: '#fff8dc',
            crimson: '#dc143c',
            cyan: '#00ffff',
            darkblue: '#00008b',
            darkcyan: '#008b8b',
            darkgoldenrod: '#b8860b',
            darkgray: '#a9a9a9',
            darkgreen: '#006400',
            darkgrey: '#a9a9a9',
            darkkhaki: '#bdb76b',
            darkmagenta: '#8b008b',
            darkolivegreen: '#556b2f',
            darkorange: '#ff8c00',
            darkorchid: '#9932cc',
            darkred: '#8b0000',
            darksalmon: '#e9967a',
            darkseagreen: '#8fbc8f',
            darkslateblue: '#483d8b',
            darkslategray: '#2f4f4f',
            darkslategrey: '#2f4f4f',
            darkturquoise: '#00ced1',
            darkviolet: '#9400d3',
            deeppink: '#ff1493',
            deepskyblue: '#00bfff',
            dimgray: '#696969',
            dimgrey: '#696969',
            dodgerblue: '#1e90ff',
            firebrick: '#b22222',
            floralwhite: '#fffaf0',
            forestgreen: '#228b22',
            fuchsia: '#ff00ff',
            gainsboro: '#dcdcdc',
            ghostwhite: '#f8f8ff',
            goldenrod: '#daa520',
            gold: '#ffd700',
            gray: '#808080',
            green: '#008000',
            greenyellow: '#adff2f',
            grey: '#808080',
            honeydew: '#f0fff0',
            hotpink: '#ff69b4',
            indianred: '#cd5c5c',
            indigo: '#4b0082',
            ivory: '#fffff0',
            khaki: '#f0e68c',
            lavenderblush: '#fff0f5',
            lavender: '#e6e6fa',
            lawngreen: '#7cfc00',
            lemonchiffon: '#fffacd',
            lightblue: '#add8e6',
            lightcoral: '#f08080',
            lightcyan: '#e0ffff',
            lightgoldenrodyellow: '#fafad2',
            lightgray: '#d3d3d3',
            lightgreen: '#90ee90',
            lightgrey: '#d3d3d3',
            lightpink: '#ffb6c1',
            lightsalmon: '#ffa07a',
            lightseagreen: '#20b2aa',
            lightskyblue: '#87cefa',
            lightslategray: '#778899',
            lightslategrey: '#778899',
            lightsteelblue: '#b0c4de',
            lightyellow: '#ffffe0',
            lime: '#00ff00',
            limegreen: '#32cd32',
            linen: '#faf0e6',
            magenta: '#ff00ff',
            maroon: '#800000',
            mediumaquamarine: '#66cdaa',
            mediumblue: '#0000cd',
            mediumorchid: '#ba55d3',
            mediumpurple: '#9370db',
            mediumseagreen: '#3cb371',
            mediumslateblue: '#7b68ee',
            mediumspringgreen: '#00fa9a',
            mediumturquoise: '#48d1cc',
            mediumvioletred: '#c71585',
            midnightblue: '#191970',
            mintcream: '#f5fffa',
            mistyrose: '#ffe4e1',
            moccasin: '#ffe4b5',
            navajowhite: '#ffdead',
            navy: '#000080',
            oldlace: '#fdf5e6',
            olive: '#808000',
            olivedrab: '#6b8e23',
            orange: '#ffa500',
            orangered: '#ff4500',
            orchid: '#da70d6',
            palegoldenrod: '#eee8aa',
            palegreen: '#98fb98',
            paleturquoise: '#afeeee',
            palevioletred: '#db7093',
            papayawhip: '#ffefd5',
            peachpuff: '#ffdab9',
            peru: '#cd853f',
            pink: '#ffc0cb',
            plum: '#dda0dd',
            powderblue: '#b0e0e6',
            purple: '#800080',
            rebeccapurple: '#663399',
            red: '#ff0000',
            rosybrown: '#bc8f8f',
            royalblue: '#4169e1',
            saddlebrown: '#8b4513',
            salmon: '#fa8072',
            sandybrown: '#f4a460',
            seagreen: '#2e8b57',
            seashell: '#fff5ee',
            sienna: '#a0522d',
            silver: '#c0c0c0',
            skyblue: '#87ceeb',
            slateblue: '#6a5acd',
            slategray: '#708090',
            slategrey: '#708090',
            snow: '#fffafa',
            springgreen: '#00ff7f',
            steelblue: '#4682b4',
            tan: '#d2b48c',
            teal: '#008080',
            thistle: '#d8bfd8',
            tomato: '#ff6347',
            turquoise: '#40e0d0',
            violet: '#ee82ee',
            wheat: '#f5deb3',
            white: '#ffffff',
            whitesmoke: '#f5f5f5',
            yellow: '#ffff00',
            yellowgreen: '#9acd32',
        };
        if (colorCodes[color.toLowerCase()]) {
            return colorCodes[color.toLowerCase()];
        }
        else {
            dom$1.ketchupLite.debug.logMessage('theme manager', 'Could not decode color ' + color + '!');
            return color;
        }
    }
}

/**
 * Handles LLM operations.
 * @module KulLLM
 */
class KulLLM {
    async fetch(request, url) {
        try {
            const response = await fetch(`${url}/v1/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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
            console.error('Error calling LLM:', error);
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
            alert('Speech recognition is not supported in this browser.');
            return;
        }
        const recognition = new speechConstructor();
        recognition.lang = kulManager.language.getBCP47();
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;
        recognition.addEventListener('result', (event) => {
            const transcript = Array.from(event.results)
                .map((result) => result[0])
                .map((result) => result.transcript)
                .join('');
            kulManager.debug.logMessage('KulChat (stt)', 'STT response: ' + transcript);
            textarea.setValue(transcript);
            const isFinal = event.results[event.results.length - 1].isFinal;
            if (isFinal) {
                recognition.stop();
            }
        });
        recognition.addEventListener('end', () => {
            recognition.stop();
            button.kulShowSpinner = false;
        });
        recognition.addEventListener('start', () => {
            textarea.setFocus();
            button.kulShowSpinner = true;
        });
        try {
            recognition.start();
        }
        catch (err) {
            kulManager.debug.logMessage('KulLLM', 'Error: ' + err, 'error');
        }
    }
}

const dom = document.documentElement;
/**
 * This class controls every other Ketchup utility suite.
 * @module KulManager
 */
class KulManager {
    data;
    dates;
    debug;
    dynamicPosition;
    language;
    llm;
    math;
    overrides;
    resize;
    scrollOnHover;
    utilities;
    theme;
    constructor(overrides) {
        this.overrides = overrides ?? {};
        if (overrides?.assetsPath) {
            setAssetPath(overrides.assetsPath);
        }
        this.data = new KulData();
        this.dates = new KulDates(overrides?.dates?.locale ?? null);
        this.debug = new KulDebug(overrides?.debug?.active ?? null, overrides?.debug?.autoPrint ?? null, overrides?.debug?.logLimit ?? null);
        this.dynamicPosition = new KulDynamicPosition();
        this.language = new KulLanguage(overrides?.language?.list ?? null, overrides?.language?.name ?? null);
        this.llm = new KulLLM();
        this.math = new KulMath();
        this.scrollOnHover = new KulScrollOnHover(overrides?.scrollOnHover?.delay ?? null, overrides?.scrollOnHover?.step ?? null);
        this.theme = new KulTheme(overrides?.theme?.list ?? null, overrides?.theme?.name ?? null);
        this.utilities = {
            clickCallbacks: new Set(),
            lastPointerDownString: null,
        };
        this.#setupListeners();
    }
    #setupListeners() {
        document.addEventListener('pointerdown', (e) => {
            const paths = e.composedPath();
            const lastString = paths[0].innerText || paths[0].value;
            this.utilities.lastPointerDownString = lastString;
            if (lastString) {
                const e = new CustomEvent('kul-manager-stringfinder', {
                    bubbles: true,
                    cancelable: true,
                    detail: {
                        string: lastString,
                    },
                });
                document.dispatchEvent(e);
            }
        });
        document.addEventListener('click', (e) => {
            const paths = e.composedPath();
            this.utilities.clickCallbacks.forEach((obj) => {
                if (obj &&
                    obj.el &&
                    obj.el.isConnected &&
                    !paths.includes(obj.el)) {
                    const elAsDynamicPos = obj.el;
                    let found = false;
                    if (elAsDynamicPos.kulDynamicPosition &&
                        elAsDynamicPos.kulDynamicPosition.detach) {
                        for (let index = 0; index < paths.length; index++) {
                            const pathEl = paths[index];
                            const pathElAsDynamicPos = pathEl;
                            if (pathElAsDynamicPos.kulDynamicPosition &&
                                pathElAsDynamicPos.kulDynamicPosition.detach) {
                                const originalPath = pathElAsDynamicPos.kulDynamicPosition
                                    .originalPath;
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
    }
    /**
     * Adds a new click callback.
     * @param {KulManagerClickCb} cb - The callback to add.
     * @param {boolean} async - When true, the callback will be added asynchrounously to prevent instant firing if it was added through a click event.
     */
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
    /**
     * Retrives event path from event.target
     * @param currentEl event.target
     * @param rootElement rootElement of component
     * @returns
     */
    getEventPath(currentEl, rootElement) {
        const path = [];
        while (currentEl &&
            currentEl !== rootElement &&
            currentEl !== document.body) {
            path.push(currentEl);
            currentEl = currentEl.parentNode
                ? currentEl.parentNode
                : currentEl.host;
        }
        return path;
    }
    /**
     * Removes the given click callback.
     * @param {KulManagerClickCb} cb - The callback to remove.
     */
    removeClickCallback(cb) {
        this.utilities.clickCallbacks.delete(cb);
    }
    /**
     * Sets both locale and language library-wide.
     * @param {KulDatesLocales} locale - The supported locale.
     */
    setLibraryLocalization(locale) {
        if (!Object.values(KulDatesLocales).includes(locale)) {
            this.debug.logMessage('kul-manager', 'Missing locale (' + locale + ')!', 'error');
            return;
        }
        if (!KulLanguageDefaults[locale]) {
            this.debug.logMessage('kul-manager', 'Missing language for locale (' + locale + ')!', 'error');
            return;
        }
        this.dates.setLocale(locale);
        this.language.set(KulLanguageDefaults[locale]);
        this.math.setLocale(KulMathLocales[locale]);
    }
}
/**
 * Called by the Ketchup components to retrieve the instance of KulManager (or creating a new one when missing).
 * @returns {KulManager} KulManager instance.
 */
function kulManagerInstance() {
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
            if (!overrides.math || !overrides.math.locale) {
                dom.ketchupLite.math.setLocale(KulMathLocales[locale]);
            }
        }
        document.dispatchEvent(new CustomEvent('kul-manager-ready'));
    }
    return dom.ketchupLite;
}

export { CSS_VAR_PREFIX as C, KUL_WRAPPER_ID as K, RIPPLE_SURFACE_CLASS as R, KUL_STYLE_ID as a, KulThemeColorValues as b, KulLanguageSearch as c, KulLanguageGeneric as d, commonjsGlobal as e, KUL_DROPDOWN_CLASS_VISIBLE as f, getProps as g, KulDynamicPositionPlacement as h, KUL_DROPDOWN_CLASS as i, kulManagerInstance as k };

//# sourceMappingURL=kul-manager-caaff688.js.map