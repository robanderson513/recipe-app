import { useId, useState, type SubmitEvent } from 'react';
import Button from '../../../components/ui/Button/Button';
import Dialog from '../../../components/ui/Dialog/Dialog';

type AddRecipeGroupDialogProps = {
  onCancel: () => void;
  onSubmit: (name: string) => Promise<void>;
};

function AddRecipeGroupDialog({ onCancel, onSubmit }: AddRecipeGroupDialogProps) {
  const nameInputId = useId();
  const formId = useId();
  const [groupName, setGroupName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = groupName.trim();
    if (!trimmedName || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    try {
      await onSubmit(trimmedName);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to save the recipe group. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      title="Create a recipe group"
      onClose={onCancel}
      actions={
        <>
          <Button variant="text-neutral" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" form={formId} disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save group'}
          </Button>
        </>
      }
    >
      <form id={formId} onSubmit={handleSubmit}>
        <label htmlFor={nameInputId}>
          <span>Group name</span>
          <input
            id={nameInputId}
            name="groupName"
            type="text"
            value={groupName}
            onChange={(event) => setGroupName(event.target.value)}
            placeholder="Ex. Favorites"
            autoFocus
            required
          />
        </label>
        {submitError && <p role="alert">{submitError}</p>}
      </form>
    </Dialog>
  );
}

export default AddRecipeGroupDialog;
