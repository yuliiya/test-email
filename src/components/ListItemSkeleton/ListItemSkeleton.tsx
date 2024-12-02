import { FC } from 'react';
import { Skeleton } from 'src/components/Skeleton/Skeleton.tsx';

export const ListItemSkeleton: FC = () => (
  <li className="py-3 sm:py-4 transition-colors hover:bg-gray-100 rounded-md px-3">
    <div className="flex flex-col space-y-1">
      <div className="flex items-center min-w-0">
        <Skeleton width="40%" height="16px" className="mr-3" />
        <Skeleton width="30%" height="12px" />
      </div>
      <div className="flex-1 min-w-0">
        <Skeleton width="60%" height="16px" className="mb-2" />
        <Skeleton width="80%" height="14px" />
      </div>
    </div>
  </li>
);
