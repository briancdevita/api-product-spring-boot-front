// Interfaz para Categoría
export interface Category {
    id: number;
    name: string;
  }
  

  
  // Interfaz para Producto
  export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    category: Category; // El objeto de la categoría
  }
  