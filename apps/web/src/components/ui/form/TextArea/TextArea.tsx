import { useId, type ReactNode, type TextareaHTMLAttributes } from 'react';
import FormMessage from '../FormMessage/FormMessage';
import Label from '../Label/Label';
import useFieldMessage from '../hooks/useFieldMessage';
import useFieldValidation from '../hooks/useFieldValidation';
import './text-area.css';

type TextAreaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> & {
  label?: string;
  message?: ReactNode;
};

function TextArea({ label, message, rows = 4, onBlur, onChange, onInvalid, ...props }: TextAreaProps) {
  const textAreaId = useId();
  const { hasError, validationError, handleBlur, handleChange, handleInvalid } =
    useFieldValidation<HTMLTextAreaElement>({ label, onBlur, onChange, onInvalid });
  const { messageId, shownMessage, describedBy } = useFieldMessage({
    id: textAreaId,
    message,
    validationError: hasError ? validationError : '',
    describedBy: props['aria-describedby']
  });

  return (
    <div className="text-area-field">
      <Label htmlFor={textAreaId} label={label} required={props.required}>
        <textarea
          id={textAreaId}
          className="text-area"
          {...props}
          rows={rows}
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

export default TextArea;
