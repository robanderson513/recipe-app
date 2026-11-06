import { useId } from 'react';
import Button from '@ui/Button';
import { Input, Label } from '@form';

type RepeatableFieldProps = {
  label: string;
  addButtonText: string;
  placeholder: string;
  values: string[];
  onChange: (nextValues: string[]) => void;
};

function RepeatableField({ label, addButtonText, placeholder, values, onChange }: RepeatableFieldProps) {
  const fieldId = useId();

  const handleValueChange = (index: number, nextValue: string) => {
    const nextValues = [...values];
    nextValues[index] = nextValue;
    onChange(nextValues);
  };

  const handleAddItem = () => {
    onChange([...values, '']);
  };

  const handleRemoveItem = (index: number) => {
    const nextValues = values.filter((_, itemIndex) => itemIndex !== index);
    onChange(nextValues.length > 0 ? nextValues : ['']);
  };

  return (
    <fieldset className="flex flex-col gap-4 border rounded-card bg-surface-subtle p-4">
      <legend className="font-weight-strong">{label}</legend>
      {values.map((value, index) => (
        <div key={`${label}-${index}`} className="flex flex-col gap-1">
          <div className="flex justify-between items-center gap-2">
            <Label htmlFor={`${fieldId}-${index}`} label={`${label} ${index + 1}`} />
            <Button
              variant="text-neutral"
              type="button"
              onClick={() => handleRemoveItem(index)}
              aria-label={`Remove ${label.toLowerCase()} ${index + 1}`}
            >
              Remove
            </Button>
          </div>
          <Input
            id={`${fieldId}-${index}`}
            name={`${label.toLowerCase()}-${index + 1}`}
            value={value}
            placeholder={placeholder}
            onChange={(event) => handleValueChange(index, event.target.value)}
          />
        </div>
      ))}

      <div className="flex justify-start">
        <Button variant="tonal" type="button" onClick={handleAddItem}>
          {addButtonText}
        </Button>
      </div>
    </fieldset>
  );
}

export default RepeatableField;
