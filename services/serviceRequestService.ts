import { getSupabaseClient } from '@/template';
import { ServiceRequest } from '@/types/service';

const supabase = getSupabaseClient();

export async function createServiceRequest(
  request: Omit<ServiceRequest, 'id' | 'created_at' | 'updated_at' | 'user_id' | 'status'>
): Promise<{ data: ServiceRequest | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('service_requests')
      .insert([request])
      .select()
      .single();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to create service request' };
  }
}

export async function getUserRequests(): Promise<{
  data: ServiceRequest[] | null;
  error: string | null;
}> {
  try {
    const { data, error } = await supabase
      .from('service_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to fetch service requests' };
  }
}
