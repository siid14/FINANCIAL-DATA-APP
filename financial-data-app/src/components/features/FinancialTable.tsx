import React from "react";
import { FinancialStatement } from "../../types";

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
  if (isLoading) {
    return (
      <div className="w-full text-center p-4">Loading financial data...</div>
    );
  }

  if (error) {
    return <div className="w-full text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Revenue
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Net Income
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Gross Profit
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              EPS
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Operating Income
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                ${(item.revenue / 1000000).toFixed(2)}M
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                ${(item.netIncome / 1000000).toFixed(2)}M
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                ${(item.grossProfit / 1000000).toFixed(2)}M
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                ${item.eps.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                ${(item.operatingIncome / 1000000).toFixed(2)}M
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinancialTable;
