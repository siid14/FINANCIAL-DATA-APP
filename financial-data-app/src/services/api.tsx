import { FinancialStatement } from "../types";

const API_BASE_URL = "https://financialmodelingprep.com/api/v3";

interface RawFinancialData {
  date: string;
  symbol: string;
  reportedCurrency: string;
  fillingDate: string;
  acceptedDate: string;
  period: string;
  revenue: number;
  costOfRevenue: number;
  grossProfit: number;
  grossProfitRatio: number;
  operatingIncome: number;
  netIncome: number;
  eps: number;
}

export class APIService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  // This method fetches and transforms our financial data
  async getFinancialStatements() {
    try {
      // First, we construct our URL with the API key
      const url = new URL(`${API_BASE_URL}/income-statement/AAPL`);
      url.searchParams.append("period", "annual");
      url.searchParams.append("apikey", this.apiKey);

      // Making the API request
      console.log(
        "Fetching data from:",
        url.toString().replace(this.apiKey, "[HIDDEN]")
      );
      const response = await fetch(url.toString());

      // Check if the request was successful
      if (!response.ok) {
        throw new Error(await this.handleErrorResponse(response));
      }

      // Parse the JSON response
      const rawData: RawFinancialData[] = await response.json();

      // Transform the data to match our application's needs
      return rawData.map((item) => ({
        date: new Date(item.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        revenue: item.revenue,
        netIncome: item.netIncome,
        grossProfit: item.grossProfit,
        eps: item.eps,
        operatingIncome: item.operatingIncome,
      }));
    } catch (error) {
      // Log the error for debugging but throw a user-friendly message
      console.error("API Error:", error);
      throw new Error(this.getErrorMessage(error));
    }
  }

  // Helper method to handle different types of error responses
  private async handleErrorResponse(response: Response): Promise<string> {
    try {
      const errorData = await response.json();
      switch (response.status) {
        case 401:
          return "Invalid API key. Please check your credentials.";
        case 403:
          return "Access forbidden. Please check your API key permissions.";
        case 429:
          return "Too many requests. Please try again later.";
        default:
          return errorData.message || `API error: ${response.status}`;
      }
    } catch {
      return `API error: ${response.status}`;
    }
  }

  // Helper method to convert errors into user-friendly messages
  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    return "An unexpected error occurred while fetching financial data.";
  }
}

export const createAPIService = (apiKey: string) => new APIService(apiKey);
