import type { ButtonHTMLAttributes } from 'react';

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> & {
  variant?: 'primary' | 'secondary' | 'icon' | 'text-neutral';
};

function Button({ variant = 'primary', type = 'button', children, ...props }: ButtonProps) {
  return (
    <button className={`button button-${variant}`} type={type} {...props}>
      {children}
    </button>
  );
}

export default Button;
