import type { ReactNode } from 'react';
import { IconName } from './consts/icons';

type AppRoute = {
  path: string;
  element: ReactNode;
  navigation?: {
    label: string;
    to: string;
    icon: IconName;
  };
};

function HomePage() {
  return (
    <section className="welcome">
      <p className="eyebrow">Your kitchen starts here</p>
      <h1>Recipe App</h1>
      <p className="intro">A fresh place to collect, organize, and cook the recipes you love.</p>
      <div className="status">
        <span className="status-indicator" aria-hidden="true" />
        Ready for your first recipe
      </div>
    </section>
  );
}

function RecipesPage() {
  return (
    <section className="welcome">
      <p className="eyebrow">Your collection</p>
      <h1>My Recipes</h1>
      <p className="intro">Your saved recipes will appear here.</p>
    </section>
  );
}

export const APP_ROUTES = [
  {
    path: '/',
    element: <HomePage />,
    navigation: { label: 'Home', to: '/', icon: IconName.Home }
  },
  {
    path: '/recipes/*',
    element: <RecipesPage />,
    navigation: {
      label: 'My Recipes',
      to: '/recipes',
      icon: IconName.Recipes
    }
  }
] satisfies readonly AppRoute[];

export const NAVIGATION_LINKS = APP_ROUTES.flatMap((route) => (route.navigation ? [route.navigation] : []));
