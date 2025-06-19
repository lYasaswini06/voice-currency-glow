
import { TrendingUp, Globe } from 'lucide-react';

export const Header = () => {
  return (
    <header className="relative z-20 pt-8 pb-4">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-theme-primary/10 rounded-2xl backdrop-blur-sm border border-theme-primary/20">
              <Globe className="w-8 h-8 text-theme-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-theme-primary to-theme-accent bg-clip-text text-transparent">
              Currency Converter
            </h1>
            <div className="p-3 bg-theme-accent/10 rounded-2xl backdrop-blur-sm border border-theme-accent/20 animate-float">
              <TrendingUp className="w-8 h-8 text-theme-accent" />
            </div>
          </div>
          
          <p className="text-lg text-theme-text-secondary max-w-2xl mx-auto leading-relaxed">
            Convert currencies instantly with real-time exchange rates. 
            <span className="text-theme-primary font-medium"> Voice-enabled</span> for hands-free conversions.
          </p>
        </div>
      </div>
    </header>
  );
};
