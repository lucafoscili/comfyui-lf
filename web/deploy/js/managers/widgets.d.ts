import { CardPayload, WidgetPayloadMap } from '../types/events/events';
import { Card } from '../types/widgets/card';
import { CardsWithChip } from '../types/widgets/cardsWithChip';
import { CustomWidgetName, NodeName } from '../types/widgets/widgets';
export declare class LFWidgets {
    #private;
    render: (name: CustomWidgetName) => (node: NodeType) => {
        widget: import("../types/widgets/widgets").GenericWidget;
    };
    decorators: {
        card: <W extends Card | CardsWithChip>(payload: CardPayload, widget: W) => void;
    };
    onEvent: <N extends NodeName, W extends CustomWidgetName>(name: N, event: CustomEvent<WidgetPayloadMap[W]>, widgets: Array<W>) => void;
}
