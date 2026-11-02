import { useId, type InputHTMLAttributes, type ReactNode } from 'react';
import FormMessage from '../FormMessage/FormMessage';
import Label from '../Label/Label';
import useFieldValidation from '../useFieldValidation';
import './input.css';

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> & {
  label: string;
  message?: ReactNode;
};

function Input({ label, message, type = 'text', onBlur, onChange, onInvalid, ...props }: InputProps) {
  const inputId = useId();
  const messageId = `${inputId}-message`;
  const { hasError, validationError, handleBlur, handleChange, handleInvalid } = useFieldValidation<HTMLInputElement>(
    { label, onBlur, onChange, onInvalid }
  );
  const shownMessage = hasError ? validationError : message;
  const describedBy = [props['aria-describedby'], shownMessage != null ? messageId : undefined].filter(Boolean).join(' ');

  return (
    <div className="input-field">
      <Label htmlFor={inputId} label={label} required={props.required}>
        <input
          id={inputId}
          className="input"
          {...props}
          type={type}
          aria-describedby={describedBy || undefined}
          aria-invalid={hasError ? true : props['aria-invalid']}
          onBlur={handleBlur}
          onChange={handleChange}
          onInvalid={handleInvalid}
        />
      </Label>
      {shownMessage != null && (
        <div id={messageId}>
          <FormMessage error={hasError}>{shownMessage}</FormMessage>
        </div>
      )}
    </div>
  );
}

export default Input;
