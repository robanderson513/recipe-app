import type { IconName } from '../../consts/icons';

export type NavigationDestination = {
  readonly label: string;
  readonly href: string;
  readonly icon: IconName;
};

export const NAVIGATION_DESTINATIONS: readonly NavigationDestination[];
export function getActiveNavigationDestination(
  pathname: string,
): NavigationDestination;
