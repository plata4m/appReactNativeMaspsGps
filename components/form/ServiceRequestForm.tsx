import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, KeyboardAvoidingView, Platform, ScrollView, useColorScheme } from 'react-native';
import { ServiceCategory } from '@/types/service';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { colors, spacing, borderRadius, typography, shadows } from '@/constants/theme';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ServiceRequestFormProps {
  visible: boolean;
  category: ServiceCategory | null;
  address: string;
  onClose: () => void;
  onSubmit: (title: string, description: string) => void;
  loading?: boolean;
}

export function ServiceRequestForm({
  visible,
  category,
  address,
  onClose,
  onSubmit,
  loading = false,
}: ServiceRequestFormProps) {
  const colorScheme = useColorScheme();
  const theme = colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!visible) {
      setTitle('');
      setDescription('');
    }
  }, [visible]);

  const handleSubmit = () => {
    if (!title.trim()) {
      return;
    }
    onSubmit(title, description);
  };

  if (!category) return null;

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={[styles.backdrop, { backgroundColor: theme.overlay }]} />

        <Animated.View
          entering={SlideInDown}
          exiting={SlideOutDown}
          style={[
            styles.formContainer,
            { backgroundColor: theme.surface, paddingBottom: insets.bottom + spacing.md },
            shadows.lg,
          ]}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardView}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.header}>
                <View style={[styles.handle, { backgroundColor: theme.border }]} />
                <Text style={[styles.title, { color: theme.text }]}>
                  Solicitar {category}
                </Text>
              </View>

              <View style={styles.form}>
                <Input
                  label="Título"
                  value={title}
                  onChangeText={setTitle}
                  placeholder="Ex: Reparo urgente"
                  autoCapitalize="sentences"
                />

                <Input
                  label="Descrição"
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Descreva o que você precisa"
                  multiline
                  numberOfLines={4}
                  autoCapitalize="sentences"
                />

                <Input
                  label="Endereço"
                  value={address || 'Carregando localização...'}
                  onChangeText={() => {}}
                  editable={false}
                />

                <View style={styles.buttons}>
                  <View style={styles.buttonContainer}>
                    <Button
                      title="Cancelar"
                      variant="outline"
                      onPress={onClose}
                      disabled={loading}
                      fullWidth
                    />
                  </View>
                  <View style={styles.buttonContainer}>
                    <Button
                      title="Enviar"
                      variant="primary"
                      onPress={handleSubmit}
                      loading={loading}
                      disabled={!title.trim()}
                      fullWidth
                    />
                  </View>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  formContainer: {
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    maxHeight: '90%',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
  },
  form: {
    padding: spacing.lg,
  },
  buttons: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  buttonContainer: {
    flex: 1,
  },
});
