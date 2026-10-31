import { useId, type ReactNode } from 'react';
import Icon, { IconName } from '../../../consts/icons';
import './expansion-panel.css';

type ExpansionPanelProps = {
  title: string;
  expanded: boolean;
  onToggle: () => void;
  headerAdornment?: ReactNode;
  children: ReactNode;
};

function ExpansionPanel({ title, expanded, onToggle, headerAdornment, children }: ExpansionPanelProps) {
  const contentId = useId();

  return (
    <section className="expansion-panel border rounded-card bg-surface-default">
      <div className="expansion-panel-header flex items-center justify-between gap-tight bg-surface-subtle p-control">
        <h2 className="expansion-panel-heading text-title font-weight-strong">
          <button
            className="expansion-panel-toggle flex items-center gap-tight border-none focus-ring font-body font-weight-strong"
            type="button"
            aria-expanded={expanded}
            aria-controls={contentId}
            onClick={onToggle}
          >
            <Icon
              className={`expansion-panel-icon${expanded ? ' is-expanded' : ''}`}
              name={IconName.ExpandMore}
              size="small"
            />
            <span>{title}</span>
          </button>
        </h2>
        {headerAdornment}
      </div>
      <div className="expansion-panel-content" id={contentId} hidden={!expanded}>
        {children}
      </div>
    </section>
  );
}

export default ExpansionPanel;
