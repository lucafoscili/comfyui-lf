export const EV_HANDLERS = {
    //#region Messenger handler
    messenger: (state, e) => {
        const { eventType, config } = e.detail;
        const { elements } = state;
        const { messenger } = elements;
        switch (eventType) {
            case 'save':
                if (config && typeof config === 'object') {
                    messenger.dataset.config = JSON.stringify(config);
                }
                break;
        }
    },
    //#endregion
};
