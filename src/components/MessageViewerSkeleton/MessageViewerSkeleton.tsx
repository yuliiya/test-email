import { FC } from 'react';
import { Skeleton } from 'src/components/ui/Skeleton/Skeleton.tsx';

export const MessageViewerSkeleton: FC = () => {
  return (
    <div className="w-full flex flex-col px-6 bg-white h-full overflow-y-auto py-4">
      <div className="flex justify-end items-center mb-4">
        <Skeleton width="50%" className="mr-auto" />
        <div className="flex space-x-1 mr-3">
          <Skeleton width="36px" height="36px" className="rounded" />
          <Skeleton width="36px" height="36px" className="rounded" />
          <Skeleton width="36px" height="36px" className="rounded" />
        </div>
        <Skeleton width="20%" />
      </div>

      <div className="space-y-4 flex-1">
        <Skeleton width="60%" height="28px" className="mb-2" />
        <Skeleton width="100%" height="500px" />
      </div>
    </div>
  );
};
