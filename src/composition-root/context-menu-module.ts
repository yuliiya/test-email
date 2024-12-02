import { key, type Module } from 'jet-blaze/di';
import { createContextMenuService, type ContextMenuService } from 'src/components/ContextMenu/context-menu-state.ts';
import { contextMenuControllerKey } from 'src/components/ContextMenu/context-menu-controller-key.ts';
import { createContextMenuController } from 'src/components/ContextMenu/ContextMenu';

export const contextMenuServiceKey = key<ContextMenuService>('ContextMenuService');

export const contextMenuModule: Module = (container) => {
  container.register(contextMenuServiceKey, () => createContextMenuService());

  container.register(contextMenuControllerKey, (c) => createContextMenuController(c.resolve(contextMenuServiceKey)));
};
