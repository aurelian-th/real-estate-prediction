import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="mb-8">
        <div className="text-blue-500 mb-4">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M60 10L95 30V90L60 110L25 90V30L60 10Z" stroke="currentColor" strokeWidth="6" fill="none" />
            <path d="M60 40V80" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
            <circle cx="60" cy="90" r="5" fill="currentColor" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button variant="primary" className="flex items-center justify-center">
              <Home size={18} className="mr-2" />
              Go to Home
            </Button>
          </Link>
          <button onClick={() => window.history.back()} className="flex items-center justify-center text-blue-600 hover:text-blue-800">
            <ArrowLeft size={18} className="mr-2" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
