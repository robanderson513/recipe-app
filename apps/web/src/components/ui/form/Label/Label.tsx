import type { ReactNode } from 'react';
import './label.css';

type LabelProps = {
  htmlFor: string;
  label: string;
  required?: boolean;
  children: ReactNode;
};

function Label({ htmlFor, label, required, children }: LabelProps) {
  return (
    <label htmlFor={htmlFor}>
      <span>
        {label}
        {required && (
          <span className="label-required-marker" aria-hidden="true">
            {' *'}
          </span>
        )}
      </span>
      {children}
    </label>
  );
}

export default Label;
