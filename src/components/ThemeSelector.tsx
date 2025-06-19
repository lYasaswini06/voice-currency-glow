
import { Palette } from 'lucide-react';
import { useState } from 'react';

interface ThemeSelectorProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

const themes = [
  { id: 'classic', name: 'Classic Blue', colors: ['#3b82f6', '#ffffff'] },
  { id: 'midnight', name: 'Midnight Dark', colors: ['#1e293b', '#10b981'] },
  { id: 'mint', name: 'Mint Green', colors: ['#10b981', '#ffffff'] },
  { id: 'sunset', name: 'Sunset Orange', colors: ['#f97316', '#ffffff'] },
  { id: 'purple', name: 'Purple Night', colors: ['#8b5cf6', '#1e1b23'] },
  { id: 'sky', name: 'Sky Blue', colors: ['#0ea5e9', '#fef7ed'] },
];

export const ThemeSelector = ({ currentTheme, onThemeChange }: ThemeSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-6 py-3 bg-theme-surface/50 backdrop-blur-sm rounded-2xl border border-theme-primary/20 hover:border-theme-primary/40 theme-transition group"
      >
        <Palette className="w-5 h-5 text-theme-primary group-hover:rotate-12 transition-transform" />
        <span className="text-theme-text font-medium">Themes</span>
        <div className="flex gap-1 ml-2">
          {themes.slice(0, 3).map((theme) => (
            <div
              key={theme.id}
              className="w-3 h-3 rounded-full border border-white/50"
              style={{ backgroundColor: theme.colors[0] }}
            />
          ))}
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-theme-surface/90 backdrop-blur-md rounded-2xl border border-theme-primary/20 p-2 min-w-64 z-50 shadow-xl">
          <div className="grid grid-cols-2 gap-2">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => {
                  onThemeChange(theme.id);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-3 p-3 rounded-xl theme-transition hover:bg-theme-primary/10 ${
                  currentTheme === theme.id ? 'bg-theme-primary/20 ring-2 ring-theme-primary/30' : ''
                }`}
              >
                <div className="flex gap-1">
                  {theme.colors.map((color, idx) => (
                    <div
                      key={idx}
                      className="w-4 h-4 rounded-full border border-white/30"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-theme-text">{theme.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
