import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Icon, { IconName } from '../../consts/icons';
import Button from '../ui/Button/Button';
import NavigationLinks from './NavigationLinks';
import './navigation.css';

function AppLayout({ children }: { children: ReactNode }) {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  return (
    <div className="app-container">
      <header className="app-header">
        <Link className="brand" to="/" aria-label="Recipe App home">
          Recipe App
        </Link>
        <Button
          variant="icon"
          type="button"
          aria-controls="desktop-navigation-panel"
          aria-expanded={isNavigationOpen}
          aria-label={isNavigationOpen ? 'Close navigation' : 'Open navigation'}
          onClick={() => setIsNavigationOpen((isOpen) => !isOpen)}
        >
          <Icon name={isNavigationOpen ? IconName.Close : IconName.Menu} />
        </Button>
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
