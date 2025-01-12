// src/components/features/FinancialApp.tsx
import React, { useState, useEffect } from "react";
import { APIService } from "../../services/api";
import { FinancialStatement } from "../../types";
import FinancialTable from "./FinancialTable";
import FilterControls from "./FilterControl";

function FinancialApp() {
  // State management for our data and loading states
  const [data, setData] = useState<FinancialStatement[]>([]);
  const [filteredData, setFilteredData] = useState<FinancialStatement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter handler
  const handleFilterChange = (filters: {
    dateRange: { start: string; end: string };
    revenue: { min: string; max: string };
    netIncome: { min: string; max: string };
  }) => {
    // Apply filters to data
    const filtered = data.filter((item) => {
      const itemDate = new Date(item.date);
      const startDate = filters.dateRange.start
        ? new Date(filters.dateRange.start)
        : null;
      const endDate = filters.dateRange.end
        ? new Date(filters.dateRange.end)
        : null;

      // Date range filter
      if (startDate && itemDate < startDate) return false;
      if (endDate && itemDate > endDate) return false;

      // Revenue filter
      const minRevenue = filters.revenue.min
        ? parseFloat(filters.revenue.min) * 1000000
        : null;
      const maxRevenue = filters.revenue.max
        ? parseFloat(filters.revenue.max) * 1000000
        : null;
      if (minRevenue && item.revenue < minRevenue) return false;
      if (maxRevenue && item.revenue > maxRevenue) return false;

      // Net Income filter
      const minNetIncome = filters.netIncome.min
        ? parseFloat(filters.netIncome.min) * 1000000
        : null;
      const maxNetIncome = filters.netIncome.max
        ? parseFloat(filters.netIncome.max) * 1000000
        : null;
      if (minNetIncome && item.netIncome < minNetIncome) return false;
      if (maxNetIncome && item.netIncome > maxNetIncome) return false;

      return true;
    });

    setFilteredData(filtered);
  };

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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-blue-600 text-center sm:text-left">
          Apple Inc. Financial Data
        </h1>
        <FilterControls onFilterChange={handleFilterChange} />
        <FinancialTable
          data={filteredData}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
}

export default FinancialApp;
