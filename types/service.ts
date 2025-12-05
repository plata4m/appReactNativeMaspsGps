export interface ServiceRequest {
  id: string;
  user_id: string;
  category: string;
  title: string;
  description?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export type ServiceCategory = 
  | 'Manutenção'
  | 'Limpeza'
  | 'Entrega'
  | 'Instalação'
  | 'Consultoria';
