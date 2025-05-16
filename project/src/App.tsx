import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Homepage } from './pages/Homepage';
import { PredictionTool } from './pages/PredictionTool';
import { MarketResearch } from './pages/MarketResearch';
import { PropertyComparison } from './pages/PropertyComparison';
import { Dashboard } from './pages/Dashboard';
import { LoginPage } from './pages/LoginPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import './styles/global.css';

// Protected route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <LoadingSpinner size="large" />
        <p className="mt-4 text-gray-600">Loading your dashboard...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function AppContent() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/prediction" element={<PredictionTool />} />
          <Route path="/research" element={<MarketResearch />} />
          <Route path="/comparison" element={<PropertyComparison />} />
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;