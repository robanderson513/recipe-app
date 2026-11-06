import { useId, type InputHTMLAttributes, type ReactNode } from 'react';
import FormMessage from '../FormMessage/FormMessage';
import Label from '../Label/Label';
import useFieldMessage from '../hooks/useFieldMessage';
import useFieldValidation from '../hooks/useFieldValidation';
import './input.css';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  message?: ReactNode;
};

function Input({ id, label, message, type, onBlur, onChange, onInvalid, ...props }: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const { hasError, validationError, handleBlur, handleChange, handleInvalid } = useFieldValidation<HTMLInputElement>({
    label,
    onBlur,
    onChange,
    onInvalid
  });
  const { messageId, shownMessage, describedBy } = useFieldMessage({
    id: inputId,
    message,
    validationError: hasError ? validationError : '',
    describedBy: props['aria-describedby']
  });

  return (
    <div className="input-field">
      <Label htmlFor={inputId} label={label} required={props.required}>
        <input
          id={inputId}
          className="input"
          {...props}
          type={type}
          aria-describedby={describedBy}
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
