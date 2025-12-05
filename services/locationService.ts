import * as ExpoLocation from 'expo-location';
import { Location } from '@/types/service';

export async function requestLocationPermission(): Promise<boolean> {
  try {
    const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Error requesting location permission:', error);
    return false;
  }
}

export async function getCurrentLocation(): Promise<Location | null> {
  try {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      return null;
    }

    const location = await ExpoLocation.getCurrentPositionAsync({
      accuracy: ExpoLocation.Accuracy.High,
    });

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  } catch (error) {
    console.error('Error getting current location:', error);
    return null;
  }
}

export async function reverseGeocode(
  latitude: number,
  longitude: number
): Promise<string | null> {
  try {
    const result = await ExpoLocation.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (result.length > 0) {
      const addr = result[0];
      return `${addr.street || ''} ${addr.streetNumber || ''}, ${addr.city || ''}, ${addr.region || ''}`.trim();
    }

    return null;
  } catch (error) {
    console.error('Error reverse geocoding:', error);
    return null;
  }
}
