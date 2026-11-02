import type { ReactNode } from 'react';
import { IconName } from './consts/icons';
import HomePage from './features/home/pages/HomePage';
import RecipeListPage from './features/recipes/pages/RecipeListPage';

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
    element: <HomePage />,
    navigation: { label: 'Home', to: '/', icon: IconName.Home }
  },
  {
    path: '/recipes/*',
    element: <RecipeListPage />,
    navigation: {
      label: 'My Recipes',
      to: '/recipes',
      icon: IconName.Recipes
    }
  }
] satisfies readonly AppRoute[];

export const NAVIGATION_LINKS = APP_ROUTES.flatMap((route) => (route.navigation ? [route.navigation] : []));
