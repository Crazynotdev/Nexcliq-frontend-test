import { GlobalStyles } from './styles';
import { AuthProvider } from './auth';
import { ToastProvider } from './components';
import { ThemeProvider } from './theme';
import { AppRouter } from './screens';

export default function App() {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <AppRouter />
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </>
  );
}
