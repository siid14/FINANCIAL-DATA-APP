// base url for the financial modeling prep api
const API_BASE_URL = "https://financialmodelingprep.com/api/v3";

// interface defining the shape of raw data received from the api
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

  // initialize service with api key
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getFinancialStatements() {
    try {
      // construct url for apple's income statement with api key
      const url = new URL(`${API_BASE_URL}/income-statement/AAPL`);
      url.searchParams.append("period", "annual");
      url.searchParams.append("apikey", this.apiKey);

      // log the api call url (hiding the api key for security)
      console.log(
        "Fetching data from:",
        url.toString().replace(this.apiKey, "[HIDDEN]")
      );
      const response = await fetch(url.toString());

      // throw error if response is not ok (status not in 200-299 range)
      if (!response.ok) {
        throw new Error(await this.handleErrorResponse(response));
      }

      // parse json response into array of financial data
      const rawData: RawFinancialData[] = await response.json();

      // transform raw data into simplified format for frontend use
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
      // log full error for debugging and throw user-friendly message
      console.error("API Error:", error);
      throw new Error(this.getErrorMessage(error));
    }
  }

  // converts api error responses into user-friendly error messages
  private async handleErrorResponse(response: Response): Promise<string> {
    try {
      const errorData = await response.json();
      // handle different http status codes with specific messages
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
      // fallback error message if json parsing fails
      return `API error: ${response.status}`;
    }
  }

  // converts any error type into a string message
  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    return "An unexpected error occurred while fetching financial data.";
  }
}

// factory function to create new api service instances
export const createAPIService = (apiKey: string) => new APIService(apiKey);
