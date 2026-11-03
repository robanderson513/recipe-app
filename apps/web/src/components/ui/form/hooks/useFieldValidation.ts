import { useState, type ChangeEvent, type FocusEvent, type InvalidEvent } from 'react';

type ValidatableField = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

type FieldValidationOptions<T extends ValidatableField> = {
  label?: string;
  onBlur?: (event: FocusEvent<T>) => void;
  onChange?: (event: ChangeEvent<T>) => void;
  onInvalid?: (event: InvalidEvent<T>) => void;
};

function getFieldLabel(field: ValidatableField, label?: string) {
  const labelledBy = field.getAttribute('aria-labelledby');
  if (labelledBy) {
    const referencedLabels = labelledBy
      .split(/\s+/)
      .map((id) => field.ownerDocument.getElementById(id)?.textContent?.trim())
      .filter((text): text is string => Boolean(text));

    if (referencedLabels.length > 0) {
      return referencedLabels.join(' ');
    }
  }

  return field.getAttribute('aria-label')?.trim() || label || 'This field';
}

function getValidationError(field: ValidatableField, label?: string) {
  if (field.validity.valid) {
    return '';
  }

  if (field.validity.valueMissing) {
    return `${getFieldLabel(field, label)} is required`;
  }

  return field.validationMessage;
}

function useFieldValidation<T extends ValidatableField>({
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
