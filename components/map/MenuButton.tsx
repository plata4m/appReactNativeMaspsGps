import React from 'react';
import { TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, shadows } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface MenuButtonProps {
  onPress: () => void;
}

export function MenuButton({ onPress }: MenuButtonProps) {
  const colorScheme = useColorScheme();
  const theme = colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: theme.surface,
          top: insets.top + spacing.md,
        },
        shadows.lg,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons name="menu" size={28} color={theme.primary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: spacing.md,
    width: 56,
    height: 56,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
