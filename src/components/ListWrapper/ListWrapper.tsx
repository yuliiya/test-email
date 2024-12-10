import { FC } from 'react';

import { ListWrapperProps } from './ListWrappper.types';

export const ListWrapper: FC<ListWrapperProps> = ({ children }) => {
  return <ul className="max-w-xs w-full overflow-y-auto py-6">{children}</ul>;
};
