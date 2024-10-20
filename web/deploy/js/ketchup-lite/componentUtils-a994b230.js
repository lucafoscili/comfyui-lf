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

export { getProps as g };

//# sourceMappingURL=componentUtils-a994b230.js.map