// App.tsx
import { BrowserRouter } from 'react-router-dom';
import AppRoute from './routes/AppRoute'; // component JSX
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <AppRoute />
    </AuthProvider>
  );
}

export default App;
