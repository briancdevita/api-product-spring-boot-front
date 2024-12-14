import { useState } from "react";
import { useCategories, useCreateProduct } from "@/lib/queries";
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

interface CreateProductModalProps {
  open: boolean;
  onClose: () => void;
}

export const CreateProductModal = ({ open, onClose }: CreateProductModalProps) => {
  const { data: categories } = useCategories();
  const createProduct = useCreateProduct();

  const [newProduct, setNewProduct] = useState<Omit<Product, "id" | "category">>({
    name: "",
    price: 0,
    description: "",
  });
  const [newProductCategory, setNewProductCategory] = useState<number | "">("");

  const handleSubmit = () => {
    if (!newProductCategory) {
      alert("Por favor, selecciona una categoría.");
      return;
    }
    createProduct.mutate(
      { ...newProduct, categoryId: newProductCategory },
      {
        onSuccess: () => {
          setNewProduct({ name: "", price: 0, description: "" });
          setNewProductCategory("");
          onClose();
        },
      }
    );
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-create-product"
    >
      <Box sx={homeStyles.modalBox}>
        <Typography variant="h6" sx={homeStyles.subtitle}>
          Crear Producto
        </Typography>
        <TextField
          label="Nombre"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          fullWidth
          sx={homeStyles.formField}
        />
        <TextField
          label="Precio"
          type="number"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })}
          fullWidth
          sx={homeStyles.formField}
        />
        <TextField
          label="Descripción"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          fullWidth
          sx={homeStyles.formField}
        />
        <FormControl fullWidth sx={homeStyles.formControl}>
          <InputLabel id="category-label">Categoría</InputLabel>
          <Select
            labelId="category-label"
            value={newProductCategory}
            onChange={(e) => setNewProductCategory(Number(e.target.value))}
          >
            <MenuItem value="">
              <em>Seleccionar Categoría</em>
            </MenuItem>
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
            Crear Producto
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}; 