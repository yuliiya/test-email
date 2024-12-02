import { key, type Module } from 'jet-blaze/di';
import { contextMenuControllerKey } from 'src/components/ContextMenu/context-menu-controller-key.ts';
import { type ContextMenuService, createContextMenuService } from 'src/components/ContextMenu/context-menu-state.ts';
import { createContextMenuController } from 'src/components/ContextMenu/ContextMenu';

export const contextMenuServiceKey = key<ContextMenuService>('ContextMenuService');

export const contextMenuModule: Module = (container) => {
  container.register(contextMenuServiceKey, () => createContextMenuService());

  container.register(contextMenuControllerKey, (c) => createContextMenuController(c.resolve(contextMenuServiceKey)));
};
