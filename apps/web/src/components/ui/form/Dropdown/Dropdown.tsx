import {
  useId,
  type ReactNode,
  type SelectHTMLAttributes
} from 'react';
import FormMessage from '../FormMessage/FormMessage';
import Label from '../Label/Label';
import useFieldMessage from '../hooks/useFieldMessage';
import useFieldValidation from '../hooks/useFieldValidation';
import './dropdown.css';

type DropdownProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id'> & {
  label: string;
  message?: ReactNode;
};

function Dropdown({ label, message, onBlur, onChange, onInvalid, ...props }: DropdownProps) {
  const dropdownId = useId();
  const { hasError, validationError, handleBlur, handleChange, handleInvalid } = useFieldValidation<HTMLSelectElement>(
    { label, onBlur, onChange, onInvalid }
  );
  const { messageId, shownMessage, describedBy } = useFieldMessage({
    id: dropdownId,
    message,
    validationError: hasError ? validationError : '',
    describedBy: props['aria-describedby']
  });

  return (
    <div className="dropdown-field">
      <Label htmlFor={dropdownId} label={label} required={props.required}>
        <span className="dropdown-control">
          <select
            id={dropdownId}
            className="dropdown"
            {...props}
            aria-describedby={describedBy}
            aria-invalid={hasError ? true : props['aria-invalid']}
            onBlur={handleBlur}
            onChange={handleChange}
            onInvalid={handleInvalid}
          />
        </span>
      </Label>
      {shownMessage != null && (
        <div id={messageId}>
          <FormMessage error={hasError}>{shownMessage}</FormMessage>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
