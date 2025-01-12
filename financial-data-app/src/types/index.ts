// Represents the financial data structure from the API
export interface FinancialStatement {
  date: string;
  revenue: number;
  netIncome: number;
  grossProfit: number;
  eps: number;
  operatingIncome: number;
}

// Represents the filter state for our application
export interface FilterCriteria {
  dateRange: {
    start: string;
    end: string;
  };
  revenue: {
    min: number | null;
    max: number | null;
  };
  netIncome: {
    min: number | null;
    max: number | null;
  };
}

// Represents sorting configuration
export interface SortConfig {
  key: keyof FinancialStatement;
  direction: "asc" | "desc";
}
