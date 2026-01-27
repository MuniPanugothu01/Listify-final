// Update your existing SignUp component with the following changes:

// Import hooks
import { useAuth } from '../../hooks/useAuth';

// Inside your component
export default function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    loading,
    error,
    success,
    clearAuthError,
    isAuthenticated,
  } = useAuth();

  // Remove axios import
  // Remove const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearAuthError();
    }
  }, [error, clearAuthError]);

  useEffect(() => {
    if (success) {
      toast.success('Account created successfully!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }
  }, [success, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Update handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    // Use Redux action instead of axios
    await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    });
  };

  // Remove setLoading from button state
  // Update button to use loading from Redux
  <button
    type="submit"
    disabled={loading}
    className={`w-full ${
      loading
        ? 'bg-gray-400 cursor-not-allowed'
        : 'bg-[#27bb97] hover:bg-[#1fa987]'
    } text-white py-3 rounded-lg font-medium transition-colors cursor-pointer flex items-center justify-center`}
  >
    {loading ? (
      <>
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Creating Account...
      </>
    ) : (
      'Create Account'
    )}
  </button>
}