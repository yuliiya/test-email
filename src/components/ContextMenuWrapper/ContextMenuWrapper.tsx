import { useDiContainer } from 'jet-blaze/di-react';
import { FC, MouseEvent, ReactNode } from 'react';
import { contextMenuServiceKey } from 'src/composition-root/context-menu-module.ts';
import { useMessageActions } from 'src/hooks/useMessageActions.ts';

interface ContextMenuWrapperProps {
  children: ReactNode;
}

export const ContextMenuWrapper: FC<ContextMenuWrapperProps> = ({ children }) => {
  const container = useDiContainer();
  const contextMenuService = container.resolve(contextMenuServiceKey);
  const { handleDelete, handleToggleIsReadStatus } = useMessageActions('messageId');

  // hardcoded
  const items = [
    { label: 'Delete', onClick: handleDelete },
    { label: 'Опция 2', onClick: () => handleToggleIsReadStatus(true) },
  ];

  const handleRightClick = (e: MouseEvent) => {
    e.preventDefault();

    contextMenuService.showMenu({ x: e.clientX, y: e.clientY }, items);
  };

  return (
    <div onContextMenu={handleRightClick} className="relative">
      {children}
    </div>
  );
};
