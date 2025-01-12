import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowUpDown } from 'lucide-react';

// Types
interface FinancialData {
  date: string;
  revenue: number;
  netIncome: number;
  grossProfit: number;
  eps: number;
  operatingIncome: number;
}

interface FilterState {
  dateRange: {
    start: string;
    end: string;
  };
  revenue: {
    min: string;
    max: string;
  };
  netIncome: {
    min: string;
    max: string;
  };
}

interface SortState {
  field: keyof FinancialData | null;
  direction: 'asc' | 'desc';
}

const FinancialApp = () => {
  const [data, setData] = useState<FinancialData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [filters, setFilters] = useState<FilterState>({
    dateRange: { start: '', end: '' },
    revenue: { min: '', max: '' },
    netIncome: { min: '', max: '' }
  });
  
  const [sort, setSort] = useState<SortState>({
    field: null,
    direction: 'desc'
  });

  // Format large numbers with commas and 2 decimal places
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };

  // Handle sorting
  const handleSort = (field: keyof FinancialData) => {
    setSort(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  // Apply filters to data
  const filteredData = data.filter(item => {
    const dateInRange = (!filters.dateRange.start || item.date >= filters.dateRange.start) &&
                       (!filters.dateRange.end || item.date <= filters.dateRange.end);
    
    const revenueInRange = (!filters.revenue.min || item.revenue >= Number(filters.revenue.min)) &&
                          (!filters.revenue.max || item.revenue <= Number(filters.revenue.max));
    
    const netIncomeInRange = (!filters.netIncome.min || item.netIncome >= Number(filters.netIncome.min)) &&
                            (!filters.netIncome.max || item.netIncome <= Number(filters.netIncome.max));
    
    return dateInRange && revenueInRange && netIncomeInRange;
  });

  // Apply sorting to filtered data
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sort.field) return 0;
    
    const aValue = a[sort.field];
    const bValue = b[sort.field];
    
    if (sort.direction === 'asc') {
      return aValue < bValue ? -1 : 1;
    } else {
      return aValue > bValue ? -1 : 1;
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Apple Inc. Financial Data</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Date Range Filter */}
            <div>
              <Label>Date Range</Label>
              <div className="flex gap-2">
                <Input
                  type="date"
                  value={filters.dateRange.start}
                  onChange={e => setFilters(prev => ({
                    ...prev,
                    dateRange: { ...prev.dateRange, start: e.target.value }
                  }))}
                  placeholder="Start Date"
                />
                <Input
                  type="date"
                  value={filters.dateRange.end}
                  onChange={e => setFilters(prev => ({
                    ...prev,
                    dateRange: { ...prev.dateRange, end: e.target.value }
                  }))}
                  placeholder="End Date"
                />
              </div>
            </div>

            {/* Revenue Filter */}
            <div>
              <Label>Revenue Range</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={filters.revenue.min}
                  onChange={e => setFilters(prev => ({
                    ...prev,
                    revenue: { ...prev.revenue, min: e.target.value }
                  }))}
                  placeholder="Min Revenue"
                />
                <Input
                  type="number"
                  value={filters.revenue.max}
                  onChange={e => setFilters(prev => ({
                    ...prev,
                    revenue: { ...prev.revenue, max: e.target.value }
                  }))}
                  placeholder="Max Revenue"
                />
              </div>
            </div>

            {/* Net Income Filter */}
            <div>
              <Label>Net Income Range</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={filters.netIncome.min}
                  onChange={e => setFilters(prev => ({
                    ...prev,
                    netIncome: { ...prev.netIncome, min: e.target.value }
                  }))}
                  placeholder="Min Net Income"
                />
                <Input
                  type="number"
                  value={filters.netIncome.max}
                  onChange={e => setFilters(prev => ({
                    ...prev,
                    netIncome: { ...prev.netIncome, max: e.target.value }
                  }))}
                  placeholder="Max Net Income"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">
                    <button
                      className="flex items-center gap-1"
                      onClick={() => handleSort('date')}
                    >
                      Date
                      <ArrowUpDown className="h-4 w-4" />
                    </button>
                  </th>
                  <th className="p-2 text-right">
                    <button
                      className="flex items-center gap-1 ml-auto"
                      onClick={() => handleSort('revenue')}
                    >
                      Revenue
                      <ArrowUpDown className="h-4 w-4" />
                    </button>
                  </th>
                  <th className="p-2 text-right">
                    <button
                      className="flex items-center gap-1 ml-auto"
                      onClick={() => handleSort('netIncome')}
                    >
                      Net Income
                      <ArrowUpDown className="h-4 w-4" />
                    </button>
                  </th>
                  <th className="p-2 text-right">Gross Profit</th>
                  <th className="p-2 text-right">EPS</th>
                  <th className="p-2 text-right">Operating Income</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center p-4">Loading...</td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={6} className="text-center p-4 text-red-500">{error}</td>
                  </tr>
                ) : sortedData.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-2">{item.date}</td>
                    <td className="p-2 text-right">${formatNumber(item.revenue)}</td>
                    <td className="p-2 text-right">${formatNumber(item.netIncome)}</td>
                    <td className="p-2 text-right">${formatNumber(item.grossProfit)}</td>
                    <td className="p-2 text-right">${formatNumber(item.eps)}</td>
                    <td className="p-2 text-right">${formatNumber(item.operatingIncome)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialApp;