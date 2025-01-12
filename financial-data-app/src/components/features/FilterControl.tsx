import React from "react";

interface FilterControlsProps {
  onFilterChange: (filters: {
    dateRange: { start: string; end: string };
    revenue: { min: string; max: string };
    netIncome: { min: string; max: string };
  }) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({ onFilterChange }) => {
  // We use local state to manage filter values before applying them
  const [filters, setFilters] = React.useState({
    dateRange: { start: "", end: "" },
    revenue: { min: "", max: "" },
    netIncome: { min: "", max: "" },
  });

  // Handle individual filter changes
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

  // Notify parent component when filters change
  React.useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Date Range Filter */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Date Range
        </label>
        <div className="flex gap-2">
          <input
            type="date"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={filters.dateRange.start}
            onChange={(e) =>
              handleFilterChange("dateRange", "start", e.target.value)
            }
            placeholder="Start Date"
          />
          <input
            type="date"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={filters.dateRange.end}
            onChange={(e) =>
              handleFilterChange("dateRange", "end", e.target.value)
            }
            placeholder="End Date"
          />
        </div>
      </div>

      {/* Revenue Filter */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Revenue Range (in millions)
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={filters.revenue.min}
            onChange={(e) =>
              handleFilterChange("revenue", "min", e.target.value)
            }
            placeholder="Min"
          />
          <input
            type="number"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={filters.revenue.max}
            onChange={(e) =>
              handleFilterChange("revenue", "max", e.target.value)
            }
            placeholder="Max"
          />
        </div>
      </div>

      {/* Net Income Filter */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Net Income Range (in millions)
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={filters.netIncome.min}
            onChange={(e) =>
              handleFilterChange("netIncome", "min", e.target.value)
            }
            placeholder="Min"
          />
          <input
            type="number"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={filters.netIncome.max}
            onChange={(e) =>
              handleFilterChange("netIncome", "max", e.target.value)
            }
            placeholder="Max"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
