import { useId, useState, type SubmitEvent } from 'react';
import Button from '../../../components/ui/Button/Button';
import Dialog from '../../../components/ui/Dialog/Dialog';

type AddRecipeGroupDialogProps = {
  onCancel: () => void;
  onSubmit: (name: string) => void;
};

function AddRecipeGroupDialog({ onCancel, onSubmit }: AddRecipeGroupDialogProps) {
  const nameInputId = useId();
  const formId = useId();
  const [groupName, setGroupName] = useState('');

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = groupName.trim();
    if (trimmedName) {
      onSubmit(trimmedName);
    }
  };

  return (
    <Dialog
      title="Create a recipe group"
      onClose={onCancel}
      actions={
        <>
          <Button variant="text-neutral" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" form={formId}>
            Save group
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
      </form>
    </Dialog>
  );
}

export default AddRecipeGroupDialog;
