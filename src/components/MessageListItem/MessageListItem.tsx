import { FC } from 'react';

import { MessageListItemProps } from './MessageListItem.types';

export const MessageListItem: FC<MessageListItemProps> = ({ subject, date, from, content, isRead, isActive }) => (
  <li className={`${isActive ? 'bg-gray-200' : ''} py-3 sm:py-4 transition-colors hover:bg-gray-100 rounded-md px-3`}>
    <div className="flex flex-col space-y-1">
      <div className="flex items-center min-w-0">
        {!isRead && <div className="mr-3 rounded bg-amber-600 w-2 h-2 flex-shrink-0" />}
        <p className="text-sm font-medium text-gray-900 truncate">{from}</p>
        <p className="ml-auto text-xs text-gray-500 flex-shrink-0">{date}</p>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-900 truncate">{subject}</p>
        <p className="text-sm text-gray-500 truncate">{content}</p>
      </div>
    </div>
  </li>
);
