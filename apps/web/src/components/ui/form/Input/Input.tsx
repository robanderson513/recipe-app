import { useId, useState, type ChangeEvent, type FocusEvent, type FormEvent, type InputHTMLAttributes, type ReactNode } from 'react';
import FormMessage from '../FormMessage/FormMessage';
import Label from '../Label/Label';
import './input.css';

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> & {
  label: string;
  message?: ReactNode;
};

function getValidationError(input: HTMLInputElement, label: string) {
  if (input.validity.valid) {
    return '';
  }

  if (input.validity.valueMissing) {
    return `${label} is required`;
  }

  return input.validationMessage;
}

function Input({ label, message, type = 'text', onBlur, onChange, onInvalid, ...props }: InputProps) {
  const inputId = useId();
  const messageId = `${inputId}-message`;
  const [hasInteracted, setHasInteracted] = useState(false);
  const [validationError, setValidationError] = useState('');
  const hasError = validationError !== '';
  const shownMessage = hasError ? validationError : message;
  const describedBy = [props['aria-describedby'], shownMessage != null ? messageId : undefined].filter(Boolean).join(' ');

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    setHasInteracted(true);
    setValidationError(getValidationError(event.currentTarget, label));
    onBlur?.(event);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (hasInteracted) {
      setValidationError(getValidationError(event.currentTarget, label));
    }
    onChange?.(event);
  };

  const handleInvalid = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    setHasInteracted(true);
    setValidationError(getValidationError(event.currentTarget, label));
    onInvalid?.(event);
  };

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
