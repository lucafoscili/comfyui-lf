import { KulChipEventPayload } from '../types/ketchup-lite/components';
import { ChipState } from '../types/widgets/chip';

export const EV_HANDLERS = {
  //#region Chip handler
  chip: async (e: CustomEvent<KulChipEventPayload>, state: ChipState) => {
    const { comp, eventType } = e.detail;
    switch (eventType) {
      case 'click':
        const selectedValues: string[] = [];
        (await comp.getSelectedNodes()).forEach((node) => {
          selectedValues.push(String(node.value).valueOf());
        });
        state.selected = selectedValues.join(', ');
        break;
    }
    //#endregion
  },
};
