import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import { Category, Product } from "@/types/types";



// Obtener productos
export const useProducts = () =>
  useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Product[]>("/products");
      return data;
    },
  });

// Obtener categorías
export const useCategories = () =>
  useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Category[]>("/category/");
      return data;
    },
  });

// Crear producto
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<Product, Error, Omit<Product, "id" | "category"> & { categoryId: number }>({
    mutationFn: async (newProduct) => {
      const { data } = await axiosInstance.post<Product>("/products", {
        ...newProduct,
        category: { id: newProduct.categoryId },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] }); // Refrescar productos
    },
  });
};

// Crear categoría
export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<Category, Error, Omit<Category, "id">>({
    mutationFn: async (newCategory) => {
      const { data } = await axiosInstance.post<Category>("/category/", newCategory);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] }); // Refrescar categorías
    },
  });
};



export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      try {
        // Recupera el token del localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No se encontró el token de autenticación");
        }

        // Realiza la solicitud DELETE al backend con el token en la cabecera
        const response = await axiosInstance.delete(`/product/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Incluye el token
          },
        });

        return response.data;
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
        throw new Error("Error al eliminar el producto");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]); // Refresca la lista de productos
    },
  });
};



export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: number } & Omit<Product, "id" | "category"> & { categoryId: number }) => {
      try {
        // Recupera el token del localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No se encontró el token de autenticación");
        }

        // Realiza la solicitud PUT al backend con el token en las cabeceras
        const response = await axiosInstance.put(
          `/product/${data.id}`,
          {
            name: data.name,
            price: data.price,
            description: data.description,
            categoryId: data.categoryId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Incluye el token en las cabeceras
            },
          }
        );

        return response.data;
      } catch (error) {
        console.error("Error al actualizar el producto:", error);
        throw new Error("Error al actualizar el producto");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]); // Refresca la lista de productos
    },
  });
};

export const useDownloadCsv = () => {
  return {
    downloadCsv: async () => {
      try {

        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No se encontró el token de autenticación");
        }


        const response = await axiosInstance.get("/products/download", {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
          responseType: "blob",
        });


        const blob = new Blob([response.data], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "productos.csv"; 
        link.click();
      } catch (error) {
        console.error("Error al descargar el CSV:", error);
        throw new Error("No se pudo descargar el archivo CSV");
      }
    },
  };
};
