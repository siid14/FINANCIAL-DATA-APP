import React from "react";

interface FilterControlsProps {
  onFilterChange: (filters: {
    dateRange: { start: string; end: string };
    revenue: { min: string; max: string };
    netIncome: { min: string; max: string };
  }) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({ onFilterChange }) => {
  // local state to store filter values before applying them
  const [filters, setFilters] = React.useState({
    dateRange: { start: "", end: "" },
    revenue: { min: "", max: "" },
    netIncome: { min: "", max: "" },
  });

  // updates individual filter values
  const handleFilterChange = (
    category: "dateRange" | "revenue" | "netIncome",
    field: "start" | "end" | "min" | "max",
    value: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };

  // notify parent component whenever filters change
  React.useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* date range filter */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Date Range
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1">
              <input
                type="date"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                value={filters.dateRange.start}
                onChange={(e) =>
                  handleFilterChange("dateRange", "start", e.target.value)
                }
                placeholder="Start Date"
              />
            </div>
            <div className="flex-1">
              <input
                type="date"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                value={filters.dateRange.end}
                onChange={(e) =>
                  handleFilterChange("dateRange", "end", e.target.value)
                }
                placeholder="End Date"
              />
            </div>
          </div>
        </div>

        {/* revenue filter */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Revenue Range (in millions)
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1">
              <input
                type="number"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                value={filters.revenue.min}
                onChange={(e) =>
                  handleFilterChange("revenue", "min", e.target.value)
                }
                placeholder="Min"
              />
            </div>
            <div className="flex-1">
              <input
                type="number"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                value={filters.revenue.max}
                onChange={(e) =>
                  handleFilterChange("revenue", "max", e.target.value)
                }
                placeholder="Max"
              />
            </div>
          </div>
        </div>

        {/* net income filter */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Net Income Range (in millions)
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1">
              <input
                type="number"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                value={filters.netIncome.min}
                onChange={(e) =>
                  handleFilterChange("netIncome", "min", e.target.value)
                }
                placeholder="Min"
              />
            </div>
            <div className="flex-1">
              <input
                type="number"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                value={filters.netIncome.max}
                onChange={(e) =>
                  handleFilterChange("netIncome", "max", e.target.value)
                }
                placeholder="Max"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
