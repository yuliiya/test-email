import { ReactNode } from 'react';

export interface SidebarItemProps {
  icon: ReactNode;
  text: string;
  expanded: boolean;
  isActive: boolean;
  onClick?: () => void;
}
