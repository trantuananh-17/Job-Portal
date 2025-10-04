import { useRoutes } from 'react-router-dom';
import AppRoute from './routes';
import { AuthProvider } from './context/AuthContext';

function App() {
  const routing = useRoutes(AppRoute);
  return (
    <>
      <AuthProvider>{routing}</AuthProvider>
    </>
  );
}

export default App;
