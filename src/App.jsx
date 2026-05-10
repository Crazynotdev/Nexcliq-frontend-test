import { GlobalStyles } from './styles';
import { AuthProvider } from './auth';
import { ToastProvider } from './components';
import { AppRouter } from './screens';

export default function App() {
  return (
    <>
      <GlobalStyles />
      <ToastProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </ToastProvider>
    </>
  );
}
