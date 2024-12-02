import { connect, Controller } from 'jet-blaze/connector';
import { map } from 'rxjs/operators';

import { contextMenuControllerKey } from './context-menu-controller-key.ts';
import { ContextMenuService } from './context-menu-state';
import { ContextMenuView, ViewProps } from './ContextMenuView';

export interface Props {}

export function createContextMenuController(contextMenuService: ContextMenuService): Controller<Props, ViewProps> {
  return ({ onItemClick$ }) => {
    const contextMenuState$ = contextMenuService.stateSubject$;

    const viewState$ = contextMenuState$.pipe(
      map((state) => ({
        visible: state.visible,
        position: state.position,
        items: state.items,
      })),
    );

    const onItemClickEffect$ = onItemClick$.pipe(map((item) => item.onClick()));

    return {
      viewState: viewState$,
      effects: [onItemClickEffect$],
    };
  };
}

export const ContextMenu = connect(ContextMenuView, contextMenuControllerKey);
