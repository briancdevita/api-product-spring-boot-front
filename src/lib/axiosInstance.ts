import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 5000
});

// Interceptor para añadir el token a todas las peticiones
axiosInstance.interceptors.request.use((config) => {
    // Obtener el token del localStorage
    const token = localStorage.getItem('token');
    
    if (token) {
        // Asegurarnos de que el token tenga el prefijo "Bearer"
        const tokenWithBearer = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
        config.headers.Authorization = tokenWithBearer;
        console.log('Token enviado:', tokenWithBearer); // Log para debug
    } else {
        console.log('No se encontró token en localStorage');
    }
    
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Añadir interceptor de respuesta para ver errores detallados
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log('Error completo:', error);
        console.log('Estado de la respuesta:', error.response?.status);
        console.log('Datos del error:', error.response?.data);
        return Promise.reject(error);
    }
);

export default axiosInstance;