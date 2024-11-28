export const EV_HANDLERS = {
    //#region Chip handler
    chip: async (state, e) => {
        const { comp, eventType } = e.detail;
        switch (eventType) {
            case 'click':
                const selectedValues = [];
                (await comp.getSelectedNodes()).forEach((node) => {
                    selectedValues.push(String(node.value).valueOf());
                });
                state.selected = selectedValues.join(', ');
                break;
        }
        //#endregion
    },
};
