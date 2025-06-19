
export const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Currency Symbols */}
      <div className="absolute top-20 left-10 text-6xl text-theme-primary/5 animate-float">$</div>
      <div className="absolute top-32 right-20 text-5xl text-theme-accent/5 animate-float" style={{ animationDelay: '1s' }}>€</div>
      <div className="absolute bottom-32 left-20 text-4xl text-theme-primary/5 animate-float" style={{ animationDelay: '2s' }}>£</div>
      <div className="absolute bottom-20 right-32 text-5xl text-theme-accent/5 animate-float" style={{ animationDelay: '0.5s' }}>¥</div>
      
      {/* Floating Geometric Shapes */}
      <div className="absolute top-1/4 left-1/4 w-20 h-20 border border-theme-primary/10 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute bottom-1/3 right-1/4 w-16 h-16 border border-theme-accent/10 rounded-lg rotate-45 animate-float" style={{ animationDelay: '2.5s' }}></div>
      
      {/* Glowing Orbs */}
      <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-theme-primary/30 rounded-full blur-sm animate-pulse"></div>
      <div className="absolute bottom-1/2 left-1/3 w-3 h-3 bg-theme-accent/20 rounded-full blur-sm animate-pulse" style={{ animationDelay: '1s' }}></div>
    </div>
  );
};
