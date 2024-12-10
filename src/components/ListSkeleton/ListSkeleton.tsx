import { ListItemSkeleton } from 'src/components/ListItemSkeleton';

import { ListSkeletonProps } from './ListSkeleton.types';

export const ListSkeleton = ({ length = 5 }: ListSkeletonProps) => {
  const list = Array.from({ length }, (_, i) => i);

  return list.map((item) => <ListItemSkeleton key={item} />);
};
