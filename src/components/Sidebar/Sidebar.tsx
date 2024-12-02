import {
  ArrowLeftEndOnRectangleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  BookOpenIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { FC, ReactNode } from 'react';
import { memo } from 'react';
import { SidebarItem } from 'src/components/SidebarItem/SidebarItem.tsx';
import { SidebarItemLink } from 'src/components/SidebarItemLink/SidebarItemLink.tsx';
import { Button } from 'src/components/ui/Button/Button.tsx';
import { ROUTES } from 'src/routes/constants.ts';

interface SidebarProps {
  children: ReactNode;
  expanded: boolean;
  handleExpand: () => void;
  handleLogout: () => void;
}

export const Sidebar: FC<SidebarProps> = memo(({ children, expanded, handleExpand, handleLogout }) => (
  <div className="relative flex-shrink-0">
    <div className={`fixed inset-0 -z-10 block bg-gray-400  ${expanded ? 'block sm:hidden' : 'hidden'}`} />
    <aside className={`box-border h-screen transition-all ${expanded ? 'w-5/6 sm:w-64' : 'w-0 sm:w-20'}`}>
      <nav className="flex h-full flex-col border-r bg-white shadow-sm">
        <div className="flex items-center justify-between p-4 pb-2">
          <img
            src="https://img.logoipsum.com/212.svg"
            className={`overflow-hidden transition-all ${expanded ? 'w-32' : 'w-0'}`}
            alt="logo"
          />
          <div className={`${expanded ? '' : 'hidden sm:block'}`}>
            <Button onClick={handleExpand}>
              {expanded ? <ArrowLeftIcon className="h-6 w-6" /> : <ArrowRightIcon className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        <ul className="flex-1 px-3">{children}</ul>
        <div className="flex flex-col border-t p-3 mt-auto">
          <SidebarItemLink icon={<BookOpenIcon />} text="Info" to={ROUTES.INFO} expanded={expanded} key="info" />
          <SidebarItem
            key="logout"
            text="Logout"
            isActive={false}
            expanded={expanded}
            onClick={handleLogout}
            icon={<ArrowLeftEndOnRectangleIcon />}
          />
        </div>
        <div className="flex border-t p-3">
          <UserIcon className="h-8 w-10 rounded-md" />
          <div
            className={`
              flex items-center justify-between
              overflow-hidden transition-all ${expanded ? 'ml-3 w-52' : 'w-0'}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">User Name</h4>
              <span className="text-xs text-gray-600">user.email@gmail.com</span>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  </div>
));
