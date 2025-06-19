
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface CurrencySelectProps {
  value: string;
  onChange: (currency: string) => void;
}

const currencies = [
  { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
  { code: 'CHF', name: 'Swiss Franc', flag: '🇨🇭' },
  { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺' },
  { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳' },
  { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳' },
  { code: 'BRL', name: 'Brazilian Real', flag: '🇧🇷' },
];

export const CurrencySelect = ({ value, onChange }: CurrencySelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedCurrency = currencies.find(c => c.code === value) || currencies[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-theme-bg/50 border-2 border-theme-primary/20 rounded-2xl hover:border-theme-primary/40 theme-transition group"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{selectedCurrency.flag}</span>
          <div className="text-left">
            <div className="font-semibold text-theme-text">{selectedCurrency.code}</div>
            <div className="text-xs text-theme-text-secondary">{selectedCurrency.name}</div>
          </div>
        </div>
        <ChevronDown className={`w-5 h-5 text-theme-primary transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-theme-surface/95 backdrop-blur-md rounded-2xl border border-theme-primary/20 shadow-xl z-50 max-h-80 overflow-y-auto">
          {currencies.map((currency) => (
            <button
              key={currency.code}
              onClick={() => {
                onChange(currency.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 p-4 hover:bg-theme-primary/10 theme-transition first:rounded-t-2xl last:rounded-b-2xl ${
                value === currency.code ? 'bg-theme-primary/20' : ''
              }`}
            >
              <span className="text-xl">{currency.flag}</span>
              <div className="text-left">
                <div className="font-medium text-theme-text">{currency.code}</div>
                <div className="text-xs text-theme-text-secondary">{currency.name}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
