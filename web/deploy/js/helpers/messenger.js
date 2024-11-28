export const EV_HANDLERS = {
    //#region Messenger handler
    messenger: (state, e) => {
        const { eventType, config } = e.detail;
        switch (eventType) {
            case 'save':
                if (config && typeof config === 'object') {
                    state.config = config;
                }
                break;
        }
    },
    //#endregion
};
