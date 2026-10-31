import Icon from '../../consts/icons';
import { getActiveNavigationDestination, NAVIGATION_DESTINATIONS } from './navigation.js';

function NavigationLinks({ variant }: { variant: 'desktop' | 'mobile' }) {
  const activeDestination = getActiveNavigationDestination(window.location.pathname);

  return (
    <nav className={`${variant}-navigation`} aria-label="Primary navigation">
      {NAVIGATION_DESTINATIONS.map((destination) => {
        const isActive = destination.href === activeDestination.href;

        return (
          <a
            className={`navigation-link${isActive ? ' is-active' : ''}`}
            href={destination.href}
            aria-current={isActive ? 'page' : undefined}
            key={destination.href}
          >
            <Icon name={destination.icon} size={variant === 'mobile' ? 'large' : 'small'} />
            {variant === 'desktop' && <span>{destination.label}</span>}
          </a>
        );
      })}
    </nav>
  );
}

export default NavigationLinks;
