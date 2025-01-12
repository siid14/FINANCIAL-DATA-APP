import React from "react";
import { FinancialStatement } from "../../types";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import SortHeader from "./SortHeader"; // Make sure this path matches your file structure

interface FinancialTableProps {
  data: FinancialStatement[];
  isLoading: boolean;
  error?: string | null;
}

export const FinancialTable: React.FC<FinancialTableProps> = ({
  data,
  isLoading,
  error,
}) => {
  // Our sort state remains the same
  const [sort, setSort] = React.useState<{
    column: keyof FinancialStatement | null;
    direction: "asc" | "desc" | null;
  }>({
    column: "date",
    direction: "desc",
  });

  // Your existing sortData function remains unchanged
  const sortData = (data: FinancialStatement[]) => {
    if (!sort.column || !sort.direction) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sort.column];
      const bValue = b[sort.column];

      if (sort.column === "date") {
        const aDate = new Date(aValue as string).getTime();
        const bDate = new Date(bValue as string).getTime();
        return sort.direction === "asc" ? aDate - bDate : bDate - aDate;
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sort.direction === "asc" ? aValue - bValue : bValue - aValue;
      }

      return sort.direction === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  };

  const handleSort = (column: keyof FinancialStatement) => {
    setSort((prevSort) => ({
      column,
      direction:
        prevSort.column === column && prevSort.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  // Now we use sortData to get our sorted data
  const sortedData = sortData(data);

  if (isLoading) {
    return (
      <div className="w-full text-center p-4">Loading financial data...</div>
    );
  }

  if (error) {
    return <div className="w-full text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="relative rounded-lg border border-gray-200 shadow-sm">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="sticky top-0 px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  <SortHeader
                    label="Date"
                    column="date"
                    currentSort={sort}
                    onSort={handleSort}
                  />
                </th>
                <th className="sticky top-0 px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  <SortHeader
                    label="Revenue"
                    column="revenue"
                    currentSort={sort}
                    onSort={handleSort}
                  />
                </th>
                <th className="sticky top-0 px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  <SortHeader
                    label="Net Income"
                    column="netIncome"
                    currentSort={sort}
                    onSort={handleSort}
                  />
                </th>
                <th className="sticky top-0 px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  <SortHeader
                    label="Gross Profit"
                    column="grossProfit"
                    currentSort={sort}
                    onSort={handleSort}
                  />
                </th>
                <th className="sticky top-0 px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  <SortHeader
                    label="EPS"
                    column="eps"
                    currentSort={sort}
                    onSort={handleSort}
                  />
                </th>
                <th className="sticky top-0 px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  <SortHeader
                    label="Operating Income"
                    column="operatingIncome"
                    currentSort={sort}
                    onSort={handleSort}
                  />
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedData.map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition-colors`}
                >
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                    {item.date}
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                    ${(item.revenue / 1000000).toFixed(2)}M
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                    ${(item.netIncome / 1000000).toFixed(2)}M
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 hidden md:table-cell">
                    ${(item.grossProfit / 1000000).toFixed(2)}M
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 hidden sm:table-cell">
                    ${item.eps.toFixed(2)}
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 hidden lg:table-cell">
                    ${(item.operatingIncome / 1000000).toFixed(2)}M
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FinancialTable;
