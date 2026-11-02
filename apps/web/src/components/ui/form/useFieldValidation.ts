import { useState, type ChangeEvent, type FocusEvent, type InvalidEvent } from 'react';

type FieldValidationOptions<T extends HTMLInputElement | HTMLSelectElement> = {
  label: string;
  onBlur?: (event: FocusEvent<T>) => void;
  onChange?: (event: ChangeEvent<T>) => void;
  onInvalid?: (event: InvalidEvent<T>) => void;
};

function getValidationError(field: HTMLInputElement | HTMLSelectElement, label: string) {
  if (field.validity.valid) {
    return '';
  }

  if (field.validity.valueMissing) {
    return `${label} is required`;
  }

  return field.validationMessage;
}

function useFieldValidation<T extends HTMLInputElement | HTMLSelectElement>({
  label,
  onBlur,
  onChange,
  onInvalid
}: FieldValidationOptions<T>) {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleBlur = (event: FocusEvent<T>) => {
    setHasInteracted(true);
    setValidationError(getValidationError(event.currentTarget, label));
    onBlur?.(event);
  };

  const handleChange = (event: ChangeEvent<T>) => {
    if (hasInteracted) {
      setValidationError(getValidationError(event.currentTarget, label));
    }
    onChange?.(event);
  };

  const handleInvalid = (event: InvalidEvent<T>) => {
    event.preventDefault();
    setHasInteracted(true);
    setValidationError(getValidationError(event.currentTarget, label));
    onInvalid?.(event);
  };

  return {
    hasError: validationError !== '',
    validationError,
    handleBlur,
    handleChange,
    handleInvalid
  };
}

export default useFieldValidation;
