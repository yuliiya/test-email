import { ReactNode } from 'react';

export interface SidebarProps {
  children: ReactNode;
  expanded: boolean;
  handleExpand: () => void;
  handleLogout: () => void;
}
