/*-------------------------------------------------*/
/*   Types inferred from the framework to make TS  */
/*   coding more quick.                            */
/*   Mostly A.I. generated, not reliable           */
/*-------------------------------------------------*/

declare module '/scripts/api.js' {
  export const api: {
    fetchApi(endpoint: string, options?: { body?: FormData; method?: string }): Promise<Response>;
  };
}

declare interface GitHubRelease {
  target_commitish: string;
  url: string;
  author: {
    avatar_url: string;
    login: string;
  };
  html_url: string;
  tag_name: string;
  name: string;
  body: string; // This is the changelog/description of the release
  draft: boolean;
  prerelease: boolean;
  created_at: string;
  published_at: string;
  tarball_url: string;
  zipball_url: string;
  assets: {
    url: string;
    name: string;
    content_type: string;
    size: number;
    download_count: number;
    browser_download_url: string;
  }[];
}

declare interface ComfyUI {
  api: {
    api: ComfyApi;
  };
  app: {
    ANIM_PREVIEW_WIDGET: string;
    app: ComfyApp;
    ComfyApp: Function;
  };
  asyncDialog: {
    ComfyAsyncDialog: Function;
  };
  button: {
    ComfyButton: Function;
  };
  buttonGroup: {
    ComfyButtonGroup: Function;
  };
  changeTracker: {
    globalTracker: ChangeTracker;
    ChangeTracker: Function;
  };
  clipspace: {
    ClipspaceDialog: Function;
  };
  colorPalette: {
    defaultColorPalette: any;
    getColorPalette: Function;
  };
  defaultGraph: {
    defaultGraph: any;
  };
  dialog: {
    ComfyDialog: Function;
  };
  domWidget: {
    addDomClippingSetting: Function;
  };
  draggableList: {
    DraggableList: Function;
  };
  flac: {
    getFromFlacBuffer: Function;
    getFromFlacFile: Function;
  };
  groupNode: {
    GroupNodeConfig: Function;
    GroupNodeHandler: Function;
  };
  groupNodeManage: {
    ManageGroupDialog: Function;
  };
  imagePreview: {
    calculateImageGrid: Function;
    createImageHost: Function;
  };
  index: {
    ComfyAppMenu: Function;
  };
  logging: {
    ComfyLogging: Function;
  };
  png: {
    getFromPngBuffer: Function;
    getFromPngFile: Function;
  };
  pnginfo: {
    getPngMetadata: Function;
    getFlacMetadata: Function;
    getWebpMetadata: Function;
    getLatentMetadata: Function;
    importA1111: Function;
  };
  popup: {
    ComfyPopup: Function;
  };
  settings: {
    ComfySettingsDialog: Function;
  };
  splitButton: {
    ComfySplitButton: Function;
  };
  toggleSwitch: {
    toggleSwitch: Function;
  };
  ui: {
    ComfyDialog: Function;
    $el: Function;
    ComfyUI: Function;
  };
  utils: {
    clone: Function;
    applyTextReplacements: (api: ComfyUI, value: string) => string;
    addStylesheet: Function;
    downloadBlob: Function;
    prop: Function;
  };
  widgetInputs: {
    getWidgetConfig: Function;
    convertToInput: Function;
    setWidgetConfig: Function;
    mergeIfValid: Function;
  };
  widgets: {
    ComfyWidgets: any;
    updateControlWidgetLabel: Function;
    addValueControlWidget: Function;
    addValueControlWidgets: Function;
    initWidgets: Function;
  };
  workflows: {
    ComfyWorkflowManager: Function;
    ComfyWorkflow: Function;
  };
}
declare interface NotificationOptions {
  // Existing properties
  badge?: string;
  body?: string;
  data?: any;
  dir?: NotificationDirection;
  icon?: string;
  lang?: string;
  requireInteraction?: boolean;
  silent?: boolean;
  tag?: string;

  // Experimental properties
  actions?: NotificationAction[]; // For the button actions
  image?: string; // To display the result image
}
declare namespace LiteGraph {
  export const getNodeType: (node: string) => NodeType;
  export const NODE_TITLE_HEIGHT: number;
}
interface CivitAIModelData {
  air: string;
  baseModel: string;
  baseModelType: string;
  createdAt: string;
  description?: null | string;
  downloadUrl: string;
  earlyAccessConfig: Record<string, unknown>;
  earlyAccessEndsAt?: Date | null;
  files: Array<unknown>;
  id: number;
  images: Array<{
    availability: string;
    hasMeta: boolean;
    hash: string;
    height: number;
    meta: {
      Size: string;
      seed: number;
      Model: string;
      steps: number;
      hashes: Record<string, unknown>;
    };
    metadata: {
      hash: string;
      size: number;
      width: number;
      height: number;
    };
    nsfwLevel: number;
    onSite: boolean;
    type: string;
    url: string;
    width: number;
  }>;
  model: {
    name: string;
    type: string;
    nsfw: boolean;
    poi: boolean;
  };
  modelId: number;
  name: string;
  publishedAt: string;
  stats: {
    downloadCount: number;
    ratingCount: number;
    rating: number;
    thumbsUpCount: number;
  };
  status: string;
  trainedWords: Array<string>;
  trainingDetails?: unknown;
  trainingStatus?: unknown;
  updatedAt: string;
  uploadType: string;
}

interface Input {
  hidden: Record<string, []>;
  optional: Record<string, []>;
  required: Record<string, []>;
}

interface NodeData {
  category: string;
  description: string;
  display_name: string;
  input: Input;
  name: string;
  output: unknown[];
  output_is_list: unknown[];
  output_name: unknown[];
  output_node: boolean;
  python_module: string;
}
interface NodeType {
  id: string;
  comfyClass?: string;
  filter?: string;
  nodeData?: NodeData;
  size?: [number, number];
  properties?: NodeProperties;
  shape?: 'BOX_SHAPE' | 'ROUND_SHAPE' | 'CARD_SHAPE';
  flags?: Record<string, boolean>;
  collapsed?: boolean;
  redrawOnMouse?: boolean;
  widgets?: Array<Widget>;
  widgetsUp?: boolean;
  pos?: [number, number];
  widgetsStartY?: number;
  clipArea?: boolean;
  resizable?: boolean;
  horizontal?: boolean;
  inputs?: SlotInfo[];
  graph: { _nodes: NodeType[] };
  outputs?: SlotInfo[];
  addDOMWidget?: <T extends WidgetOptions>(
    name?: string,
    type?: CustomWidgetNames,
    element?: HTMLDivElement,
    options?: T,
  ) => Widget;
  addCustomWidget?: (
    type?: T['type'],
    name?: string,
    value?: T['value'],
    callback?: BaseWidgetCallback<T> | string,
    options?: T['options'],
  ) => unknown;
  computeSize?: () => number;
  onAdded?: () => void;
  onResize?: (size: number) => void;
  onRemoved?: () => void;
  onStart?: () => void;
  onStop?: () => void;
  onDrawBackground?: (ctx: CanvasRenderingContext2D) => void;
  onDrawForeground?: (ctx: CanvasRenderingContext2D) => void;
  onMouseDown?: (event: MouseEvent) => void;
  onMouseMove?: (event: MouseEvent) => void;
  onMouseUp?: (event: MouseEvent) => void;
  onMouseEnter?: (event: MouseEvent) => void;
  onMouseLeave?: (event: MouseEvent) => void;
  onDblClick?: (event: MouseEvent) => void;
  onExecute?: () => void;
  onNodeCreated?: () => void;
  onPropertyChanged?: (propertyName: string, newValue: any) => boolean;
  onGetInputs?: () => Array<[string, string]>[];
  onGetOutputs?: () => Array<[string, string]>[];
  onSerialize?: (data: Record<string, any>) => Record<string, any>;
  onSelected?: (data: Record<string, any>) => void;
  onDeselected?: (data: Record<string, any>) => void;
  onDropItem?: (item: HTMLElement) => void;
  onDropFile?: (file: File) => void;
  onConnectInput?: (inputIndex: number, link: LinkInfo) => boolean;
  onConnectionsChange?: (connection: ConnectionInfo) => void;
  addInput?: (name: string, type: string) => void;
  addOutput?: (name: string, type: string) => void;
  getInputData?: (slotIndex: number) => any;
  getOutputData?: (slotIndex: number) => any;
  prototype?: NodeType;
  drawNode?: (node: NodeType, ctx: Canvas) => void;
  onConfigure?: () => void;
  widgets_values?: Widget[];
}

interface NodeProperties {
  size?: [number, number]; // [width, height]
  properties?: Record<string, any>; // User-configurable properties
  shape?: 'BOX_SHAPE' | 'ROUND_SHAPE' | 'CARD_SHAPE'; // Shape of the node
  flags?: Record<string, boolean>; // Flags that can be changed by the user
  collapsed?: boolean; // If the node is shown collapsed
  redrawOnMouse?: boolean; // Forces a redraw if the mouse passes over the widget
  widgetsUp?: boolean; // Widgets do not start after the slots
  widgetsStartY?: number; // Widgets should start being drawn from this Y
  clipArea?: boolean; // Clips the content when rendering the node
  resizable?: boolean; // If it can be resized dragging the corner
  horizontal?: boolean; // If the slots should be placed horizontally on the top and bottom of the node
}
interface LinkInfo {
  id?: number;
  type?: string;
  origin_id?: number;
  origin_slot?: number;
  target_id?: number;
  target_slot?: number;
  _data?: any;
  _pos?: { [key: number]: number };
}
interface SlotInfo {
  name?: string;
  type?: string;
  link?: string | string[]; // Depending if the slot is input or output, contains the id of the link or an array of ids
  label?: string; // Optional, used to rename the name as shown in the canvas
  dir?: 'UP' | 'RIGHT' | 'DOWN' | 'LEFT'; // Optional, direction of the slot
  colorOn?: string; // Color to render when it is connected
  colorOff?: string; // Color to render when it is not connected
  slot_index?: number;
}
interface Widget<W extends CustomWidgetName | ComfyWidgetName> {
  element?: DOMWidget;
  type?: W;
  name?: string;
  value?: any;
  options?: WidgetOptions;
  last_y?: number;
  y?: number;
  computedHeight?: number;
  serializeValue: () => string;
  onRemove?: () => void;
}
type OnConnectionChangeCallback = (
  side?: number,
  slot?: number,
  connect?: boolean,
  link_info?: ConnectionChangePayload,
  output?: Widget,
) => OnConnectionChangeCallback;
interface ConnectionChangePayload {
  origin_id?: number;
  origin_slot?: number;
  target_id?: number;
  target_slot?: number;
  type?: string;
}

type ComfyFolderTypes = 'input' | 'output' | 'temp';
