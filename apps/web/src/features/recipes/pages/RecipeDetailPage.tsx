import { useEffect, useMemo, useState, type ChangeEvent, type SubmitEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUnsavedChanges } from '@hooks';
import RecipeDetailForm, { type RecipeFormState, type RecipeGroup } from '../components/RecipeDetailForm';

const DEFAULT_GROUPS: RecipeGroup[] = [
  { id: 'favorites', name: 'Favorites' },
  { id: 'weeknight', name: 'Weeknight dinners' },
  { id: 'desserts', name: 'Desserts' }
];

const createEmptyRecipeForm = (): RecipeFormState => ({
  name: '',
  description: '',
  groupId: '',
  measurementSystem: 'metric',
  ingredients: [''],
  steps: ['']
});

function RecipeDetailPage() {
  const navigate = useNavigate();
  const initialFormState = useMemo(() => createEmptyRecipeForm(), []);
  const [formState, setFormState] = useState<RecipeFormState>(initialFormState);
  const [recipeGroups, setRecipeGroups] = useState(DEFAULT_GROUPS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const isDirty = JSON.stringify(formState) !== JSON.stringify(initialFormState);

  const unsavedChangesDialog = useUnsavedChanges(isDirty);

  useEffect(() => {
    const loadGroups = async () => {
      try {
        const response = await fetch('/api/recipe-groups');
        if (!response.ok) {
          return;
        }

        const groups = await response.json();
        if (Array.isArray(groups) && groups.length > 0) {
          setRecipeGroups(
            groups.map((group: { id?: string; name?: string }) => ({
              id: String(group.id ?? group.name ?? ''),
              name: String(group.name ?? 'Untitled group')
            }))
          );
        }
      } catch {
        // Fall back to the default recipe groups when the API is unavailable.
      }
    };

    void loadGroups();
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormState((currentState) => ({ ...currentState, [name]: value }));
  };

  const handleListChange = (fieldName: 'ingredients' | 'steps', nextValues: string[]) => {
    setFormState((currentState) => ({ ...currentState, [fieldName]: nextValues }));
  };

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = formState.name.trim();
    if (!trimmedName) {
      setSubmitError('Please enter a recipe name before saving.');
      return;
    }

    const payload = {
      name: trimmedName,
      description: formState.description.trim(),
      groupId: formState.groupId || null,
      measurementSystem: formState.measurementSystem,
      ingredients: formState.ingredients.map((ingredient) => ({ name: ingredient.trim() })).filter(Boolean),
      steps: formState.steps.map((step) => step.trim()).filter(Boolean)
    };

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Unable to save the recipe. Please try again.');
      }

      navigate('/recipes');
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to save the recipe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div className="flex flex-col gap-2">
          <p className="overline">Create</p>
          <h1 className="text-display font-heading font-weight-emphasis">Recipe detail</h1>
        </div>
      </div>

      <RecipeDetailForm
        formState={formState}
        recipeGroups={recipeGroups}
        isSubmitting={isSubmitting}
        submitError={submitError}
        onInputChange={handleInputChange}
        onListChange={handleListChange}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/recipes')}
      />
      {unsavedChangesDialog}
    </section>
  );
}

export default RecipeDetailPage;
