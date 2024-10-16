import { NodeName } from '../types/nodes.js';
import { CustomWidgetName, } from '../types/widgets.js';
import { createDOMWidget } from '../utils/common.js';
const BASE_CSS_CLASS = 'lf-imagepreview';
const DOGE = `

W O W .  S U C H   E M P T Y.


⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡟⠋⠈⠙⣦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⠤⢤⡀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠈⢇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡠⠞⠀⠀⢠⡜⣦⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡃⠀⠀⠀⠀⠈⢷⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡠⠊⣠⠀⠀⠀⠀⢻⡘⡇
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠃⠀⠀⠀⠀⠀⠀⠙⢶⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡠⠚⢀⡼⠃⠀⠀⠀⠀⠸⣇⢳
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⠀⣀⠖⠀⠀⠀⠀⠉⠀⠀⠈⠉⠛⠛⡛⢛⠛⢳⡶⠖⠋⠀⢠⡞⠀⠀⠀⠐⠆⠀⠀⣿⢸
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⣦⣀⣴⡟⠀⠀⢶⣶⣾⡿⠀⠀⣿⢸
⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⠞⠁⠀⠀⠀⠀⠀⠀⠀⠀⡠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣏⠀⠀⠀⣶⣿⣿⡇⠀⠀⢏⡞
⠀⠀⠀⠀⠀⠀⢀⡴⠛⠀⠀⠀⠀⠀⠀⠀⠀⢀⢀⡾⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢦⣤⣾⣿⣿⠋⠀⠀⡀⣾⠁
⠀⠀⠀⠀⠀⣠⠟⠁⠀⠀⠀⣀⠀⠀⠀⠀⢀⡟⠈⢀⣤⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠙⣏⡁⠀⠐⠚⠃⣿⠀
⠀⠀⠀⠀⣴⠋⠀⠀⠀⡴⣿⣿⡟⣷⠀⠀⠊⠀⠴⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠀⠀⠀⠀⢹⡆
⠀⠀⠀⣴⠃⠀⠀⠀⠀⣇⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⡶⢶⣶⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇
⠀⠀⣸⠃⠀⠀⠀⢠⠀⠊⠛⠉⠁⠀⠀⠀⠀⠀⠀⠀⢲⣾⣿⡏⣾⣿⣿⣿⣿⠖⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢧
⠀⢠⡇⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠈⠛⠿⣽⣿⡿⠏⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡜
⢀⡿⠀⠀⠀⠀⢀⣤⣶⣟⣶⣦⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇
⢸⠇⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇
⣼⠀⢀⡀⠀⠀⢷⣿⣿⣿⣿⣿⣿⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡇
⡇⠀⠈⠀⠀⠀⣬⠻⣿⣿⣿⡿⠙⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⠁
⢹⡀⠀⠀⠀⠈⣿⣶⣿⣿⣝⡛⢳⠭⠍⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⠃⠀
⠸⡇⠀⠀⠀⠀⠙⣿⣿⣿⣿⣿⣿⣷⣦⣀⣀⣀⣤⣤⣴⡶⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠇⠀⠀
⠀⢿⡄⠀⠀⠀⠀⠀⠙⣇⠉⠉⠙⠛⠻⠟⠛⠛⠉⠙⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡰⠋⠀⠀⠀
⠀⠈⢧⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⠞⠁⠀⠀⠀⠀
⠀⠀⠘⢷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⠞⠁⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠱⢆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⡴⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠛⢦⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⠴⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⠲⠤⣤⣤⣤⣄⠀⠀⠀⠀⠀⠀⠀⢠⣤⣤⠤⠴⠒⠛⠋⠀⠀⠀⠀⠀         
`;
const SELECTABLE_NODES = [NodeName.loadImages];
const TYPE = CustomWidgetName.imagePreview;
export const imagePreviewFactory = {
    cssClasses: {
        content: BASE_CSS_CLASS,
        doge: `${BASE_CSS_CLASS}__doge`,
        grid: `${BASE_CSS_CLASS}__grid`,
        gridWaterfall: `${BASE_CSS_CLASS}__grid--waterfall`,
        gridCell: `${BASE_CSS_CLASS}__grid-cell`,
        gridCellSelectable: `${BASE_CSS_CLASS}__grid-cell--selectable`,
        gridCellSelected: `${BASE_CSS_CLASS}__grid-cell--selected`,
        image: `${BASE_CSS_CLASS}__image`,
        switchView: `${BASE_CSS_CLASS}__switch-view`,
    },
    options: (domWidget, isSelectable) => {
        return {
            hideOnZoom: true,
            getValue() {
                return isSelectable
                    ? {
                        selectedIndex: parseInt(domWidget?.dataset.selectedIndex),
                        selectedName: domWidget?.dataset.selectedName,
                    }
                    : '';
            },
            selectable: isSelectable,
            setValue(value) {
                if (value.images?.length > 0) {
                    if (isSelectable && value.selectedIndex && value.selectedName) {
                        domWidget.dataset.selectedIndex = String(value.selectedIndex).valueOf();
                        domWidget.dataset.selectedName = value.selectedName;
                    }
                    if (domWidget.firstChild) {
                        const grid = drawGrid(value, isSelectable, domWidget);
                        domWidget.replaceChild(grid, domWidget.firstChild);
                    }
                    else {
                        const grid = drawGrid(value, isSelectable, domWidget);
                        domWidget.appendChild(grid);
                    }
                }
                else {
                    if (domWidget.firstChild) {
                        domWidget.replaceChild(drawDoge(), domWidget.firstChild);
                    }
                    else {
                        domWidget.appendChild(drawDoge());
                    }
                }
            },
        };
    },
    render: (node, name) => {
        const wrapper = document.createElement('div');
        const isSelectable = !!SELECTABLE_NODES.includes(node.comfyClass);
        const options = imagePreviewFactory.options(wrapper, isSelectable);
        return { widget: createDOMWidget(name, TYPE, wrapper, node, options) };
    },
};
const createButtons = (grid) => {
    const switchView = document.createElement('kul-button');
    switchView.classList.add(imagePreviewFactory.cssClasses.switchView);
    switchView.kulIcon = 'view_comfy';
    switchView.kulIconOff = 'view_day';
    switchView.kulStyling = 'floating';
    switchView.kulToggable = true;
    switchView.addEventListener('click', () => {
        const className = imagePreviewFactory.cssClasses.gridWaterfall;
        if (grid.classList.contains(className)) {
            grid.classList.remove(className);
        }
        else {
            grid.classList.add(className);
        }
    });
    return switchView;
};
const drawGrid = (value, isSelectable, domWidget) => {
    const { fileNames, images } = value;
    const content = document.createElement('div');
    const grid = document.createElement('div');
    content.classList.add(imagePreviewFactory.cssClasses.content);
    grid.classList.add(imagePreviewFactory.cssClasses.grid);
    setCellSize(images, grid);
    for (let index = 0; index < images.length; index++) {
        const gridCell = document.createElement('div');
        const image = document.createElement('img');
        const title = fileNames?.[index] || '';
        const image64 = images[index];
        gridCell.classList.add(imagePreviewFactory.cssClasses.gridCell);
        image.classList.add(imagePreviewFactory.cssClasses.image);
        image.src = `data:image/webp;base64,${image64}`;
        image.title = `${title} [${index}]`;
        image.dataset.fileName = title;
        if (isSelectable) {
            handleSelectable(grid, gridCell, domWidget, title, index);
        }
        gridCell.appendChild(image);
        grid.appendChild(gridCell);
    }
    content.appendChild(grid);
    content.appendChild(createButtons(grid));
    return content;
};
const drawDoge = () => {
    const content = document.createElement('div');
    content.title = 'No images were loaded/found.';
    content.classList.add(imagePreviewFactory.cssClasses.content);
    const doge = document.createElement('div');
    doge.classList.add(imagePreviewFactory.cssClasses.doge);
    doge.innerText = DOGE;
    content.appendChild(doge);
    return content;
};
const handleSelectable = (grid, gridCell, domWidget, title, index) => {
    gridCell.classList.add(imagePreviewFactory.cssClasses.gridCellSelectable);
    const isSelected = !!(domWidget.dataset.selectedIndex &&
        domWidget.dataset.selectedName &&
        domWidget.dataset.selectedIndex === index.toString() &&
        domWidget.dataset.selectedName === title);
    if (isSelected) {
        gridCell.classList.add(imagePreviewFactory.cssClasses.gridCellSelected);
    }
    gridCell.addEventListener('click', () => {
        const cssClass = imagePreviewFactory.cssClasses.gridCellSelected;
        if (gridCell.classList.contains(cssClass)) {
            gridCell.classList.remove(cssClass);
            return;
        }
        domWidget.dataset.selectedIndex = String(index).valueOf();
        domWidget.dataset.selectedName = title;
        const currentlySelected = grid.querySelectorAll('.' + cssClass);
        for (let index = 0; index < currentlySelected.length; index++) {
            const gridCell = currentlySelected[index];
            gridCell.classList.remove(cssClass);
        }
        gridCell.classList.add(cssClass);
    });
};
const setCellSize = (images, grid) => {
    let cssPropValue;
    switch (images.length) {
        case 1:
        case 2:
        case 3:
        case 4:
            cssPropValue = `repeat(${images.length}, 1fr)`;
            break;
        default:
            cssPropValue = 'repeat(auto-fill, minmax(100px, 1fr))';
            break;
    }
    grid.style.setProperty('--lf_grid_template_columns', cssPropValue);
};
