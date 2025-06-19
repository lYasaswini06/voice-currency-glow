
import { useState, useEffect } from 'react';
import { CurrencyConverter } from '@/components/CurrencyConverter';
import { ThemeSelector } from '@/components/ThemeSelector';
import { VoiceControls } from '@/components/VoiceControls';
import { Header } from '@/components/Header';
import { FloatingElements } from '@/components/FloatingElements';

const Index = () => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const saved = localStorage.getItem('currency-converter-theme');
    return saved || 'classic';
  });

  useEffect(() => {
    localStorage.setItem('currency-converter-theme', currentTheme);
    document.documentElement.setAttribute('data-theme', currentTheme === 'classic' ? '' : currentTheme);
  }, [currentTheme]);

  return (
    <div className="min-h-screen bg-theme-bg theme-transition relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-theme-primary/5 via-transparent to-theme-accent/5" />
      <FloatingElements />
      
      {/* Main Content */}
      <div className="relative z-10">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Theme Selector */}
            <div className="mb-8 flex justify-center">
              <ThemeSelector currentTheme={currentTheme} onThemeChange={setCurrentTheme} />
            </div>

            {/* Main Converter */}
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <CurrencyConverter />
              </div>
              
              <div className="space-y-6">
                <VoiceControls />
                
                {/* Additional Info Card */}
                <div className="bg-theme-surface/50 backdrop-blur-sm rounded-2xl p-6 border border-theme-primary/10 theme-transition">
                  <h3 className="text-lg font-semibold text-theme-text mb-4">Real-time Exchange Rates</h3>
                  <p className="text-theme-text-secondary text-sm leading-relaxed">
                    Get the most accurate and up-to-date currency exchange rates from reliable financial data sources. 
                    Our rates are updated every minute to ensure precision in your conversions.
                  </p>
                  <div className="mt-4 flex items-center text-xs text-theme-text-secondary">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    Live rates active
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
