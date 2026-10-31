export const NAVIGATION_DESTINATIONS = [
  { label: 'Home', href: '/', icon: 'home' },
  { label: 'My Recipes', href: '/recipes', icon: 'recipes' },
];

export function getActiveNavigationDestination(pathname) {
  return (
    NAVIGATION_DESTINATIONS.find((destination) =>
      destination.href === '/'
        ? pathname === '/'
        : pathname === destination.href ||
          pathname.startsWith(`${destination.href}/`),
    ) ?? NAVIGATION_DESTINATIONS[0]
  );
}
