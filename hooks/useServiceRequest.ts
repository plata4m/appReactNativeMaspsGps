import { useState } from 'react';
import { ServiceRequest, ServiceCategory } from '@/types/service';
import { createServiceRequest } from '@/services/serviceRequestService';

export function useServiceRequest() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitRequest = async (
    category: ServiceCategory,
    title: string,
    description: string,
    address: string,
    latitude?: number,
    longitude?: number
  ): Promise<ServiceRequest | null> => {
    setLoading(true);
    setError(null);

    const { data, error: requestError } = await createServiceRequest({
      category,
      title,
      description,
      address,
      latitude,
      longitude,
    });

    if (requestError) {
      setError(requestError);
      setLoading(false);
      return null;
    }

    setLoading(false);
    return data;
  };

  return {
    submitRequest,
    loading,
    error,
  };
}
