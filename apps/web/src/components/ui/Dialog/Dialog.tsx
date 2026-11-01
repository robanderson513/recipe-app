import { useId, type MouseEvent, type ReactNode } from 'react';
import './dialog.css';

type DialogProps = {
  title: string;
  onClose: () => void;
  children: ReactNode;
  actions: ReactNode;
};

function Dialog({ title, onClose, children, actions }: DialogProps) {
  const titleId = useId();

  const stopPropagation = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div className="dialog" role="dialog" aria-modal="true" aria-labelledby={titleId} onClick={stopPropagation}>
        <h2 id={titleId}>{title}</h2>
        <div className="dialog-content">{children}</div>
        <div className="dialog-actions">{actions}</div>
      </div>
    </div>
  );
}

export default Dialog;
