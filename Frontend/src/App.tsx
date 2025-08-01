import { useRoutes } from 'react-router-dom';
import AppRoute from './routes';

function App() {
  const routing = useRoutes(AppRoute);
  return <>{routing}</>;
}

export default App;
