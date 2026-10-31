import type { ReactNode } from 'react';
import { IconName } from './consts/icons';
import RecipeStoragePage from './pages/RecipeStoragePage';

type AppRoute = {
  path: string;
  element: ReactNode;
  navigation?: {
    label: string;
    to: string;
    icon: IconName;
  };
};

export const APP_ROUTES = [
  {
    path: '/',
    element: (
      <section className="welcome">
        <p className="eyebrow">Your kitchen starts here</p>
        <h1>Recipe App</h1>
        <p className="intro">A fresh place to collect, organize, and cook the recipes you love.</p>
        <div className="status">
          <span className="status-indicator" aria-hidden="true" />
          Ready for your first recipe
        </div>
      </section>
    ),
    navigation: { label: 'Home', to: '/', icon: IconName.Home }
  },
  {
    path: '/recipes/*',
    element: <RecipeStoragePage />,
    navigation: {
      label: 'My Recipes',
      to: '/recipes',
      icon: IconName.Recipes
    }
  }
] satisfies readonly AppRoute[];

export const NAVIGATION_LINKS = APP_ROUTES.flatMap((route) => (route.navigation ? [route.navigation] : []));
