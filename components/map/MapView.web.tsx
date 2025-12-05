import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Location } from '@/types/service';

interface MapViewProps {
  location: Location;
}

export function MapView({ location }: MapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainerRef.current) return;

    const loadMap = async () => {
      const L = await import('leaflet');
      await import('leaflet/dist/leaflet.css');

      if (mapRef.current) {
        mapRef.current.remove();
      }

      const map = L.map(mapContainerRef.current).setView(
        [location.latitude, location.longitude],
        15
      );

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);

      const customIcon = L.divIcon({
        html: `<svg width="40" height="40" viewBox="0 0 24 24" fill="#2563eb">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>`,
        className: 'custom-marker',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      });

      L.marker([location.latitude, location.longitude], { icon: customIcon }).addTo(map);

      mapRef.current = map;
    };

    loadMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [location]);

  return (
    <View style={styles.container}>
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
