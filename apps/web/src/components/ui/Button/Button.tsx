import type { ButtonHTMLAttributes } from 'react';

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> & {
  variant?: 'primary' | 'secondary' | 'icon' | 'text-neutral';
};

function Button({ variant = 'primary', children, ...props }: ButtonProps) {
  return (
    <button className={`button button-${variant}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
