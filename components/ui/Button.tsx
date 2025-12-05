import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, useColorScheme } from 'react-native';
import { colors, spacing, borderRadius, typography, shadows } from '@/constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  fullWidth = false,
}: ButtonProps) {
  const colorScheme = useColorScheme();
  const theme = colors[colorScheme ?? 'light'];

  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'primary' && { ...styles.primary, backgroundColor: theme.primary },
        variant === 'secondary' && { ...styles.secondary, backgroundColor: theme.surfaceVariant },
        variant === 'outline' && { ...styles.outline, borderColor: theme.border },
        fullWidth && styles.fullWidth,
        (disabled || loading) && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#fff' : theme.primary} />
      ) : (
        <Text
          style={[
            styles.text,
            variant === 'primary' && styles.primaryText,
            variant === 'secondary' && { color: theme.text },
            variant === 'outline' && { color: theme.primary },
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  primary: {
    ...shadows.sm,
  },
  secondary: {},
  outline: {
    borderWidth: 1,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
  },
  primaryText: {
    color: '#ffffff',
  },
});
