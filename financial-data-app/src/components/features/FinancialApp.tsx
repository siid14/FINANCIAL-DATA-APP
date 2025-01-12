// src/components/features/FinancialApp.tsx
import React, { useState, useEffect } from "react";
import { APIService } from "../../services/api";
import { FinancialStatement } from "../../types";

function FinancialApp() {
  // We use useState to manage our component's state
  const [data, setData] = useState<FinancialStatement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // This effect runs when the component mounts to fetch our data
    async function fetchData() {
      try {
        // We get our API key from environment variables
        const apiKey = import.meta.env.VITE_FMP_API_KEY;
        if (!apiKey) {
          throw new Error("API key not found");
        }

        const apiService = new APIService(apiKey);
        const financialData = await apiService.getFinancialStatements();
        setData(financialData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  // Show loading state while data is being fetched
  if (isLoading) {
    return <div className="text-center p-4">Loading financial data...</div>;
  }

  // Show error message if something went wrong
  if (error) {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  }

  // Once data is loaded, we can render our table component
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Apple Inc. Financial Data</h1>
    </div>
  );
}

export default FinancialApp;
