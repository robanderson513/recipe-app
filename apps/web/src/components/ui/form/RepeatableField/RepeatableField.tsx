import Button from '@ui/Button';
import { Input, Label } from '@form';
import './repeatable-field.css';

type RepeatableFieldProps = {
  label: string;
  addButtonText: string;
  placeholder: string;
  values: string[];
  onChange: (nextValues: string[]) => void;
};

function RepeatableField({ label, addButtonText, placeholder, values, onChange }: RepeatableFieldProps) {
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
    <fieldset className="repeatable-field">
      <h3>{label}</h3>
      {values.map((value, index) => (
        <div key={`${label}-${index}`} className="flex flex-col gap-2">
          <div className="flex justify-between items-center gap-2">
            <Label label={`${label} ${index + 1}`} htmlFor={`${label.toLowerCase()}-${index + 1}`} />

            <Button
              variant="text-neutral"
              onClick={() => handleRemoveItem(index)}
              aria-label={`Remove ${label.toLowerCase()} ${index + 1}`}
            >
              Remove
            </Button>
          </div>

          <Input
            name={`${label.toLowerCase()}-${index + 1}`}
            value={value}
            placeholder={placeholder}
            onChange={(event) => handleValueChange(index, event.target.value)}
          />
        </div>
      ))}

      <Button variant="secondary" onClick={handleAddItem}>
        {addButtonText}
      </Button>
    </fieldset>
  );
}

export default RepeatableField;
