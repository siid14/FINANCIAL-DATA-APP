import React from "react";
import { FinancialStatement } from "../../types";
import { formatCurrency } from "../../utils";

interface FinancialTableProps {
  data: FinancialStatement[];
  isLoading: boolean;
  error?: string;
}

export const FinancialTable: React.FC<FinancialTableProps> = ({
  data,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return <div>Loading financial data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Revenue
            </th>
            {/* Add other headers */}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {item.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatCurrency(item.revenue)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
