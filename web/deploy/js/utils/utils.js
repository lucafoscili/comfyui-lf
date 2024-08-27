const DOM = document.documentElement;
const WINDOW = window;
export const capitalize = (input) => {
    return input
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
        .join(' ');
};
export const getApiRoutes = () => {
    return WINDOW.lfManager.getApiRoutes();
};
export const getKulManager = () => {
    return DOM.ketchupLite;
};
export const getKulThemes = () => {
    const themes = getKulManager().theme.getThemes();
    const kulData = {
        nodes: [{ children: [], icon: 'style', id: 'root', value: 'Theme' }],
    };
    for (let index = 0; index < themes.length; index++) {
        const currentTheme = themes[index];
        kulData.nodes[0].children.push({
            id: currentTheme,
            value: capitalize(currentTheme),
        });
    }
    return kulData;
};
export const getLFManager = () => {
    return WINDOW.lfManager;
};
export const kulManagerExists = () => {
    return !!DOM.ketchupLite;
};
