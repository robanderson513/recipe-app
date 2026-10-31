import { useState, type ReactNode } from 'react';
import Icon, { IconName } from '../../consts/icons';
import NavigationLinks from './NavigationLinks';
import './navigation.css';

function AppLayout({ children }: { children: ReactNode }) {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  return (
    <div className="app-container">
      <header className="app-header">
        <a className="brand" href="/" aria-label="Recipe App home">
          Recipe App
        </a>
        <button
          className="navigation-toggle"
          type="button"
          aria-controls="desktop-navigation-panel"
          aria-expanded={isNavigationOpen}
          aria-label={isNavigationOpen ? 'Close navigation' : 'Open navigation'}
          onClick={() => setIsNavigationOpen((isOpen) => !isOpen)}
        >
          <Icon name={isNavigationOpen ? IconName.Close : IconName.Menu} size="small" strokeWidth={2} />
        </button>
      </header>

      <div className="content-layout">
        <aside
          className={`desktop-sidebar${isNavigationOpen ? ' is-open' : ''}`}
          id="desktop-navigation-panel"
          aria-label="Desktop navigation"
          aria-hidden={!isNavigationOpen}
          inert={!isNavigationOpen}
        >
          <NavigationLinks variant="desktop" />
        </aside>

        <main className="page-content">{children}</main>
      </div>

      <NavigationLinks variant="mobile" />
    </div>
  );
}

export default AppLayout;
