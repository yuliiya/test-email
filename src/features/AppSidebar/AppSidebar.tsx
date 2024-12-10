import { FC } from 'react';
import { Sidebar } from 'src/components/Sidebar';
import { SidebarItemLink } from 'src/components/SidebarItemLink';
import { useAppSidebar } from 'src/hooks/useAppSidebar.ts';

export const AppSidebar: FC = () => {
  const { isExpanded, handleLogout, navBarItems, handleExpand } = useAppSidebar();

  return (
    <Sidebar expanded={isExpanded} handleExpand={handleExpand} handleLogout={handleLogout}>
      {navBarItems?.map((item) => (
        <SidebarItemLink key={item.text} expanded={isExpanded} text={item.text} to={item.to} icon={item.icon} />
      ))}
    </Sidebar>
  );
};
