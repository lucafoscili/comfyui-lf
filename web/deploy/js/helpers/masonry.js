export const EV_HANDLERS = {
    //#region Masonry handler
    masonry: (state, e) => {
        const { eventType, originalEvent, selectedShape } = e.detail;
        switch (eventType) {
            case 'kul-event':
                const { eventType } = originalEvent.detail;
                switch (eventType) {
                    case 'click':
                        const v = selectedShape.shape?.value || selectedShape.shape?.kulValue;
                        state.selected.index = selectedShape.index;
                        state.selected.name = v ? String(v).valueOf() : '';
                        break;
                }
                break;
        }
    },
    //#endregion
};
