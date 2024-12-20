import { useState } from "react";
import { useProducts, useDeleteProduct, useDownloadCsv } from "@/lib/queries";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { homeStyles } from "@/styles/HomeStyles";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import { EditProductModal } from './EditProductModal';
import { Product } from "@/types/types";
import { useAuth } from "@/app/context/AuthContext";
import { isAdmin } from "@/app/helper/isAdmin";
import { Download } from "@mui/icons-material";

export const ProductManagement = () => {
  const { user } = useAuth()
  const { data: products, isLoading: loadingProducts } = useProducts();
  const deleteProduct = useDeleteProduct();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [paginationModel, setPaginationModel] = useState({
    page: 0, // Página actual (inicia en 0)
    pageSize: 5, // Tamaño inicial de filas por página
  });

  const { downloadCsv } = useDownloadCsv()

  if (loadingProducts) return <p>Cargando datos...</p>;

  const handleEdit = (id: number) => {
    const product = products?.find(p => p.id === id);
    if (product) {
      setSelectedProduct(product);
      setEditModalOpen(true);
    }
  };

  const handleDeleteClick = async (id: number) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4F46E5',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await deleteProduct.mutateAsync(id);
        Swal.fire(
          '¡Eliminado!',
          'El producto ha sido eliminado.',
          'success'
        );
      } catch (error) {
        Swal.fire(
          'Error',
          'No se pudo eliminar el producto.',
          'error'
        );
      }
    }
  };




  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Nombre", flex: 1 },
    { field: "price", headerName: "Precio", flex: 1 },
    { field: "description", headerName: "Descripción", flex: 1 },
    { field: "categoryName", headerName: "Categoría", flex: 1 },
    {
      field: "actions",
      headerName: isAdmin(user) ? 'Acciones' : "",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box sx={homeStyles.actionButtons}>
          {
            isAdmin(user) && (
              <>
                <Tooltip title="Editar">
                  <IconButton
                    onClick={() => handleEdit(params.row.id)}
                    size="small"
                    sx={homeStyles.editButton}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar">
                  <IconButton
                    onClick={() => handleDeleteClick(params.row.id)}
                    size="small"
                    sx={homeStyles.deleteButton}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>



              </>
            )
          }

        </Box>
      ),
    },
  ];

  const rows = products?.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    description: product.description,
    categoryName: product.category.name,
  }));

  return (
    <>


      <Box sx={homeStyles.dataGridContainer}>

        {
          isAdmin(user) && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Tooltip title="Descargar CSV">
                <Button
                  variant="contained"
                  endIcon={<Download />}
                  color="error"
                  onClick={() => downloadCsv()}
                >
                  Descargar CSV
                </Button>
              </Tooltip>
            </Box>
          )
        }

        <DataGrid
          rows={rows || []}
          columns={columns}
          pagination
          paginationModel={paginationModel}
          onPaginationModelChange={(model) => setPaginationModel(model)}
          rowsPerPageOptions={[5, 10, 20]}
          pageSizeOptions={[5, 10, 20]}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </Box>


      <EditProductModal
        open={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
      />



    </>

  );
}; 