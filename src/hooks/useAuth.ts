import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Aquí va tu lógica de verificación de autenticación
        // Por ejemplo, verificar un token en localStorage o hacer una llamada a la API
        
        // Simulación de verificación
        await new Promise(resolve => setTimeout(resolve, 1000));
        const hasToken = localStorage.getItem('token');
        setIsAuthenticated(!!hasToken);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { isAuthenticated, isLoading };
}; 