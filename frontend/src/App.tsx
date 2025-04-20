import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import { AuthProvider } from './contexts/auth-context';
import Flash from './components/flash';
import { FlashProvider } from './contexts/flash-context';
import { DepartmentsProvider } from './contexts/departments-context';

function App() {
  return (
    <FlashProvider>
      <DepartmentsProvider>
        <AuthProvider>
          <Router>
          <Flash>
            <AppRoutes />
            </Flash>
          </Router>
        </AuthProvider>
      </DepartmentsProvider>
    </FlashProvider>
  );
}

export default App;
