import axios from 'axios';

// Ajusta la URL según tu backend FastAPI
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Endpoints de Autenticación (ejemplo)
export const login = (credentials: { email: string; password: string }) => {
  return axios.post(`${API_URL}/auth/login`, credentials);
};

// Endpoints de Pacientes
export const getPatients = () => {
  return axios.get(`${API_URL}/patients/`);
};

// Endpoints de Sesiones
export const createSession = (patientId: number, sessionData: { notes: string }) => {
  return axios.post(`${API_URL}/patients/${patientId}/sessions`, sessionData);
};