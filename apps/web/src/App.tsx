import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';
import AppLayout from './components/navigation/AppLayout';
import { APP_ROUTES } from './routes';

const router = createBrowserRouter([
  {
    element: (
      <AppLayout>
        <Outlet />
      </AppLayout>
    ),
    children: [
      ...APP_ROUTES.map(({ path, element }) => ({ path, element })),
      { path: '*', element: <Navigate to="/" replace /> }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
