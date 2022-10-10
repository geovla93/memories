import {
  ComponentPropsWithoutRef,
  createElement,
  ElementType,
  PropsWithChildren,
} from 'react';
import cn from 'classnames';

type ContainerProps<C extends keyof HTMLElementTagNameMap> = PropsWithChildren<{
  as?: C;
  clean?: boolean;
  className?: string;
}> &
  ComponentPropsWithoutRef<C>;

const Container = <C extends keyof HTMLElementTagNameMap = 'div'>({
  children,
  as,
  clean,
  className,
  ...props
}: ContainerProps<C>) => {
  const rootClassName = cn(className, {
    'max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8': !clean,
  });

  return createElement('div', { ...props, className: rootClassName }, children);
};

export default Container;
