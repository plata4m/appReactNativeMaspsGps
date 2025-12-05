import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import RNMapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { Location } from '@/types/service';

interface MapViewProps {
  location: Location;
}

export function MapView({ location }: MapViewProps) {
  return (
    <View style={styles.container}>
      <RNMapView
        style={styles.map}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation
        showsMyLocationButton={false}
      >
        <Marker coordinate={location}>
          <View style={styles.markerContainer}>
            <Ionicons name="location" size={40} color="#2563eb" />
          </View>
        </Marker>
      </RNMapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
