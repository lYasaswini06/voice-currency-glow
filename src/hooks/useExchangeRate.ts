
import { useState, useCallback } from 'react';

export const useExchangeRate = (fromCurrency: string, toCurrency: string) => {
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRate = useCallback(async () => {
    if (!fromCurrency || !toCurrency || fromCurrency === toCurrency) {
      setRate(1);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Using a free exchange rate API (exchangerate-api.com)
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rate');
      }

      const data = await response.json();
      const exchangeRate = data.rates[toCurrency];

      if (!exchangeRate) {
        throw new Error(`Exchange rate not found for ${toCurrency}`);
      }

      setRate(exchangeRate);
    } catch (err) {
      console.error('Exchange rate fetch error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      // Fallback to mock rates for demo purposes
      const mockRates: Record<string, Record<string, number>> = {
        USD: { EUR: 0.85, GBP: 0.73, JPY: 110, INR: 74.5 },
        EUR: { USD: 1.18, GBP: 0.86, JPY: 129, INR: 87.8 },
        GBP: { USD: 1.37, EUR: 1.16, JPY: 151, INR: 102.1 }
      };
      
      if (mockRates[fromCurrency]?.[toCurrency]) {
        setRate(mockRates[fromCurrency][toCurrency]);
        setError(null);
      }
    } finally {
      setLoading(false);
    }
  }, [fromCurrency, toCurrency]);

  return { rate, loading, error, fetchRate };
};
