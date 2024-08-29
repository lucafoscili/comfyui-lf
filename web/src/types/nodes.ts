/*-------------------------------------------------------------------*/
/*               C o m m o n   D e c l a r a t i o n s               */
/*-------------------------------------------------------------------*/

export type NodeNames =
  | 'LF_ControlPanel'
  | 'LF_DisplayJSON'
  | 'LF_ImageHistogram'
  | 'LF_LoadImages'
  | 'LF_SwitchImage'
  | 'LF_SwitchInteger'
  | 'LF_SwitchJSON'
  | 'LF_SwitchString';

export interface Extension {
  beforeRegisterNodeDef?: (node: NodeType, data: NodeData, name: string) => void;
  getCustomWidgets?: () => Record<any, Function>;
  name: string;
  nodeCreated?: (node: NodeType) => void;
}
