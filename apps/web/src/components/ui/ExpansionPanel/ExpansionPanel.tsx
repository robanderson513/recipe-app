import { useId, useState, type ReactNode } from 'react';
import Icon, { IconName } from '../../../consts/icons';
import './expansion-panel.css';

type ExpansionPanelProps = {
  title: string;
  headerAdornment?: ReactNode;
  children: ReactNode;
};

function ExpansionPanel({ title, headerAdornment, children }: ExpansionPanelProps) {
  const contentId = useId();
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <section className="expansion-panel">
      <div className="flex items-center justify-between gap-tight bg-surface-subtle p-control">
        <h2 className="text-title font-weight-strong">
          <button
            className="expansion-panel-toggle"
            type="button"
            aria-expanded={isExpanded}
            aria-controls={contentId}
            onClick={() => setIsExpanded((currentExpanded) => !currentExpanded)}
          >
            <Icon
              className={`expansion-panel-icon${isExpanded ? ' is-expanded' : ''}`}
              name={IconName.ExpandMore}
              size="small"
            />
            <span>{title}</span>
          </button>
        </h2>
        {headerAdornment}
      </div>
      <div className="expansion-panel-content" id={contentId} hidden={!isExpanded}>
        {children}
      </div>
    </section>
  );
}

export default ExpansionPanel;
