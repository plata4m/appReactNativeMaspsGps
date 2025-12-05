import { Platform } from 'react-native';

export const colors = {
  light: {
    primary: '#2563eb',
    primaryDark: '#1d4ed8',
    primaryLight: '#3b82f6',
    background: '#f8fafc',
    surface: '#ffffff',
    surfaceVariant: '#f1f5f9',
    text: '#0f172a',
    textSecondary: '#64748b',
    textTertiary: '#94a3b8',
    border: '#e2e8f0',
    error: '#ef4444',
    success: '#10b981',
    warning: '#f59e0b',
    overlay: 'rgba(0, 0, 0, 0.5)',
    mapMarker: '#2563eb',
  },
  dark: {
    primary: '#3b82f6',
    primaryDark: '#2563eb',
    primaryLight: '#60a5fa',
    background: '#0f172a',
    surface: '#1e293b',
    surfaceVariant: '#334155',
    text: '#f8fafc',
    textSecondary: '#cbd5e1',
    textTertiary: '#94a3b8',
    border: '#334155',
    error: '#f87171',
    success: '#34d399',
    warning: '#fbbf24',
    overlay: 'rgba(0, 0, 0, 0.7)',
    mapMarker: '#3b82f6',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const typography = {
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
};
