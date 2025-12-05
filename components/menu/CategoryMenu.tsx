import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, typography, shadows } from '@/constants/theme';
import { ServiceCategory } from '@/types/service';
import Animated, { FadeIn, FadeOut, SlideInRight, SlideOutRight } from 'react-native-reanimated';

interface CategoryMenuProps {
  visible: boolean;
  onClose: () => void;
  onSelectCategory: (category: ServiceCategory) => void;
}

const categories: Array<{ name: ServiceCategory; icon: keyof typeof Ionicons.glyphMap }> = [
  { name: 'Manutenção', icon: 'build' },
  { name: 'Limpeza', icon: 'water' },
  { name: 'Entrega', icon: 'bicycle' },
  { name: 'Instalação', icon: 'construct' },
  { name: 'Consultoria', icon: 'chatbubbles' },
];

export function CategoryMenu({ visible, onClose, onSelectCategory }: CategoryMenuProps) {
  const colorScheme = useColorScheme();
  const theme = colors[colorScheme ?? 'light'];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={[styles.overlay, { backgroundColor: theme.overlay }]}
        >
          <TouchableOpacity style={styles.overlayTouch} onPress={onClose} activeOpacity={1} />
        </Animated.View>

        <Animated.View
          entering={SlideInRight}
          exiting={SlideOutRight}
          style={[styles.menu, { backgroundColor: theme.surface }, shadows.lg]}
        >
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.text }]}>Selecione o Serviço</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={theme.textSecondary} />
            </TouchableOpacity>
          </View>

          {categories.map((category, index) => (
            <TouchableOpacity
              key={category.name}
              style={[
                styles.categoryItem,
                { borderBottomColor: theme.border },
                index === categories.length - 1 && styles.lastItem,
              ]}
              onPress={() => {
                onSelectCategory(category.name);
                onClose();
              }}
              activeOpacity={0.7}
            >
              <View style={[styles.iconContainer, { backgroundColor: theme.primaryLight + '20' }]}>
                <Ionicons name={category.icon} size={24} color={theme.primary} />
              </View>
              <Text style={[styles.categoryName, { color: theme.text }]}>{category.name}</Text>
              <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
            </TouchableOpacity>
          ))}
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  overlayTouch: {
    flex: 1,
  },
  menu: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '80%',
    maxWidth: 320,
    paddingTop: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
  },
  closeButton: {
    padding: spacing.xs,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  categoryName: {
    flex: 1,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.medium,
  },
});
