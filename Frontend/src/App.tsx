// App.tsx
import AppRoute from './routes/AppRoute'; // component JSX
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <AuthProvider>
      <AppRoute />
      <>
        <ToastContainer
          className={'xs:scale-90 xs:text-sm rounded-2xl md:scale-100 md:p-0 md:text-base'}
          position='top-right'
          autoClose={3000}
          pauseOnHover
          theme='colored'
        />
      </>
    </AuthProvider>
  );
}

export default App;
