import { useState, useEffect } from 'react';
import { Location } from '@/types/service';
import { getCurrentLocation, reverseGeocode } from '@/services/locationService';

export function useLocation() {
  const [location, setLocation] = useState<Location | null>(null);
  const [address, setAddress] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadLocation();
  }, []);

  const loadLocation = async () => {
    setLoading(true);
    setError(null);

    const currentLocation = await getCurrentLocation();
    
    if (!currentLocation) {
      setError('Não foi possível obter sua localização');
      setLoading(false);
      return;
    }

    setLocation(currentLocation);

    const addr = await reverseGeocode(
      currentLocation.latitude,
      currentLocation.longitude
    );
    
    if (addr) {
      setAddress(addr);
    }

    setLoading(false);
  };

  const refreshLocation = () => {
    loadLocation();
  };

  return {
    location,
    address,
    loading,
    error,
    refreshLocation,
  };
}
