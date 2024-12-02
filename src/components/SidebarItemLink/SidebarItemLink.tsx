import { FC, memo } from 'react';
import { NavLink, useLocation } from 'react-router';
import { SidebarItem, SidebarItemProps } from 'src/components/SidebarItem/SidebarItem.tsx';

interface SidebarItemLinkProps extends Omit<SidebarItemProps, 'isActive'> {
  to: string;
}

export const SidebarItemLink: FC<SidebarItemLinkProps> = memo(({ to, icon, text, expanded = false }) => {
  const { pathname } = useLocation();
  const isActive = pathname === `/${to}`;

  return (
    <NavLink to={{ pathname: `${to}` }}>
      <SidebarItem icon={icon} text={text} expanded={expanded} isActive={isActive} />
    </NavLink>
  );
});
