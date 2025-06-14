import axios from 'axios';

// 1. Configuración centralizada de Axios (se mantiene igual)
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// 2. Interceptor de errores (se mantiene igual)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('Error de API:', error.response.data);
      throw new Error(error.response.data.message || 'Error en la solicitud');
    } else {
      console.error('Error de conexión:', error.message);
      throw new Error('Error de conexión con el servidor');
    }
  }
);

// 3. Tipos (se mantienen igual)
type LoginCredentials = {
  email: string;
  password: string;
};

type SessionData = {
  notes: string;
  session_date?: string;
  duration_minutes?: number;
};

// 4. Objeto API unificado (NUEVA ESTRUCTURA)
export const api = {
  auth: {
    login: (credentials: LoginCredentials) => 
      apiClient.post('/auth/login', credentials),
    register: (userData: any) => 
      apiClient.post('/auth/register', userData),
    logout: () => 
      apiClient.post('/auth/logout')
  },
  patients: {
    getAll: () => apiClient.get('/patients/'),
    getById: (id: number) => apiClient.get(`/patients/${id}`),
    create: (patientData: any) => apiClient.post('/patients/', patientData)
  },
  sessions: {
    create: (patientId: number, data: SessionData) => 
      apiClient.post(`/patients/${patientId}/sessions`, data),
    getByPatient: (patientId: number) => 
      apiClient.get(`/patients/${patientId}/sessions`),
    update: (sessionId: number, data: Partial<SessionData>) => 
      apiClient.patch(`/sessions/${sessionId}`, data)
  },
  utils: {
    setAuthToken: (token: string) => {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
    removeAuthToken: () => {
      delete apiClient.defaults.headers.common['Authorization'];
    }
  }
};