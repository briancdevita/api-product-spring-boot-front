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
