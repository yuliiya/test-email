import { FC } from 'react';

import { SkeletonProps } from './Skeleton.types';

export const Skeleton: FC<SkeletonProps> = ({ width = '100%', height = '20px', className = '' }) => (
  <div className={`bg-gray-200 animate-pulse ${className}`} style={{ width, height }}></div>
);
