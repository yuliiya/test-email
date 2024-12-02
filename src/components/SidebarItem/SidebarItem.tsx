import { FC, memo, ReactNode } from 'react';

export interface SidebarItemProps {
  icon: ReactNode;
  text: string;
  expanded: boolean;
  isActive: boolean;
  onClick?: () => void;
}

export const SidebarItem: FC<SidebarItemProps> = memo(({ isActive, icon, text, expanded = false, onClick }) => {
  return (
    <li
      onClick={onClick}
      className={`
         group relative my-1 flex w-full cursor-pointer
         items-center rounded-md px-3
         py-2 font-medium transition-colors 
     ${isActive ? 'text-primary-500 bg-gradient-to-tr from-gray-200 to-gray-100' : 'text-gray-600 hover:bg-gray-100'}`}
    >
      <span className="h-6 w-6">{icon}</span>

      <span className={`text-sm overflow-hidden text-start transition-all ${expanded ? 'ml-3 w-44' : 'w-0'}`}>
        {text}
      </span>
      {!expanded && (
        <div
          className={`
            z-10
            text-primary-500 invisible absolute left-full ml-6 -translate-x-3
            rounded-md bg-gray-800 px-2 text-white
            py-1 text-sm transition-all
            group-hover:visible group-hover:translate-x-0
        `}
        >
          {text}
        </div>
      )}
    </li>
  );
});
