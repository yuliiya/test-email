import { connect, Controller } from 'jet-blaze/connector';
import { map } from 'rxjs/operators';

import { contextMenuControllerKey } from './context-menu-controller-key.ts';
import { ContextMenuService } from './context-menu-state';
import { ContextMenuView, ViewProps } from './ContextMenuView';

export interface Props {}

export function createContextMenuController(contextMenuService: ContextMenuService): Controller<Props, ViewProps> {
  return ({ onItemClick$ }) => {
    const contextMenuState$ = contextMenuService.stateSubject$;
    console.log('contextMenuState$', contextMenuState$);

    const onItemClickEffect$ = onItemClick$.pipe(map((item) => item.onClick()));

    return {
      viewState: {
        visible: true,
        position: { x: 0, y: 0 },
        items: [],
      }, // Приведение типа
      effects: [onItemClickEffect$],
    };
  };
}

export const ContextMenu = connect(ContextMenuView, contextMenuControllerKey);
