import { useProducts } from "@/lib/queries";
import { Box } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { homeStyles } from "@/styles/HomeStyles";

export const ProductManagement = () => {
  const { data: products, isLoading: loadingProducts } = useProducts();

  if (loadingProducts) return <p>Cargando datos...</p>;

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "name", headerName: "Nombre", width: 150 },
    { field: "price", headerName: "Precio", width: 100 },
    { field: "description", headerName: "Descripción", width: 200 },
    { field: "categoryName", headerName: "Categoría", width: 120 },
  ];

  const rows = products?.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    description: product.description,
    categoryName: product.category.name,
  }));

  return (
    <Box sx={homeStyles.dataGridContainer}>
      <DataGrid
        rows={rows || []}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10]}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </Box>
  );
}; 