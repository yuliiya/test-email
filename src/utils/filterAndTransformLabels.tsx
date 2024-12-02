import {
  ArrowRightIcon,
  BookOpenIcon,
  ExclamationCircleIcon,
  InboxIcon,
  StarIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { ReactNode } from 'react';

import { Label } from '../api/labels/schemas.ts';

interface SidebarLabel {
  icon: ReactNode;
  text: string;
  to: string;
}

const labelIcons: Record<string, ReactNode> = {
  INBOX: <InboxIcon />,
  STARRED: <StarIcon />,
  TRASH: <TrashIcon />,
  UNREAD: <StarIcon />,
  DRAFT: <BookOpenIcon />,
  SENT: <ArrowRightIcon />,
  SPAM: <ExclamationCircleIcon />,
};

export const filterAndTransformLabels = (labels: Label[]): SidebarLabel[] => {
  return labels
    .filter((label) => {
      const isHidden = label.messageListVisibility === 'hide' && label.labelListVisibility === 'labelHide';
      const isCategory = label.id.startsWith('CATEGORY_');
      return !isHidden && !isCategory;
    })
    .sort((a, b) => {
      const order = ['INBOX', 'STARRED', 'SENT', 'DRAFT', 'TRASH', 'SPAM'];
      const indexA = order.indexOf(a.id);
      const indexB = order.indexOf(b.id);

      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;

      return a.name.localeCompare(b.name);
    })
    .map((label) => ({
      icon: labelIcons[label.id] || <InboxIcon />,
      text: label.name,
      to: label.id.toLowerCase(),
    }));
};
