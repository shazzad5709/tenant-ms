import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'peer block w-full appearance-none rounded-lg border border-gray-400 disabled:border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm focus:border-black focus:outline-none focus:ring-0',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
