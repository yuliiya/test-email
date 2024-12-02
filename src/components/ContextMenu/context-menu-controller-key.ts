import type { Controller } from 'jet-blaze/connector';
import { key } from 'jet-blaze/di';
import type { Props } from './ContextMenu';
import type { ViewProps } from './ContextMenuView';

export const contextMenuControllerKey = key<Controller<Props, ViewProps>>('ContextMenuController');
