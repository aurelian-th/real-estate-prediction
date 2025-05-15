import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './ui/Button';
import { RefreshCw, Home } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
    
    // In a real app, you might send this to a logging service
    // logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render the error UI
      return <ErrorFallback 
        error={this.state.error} 
        resetErrorBoundary={() => {
          this.setState({ hasError: false, error: null, errorInfo: null });
        }}
      />;
    }

    return this.props.children;
  }
}

// The error fallback UI component
function ErrorFallback({ error, resetErrorBoundary }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full">
        <div className="text-red-500 mb-4 flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Something went wrong</h2>
        <p className="text-gray-600 mb-4">
          We're sorry, but an error occurred while rendering this page.
        </p>
        {error && (
          <div className="bg-gray-100 p-3 rounded mb-4 overflow-auto text-sm font-mono text-gray-800">
            {error.toString()}
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={resetErrorBoundary} className="flex items-center justify-center">
            <RefreshCw size={18} className="mr-2" />
            Try Again
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate('/')} 
            className="flex items-center justify-center"
          >
            <Home size={18} className="mr-2" />
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ErrorBoundary;
