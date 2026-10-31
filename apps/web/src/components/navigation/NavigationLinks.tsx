import { NavLink } from 'react-router-dom';
import Icon from '../../consts/icons';
import { NAVIGATION_LINKS } from '../../routes';

function NavigationLinks({ variant }: { variant: 'desktop' | 'mobile' }) {
  return (
    <nav className={`${variant}-navigation`} aria-label="Primary navigation">
      {NAVIGATION_LINKS.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.to === '/'}
          className={({ isActive }) => `navigation-link${isActive ? ' is-active' : ''}`}
        >
          <Icon name={link.icon} size={variant === 'mobile' ? 'large' : 'small'} />
          {variant === 'desktop' && <span>{link.label}</span>}
        </NavLink>
      ))}
    </nav>
  );
}

export default NavigationLinks;
