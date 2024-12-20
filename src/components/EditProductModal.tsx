import { useState, useEffect } from "react";
import { useCategories, useUpdateProduct } from "@/lib/queries";
import { Product } from "@/types/types";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { homeStyles } from "@/styles/HomeStyles";
import Swal from 'sweetalert2';

interface EditProductModalProps {
  open: boolean;
  onClose: () => void;
  product: Product | null;
}

export const EditProductModal = ({ open, onClose, product }: EditProductModalProps) => {
  const { data: categories } = useCategories();
  const updateProduct = useUpdateProduct();

  const [formData, setFormData] = useState<Omit<Product, "id" | "category"> & { categoryId: number }>({
    name: "",
    price: 0,
    description: "",
    categoryId: 0,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        description: product.description,
        categoryId: product.category.id,
      });
    }
  }, [product]);

  const handleSubmit = async () => {
    if (!product) return;

    try {
      await updateProduct.mutateAsync({
        id: product.id,
        ...formData,
      });

      Swal.fire(
        '¡Actualizado!',
        'El producto ha sido actualizado correctamente.',
        'success'
      );
      onClose();
    } catch (error) {
      Swal.fire(
        'Error',
        'No se pudo actualizar el producto.',
        'error'
      );
    }
  };

  if (!product) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-edit-product"
    >
      <Box sx={homeStyles.modalBox}>
        <Typography variant="h6" sx={homeStyles.subtitle}>
          Editar Producto
        </Typography>
        <TextField
          label="Nombre"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          fullWidth
          sx={homeStyles.formField}
        />
        <TextField
          label="Precio"
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
          fullWidth
          sx={homeStyles.formField}
        />
        <TextField
          label="Descripción"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          fullWidth
          sx={homeStyles.formField}
        />
        <FormControl fullWidth sx={homeStyles.formControl}>
          <InputLabel id="category-label">Categoría</InputLabel>
          <Select
            labelId="category-label"
            value={formData.categoryId}
            onChange={(e) => setFormData({ ...formData, categoryId: Number(e.target.value) })}
          >
            {categories?.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={homeStyles.modalButtons}>
          <Button onClick={onClose} sx={{ mr: 2 }}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Actualizar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}; 