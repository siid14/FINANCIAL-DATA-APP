// src/components/features/FinancialApp.tsx
import React, { useState, useEffect } from "react";
import { APIService } from "../../services/api";
import { FinancialStatement } from "../../types";
import FinancialTable from "./FinancialTable";

function FinancialApp() {
  // State management for our data and loading states
  const [data, setData] = useState<FinancialStatement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Effect to fetch data when the component mounts
  useEffect(() => {
    async function fetchFinancialData() {
      try {
        // Get the API key from environment variables
        const apiKey = import.meta.env.VITE_FMP_API_KEY;

        if (!apiKey) {
          throw new Error(
            "API key not found. Please check your environment variables."
          );
        }

        // Create an instance of our API service
        const apiService = new APIService(apiKey);

        // Fetch and set the data
        const financialData = await apiService.getFinancialStatements();
        setData(financialData);
      } catch (err) {
        // Handle any errors that occur during fetching
        setError(
          err instanceof Error ? err.message : "Failed to fetch financial data"
        );
      } finally {
        // Always mark loading as complete
        setIsLoading(false);
      }
    }

    // Call our fetch function
    fetchFinancialData();
  }, []); // Empty dependency array means this effect runs once when component mounts

  // Render our table component once data is loaded
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Apple Inc. Financial Data</h1>
      <FinancialTable data={data} isLoading={isLoading} error={error} />
    </div>
  );
}

export default FinancialApp;
