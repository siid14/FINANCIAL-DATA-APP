import { FinancialStatement } from "../types";

const API_BASE_URL = "https://financialmodelingprep.com/api/v3";

export class APIService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private handleError(error: any): never {
    // We enhance our error handling to provide more specific messages
    if (error instanceof Response) {
      switch (error.status) {
        case 401:
          throw new Error("Invalid API key");
        case 403:
          throw new Error("Access forbidden - check your API key permissions");
        case 429:
          throw new Error("Rate limit exceeded");
        default:
          throw new Error(`API error: ${error.status}`);
      }
    }
    throw error;
  }

  async getFinancialStatements(): Promise<FinancialStatement[]> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/income-statement/AAPL?period=annual&apikey=${this.apiKey}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Transform the API response to match our interface
      return data.map((item: any) => ({
        date: item.date,
        revenue: item.revenue,
        netIncome: item.netIncome,
        grossProfit: item.grossProfit,
        eps: item.eps,
        operatingIncome: item.operatingIncome,
      }));
    } catch (error) {
      console.error("Error fetching financial data:", error);
      this.handleError(error);
    }
  }
}

export const createAPIService = (apiKey: string) => new APIService(apiKey);
