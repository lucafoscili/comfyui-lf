const DOM = document.documentElement;
export const capitalize = (input) => {
    return input
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
        .join(' ');
};
export const getKulManager = () => {
    return DOM.ketchupLite;
};
export const kulManagerExists = () => {
    return !!DOM.ketchupLite;
};
