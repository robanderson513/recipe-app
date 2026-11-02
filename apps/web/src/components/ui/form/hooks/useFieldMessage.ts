import type { ReactNode } from 'react';

type FieldMessageOptions = {
  id: string;
  message?: ReactNode;
  validationError: string;
  describedBy?: string;
};

function useFieldMessage({ id, message, validationError, describedBy }: FieldMessageOptions) {
  const messageId = `${id}-message`;
  const shownMessage = validationError || message;
  const describedByIds = [describedBy, shownMessage != null ? messageId : undefined].filter(Boolean).join(' ');

  return {
    messageId,
    shownMessage,
    describedBy: describedByIds || undefined
  };
}

export default useFieldMessage;
