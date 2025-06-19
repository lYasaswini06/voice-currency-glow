
import { TrendingUp, AlertCircle } from 'lucide-react';

interface ConversionResultProps {
  amount: string;
  convertedAmount: string;
  fromCurrency: string;
  toCurrency: string;
  rate: number | null;
  loading: boolean;
  error: string | null;
}

export const ConversionResult = ({
  amount,
  convertedAmount,
  fromCurrency,
  toCurrency,
  rate,
  loading,
  error
}: ConversionResultProps) => {
  if (loading) {
    return (
      <div className="bg-theme-bg/50 rounded-2xl p-6 border border-theme-primary/10">
        <div className="flex items-center justify-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-theme-primary"></div>
          <span className="text-theme-text-secondary">Fetching latest rates...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
        <div className="flex items-center space-x-2 text-red-600">
          <AlertCircle className="w-5 h-5" />
          <span>Error: {error}</span>
        </div>
      </div>
    );
  }

  if (!rate) {
    return (
      <div className="bg-theme-bg/50 rounded-2xl p-6 border border-theme-primary/10">
        <div className="text-center text-theme-text-secondary">
          Select currencies to see conversion rate
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-theme-primary/5 to-theme-accent/5 rounded-2xl p-6 border border-theme-primary/20">
      <div className="text-center space-y-4">
        <div className="text-4xl font-bold text-theme-text">
          {convertedAmount} <span className="text-theme-primary">{toCurrency}</span>
        </div>
        
        <div className="flex items-center justify-center space-x-2 text-theme-text-secondary">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm">
            1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
          </span>
        </div>

        <div className="text-xs text-theme-text-secondary">
          {amount} {fromCurrency} × {rate.toFixed(4)} = {convertedAmount} {toCurrency}
        </div>
      </div>
    </div>
  );
};
