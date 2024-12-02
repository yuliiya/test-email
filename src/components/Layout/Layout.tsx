import { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ sidebar, children }) => (
  <div className="flex h-screen overflow-hidden">
    {sidebar}
    <main className="relative flex flex-1 overflow-hidden">
      <div className="w-full max-w-screen-2xl px-2 md:px-2 2xl:px-10">{children}</div>
    </main>
  </div>
);
