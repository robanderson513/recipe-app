import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/navigation/AppLayout';
import { APP_ROUTES } from './routes';

function App() {
  return (
    <AppLayout>
      <Routes>
        {APP_ROUTES.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
