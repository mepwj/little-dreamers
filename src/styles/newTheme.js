// Modern Design System for 꼬망이들 2024
const newTheme = {
  // Modern gradient-based color palette
  colors: {
    // Primary gradient colors
    primary: {
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      main: '#667eea',
      light: '#7c8ff0',
      dark: '#5568d8',
      soft: '#f3f0ff',
    },
    
    // Secondary colors with modern twist
    secondary: {
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      main: '#f093fb',
      light: '#f4a4fd',
      dark: '#e673f9',
    },
    
    // Accent colors for highlights
    accent: {
      teal: '#4fd1c5',
      coral: '#fc8181',
      amber: '#f6ad55',
      mint: '#68d391',
    },
    
    // Neutral colors with depth
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
    },
    
    // Semantic colors
    semantic: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    
    // Glass effect colors
    glass: {
      white: 'rgba(255, 255, 255, 0.7)',
      light: 'rgba(255, 255, 255, 0.1)',
      dark: 'rgba(0, 0, 0, 0.1)',
    },
  },
  
  // Modern typography system
  typography: {
    fontFamily: {
      display: '"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, sans-serif',
      body: '"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, sans-serif',
      mono: '"JetBrains Mono", "Fira Code", monospace',
    },
    
    fontSize: {
      '2xs': '0.625rem',  // 10px
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      base: '1rem',       // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem',      // 48px
      '6xl': '3.75rem',   // 60px
    },
    
    fontWeight: {
      thin: 100,
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
    
    lineHeight: {
      tight: 1.2,
      snug: 1.4,
      normal: 1.6,
      relaxed: 1.8,
      loose: 2,
    },
  },
  
  // Modern spacing system
  spacing: {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
  },
  
  // Modern border radius
  borderRadius: {
    none: '0',
    sm: '0.375rem',   // 6px
    base: '0.5rem',   // 8px
    md: '0.75rem',    // 12px
    lg: '1rem',       // 16px
    xl: '1.5rem',     // 24px
    '2xl': '2rem',    // 32px
    full: '9999px',
  },
  
  // Modern shadows with color
  shadows: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.03)',
    base: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    md: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    lg: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    xl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    
    // Colored shadows
    purple: '0 10px 40px -10px rgba(102, 126, 234, 0.4)',
    pink: '0 10px 40px -10px rgba(240, 147, 251, 0.4)',
    teal: '0 10px 40px -10px rgba(79, 209, 197, 0.4)',
  },
  
  // Glass morphism effects
  glass: {
    background: 'rgba(255, 255, 255, 0.7)',
    backgroundDark: 'rgba(0, 0, 0, 0.3)',
    blur: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  
  // Transitions
  transitions: {
    fastest: '100ms ease',
    fast: '200ms ease',
    normal: '300ms ease',
    slow: '400ms ease',
    slowest: '500ms ease',
  },
  
  // Z-index system
  zIndex: {
    auto: 'auto',
    0: 0,
    10: 10,
    20: 20,
    30: 30,
    40: 40,
    50: 50,
    dropdown: 1000,
    sticky: 1100,
    modal: 1200,
    popover: 1300,
    tooltip: 1400,
  },
  
  // Breakpoints
  breakpoints: {
    xs: '480px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

export default newTheme;