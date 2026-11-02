import type { ReactNode } from 'react';
import './form-message.css';

type FormMessageProps = {
  children: ReactNode;
  error?: boolean;
};

function FormMessage({ children, error }: FormMessageProps) {
  return (
    <p className={`form-message${error ? ' form-message-error' : ''}`} role={error ? 'alert' : undefined}>
      {children}
    </p>
  );
}

export default FormMessage;
