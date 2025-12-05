import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, useColorScheme } from 'react-native';
import { MapView } from '@/components/map/MapView';
import { MenuButton } from '@/components/map/MenuButton';
import { CategoryMenu } from '@/components/menu/CategoryMenu';
import { ServiceRequestForm } from '@/components/form/ServiceRequestForm';
import { useLocation } from '@/hooks/useLocation';
import { useServiceRequest } from '@/hooks/useServiceRequest';
import { useAlert } from '@/template';
import { ServiceCategory } from '@/types/service';
import { colors, spacing, typography } from '@/constants/theme';

export default function MapScreen() {
  const colorScheme = useColorScheme();
  const theme = colors[colorScheme ?? 'light'];
  const { showAlert } = useAlert();

  const { location, address, loading: locationLoading, error: locationError } = useLocation();
  const { submitRequest, loading: requestLoading } = useServiceRequest();

  const [menuVisible, setMenuVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);

  const handleSelectCategory = (category: ServiceCategory) => {
    setSelectedCategory(category);
    setFormVisible(true);
  };

  const handleSubmitRequest = async (title: string, description: string) => {
    if (!selectedCategory || !location) return;

    const result = await submitRequest(
      selectedCategory,
      title,
      description,
      address,
      location.latitude,
      location.longitude
    );

    if (result) {
      showAlert('Sucesso', 'Solicitação enviada com sucesso');
      setFormVisible(false);
      setSelectedCategory(null);
    } else {
      showAlert('Erro', 'Não foi possível enviar a solicitação');
    }
  };

  if (locationLoading) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={[styles.loadingText, { color: theme.textSecondary }]}>
          Obtendo sua localização...
        </Text>
      </View>
    );
  }

  if (locationError || !location) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: theme.background }]}>
        <Text style={[styles.errorText, { color: theme.error }]}>
          {locationError || 'Não foi possível obter sua localização'}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView location={location} />
      
      <MenuButton onPress={() => setMenuVisible(true)} />

      <CategoryMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        onSelectCategory={handleSelectCategory}
      />

      <ServiceRequestForm
        visible={formVisible}
        category={selectedCategory}
        address={address}
        onClose={() => {
          setFormVisible(false);
          setSelectedCategory(null);
        }}
        onSubmit={handleSubmitRequest}
        loading={requestLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: typography.sizes.base,
  },
  errorText: {
    fontSize: typography.sizes.base,
    textAlign: 'center',
  },
});
