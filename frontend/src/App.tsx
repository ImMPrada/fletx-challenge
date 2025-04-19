import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import { AuthProvider } from './contexts/auth-context';
import Flash from './components/flash';
import { FlashProvider } from './contexts/flash-context';

function App() {
  return (
    <FlashProvider>
      <AuthProvider>
        <Router>
          <Flash>
            <AppRoutes />
          </Flash>
        </Router>
      </AuthProvider>
    </FlashProvider>
  );
}

export default App;
