# Financial Data Filtering App

A React-based web application that fetches and displays Apple Inc.'s financial data, allowing users to filter and analyze key financial metrics.

## Features

- Display financial data in a responsive table format
- Filter data by:
  - Date range
  - Revenue range
  - Net Income range
- Sort data by:
  - Date
  - Revenue
  - Net Income
  - Gross Profit
  - EPS (Earnings Per Share)
  - Operating Income
- Responsive design that works on both desktop and mobile devices

## Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- Yarn package manager
- A Financial Modeling Prep API key (get it from [Financial Modeling Prep](https://financialmodelingprep.com/))

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd financial-data-app
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Create a `.env` file in the root directory:

   ```bash
   touch .env
   ```

4. Add your Financial Modeling Prep API key to the `.env` file:
   ```
   VITE_FMP_API_KEY=qR7cwzldlv39ZD88hUgBPybSEmeAOs9s
   ```

## Running the Project

1. Start the development server:

   ```bash
   yarn dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## Project Structure

```
financial-data-app/
├── src/
│   ├── components/
│   │   └── features/
│   │       ├── FinancialApp.tsx
│   │       ├── FinancialTable.tsx
│   │       ├── FilterControl.tsx
│   │       └── SortHeader.tsx
│   ├── services/
│   │   └── api.tsx
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── .env
├── package.json
├── yarn.lock
└── README.md
```

## Built With

- React
- TypeScript
- Vite
- Tailwind CSS
- Financial Modeling Prep API

## Development

- Run tests:

  ```bash
  yarn test
  ```

- Build for production:
  ```bash
  yarn build
  ```

## Troubleshooting

1. If you see an API key error:

   - Make sure you have created the `.env` file
   - Verify your API key is correct
   - Ensure the environment variable name starts with `VITE_`

2. If the development server fails to start:
   - Check if the port 5173 is available
   - Try running `yarn install` again
   - Clear your yarn cache: `yarn cache clean`
