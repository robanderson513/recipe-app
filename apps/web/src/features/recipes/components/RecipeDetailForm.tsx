import type { ChangeEventHandler, FormEventHandler } from 'react';
import Button from '@ui/Button';
import { Dropdown, Input, RepeatableField, TextArea } from '@form';
import './recipe-detail-form.css';

type MeasurementSystem = 'metric' | 'imperial';

export type RecipeFormState = {
  name: string;
  description: string;
  groupId: string;
  measurementSystem: MeasurementSystem;
  ingredients: string[];
  steps: string[];
};

export type RecipeGroup = {
  id: string;
  name: string;
};

type RecipeDetailFormProps = {
  formState: RecipeFormState;
  recipeGroups: RecipeGroup[];
  isSubmitting: boolean;
  submitError: string;
  onInputChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
  onListChange: (fieldName: 'ingredients' | 'steps', nextValues: string[]) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onCancel: () => void;
};

function RecipeDetailForm({
  formState,
  recipeGroups,
  isSubmitting,
  submitError,
  onInputChange,
  onListChange,
  onSubmit,
  onCancel
}: RecipeDetailFormProps) {
  return (
    <form className="recipe-detail-form flex flex-col gap-section" onSubmit={onSubmit}>
      <div className="field-group">
        <Input
          label="Recipe name"
          name="name"
          value={formState.name}
          onChange={onInputChange}
          placeholder="Ex. Lemon herb chicken"
          required
        />

        <TextArea
          label="Recipe description"
          name="description"
          value={formState.description}
          onChange={onInputChange}
          placeholder="Tell your future self what makes this recipe special."
        />
      </div>

      <div className="field-row">
        <Dropdown
          label="Recipe group"
          name="groupId"
          value={formState.groupId}
          onChange={onInputChange}
          options={[
            { key: '', value: 'No group' },
            ...recipeGroups.map((group) => ({ key: group.id, value: group.name }))
          ]}
        />

        <Dropdown
          label="Measurement system"
          name="measurementSystem"
          value={formState.measurementSystem}
          onChange={onInputChange}
          options={[
            { key: 'metric', value: 'Metric' },
            { key: 'imperial', value: 'Imperial' }
          ]}
        />
      </div>

      <RepeatableField
        label="Ingredients"
        addButtonText="Add ingredient"
        placeholder="Ex. 2 cups flour"
        values={formState.ingredients}
        onChange={(nextValues) => onListChange('ingredients', nextValues)}
      />

      <RepeatableField
        label="Steps"
        addButtonText="Add step"
        placeholder="Ex. Preheat the oven to 180°C"
        values={formState.steps}
        onChange={(nextValues) => onListChange('steps', nextValues)}
      />

      {submitError && (
        <p className="recipe-detail-error" role="alert">
          {submitError}
        </p>
      )}

      <div className="flex justify-end gap-compact">
        <Button variant="secondary" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save recipe'}
        </Button>
      </div>
    </form>
  );
}

export default RecipeDetailForm;
