import { useEffect } from 'react';
import { useBlocker } from 'react-router-dom';
import Button from '@ui/Button';
import Dialog from '@ui/Dialog';

function useUnsavedChanges(isDirty: boolean) {
  const blocker = useBlocker(isDirty);

  useEffect(() => {
    if (!isDirty) {
      return;
    }

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  if (blocker.state !== 'blocked') {
    return null;
  }

  return (
    <Dialog
      title="Unsaved Changes"
      size="small"
      onClose={blocker.reset}
      actions={
        <>
          <Button variant="text-neutral" onClick={blocker.reset}>
            Cancel
          </Button>
          <Button onClick={blocker.proceed}>Continue</Button>
        </>
      }
    >
      <p>You have unsaved changes that will be lost. Continue?</p>
    </Dialog>
  );
}

export default useUnsavedChanges;
