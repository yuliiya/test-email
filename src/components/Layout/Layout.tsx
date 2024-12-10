import { FC } from 'react';

import { LayoutProps } from './Layout.types';

export const Layout: FC<LayoutProps> = ({ sidebar, children }) => (
  <div className="flex h-screen overflow-hidden">
    {sidebar}
    <main className="relative flex flex-1 overflow-hidden">
      <div className="w-full max-w-screen-2xl px-2 md:px-2 2xl:px-10">{children}</div>
    </main>
  </div>
);
