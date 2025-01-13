import React from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { FinancialStatement } from "../../types";

// type for possible sort directions
type SortDirection = "asc" | "desc" | null;

// props interface for sort header component
interface SortHeaderProps {
  label: string;
  column: keyof FinancialStatement;
  currentSort: {
    column: keyof FinancialStatement | null;
    direction: SortDirection;
  };
  onSort: (column: keyof FinancialStatement) => void;
}

const SortHeader: React.FC<SortHeaderProps> = ({
  label,
  column,
  currentSort,
  onSort,
}) => {
  // determines which sort icon to display based on current sort state
  const getSortIcon = () => {
    if (currentSort.column !== column) {
      return <ArrowUpDown className="w-4 h-4 opacity-50" />;
    }
    return currentSort.direction === "asc" ? (
      <ArrowUp className="w-4 h-4" />
    ) : (
      <ArrowDown className="w-4 h-4" />
    );
  };

  return (
    <button
      onClick={() => onSort(column)}
      className="flex items-center space-x-2 hover:bg-gray-50 px-2 py-1 rounded"
    >
      <span>{label}</span>
      {getSortIcon()}
    </button>
  );
};

export default SortHeader;
