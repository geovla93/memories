import type { FC, PropsWithChildren } from 'react';
import cn from 'classnames';

import Header from './Header';

type LayoutProps = PropsWithChildren<{
  title: string;
  description?: string;
  className?: string;
}>;

const Layout: FC<LayoutProps> = ({
  children,
  className,
  title,
  description,
}) => {
  const rootClassName = cn(
    'min-h-[calc(100vh-3.5rem)] w-full py-10',
    className,
  );

  return (
    <>
      <Header />
      <main className={rootClassName}>{children}</main>
    </>
  );
};

export default Layout;
