import { useState, useCallback } from 'react';

/**
 * useApi - Custom hook for API calls with loading/error state
 * @param {Function} apiCall - The API function to call
 * @param {boolean} autoExecute - Whether to call the API immediately
 */
export const useApi = (apiCall, autoExecute = false) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(autoExecute);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiCall(...args);
        setData(response.data);
        return response.data;
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message;
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiCall]
  );

  // Auto-execute if enabled
  useCallback(() => {
    if (autoExecute) {
      execute();
    }
  }, [autoExecute, execute])();

  return { data, loading, error, execute };
};

export default useApi;
