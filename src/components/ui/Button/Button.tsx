import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { Spinner } from 'src/components/ui/Spinner/Spinner.tsx';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, loading, ...rest }, forwardedRef) => {
    return (
      <button className={`${className} rounded p-1.5 hover:bg-gray-100`} {...rest} ref={forwardedRef}>
        {loading ? <Spinner /> : children}
      </button>
    );
  },
);
