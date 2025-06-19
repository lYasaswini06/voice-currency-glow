
import { useState, useEffect } from 'react';
import { ArrowUpDown, TrendingUp, RefreshCw } from 'lucide-react';
import { CurrencySelect } from './CurrencySelect';
import { ConversionResult } from './ConversionResult';
import { useExchangeRate } from '@/hooks/useExchangeRate';
import { useSpeech } from '@/hooks/useSpeech';

export const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState('100');
  const [isSwapping, setIsSwapping] = useState(false);
  
  const { rate, loading, error, fetchRate } = useExchangeRate(fromCurrency, toCurrency);
  const { speak } = useSpeech();

  const convertedAmount = rate ? (parseFloat(amount) * rate).toFixed(2) : '0';

  useEffect(() => {
    if (fromCurrency && toCurrency && fromCurrency !== toCurrency) {
      fetchRate();
    }
  }, [fromCurrency, toCurrency, fetchRate]);

  const handleSwapCurrencies = () => {
    setIsSwapping(true);
    setTimeout(() => {
      setFromCurrency(toCurrency);
      setToCurrency(fromCurrency);
      setIsSwapping(false);
    }, 200);
  };

  const handleConvert = () => {
    if (rate && amount) {
      const result = (parseFloat(amount) * rate).toFixed(2);
      speak(`${amount} ${fromCurrency} equals ${result} ${toCurrency}`);
    }
  };

  return (
    <div className="bg-theme-surface/50 backdrop-blur-sm rounded-3xl p-8 border border-theme-primary/10 theme-transition shadow-xl">
      <div className="space-y-8">
        {/* Amount Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-theme-text-secondary">Amount</label>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full text-3xl font-bold bg-theme-bg/50 border-2 border-theme-primary/20 rounded-2xl px-6 py-4 text-theme-text placeholder-theme-text-secondary focus:border-theme-primary focus:outline-none theme-transition"
              placeholder="Enter amount"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <button
                onClick={() => fetchRate()}
                disabled={loading}
                className="p-2 text-theme-primary hover:bg-theme-primary/10 rounded-xl theme-transition"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Currency Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="space-y-2">
            <label className="text-sm font-medium text-theme-text-secondary">From</label>
            <CurrencySelect value={fromCurrency} onChange={setFromCurrency} />
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleSwapCurrencies}
              className={`p-4 bg-theme-primary/10 hover:bg-theme-primary/20 rounded-2xl border border-theme-primary/20 theme-transition group ${
                isSwapping ? 'scale-90' : ''
              }`}
            >
              <ArrowUpDown className={`w-6 h-6 text-theme-primary group-hover:rotate-180 transition-transform duration-300 ${
                isSwapping ? 'rotate-180' : ''
              }`} />
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-theme-text-secondary">To</label>
            <CurrencySelect value={toCurrency} onChange={setToCurrency} />
          </div>
        </div>

        {/* Conversion Result */}
        <ConversionResult
          amount={amount}
          convertedAmount={convertedAmount}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          rate={rate}
          loading={loading}
          error={error}
        />

        {/* Convert Button */}
        <button
          onClick={handleConvert}
          disabled={loading || !rate || !amount}
          className="w-full bg-gradient-to-r from-theme-primary to-theme-accent text-white font-semibold py-4 px-8 rounded-2xl hover:scale-[1.02] active:scale-[0.98] theme-transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          <div className="flex items-center justify-center gap-2">
            <TrendingUp className="w-5 h-5" />
            {loading ? 'Converting...' : 'Convert & Announce'}
          </div>
        </button>
      </div>
    </div>
  );
};
