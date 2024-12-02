import { FC, ReactNode } from 'react';

interface ListWrapperProps {
  children: ReactNode;
}

export const ListWrapper: FC<ListWrapperProps> = ({ children }) => {
  return <ul className="max-w-xs w-full overflow-y-auto py-6">{children}</ul>;
};
